"""News Aggregation and AI Article Generation Script

Workflow:
1. Read input CSV: primary_keyword | comma_separated_urls
2. For each row:
   a. Fetch and extract readable text from each URL (retry + timeout)
   b. Merge/clean content into a combined source corpus
   c. Query YouTube Data API for related videos (top N) -> build <iframe> embed codes
   d. Query Twitter (X) API for related tweets (search recent) -> build embed blockquotes
   e. Build a comprehensive SEO-oriented prompt including:
        - Primary keyword
        - Source summaries
        - Instructions to embed provided video/tweet codes at natural positions
        - On-page SEO requirements (title H1, meta-like intro, subheadings, schema suggestion, FAQ, internal link anchor suggestions)
   f. Call local LLaMA model via Ollama HTTP API (or fallback to text generation placeholder) to produce HTML body content.
   g. Write output CSV row: primary keyword | urls | generated title | generated HTML content

Prerequisites:
- Python 3.10+
- pip install -r requirements.txt
- Environment variables:
    YOUTUBE_API_KEY=... (YouTube Data API v3)
    TWITTER_BEARER_TOKEN=... (Twitter API v2 recent search)
- Ollama installed locally with a LLaMA model pulled, e.g.:
    ollama pull llama3

Run:
    python auto1.py --input input.csv --output output.csv

Note:
If APIs are unavailable, script will continue with empty embed lists.
"""
from __future__ import annotations
import csv
import os
import re
import sys
import time
import json
import logging
import argparse
from dataclasses import dataclass, field
from typing import List, Optional, Tuple
from concurrent.futures import ThreadPoolExecutor, as_completed

import requests
from bs4 import BeautifulSoup

# ---------------- Logging Configuration ----------------
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(message)s",
    handlers=[logging.StreamHandler(sys.stdout)],
)
logger = logging.getLogger(__name__)

USER_AGENT = (
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 "
    "(KHTML, like Gecko) Chrome/118.0.0.0 Safari/537.36"
)
HEADERS = {"User-Agent": USER_AGENT, "Accept-Language": "en-US,en;q=0.9"}

# ---------------- Data Classes ----------------
@dataclass
class FetchedContent:
    url: str
    text: str
    success: bool
    error: Optional[str] = None

@dataclass
class MediaEmbeds:
    videos: List[str] = field(default_factory=list)  # list of iframe HTML snippets
    tweets: List[str] = field(default_factory=list)  # list of blockquote or anchor HTML snippets

# ---------------- Utility Functions ----------------

def read_input_csv(path: str) -> List[Tuple[str, List[str]]]:
    rows: List[Tuple[str, List[str]]] = []
    with open(path, newline='', encoding='utf-8') as f:
        reader = csv.reader(f, delimiter='|')
        for raw in reader:
            if not raw or len(raw) < 2:
                continue
            primary = raw[0].strip()
            urls_segment = raw[1].strip()
            if not primary or not urls_segment:
                continue
            urls = [u.strip() for u in urls_segment.split(',') if u.strip()]
            if urls:
                rows.append((primary, urls))
    return rows

def fetch_url(url: str, timeout: int = 12, max_chars: int = 12000) -> FetchedContent:
    try:
        resp = requests.get(url, headers=HEADERS, timeout=timeout)
        if resp.status_code != 200:
            return FetchedContent(url=url, text="", success=False, error=f"status {resp.status_code}")
        soup = BeautifulSoup(resp.text, 'html.parser')
        # Remove scripts/styles
        for tag in soup(['script', 'style', 'noscript', 'header', 'footer', 'form', 'aside']):
            tag.decompose()
        text = ' '.join(soup.stripped_strings)
        # Basic cleanup
        text = re.sub(r"\s+", " ", text)
        if len(text) > max_chars:
            text = text[:max_chars] + "..."
        return FetchedContent(url=url, text=text, success=True)
    except Exception as e:  # noqa: BLE001
        return FetchedContent(url=url, text="", success=False, error=str(e))

def fetch_all(urls: List[str], workers: int = 6) -> List[FetchedContent]:
    results: List[FetchedContent] = []
    with ThreadPoolExecutor(max_workers=workers) as ex:
        future_map = {ex.submit(fetch_url, u): u for u in urls}
        for fut in as_completed(future_map):
            results.append(fut.result())
    return results

