<?php
$page_title = 'JSON Formatter - Format, Validate & Minify JSON';
$page_description = 'Format, validate, and minify JSON data instantly.';
$breadcrumbs = [
    ['title' => 'Home', 'url' => 'index.php'],
    ['title' => 'Json Formatter', 'url' => '']
];
$page_css = 'json-formatter.css';
$page_js = 'json-formatter.js';
include 'header.php';
?>
<div class="container">
    
  <div class="d-flex justify-content-end mb-3" style="gap:1rem;">
    <button id="share-btn" class="btn btn-outline-secondary" title="Share this tool"><span>ðŸ”—</span> Share</button>
    <button id="fav-btn" class="btn btn-outline-warning" title="Add to Favourites"><span>â­</span> Add to Favourites</button>
  </div>
    <p class="subtitle">Format, validate, and minify JSON data</p>

    <div class="grid-container">
      <div class="card">
        <div class="card-title">📝 Input JSON</div>
        <textarea class="textarea-field" id="inputJson" placeholder='{"name": "value"}'></textarea>
        <div class="button-grid">
          <button class="action-btn" onclick="formatJson(2)">✨ Format (2)</button>
          <button class="action-btn" onclick="formatJson(4)">✨ Format (4)</button>
          <button class="action-btn" onclick="minifyJson()">📦 Minify</button>
          <button class="action-btn" onclick="validateJson()">✓ Validate</button>
          <button class="action-btn" onclick="sortKeys()">🔤 Sort Keys</button>
          <button class="action-btn" onclick="clearAll()">🗑️ Clear</button>
        </div>
        <div id="statusBadge"></div>
      </div>

      <div class="card">
        <div class="card-title">✅ Formatted JSON</div>
        <textarea class="textarea-field" id="outputJson" placeholder="Formatted JSON will appear here..." readonly></textarea>
        <button class="action-btn copy-btn" onclick="copyResult()">📋 Copy Result</button>
      </div>
    </div>
  </div>
<?php include 'footer.php'; ?>

