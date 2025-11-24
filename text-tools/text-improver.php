<?php
$page_title = 'Text Improver - Enhance Your Writing';
$page_description = 'Get suggestions to improve your text quality.';
$breadcrumbs = [
    ['title' => 'Home', 'url' => 'index.php'],
    ['title' => 'Text Improver', 'url' => '']
];
$page_css = 'text-improver.css';
$page_js = 'text-improver.js';
include 'header.php';
?>
<div class="container">
    
  <div class="d-flex justify-content-end mb-3" style="gap:1rem;">
    <button id="share-btn" class="btn btn-outline-secondary" title="Share this tool"><span>ðŸ”—</span> Share</button>
    <button id="fav-btn" class="btn btn-outline-warning" title="Add to Favourites"><span>â­</span> Add to Favourites</button>
  </div>
    <p class="subtitle">Get suggestions to enhance your writing quality</p>

    <div class="card">
      <textarea class="textarea-field" id="textInput" placeholder="Paste your text here to get improvement suggestions..."></textarea>
      <button class="action-btn" onclick="improveText()">🔍 Analyze & Improve</button>
    </div>

    <div class="card" id="resultsCard" style="display: none;">
      <h3 style="font-size: 18px; color: #1e293b; margin-bottom: 15px;">Improvement Suggestions</h3>
      <div id="suggestionsContainer"></div>
    </div>
  </div>
<?php include 'footer.php'; ?>