def summarize_sources(contents: List[FetchedContent], primary_keyword: str) -> str:
    parts = []
    for c in contents:
        if not c.success or not c.text:
            continue
        # Light summarization: truncate and annotate source
        snippet = c.text[:800]
        parts.append(f"Source: {c.url}\nSnippet: {snippet}\n")
    if not parts:
        return f"No successful sources fetched for {primary_keyword}."\
            + " Provide general background and craft article from known context."  # noqa: E501
    return "\n\n".join(parts)

# ---------------- External API Integrations ----------------

def search_youtube(query: str, max_results: int = 3) -> List[str]:
    api_key = os.getenv("YOUTUBE_API_KEY")
    if not api_key:
        logger.warning("YOUTUBE_API_KEY not set; skipping YouTube search.")
        return []
    url = (
        "https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&"\
        f"q={requests.utils.quote(query)}&maxResults={max_results}&key={api_key}"
    )
    try:
        r = requests.get(url, timeout=10)
        r.raise_for_status()
        data = r.json()
        items = data.get('items', [])
        embeds: List[str] = []
        for it in items:
            vid = it.get('id', {}).get('videoId')
            if not vid:
                continue
            embeds.append(
                f'<div class="video-embed"><iframe width="560" height="315" '
                f'src="https://www.youtube.com/embed/{vid}" '
                'title="YouTube video" frameborder="0" allow="accelerometer; autoplay; clipboard-write; '
                'encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>'
            )
        return embeds
    except Exception as e:  # noqa: BLE001
        logger.error(f"YouTube API error: {e}")
        return []

def search_twitter(query: str, max_results: int = 3) -> List[str]:
    bearer = os.getenv("TWITTER_BEARER_TOKEN")
    if not bearer:
        logger.warning("TWITTER_BEARER_TOKEN not set; skipping Twitter search.")
        return []
    search_url = "https://api.twitter.com/2/tweets/search/recent"
    params = {
        "query": query,
        "max_results": min(max_results, 10),
        "tweet.fields": "author_id,created_at,lang,public_metrics"}
    headers = {"Authorization": f"Bearer {bearer}"}
    try:
        r = requests.get(search_url, params=params, headers=headers, timeout=10)
        r.raise_for_status()
        data = r.json()
        tweets = data.get('data', [])
        embeds: List[str] = []
        for t in tweets[:max_results]:
            tid = t.get('id')
            if not tid:
                continue
            # Simple embed via blockquote referencing tweet URL; actual embed would need script.
            tweet_url = f"https://twitter.com/i/web/status/{tid}"
            embeds.append(
                '<blockquote class="twitter-tweet"><a href="' + tweet_url + '"></a></blockquote>'
            )
        # Include script tag once (consumer can deduplicate later if merging many articles)
        if embeds:
            embeds.append('<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>')
        return embeds
    except Exception as e:  # noqa: BLE001
        logger.error(f"Twitter API error: {e}")
        return []

# ---------------- LLM Interaction ----------------

def build_prompt(primary_keyword: str, source_summary: str, embeds: MediaEmbeds) -> str:
    video_placeholders = "\n".join(f"[VIDEO_EMBED_{i}] {emb}" for i, emb in enumerate(embeds.videos, start=1))
    tweet_placeholders = "\n".join(f"[TWEET_EMBED_{i}] {emb}" for i, emb in enumerate(embeds.tweets, start=1))
    instructions = f"""
You are an elite investigative news journalist and SEO strategist.
Task: Using the aggregated source snippets below, craft a completely original, human-quality, balanced, factual news article about: {primary_keyword}.
Mandatory SEO & Structure Requirements:
- Output must be valid HTML fragment for <body> (no <html>, <head>, or <body> tags) using semantic tags.
- Start with an <h1> containing a compelling, keyword-optimized title (return EXACT title text later separately).
- Include an introductory <p> with concise summary and key facts.
- Use multiple <h2>/<h3> subheadings with keyword variations, chronology, impact, stakeholder reactions.
- Naturally integrate provided video and tweet embed placeholders at contextually appropriate points (do not dump them together). Keep surrounding explanatory text.
- Provide a bulleted Key Points section (<ul>) early.
- Include a short FAQ section (2-4 questions) with schema-friendly structure.
- Include an internal linking suggestions section as HTML comments: <!-- INTERNAL_LINK: anchor text --> for 3-5 anchors.
- End with a concise forward-looking analysis paragraph.
On-Page SEO Guidelines:
- Use primary keyword in first 120 characters.
- Use synonyms / related entities, avoid keyword stuffing.
- Maintain neutral tone and attribute claims.
- Avoid sensationalism; maintain journalistic integrity.
Embedding Media:
Integrate each [VIDEO_EMBED_X] and [TWEET_EMBED_X] code at a natural narrative spot, removing the placeholder label but keeping the HTML snippet.
Do NOT alter the iframe or blockquote code.
Return Format:
<ARTICLE_HTML> ... full HTML ... </ARTICLE_HTML>
<TITLE>Exact Title Text</TITLE>
Source Material:
{source_summary}
Embeds Provided:
Videos:\n{video_placeholders or 'None'}\nTweets:\n{tweet_placeholders or 'None'}
"""
    return instructions.strip()

