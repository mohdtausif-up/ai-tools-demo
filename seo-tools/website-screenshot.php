<?php
$page_title = 'Website Screenshot Tool - Capture Full-Page Screenshots';
$page_description = 'Capture full-page screenshots of any website for documentation, testing, or archival purposes.';
$breadcrumbs = [
    ['title' => 'Home', 'url' => 'index.php'],
    ['title' => 'Website Screenshot', 'url' => '']
];
$page_css = 'website-screenshot.css';
$page_js = 'website-screenshot.js';
include 'header.php';
?>
<div class="container">
    
  <div class="d-flex justify-content-end mb-3" style="gap:1rem;">
    <button id="share-btn" class="btn btn-outline-secondary" title="Share this tool"><span>ðŸ”—</span> Share</button>
    <button id="fav-btn" class="btn btn-outline-warning" title="Add to Favourites"><span>â­</span> Add to Favourites</button>
  </div>
    <p class="subtitle">Capture full-page screenshots of any website</p>

    <div class="input-card">
      <div class="input-group">
        <label class="input-label">Website URL</label>
        <input type="text" class="input-field" id="urlInput" value="https://example.com" placeholder="Enter website URL">
      </div>

      <div class="options-grid">
        <div class="input-group">
          <label class="input-label">Width (px)</label>
          <input type="number" class="input-field" id="widthInput" value="1920">
        </div>
        <div class="input-group">
          <label class="input-label">Height (px)</label>
          <input type="number" class="input-field" id="heightInput" value="1080">
        </div>
      </div>

      <button class="capture-btn" id="captureBtn" onclick="captureScreenshot()">📷 Capture Screenshot</button>
      
      <div style="margin-top: 15px; font-size: 12px; color: #64748b; text-align: center;">
        Powered by Screenshot.one Free API
      </div>
    </div>

    <div class="preview-card">
      <h2 style="margin-bottom: 20px; color: #1e293b;">Preview</h2>
      <div class="preview-area" id="previewArea">
        Screenshot will appear here
      </div>
      <button class="download-btn" id="downloadBtn" onclick="downloadScreenshot()" disabled>⬇️ Download Screenshot</button>
    </div>
  </div>
<?php include 'footer.php'; ?>

