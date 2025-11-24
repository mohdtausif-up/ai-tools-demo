<?php 
$page_title = 'Color Palette from Logo - Extract and Suggest Brand Colors';
$page_description = 'Upload a logo and extract its color palette with intelligent brand color suggestions.';
$breadcrumbs = [
  ['title' => 'Color Palette From Logo', 'url' => '']
];
include 'header.php'; 
?>

<div class="main-content">
<div class="container">
    
  <div class="d-flex justify-content-end mb-3" style="gap:1rem;">
    <button id="share-btn" class="btn btn-outline-secondary" title="Share this tool"><span>ðŸ”—</span> Share</button>
    <button id="fav-btn" class="btn btn-outline-warning" title="Add to Favourites"><span>â­</span> Add to Favourites</button>
  </div>
    <div class="subtitle">Extract colors and get intelligent brand color suggestions</div>
    
    <div class="upload-section">
      <div class="upload-area" onclick="document.getElementById('fileInput').click()">
        <div class="upload-icon">📤</div>
        <h3 style="color: #2d3748; margin-bottom: 10px;">Upload Your Logo</h3>
        <p style="color: #718096;">PNG, JPG, or SVG</p>
      </div>
      <input type="file" id="fileInput" accept="image/*">
    </div>
    
    <div class="results-section" id="resultsSection">
      <div class="logo-preview">
        <img id="logoImage" alt="Logo">
        <canvas id="canvas"></canvas>
      </div>
      
      <div class="section">
        <div class="section-title">🎨 Extracted Logo Colors</div>
        <div class="colors-grid" id="extractedColors"></div>
      </div>
      
      <div class="section">
        <div class="section-title">💡 Suggested Brand Palette</div>
        <div class="colors-grid" id="suggestedColors"></div>
      </div>
      
      <div class="section">
        <div class="section-title">📋 Recommended Usage</div>
        <div class="usage-grid" id="usageGuide"></div>
      </div>
    </div>
  </div>
  
  <div class="toast" id="toast">Copied to clipboard!</div>
  
  
</div>





<?php include 'footer.php'; ?>



