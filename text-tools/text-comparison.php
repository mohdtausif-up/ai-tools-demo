<?php
$page_title = 'Text Comparison Tool - Compare Two Texts';
$page_description = 'Compare two texts and highlight differences.';
$breadcrumbs = [
    ['title' => 'Home', 'url' => 'index.php'],
    ['title' => 'Text Comparison', 'url' => '']
];
$page_css = 'text-comparison.css';
$page_js = 'text-comparison.js';
include 'header.php';
?>
<div class="container">
    
  <div class="d-flex justify-content-end mb-3" style="gap:1rem;">
    <button id="share-btn" class="btn btn-outline-secondary" title="Share this tool"><span>ðŸ”—</span> Share</button>
    <button id="fav-btn" class="btn btn-outline-warning" title="Add to Favourites"><span>â­</span> Add to Favourites</button>
  </div>
    <p class="subtitle">Compare two texts and see the differences</p>

    <div class="grid-container">
      <div class="card">
        <div class="card-title">📝 Original Text</div>
        <textarea class="textarea-field" id="text1" placeholder="Enter original text..."></textarea>
      </div>

      <div class="card">
        <div class="card-title">📝 Modified Text</div>
        <textarea class="textarea-field" id="text2" placeholder="Enter modified text..."></textarea>
      </div>
    </div>

    <div class="card">
      <button class="action-btn" onclick="compareTexts()">🔍 Compare Texts</button>
    </div>

    <div class="card" id="resultsCard" style="display: none;">
      <div class="card-title">📊 Comparison Results</div>
      <div class="stats-box">
        <div class="stat-item">
          <div class="stat-value" id="addedCount" style="color: #10b981;">0</div>
          <div>Added</div>
        </div>
        <div class="stat-item">
          <div class="stat-value" id="removedCount" style="color: #ef4444;">0</div>
          <div>Removed</div>
        </div>
        <div class="stat-item">
          <div class="stat-value" id="matchPercent">0%</div>
          <div>Match</div>
        </div>
      </div>
      <div class="card-title" style="margin-top: 20px;">🔍 Differences</div>
      <div class="diff-result" id="diffResult"></div>
    </div>
  </div>
<?php include 'footer.php'; ?>