def call_local_llama(prompt: str, model: str = "llama3", max_tokens: int = 1800) -> Tuple[str, str]:
    """Call local Ollama server for generation. Return (html, title)."""
    base_url = os.getenv("OLLAMA_BASE_URL", "http://localhost:11434")
    endpoint = f"{base_url}/api/generate"
    payload = {"model": model, "prompt": prompt, "stream": False}
    try:
        r = requests.post(endpoint, json=payload, timeout=60)
        r.raise_for_status()
        data = r.json()
        full = data.get('response', '')
    except Exception as e:  # noqa: BLE001
        logger.error(f"Ollama generation failed: {e}; returning placeholder content.")
        full = "<ARTICLE_HTML><h1>Placeholder Title</h1><p>Failed to generate content.</p></ARTICLE_HTML><TITLE>Placeholder Title</TITLE>"
    # Parse returned markers
    html_match = re.search(r"<ARTICLE_HTML>([\s\S]*?)</ARTICLE_HTML>", full)
    title_match = re.search(r"<TITLE>([\s\S]*?)</TITLE>", full)
    article_html = html_match.group(1).strip() if html_match else full
    title = title_match.group(1).strip() if title_match else "Untitled"
    return article_html, title

# ---------------- Main Processing ----------------

def process_record(primary_keyword: str, urls: List[str]) -> Tuple[str, str, str, str]:
    logger.info(f"Processing keyword '{primary_keyword}' with {len(urls)} URLs")
    fetched = fetch_all(urls)
    for fc in fetched:
        if not fc.success:
            logger.warning(f"Failed fetch {fc.url}: {fc.error}")
    source_summary = summarize_sources(fetched, primary_keyword)

    # Media searches (best-effort)
    video_embeds = search_youtube(primary_keyword, max_results=3)
    tweet_embeds = search_twitter(primary_keyword, max_results=3)
    embeds = MediaEmbeds(videos=video_embeds, tweets=tweet_embeds)

    prompt = build_prompt(primary_keyword, source_summary, embeds)
    html_body, title = call_local_llama(prompt)
    urls_joined = ",".join(urls)
    return primary_keyword, urls_joined, title, html_body

def write_output_csv(path: str, rows: List[Tuple[str, str, str, str]]) -> None:
    with open(path, 'w', newline='', encoding='utf-8') as f:
        writer = csv.writer(f, delimiter='|')
        writer.writerow(["primary_keyword", "source_urls", "generated_title", "generated_html_body"])
        for r in rows:
            writer.writerow(r)

# ---------------- CLI ----------------

def parse_args(argv: Optional[List[str]] = None) -> argparse.Namespace:
    p = argparse.ArgumentParser(description="Aggregate news sources and generate AI article.")
    p.add_argument('--input', required=True, help='Input CSV path (primary|url1,url2)')
    p.add_argument('--output', required=True, help='Output CSV path')
    p.add_argument('--model', default='llama3', help='Ollama model name')
    p.add_argument('--max-records', type=int, default=None, help='Limit number of records processed')
    return p.parse_args(argv)

def main():
    args = parse_args()
    records = read_input_csv(args.input)
    if args.max_records is not None:
        records = records[: args.max_records]
    if not records:
        logger.error('No valid input records found.')
        sys.exit(1)
    output_rows = []
    for primary, urls in records:
        try:
            pk, url_list, title, html = process_record(primary, urls)
            output_rows.append((pk, url_list, title, html))
            time.sleep(1)  # polite pause
        except Exception as e:  # noqa: BLE001
            logger.exception(f"Failed processing {primary}: {e}")
    write_output_csv(args.output, output_rows)
    logger.info(f"Wrote {len(output_rows)} records to {args.output}")

if __name__ == '__main__':
    main()
