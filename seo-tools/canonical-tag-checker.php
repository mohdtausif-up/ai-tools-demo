<?php
$page_title = 'Canonical Tag Checker - Verify Canonical URLs';
$page_description = 'Check if canonical tags are properly implemented to avoid duplicate content issues.';
$breadcrumbs = [
    ['title' => 'Home', 'url' => 'index.php'],
    ['title' => 'Canonical Tag Checker', 'url' => '']
];
$page_css = 'canonical-tag-checker.css';
$page_js = 'canonical-tag-checker.js';
include 'header.php';
?>
<div class="container">
    
  <div class="d-flex justify-content-end mb-3" style="gap:1rem;">
    <button id="share-btn" class="btn btn-outline-secondary" title="Share this tool"><span>ðŸ”—</span> Share</button>
    <button id="fav-btn" class="btn btn-outline-warning" title="Add to Favourites"><span>â­</span> Add to Favourites</button>
  </div>
    <p class="subtitle">Verify canonical URLs to prevent duplicate content issues</p>

    <div class="input-card">
      <div class="input-row">
        <input type="text" class="input-field" id="urlInput" value="https://example.com" placeholder="Enter website URL">
        <button class="check-btn" id="checkBtn" onclick="checkCanonical()">🔍 Check Canonical</button>
      </div>
    </div>

    <div class="results-card" id="resultsCard" style="display: none;">
      <div class="status-box" id="statusBox"></div>
      <div id="infoSection"></div>
    </div>
  </div>
<?php include 'footer.php'; ?>

