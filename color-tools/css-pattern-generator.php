<?php 
$page_title = 'CSS Pattern Generator - Create Background Patterns';
$page_description = 'Generate CSS patterns like stripes, dots, grids, and more. Copy CSS code instantly.';
$breadcrumbs = [
  ['title' => 'Css Pattern Generator', 'url' => '']
];
include 'header.php'; 
?>

<div class="main-content">
<div class="container">
    
  <div class="d-flex justify-content-end mb-3" style="gap:1rem;">
    <button id="share-btn" class="btn btn-outline-secondary" title="Share this tool"><span>ðŸ”—</span> Share</button>
    <button id="fav-btn" class="btn btn-outline-warning" title="Add to Favourites"><span>â­</span> Add to Favourites</button>
  </div>
    <div class="subtitle">Create Beautiful Background Patterns with CSS</div>
    
    <div class="main-grid">
      <div class="control-panel">
        <div class="control-group">
          <label>Pattern Type</label>
          <select id="patternType">
            <option value="stripes">Stripes</option>
            <option value="diagonal">Diagonal Stripes</option>
            <option value="dots">Dots</option>
            <option value="grid">Grid</option>
            <option value="checkerboard">Checkerboard</option>
            <option value="zigzag">Zigzag</option>
            <option value="triangles">Triangles</option>
            <option value="hexagons">Hexagons</option>
          </select>
        </div>
        
        <div class="control-group">
          <label>Color 1</label>
          <input type="color" id="color1" value="#667eea">
        </div>
        
        <div class="control-group">
          <label>Color 2</label>
          <input type="color" id="color2" value="#764ba2">
        </div>
        
        <div class="control-group">
          <label>Pattern Size: <span id="sizeValue">50px</span></label>
          <input type="range" id="patternSize" min="10" max="200" value="50">
        </div>
        
        <div class="control-group">
          <label>Background Color</label>
          <input type="color" id="bgColor" value="#ffffff">
        </div>
      </div>
      
      <div class="preview-section">
        <div class="preview-title">Preview</div>
        <div class="preview-box" id="previewBox"></div>
      </div>
    </div>
    
    <div class="code-section">
      <div class="code-header">
        <div class="code-title">CSS Code</div>
        <button class="copy-btn" onclick="copyCode()">📋 Copy CSS</button>
      </div>
      <div class="code-box" id="codeBox"></div>
    </div>
  </div>
  
  <div class="toast" id="toast">Copied to clipboard!</div>
  
  
</div>





<?php include 'footer.php'; ?>



