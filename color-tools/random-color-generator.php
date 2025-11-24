<?php 
$page_title = 'Random Color Generator - Generate Random Colors';
$page_description = 'Generate random colors with constraints like pastel, vibrant, dark, light, and more. Perfect for design inspiration.';
$breadcrumbs = [
  ['title' => 'Random Color Generator', 'url' => '']
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
      <div class="control-row">
        <div class="control-group">
          <label for="colorType">Color Type</label>
          <select id="colorType">
            <option value="any">Any Color</option>
            <option value="pastel">Pastel</option>
            <option value="vibrant">Vibrant</option>
            <option value="dark">Dark</option>
            <option value="light">Light</option>
            <option value="warm">Warm</option>
            <option value="cool">Cool</option>
            <option value="grayscale">Grayscale</option>
          </select>
        </div>
        
        <div class="control-group">
          <label for="colorCount">Number of Colors</label>
          <input type="number" id="colorCount" min="1" max="20" value="8">
        </div>
      </div>
      
      <button class="generate-btn" onclick="generateColors()">🎨 Generate Colors</button>
    </div>
    
    <div class="color-grid" id="colorGrid"></div>
  </div>
  
  <div class="toast" id="toast">Copied to clipboard!</div>
  
  
</div>





<?php include 'footer.php'; ?>



