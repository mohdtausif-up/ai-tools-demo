<?php 
$page_title = 'Tailwind CSS Colors - Complete Color Palette';
$page_description = 'Browse and copy Tailwind CSS color palette. All colors from 50 to 950 with class names and HEX codes.';
$breadcrumbs = [
  ['title' => 'Tailwind Css Colors', 'url' => '']
];
include 'header.php'; 
?>

<div class="main-content">
<div class="container">
    
  <div class="d-flex justify-content-end mb-3" style="gap:1rem;">
    <button id="share-btn" class="btn btn-outline-secondary" title="Share this tool"><span>ðŸ”—</span> Share</button>
    <button id="fav-btn" class="btn btn-outline-warning" title="Add to Favourites"><span>â­</span> Add to Favourites</button>
  </div>
    <div class="subtitle">Complete Tailwind CSS v3 Color Palette</div>
    
    <div class="palette-grid" id="paletteGrid"></div>
  </div>
  
  <div class="toast" id="toast">Copied to clipboard!</div>
  
  
</div>





<?php include 'footer.php'; ?>



