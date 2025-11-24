<?php
$page_title = 'Favicon Generator - Create Favicons Online';
$page_description = 'Generate favicons in multiple sizes from images using free API.';
$breadcrumbs = [
    ['title' => 'Home', 'url' => 'index.php'],
    ['title' => 'Favicon Generator', 'url' => '']
];
$page_css = 'favicon-generator.css';
$page_js = 'favicon-generator.js';
include 'header.php';
?>
<div class="container">
    
  <div class="d-flex justify-content-end mb-3" style="gap:1rem;">
    <button id="share-btn" class="btn btn-outline-secondary" title="Share this tool"><span>ðŸ”—</span> Share</button>
    <button id="fav-btn" class="btn btn-outline-warning" title="Add to Favourites"><span>â­</span> Add to Favourites</button>
  </div>
    <p class="subtitle">Create favicons in multiple sizes from your image</p>

    <div class="input-card">
      <div class="upload-area" onclick="document.getElementById('fileInput').click()">
        <div class="upload-icon">📤</div>
        <div class="upload-text">Click to upload an image (PNG, JPG, SVG)</div>
      </div>
      
      <input type="file" id="fileInput" accept="image/*" onchange="handleFileSelect(event)">
      
      <img id="previewImg" class="preview-img" style="display: none;">
      
      <button class="generate-btn" id="generateBtn" onclick="generateFavicons()" style="display: none;">
        🎯 Generate Favicons
      </button>
    </div>

    <div class="results-card" id="resultsCard" style="display: none;">
      <div class="section-title">Generated Favicons</div>
      <div class="favicon-grid" id="faviconGrid"></div>
    </div>
  </div>
<?php include 'footer.php'; ?>

