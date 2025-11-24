<?php 
$page_title = 'HEX ↔ RGB ↔ HSL Converter - Color Code Converter';
$page_description = 'Convert color codes between HEX, RGB, and HSL formats instantly. Bi-directional color converter with live preview.';
$breadcrumbs = [
  ['title' => 'Hex Rgb Hsl Converter', 'url' => '']
];
include 'header.php'; 
?>

<div class="main-content">
<div class="container">
    
  <div class="d-flex justify-content-end mb-3" style="gap:1rem;">
    <button id="share-btn" class="btn btn-outline-secondary" title="Share this tool"><span>ðŸ”—</span> Share</button>
    <button id="fav-btn" class="btn btn-outline-warning" title="Add to Favourites"><span>â­</span> Add to Favourites</button>
  </div>
    
    <div class="converter-grid">
      <div class="converter-card">
        <div class="card-title">HEX</div>
        <div class="input-wrapper">
          <label>HEX Code</label>
          <input type="text" id="hexInput" placeholder="#667eea" value="#667eea">
        </div>
        <div class="color-preview" id="hexPreview"></div>
      </div>
      
      <div class="converter-card">
        <div class="card-title">RGB</div>
        <div class="slider-group">
          <label>Red (R)</label>
          <input type="range" id="rInput" min="0" max="255" value="102">
          <div class="value-display" id="rValue">102</div>
        </div>
        <div class="slider-group">
          <label>Green (G)</label>
          <input type="range" id="gInput" min="0" max="255" value="126">
          <div class="value-display" id="gValue">126</div>
        </div>
        <div class="slider-group">
          <label>Blue (B)</label>
          <input type="range" id="bInput" min="0" max="255" value="234">
          <div class="value-display" id="bValue">234</div>
        </div>
        <div class="color-preview" id="rgbPreview"></div>
      </div>
      
      <div class="converter-card">
        <div class="card-title">HSL</div>
        <div class="slider-group">
          <label>Hue (H)</label>
          <input type="range" id="hInput" min="0" max="360" value="229">
          <div class="value-display" id="hValue">229°</div>
        </div>
        <div class="slider-group">
          <label>Saturation (S)</label>
          <input type="range" id="sInput" min="0" max="100" value="76">
          <div class="value-display" id="sValue">76%</div>
        </div>
        <div class="slider-group">
          <label>Lightness (L)</label>
          <input type="range" id="lInput" min="0" max="100" value="66">
          <div class="value-display" id="lValue">66%</div>
        </div>
        <div class="color-preview" id="hslPreview"></div>
      </div>
    </div>
    
    <div class="preview-section">
      <div class="preview-title">Live Preview</div>
      <div class="large-preview" id="largePreview"></div>
      <div class="all-codes">
        <div class="code-row">
          <span class="code-label">HEX:</span>
          <span class="code-value" id="displayHex">#667eea</span>
        </div>
        <div class="code-row">
          <span class="code-label">RGB:</span>
          <span class="code-value" id="displayRgb">rgb(102, 126, 234)</span>
        </div>
        <div class="code-row">
          <span class="code-label">HSL:</span>
          <span class="code-value" id="displayHsl">hsl(229, 76%, 66%)</span>
        </div>
      </div>
    </div>
  </div>
  
  
</div>





<?php include 'footer.php'; ?>



