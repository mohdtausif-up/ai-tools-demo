<?php
$page_title = 'Website Uptime Checker - Monitor Website Availability';
$page_description = 'Check if a website is online and monitor response time and status.';
$breadcrumbs = [
    ['title' => 'Home', 'url' => 'index.php'],
    ['title' => 'Uptime Checker', 'url' => '']
];
$page_css = 'uptime-checker.css';
$page_js = 'uptime-checker.js';
include 'header.php';
?>
<div class="container">
    
  <div class="d-flex justify-content-end mb-3" style="gap:1rem;">
    <button id="share-btn" class="btn btn-outline-secondary" title="Share this tool"><span>ðŸ”—</span> Share</button>
    <button id="fav-btn" class="btn btn-outline-warning" title="Add to Favourites"><span>â­</span> Add to Favourites</button>
  </div>
    <p class="subtitle">Check if a website is online and monitor its response time</p>

    <div class="input-card">
      <div class="input-row">
        <input type="text" class="input-field" id="urlInput" value="https://example.com" placeholder="Enter website URL">
        <button class="check-btn" id="checkBtn" onclick="checkUptime()">🔍 Check Status</button>
      </div>
    </div>

    <div class="status-card">
      <div class="status-indicator checking" id="statusIndicator">
        <span class="status-pulse checking"></span>
        <span>Ready to check</span>
      </div>

      <div class="info-grid" id="infoGrid" style="display: none;">
        <div class="info-item">
          <div class="info-label">Response Time</div>
          <div class="info-value" id="responseTime">-</div>
        </div>
        <div class="info-item">
          <div class="info-label">Status Code</div>
          <div class="info-value" id="statusCode">-</div>
        </div>
        <div class="info-item">
          <div class="info-label">Server</div>
          <div class="info-value" id="serverInfo">-</div>
        </div>
        <div class="info-item">
          <div class="info-label">Last Checked</div>
          <div class="info-value" id="lastChecked">-</div>
        </div>
      </div>

      <div class="history-section" id="historySection" style="display: none;">
        <div class="history-title">Check History</div>
        <div id="historyList"></div>
      </div>
    </div>
  </div>
<?php include 'footer.php'; ?>

