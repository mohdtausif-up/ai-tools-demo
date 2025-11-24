<?php
$page_title = 'Email Validator - Validate Email Addresses';
$page_description = 'Validate email addresses using RFC 5322 standard.';
$breadcrumbs = [
    ['title' => 'Home', 'url' => 'index.php'],
    ['title' => 'Email Validator', 'url' => '']
];
$page_css = 'email-validator.css';
$page_js = 'email-validator.js';
include 'header.php';
?>
<div class="container">
    
  <div class="d-flex justify-content-end mb-3" style="gap:1rem;">
    <button id="share-btn" class="btn btn-outline-secondary" title="Share this tool"><span>ðŸ”—</span> Share</button>
    <button id="fav-btn" class="btn btn-outline-warning" title="Add to Favourites"><span>â­</span> Add to Favourites</button>
  </div>
    <p class="subtitle">Validate email addresses using RFC 5322 standard</p>

    <div class="card">
      <div class="card-title">📝 Single Email Validation</div>
      <input type="email" class="input-field" id="singleEmail" placeholder="Enter email address...">
      <button class="action-btn" onclick="validateSingle()">✓ Validate Email</button>
      <div id="singleResult"></div>
    </div>

    <div class="card">
      <div class="card-title">📋 Bulk Email Validation</div>
      <textarea class="textarea-field" id="bulkEmails" placeholder="Enter multiple email addresses (one per line)..."></textarea>
      <button class="action-btn" onclick="validateBulk()">✓ Validate All</button>
      
      <div class="stats-box" id="statsBox" style="display: none;">
        <div class="stat-row">
          <span class="stat-label">Total Emails:</span>
          <span class="stat-value" id="totalCount">0</span>
        </div>
        <div class="stat-row">
          <span class="stat-label">Valid:</span>
          <span class="stat-value" id="validCount" style="color: #10b981;">0</span>
        </div>
        <div class="stat-row">
          <span class="stat-label">Invalid:</span>
          <span class="stat-value" id="invalidCount" style="color: #ef4444;">0</span>
        </div>
      </div>
      
      <div class="email-list" id="emailList"></div>
    </div>
  </div>
<?php include 'footer.php'; ?>

