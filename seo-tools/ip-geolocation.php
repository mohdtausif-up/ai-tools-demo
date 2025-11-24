<?php
$page_title = 'IP Geolocation Lookup - Find Server Location';
$page_description = 'Find the geographic location of any website's server using IP geolocation.';
$breadcrumbs = [
    ['title' => 'Home', 'url' => 'index.php'],
    ['title' => 'Ip Geolocation', 'url' => '']
];
$page_css = 'ip-geolocation.css';
$page_js = 'ip-geolocation.js';
include 'header.php';
?>
<div class="container">
    
  <div class="d-flex justify-content-end mb-3" style="gap:1rem;">
    <button id="share-btn" class="btn btn-outline-secondary" title="Share this tool"><span>ðŸ”—</span> Share</button>
    <button id="fav-btn" class="btn btn-outline-warning" title="Add to Favourites"><span>â­</span> Add to Favourites</button>
  </div>
    <p class="subtitle">Find the geographic location of any website's server</p>

    <div class="input-card">
      <div class="input-row">
        <input type="text" class="input-field" id="domainInput" value="example.com" placeholder="Enter domain or IP address">
        <button class="lookup-btn" id="lookupBtn" onclick="lookupLocation()">🔍 Lookup</button>
      </div>
    </div>

    <div class="results-card" id="resultsCard" style="display: none;">
      <div class="map-placeholder">
        <div class="map-text">
          <div class="map-icon">📍</div>
          <div id="coordinates">Location Coordinates</div>
        </div>
      </div>
      
      <div class="info-grid" id="infoGrid"></div>
    </div>
  </div>
<?php include 'footer.php'; ?>

