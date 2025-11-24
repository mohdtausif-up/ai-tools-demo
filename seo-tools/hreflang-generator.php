<?php
$page_title = 'Hreflang Generator - Multilingual SEO Tags';
$page_description = 'Generate hreflang tags for multilingual websites to help search engines show the right language version.';
$breadcrumbs = [
    ['title' => 'Home', 'url' => 'index.php'],
    ['title' => 'Hreflang Generator', 'url' => '']
];
$page_css = 'hreflang-generator.css';
$page_js = 'hreflang-generator.js';
include 'header.php';
?>
<div class="container">
    
  <div class="d-flex justify-content-end mb-3" style="gap:1rem;">
    <button id="share-btn" class="btn btn-outline-secondary" title="Share this tool"><span>ðŸ”—</span> Share</button>
    <button id="fav-btn" class="btn btn-outline-warning" title="Add to Favourites"><span>â­</span> Add to Favourites</button>
  </div>
    <p class="subtitle">Generate hreflang tags for multilingual websites</p>

    <div class="main-grid">
      <div class="card">
        <div class="section-title">Add Language Versions</div>
        
        <div class="input-group">
          <div class="input-label">Language Code (e.g., en, es, fr, de)</div>
          <input type="text" class="input-field" id="langInput" placeholder="en-US">
        </div>
        
        <div class="input-group">
          <div class="input-label">Page URL</div>
          <input type="text" class="input-field" id="urlInput" placeholder="https://example.com/page">
        </div>
        
        <button class="add-btn" onclick="addLanguageVersion()">➕ Add Language Version</button>
        
        <div class="url-list" id="urlList">
          <p style="color: #94a3b8; text-align: center; padding: 20px; font-size: 13px;">
            No language versions added yet
          </p>
        </div>
        
        <button class="generate-btn" onclick="generateHreflang()">✨ Generate Hreflang Tags</button>
      </div>

      <div class="card">
        <div class="section-title">Generated Hreflang Tags</div>
        <div class="code-output" id="codeOutput">Add language versions to generate hreflang tags...</div>
        <button class="copy-btn" id="copyBtn" onclick="copyCode()" style="display: none;">📋 Copy All Tags</button>
      </div>
    </div>
  </div>
<?php include 'footer.php'; ?>

