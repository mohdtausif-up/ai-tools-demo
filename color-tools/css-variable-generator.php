<?php 
$page_title = 'CSS Variable Generator - Create CSS Custom Properties';
$page_description = 'Generate CSS custom properties (variables) for your color palette. Perfect for theming.';
$breadcrumbs = [
  ['title' => 'Css Variable Generator', 'url' => '']
];
include 'header.php'; 
?>

<div class="main-content">
<div class="container">
    
  <div class="d-flex justify-content-end mb-3" style="gap:1rem;">
    <button id="share-btn" class="btn btn-outline-secondary" title="Share this tool"><span>ðŸ”—</span> Share</button>
    <button id="fav-btn" class="btn btn-outline-warning" title="Add to Favourites"><span>â­</span> Add to Favourites</button>
  </div>
    <div class="subtitle">Create CSS Custom Properties for Your Design System</div>
    
    <div class="builder-section">
      <div class="section-title">Color Palette</div>
      <div class="color-list" id="colorList"></div>
      <button class="add-btn" onclick="addColor()">+ Add Color</button>
    </div>
    
    <div class="options-section">
      <div class="section-title">Options</div>
      <div class="options-grid">
        <div class="option-group">
          <label>Prefix</label>
          <input type="text" id="prefix" value="color" placeholder="color">
        </div>
        
        <div class="option-group">
          <label>Naming Convention</label>
          <select id="namingConvention">
            <option value="kebab">kebab-case</option>
            <option value="camel">camelCase</option>
            <option value="snake">snake_case</option>
          </select>
        </div>
        
        <div class="option-group">
          <label>Scope</label>
          <select id="scope">
            <option value=":root">:root (global)</option>
            <option value="body">body</option>
            <option value=".theme">class (.theme)</option>
          </select>
        </div>
      </div>
    </div>
    
    <div class="code-section">
      <div class="code-header">
        <div class="code-title">Generated CSS</div>
        <button class="copy-btn" onclick="copyCode()">📋 Copy CSS</button>
      </div>
      <div class="code-box" id="codeBox"></div>
    </div>
  </div>
  
  <div class="toast" id="toast">Copied to clipboard!</div>
  
  
</div>





<?php include 'footer.php'; ?>



