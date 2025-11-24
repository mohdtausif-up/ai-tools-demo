<?php
$page_title = 'Redirect Chain Checker - Analyze URL Redirects';
$page_description = 'Analyze redirect chains and detect redirect loops for better SEO performance.';
$breadcrumbs = [
    ['title' => 'Home', 'url' => 'index.php'],
    ['title' => 'Redirect Chain Checker', 'url' => '']
];
$page_css = 'redirect-chain-checker.css';
$page_js = 'redirect-chain-checker.js';
include 'header.php';
?>
<div class="container">
    
  <div class="d-flex justify-content-end mb-3" style="gap:1rem;">
    <button id="share-btn" class="btn btn-outline-secondary" title="Share this tool"><span>ðŸ”—</span> Share</button>
    <button id="fav-btn" class="btn btn-outline-warning" title="Add to Favourites"><span>â­</span> Add to Favourites</button>
  </div>
    <p class="subtitle">Analyze URL redirect chains and detect potential issues</p>

    <div class="input-card">
      <div class="input-row">
        <input type="text" class="input-field" id="urlInput" value="https://example.com" placeholder="Enter URL to check">
        <button class="check-btn" id="checkBtn" onclick="checkRedirects()">🔍 Check Redirects</button>
      </div>
    </div>

    <div class="results-card" id="resultsCard" style="display: none;">
      <div class="summary-box">
        <div class="summary-row">
          <div class="summary-item">
            <div class="summary-value" id="redirectCount">0</div>
            <div class="summary-label">Redirects</div>
          </div>
          <div class="summary-item">
            <div class="summary-value" id="finalStatus">200</div>
            <div class="summary-label">Final Status</div>
          </div>
          <div class="summary-item">
            <div class="summary-value" id="totalTime">0ms</div>
            <div class="summary-label">Total Time</div>
          </div>
        </div>
      </div>

      <div class="redirect-chain" id="redirectChain"></div>
    </div>
  </div>
<?php include 'footer.php'; ?>

