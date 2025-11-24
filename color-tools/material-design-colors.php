<?php 
$page_title = 'Material Design Colors - Google Material Palette';
$page_description = 'Browse and copy Google Material Design color palette. All colors from 50 to 900 with A100-A700 accents.';
$breadcrumbs = [
  ['title' => 'Material Design Colors', 'url' => '']
];
include 'header.php'; 
?>

<div class="main-content">
<div class="container">
    
  <div class="d-flex justify-content-end mb-3" style="gap:1rem;">
    <button id="share-btn" class="btn btn-outline-secondary" title="Share this tool"><span>ðŸ”—</span> Share</button>
    <button id="fav-btn" class="btn btn-outline-warning" title="Add to Favourites"><span>â­</span> Add to Favourites</button>
  </div>
    <div class="subtitle">Google's Material Design Color Palette</div>
    
    <div class="palette-grid" id="paletteGrid"></div>
  </div>
  
  <div class="toast" id="toast">Copied to clipboard!</div>
  
  
</div>





<?php include 'footer.php'; ?>



