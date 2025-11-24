<?php
$page_title = 'Twitter Card Validator - Test Twitter Meta Tags';
$page_description = 'Validate Twitter Card meta tags and preview how your content will look on Twitter.';
$breadcrumbs = [
    ['title' => 'Home', 'url' => 'index.php'],
    ['title' => 'Twitter Card Validator', 'url' => '']
];
$page_css = 'twitter-card-validator.css';
$page_js = 'twitter-card-validator.js';
include 'header.php';
?>
<div class="container">
    
  <div class="d-flex justify-content-end mb-3" style="gap:1rem;">
    <button id="share-btn" class="btn btn-outline-secondary" title="Share this tool"><span>ðŸ”—</span> Share</button>
    <button id="fav-btn" class="btn btn-outline-warning" title="Add to Favourites"><span>â­</span> Add to Favourites</button>
  </div>
    <p class="subtitle">Validate Twitter Card meta tags and preview your content</p>

    <div class="input-card">
      <div class="input-row">
        <input type="text" class="input-field" id="urlInput" value="https://example.com" placeholder="Enter website URL">
        <button class="validate-btn" id="validateBtn" onclick="validateTwitterCard()">🔍 Validate</button>
      </div>
    </div>

    <div class="results-grid" id="resultsGrid" style="display: none;">
      <div class="card">
        <div class="section-title">Twitter Preview</div>
        <div class="twitter-preview">
          <img id="twitterImage" class="twitter-image" src="" alt="Preview" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
          <div class="twitter-image" id="imagePlaceholder" style="display:none;">No Image</div>
          <div class="twitter-content">
            <div class="twitter-title" id="twitterTitle">Twitter Card Title</div>
            <div class="twitter-desc" id="twitterDesc">Card description will appear here...</div>
            <div class="twitter-url" id="twitterUrl">example.com</div>
          </div>
        </div>
      </div>

      <div class="card">
        <div class="section-title">Twitter Card Meta Tags</div>
        <div id="metaTags"></div>
      </div>
    </div>
  </div>
<?php include 'footer.php'; ?>

