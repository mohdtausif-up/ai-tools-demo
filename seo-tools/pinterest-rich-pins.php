<?php
$page_title = 'Pinterest Rich Pins Validator - Check Pinterest Metadata';
$page_description = 'Validate Pinterest Rich Pins metadata and preview how your content appears on Pinterest.';
$breadcrumbs = [
    ['title' => 'Home', 'url' => 'index.php'],
    ['title' => 'Pinterest Rich Pins', 'url' => '']
];
$page_css = 'pinterest-rich-pins.css';
$page_js = 'pinterest-rich-pins.js';
include 'header.php';
?>
<div class="container">
    
  <div class="d-flex justify-content-end mb-3" style="gap:1rem;">
    <button id="share-btn" class="btn btn-outline-secondary" title="Share this tool"><span>ðŸ”—</span> Share</button>
    <button id="fav-btn" class="btn btn-outline-warning" title="Add to Favourites"><span>â­</span> Add to Favourites</button>
  </div>
    <p class="subtitle">Validate Pinterest Rich Pins metadata for better engagement</p>

    <div class="input-card">
      <div class="input-row">
        <input type="text" class="input-field" id="urlInput" value="https://example.com" placeholder="Enter website URL">
        <button class="validate-btn" id="validateBtn" onclick="validatePinterest()">🔍 Validate</button>
      </div>
    </div>

    <div class="results-grid" id="resultsGrid" style="display: none;">
      <div class="card">
        <div class="section-title">Pinterest Preview</div>
        <div class="pinterest-preview">
          <img id="pinterestImage" class="pinterest-image" src="" alt="Preview" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
          <div class="pinterest-image" id="imagePlaceholder" style="display:none;">No Image</div>
          <div class="pinterest-content">
            <div class="pinterest-title" id="pinterestTitle">Pin Title</div>
            <div class="pinterest-desc" id="pinterestDesc">Pin description will appear here...</div>
            <div class="pinterest-url" id="pinterestUrl">example.com</div>
          </div>
        </div>
      </div>

      <div class="card">
        <div class="section-title">Rich Pins Meta Tags</div>
        <div id="metaTags"></div>
      </div>
    </div>
  </div>
<?php include 'footer.php'; ?>

