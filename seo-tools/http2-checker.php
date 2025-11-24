<?php
$page_title = 'HTTP/2 Checker - Verify HTTP/2 Support';
$page_description = 'Check if a website supports HTTP/2 protocol for better performance.';
$breadcrumbs = [
    ['title' => 'Home', 'url' => 'index.php'],
    ['title' => 'Http2 Checker', 'url' => '']
];
$page_css = 'http2-checker.css';
$page_js = 'http2-checker.js';
include 'header.php';
?>
<div class="container">
    
  <div class="d-flex justify-content-end mb-3" style="gap:1rem;">
    <button id="share-btn" class="btn btn-outline-secondary" title="Share this tool"><span>ðŸ”—</span> Share</button>
    <button id="fav-btn" class="btn btn-outline-warning" title="Add to Favourites"><span>â­</span> Add to Favourites</button>
  </div>
    <p class="subtitle">Verify if a website supports HTTP/2 protocol</p>

    <div class="input-card">
      <div class="input-row">
        <input type="text" class="input-field" id="urlInput" value="https://example.com" placeholder="Enter website URL">
        <button class="check-btn" id="checkBtn" onclick="checkHTTP2()">🔍 Check HTTP/2</button>
      </div>
    </div>

    <div class="results-card" id="resultsCard" style="display: none;">
      <div class="status-box" id="statusBox"></div>
      <div class="info-grid" id="infoGrid"></div>
    </div>
  </div>
<?php include 'footer.php'; ?>

