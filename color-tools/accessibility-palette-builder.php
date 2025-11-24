<?php 
$page_title = 'Accessibility Palette Builder - WCAG Compliant Colors';
$page_description = 'Build color palettes that meet WCAG accessibility standards. Ensure your designs are accessible.';
$breadcrumbs = [
  ['title' => 'Accessibility Palette Builder', 'url' => '']
];
include 'header.php'; 
?>

<div class="main-content">
<div class="container">
    
  <div class="d-flex justify-content-end mb-3" style="gap:1rem;">
    <button id="share-btn" class="btn btn-outline-secondary" title="Share this tool"><span>ðŸ”—</span> Share</button>
    <button id="fav-btn" class="btn btn-outline-warning" title="Add to Favourites"><span>â­</span> Add to Favourites</button>
  </div>
    <div class="subtitle">Build WCAG Compliant Color Palettes</div>
    
    <div class="info-box">
      <div class="info-title">WCAG Standards</div>
      <div class="info-text">
        <strong>AA Normal:</strong> 4.5:1 contrast ratio • 
        <strong>AA Large:</strong> 3:1 • 
        <strong>AAA Normal:</strong> 7:1 • 
        <strong>AAA Large:</strong> 4.5:1
      </div>
    </div>
    
    <div class="controls">
      <div class="controls-grid">
        <div class="control-group">
          <label>Base Color</label>
          <input type="color" id="baseColor" value="#667eea">
        </div>
        
        <div class="control-group">
          <label>Background</label>
          <select id="bgType">
            <option value="white">White Background</option>
            <option value="black">Black Background</option>
            <option value="both">Both Backgrounds</option>
          </select>
        </div>
        
        <div class="control-group">
          <label>Compliance Level</label>
          <select id="complianceLevel">
            <option value="AA">WCAG AA</option>
            <option value="AAA">WCAG AAA</option>
          </select>
        </div>
        
        <div class="control-group" style="display: flex; align-items: flex-end;">
          <button class="generate-btn" onclick="generatePalette()">🎨 Generate Palette</button>
        </div>
      </div>
    </div>
    
    <div class="palette-grid" id="paletteGrid"></div>
  </div>
  
  <div class="toast" id="toast">Copied to clipboard!</div>
  
  
</div>





<?php include 'footer.php'; ?>



