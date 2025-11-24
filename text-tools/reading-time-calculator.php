<?php
$page_title = 'Reading Time Calculator - Estimate Reading Time';
$page_description = 'Calculate reading time based on word count and reading speed.';
$breadcrumbs = [
    ['title' => 'Home', 'url' => 'index.php'],
    ['title' => 'Reading Time Calculator', 'url' => '']
];
$page_css = 'reading-time-calculator.css';
$page_js = 'reading-time-calculator.js';
include 'header.php';
?>
<div class="container">
    
  <div class="d-flex justify-content-end mb-3" style="gap:1rem;">
    <button id="share-btn" class="btn btn-outline-secondary" title="Share this tool"><span>ðŸ”—</span> Share</button>
    <button id="fav-btn" class="btn btn-outline-warning" title="Add to Favourites"><span>â­</span> Add to Favourites</button>
  </div>
    <p class="subtitle">Estimate reading time for your content</p>

    <div class="card">
      <div class="card-title">📝 Your Text</div>
      <textarea class="textarea-field" id="textInput" placeholder="Paste your text here..." oninput="calculateReadingTime()"></textarea>
      
      <div class="settings-grid">
        <div class="setting-group">
          <label class="setting-label">Reading Speed (WPM)</label>
          <input type="number" class="setting-input" id="wpmInput" value="200" min="100" max="400" oninput="calculateReadingTime()">
        </div>
        <div class="setting-group">
          <label class="setting-label">Image Time (sec)</label>
          <input type="number" class="setting-input" id="imageTime" value="12" min="0" max="60" oninput="calculateReadingTime()">
        </div>
        <div class="setting-group">
          <label class="setting-label">Image Count</label>
          <input type="number" class="setting-input" id="imageCount" value="0" min="0" oninput="calculateReadingTime()">
        </div>
      </div>
    </div>

    <div class="card">
      <div class="card-title">⏱️ Reading Time Estimates</div>
      <div class="results-grid">
        <div class="result-box">
          <div class="result-label">Slow (150 WPM)</div>
          <div class="result-value" id="slowTime">0 min</div>
        </div>
        <div class="result-box">
          <div class="result-label">Average (200 WPM)</div>
          <div class="result-value" id="avgTime">0 min</div>
        </div>
        <div class="result-box">
          <div class="result-label">Fast (250 WPM)</div>
          <div class="result-value" id="fastTime">0 min</div>
        </div>
      </div>
      
      <div class="stats-grid">
        <div class="stat-box">
          <div class="stat-label">Words</div>
          <div class="stat-value" id="wordCount">0</div>
        </div>
        <div class="stat-box">
          <div class="stat-label">Characters</div>
          <div class="stat-value" id="charCount">0</div>
        </div>
        <div class="stat-box">
          <div class="stat-label">Sentences</div>
          <div class="stat-value" id="sentenceCount">0</div>
        </div>
        <div class="stat-box">
          <div class="stat-label">Paragraphs</div>
          <div class="stat-value" id="paragraphCount">0</div>
        </div>
      </div>
    </div>
  </div>
<?php include 'footer.php'; ?>

