<?php
$page_title = 'Invoice Number Generator';
$page_description = 'Generate sequential invoice numbers with custom formats.';
$breadcrumbs = [
    ['title' => 'Home', 'url' => 'index.php'],
    ['title' => 'Invoice Generator', 'url' => '']
];
$page_css = 'invoice-generator.css';
$page_js = 'invoice-generator.js';
include 'header.php';
?>
<div class="container">
    
  <div class="d-flex justify-content-end mb-3" style="gap:1rem;">
    <button id="share-btn" class="btn btn-outline-secondary" title="Share this tool"><span>ðŸ”—</span> Share</button>
    <button id="fav-btn" class="btn btn-outline-warning" title="Add to Favourites"><span>â­</span> Add to Favourites</button>
  </div>
    <p class="subtitle">Generate sequential invoice numbers</p>

    <div class="card">
      <div class="input-group">
        <label class="input-label">Prefix:</label>
        <input type="text" class="input-field" id="prefix" placeholder="INV" value="INV">
      </div>
      
      <div class="input-group">
        <label class="input-label">Starting Number:</label>
        <input type="number" class="input-field" id="startNumber" placeholder="1001" value="1001" min="1">
      </div>
      
      <div class="input-group">
        <label class="input-label">Count:</label>
        <input type="number" class="input-field" id="count" placeholder="10" value="10" min="1" max="100">
      </div>
      
      <div class="input-group">
        <label class="input-label">Format:</label>
        <select class="select-field" id="format">
          <option value="prefix-number">PREFIX-NUMBER (e.g., INV-1001)</option>
          <option value="prefix-year-number">PREFIX-YEAR-NUMBER (e.g., INV-2024-1001)</option>
          <option value="prefix-month-number">PREFIX-MONTH-NUMBER (e.g., INV-01-1001)</option>
          <option value="year-prefix-number">YEAR-PREFIX-NUMBER (e.g., 2024-INV-1001)</option>
        </select>
      </div>
      
      <button class="action-btn" onclick="generateInvoices()">📋 Generate Invoice Numbers</button>
    </div>

    <div class="card" id="resultsCard" style="display: none;">
      <div class="card-title">✅ Generated Invoice Numbers</div>
      <div class="invoice-list" id="invoiceList"></div>
    </div>
  </div>
<?php include 'footer.php'; ?>

