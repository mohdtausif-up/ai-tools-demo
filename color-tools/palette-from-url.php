<?php 
$page_title = 'Palette from URL - Extract Colors from Websites';
$page_description = 'Extract color palettes from any website or image URL.';
$breadcrumbs = [
  ['title' => 'Palette From Url', 'url' => '']
];
include 'header.php'; 
?>

<div class="main-content">
<div class="container">
    
  <div class="d-flex justify-content-end mb-3" style="gap:1rem;">
    <button id="share-btn" class="btn btn-outline-secondary" title="Share this tool"><span>ðŸ”—</span> Share</button>
    <button id="fav-btn" class="btn btn-outline-warning" title="Add to Favourites"><span>â­</span> Add to Favourites</button>
  </div>
    <div class="subtitle">Extract colors from images and websites</div>
    
    <div class="info-box">
      <h3>ℹ️ How it works</h3>
      <p>
        <strong>Upload an image:</strong> Select any image file from your computer to extract its color palette.<br><br>
        <strong>Image URL:</strong> Enter a direct image URL (must be CORS-enabled or from the same domain). Most external websites block cross-origin image access for security reasons.<br><br>
        <strong>Supported formats:</strong> JPG, PNG, GIF, WebP
      </p>
    </div>
    
    <div class="input-section">
      <h3 style="margin-bottom: 20px; color: #2d3748;">Upload Image</h3>
      <div class="input-group">
        <input type="file" id="fileInput" accept="image/*">
        <button class="btn btn-secondary" onclick="extractFromFile()">🖼️ Extract Colors</button>
      </div>
      
      <div style="text-align: center; margin: 20px 0; color: #cbd5e0; font-weight: 600;">OR</div>
      
      <h3 style="margin-bottom: 20px; color: #2d3748;">Image URL</h3>
      <div class="input-group">
        <input type="text" id="urlInput" placeholder="https://example.com/image.jpg">
        <button class="btn btn-primary" onclick="extractFromURL()">🔗 Load from URL</button>
      </div>
    </div>
    
    <div class="preview-section" id="previewSection">
      <img id="previewImage" class="preview-image" alt="Preview">
      <canvas id="canvas"></canvas>
      <div id="loadingMessage" class="loading" style="display: none;">Extracting colors...</div>
      <div class="palette-grid" id="paletteGrid"></div>
    </div>
  </div>
  
  <div class="toast" id="toast">Copied to clipboard!</div>
  
  
</div>





<?php include 'footer.php'; ?>



