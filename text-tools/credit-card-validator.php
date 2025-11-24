<?php
$page_title = 'Credit Card Validator - Luhn Algorithm';
$page_description = 'Validate credit card numbers using Luhn algorithm.';
$breadcrumbs = [
    ['title' => 'Home', 'url' => 'index.php'],
    ['title' => 'Credit Card Validator', 'url' => '']
];
$page_css = 'credit-card-validator.css';
$page_js = 'credit-card-validator.js';
include 'header.php';
?>
<div class="container">
    
  <div class="d-flex justify-content-end mb-3" style="gap:1rem;">
    <button id="share-btn" class="btn btn-outline-secondary" title="Share this tool"><span>ðŸ”—</span> Share</button>
    <button id="fav-btn" class="btn btn-outline-warning" title="Add to Favourites"><span>â­</span> Add to Favourites</button>
  </div>
    <p class="subtitle">Validate credit card numbers using Luhn algorithm</p>

    <div class="card">
      <div class="card-title">📝 Enter Card Number</div>
      <input type="text" class="input-field" id="cardInput" placeholder="4532 1234 5678 9010" maxlength="19">
      <button class="action-btn" onclick="validateCard()">✓ Validate Card</button>
    </div>

    <div class="card" id="resultsCard" style="display: none;">
      <div class="result-box">
        <div class="result-icon" id="resultIcon">✓</div>
        <div class="result-status" id="resultStatus">Valid Card</div>
      </div>
      
      <div class="card-info">
        <div class="info-box">
          <div class="info-label">Card Type</div>
          <div class="info-value" id="cardType">-</div>
        </div>
        <div class="info-box">
          <div class="info-label">Card Length</div>
          <div class="info-value" id="cardLength">-</div>
        </div>
      </div>
    </div>
  </div>
<?php include 'footer.php'; ?>

