<?php 
$page_title = 'Palette Generator - Create Color Palettes';
$page_description = 'Generate harmonious color palettes from a base color. Create monochromatic, analogous, complementary, and custom palettes.';
$breadcrumbs = [
  ['title' => 'Palette Generator', 'url' => '']
];
include 'header.php'; 
?>

<div class="main-content">
<div class="container">
    
  <div class="d-flex justify-content-end mb-3" style="gap:1rem;">
    <button id="share-btn" class="btn btn-outline-secondary" title="Share this tool"><span>ðŸ”—</span> Share</button>
    <button id="fav-btn" class="btn btn-outline-warning" title="Add to Favourites"><span>â­</span> Add to Favourites</button>
  </div>
    
    <div class="controls">
      <div class="control-row">
        <div>
          <label for="baseColor">Base Color</label>
          <input type="color" id="baseColor" value="#667eea">
        </div>
        <div>
          <label for="paletteType">Palette Type</label>
          <select id="paletteType">
            <option value="monochromatic">Monochromatic</option>
            <option value="analogous">Analogous</option>
            <option value="complementary">Complementary</option>
            <option value="triadic">Triadic</option>
            <option value="tetradic">Tetradic</option>
            <option value="split-complementary">Split Complementary</option>
          </select>
        </div>
        <div>
          <label for="numColors">Number of Colors</label>
          <select id="numColors">
            <option value="3">3 Colors</option>
            <option value="5" selected>5 Colors</option>
            <option value="7">7 Colors</option>
            <option value="10">10 Colors</option>
          </select>
        </div>
      </div>
      <button class="btn" onclick="generatePalette()">Generate Palette</button>
    </div>
    
    <div class="palette-section">
      <div class="palette-title" id="paletteTitle">Monochromatic Palette</div>
      <div class="palette-grid" id="paletteGrid"></div>
    </div>
  </div>
  
  <div class="toast" id="toast">Copied to clipboard!</div>
  
  
</div>





<?php include 'footer.php'; ?>



