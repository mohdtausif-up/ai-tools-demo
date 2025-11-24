<?php
$page_title = 'Readability Score Calculator - Content Analysis';
$page_description = 'Calculate Flesch Reading Ease, Flesch-Kincaid Grade Level, and other readability scores.';
$breadcrumbs = [
    ['title' => 'Home', 'url' => 'index.php'],
    ['title' => 'Readability Score', 'url' => '']
];
$page_css = 'readability-score.css';
$page_js = 'readability-score.js';
include 'header.php';
?>
<div class="container">
    
  <div class="d-flex justify-content-end mb-3" style="gap:1rem;">
    <button id="share-btn" class="btn btn-outline-secondary" title="Share this tool"><span>ðŸ”—</span> Share</button>
    <button id="fav-btn" class="btn btn-outline-warning" title="Add to Favourites"><span>â­</span> Add to Favourites</button>
  </div>
    <p class="subtitle">Analyze text readability with Flesch-Kincaid and other metrics</p>

    <div class="main-grid">
      <div class="card">
        <div class="section-title">Enter Your Text</div>
        <textarea class="textarea-field" id="textInput" placeholder="Paste your content here...">The quick brown fox jumps over the lazy dog. This sentence is used to demonstrate readability analysis. Readability scores help writers understand how easy their content is to read.</textarea>
        <button class="analyze-btn" onclick="analyzeReadability()">🔍 Analyze Readability</button>
      </div>

      <div class="card">
        <div class="section-title">Readability Scores</div>
        <div id="scoresContainer">
          <p style="color: #94a3b8; text-align: center; padding: 40px;">Enter text to see readability scores</p>
        </div>
      </div>
    </div>
  </div>
<?php include 'footer.php'; ?>

