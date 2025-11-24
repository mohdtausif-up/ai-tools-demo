#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
news_to_reels.py

Create Shorts/Reels videos from a list of news URLs using:
- Local LLM via Ollama (Intel macOS compatible) for plagiarism-free SEO meta and (when -o auto) orientation decision.
- Free stock assets only (Pexels/Pixabay for video/images; Pixabay or Mixkit for music).
- MoviePy + Pillow for portrait or landscape reels with readable caption overlays.
- Robust logging to files + console progress.

USAGE
-----
1) Install dependencies (recommend Python 3.10+):

    python3 -m venv .venv
    source .venv/bin/activate
    pip install --upgrade pip
    pip install requests beautifulsoup4 readability-lxml python-dotenv moviepy==2.2.1 pillow numpy pydub srt

2) Install FFmpeg (macOS via Homebrew):

    /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
    brew install ffmpeg

3) Start local LLM (Ollama) and pull a model, e.g.:

    brew install ollama
    ollama serve
    ollama pull mistral:7b-instruct

4) Create a .env file with your API keys:

    PEXELS_API_KEY=YOUR_PEXELS_KEY
    PIXABAY_API_KEY=YOUR_PIXABAY_KEY
    LLM_MODEL=mistral:7b-instruct  # or llama3.2, qwen2:7b-instruct

5) Prepare an input.txt containing one news URL per line.

6) Run:

    # Portrait
    python news_to_reels.py --input input.txt -o portrait

    # Landscape
    python news_to_reels.py --input input.txt -o landscape

    # Auto (LLM-based decision)
    python news_to_reels.py --input input.txt -o auto

OUTPUT LAYOUT
-------------
videos_output/<YYYY-MM-DD>/
  logs/
    news_to_reels.log
    errors.log
  news1/
    reel.mp4
    meta.txt
    thumb.jpg
  news2/
    reel.mp4
    meta.txt
    thumb.jpg
  ...

LICENSING NOTES
---------------
- Free assets only (Pexels/Pixabay for video/images; Pixabay/Mixkit for music).
- Do NOT use "editorial use only" assets; avoid implying endorsements; do not redistribute assets "as-is".
- Always store asset source URLs + license page references in meta.txt.
- You are responsible for ensuring license compliance for your specific use case.

