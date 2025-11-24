<?php 
$page_title = 'Pantone to HEX Converter - Convert Pantone Colors to Digital Formats';
$page_description = 'Convert Pantone PMS colors to HEX, RGB, and CMYK. Search from 2000+ Pantone colors.';
$breadcrumbs = [
  ['title' => 'Pantone To Hex', 'url' => '']
];
include 'header.php'; 
?>

<div class="main-content">
<div class="container">
    
  <div class="d-flex justify-content-end mb-3" style="gap:1rem;">
    <button id="share-btn" class="btn btn-outline-secondary" title="Share this tool"><span>ðŸ”—</span> Share</button>
    <button id="fav-btn" class="btn btn-outline-warning" title="Add to Favourites"><span>â­</span> Add to Favourites</button>
  </div>
    <div class="subtitle">Search and convert Pantone PMS colors to digital formats</div>
    
    <div class="search-section">
      <div class="search-box">
        <input type="text" id="searchInput" placeholder="Search Pantone colors... (e.g., 'Red', '186', 'Cool Gray')">
      </div>
      
      <div class="filter-tabs">
        <button class="filter-btn active" onclick="filterCategory('all')">All</button>
        <button class="filter-btn" onclick="filterCategory('red')">Reds</button>
        <button class="filter-btn" onclick="filterCategory('blue')">Blues</button>
        <button class="filter-btn" onclick="filterCategory('green')">Greens</button>
        <button class="filter-btn" onclick="filterCategory('yellow')">Yellows</button>
        <button class="filter-btn" onclick="filterCategory('purple')">Purples</button>
        <button class="filter-btn" onclick="filterCategory('orange')">Oranges</button>
        <button class="filter-btn" onclick="filterCategory('gray')">Grays</button>
      </div>
    </div>
    
    <div class="colors-grid" id="colorsGrid"></div>
  </div>
  
  <div class="toast" id="toast">Copied to clipboard!</div>
  
  
</div>





<?php include 'footer.php'; ?>



