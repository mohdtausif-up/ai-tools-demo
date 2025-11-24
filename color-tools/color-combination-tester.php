<?php 
$page_title = 'Color Combination Tester - Test Multiple Color Palettes Side-by-Side';
$page_description = 'Test and compare multiple color combinations simultaneously to find the perfect palette for your design.';
$breadcrumbs = [
  ['title' => 'Color Combination Tester', 'url' => '']
];
include 'header.php'; 
?>

<div class="main-content">
<div class="container">
    
  <div class="d-flex justify-content-end mb-3" style="gap:1rem;">
    <button id="share-btn" class="btn btn-outline-secondary" title="Share this tool"><span>ðŸ”—</span> Share</button>
    <button id="fav-btn" class="btn btn-outline-warning" title="Add to Favourites"><span>â­</span> Add to Favourites</button>
  </div>
    <div class="subtitle">Test multiple color combinations side-by-side</div>
    
    <div class="combinations-container" id="combinationsContainer"></div>
    
    <button class="add-btn" onclick="addCombination()">+ Add New Combination</button>
  </div>
  
  <div class="toast" id="toast">Copied to clipboard!</div>
  
  
</div>





<?php include 'footer.php'; ?>



