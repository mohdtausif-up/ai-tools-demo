<?php
$page_title = 'Duplicate Content Checker - Text Similarity Detection';
$page_description = 'Compare text content to detect duplicate or similar content for SEO optimization.';
$breadcrumbs = [
    ['title' => 'Home', 'url' => 'index.php'],
    ['title' => 'Duplicate Content Checker', 'url' => '']
];
$page_css = 'duplicate-content-checker.css';
$page_js = 'duplicate-content-checker.js';
include 'header.php';
?>
<div class="container">
    
  <div class="d-flex justify-content-end mb-3" style="gap:1rem;">
    <button id="share-btn" class="btn btn-outline-secondary" title="Share this tool"><span>ðŸ”—</span> Share</button>
    <button id="fav-btn" class="btn btn-outline-warning" title="Add to Favourites"><span>â­</span> Add to Favourites</button>
  </div>
    <p class="subtitle">Compare text content to detect similarity and duplicates</p>

    <div class="input-container">
      <div class="input-card">
        <div class="card-title">📄 Content 1</div>
        <textarea class="textarea-field" id="content1" placeholder="Paste your first content here..."></textarea>
        <div class="char-info" id="charInfo1">0 words, 0 characters</div>
      </div>
      
      <div class="input-card">
        <div class="card-title">📄 Content 2</div>
        <textarea class="textarea-field" id="content2" placeholder="Paste your second content here..."></textarea>
        <div class="char-info" id="charInfo2">0 words, 0 characters</div>
      </div>
    </div>

    <div class="compare-btn-container">
      <button class="compare-btn" onclick="compareContent()">⚡ Compare Content</button>
    </div>

    <div class="results-card" id="resultsCard" style="display: none;">
      <div class="similarity-score">
        <div class="score-circle" id="scoreCircle">0%</div>
        <div class="score-label" id="scoreLabel">Similarity Score</div>
        <div class="score-desc" id="scoreDesc">Calculating similarity...</div>
      </div>

      <div class="analysis-section">
        <div class="section-title">📊 Content Analysis</div>
        <div class="stat-grid" id="statsGrid"></div>
      </div>

      <div class="analysis-section">
        <div class="section-title">💡 Recommendation</div>
        <div class="recommendation-box" id="recommendationBox"></div>
      </div>
    </div>
  </div>
<?php include 'footer.php'; ?>

