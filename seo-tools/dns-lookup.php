<?php
$page_title = 'DNS Lookup Tool - Check Domain Records';
$page_description = 'Perform DNS lookup to view domain records including A, AAAA, MX, NS, TXT, and CNAME records.';
$breadcrumbs = [
    ['title' => 'Home', 'url' => 'index.php'],
    ['title' => 'Dns Lookup', 'url' => '']
];
$page_css = 'dns-lookup.css';
$page_js = 'dns-lookup.js';
include 'header.php';
?>
<div class="container">
    
  <div class="d-flex justify-content-end mb-3" style="gap:1rem;">
    <button id="share-btn" class="btn btn-outline-secondary" title="Share this tool"><span>ðŸ”—</span> Share</button>
    <button id="fav-btn" class="btn btn-outline-warning" title="Add to Favourites"><span>â­</span> Add to Favourites</button>
  </div>
    <p class="subtitle">Check domain DNS records and configurations</p>

    <div class="input-card">
      <div class="input-row">
        <input type="text" class="input-field" id="domainInput" value="example.com" placeholder="Enter domain name (e.g., example.com)">
        <button class="lookup-btn" id="lookupBtn" onclick="performLookup()">🔍 DNS Lookup</button>
      </div>
      <div style="margin-top: 15px; font-size: 12px; color: #64748b; text-align: center;">
        Powered by Google Public DNS API
      </div>
    </div>

    <div class="results-grid" id="resultsGrid"></div>
  </div>
<?php include 'footer.php'; ?>

