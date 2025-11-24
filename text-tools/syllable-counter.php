<?php
$page_title = 'Syllable Counter - Count Syllables in Text';
$page_description = 'Count syllables in words and text.';
$breadcrumbs = [
    ['title' => 'Home', 'url' => 'index.php'],
    ['title' => 'Syllable Counter', 'url' => '']
];
$page_css = 'syllable-counter.css';
$page_js = 'syllable-counter.js';
include 'header.php';
?>
<div class="container">
    
  <div class="d-flex justify-content-end mb-3" style="gap:1rem;">
    <button id="share-btn" class="btn btn-outline-secondary" title="Share this tool"><span>ðŸ”—</span> Share</button>
    <button id="fav-btn" class="btn btn-outline-warning" title="Add to Favourites"><span>â­</span> Add to Favourites</button>
  </div>
    <p class="subtitle">Count syllables in words and text</p>

    <div class="card">
      <div class="card-title">📝 Input Text</div>
      <textarea class="textarea-field" id="inputText" placeholder="Enter text to count syllables..."></textarea>
      <button class="action-btn" onclick="countAllSyllables()">🔢 Count Syllables</button>
    </div>

    <div class="card" id="resultsCard" style="display: none;">
      <div class="card-title">📊 Syllable Count Results</div>
      
      <div class="stats-grid">
        <div class="stat-box">
          <div class="stat-label">Total Syllables</div>
          <div class="stat-value" id="totalSyllables">0</div>
        </div>
        <div class="stat-box">
          <div class="stat-label">Total Words</div>
          <div class="stat-value" id="totalWords">0</div>
        </div>
        <div class="stat-box">
          <div class="stat-label">Avg per Word</div>
          <div class="stat-value" id="avgSyllables">0</div>
        </div>
      </div>
      
      <div class="card-title" style="margin-top: 25px;">📋 Word Breakdown</div>
      <div class="word-list" id="wordList"></div>
    </div>
  </div>
<?php include 'footer.php'; ?>