"""

from __future__ import annotations
import os
import re
import io
import sys
import json
import math
import time
import glob
import uuid
import srt
import uuid
import queue
import shutil
import hashlib
import argparse
import datetime as dt
from dataclasses import dataclass
from typing import List, Dict, Tuple, Optional

import requests
from bs4 import BeautifulSoup
from readability import Document
from urllib.parse import urlparse, urlencode, quote_plus

from dotenv import load_dotenv

# MoviePy 2.x API
from moviepy import VideoFileClip, AudioFileClip, CompositeVideoClip
from moviepy.video.fx.resize import resize
from moviepy.audio.fx.volumex import volumex
from moviepy.editor import ImageClip, ColorClip

from PIL import Image, ImageDraw, ImageFont
import numpy as np

import logging
from logging.handlers import RotatingFileHandler


# ------------------------------ CONFIG ---------------------------------

OLLAMA_URL = "http://localhost:11434/api/generate"
DEFAULT_LLM = "mistral:7b-instruct"

# Defaults when orientation=portrait (can be overridden dynamically):
DEF_PORTRAIT = (1080, 1920)
DEF_LANDSCAPE = (1920, 1080)
FPS = 30
VIDEO_BITRATE = "6000k"  # ~6 Mbps target
CAPTION_FONT_SIZE = 60
CAPTION_BOX_OPACITY = 140  # 0..255
CAPTION_STROKE = 2
CAPTION_MAX_WORDS = 10
REEL_MIN_SEC, REEL_MAX_SEC = 10, 20
SUBCLIP_LEN_SEC = 6  # for montages

CACHE_DIR = ".cache/assets"
os.makedirs(CACHE_DIR, exist_ok=True)

# Fallback music (Mixkit) if Pixabay music API/key not available or search fails.
MIXKIT_TRACKS = [
    ("https://assets.mixkit.co/music/download/mixkit-a-very-happy-christmas-897.mp3",
     "Mixkit - A Very Happy Christmas - Free license - https://mixkit.co"),
    ("https://assets.mixkit.co/music/download/mixkit-just-chill-16.mp3",
     "Mixkit - Just Chill - Free license - https://mixkit.co"),
    ("https://assets.mixkit.co/music/download/mixkit-positive-pop-1003.mp3",
     "Mixkit - Positive Pop - Free license - https://mixkit.co")
]

# ----------------------------- LOGGING ---------------------------------

# Bootstrap console logger (before we know the output directory)
log = logging.getLogger("news_to_reels")
if not log.handlers:
    log.setLevel(logging.INFO)
    ch = logging.StreamHandler()
    ch.setLevel(logging.INFO)
    ch.setFormatter(logging.Formatter("%(levelname)s | %(message)s"))
    log.addHandler(ch)


def setup_logging(base_out_dir: str) -> logging.Logger:
    """
    Configure console + rotating file handlers.
    Logs stored under: videos_output/<date>/logs/
      - news_to_reels.log (INFO/DEBUG)
      - errors.log        (ERROR/CRITICAL)
    """
    logs_dir = os.path.join(base_out_dir, "logs")
    os.makedirs(logs_dir, exist_ok=True)

    file_log_path = os.path.join(logs_dir, "news_to_reels.log")
    err_log_path = os.path.join(logs_dir, "errors.log")

    fmt = logging.Formatter("%(asctime)s | %(levelname)s | %(name)s | %(message)s")

    logger = logging.getLogger("news_to_reels")
    logger.handlers = []
    logger.setLevel(logging.DEBUG)

    ch = logging.StreamHandler()
    ch.setLevel(logging.INFO)
    ch.setFormatter(fmt)
    logger.addHandler(ch)

    fh = RotatingFileHandler(file_log_path, maxBytes=5 * 1024 * 1024, backupCount=3, encoding="utf-8")
    fh.setLevel(logging.DEBUG)
    fh.setFormatter(fmt)
    logger.addHandler(fh)

    eh = RotatingFileHandler(err_log_path, maxBytes=2 * 1024 * 1024, backupCount=2, encoding="utf-8")
    eh.setLevel(logging.ERROR)
    eh.setFormatter(fmt)
    logger.addHandler(eh)

    logger.info(f"Log files: {file_log_path} (all), {err_log_path} (errors)")
    return logger


# ----------------------------- HELPERS ---------------------------------

def today_str() -> str:
    return dt.date.today().strftime("%Y-%m-%d")


def ensure_dir(p: str):
    os.makedirs(p, exist_ok=True)


def sha1(s: str) -> str:
    return hashlib.sha1(s.encode("utf-8", "ignore")).hexdigest()


def with_retries(method, url, max_tries=3, **kwargs):
    """
    HTTP helper with exponential backoff.
    """
    delay = 1.2
    for i in range(max_tries):
        try:
            resp = method(url, timeout=30, **kwargs)
            if 200 <= resp.status_code < 300:
                return resp
            raise requests.HTTPError(f"{resp.status_code} {resp.text[:180]}")
        except Exception as e:
            if i == max_tries - 1:
                raise
            time.sleep(delay)
            delay *= 2


def download_to_cache(url: str, filename_hint: Optional[str] = None) -> str:
    """
    Download a remote file to the .cache/assets folder; reuse if already exists.
    """
    h = sha1(url)
    ext = os.path.splitext(filename_hint or urlparse(url).path)[1]
    if not ext:
        if any(x in url.lower() for x in ("image", "jpg", "jpeg", "png")):
            ext = ".jpg"
        elif any(x in url.lower() for x in ("video", "mp4", "mov")):
            ext = ".mp4"
        elif any(x in url.lower() for x in ("audio", "mp3", "wav")):
            ext = ".mp3"
        else:
            ext = ".bin"
    out_path = os.path.join(CACHE_DIR, f"{h}{ext}")
    if os.path.exists(out_path) and os.path.getsize(out_path) > 0:
        return out_path

    log.info(f"Downloading: {url}")
    r = with_retries(requests.get, url, stream=True)
    with open(out_path, "wb") as f:
        shutil.copyfileobj(r.raw, f)
    return out_path


def clamp(x, lo, hi):
    return max(lo, min(hi, x))


def sanitize_text(t: str) -> str:
    if not t:
        return ""
    t = re.sub(r"\s+", " ", t).strip()
    return t


def safe_first(seq, default=None):
    return seq[0] if seq else default


# ----------------------------- SCRAPING --------------------------------

def _extract_meta(soup: BeautifulSoup) -> Dict[str, str]:
    get = lambda name: safe_first([m.get("content") for m in soup.find_all("meta", attrs={"name": name}) if m.get("content")], "")
    og = lambda prop: safe_first([m.get("content") for m in soup.find_all("meta", property=prop) if m.get("content")], "")
    title = sanitize_text(og("og:title") or get("title") or (soup.title.string if soup.title else ""))
    desc = sanitize_text(og("og:description") or get("description") or "")
    img = og("og:image") or ""
    return {"title": title, "description": desc, "image": img}


def scrape_article(url: str) -> Dict:
    """
    Robust article scraping via requests + BeautifulSoup + readability-lxml.
    Returns dict with fields: url, title, text, main_image_url
    """
    try:
        resp = with_retries(requests.get, url, headers={"User-Agent": "Mozilla/5.0"})
        html = resp.text
        soup = BeautifulSoup(html, "html.parser")
        meta = _extract_meta(soup)

        # Use readability to extract main content
        doc = Document(html)
        readable_html = doc.summary(html_partial=True)
        readable = BeautifulSoup(readable_html, "html.parser")
        paragraphs = [sanitize_text(p.get_text(" ")) for p in readable.find_all(["p", "li"]) if sanitize_text(p.get_text(" "))]
        text = " ".join(paragraphs)
        if not text:
            paragraphs = [sanitize_text(p.get_text(" ")) for p in soup.find_all("p") if sanitize_text(p.get_text(" "))]
            text = " ".join(paragraphs)

        title = sanitize_text(doc.short_title() or meta["title"])
        main_image = meta["image"]
        return {"url": url, "title": title, "text": text, "main_image_url": main_image}
    except Exception as e:
        log.warning(f"Scrape failed for {url}: {e}")
        return {"url": url, "title": "", "text": "", "main_image_url": ""}


# ----------------------------- LLM (Ollama) ----------------------------

def _ollama_generate(prompt: str, model: Optional[str] = None) -> str:
    load_dotenv(override=True)
    model = model or os.getenv("LLM_MODEL", DEFAULT_LLM)
    payload = {"model": model, "prompt": prompt.strip(), "stream": False}
    r = with_retries(requests.post, OLLAMA_URL, json=payload)
    data = r.json()
    return data.get("response", "").strip()


def llm_generate_meta(article: Dict) -> Dict:
    """
    Use local Ollama to produce plagiarism-free, SEO-friendly meta.
    Output: dict with title, description, keywords (csv), hashtags (space-separated), queries (list[str]).
    """
    prompt = f"""
