<?php
$page_title = 'XML Formatter - Format and Validate XML';
$page_description = 'Format, beautify, and validate XML documents.';
$breadcrumbs = [
    ['title' => 'Home', 'url' => 'index.php'],
    ['title' => 'Xml Formatter', 'url' => '']
];
$page_css = 'xml-formatter.css';
$page_js = 'xml-formatter.js';
include 'header.php';
?>
<div class="container">
    
  <div class="d-flex justify-content-end mb-3" style="gap:1rem;">
    <button id="share-btn" class="btn btn-outline-secondary" title="Share this tool"><span>ðŸ”—</span> Share</button>
    <button id="fav-btn" class="btn btn-outline-warning" title="Add to Favourites"><span>â­</span> Add to Favourites</button>
  </div>
    <p class="subtitle">Format, beautify, and validate XML documents</p>

    <div class="grid-container">
      <div class="card">
        <div class="card-title">📝 XML Input</div>
        <textarea class="textarea-field" id="xmlInput" placeholder='<root><item>value</item></root>'></textarea>
      </div>

      <div class="card">
        <div class="card-title">✅ Formatted XML</div>
        <div id="statusBadge"></div>
        <textarea class="textarea-field" id="xmlOutput" placeholder="Formatted XML will appear here..." readonly></textarea>
        <div class="button-grid">
          <button class="action-btn" onclick="formatXML()">🔄 Format</button>
          <button class="action-btn" onclick="minifyXML()">📦 Minify</button>
          <button class="action-btn" onclick="validateXML()">✓ Validate</button>
          <button class="action-btn copy-btn" onclick="copyXML()">📋 Copy</button>
        </div>
      </div>
    </div>
  </div>
<?php include 'footer.php'; ?>

