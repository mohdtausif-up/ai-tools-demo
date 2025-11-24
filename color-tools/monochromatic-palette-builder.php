<?php 
$page_title = 'Monochromatic Palette Builder - Single Hue Color Variations';
$page_description = 'Generate monochromatic color palettes with tints, shades, and tones from a single base color.';
$breadcrumbs = [
  ['title' => 'Monochromatic Palette Builder', 'url' => '']
];
include 'header.php'; 
?>

<div class="main-content">
<div class="container">
    
  <div class="d-flex justify-content-end mb-3" style="gap:1rem;">
    <button id="share-btn" class="btn btn-outline-secondary" title="Share this tool"><span>ðŸ”—</span> Share</button>
    <button id="fav-btn" class="btn btn-outline-warning" title="Add to Favourites"><span>â­</span> Add to Favourites</button>
  </div>
    <div class="subtitle">Create beautiful single-hue color palettes with tints, shades, and tones</div>
    
    <div class="controls-section">
      <div class="control-grid">
        <div class="color-picker-section">
          <div class="base-color-preview" id="basePreview"></div>
          <input type="color" id="colorPicker" value="#667eea">
        </div>
        
        <div class="slider-controls">
          <div class="slider-group">
            <div class="slider-header">
              <span class="slider-title">Number of Steps</span>
              <span class="slider-value" id="stepsValue">7</span>
            </div>
            <input type="range" id="stepsSlider" min="3" max="11" value="7" step="1">
          </div>
          
          <div class="slider-group">
            <div class="slider-header">
              <span class="slider-title">Tint Range</span>
              <span class="slider-value" id="tintValue">100%</span>
            </div>
            <input type="range" id="tintSlider" min="50" max="100" value="100" step="5">
          </div>
          
          <div class="slider-group">
            <div class="slider-header">
              <span class="slider-title">Shade Range</span>
              <span class="slider-value" id="shadeValue">100%</span>
            </div>
            <input type="range" id="shadeSlider" min="50" max="100" value="100" step="5">
          </div>
        </div>
      </div>
      
      <div class="palette-section">
        <div class="section-title">
          <span>☀️ Tints</span>
        </div>
        <div class="section-description">Lighter variations created by mixing with white</div>
        <div class="palette-grid" id="tintsGrid"></div>
      </div>
      
      <div class="palette-section">
        <div class="section-title">
          <span>🎯 Base Color</span>
        </div>
        <div class="palette-grid" id="baseGrid"></div>
      </div>
      
      <div class="palette-section">
        <div class="section-title">
          <span>🌙 Shades</span>
        </div>
        <div class="section-description">Darker variations created by mixing with black</div>
        <div class="palette-grid" id="shadesGrid"></div>
      </div>
      
      <div class="palette-section">
        <div class="section-title">
          <span>⚖️ Tones</span>
        </div>
        <div class="section-description">Muted variations created by reducing saturation</div>
        <div class="palette-grid" id="tonesGrid"></div>
      </div>
    </div>
    
    <div class="export-section">
      <div class="section-title">📦 Export Palette</div>
      <div class="export-buttons">
        <button class="btn btn-primary" onclick="exportCSS()">Export as CSS</button>
        <button class="btn btn-primary" onclick="exportJSON()">Export as JSON</button>
        <button class="btn btn-primary" onclick="exportArray()">Copy All HEX Codes</button>
      </div>
    </div>
  </div>
  
  <div class="toast" id="toast">Copied to clipboard!</div>
  
  
</div>





<?php include 'footer.php'; ?>



