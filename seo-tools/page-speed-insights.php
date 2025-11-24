<?php
$page_title = 'Page Speed Insights - Performance Analyzer';
$page_description = 'Analyze website loading speed and performance metrics using Google PageSpeed Insights API.';
$breadcrumbs = [
    ['title' => 'Home', 'url' => 'index.php'],
    ['title' => 'Page Speed Insights', 'url' => '']
];
$page_css = 'page-speed-insights.css';
$page_js = 'page-speed-insights.js';
include 'header.php';
?>
<div class="container">
    
  <div class="d-flex justify-content-end mb-3" style="gap:1rem;">
    <button id="share-btn" class="btn btn-outline-secondary" title="Share this tool"><span>ðŸ”—</span> Share</button>
    <button id="fav-btn" class="btn btn-outline-warning" title="Add to Favourites"><span>â­</span> Add to Favourites</button>
  </div>
    <p class="subtitle">Analyze website loading performance</p>

    <div class="input-card">
      <div class="input-row">
        <input type="text" class="input-field" id="urlInput" value="https://example.com" placeholder="Enter website URL">
        <button class="check-btn" id="checkBtn" onclick="checkSpeed()">🔍 Analyze</button>
      </div>
      <div style="margin-top: 10px; font-size: 12px; color: #64748b;">
        Note: This uses simulated metrics. For real PageSpeed analysis, use Google's PageSpeed Insights with API key.
      </div>
    </div>

    <div class="results-card" id="resultsCard" style="display: none;">
      <h2 style="margin-bottom: 20px; color: #1e293b; text-align: center;">Performance Score</h2>
      
      <div class="score-circle" id="scoreCircle">
        <div class="score-inner" id="scoreValue">0</div>
      </div>

      <div class="metrics-grid" id="metricsGrid"></div>
    </div>
  </div>
<?php include 'footer.php'; ?>

