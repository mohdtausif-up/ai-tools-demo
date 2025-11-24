<?php 
$page_title = 'Color Mood Board Creator - Design Color Presentations';
$page_description = 'Create beautiful color mood boards with textures, patterns, and typography previews.';
$breadcrumbs = [
  ['title' => 'Color Mood Board Creator', 'url' => '']
];
include 'header.php'; 
?>

<div class="main-content">
<div class="container">
    
  <div class="d-flex justify-content-end mb-3" style="gap:1rem;">
    <button id="share-btn" class="btn btn-outline-secondary" title="Share this tool"><span>ðŸ”—</span> Share</button>
    <button id="fav-btn" class="btn btn-outline-warning" title="Add to Favourites"><span>â­</span> Add to Favourites</button>
  </div>
    <div class="subtitle">Design beautiful color presentations with textures and typography</div>
    
    <div class="workspace">
      <div class="sidebar">
        <div class="panel">
          <div class="panel-title">🎨 Color Palette</div>
          <div class="color-palette" id="colorPalette"></div>
          <div class="color-picker-wrapper">
            <div class="label">Add Custom Color</div>
            <input type="color" id="colorPicker" value="#667eea">
            <button class="btn btn-primary" onclick="addColor()">Add Color</button>
          </div>
        </div>
        
        <div class="panel">
          <div class="panel-title">🖼️ Textures</div>
          <div class="label">Select Texture Overlay</div>
          <div class="texture-grid" id="textureGrid"></div>
        </div>
        
        <div class="panel">
          <div class="panel-title">✍️ Typography</div>
          <div class="label">Font Family</div>
          <select class="font-selector" id="fontSelector">
            <option value="'Georgia', serif">Georgia (Serif)</option>
            <option value="'Playfair Display', serif">Playfair Display</option>
            <option value="'Helvetica', sans-serif">Helvetica</option>
            <option value="'Arial', sans-serif">Arial</option>
            <option value="'Roboto', sans-serif">Roboto</option>
            <option value="'Open Sans', sans-serif">Open Sans</option>
            <option value="'Montserrat', sans-serif">Montserrat</option>
            <option value="'Courier New', monospace">Courier New</option>
          </select>
          <button class="btn btn-secondary" onclick="updateTypography()">Apply Font</button>
        </div>
        
        <div class="panel">
          <button class="btn btn-primary" onclick="exportMoodBoard()">📥 Export as Image</button>
          <button class="btn btn-secondary" onclick="resetBoard()">🔄 Reset Board</button>
        </div>
      </div>
      
      <div class="mood-board" id="moodBoard">
        <div class="board-grid" id="boardGrid"></div>
      </div>
    </div>
  </div>
  
  <div class="toast" id="toast">Action completed!</div>
  
  
</div>





<?php include 'footer.php'; ?>



