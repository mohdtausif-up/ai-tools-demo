<?php 
$page_title = 'Color Harmonies Tool - Generate Color Schemes';
$page_description = 'Generate complementary, triadic, analogous, and more color harmony schemes. Perfect for designers and artists.';
$breadcrumbs = [
  ['title' => 'Color Harmonies', 'url' => '']
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
      <label for="baseColor">Select Base Color</label>
      <input type="color" id="baseColor" value="#667eea">
    </div>
    
    <div class="wheel-container">
      <div class="wheel-title">Color Wheel</div>
      <canvas id="colorWheel" width="400" height="400"></canvas>
    </div>
    
    <div class="harmony-grid" id="harmonyGrid"></div>
  </div>
  
  <div class="toast" id="toast">Copied to clipboard!</div>
  
  
</div>





<?php include 'footer.php'; ?>



