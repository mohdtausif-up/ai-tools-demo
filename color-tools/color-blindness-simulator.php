<?php 
$page_title = 'Color Blindness Simulator - Accessibility Testing';
$page_description = 'Simulate how colors appear to people with different types of color blindness. Test accessibility.';
$breadcrumbs = [
  ['title' => 'Color Blindness Simulator', 'url' => '']
];
include 'header.php'; 
?>

<div class="main-content">
<div class="container">
    
  <div class="d-flex justify-content-end mb-3" style="gap:1rem;">
    <button id="share-btn" class="btn btn-outline-secondary" title="Share this tool"><span>ðŸ”—</span> Share</button>
    <button id="fav-btn" class="btn btn-outline-warning" title="Add to Favourites"><span>â­</span> Add to Favourites</button>
  </div>
    <div class="subtitle">Test how your colors appear to people with color vision deficiency</div>
    
    <div class="info-box">
      <div class="info-title">About Color Vision Deficiency</div>
      <div class="info-text">
        Approximately 8% of men and 0.5% of women have some form of color blindness.
        Use this tool to ensure your color choices are accessible to everyone.
      </div>
    </div>
    
    <div class="control-panel">
      <div class="color-inputs">
        <div class="color-group">
          <label>Color 1</label>
          <input type="color" id="color1" value="#FF5733">
          <div class="hex-display" id="hex1">#FF5733</div>
        </div>
        <div class="color-group">
          <label>Color 2</label>
          <input type="color" id="color2" value="#33FF57">
          <div class="hex-display" id="hex2">#33FF57</div>
        </div>
        <div class="color-group">
          <label>Color 3</label>
          <input type="color" id="color3" value="#3357FF">
          <div class="hex-display" id="hex3">#3357FF</div>
        </div>
        <div class="color-group">
          <label>Color 4</label>
          <input type="color" id="color4" value="#F3FF33">
          <div class="hex-display" id="hex4">#F3FF33</div>
        </div>
      </div>
    </div>
    
    <div class="simulations-grid" id="simulationsGrid"></div>
  </div>
  
  <div class="toast" id="toast">Copied to clipboard!</div>
  
  
</div>





<?php include 'footer.php'; ?>



