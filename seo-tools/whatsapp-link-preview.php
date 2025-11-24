<?php
$page_title = 'WhatsApp Link Preview - Test OG Tags for WhatsApp';
$page_description = 'Validate Open Graph meta tags and preview how your links will appear on WhatsApp.';
$breadcrumbs = [
    ['title' => 'Home', 'url' => 'index.php'],
    ['title' => 'Whatsapp Link Preview', 'url' => '']
];
$page_css = 'whatsapp-link-preview.css';
$page_js = 'whatsapp-link-preview.js';
include 'header.php';
?>
<div class="container">
    
  <div class="d-flex justify-content-end mb-3" style="gap:1rem;">
    <button id="share-btn" class="btn btn-outline-secondary" title="Share this tool"><span>ðŸ”—</span> Share</button>
    <button id="fav-btn" class="btn btn-outline-warning" title="Add to Favourites"><span>â­</span> Add to Favourites</button>
  </div>
    <p class="subtitle">Test how your links will appear when shared on WhatsApp</p>

    <div class="input-card">
      <div class="input-row">
        <input type="text" class="input-field" id="urlInput" value="https://example.com" placeholder="Enter website URL">
        <button class="validate-btn" id="validateBtn" onclick="validateWhatsApp()">🔍 Preview</button>
      </div>
    </div>

    <div class="results-grid" id="resultsGrid" style="display: none;">
      <div class="card">
        <div class="section-title">WhatsApp Preview</div>
        <div class="whatsapp-preview">
          <div class="whatsapp-bubble">
            <img id="whatsappImage" class="whatsapp-image" src="" alt="Preview" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
            <div class="whatsapp-image" id="imagePlaceholder" style="display:none;">No Image</div>
            <div class="whatsapp-content">
              <div class="whatsapp-url" id="whatsappUrl">example.com</div>
              <div class="whatsapp-title" id="whatsappTitle">Link Title</div>
              <div class="whatsapp-desc" id="whatsappDesc">Link description will appear here...</div>
            </div>
          </div>
        </div>
      </div>

      <div class="card">
        <div class="section-title">Open Graph Meta Tags</div>
        <div id="metaTags"></div>
      </div>
    </div>
  </div>
<?php include 'footer.php'; ?>

