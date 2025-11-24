<?php
$page_title = 'Responsive Design Tester - Preview on Multiple Devices';
$page_description = 'Test how your website looks on different devices including mobile phones, tablets, and desktops.';
$breadcrumbs = [
    ['title' => 'Home', 'url' => 'index.php'],
    ['title' => 'Responsive Design Tester', 'url' => '']
];
$page_css = 'responsive-design-tester.css';
$page_js = 'responsive-design-tester.js';
include 'header.php';
?>
<div class="container">
    
  <div class="d-flex justify-content-end mb-3" style="gap:1rem;">
    <button id="share-btn" class="btn btn-outline-secondary" title="Share this tool"><span>ðŸ”—</span> Share</button>
    <button id="fav-btn" class="btn btn-outline-warning" title="Add to Favourites"><span>â­</span> Add to Favourites</button>
  </div>
    <p class="subtitle">Preview your website on different devices and screen sizes</p>

    <div class="input-card">
      <div class="warning-note">
        ⚠️ <strong>Note:</strong> Some websites may block iframe embedding due to CORS policies. Try entering your own website URL or a CORS-friendly site.
      </div>
      <div class="input-row">
        <input type="text" class="input-field" id="urlInput" value="https://example.com" placeholder="Enter website URL (e.g., https://example.com)">
        <button class="load-btn" onclick="loadWebsite()">🔍 Load Website</button>
      </div>
    </div>

    <div class="input-card">
      <div class="device-selector">
        <button class="device-btn active" data-device="mobile" onclick="selectDevice('mobile')">
          <div class="device-icon">📱</div>
          <div class="device-name">Mobile</div>
          <div class="device-size">375 × 667</div>
        </button>
        <button class="device-btn" data-device="tablet" onclick="selectDevice('tablet')">
          <div class="device-icon">📱</div>
          <div class="device-name">Tablet</div>
          <div class="device-size">768 × 1024</div>
        </button>
        <button class="device-btn" data-device="laptop" onclick="selectDevice('laptop')">
          <div class="device-icon">💻</div>
          <div class="device-name">Laptop</div>
          <div class="device-size">1366 × 768</div>
        </button>
        <button class="device-btn" data-device="desktop" onclick="selectDevice('desktop')">
          <div class="device-icon">🖥️</div>
          <div class="device-name">Desktop</div>
          <div class="device-size">1920 × 1080</div>
        </button>
      </div>
    </div>

    <div class="preview-container">
      <div class="device-frame mobile" id="deviceFrame">
        <iframe id="previewFrame" src="https://example.com" sandbox="allow-same-origin allow-scripts allow-forms"></iframe>
      </div>
      <div class="orientation-toggle">
        <button class="orientation-btn active" onclick="setOrientation('portrait')">📱 Portrait</button>
        <button class="orientation-btn" onclick="setOrientation('landscape')">🔄 Landscape</button>
      </div>
        <section class="how-to-use" style="margin-top:2rem;padding:1.5rem;background:#f9fafb;border-radius:8px;box-shadow:0 1px 4px rgba(0,0,0,0.04);">
          <h2 style="font-size:1.2rem;color:#2563eb;margin-bottom:0.7rem;">How to Use</h2>
          <ol style="margin-left:1.2rem;">
            <li>Enter the website URL you want to preview in the input field.</li>
            <li>Click the <b>Load Website</b> button.</li>
            <li>Select a device type (Mobile, Tablet, Laptop, Desktop) to view your site at different screen sizes.</li>
            <li>Toggle between portrait and landscape orientation as needed.</li>
            <li>Use the preview to optimize your website's responsive design.</li>
          </ol>
        </section>
    </div>
  </div>
<?php include 'footer.php'; ?>

