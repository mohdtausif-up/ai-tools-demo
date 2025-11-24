<?php
$page_title = 'Sentence Analyzer - Analyze Sentence Structure';
$page_description = 'Analyze sentence count, average length, and complexity.';
$breadcrumbs = [
    ['title' => 'Home', 'url' => 'index.php'],
    ['title' => 'Sentence Analyzer', 'url' => '']
];
$page_css = 'sentence-analyzer.css';
$page_js = 'sentence-analyzer.js';
include 'header.php';
?>
<div class="container">
    
  <div class="d-flex justify-content-end mb-3" style="gap:1rem;">
    <button id="share-btn" class="btn btn-outline-secondary" title="Share this tool"><span>ðŸ”—</span> Share</button>
    <button id="fav-btn" class="btn btn-outline-warning" title="Add to Favourites"><span>â­</span> Add to Favourites</button>
  </div>
    <p class="subtitle">Analyze sentence structure and complexity</p>

    <div class="card">
      <div class="card-title">📝 Input Text</div>
      <textarea class="textarea-field" id="inputText" placeholder="Enter text to analyze sentences..."></textarea>
      <button class="action-btn" onclick="analyzeSentences()">🔍 Analyze Sentences</button>
    </div>

    <div class="card" id="resultsCard" style="display: none;">
      <div class="card-title">📈 Analysis Results</div>
      
      <div class="stats-grid">
        <div class="stat-box">
          <div class="stat-label">Total Sentences</div>
          <div class="stat-value" id="sentenceCount">0</div>
        </div>
        <div class="stat-box">
          <div class="stat-label">Avg Words/Sentence</div>
          <div class="stat-value" id="avgWords">0</div>
        </div>
        <div class="stat-box">
          <div class="stat-label">Avg Chars/Sentence</div>
          <div class="stat-value" id="avgChars">0</div>
        </div>
      </div>
      
      <div class="detail-box">
        <div class="detail-row">
          <span class="detail-label">Shortest Sentence:</span>
          <span class="detail-value" id="shortestLength">0 words</span>
        </div>
        <div class="detail-row">
          <span class="detail-label">Longest Sentence:</span>
          <span class="detail-value" id="longestLength">0 words</span>
        </div>
        <div class="detail-row">
          <span class="detail-label">Questions:</span>
          <span class="detail-value" id="questionCount">0</span>
        </div>
        <div class="detail-row">
          <span class="detail-label">Exclamations:</span>
          <span class="detail-value" id="exclamationCount">0</span>
        </div>
        <div class="detail-row">
          <span class="detail-label">Complex Sentences (>25 words):</span>
          <span class="detail-value" id="complexCount">0</span>
        </div>
        <div class="detail-row" style="border: none;">
          <span class="detail-label">Complexity Level:</span>
          <span class="detail-value" id="complexityBadge"></span>
        </div>
      </div>
    </div>
  </div>
<?php include 'footer.php'; ?>

