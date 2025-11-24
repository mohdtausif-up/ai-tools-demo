<?php 
$page_title = 'Color Mixer - Blend Two Colors';
$page_description = 'Mix and blend two colors together with adjustable ratios. See real-time color mixing results.';
$breadcrumbs = [
  ['title' => 'Color Mixer', 'url' => '']
];
include 'header.php'; 
?>

<div class="main-content">
<div class="container">
    
  <div class="d-flex justify-content-end mb-3" style="gap:1rem;">
    <button id="share-btn" class="btn btn-outline-secondary" title="Share this tool"><span>ðŸ”—</span> Share</button>
    <button id="fav-btn" class="btn btn-outline-warning" title="Add to Favourites"><span>â­</span> Add to Favourites</button>
  </div>
    
    <div class="mixer-panel">
      <div class="color-inputs">
        <div class="color-input-group">
          <div class="color-input-label">Color 1</div>
          <input type="color" id="color1" value="#667eea">
          <div class="color-hex" id="hex1">#667eea</div>
        </div>
        
        <div class="plus-sign">+</div>
        
        <div class="color-input-group">
          <div class="color-input-label">Color 2</div>
          <input type="color" id="color2" value="#f093fb">
          <div class="color-hex" id="hex2">#f093fb</div>
        </div>
      </div>
      
      <div class="slider-container">
        <div class="slider-label">Mix Ratio</div>
        <div class="slider-wrapper">
          <input type="range" id="mixRatio" min="0" max="100" value="50">
        </div>
        <div class="ratio-display">
          <span id="ratio1">50%</span>
          <span id="ratio2">50%</span>
        </div>
      </div>
      
      <div class="result-section">
        <div class="result-title">Mixed Result</div>
        <div class="result-color" id="resultColor" onclick="copyResultColor()"></div>
        <div class="result-info">
          <div class="info-item">
            <div class="info-label">HEX</div>
            <div class="info-value" id="resultHex">#000000</div>
          </div>
          <div class="info-item">
            <div class="info-label">RGB</div>
            <div class="info-value" id="resultRgb">0, 0, 0</div>
          </div>
          <div class="info-item">
            <div class="info-label">HSL</div>
            <div class="info-value" id="resultHsl">0°, 0%, 0%</div>
          </div>
        </div>
      </div>
      
      <div class="blend-modes">
        <div class="blend-title">CSS Blend Modes Preview</div>
        <div class="blend-grid" id="blendGrid"></div>
      </div>
    </div>
  </div>
  
  <div class="toast" id="toast">Copied to clipboard!</div>
  
  
</div>





<?php include 'footer.php'; ?>



