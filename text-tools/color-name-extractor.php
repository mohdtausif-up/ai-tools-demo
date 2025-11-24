<?php
$page_title = 'Color Name Extractor';
$page_description = 'Extract color names and hex codes from text.';
$breadcrumbs = [
    ['title' => 'Home', 'url' => 'index.php'],
    ['title' => 'Color Name Extractor', 'url' => '']
];
$page_css = 'color-name-extractor.css';
$page_js = 'color-name-extractor.js';
include 'header.php';
?>
<div class="container">
    
  <div class="d-flex justify-content-end mb-3" style="gap:1rem;">
    <button id="share-btn" class="btn btn-outline-secondary" title="Share this tool"><span>ðŸ”—</span> Share</button>
    <button id="fav-btn" class="btn btn-outline-warning" title="Add to Favourites"><span>â­</span> Add to Favourites</button>
  </div>
    <p class="subtitle">Extract color names and hex codes from text</p>

    <div class="card">
      <div class="card-title">📝 Input Text</div>
      <textarea class="textarea-field" id="inputText" placeholder="Enter text containing colors like #FF5733, red, blue, rgb(255, 0, 0)..."></textarea>
      <button class="action-btn" onclick="extractColors()">🔍 Extract Colors</button>
    </div>

    <div class="card" id="resultsCard" style="display: none;">
      <div class="card-title">🎨 Extracted Colors (<span id="colorCount">0</span>)</div>
      <div class="color-grid" id="colorGrid"></div>
    </div>
  </div>
<?php include 'footer.php'; ?>

