<?php 
$page_title = 'Color History Tracker - Save & Manage Colors';
$page_description = 'Track and manage your color history. Never lose a color again.';
$breadcrumbs = [
  ['title' => 'Color History Tracker', 'url' => '']
];
include 'header.php'; 
?>

<div class="main-content">
<div class="container">
    
  <div class="d-flex justify-content-end mb-3" style="gap:1rem;">
    <button id="share-btn" class="btn btn-outline-secondary" title="Share this tool"><span>ðŸ”—</span> Share</button>
    <button id="fav-btn" class="btn btn-outline-warning" title="Add to Favourites"><span>â­</span> Add to Favourites</button>
  </div>
    <div class="subtitle">Save and Manage Your Color Collection</div>
    
    <div class="input-section">
      <div class="input-grid">
        <input type="color" id="colorInput" value="#667eea">
        <input type="text" id="hexInput" placeholder="#667eea" value="#667eea">
        <button class="btn btn-primary" onclick="saveColor()">💾 Save Color</button>
        <button class="btn btn-danger" onclick="clearHistory()">🗑️ Clear All</button>
      </div>
    </div>
    
    <div class="filters">
      <span class="filter-label">Sort by:</span>
      <select id="sortBy" onchange="renderColors()">
        <option value="newest">Newest First</option>
        <option value="oldest">Oldest First</option>
        <option value="hue">By Hue</option>
        <option value="lightness">By Lightness</option>
      </select>
      
      <div class="stats">
        <div class="stat-item">
          <div class="stat-value" id="totalCount">0</div>
          <div class="stat-label">Total Colors</div>
        </div>
        <div class="stat-item">
          <div class="stat-value" id="uniqueCount">0</div>
          <div class="stat-label">Unique</div>
        </div>
      </div>
    </div>
    
    <div class="colors-grid" id="colorsGrid"></div>
  </div>
  
  <div class="toast" id="toast">Copied to clipboard!</div>
  
  
</div>





<?php include 'footer.php'; ?>



