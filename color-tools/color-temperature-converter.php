<?php 
$page_title = 'Color Temperature Converter - Warm & Cool Tones';
$page_description = 'Adjust color temperature to make colors warmer or cooler. Perfect for mood and atmosphere.';
$breadcrumbs = [
  ['title' => 'Color Temperature Converter', 'url' => '']
];
include 'header.php'; 
?>

<div class="main-content">
<div class="container">
    
  <div class="d-flex justify-content-end mb-3" style="gap:1rem;">
    <button id="share-btn" class="btn btn-outline-secondary" title="Share this tool"><span>ðŸ”—</span> Share</button>
    <button id="fav-btn" class="btn btn-outline-warning" title="Add to Favourites"><span>â­</span> Add to Favourites</button>
  </div>
    <div class="subtitle">Adjust Colors to Warmer or Cooler Tones</div>
    
    <div class="control-section">
      <label>Select Base Color</label>
      <input type="color" id="baseColor" value="#667eea">
      <input type="text" class="hex-input" id="hexInput" value="#667eea" placeholder="#000000">
      
      <div class="slider-section">
        <div class="slider-label">Adjust Temperature</div>
        <div class="temperature-scale">
          <span class="scale-label">❄️ Cooler</span>
          <input type="range" id="temperature" min="-100" max="100" value="0">
          <span class="scale-label">🔥 Warmer</span>
        </div>
        <div class="temperature-value" id="tempValue">0 (Neutral)</div>
      </div>
    </div>
    
    <div class="results-grid">
      <div class="result-card" onclick="copyColor('original')">
        <div class="result-title">Original</div>
        <div class="result-preview" id="previewOriginal"></div>
        <div class="result-info">
          <div class="result-hex" id="hexOriginal">#667eea</div>
          <div class="result-rgb" id="rgbOriginal">RGB(102, 126, 234)</div>
        </div>
      </div>
      
      <div class="result-card" onclick="copyColor('adjusted')">
        <div class="result-title">Adjusted</div>
        <div class="result-preview" id="previewAdjusted"></div>
        <div class="result-info">
          <div class="result-hex" id="hexAdjusted">#667eea</div>
          <div class="result-rgb" id="rgbAdjusted">RGB(102, 126, 234)</div>
        </div>
      </div>
      
      <div class="result-card" onclick="copyColor('comparison')">
        <div class="result-title">Side by Side</div>
        <div class="result-preview" id="previewComparison" style="display: flex;">
          <div style="flex: 1;" id="compLeft"></div>
          <div style="flex: 1;" id="compRight"></div>
        </div>
        <div class="result-info">
          <div class="result-hex">Click to copy adjusted</div>
        </div>
      </div>
    </div>
  </div>
  
  <div class="toast" id="toast">Copied to clipboard!</div>
  
  
</div>





<?php include 'footer.php'; ?>



