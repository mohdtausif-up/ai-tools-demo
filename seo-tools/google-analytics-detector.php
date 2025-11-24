<?php
$page_title = 'Google Analytics Detector - Check GA Installation';
$page_description = 'Detect if Google Analytics is installed on any website and view tracking IDs.';
$breadcrumbs = [
    ['title' => 'Home', 'url' => 'index.php'],
    ['title' => 'Google Analytics Detector', 'url' => '']
];
$page_css = 'google-analytics-detector.css';
$page_js = 'google-analytics-detector.js';
include 'header.php';
?>
<div class="container">
    
  <div class="d-flex justify-content-end mb-3" style="gap:1rem;">
    <button id="share-btn" class="btn btn-outline-secondary" title="Share this tool"><span>ðŸ”—</span> Share</button>
    <button id="fav-btn" class="btn btn-outline-warning" title="Add to Favourites"><span>â­</span> Add to Favourites</button>
  </div>
    <p class="subtitle">Check if Google Analytics is installed on any website</p>

    <div class="input-card">
      <div class="input-row">
        <input type="text" class="input-field" id="urlInput" value="https://example.com" placeholder="Enter website URL">
        <button class="check-btn" id="checkBtn" onclick="checkGA()">🔍 Check GA</button>
      </div>
    </div>

    <div class="results-card" id="resultsCard" style="display: none;">
      <div class="status-box" id="statusBox"></div>
      <div id="trackingInfo"></div>
    </div>
  </div>
<?php include 'footer.php'; ?>

