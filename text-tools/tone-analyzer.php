<?php
$page_title = 'Tone Analyzer - Detect Writing Tone';
$page_description = 'Analyze the tone and sentiment of your text.';
$breadcrumbs = [
    ['title' => 'Home', 'url' => 'index.php'],
    ['title' => 'Tone Analyzer', 'url' => '']
];
$page_css = 'tone-analyzer.css';
$page_js = 'tone-analyzer.js';
include 'header.php';
?>
<div class="container">
    
  <div class="d-flex justify-content-end mb-3" style="gap:1rem;">
    <button id="share-btn" class="btn btn-outline-secondary" title="Share this tool"><span>ðŸ”—</span> Share</button>
    <button id="fav-btn" class="btn btn-outline-warning" title="Add to Favourites"><span>â­</span> Add to Favourites</button>
  </div>
    <p class="subtitle">Detect the tone and sentiment of your writing</p>

    <div class="card">
      <textarea class="textarea-field" id="textInput" placeholder="Enter text to analyze its tone..."></textarea>
      <button class="action-btn" onclick="analyzeTone()">🔍 Analyze Tone</button>
    </div>

    <div class="card" id="resultsCard" style="display: none;">
      <h3 style="font-size: 18px; color: #1e293b; margin-bottom: 15px;">Detected Tones</h3>
      <div class="tone-badges" id="toneBadges"></div>
      <div class="analysis-box" id="analysisDetails"></div>
    </div>
  </div>
<?php include 'footer.php'; ?>

