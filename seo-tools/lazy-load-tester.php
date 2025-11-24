<?php
$page_title = 'Lazy Load Tester - Check Image Lazy Loading';
$page_description = 'Test if images on a website use lazy loading for better performance.';
$breadcrumbs = [
    ['title' => 'Home', 'url' => 'index.php'],
    ['title' => 'Lazy Load Tester', 'url' => '']
];
$page_css = 'lazy-load-tester.css';
$page_js = 'lazy-load-tester.js';
include 'header.php';
?>
<div class="container">
    
  <div class="d-flex justify-content-end mb-3" style="gap:1rem;">
    <button id="share-btn" class="btn btn-outline-secondary" title="Share this tool"><span>ðŸ”—</span> Share</button>
    <button id="fav-btn" class="btn btn-outline-warning" title="Add to Favourites"><span>â­</span> Add to Favourites</button>
  </div>
    <p class="subtitle">Check if images use lazy loading for better performance</p>

    <div class="input-card">
      <div class="input-row">
        <input type="text" class="input-field" id="urlInput" value="https://example.com" placeholder="Enter website URL">
        <button class="test-btn" id="testBtn" onclick="testLazyLoad()">🔍 Test Images</button>
      </div>
    </div>

    <div class="results-card" id="resultsCard" style="display: none;">
      <div class="stats-row">
        <div class="stat-box">
          <div class="stat-value" id="totalImages">0</div>
          <div class="stat-label">Total Images</div>
        </div>
        <div class="stat-box">
          <div class="stat-value" id="lazyImages" style="color: #10b981;">0</div>
          <div class="stat-label">Lazy Loaded</div>
        </div>
        <div class="stat-box">
          <div class="stat-value" id="eagerImages" style="color: #ef4444;">0</div>
          <div class="stat-label">Not Lazy</div>
        </div>
      </div>

      <div class="section-title">Image Details</div>
      <div class="image-list" id="imageList"></div>
    </div>
  </div>
<?php include 'footer.php'; ?>

