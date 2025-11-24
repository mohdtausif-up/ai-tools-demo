<?php
$page_title = 'Facebook Pixel Checker - Verify FB Tracking';
$page_description = 'Check if Facebook Pixel is installed on any website and view pixel IDs.';
$breadcrumbs = [
    ['title' => 'Home', 'url' => 'index.php'],
    ['title' => 'Facebook Pixel Checker', 'url' => '']
];
$page_css = 'facebook-pixel-checker.css';
$page_js = 'facebook-pixel-checker.js';
include 'header.php';
?>
<div class="container">
    
  <div class="d-flex justify-content-end mb-3" style="gap:1rem;">
    <button id="share-btn" class="btn btn-outline-secondary" title="Share this tool"><span>ðŸ”—</span> Share</button>
    <button id="fav-btn" class="btn btn-outline-warning" title="Add to Favourites"><span>â­</span> Add to Favourites</button>
  </div>
    <p class="subtitle">Verify Facebook Pixel installation on any website</p>

    <div class="input-card">
      <div class="input-row">
        <input type="text" class="input-field" id="urlInput" value="https://example.com" placeholder="Enter website URL">
        <button class="check-btn" id="checkBtn" onclick="checkPixel()">🔍 Check Pixel</button>
      </div>
    </div>

    <div class="results-card" id="resultsCard" style="display: none;">
      <div class="status-box" id="statusBox"></div>
      <div id="pixelInfo"></div>
    </div>
  </div>
<?php include 'footer.php'; ?>

