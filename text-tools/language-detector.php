<?php
$page_title = 'Language Detector - Detect Text Language';
$page_description = 'Detect the language of text based on character patterns.';
$breadcrumbs = [
    ['title' => 'Home', 'url' => 'index.php'],
    ['title' => 'Language Detector', 'url' => '']
];
$page_css = 'language-detector.css';
$page_js = 'language-detector.js';
include 'header.php';
?>
<div class="container">
    
  <div class="d-flex justify-content-end mb-3" style="gap:1rem;">
    <button id="share-btn" class="btn btn-outline-secondary" title="Share this tool"><span>ðŸ”—</span> Share</button>
    <button id="fav-btn" class="btn btn-outline-warning" title="Add to Favourites"><span>â­</span> Add to Favourites</button>
  </div>
    <p class="subtitle">Detect the language of your text</p>

    <div class="card">
      <div class="card-title">📝 Input Text</div>
      <textarea class="textarea-field" id="inputText" placeholder="Enter text to detect language..."></textarea>
      <button class="action-btn" onclick="detectLanguage()">🔍 Detect Language</button>
    </div>

    <div class="card" id="resultsCard" style="display: none;">
      <div class="card-title">🌐 Detected Language</div>
      <div class="result-box">
        <div class="language-flag" id="languageFlag">🌍</div>
        <div class="language-name" id="languageName">Unknown</div>
        <div class="confidence" id="confidence">Confidence: 0%</div>
      </div>
    </div>
  </div>
<?php include 'footer.php'; ?>

