<?php 
$page_title = 'Gradient Animation Generator - Animated CSS Gradients';
$page_description = 'Create animated gradient backgrounds with CSS keyframes. Copy code instantly.';
$breadcrumbs = [
  ['title' => 'Gradient Animation Generator', 'url' => '']
];
include 'header.php'; 
?>

<div class="main-content">
<div class="container">
    
  <div class="d-flex justify-content-end mb-3" style="gap:1rem;">
    <button id="share-btn" class="btn btn-outline-secondary" title="Share this tool"><span>ðŸ”—</span> Share</button>
    <button id="fav-btn" class="btn btn-outline-warning" title="Add to Favourites"><span>â­</span> Add to Favourites</button>
  </div>
    <div class="subtitle">Create Stunning Animated Gradient Backgrounds</div>
    
    <div class="controls-section">
      <div class="controls-grid">
        <div class="control-group">
          <label>Color 1</label>
          <input type="color" id="color1" value="#667eea">
        </div>
        
        <div class="control-group">
          <label>Color 2</label>
          <input type="color" id="color2" value="#764ba2">
        </div>
        
        <div class="control-group">
          <label>Color 3</label>
          <input type="color" id="color3" value="#f093fb">
        </div>
        
        <div class="control-group">
          <label>Color 4</label>
          <input type="color" id="color4" value="#4facfe">
        </div>
        
        <div class="control-group">
          <label>Animation Type</label>
          <select id="animationType">
            <option value="rotate">Rotate</option>
            <option value="shift">Shift Colors</option>
            <option value="wave">Wave</option>
            <option value="pulse">Pulse</option>
          </select>
        </div>
        
        <div class="control-group">
          <label>Duration (seconds)</label>
          <input type="number" id="duration" min="1" max="30" value="8">
        </div>
        
        <div class="control-group">
          <label>Angle (degrees)</label>
          <input type="number" id="angle" min="0" max="360" value="135">
        </div>
        
        <div class="control-group">
          <label>Easing</label>
          <select id="easing">
            <option value="linear">Linear</option>
            <option value="ease">Ease</option>
            <option value="ease-in">Ease In</option>
            <option value="ease-out">Ease Out</option>
            <option value="ease-in-out" selected>Ease In Out</option>
          </select>
        </div>
      </div>
    </div>
    
    <div class="preview-section">
      <div class="preview-title">Live Preview</div>
      <div class="preview-box" id="previewBox"></div>
    </div>
    
    <div class="code-section">
      <div class="code-header">
        <div class="code-title">CSS Code</div>
        <button class="copy-btn" onclick="copyCode()">📋 Copy All CSS</button>
      </div>
      <div class="code-box" id="codeBox"></div>
    </div>
  </div>
  
  <div class="toast" id="toast">Copied to clipboard!</div>
  
  
</div>





<?php include 'footer.php'; ?>



