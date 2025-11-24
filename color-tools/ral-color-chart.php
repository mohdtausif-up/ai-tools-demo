<?php 
$page_title = 'RAL Color Chart - Complete RAL Color Reference with HEX Codes';
$page_description = 'Complete RAL Classic color chart with HEX, RGB, and CMYK values. Search from 200+ RAL colors.';
$breadcrumbs = [
  ['title' => 'Ral Color Chart', 'url' => '']
];
include 'header.php'; 
?>

<div class="main-content">
<div class="container">
    
  <div class="d-flex justify-content-end mb-3" style="gap:1rem;">
    <button id="share-btn" class="btn btn-outline-secondary" title="Share this tool"><span>ðŸ”—</span> Share</button>
    <button id="fav-btn" class="btn btn-outline-warning" title="Add to Favourites"><span>â­</span> Add to Favourites</button>
  </div>
    <div class="subtitle">Complete RAL Classic color reference with HEX codes</div>
    
    <div class="search-section">
      <div class="search-box">
        <input type="text" id="searchInput" placeholder="Search RAL colors... (e.g., '1000', 'Beige', 'Green')">
      </div>
      
      <div class="filter-tabs">
        <button class="filter-btn active" onclick="filterRange('all')">All</button>
        <button class="filter-btn" onclick="filterRange('1000')">Yellow/Beige (1000s)</button>
        <button class="filter-btn" onclick="filterRange('2000')">Orange (2000s)</button>
        <button class="filter-btn" onclick="filterRange('3000')">Red (3000s)</button>
        <button class="filter-btn" onclick="filterRange('4000')">Violet (4000s)</button>
        <button class="filter-btn" onclick="filterRange('5000')">Blue (5000s)</button>
        <button class="filter-btn" onclick="filterRange('6000')">Green (6000s)</button>
        <button class="filter-btn" onclick="filterRange('7000')">Gray (7000s)</button>
        <button class="filter-btn" onclick="filterRange('8000')">Brown (8000s)</button>
        <button class="filter-btn" onclick="filterRange('9000')">White/Black (9000s)</button>
      </div>
    </div>
    
    <div class="colors-grid" id="colorsGrid"></div>
  </div>
  
  <div class="toast" id="toast">Copied to clipboard!</div>
  
  
</div>





<?php include 'footer.php'; ?>



