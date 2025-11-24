<?php
$page_title = 'Cookie Scanner - View Website Cookies';
$page_description = 'Scan and list all cookies used by any website for privacy and compliance checks.';
$breadcrumbs = [
    ['title' => 'Home', 'url' => 'index.php'],
    ['title' => 'Cookie Scanner', 'url' => '']
];
$page_css = 'cookie-scanner.css';
$page_js = 'cookie-scanner.js';
include 'header.php';
?>
<div class="container">
    
  <div class="d-flex justify-content-end mb-3" style="gap:1rem;">
    <button id="share-btn" class="btn btn-outline-secondary" title="Share this tool"><span>ðŸ”—</span> Share</button>
    <button id="fav-btn" class="btn btn-outline-warning" title="Add to Favourites"><span>â­</span> Add to Favourites</button>
  </div>
    <p class="subtitle">Scan and view all cookies used by this website</p>

    <div class="input-card">
      <div class="info-box">
        ℹ️ Due to browser security restrictions, this tool can only scan cookies from the current domain. To scan another website, visit that site and open this tool there, or use browser DevTools.
      </div>
      
      <div class="input-row">
        <input type="text" class="input-field" id="domainInput" value="" placeholder="Current domain (automatic)" disabled>
        <button class="scan-btn" id="scanBtn" onclick="scanCookies()">🔍 Scan Cookies</button>
      </div>
    </div>

    <div class="results-card" id="resultsCard" style="display: none;">
      <div class="stats-row">
        <div class="stat-box">
          <div class="stat-value" id="totalCookies">0</div>
          <div class="stat-label">Total Cookies</div>
        </div>
        <div class="stat-box">
          <div class="stat-value" id="secureCookies" style="color: #10b981;">0</div>
          <div class="stat-label">Secure</div>
        </div>
        <div class="stat-box">
          <div class="stat-value" id="thirdPartyCookies" style="color: #f59e0b;">0</div>
          <div class="stat-label">Session</div>
        </div>
      </div>

      <div id="cookieList"></div>
    </div>
  </div>
<?php include 'footer.php'; ?>

