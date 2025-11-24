<?php 
$page_title = 'Image Color Extractor - Extract Colors from Images';
$page_description = 'Upload an image and extract dominant colors. Perfect for design inspiration and creating color palettes from photos.';
$breadcrumbs = [
  ['title' => 'Image Color Extractor', 'url' => '']
];
include 'header.php'; 
?>

<div class="main-content">
<div class="container">
    
  <div class="d-flex justify-content-end mb-3" style="gap:1rem;">
    <button id="share-btn" class="btn btn-outline-secondary" title="Share this tool"><span>ðŸ”—</span> Share</button>
    <button id="fav-btn" class="btn btn-outline-warning" title="Add to Favourites"><span>â­</span> Add to Favourites</button>
  </div>
    
    <div class="upload-section">
      <div class="upload-area" id="uploadArea" onclick="document.getElementById('fileInput').click()">
        <div class="upload-icon">📤</div>
        <div class="upload-text">Drop an image here or click to upload</div>
        <div class="upload-subtext">Supports JPG, PNG, GIF (max 10MB)</div>
      </div>
      <input type="file" id="fileInput" accept="image/*">
    </div>
    
    <div class="preview-section" id="previewSection">
      <img id="previewImage" class="preview-image" alt="Preview">
      <div class="controls">
        <label>Number of colors:</label>
        <select id="colorCount" onchange="extractColors()">
          <option value="5" selected>5</option>
          <option value="8">8</option>
          <option value="10">10</option>
          <option value="12">12</option>
          <option value="16">16</option>
        </select>
      </div>
    </div>
    
    <div class="colors-section" id="colorsSection">
      <div class="section-title">Extracted Colors</div>
      <div class="colors-grid" id="colorsGrid"></div>
    </div>
  </div>
  
  <canvas id="canvas"></canvas>
  <div class="toast" id="toast">Copied to clipboard!</div>
  
  
</div>





<?php include 'footer.php'; ?>



