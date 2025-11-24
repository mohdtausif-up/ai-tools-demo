<?php
$page_title = 'Image Alt Checker - Verify Alt Text for SEO';
$page_description = 'Check all images on a webpage for missing or empty alt text attributes.';
$breadcrumbs = [
    ['title' => 'Home', 'url' => 'index.php'],
    ['title' => 'Image Alt Checker', 'url' => '']
];
$page_css = 'image-alt-checker.css';
$page_js = 'image-alt-checker.js';
include 'header.php';
?>
<div class="container">
    
  <div class="d-flex justify-content-end mb-3" style="gap:1rem;">
    <button id="share-btn" class="btn btn-outline-secondary" title="Share this tool"><span>ðŸ”—</span> Share</button>
    <button id="fav-btn" class="btn btn-outline-warning" title="Add to Favourites"><span>â­</span> Add to Favourites</button>
  </div>
    <p class="subtitle">Verify alt text attributes for better SEO and accessibility</p>

    <div class="input-card">
      <div class="input-row">
        <input type="text" class="input-field" id="urlInput" value="https://example.com" placeholder="Enter website URL">
        <button class="check-btn" id="checkBtn" onclick="checkImages()">🔍 Check Images</button>
      </div>
    </div>

    <div class="results-card" id="resultsCard" style="display: none;">
      <div class="stats-row">
        <div class="stat-box">
          <div class="stat-value" id="totalImages">0</div>
          <div class="stat-label">Total Images</div>
        </div>
        <div class="stat-box">
          <div class="stat-value" id="hasAlt" style="color: #10b981;">0</div>
          <div class="stat-label">Has Alt Text</div>
        </div>
        <div class="stat-box">
          <div class="stat-value" id="noAlt" style="color: #ef4444;">0</div>
          <div class="stat-label">Missing Alt</div>
        </div>
      </div>

      <div class="section-title">Image Details</div>
      <div class="image-list" id="imageList"></div>
    </div>
  </div>
<?php include 'footer.php'; ?>

