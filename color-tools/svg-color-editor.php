<?php 
$page_title = 'SVG Color Editor - Change SVG Colors Instantly';
$page_description = 'Upload SVG files and change all colors interactively with live preview.';
$breadcrumbs = [
  ['title' => 'Svg Color Editor', 'url' => '']
];
include 'header.php'; 
?>

<div class="main-content">
<div class="container">
    
  <div class="d-flex justify-content-end mb-3" style="gap:1rem;">
    <button id="share-btn" class="btn btn-outline-secondary" title="Share this tool"><span>ðŸ”—</span> Share</button>
    <button id="fav-btn" class="btn btn-outline-warning" title="Add to Favourites"><span>â­</span> Add to Favourites</button>
  </div>
    <div class="subtitle">Upload SVG files and change colors instantly</div>
    
    <div class="workspace">
      <div class="sidebar">
        <div class="panel">
          <div class="panel-title">📁 Upload SVG</div>
          <div class="upload-zone" id="uploadZone" onclick="document.getElementById('fileInput').click()">
            <div class="upload-icon">📤</div>
            <div class="upload-text">Click or drag SVG file here</div>
            <div class="upload-subtext">Supports .svg files</div>
          </div>
          <input type="file" id="fileInput" accept=".svg,image/svg+xml">
        </div>
        
        <div class="panel">
          <div class="panel-title">🎨 Colors Found (<span id="colorCount">0</span>)</div>
          <div class="colors-list" id="colorsList">
            <div class="empty-state">
              <div style="font-size: 32px; margin-bottom: 10px;">🎨</div>
              <div style="color: #a0aec0;">Upload an SVG to see colors</div>
            </div>
          </div>
        </div>
        
        <div class="panel">
          <button class="btn btn-primary" id="downloadBtn" onclick="downloadSVG()" disabled>📥 Download SVG</button>
          <button class="btn btn-secondary" id="resetBtn" onclick="resetColors()" disabled>🔄 Reset Colors</button>
        </div>
      </div>
      
      <div class="preview-section">
        <div class="svg-container" id="svgContainer">
          <div class="empty-state">
            <div class="empty-icon">📄</div>
            <div class="empty-text">No SVG Loaded</div>
            <div class="empty-subtext">Upload an SVG file to start editing</div>
          </div>
        </div>
      </div>
    </div>
  </div>
  
  <div class="toast" id="toast">Action completed!</div>
  
  
</div>





<?php include 'footer.php'; ?>



