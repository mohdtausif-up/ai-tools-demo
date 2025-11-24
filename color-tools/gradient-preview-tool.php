<?php 
$page_title = 'Gradient Preview Tool - Explore Beautiful Gradients';
$page_description = 'Preview and explore a gallery of beautiful gradient combinations with instant CSS export.';
$breadcrumbs = [
  ['title' => 'Gradient Preview Tool', 'url' => '']
];
include 'header.php'; 
?>

<div class="main-content">
<div class="container">
    
  <div class="d-flex justify-content-end mb-3" style="gap:1rem;">
    <button id="share-btn" class="btn btn-outline-secondary" title="Share this tool"><span>ðŸ”—</span> Share</button>
    <button id="fav-btn" class="btn btn-outline-warning" title="Add to Favourites"><span>â­</span> Add to Favourites</button>
  </div>
    <div class="subtitle">Explore a curated gallery of beautiful gradients</div>
    
    <div class="filters">
      <div class="filter-group">
        <span class="filter-label">Category:</span>
        <select id="categoryFilter" onchange="filterGradients()">
          <option value="all">All Gradients</option>
          <option value="warm">Warm</option>
          <option value="cool">Cool</option>
          <option value="vibrant">Vibrant</option>
          <option value="pastel">Pastel</option>
          <option value="sunset">Sunset</option>
          <option value="nature">Nature</option>
        </select>
      </div>
      
      <div class="filter-group">
        <span class="filter-label">Direction:</span>
        <select id="directionFilter" onchange="filterGradients()">
          <option value="all">All Directions</option>
          <option value="linear">Linear</option>
          <option value="radial">Radial</option>
        </select>
      </div>
    </div>
    
    <div class="gradients-grid" id="gradientsGrid"></div>
  </div>
  
  <div class="toast" id="toast">Copied to clipboard!</div>
  
  
</div>





<?php include 'footer.php'; ?>



