<?php
$page_title = 'Phone Number Formatter';
$page_description = 'Format phone numbers to various international formats.';
$breadcrumbs = [
    ['title' => 'Home', 'url' => 'index.php'],
    ['title' => 'Phone Formatter', 'url' => '']
];
$page_css = 'phone-formatter.css';
$page_js = 'phone-formatter.js';
include 'header.php';
?>
<div class="container">
    
  <div class="d-flex justify-content-end mb-3" style="gap:1rem;">
    <button id="share-btn" class="btn btn-outline-secondary" title="Share this tool"><span>ðŸ”—</span> Share</button>
    <button id="fav-btn" class="btn btn-outline-warning" title="Add to Favourites"><span>â­</span> Add to Favourites</button>
  </div>
    <p class="subtitle">Format phone numbers to various styles</p>

    <div class="card">
      <div class="card-title">📝 Input Phone Number</div>
      <input type="text" class="input-field" id="phoneInput" placeholder="1234567890 or (123) 456-7890">
      
      <select class="format-select" id="countryCode">
        <option value="+1">United States (+1)</option>
        <option value="+44">United Kingdom (+44)</option>
        <option value="+91">India (+91)</option>
        <option value="+86">China (+86)</option>
        <option value="+81">Japan (+81)</option>
        <option value="+49">Germany (+49)</option>
        <option value="+33">France (+33)</option>
      </select>
      
      <button class="action-btn" onclick="formatPhone()">🔄 Format Phone Number</button>
    </div>

    <div class="card" id="resultsCard" style="display: none;">
      <div class="card-title">✅ Formatted Results</div>
      <div class="result-list" id="resultList"></div>
    </div>
  </div>
<?php include 'footer.php'; ?>

