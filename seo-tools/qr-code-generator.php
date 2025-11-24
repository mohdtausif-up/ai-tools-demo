<?php
$page_title = 'QR Code Generator - Create QR Codes for URLs';
$page_description = 'Generate QR codes for any URL or text for free.';
$breadcrumbs = [
    ['title' => 'Home', 'url' => 'index.php'],
    ['title' => 'Qr Code Generator', 'url' => '']
];
$page_css = 'qr-code-generator.css';
$page_js = 'qr-code-generator.js';
include 'header.php';
?>
<div class="container">
    
  <div class="d-flex justify-content-end mb-3" style="gap:1rem;">
    <button id="share-btn" class="btn btn-outline-secondary" title="Share this tool"><span>ðŸ”—</span> Share</button>
    <button id="fav-btn" class="btn btn-outline-warning" title="Add to Favourites"><span>â­</span> Add to Favourites</button>
  </div>
    <p class="subtitle">Create QR codes for URLs and text</p>

    <div class="card">
      <input type="text" class="input-field" id="urlInput" value="https://example.com" placeholder="Enter URL or text">
      
      <select class="size-select" id="sizeSelect">
        <option value="150">Small (150x150)</option>
        <option value="250" selected>Medium (250x250)</option>
        <option value="350">Large (350x350)</option>
        <option value="500">Extra Large (500x500)</option>
      </select>
      
      <button class="generate-btn" onclick="generateQR()">🎨 Generate QR Code</button>
    </div>

    <div class="card">
      <div class="qr-preview" id="qrPreview">
        <p style="color: #94a3b8;">QR code will appear here</p>
      </div>
      <button class="download-btn" id="downloadBtn" onclick="downloadQR()" style="display: none;">⬇️ Download QR Code</button>
    </div>
  </div>
<?php include 'footer.php'; ?>

