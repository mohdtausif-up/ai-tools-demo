<?php
$page_title = 'Grammar Checker - Free Grammar & Spell Check Tool';
$page_description = 'Check grammar and spelling errors in your text with real-time analysis.';
$breadcrumbs = [
    ['title' => 'Home', 'url' => 'index.php'],
    ['title' => 'Grammar Checker', 'url' => '']
];
$page_css = 'grammar-checker.css';
$page_js = 'grammar-checker.js';
include 'header.php';
?>
<div class="container">
    
  <div class="d-flex justify-content-end mb-3" style="gap:1rem;">
    <button id="share-btn" class="btn btn-outline-secondary" title="Share this tool"><span>ðŸ”—</span> Share</button>
    <button id="fav-btn" class="btn btn-outline-warning" title="Add to Favourites"><span>â­</span> Add to Favourites</button>
  </div>
    <p class="subtitle">Check grammar, spelling, and punctuation errors in your text</p>

    <div class="card">
      <textarea class="textarea-field" id="textInput" placeholder="Paste or type your text here to check for grammar and spelling errors..."></textarea>
      
      <div class="stats-bar">
        <div class="stat-item">Words: <span class="stat-value" id="wordCount">0</span></div>
        <div class="stat-item">Characters: <span class="stat-value" id="charCount">0</span></div>
        <div class="stat-item">Sentences: <span class="stat-value" id="sentenceCount">0</span></div>
      </div>
      
      <button class="action-btn" onclick="checkGrammar()">🔍 Check Grammar</button>
    </div>

    <div class="card" id="resultsCard" style="display: none;">
      <h2 style="font-size: 20px; color: #1e293b; margin-bottom: 15px;">Results</h2>
      <div id="resultsContent"></div>
    </div>
  </div>
<?php include 'footer.php'; ?>

