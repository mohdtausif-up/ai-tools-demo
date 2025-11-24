<?php 
$page_title = 'Color Token System Builder - Design Token Generator';
$page_description = 'Generate design tokens for your color system in JSON, YAML, CSS, and JavaScript formats.';
$breadcrumbs = [
  ['title' => 'Color Token System Builder', 'url' => '']
];
include 'header.php'; 
?>

<div class="main-content">
<div class="container">
    
  <div class="d-flex justify-content-end mb-3" style="gap:1rem;">
    <button id="share-btn" class="btn btn-outline-secondary" title="Share this tool"><span>ðŸ”—</span> Share</button>
    <button id="fav-btn" class="btn btn-outline-warning" title="Add to Favourites"><span>â­</span> Add to Favourites</button>
  </div>
    <p class="subtitle">Generate design tokens for your color system in multiple formats</p>

    <div class="main-grid">
      <div class="input-card">
        <div class="section-title">Token Configuration</div>
        
        <div class="naming-section">
          <label style="font-weight: 600; font-size: 14px; color: #334155; margin-bottom: 8px; display: block;">
            Token Prefix
          </label>
          <input type="text" class="naming-input" id="tokenPrefix" value="color" placeholder="e.g., color, brand, theme">
          <div class="naming-example">
            Example: <strong>color.primary.500</strong>
          </div>
        </div>

        <div class="section-title" style="margin-top: 30px;">Add Colors</div>
        <div class="color-input-group" id="colorInputs">
          <div class="color-row">
            <input type="text" class="color-name" placeholder="primary.500" value="primary.500">
            <input type="color" class="color-picker" value="#3b82f6">
            <button class="delete-btn" onclick="deleteColor(this)">×</button>
          </div>
          <div class="color-row">
            <input type="text" class="color-name" placeholder="secondary.500" value="secondary.500">
            <input type="color" class="color-picker" value="#8b5cf6">
            <button class="delete-btn" onclick="deleteColor(this)">×</button>
          </div>
          <div class="color-row">
            <input type="text" class="color-name" placeholder="accent.500" value="accent.500">
            <input type="color" class="color-picker" value="#ec4899">
            <button class="delete-btn" onclick="deleteColor(this)">×</button>
          </div>
          <div class="color-row">
            <input type="text" class="color-name" placeholder="neutral.100" value="neutral.100">
            <input type="color" class="color-picker" value="#f1f5f9">
            <button class="delete-btn" onclick="deleteColor(this)">×</button>
          </div>
          <div class="color-row">
            <input type="text" class="color-name" placeholder="neutral.900" value="neutral.900">
            <input type="color" class="color-picker" value="#0f172a">
            <button class="delete-btn" onclick="deleteColor(this)">×</button>
          </div>
        </div>
        <button class="add-btn" onclick="addColor()">+ Add Color Token</button>
      </div>

      <div class="output-card">
        <div class="section-title">Export Format</div>
        <div class="format-selector">
          <button class="format-btn active" data-format="json" onclick="selectFormat('json')">
            JSON
          </button>
          <button class="format-btn" data-format="yaml" onclick="selectFormat('yaml')">
            YAML
          </button>
          <button class="format-btn" data-format="css" onclick="selectFormat('css')">
            CSS Variables
          </button>
          <button class="format-btn" data-format="js" onclick="selectFormat('js')">
            JavaScript
          </button>
        </div>

        <div class="section-title">Generated Tokens</div>
        <div class="output-section">
          <button class="copy-btn" onclick="copyTokens()">📋 Copy</button>
          <pre id="tokenOutput"></pre>
        </div>
        <button class="download-btn" onclick="downloadTokens()">⬇️ Download File</button>
      </div>
    </div>
  </div>

  
</div>





<?php include 'footer.php'; ?>



