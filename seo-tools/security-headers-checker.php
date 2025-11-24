<?php
$page_title = 'Security Headers Checker - Analyze HTTP Headers';
$page_description = 'Check security headers like CSP, HSTS, X-Frame-Options, and more.';
$breadcrumbs = [
    ['title' => 'Home', 'url' => 'index.php'],
    ['title' => 'Security Headers Checker', 'url' => '']
];
$page_css = 'security-headers-checker.css';
$page_js = 'security-headers-checker.js';
include 'header.php';
?>
<div class="container">
    
  <div class="d-flex justify-content-end mb-3" style="gap:1rem;">
    <button id="share-btn" class="btn btn-outline-secondary" title="Share this tool"><span>ðŸ”—</span> Share</button>
    <button id="fav-btn" class="btn btn-outline-warning" title="Add to Favourites"><span>â­</span> Add to Favourites</button>
  </div>
    <p class="subtitle">Analyze HTTP security headers for better protection</p>

    <div class="input-card">
      <div class="input-row">
        <input type="text" class="input-field" id="urlInput" value="https://example.com" placeholder="Enter website URL">
        <button class="check-btn" id="checkBtn" onclick="checkHeaders()">🔍 Check Headers</button>
      </div>
    </div>

    <div class="results-card" id="resultsCard" style="display: none;">
      <div class="score-box">
        <div class="score-value" id="scoreValue">0/8</div>
        <div class="score-label">Security Headers Found</div>
      </div>
      <div id="headersList"></div>
    </div>
  </div>
<?php include 'footer.php'; ?>

