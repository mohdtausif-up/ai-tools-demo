<?php
$page_title = 'Word Counter & Text Analyzer';
$page_description = 'Count words, characters, sentences, and calculate reading time for your content.';
$breadcrumbs = [
    ['title' => 'Home', 'url' => 'index.php'],
    ['title' => 'Word Counter', 'url' => '']
];
$page_css = 'word-counter.css';
$page_js = 'word-counter.js';
include 'header.php';
?>
<div class="container">
    
  <div class="d-flex justify-content-end mb-3" style="gap:1rem;">
    <button id="share-btn" class="btn btn-outline-secondary" title="Share this tool"><span>ðŸ”—</span> Share</button>
    <button id="fav-btn" class="btn btn-outline-warning" title="Add to Favourites"><span>â­</span> Add to Favourites</button>
  </div>
    <p class="subtitle">Analyze your content with detailed statistics</p>

    <div class="stats-grid">
      <div class="stat-card">
        <div class="stat-value" id="wordCount">0</div>
        <div class="stat-label">Words</div>
      </div>
      <div class="stat-card">
        <div class="stat-value" id="charCount">0</div>
        <div class="stat-label">Characters</div>
      </div>
      <div class="stat-card">
        <div class="stat-value" id="charNoSpaceCount">0</div>
        <div class="stat-label">Chars (no spaces)</div>
      </div>
      <div class="stat-card">
        <div class="stat-value" id="sentenceCount">0</div>
        <div class="stat-label">Sentences</div>
      </div>
      <div class="stat-card">
        <div class="stat-value" id="paragraphCount">0</div>
        <div class="stat-label">Paragraphs</div>
      </div>
      <div class="stat-card">
        <div class="stat-value" id="readingTime">0</div>
        <div class="stat-label">Reading Time (min)</div>
      </div>
    </div>

    <div class="input-card">
      <textarea class="textarea-field" id="textInput" placeholder="Start typing or paste your text here..." oninput="analyzeText()"></textarea>
      <div class="button-row">
        <button class="btn btn-primary" onclick="copyText()">📋 Copy Text</button>
        <button class="btn btn-secondary" onclick="clearText()">🗑️ Clear</button>
      </div>
    </div>
      <section class="how-to-use" style="margin-top:2rem;padding:1.5rem;background:#f9fafb;border-radius:8px;box-shadow:0 1px 4px rgba(0,0,0,0.04);">
        <h2 style="font-size:1.2rem;color:#2563eb;margin-bottom:0.7rem;">How to Use</h2>
        <ol style="margin-left:1.2rem;">
          <li>Type or paste your text into the input area.</li>
          <li>View word, character, sentence, paragraph counts, and estimated reading time instantly.</li>
          <li>Use the Copy or Clear buttons as needed.</li>
          <li>Optimize your content for SEO and readability using the provided statistics.</li>
        </ol>
      </section>
  </div>
<?php include 'footer.php'; ?>

