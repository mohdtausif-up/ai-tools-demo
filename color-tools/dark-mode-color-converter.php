<?php 
$page_title = 'Dark Mode Color Converter - Light to Dark Theme Converter';
$page_description = 'Convert light theme colors to dark mode with automatic luminance adjustment and accessibility checks.';
$breadcrumbs = [
  ['title' => 'Dark Mode Color Converter', 'url' => '']
];
include 'header.php'; 
?>

<div class="main-content">
<div class="container">
    
  <div class="d-flex justify-content-end mb-3" style="gap:1rem;">
    <button id="share-btn" class="btn btn-outline-secondary" title="Share this tool"><span>ðŸ”—</span> Share</button>
    <button id="fav-btn" class="btn btn-outline-warning" title="Add to Favourites"><span>â­</span> Add to Favourites</button>
  </div>
    <p class="subtitle">Convert light theme colors to dark mode with automatic adjustments</p>

    <div class="convert-section">
      <div class="settings-section">
        <div class="setting-card">
          <div class="setting-label">Luminance Adjustment</div>
          <input type="range" class="setting-input" id="luminanceAdjust" min="0" max="100" value="70">
          <div class="contrast-info">Current: <span id="luminanceValue">70</span>%</div>
        </div>
        <div class="setting-card">
          <div class="setting-label">Saturation Shift</div>
          <input type="range" class="setting-input" id="saturationShift" min="-50" max="50" value="0">
          <div class="contrast-info">Current: <span id="saturationValue">0</span>%</div>
        </div>
        <div class="setting-card">
          <div class="setting-label">Hue Rotation</div>
          <input type="range" class="setting-input" id="hueRotation" min="-30" max="30" value="0">
          <div class="contrast-info">Current: <span id="hueValue">0</span>°</div>
        </div>
      </div>
      <button class="convert-btn" onclick="convertToDark()">⚡ Convert to Dark Mode</button>
    </div>

    <div class="main-grid">
      <div class="theme-card">
        <div class="theme-title">☀️ Light Theme</div>
        <div class="color-input-group" id="lightColors">
          <div class="color-row">
            <input type="text" class="color-name" placeholder="background" value="background">
            <input type="color" class="color-picker" value="#ffffff">
            <div class="color-preview" style="background: #ffffff; color: #000000;" onclick="copyColor(this)">#ffffff</div>
            <button class="delete-btn" onclick="deleteColor(this)">×</button>
          </div>
          <div class="color-row">
            <input type="text" class="color-name" placeholder="text" value="text">
            <input type="color" class="color-picker" value="#1e293b">
            <div class="color-preview" style="background: #1e293b; color: #ffffff;" onclick="copyColor(this)">#1e293b</div>
            <button class="delete-btn" onclick="deleteColor(this)">×</button>
          </div>
          <div class="color-row">
            <input type="text" class="color-name" placeholder="primary" value="primary">
            <input type="color" class="color-picker" value="#3b82f6">
            <div class="color-preview" style="background: #3b82f6; color: #ffffff;" onclick="copyColor(this)">#3b82f6</div>
            <button class="delete-btn" onclick="deleteColor(this)">×</button>
          </div>
        </div>
        <button class="add-btn" onclick="addLightColor()">+ Add Light Color</button>
      </div>

      <div class="theme-card dark">
        <div class="theme-title">🌙 Dark Theme</div>
        <div class="color-input-group" id="darkColors">
          <div class="color-row">
            <input type="text" class="color-name" placeholder="background" value="background" readonly>
            <input type="color" class="color-picker" value="#0f172a">
            <div class="color-preview" style="background: #0f172a; color: #ffffff;" onclick="copyColor(this)">#0f172a</div>
            <button class="add-btn-small" style="background: #3b82f6;" onclick="applyColor(this)">✓</button>
          </div>
          <div class="color-row">
            <input type="text" class="color-name" placeholder="text" value="text" readonly>
            <input type="color" class="color-picker" value="#e2e8f0">
            <div class="color-preview" style="background: #e2e8f0; color: #000000;" onclick="copyColor(this)">#e2e8f0</div>
            <button class="add-btn-small" style="background: #3b82f6;" onclick="applyColor(this)">✓</button>
          </div>
          <div class="color-row">
            <input type="text" class="color-name" placeholder="primary" value="primary" readonly>
            <input type="color" class="color-picker" value="#60a5fa">
            <div class="color-preview" style="background: #60a5fa; color: #000000;" onclick="copyColor(this)">#60a5fa</div>
            <button class="add-btn-small" style="background: #3b82f6;" onclick="applyColor(this)">✓</button>
          </div>
        </div>
      </div>
    </div>
  </div>

  
</div>





<?php include 'footer.php'; ?>



