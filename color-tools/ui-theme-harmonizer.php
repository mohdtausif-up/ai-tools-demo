<?php 
$page_title = 'UI Theme Harmonizer - Generate Complete UI Color Systems';
$page_description = 'Generate complete, harmonious UI color systems with all states and variations.';
$breadcrumbs = [
  ['title' => 'Ui Theme Harmonizer', 'url' => '']
];
include 'header.php'; 
?>

<div class="main-content">
<div class="container">
    
  <div class="d-flex justify-content-end mb-3" style="gap:1rem;">
    <button id="share-btn" class="btn btn-outline-secondary" title="Share this tool"><span>ðŸ”—</span> Share</button>
    <button id="fav-btn" class="btn btn-outline-warning" title="Add to Favourites"><span>â­</span> Add to Favourites</button>
  </div>
    <div class="subtitle">Generate complete, harmonious UI color systems</div>
    
    <div class="controls">
      <div class="input-grid">
        <div class="input-group">
          <label class="input-label">Primary Color</label>
          <input type="color" id="primaryColor" value="#667eea">
        </div>
        <div class="input-group">
          <label class="input-label">Secondary Color</label>
          <input type="color" id="secondaryColor" value="#48bb78">
        </div>
        <div class="input-group">
          <label class="input-label">Accent Color</label>
          <input type="color" id="accentColor" value="#f093fb">
        </div>
      </div>
      <button class="btn" onclick="generateTheme()">✨ Generate UI Theme</button>
    </div>
    
    <div class="theme-preview" id="themePreview">
      <div class="section-title">🎨 Main Colors</div>
      <div class="colors-grid" id="mainColors"></div>
      
      <div class="section-title">📊 Background Colors</div>
      <div class="colors-grid" id="bgColors"></div>
      
      <div class="section-title">✏️ Text Colors</div>
      <div class="colors-grid" id="textColors"></div>
      
      <div class="section-title">🔲 Border & Divider Colors</div>
      <div class="colors-grid" id="borderColors"></div>
      
      <div class="section-title">🎯 State Colors</div>
      <div class="colors-grid" id="stateColors"></div>
      
      <div class="section-title">🖼️ Live Preview</div>
      <div class="ui-demo" id="uiDemo">
        <div class="demo-buttons">
          <button class="demo-btn" style="background: var(--primary); color: white;">Primary Button</button>
          <button class="demo-btn" style="background: var(--secondary); color: white;">Secondary Button</button>
          <button class="demo-btn" style="background: var(--accent); color: white;">Accent Button</button>
          <button class="demo-btn" style="background: transparent; border: 2px solid var(--primary); color: var(--primary);">Outline</button>
        </div>
        <div class="demo-card">
          <h3 style="color: var(--text-primary); margin-bottom: 10px;">Card Title</h3>
          <p style="color: var(--text-secondary); line-height: 1.6;">This is a demo card showing how your theme looks in a real UI. The colors are automatically generated to be harmonious and accessible.</p>
        </div>
      </div>
    </div>
  </div>
  
  <div class="toast" id="toast">Copied to clipboard!</div>
  
  
</div>





<?php include 'footer.php'; ?>



