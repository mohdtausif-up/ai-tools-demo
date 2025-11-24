<?php 
$page_title = 'Tailwind Config Generator - Generate Tailwind CSS Color Config';
$page_description = 'Generate custom color configuration for your Tailwind CSS project with theme extension code.';
$breadcrumbs = [
  ['title' => 'Tailwind Config Generator', 'url' => '']
];
include 'header.php'; 
?>

<div class="main-content">
<div class="container">
    
  <div class="d-flex justify-content-end mb-3" style="gap:1rem;">
    <button id="share-btn" class="btn btn-outline-secondary" title="Share this tool"><span>ðŸ”—</span> Share</button>
    <button id="fav-btn" class="btn btn-outline-warning" title="Add to Favourites"><span>â­</span> Add to Favourites</button>
  </div>
    <p class="subtitle">Generate custom color configuration for your Tailwind CSS project</p>

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
            <input type="color" class="color-picker" value="#06b6d4">
            <div class="color-preview" style="background: #06b6d4;"></div>
            <button class="delete-btn" onclick="deleteColor(this)">×</button>
          </div>
        </div>
        <button class="add-btn" onclick="addColor()">+ Add Color</button>
      </div>

      <div class="section-title">Configuration Type</div>
      <div class="config-type-selector">
        <button class="config-type-btn active" data-type="extend" onclick="selectConfigType('extend')">
          Extend Theme
        </button>
        <button class="config-type-btn" data-type="replace" onclick="selectConfigType('replace')">
          Replace Colors
        </button>
        <button class="config-type-btn" data-type="full" onclick="selectConfigType('full')">
          Full Config
        </button>
      </div>

      <div class="section-title">Generated Code</div>
      <div class="output-section">
        <button class="copy-btn" onclick="copyConfig()">📋 Copy Code</button>
        <pre id="configOutput"></pre>
      </div>
    </div>
  </div>

  
</div>





<?php include 'footer.php'; ?>



