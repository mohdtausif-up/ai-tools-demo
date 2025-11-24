<?php
$page_title = 'Email Extractor - Find Email Addresses on Pages';
$page_description = 'Extract all email addresses from any webpage.';
$breadcrumbs = [
    ['title' => 'Home', 'url' => 'index.php'],
    ['title' => 'Email Extractor', 'url' => '']
];
$page_css = 'email-extractor.css';
$page_js = 'email-extractor.js';
include 'header.php';
?>
<div class="container">
    
  <div class="d-flex justify-content-end mb-3" style="gap:1rem;">
    <button id="share-btn" class="btn btn-outline-secondary" title="Share this tool"><span>ðŸ”—</span> Share</button>
    <button id="fav-btn" class="btn btn-outline-warning" title="Add to Favourites"><span>â­</span> Add to Favourites</button>
  </div>
    <p class="subtitle">Find all email addresses on any webpage</p>

    <div class="input-card">
      <div class="input-row">
        <input type="text" class="input-field" id="urlInput" value="https://example.com" placeholder="Enter website URL">
        <button class="extract-btn" id="extractBtn" onclick="extractEmails()">🔍 Extract Emails</button>
      </div>
    </div>

    <div class="results-card" id="resultsCard" style="display: none;">
      <div class="stats-box">
        <div class="stats-value" id="emailCount">0</div>
        <div class="stats-label">Email Addresses Found</div>
      </div>
      
      <div class="email-list" id="emailList"></div>
      
      <button class="export-btn" id="exportBtn" onclick="exportEmails()">📥 Export All Emails</button>
    </div>
  </div>
<?php include 'footer.php'; ?>

