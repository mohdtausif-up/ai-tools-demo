<?php
$page_title = 'CSV to JSON Converter';
$page_description = 'Convert CSV data to JSON format.';
$breadcrumbs = [
    ['title' => 'Home', 'url' => 'index.php'],
    ['title' => 'Csv To Json', 'url' => '']
];
$page_css = 'csv-to-json.css';
$page_js = 'csv-to-json.js';
include 'header.php';
?>
<div class="container">
    
  <div class="d-flex justify-content-end mb-3" style="gap:1rem;">
    <button id="share-btn" class="btn btn-outline-secondary" title="Share this tool"><span>ðŸ”—</span> Share</button>
    <button id="fav-btn" class="btn btn-outline-warning" title="Add to Favourites"><span>â­</span> Add to Favourites</button>
  </div>
    <p class="subtitle">Convert CSV data to JSON format</p>

    <div class="grid-container">
      <div class="card">
        <div class="card-title">📝 CSV Input</div>
        <textarea class="textarea-field" id="csvInput" placeholder="name,age,city
John,30,New York
Jane,25,London"></textarea>
        <label class="checkbox-label">
          <input type="checkbox" id="prettyPrint" checked>
          Pretty Print JSON
        </label>
      </div>

      <div class="card">
        <div class="card-title">✅ JSON Output</div>
        <textarea class="textarea-field" id="jsonOutput" placeholder="JSON will appear here..." readonly></textarea>
        <div class="button-grid">
          <button class="action-btn" onclick="convertToJSON()">🔄 Convert</button>
          <button class="action-btn" onclick="downloadJSON()">💾 Download</button>
          <button class="action-btn copy-btn" onclick="copyJSON()">📋 Copy JSON</button>
        </div>
      </div>
    </div>
  </div>
<?php include 'footer.php'; ?>

