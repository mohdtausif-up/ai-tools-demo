<?php 
$page_title = 'Sass/SCSS Variable Generator - Export Colors as Sass Variables';
$page_description = 'Generate Sass and SCSS color variables with functions and mixins from your color palette.';
$breadcrumbs = [
  ['title' => 'Sass Scss Variable Generator', 'url' => '']
];
include 'header.php'; 
?>

<div class="main-content">
<div class="container">
    
  <div class="d-flex justify-content-end mb-3" style="gap:1rem;">
    <button id="share-btn" class="btn btn-outline-secondary" title="Share this tool"><span>ðŸ”—</span> Share</button>
    <button id="fav-btn" class="btn btn-outline-warning" title="Add to Favourites"><span>â­</span> Add to Favourites</button>
  </div>
    <p class="subtitle">Generate Sass and SCSS color variables with functions and mixins</p>

    <div class="main-card">
      <div class="section-title">Add Your Colors</div>
      <div class="input-section">
        <div class="color-input-group" id="colorInputs">
          <div class="color-row">
            <input type="text" class="color-name" placeholder="primary" value="primary">
            <input type="color" class="color-picker" value="#3b82f6">
            <div class="color-preview" style="background: #3b82f6;"></div>
            <button class="delete-btn" onclick="deleteColor(this)">×</button>
          </div>
          <div class="color-row">
            <input type="text" class="color-name" placeholder="secondary" value="secondary">
            <input type="color" class="color-picker" value="#8b5cf6">
            <div class="color-preview" style="background: #8b5cf6;"></div>
            <button class="delete-btn" onclick="deleteColor(this)">×</button>
          </div>
          <div class="color-row">
            <input type="text" class="color-name" placeholder="accent" value="accent">
            <input type="color" class="color-picker" value="#ec4899">
            <div class="color-preview" style="background: #ec4899;"></div>
            <button class="delete-btn" onclick="deleteColor(this)">×</button>
          </div>
        </div>
        <button class="add-btn" onclick="addColor()">+ Add Color</button>
      </div>

      <div class="section-title">Syntax</div>
      <div class="syntax-selector">
        <button class="syntax-btn active" data-syntax="scss" onclick="selectSyntax('scss')">
          SCSS (with {})
        </button>
        <button class="syntax-btn" data-syntax="sass" onclick="selectSyntax('sass')">
          Sass (indented)
        </button>
      </div>

      <div class="section-title">Include</div>
      <div class="options-section">
        <div class="option-card active" data-option="variables" onclick="toggleOption('variables')">
          <div class="option-title">✓ Variables</div>
          <div class="option-desc">$color-name definitions</div>
        </div>
        <div class="option-card active" data-option="functions" onclick="toggleOption('functions')">
          <div class="option-title">✓ Color Functions</div>
          <div class="option-desc">lighten, darken, adjust</div>
        </div>
        <div class="option-card active" data-option="mixins" onclick="toggleOption('mixins')">
          <div class="option-title">✓ Mixins</div>
          <div class="option-desc">Color utility mixins</div>
        </div>
        <div class="option-card" data-option="map" onclick="toggleOption('map')">
          <div class="option-title">Color Map</div>
          <div class="option-desc">$colors map structure</div>
        </div>
      </div>

      <div class="section-title">Generated Code</div>
      <div class="output-section">
        <button class="copy-btn" onclick="copyCode()">📋 Copy Code</button>
        <pre id="codeOutput"></pre>
      </div>
    </div>
  </div>

  
</div>





<?php include 'footer.php'; ?>



