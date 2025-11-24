<?php 
$page_title = 'Color Scheme Generator from Image - Create Palettes from Photos';
$page_description = 'Upload any image and generate complete color schemes with complementary, analogous, and triadic variations.';
$breadcrumbs = [
  ['title' => 'Color Scheme From Image', 'url' => '']
];
include 'header.php'; 
?>

<div class="main-content">
<div class="container">
    
  <div class="d-flex justify-content-end mb-3" style="gap:1rem;">
    <button id="share-btn" class="btn btn-outline-secondary" title="Share this tool"><span>ðŸ”—</span> Share</button>
    <button id="fav-btn" class="btn btn-outline-warning" title="Add to Favourites"><span>â­</span> Add to Favourites</button>
  </div>
    <div class="subtitle">Upload a photo and generate beautiful color schemes</div>
    
    <div class="upload-section">
      <div class="upload-area" id="uploadArea" onclick="document.getElementById('fileInput').click()">
        <div class="upload-icon">📸</div>
        <h3 style="color: #2d3748; margin-bottom: 10px;">Drop your image here</h3>
        <p style="color: #718096;">or click to browse</p>
      </div>
      <input type="file" id="fileInput" accept="image/*">
    </div>
    
    <div class="preview-section" id="previewSection">
      <img id="previewImage" class="preview-image" alt="Preview">
      <canvas id="canvas"></canvas>
      
      <div class="schemes-container" id="schemesContainer"></div>
    </div>
  </div>
  
  <div class="toast" id="toast">Copied to clipboard!</div>
  
  
</div>





<?php include 'footer.php'; ?>