You are an SEO editor. Given a scraped news article, create plagiarism-free metadata.
Return STRICT JSON with keys: title, description, keywords, hashtags, queries.
Rules:
- title: <= 80 chars, keyword-rich, click-safe (no clickbait).
- description: 2-3 lines (~200-300 chars), unique, informative.
- keywords: 10-15 comma-separated SEO keywords (no quotes).
- hashtags: 10-15 hashtags separated by spaces (no banned tags).
- queries: 2-3 concise search queries for free stock assets (no quotes).

ARTICLE_TITLE: {article.get('title','')[:300]}
ARTICLE_TEXT: {article.get('text','')[:3000]}
"""
    try:
        response = _ollama_generate(prompt)
        start = response.find("{")
        end = response.rfind("}")
        if start != -1 and end != -1:
            js = json.loads(response[start:end+1])
        else:
            js = {
                "title": article.get("title")[:80] or "News Update",
                "description": "Latest update summarized in a short reel.",
                "keywords": "news,update,breaking,report,headline",
                "hashtags": "#news #update #breaking",
                "queries": [article.get("title")[:40] or "news"]
            }
        title = sanitize_text(js.get("title", ""))[:80]
        desc = sanitize_text(js.get("description", ""))[:320]
        keywords = sanitize_text(js.get("keywords", ""))
        hashtags = sanitize_text(js.get("hashtags", ""))
        queries = js.get("queries", [])
        if not queries:
            base_terms = re.split(r"[,\s]+", (keywords or title))
            queries = [w for w in base_terms if w and w.isalpha()][:3] or ["news", "report"]
        return {"title": title, "description": desc, "keywords": keywords, "hashtags": hashtags, "queries": queries}
    except Exception as e:
        log.warning(f"LLM meta generation failed: {e}")
        title = sanitize_text(article.get("title") or "News Update")[:80]
        return {
            "title": title,
            "description": "Latest update summarized in a short reel.",
            "keywords": "news,update,report,headline",
            "hashtags": "#news #update #report",
            "queries": [title.split()[0] if title else "news"]
        }


def llm_decide_orientation(context: Dict) -> Optional[str]:
    """
    Ask local LLM to decide orientation ('portrait' or 'landscape') based on asset summary.
    Returns 'portrait'/'landscape' or None on failure.
    """
    prompt = f"""
You are a video editor for social media. Decide the best canvas orientation for a short video
based on available assets. Return STRICT JSON: {{ "orientation": "portrait" | "landscape" }}.

Assets summary (first items):
- videos: {context.get('videos_summary')}
- images: {context.get('images_summary')}
- use_case: "{context.get('use_case','news short')}"
Rules:
- If most assets are vertical/tall, prefer "portrait".
- If assets are mainly widescreen footage, prefer "landscape".
- If uncertain, default to "portrait" for mobile-first viewing.

