# News Aggregation & AI Article Generator

## Overview
`auto1.py` reads an input CSV containing a primary keyword and a list of source news URLs about the same event, fetches and aggregates their content, searches for related YouTube videos and Tweets, builds an SEO-focused prompt, and calls a local LLaMA model (via Ollama) to generate a unique HTML news article. Output is saved to a CSV.

## Input CSV Format
Pipe `|` delimited (no header required):
```
primary keyword | url1,url2,url3
```
Multiple lines allowed. Example in `sample_input.csv`.

## Output CSV Format
Pipe-delimited with header:
```
primary_keyword | source_urls | generated_title | generated_html_body
```

## Requirements
- Python 3.10+
- Ollama installed locally (Mac/Windows/Linux). Pull a LLaMA model: `ollama pull llama3`
- API keys (optional but recommended):
  - YouTube Data API v3 key (`YOUTUBE_API_KEY`)
  - Twitter (X) API v2 Bearer token (`TWITTER_BEARER_TOKEN`)

If API keys are absent the script still runs but embeds will be empty.

## Install Dependencies
```powershell
python -m venv .venv
.venv\Scripts\Activate.ps1
pip install -r requirements.txt
```
(Mac/Linux adjust activation: `source .venv/bin/activate`)

## Environment Variables
Set these before running.
```powershell
$env:YOUTUBE_API_KEY = "YOUR_YT_KEY"
$env:TWITTER_BEARER_TOKEN = "YOUR_TWITTER_TOKEN"
$env:OLLAMA_BASE_URL = "http://localhost:11434"  # default
```

## Run Ollama (if not already)
Ensure Ollama service is running and the model is available:
```powershell
ollama list
ollama pull llama3
```

## Run Script
```powershell
python auto1.py --input sample_input.csv --output output.csv --model llama3
```

Optional limit number of records:
```powershell
python auto1.py --input sample_input.csv --output output.csv --max-records 1
```

## Sample Workflow
1. Populate `sample_input.csv` with event keyword and related source URLs.
2. Export API keys to environment.
3. Run script.
4. Inspect `output.csv` for generated title and HTML body.
5. Paste HTML body into your CMS.<br>
   Ensure Twitter embed script appears only once on page; script already appended if tweets found.

## Local LLM Notes
Script uses Ollama HTTP endpoint `/api/generate`. Adjust `--model` to any pulled model (e.g., `llama2`, `mistral`, `mixtral`). If generation fails, a placeholder article is output and logged.

## Extending
- Add proper summarization (e.g., integrate `sumy` or `transformers` summarizer).
- Add language detection and translation if sources mixed.
- Add retry/backoff logic on fetch (currently single attempt).
- Persist intermediate raw source text for auditing.

## Disclaimer
Generated content should be editorially reviewed for accuracy and compliance with journalistic standards. API usage must respect terms of service; ensure you have rights to republish any embedded media.
