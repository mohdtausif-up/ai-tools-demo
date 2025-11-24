<?php 
$page_title = 'Duotone Generator - Create Instagram-Style Duotone Effects';
$page_description = 'Apply duotone color effects to images. Create Instagram-style color overlays with custom colors.';
$breadcrumbs = [
  ['title' => 'Duotone Generator', 'url' => '']
];
include 'header.php'; 
?>

<div class="main-content">
<div class="container">
    
  <div class="d-flex justify-content-end mb-3" style="gap:1rem;">
    <button id="share-btn" class="btn btn-outline-secondary" title="Share this tool"><span>ðŸ”—</span> Share</button>
    <button id="fav-btn" class="btn btn-outline-warning" title="Add to Favourites"><span>â­</span> Add to Favourites</button>
  </div>
    <div class="subtitle">Create Instagram-style duotone effects on your images</div>
    
    <div class="upload-section">
      <div class="upload-area" onclick="document.getElementById('fileInput').click()">
        <div class="upload-icon">📸</div>
        <h3 style="color: #2d3748; margin-bottom: 10px;">Upload Your Image</h3>
        <p style="color: #718096;">Click or drag an image here</p>
      </div>
      <input type="file" id="fileInput" accept="image/*">
    </div>
    
    <div class="controls-section" id="controlsSection">
      <h3 style="margin-bottom: 20px; color: #2d3748;">Choose Duotone Colors</h3>
      <div class="controls-grid">
        <div class="control-group">
          <label class="control-label">Shadow Color (Darks)</label>
          <input type="color" id="shadowColor" value="#1a1a2e">
        </div>
        <div class="control-group">
          <label class="control-label">Highlight Color (Lights)</label>
          <input type="color" id="highlightColor" value="#00d4ff">
        </div>
      </div>
      
      <h4 style="margin: 20px 0 10px 0; color: #4a5568;">Or Choose a Preset:</h4>
      <div class="presets">
        <button class="preset-btn" onclick="applyPreset('#1a1a2e', '#00d4ff')">
          <div class="preset-colors">
            <div class="preset-color" style="background: #1a1a2e"></div>
            <div class="preset-color" style="background: #00d4ff"></div>
          </div>
          <span>Blue Night</span>
        </button>
        <button class="preset-btn" onclick="applyPreset('#4a148c', '#ff4081')">
          <div class="preset-colors">
            <div class="preset-color" style="background: #4a148c"></div>
            <div class="preset-color" style="background: #ff4081"></div>
          </div>
          <span>Purple Pink</span>
        </button>
        <button class="preset-btn" onclick="applyPreset('#004d40', '#ffd600')">
          <div class="preset-colors">
            <div class="preset-color" style="background: #004d40"></div>
            <div class="preset-color" style="background: #ffd600"></div>
          </div>
          <span>Teal Gold</span>
        </button>
        <button class="preset-btn" onclick="applyPreset('#b71c1c', '#ff9800')">
          <div class="preset-colors">
            <div class="preset-color" style="background: #b71c1c"></div>
            <div class="preset-color" style="background: #ff9800"></div>
          </div>
          <span>Fire</span>
        </button>
        <button class="preset-btn" onclick="applyPreset('#0d47a1', '#00e676')">
          <div class="preset-colors">
            <div class="preset-color" style="background: #0d47a1"></div>
            <div class="preset-color" style="background: #00e676"></div>
          </div>
          <span>Ocean</span>
        </button>
        <button class="preset-btn" onclick="applyPreset('#880e4f', '#fce4ec')">
          <div class="preset-colors">
            <div class="preset-color" style="background: #880e4f"></div>
            <div class="preset-color" style="background: #fce4ec"></div>
          </div>
          <span>Rose</span>
        </button>
      </div>
    </div>
    
    <div class="preview-section" id="previewSection">
      <div class="preview-container">
        <div class="preview-box">
          <div class="preview-title">Original</div>
          <canvas id="originalCanvas"></canvas>
        </div>
        <div class="preview-box">
          <div class="preview-title">Duotone Effect</div>
          <canvas id="duotoneCanvas"></canvas>
        </div>
      </div>
      <button class="btn" onclick="downloadDuotone()">⬇️ Download Duotone Image</button>
    </div>
  </div>
  
  
</div>





<?php include 'footer.php'; ?>



