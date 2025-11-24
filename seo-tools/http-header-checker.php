<?php
$page_title = 'HTTP Header Checker - View Response Headers';
$page_description = 'Check HTTP response headers for any website including status codes, content type, and security headers.';
$breadcrumbs = [
    ['title' => 'Home', 'url' => 'index.php'],
    ['title' => 'Http Header Checker', 'url' => '']
];
$page_css = 'http-header-checker.css';
$page_js = 'http-header-checker.js';
include 'header.php';
?>
<div class="container">
    
  <div class="d-flex justify-content-end mb-3" style="gap:1rem;">
    <button id="share-btn" class="btn btn-outline-secondary" title="Share this tool"><span>ðŸ”—</span> Share</button>
    <button id="fav-btn" class="btn btn-outline-warning" title="Add to Favourites"><span>â­</span> Add to Favourites</button>
  </div>
    <p class="subtitle">View HTTP response headers for any website</p>

    <div class="input-card">
      <div class="input-row">
        <input type="text" class="input-field" id="urlInput" value="https://example.com" placeholder="Enter website URL">
        <button class="check-btn" id="checkBtn" onclick="checkHeaders()">🔍 Check Headers</button>
      </div>
    </div>

    <div class="results-card" id="resultsCard" style="display: none;">
      <h2 style="margin-bottom: 20px; color: #1e293b;">Response Headers</h2>
      <div id="headersList"></div>
    </div>
  </div>
<?php include 'footer.php'; ?>

