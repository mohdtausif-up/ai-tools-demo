<?php
$page_title = 'Broken Link Checker - Find Dead Links';
$page_description = 'Check for broken links on any webpage and get detailed status reports.';
$breadcrumbs = [
    ['title' => 'Home', 'url' => 'index.php'],
    ['title' => 'Broken Link Checker', 'url' => '']
];
$page_css = 'broken-link-checker.css';
$page_js = 'broken-link-checker.js';
include 'header.php';
?>
<div class="container">
    
  <div class="d-flex justify-content-end mb-3" style="gap:1rem;">
    <button id="share-btn" class="btn btn-outline-secondary" title="Share this tool"><span>ðŸ”—</span> Share</button>
    <button id="fav-btn" class="btn btn-outline-warning" title="Add to Favourites"><span>â­</span> Add to Favourites</button>
  </div>
    <p class="subtitle">Find broken links and dead URLs on any webpage</p>

    <div class="input-card">
      <div class="input-row">
        <input type="text" class="input-field" id="urlInput" value="https://example.com" placeholder="Enter webpage URL">
        <button class="check-btn" id="checkBtn" onclick="checkLinks()">🔍 Check Links</button>
      </div>
    </div>

    <div class="stats-grid" id="statsGrid" style="display: none;">
      <div class="stat-card">
        <div class="stat-number" id="totalLinks">0</div>
        <div class="stat-label">Total Links</div>
      </div>
      <div class="stat-card working">
        <div class="stat-number" id="workingLinks">0</div>
        <div class="stat-label">Working</div>
      </div>
      <div class="stat-card broken">
        <div class="stat-number" id="brokenLinks">0</div>
        <div class="stat-label">Broken</div>
      </div>
      <div class="stat-card warning">
        <div class="stat-number" id="redirectLinks">0</div>
        <div class="stat-label">Redirects</div>
      </div>
    </div>

    <div class="results-card" id="resultsCard" style="display: none;">
      <h2 style="margin-bottom: 20px; color: #1e293b;">Link Results</h2>
      <div id="linksList"></div>
    </div>
  </div>
<?php include 'footer.php'; ?>

