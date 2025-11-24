<?php 
$page_title = 'Brand Color Finder - Popular Brand Colors';
$page_description = 'Find and copy colors from popular brands. Browse color palettes used by major companies.';
$breadcrumbs = [
  ['title' => 'Brand Color Finder', 'url' => '']
];
include 'header.php'; 
?>

<div class="main-content">
<div class="container">
    
  <div class="d-flex justify-content-end mb-3" style="gap:1rem;">
    <button id="share-btn" class="btn btn-outline-secondary" title="Share this tool"><span>ðŸ”—</span> Share</button>
    <button id="fav-btn" class="btn btn-outline-warning" title="Add to Favourites"><span>â­</span> Add to Favourites</button>
  </div>
    <div class="subtitle">Popular Brand Color Palettes</div>
    
    <div class="search-box">
      <input type="text" class="search-input" id="searchInput" placeholder="Search brands...">
    </div>
    
    <div class="brands-grid" id="brandsGrid"></div>
  </div>
  
  <div class="toast" id="toast">Copied to clipboard!</div>
  
  
</div>





<?php include 'footer.php'; ?>



