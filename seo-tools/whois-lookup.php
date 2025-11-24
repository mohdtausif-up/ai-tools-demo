<?php
$page_title = 'WHOIS Lookup - Domain Registration Info';
$page_description = 'Lookup domain registration information, owner details, and expiration dates.';
$breadcrumbs = [
    ['title' => 'Home', 'url' => 'index.php'],
    ['title' => 'Whois Lookup', 'url' => '']
];
$page_css = 'whois-lookup.css';
$page_js = 'whois-lookup.js';
include 'header.php';
?>
<div class="container">
    
  <div class="d-flex justify-content-end mb-3" style="gap:1rem;">
    <button id="share-btn" class="btn btn-outline-secondary" title="Share this tool"><span>ðŸ”—</span> Share</button>
    <button id="fav-btn" class="btn btn-outline-warning" title="Add to Favourites"><span>â­</span> Add to Favourites</button>
  </div>
    <p class="subtitle">Get domain registration and ownership information</p>

    <div class="input-card">
      <div class="input-row">
        <input type="text" class="input-field" id="domainInput" value="example.com" placeholder="Enter domain name">
        <button class="lookup-btn" id="lookupBtn" onclick="lookupWhois()">🔍 Lookup</button>
      </div>
    </div>

    <div class="results-card" id="resultsCard" style="display: none;">
      <div class="section-title">Domain Information</div>
      <div id="infoGrid"></div>
      
      <div class="section-title" style="margin-top: 30px;">Raw WHOIS Data</div>
      <div class="whois-raw" id="whoisRaw"></div>
    </div>
      <section class="how-to-use" style="margin-top:2rem;padding:1.5rem;background:#f9fafb;border-radius:8px;box-shadow:0 1px 4px rgba(0,0,0,0.04);">
        <h2 style="font-size:1.2rem;color:#2563eb;margin-bottom:0.7rem;">How to Use</h2>
        <ol style="margin-left:1.2rem;">
          <li>Enter the domain name you want to look up in the input field.</li>
          <li>Click the <b>Lookup</b> button.</li>
          <li>Review the domain registration, ownership, and expiration details.</li>
          <li>Check the raw WHOIS data for additional information.</li>
        </ol>
      </section>
  </div>
<?php include 'footer.php'; ?>

