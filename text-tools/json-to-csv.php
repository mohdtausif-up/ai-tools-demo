<?php
$page_title = 'JSON to CSV Converter';
$page_description = 'Convert JSON data to CSV format.';
$breadcrumbs = [
    ['title' => 'Home', 'url' => 'index.php'],
    ['title' => 'Json To Csv', 'url' => '']
];
$page_css = 'json-to-csv.css';
$page_js = 'json-to-csv.js';
include 'header.php';
?>
<div class="container">
    
  <div class="d-flex justify-content-end mb-3" style="gap:1rem;">
    <button id="share-btn" class="btn btn-outline-secondary" title="Share this tool"><span>ðŸ”—</span> Share</button>
    <button id="fav-btn" class="btn btn-outline-warning" title="Add to Favourites"><span>â­</span> Add to Favourites</button>
  </div>
    <p class="subtitle">Convert JSON data to CSV format</p>

    <div class="grid-container">
      <div class="card">
        <div class="card-title">📝 JSON Input</div>
        <textarea class="textarea-field" id="jsonInput" placeholder='[
  {"name": "John", "age": 30, "city": "New York"},
  {"name": "Jane", "age": 25, "city": "London"}
]'></textarea>
        <label class="checkbox-label">
          <input type="checkbox" id="includeHeaders" checked>
          Include Headers
        </label>
      </div>

      <div class="card">
        <div class="card-title">✅ CSV Output</div>
        <textarea class="textarea-field" id="csvOutput" placeholder="CSV will appear here..." readonly></textarea>
        <div class="button-grid">
          <button class="action-btn" onclick="convertToCSV()">🔄 Convert</button>
          <button class="action-btn" onclick="downloadCSV()">💾 Download</button>
          <button class="action-btn copy-btn" onclick="copyCSV()">📋 Copy CSV</button>
        </div>
      </div>
    </div>
  </div>
<?php include 'footer.php'; ?>

