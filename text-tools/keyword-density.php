<?php
$page_title = 'Keyword Density Calculator';
$page_description = 'Calculate keyword density and frequency in text.';
$breadcrumbs = [
    ['title' => 'Home', 'url' => 'index.php'],
    ['title' => 'Keyword Density', 'url' => '']
];
$page_css = 'keyword-density.css';
$page_js = 'keyword-density.js';
include 'header.php';
?>
<div class="container">
    
  <div class="d-flex justify-content-end mb-3" style="gap:1rem;">
    <button id="share-btn" class="btn btn-outline-secondary" title="Share this tool"><span>ðŸ”—</span> Share</button>
    <button id="fav-btn" class="btn btn-outline-warning" title="Add to Favourites"><span>â­</span> Add to Favourites</button>
  </div>
    <p class="subtitle">Calculate keyword frequency and density percentage</p>

    <div class="card">
      <div class="card-title">📝 Input Text</div>
      <textarea class="textarea-field" id="inputText" placeholder="Enter your text content..."></textarea>
      
      <div class="card-title" style="margin-top: 20px;">🎯 Keywords (comma-separated)</div>
      <input type="text" class="input-field" id="keywords" placeholder="keyword1, keyword2, keyword3...">
      
      <button class="action-btn" onclick="calculateDensity()">📊 Calculate Keyword Density</button>
    </div>

    <div class="card" id="resultsCard" style="display: none;">
      <div class="card-title">📈 Keyword Density Results</div>
      <div class="keyword-result" id="resultsList"></div>
    </div>
  </div>
<?php include 'footer.php'; ?>

