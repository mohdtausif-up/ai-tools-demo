<?php
$page_title = 'Schema Markup Validator - Test Structured Data';
$page_description = 'Validate JSON-LD schema markup and detect structured data on any webpage.';
$breadcrumbs = [
    ['title' => 'Home', 'url' => 'index.php'],
    ['title' => 'Schema Markup Validator', 'url' => '']
];
$page_css = 'schema-markup-validator.css';
$page_js = 'schema-markup-validator.js';
include 'header.php';
?>
<div class="container">
    
  <div class="d-flex justify-content-end mb-3" style="gap:1rem;">
    <button id="share-btn" class="btn btn-outline-secondary" title="Share this tool"><span>ðŸ”—</span> Share</button>
    <button id="fav-btn" class="btn btn-outline-warning" title="Add to Favourites"><span>â­</span> Add to Favourites</button>
  </div>
    <p class="subtitle">Detect and validate structured data on any webpage</p>

    <div class="input-card">
      <div class="input-row">
        <input type="text" class="input-field" id="urlInput" value="https://example.com" placeholder="Enter website URL">
        <button class="validate-btn" id="validateBtn" onclick="validateSchema()">🔍 Validate Schema</button>
      </div>
    </div>

    <div class="results-card" id="resultsCard" style="display: none;">
      <div class="summary-box">
        <div class="summary-value" id="schemaCount">0</div>
        <div class="summary-label">Schema Markup Found</div>
      </div>
      
      <div id="schemaList"></div>
    </div>
  </div>
<?php include 'footer.php'; ?>

