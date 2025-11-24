<?php 
$page_title = 'Opacity Calculator - RGBA & HSLA Transparency';
$page_description = 'Calculate and preview color opacity with RGBA and HSLA formats. Visualize transparency on different backgrounds.';
$breadcrumbs = [
  ['title' => 'Opacity Calculator', 'url' => '']
];
include 'header.php'; 
?>

<div class="main-content">
<div class="container">
    
  <div class="d-flex justify-content-end mb-3" style="gap:1rem;">
    <button id="share-btn" class="btn btn-outline-secondary" title="Share this tool"><span>ðŸ”—</span> Share</button>
    <button id="fav-btn" class="btn btn-outline-warning" title="Add to Favourites"><span>â­</span> Add to Favourites</button>
  </div>
    
    <div class="control-panel">
      <div class="color-input-section">
        <div class="color-picker-group">
          <label for="baseColor">Select Color</label>
          <input type="color" id="baseColor" value="#667eea">
          <div class="hex-display" id="hexDisplay">#667eea</div>
        </div>
      </div>
      
      <div class="opacity-slider-section">
        <div class="slider-label">Opacity Level</div>
        <div class="slider-wrapper">
          <input type="range" id="opacitySlider" min="0" max="100" value="75">
        </div>
        <div class="opacity-value">
          <span id="opacityDisplay">0.75</span>
          <span class="percentage" id="percentDisplay">(75%)</span>
        </div>
      </div>
      
      <div class="formats-section">
        <div class="format-grid">
          <div class="format-card" onclick="copyFormat('hex8')">
            <div class="format-label">HEX with Alpha</div>
            <div class="format-value" id="hex8Format">#000000BF</div>
          </div>
          <div class="format-card" onclick="copyFormat('rgba')">
            <div class="format-label">RGBA</div>
            <div class="format-value" id="rgbaFormat">rgba(0, 0, 0, 0.75)</div>
          </div>
          <div class="format-card" onclick="copyFormat('hsla')">
            <div class="format-label">HSLA</div>
            <div class="format-value" id="hslaFormat">hsla(0, 0%, 0%, 0.75)</div>
          </div>
          <div class="format-card" onclick="copyFormat('css')">
            <div class="format-label">CSS (new syntax)</div>
            <div class="format-value" id="cssFormat">rgb(0 0 0 / 0.75)</div>
          </div>
        </div>
      </div>
    </div>
    
    <div class="preview-section">
      <div class="preview-title">Transparency Preview on Different Backgrounds</div>
      <div class="backgrounds-grid">
        <div class="bg-preview" style="background: white;">
          <div class="overlay-box" id="overlay1"></div>
          <span class="bg-label">White</span>
        </div>
        <div class="bg-preview checkerboard">
          <div class="overlay-box" id="overlay2"></div>
          <span class="bg-label">Transparent</span>
        </div>
        <div class="bg-preview" style="background: black;">
          <div class="overlay-box" id="overlay3"></div>
          <span class="bg-label">Black</span>
        </div>
        <div class="bg-preview" style="background: linear-gradient(135deg, #667eea, #764ba2);">
          <div class="overlay-box" id="overlay4"></div>
          <span class="bg-label">Gradient</span>
        </div>
        <div class="bg-preview" style="background: #f0f0f0;">
          <div class="overlay-box" id="overlay5"></div>
          <span class="bg-label">Gray</span>
        </div>
        <div class="bg-preview" style="background: url('data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><rect fill=%22%23e0e0e0%22 width=%22100%22 height=%22100%22/><circle cx=%2250%22 cy=%2250%22 r=%2230%22 fill=%22%23c0c0c0%22/></svg>');">
          <div class="overlay-box" id="overlay6"></div>
          <span class="bg-label">Pattern</span>
        </div>
      </div>
    </div>
  </div>
  
  <div class="toast" id="toast">Copied to clipboard!</div>
  
  
</div>





<?php include 'footer.php'; ?>