Respond with only a JSON object.
"""
    try:
        response = _ollama_generate(prompt)
        start = response.find("{")
        end = response.rfind("}")
        if start != -1 and end != -1:
            js = json.loads(response[start:end+1])
            o = (js.get("orientation") or "").lower().strip()
            if o in ("portrait", "landscape"):
                return o
    except Exception as e:
        log.debug(f"LLM orientation decision failed: {e}")
    return None


# ----------------------------- FREE ASSETS -----------------------------

def _pexels_search_videos(api_key: str, query: str, per_page=10) -> List[Dict]:
    url = "https://api.pexels.com/videos/search"
    headers = {"Authorization": api_key}
    params = {"query": query, "per_page": per_page, "orientation": "portrait"}
    r = with_retries(requests.get, url, headers=headers, params=params)
    data = r.json()
    return data.get("videos", [])


def _pexels_search_images(api_key: str, query: str, per_page=15) -> List[Dict]:
    url = "https://api.pexels.com/v1/search"
    headers = {"Authorization": api_key}
    params = {"query": query, "per_page": per_page, "orientation": "portrait"}
    r = with_retries(requests.get, url, headers=headers, params=params)
    data = r.json()
    return data.get("photos", [])


def _pixabay_search(api_key: str, query: str, media="video", per_page=10) -> List[Dict]:
    base = "https://pixabay.com/api/videos/" if media == "video" else "https://pixabay.com/api/"
    params = {
        "key": api_key,
        "q": query,
        "safesearch": "true",
        "per_page": per_page,
        "orientation": "vertical"
    }
    r = with_retries(requests.get, base, params=params)
    return r.json().get("hits", [])


def _choose_pexels_video_file(v: Dict) -> Optional[str]:
    files = v.get("video_files", [])
    files_sorted = sorted(files, key=lambda f: (f.get("height", 0), f.get("width", 0)), reverse=True)
    for f in files_sorted:
        link = f.get("link")
        if link:
            return link
    return None


def _choose_pixabay_video_url(hit: Dict) -> Optional[str]:
    videos = hit.get("videos", {}) or {}
    for key in ("large", "medium", "small", "tiny"):
        item = videos.get(key)
        if item and item.get("url"):
            return item["url"]
    return None


def _choose_pexels_image_url(photo: Dict) -> Optional[str]:
    src = photo.get("src", {})
    for key in ("large2x", "large", "portrait", "original"):
        if src.get(key):
            return src[key]
    return None


def _choose_pixabay_image_url(hit: Dict) -> Optional[str]:
    for key in ("largeImageURL", "webformatURL", "previewURL"):
        if hit.get(key):
            return hit[key]
    return None


def select_free_assets(meta: Dict) -> Dict:
    """
    Search Pexels & Pixabay for portrait videos/images matching queries.
    Also try to fetch free music (Pixabay audio or Mixkit fallback).
    Returns dict:
        {
          "video_urls": [ ... ]   # 0..N
          "image_urls": [ ... ]   # used if no video
          "audio_url": str or None,
          "license_notes": "..."
        }
    """
    load_dotenv(override=True)
    pexels_key = os.getenv("PEXELS_API_KEY", "").strip()
    pixabay_key = os.getenv("PIXABAY_API_KEY", "").strip()

    queries = meta.get("queries", [])[:3] or ["news", "update"]

    video_urls: List[str] = []
    image_urls: List[str] = []
    license_lines = []

    # --- Videos: Prefer Pexels (portrait), then Pixabay
    for q in queries:
        q = q.strip()
        try:
            if pexels_key:
                vids = _pexels_search_videos(pexels_key, q, per_page=8)
                for v in vids:
                    link = _choose_pexels_video_file(v)
                    if link:
                        video_urls.append(link)
                if video_urls:
                    license_lines.append("Pexels video(s): https://www.pexels.com/license/ (Free for commercial use, no attribution required)")
            if not video_urls and pixabay_key:
                hits = _pixabay_search(pixabay_key, q, media="video", per_page=8)
                for h in hits:
                    link = _choose_pixabay_video_url(h)
                    if link:
                        video_urls.append(link)
                if video_urls:
                    license_lines.append("Pixabay video(s): https://pixabay.com/service/license-summary/ (Pixabay Content License)")
            if video_urls:
                break
        except Exception as e:
            log.warning(f"Video search failed for '{q}': {e}")

    # --- Images if no video found
    if not video_urls:
        for q in queries:
            q = q.strip()
            try:
                if pexels_key:
                    photos = _pexels_search_images(pexels_key, q, per_page=10)
                    for p in photos:
                        link = _choose_pexels_image_url(p)
                        if link:
                            image_urls.append(link)
                    if image_urls:
                        license_lines.append("Pexels photo(s): https://www.pexels.com/license/ (Free for commercial use, no attribution required)")
                if not image_urls and pixabay_key:
                    hits = _pixabay_search(pixabay_key, q, media="image", per_page=12)
                    for h in hits:
                        link = _choose_pixabay_image_url(h)
                        if link:
                            image_urls.append(link)
                    if image_urls:
                        license_lines.append("Pixabay image(s): https://pixabay.com/service/license-summary/ (Pixabay Content License)")
                if image_urls:
                    break
            except Exception as e:
                log.warning(f"Image search failed for '{q}': {e}")

    # --- Audio: Mixkit fallback set
    audio_url = None
    audio_license = ""
    for u, note in MIXKIT_TRACKS:
        try:
            r = with_retries(requests.get, u)
            if r.status_code == 200:
                audio_url = u
                audio_license = note
                license_lines.append(note)
                break
        except Exception:
            continue

    return {
        "video_urls": video_urls,
        "image_urls": image_urls,
        "audio_url": audio_url,
        "license_notes": " | ".join(dict.fromkeys(license_lines))
    }


def download_assets(asset_dict: Dict) -> Dict:
    """
    Download chosen remote assets to cache.
    Returns dict with local file paths + original URLs.
    """
    local_video_paths = []
    for u in asset_dict.get("video_urls", [])[:3]:
        try:
            p = download_to_cache(u)
            local_video_paths.append((p, u))
        except Exception as e:
            log.warning(f"Video download failed: {u} ({e})")

    local_image_paths = []
    if not local_video_paths:
        for u in asset_dict.get("image_urls", [])[:3]:
            try:
                p = download_to_cache(u)
                local_image_paths.append((p, u))
            except Exception as e:
                log.warning(f"Image download failed: {u} ({e})")

    audio_path = None
    audio_src = None
    if asset_dict.get("audio_url"):
        try:
            audio_path = download_to_cache(asset_dict["audio_url"])
            audio_src = asset_dict["audio_url"]
        except Exception as e:
            log.warning(f"Audio download failed: {asset_dict['audio_url']} ({e})")

    return {
        "videos": local_video_paths,   # list of (path, src_url)
        "images": local_image_paths,   # list of (path, src_url)
        "audio": (audio_path, audio_src) if audio_path else (None, None),
        "license_notes": asset_dict.get("license_notes", "")
    }


# ----------------------------- ORIENTATION -----------------------------

def _probe_media_orientation(local_assets: Dict) -> Tuple[int, int]:
    """
    Heuristic: returns (portrait_count, landscape_count) by inspecting media dimensions.
    """
    portrait = landscape = 0
    # videos
    for p, _ in local_assets.get("videos", [])[:3]:
        try:
            with VideoFileClip(p) as clip:
                w, h = clip.w, clip.h
                if h >= w:
                    portrait += 1
                else:
                    landscape += 1
        except Exception as e:
            log.debug(f"Video probe failed ({p}): {e}")
    # images
    for p, _ in local_assets.get("images", [])[:3]:
        try:
            with Image.open(p) as im:
                w, h = im.size
                if h >= w:
                    portrait += 1
                else:
                    landscape += 1
        except Exception as e:
            log.debug(f"Image probe failed ({p}): {e}")
    return portrait, landscape


def auto_decide_orientation(article: Dict, meta: Dict, local_assets: Dict) -> str:
    """
    Decide orientation via LLM (primary) with heuristic fallback.
    """
    portrait, landscape = _probe_media_orientation(local_assets)
    vids_sum = [{"path": p, "src": s} for p, s in local_assets.get("videos", [])[:2]]
    imgs_sum = [{"path": p, "src": s} for p, s in local_assets.get("images", [])[:2]]

    context = {
        "videos_summary": vids_sum,
        "images_summary": imgs_sum,
        "use_case": "news short"
    }
    llm_choice = llm_decide_orientation(context)
    if llm_choice in ("portrait", "landscape"):
        log.info(f"LLM decided orientation: {llm_choice}")
        return llm_choice

    # Fallback heuristic
    if portrait > landscape:
        log.info("Orientation heuristic: portrait")
        return "portrait"
    elif landscape > portrait:
        log.info("Orientation heuristic: landscape")
        return "landscape"
    else:
        log.info("Orientation heuristic ambiguous; defaulting to portrait")
        return "portrait"


# ----------------------------- CAPTION RENDER ---------------------------

def _load_font(size: int) -> ImageFont.FreeTypeFont | ImageFont.ImageFont:
    for candidate in ["Arial.ttf", "Helvetica.ttf", "DejaVuSans.ttf"]:
        try:
            return ImageFont.truetype(candidate, size)
        except Exception:
            continue
    return ImageFont.load_default()


def _wrap_text(draw: ImageDraw.ImageDraw, text: str, font, max_width: int) -> List[str]:
    words = text.split()
    lines = []
    cur = ""
    for w in words:
        test = (cur + " " + w).strip()
        bbox = draw.textbbox((0, 0), test, font=font)
        if bbox[2] > max_width and cur:
            lines.append(cur)
            cur = w
        else:
            cur = test
    if cur:
        lines.append(cur)
    return lines


def make_caption_image(text: str, canvas_w: int) -> Image.Image:
    """
    Create a caption PNG with semi-transparent background and stroked text.
    """
    text = sanitize_text(text or "News Update")
    words = text.split()
    if len(words) > CAPTION_MAX_WORDS:
        text = " ".join(words[:CAPTION_MAX_WORDS])

    width = canvas_w - 120
    font = _load_font(CAPTION_FONT_SIZE)
    dummy = Image.new("RGB", (width, 200))
    draw = ImageDraw.Draw(dummy)
    lines = _wrap_text(draw, text, font, width - 80)
    line_h = CAPTION_FONT_SIZE + 10
    h = line_h * len(lines) + 40
    img = Image.new("RGBA", (width, h), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)
    bg = Image.new("RGBA", (width, h), (0, 0, 0, CAPTION_BOX_OPACITY))
    img = Image.alpha_composite(img, bg)
    y = 20
    for ln in lines:
        draw.text((40, y), ln, font=font, fill=(255, 255, 255, 255),
                  stroke_width=CAPTION_STROKE, stroke_fill=(0, 0, 0, 255))
        y += line_h
    return img


# ----------------------------- VIDEO COMPOSITION -----------------------

def _fit_to_canvas_clip(c: VideoFileClip | ImageClip, canvas_w: int, canvas_h: int) -> VideoFileClip | ImageClip:
    """
    Resize and center-crop to canvas (canvas_w x canvas_h).
    """
    # scale to match height first
    c2 = c.fx(resize, height=canvas_h)
    if c2.w != canvas_w:
        x1 = max(0, (c2.w - canvas_w) // 2)
        c2 = c2.crop(x1=x1, y1=0, x2=x1 + canvas_w, y2=canvas_h)
    return c2


def _make_base_from_videos(video_paths: List[str], total_duration: float, canvas_w: int, canvas_h: int) -> CompositeVideoClip:
    clips = []
    remaining = total_duration
    for vp in video_paths:
        try:
            c = VideoFileClip(vp)
            c = _fit_to_canvas_clip(c, canvas_w, canvas_h)
            dur = min(SUBCLIP_LEN_SEC, c.duration, remaining)
            clips.append(c.subclipped(0, max(1.0, dur)))
            remaining -= dur
            if remaining <= 0:
                break
        except Exception as e:
            log.warning(f"Video clip load failed ({vp}): {e}")
            continue
    if not clips:
        blank = ColorClip(size=(canvas_w, canvas_h), color=(0, 0, 0)).with_duration(total_duration)
        return CompositeVideoClip([blank], size=(canvas_w, canvas_h)).with_fps(FPS)
    base = CompositeVideoClip(clips, size=(canvas_w, canvas_h)).with_fps(FPS)
    return base


def _make_base_from_images(image_paths: List[str], total_duration: float, canvas_w: int, canvas_h: int) -> CompositeVideoClip:
    clips = []
    per = total_duration / max(1, len(image_paths))
    for ip in image_paths:
        try:
            img = Image.open(ip).convert("RGB")
            arr = np.array(img)
            iclip = ImageClip(arr)
            iclip = _fit_to_canvas_clip(iclip, canvas_w, canvas_h)
            clip = iclip.with_duration(max(3.0, per))
            clips.append(clip)
        except Exception as e:
            log.warning(f"Image clip load failed ({ip}): {e}")
            continue
    if not clips:
        blank = ColorClip(size=(canvas_w, canvas_h), color=(0, 0, 0)).with_duration(total_duration)
        return CompositeVideoClip([blank], size=(canvas_w, canvas_h)).with_fps(FPS)
    return CompositeVideoClip(clips, size=(canvas_w, canvas_h)).with_fps(FPS)


def compose_reel(
    bg_assets: Dict,
    caption_img: Image.Image,
    audio_path: Optional[str],
    out_mp4: str,
    out_thumb: str,
    canvas_w: int,
    canvas_h: int
):
    """
    Compose reel on a canvas of (canvas_w, canvas_h) with assets + caption + optional music.
    """
    total_duration = clamp(REEL_MIN_SEC + (len(bg_assets.get("videos", [])) * 2), REEL_MIN_SEC, REEL_MAX_SEC)

    if bg_assets.get("videos"):
        video_paths = [p for p, _ in bg_assets["videos"]]
        base = _make_base_from_videos(video_paths, total_duration, canvas_w, canvas_h)
        try:
            base.save_frame(out_thumb, t=0.2)
        except Exception:
            Image.new("RGB", (canvas_w, canvas_h), (0, 0, 0)).save(out_thumb, "JPEG", quality=90)
    else:
        image_paths = [p for p, _ in bg_assets.get("images", [])]
        base = _make_base_from_images(image_paths or [], total_duration, canvas_w, canvas_h)
        if image_paths:
            try:
                img = Image.open(image_paths[0]).convert("RGB").resize((canvas_w, canvas_h))
                img.save(out_thumb, "JPEG", quality=90)
            except Exception:
                Image.new("RGB", (canvas_w, canvas_h), (0, 0, 0)).save(out_thumb, "JPEG", quality=90)
        else:
            Image.new("RGB", (canvas_w, canvas_h), (0, 0, 0)).save(out_thumb, "JPEG", quality=90)

    tmp_cap = os.path.join(CACHE_DIR, f"cap_{uuid.uuid4().hex}.png")
    caption_img.save(tmp_cap)
    # Position the caption near the bottom-third
    y_pos = canvas_h - int(canvas_h * 0.19)
    caption_clip = ImageClip(tmp_cap).with_duration(base.duration)\
                                     .with_position(("center", y_pos))

    final = CompositeVideoClip([base, caption_clip], size=(canvas_w, canvas_h)).with_fps(FPS)

    if audio_path and os.path.exists(audio_path):
        try:
            music = AudioFileClip(audio_path).fx(volumex, 0.18)
            final = final.with_audio(music)
        except Exception as e:
            log.warning(f"Audio mix failed ({audio_path}): {e}")
    else:
        log.warning("No audio track found; proceeding silent.")

    final.write_videofile(
        out_mp4,
        codec="libx264",
        audio_codec="aac",
        fps=FPS,
        bitrate=VIDEO_BITRATE,
        threads=2
    )


# ----------------------------- META WRITER -----------------------------

def write_meta(meta: Dict, asset_info: Dict, out_meta_txt: str, url: str, status_ok: bool = True, reason: str = ""):
    """
    Write meta.txt in the strict field order required.
    """
    video_or_image_src = ""
    if asset_info.get("videos"):
        video_or_image_src = asset_info["videos"][0][1]
    elif asset_info.get("images"):
        video_or_image_src = asset_info["images"][0][1]

    audio_src = ""
    if asset_info.get("audio") and asset_info["audio"][1]:
        audio_src = asset_info["audio"][1]

    license_notes = asset_info.get("license_notes", "")

    if not status_ok:
        content = [
            f"NEWS_URL: {url}",
            f"TITLE: ",
            f"DESCRIPTION: ",
            f"KEYWORDS: ",
            f"HASHTAGS: ",
            f"ASSET_VIDEO_OR_IMAGE_SOURCE: ",
            f"ASSET_AUDIO_SOURCE: ",
            f"LICENSE_NOTES: ",
            f"STATUS: FAILED - {reason}"
        ]
        with open(out_meta_txt, "w", encoding="utf-8") as f:
            f.write("\n".join(content))
        return

    content = [
        f"NEWS_URL: {url}",
        f"TITLE: {meta.get('title','')}",
        f"DESCRIPTION: {meta.get('description','')}",
        f"KEYWORDS: {meta.get('keywords','')}",
        f"HASHTAGS: {meta.get('hashtags','')}",
        f"ASSET_VIDEO_OR_IMAGE_SOURCE: {video_or_image_src}",
        f"ASSET_AUDIO_SOURCE: {audio_src}",
        f"LICENSE_NOTES: {license_notes}"
    ]
    with open(out_meta_txt, "w", encoding="utf-8") as f:
        f.write("\n".join(content))


# ----------------------------- MAIN FLOW -------------------------------

def process_one(url: str, out_dir: str, idx: int, orientation_flag: str):
    """
    Process a single news URL into a reel.
    orientation_flag: 'portrait' | 'landscape' | 'auto'
    """
    news_dir = os.path.join(out_dir, f"news{idx}")
    ensure_dir(news_dir)

    out_mp4 = os.path.join(news_dir, "reel.mp4")
    out_meta = os.path.join(news_dir, "meta.txt")
    out_thumb = os.path.join(news_dir, "thumb.jpg")

    try:
        log.info(f"[{idx}] Fetching: {url}")
        article = scrape_article(url)
        if not (article["title"] or article["text"]):
            write_meta({}, {}, out_meta, url, status_ok=False, reason="ScrapeError")
            return

        log.info(f"[{idx}] Generating SEO meta via local LLM...")
        meta = llm_generate_meta(article)

        log.info(f"[{idx}] Selecting free assets...")
        assets = select_free_assets(meta)

        log.info(f"[{idx}] Downloading assets...")
        local_assets = download_assets(assets)

        if not local_assets.get("videos") and not local_assets.get("images"):
            log.warning(f"[{idx}] No video/image assets found; using blank background.")

        # Orientation decision
        if orientation_flag == "auto":
            decided = auto_decide_orientation(article, meta, local_assets)
        else:
            decided = orientation_flag
            log.info(f"[{idx}] Orientation flag: {decided}")

        if decided == "landscape":
            canvas_w, canvas_h = DEF_LANDSCAPE
        else:
            canvas_w, canvas_h = DEF_PORTRAIT

        caption_text = meta.get("title") or article.get("title") or "News Update"
        caption_img = make_caption_image(caption_text, canvas_w=canvas_w)

        log.info(f"[{idx}] Composing reel on {canvas_w}x{canvas_h} canvas...")
        audio_path, _ = local_assets.get("audio", (None, None))
        compose_reel(local_assets, caption_img, audio_path, out_mp4, out_thumb, canvas_w, canvas_h)

        write_meta(meta, local_assets, out_meta, url, status_ok=True)
        log.info(f"[{idx}] DONE → {out_mp4}")

    except Exception as e:
        log.exception(f"[{idx}] Failed to build reel for URL={url}")
        write_meta({}, {}, out_meta, url, status_ok=False, reason=str(e))


def main(input_path: str, orientation_flag: str):
    # Output date folder
    base_out = os.path.join("videos_output", today_str())
    ensure_dir(base_out)

    # Initialize logging to files inside today's folder
    global log
    log = setup_logging(base_out)
    log.info(f"Starting run | input={input_path} | orientation={orientation_flag}")

    # Read URLs
    if not os.path.exists(input_path):
        log.error(f"Input file not found: {input_path}")
        sys.exit(1)
    with open(input_path, "r", encoding="utf-8") as f:
        urls = [sanitize_text(line) for line in f if sanitize_text(line)]

    if not urls:
        log.error("No URLs found in input file.")
        sys.exit(1)

    for i, url in enumerate(urls, start=1):
        process_one(url, base_out, i, orientation_flag)

    log.info("All tasks completed.")


# ----------------------------- CLI -------------------------------------

if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description="Create Shorts/Reels from news URLs using a local LLM and free stock assets."
    )
    parser.add_argument("--input", required=True, help="Path to input.txt (one news URL per line)")
    parser.add_argument(
        "-o", "--orientation",
        choices=["portrait", "landscape", "auto"],
        default="portrait",
        help="Canvas orientation: portrait | landscape | auto (LLM decides)"
    )
    args = parser.parse_args()
    main(args.input, args.orientation)


# ---------------------------- ACCEPTANCE TEST --------------------------
# Example input.txt:
#   https://www.bbc.com/news/technology-12345678
#   https://www.reuters.com/world/asia-pacific/example-article-2025-10-31/
#   https://www.theverge.com/2025/01/15/example-news
#
# Expected output tree:
# videos_output/2025-11-06/
#   logs/
#     news_to_reels.log
#     errors.log
#   news1/
#     reel.mp4
#     meta.txt
#     thumb.jpg
#   news2/
#     reel.mp4
#     meta.txt
#     thumb.jpg
#   news3/
#     reel.mp4
#     meta.txt
#     thumb.jpg
#
# Example meta.txt preview:
# NEWS_URL: https://www.example.com/article-abc
# TITLE: EU unveils new AI safety rules for consumer devices
# DESCRIPTION: The EU has introduced updated guidance to strengthen safety and transparency in AI‑powered consumer products, focusing on fair use and accountability across the bloc.
# KEYWORDS: ai policy,consumer safety,eu regulation,algorithmic transparency,device compliance,trustworthy ai,accountability,tech policy,model governance,digital markets
# HASHTAGS: #AI #Policy #EU #Safety #Tech #Governance #Transparency #Devices #Regulation #Innovation
# ASSET_VIDEO_OR_IMAGE_SOURCE: https://www.pexels.com/video/...
# ASSET_AUDIO_SOURCE: https://assets.mixkit.co/music/download/...
# LICENSE_NOTES: Pexels license link | Pixabay/Mixkit license link(s)
#
# Setup notes:
# - Create .env with PEXELS_API_KEY, PIXABAY_API_KEY, and optional LLM_MODEL.
# - Ensure Ollama is running locally: `ollama serve`, and a model is available: `ollama pull mistral:7b-instruct`.
# - FFmpeg must be installed (e.g., via Homebrew) for MoviePy to encode H.264/AAC.
#
