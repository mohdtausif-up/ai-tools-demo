<?php
$page_title = 'SSL Certificate Checker - Verify HTTPS Certificate';
$page_description = 'Check SSL certificate validity, expiration date, and security status of any website.';
$breadcrumbs = [
    ['title' => 'Home', 'url' => 'index.php'],
    ['title' => 'Ssl Checker', 'url' => '']
];
$page_css = 'ssl-checker.css';
$page_js = 'ssl-checker.js';
include 'header.php';
?>
<div class="container">
    
  <div class="d-flex justify-content-end mb-3" style="gap:1rem;">
    <button id="share-btn" class="btn btn-outline-secondary" title="Share this tool"><span>ðŸ”—</span> Share</button>
    <button id="fav-btn" class="btn btn-outline-warning" title="Add to Favourites"><span>â­</span> Add to Favourites</button>
  </div>
    <p class="subtitle">Verify SSL certificate validity and security status</p>

    <div class="input-card">
      <div class="input-row">
        <input type="text" class="input-field" id="urlInput" value="https://example.com" placeholder="Enter website URL or domain (e.g., example.com)">
        <button class="check-btn" id="checkBtn" onclick="checkSSL()">🔍 Check SSL</button>
      </div>
      <div style="margin-top: 15px; font-size: 12px; color: #64748b; text-align: center;">
        Powered by SSL Labs API & crt.sh Certificate Transparency
      </div>
    </div>

    <div class="result-card" id="resultCard" style="display: none;">
      <div class="ssl-status valid" id="sslStatus">
        <div class="ssl-icon">🔒</div>
        <div>
          <div>SSL Certificate Valid</div>
          <div style="font-size: 14px; font-weight: 400; margin-top: 5px;">Secure Connection Established</div>
        </div>
      </div>

      <div class="cert-details" id="certDetails"></div>
    </div>
  </div>
<?php include 'footer.php'; ?>

