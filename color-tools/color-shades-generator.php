<?php 
$page_title = 'Color Shades Generator - Tints, Shades & Tones';
$page_description = 'Generate tints, shades, and tones of any color. Create perfect color scales for your design system.';
$breadcrumbs = [
  ['title' => 'Color Shades Generator', 'url' => '']
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
      <label for="baseColor">Select Base Color</label>
      <input type="color" id="baseColor" value="#667eea">
      <div class="info-text">
        <strong>Tints:</strong> Mix color with white (lighter) •
        <strong>Shades:</strong> Mix color with black (darker) •
        <strong>Tones:</strong> Mix color with gray
      </div>
    </div>
    
    <div class="scales-container">
      <div class="scale-card">
        <div class="scale-title">Tints</div>
        <div class="scale-desc">Lightened by mixing with white. Perfect for backgrounds and subtle accents.</div>
        <div class="color-scale" id="tintsScale"></div>
      </div>
      
      <div class="scale-card">
        <div class="scale-title">Base Color</div>
        <div class="scale-desc">Your original color in various formats.</div>
        <div id="baseColorDisplay"></div>
      </div>
      
      <div class="scale-card">
        <div class="scale-title">Shades</div>
        <div class="scale-desc">Darkened by mixing with black. Great for text and strong emphasis.</div>
        <div class="color-scale" id="shadesScale"></div>
      </div>
      
      <div class="scale-card">
        <div class="scale-title">Tones</div>
        <div class="scale-desc">Muted by mixing with gray. Creates sophisticated, professional palettes.</div>
        <div class="color-scale" id="tonesScale"></div>
      </div>
    </div>
    
    <div class="tailwind-section">
      <div class="tailwind-title">Tailwind-Style Scale</div>
      <div class="tailwind-desc">10-step color scale from 50 (lightest) to 950 (darkest)</div>
      <div class="tailwind-scale" id="tailwindScale"></div>
    </div>
  </div>
  
  <div class="toast" id="toast">Copied to clipboard!</div>
  
  
</div>





<?php include 'footer.php'; ?>



