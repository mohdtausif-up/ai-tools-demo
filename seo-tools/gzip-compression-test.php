<?php
$page_title = 'GZIP Compression Test - Check Compression Status';
$page_description = 'Check if GZIP or Brotli compression is enabled on any website for faster loading.';
$breadcrumbs = [
    ['title' => 'Home', 'url' => 'index.php'],
    ['title' => 'Gzip Compression Test', 'url' => '']
];
$page_css = 'gzip-compression-test.css';
$page_js = 'gzip-compression-test.js';
include 'header.php';
?>
<div class="container">
    
  <div class="d-flex justify-content-end mb-3" style="gap:1rem;">
    <button id="share-btn" class="btn btn-outline-secondary" title="Share this tool"><span>ðŸ”—</span> Share</button>
    <button id="fav-btn" class="btn btn-outline-warning" title="Add to Favourites"><span>â­</span> Add to Favourites</button>
  </div>
    <p class="subtitle">Check if compression is enabled for faster page loading</p>

    <div class="input-card">
      <div class="input-row">
        <input type="text" class="input-field" id="urlInput" value="https://example.com" placeholder="Enter website URL">
        <button class="check-btn" id="checkBtn" onclick="checkCompression()">🔍 Test Compression</button>
      </div>
    </div>

    <div class="results-card" id="resultsCard" style="display: none;">
      <div class="status-box" id="statusBox"></div>
      <div class="info-grid" id="infoGrid"></div>
    </div>
  </div>
<?php include 'footer.php'; ?>

