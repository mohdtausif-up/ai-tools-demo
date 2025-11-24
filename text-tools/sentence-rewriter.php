<?php
$page_title = 'Sentence Rewriter - Improve Your Sentences';
$page_description = 'Rewrite sentences with better vocabulary and structure.';
$breadcrumbs = [
    ['title' => 'Home', 'url' => 'index.php'],
    ['title' => 'Sentence Rewriter', 'url' => '']
];
$page_css = 'sentence-rewriter.css';
$page_js = 'sentence-rewriter.js';
include 'header.php';
?>
<div class="container">
    
  <div class="d-flex justify-content-end mb-3" style="gap:1rem;">
    <button id="share-btn" class="btn btn-outline-secondary" title="Share this tool"><span>ðŸ”—</span> Share</button>
    <button id="fav-btn" class="btn btn-outline-warning" title="Add to Favourites"><span>â­</span> Add to Favourites</button>
  </div>
    <p class="subtitle">Improve sentence structure and vocabulary</p>

    <div class="card">
      <div class="input-label">Enter Your Sentence</div>
      <textarea class="textarea-field" id="sentenceInput" placeholder="Type or paste your sentence here..."></textarea>
      <button class="action-btn" onclick="rewriteSentence()">🔄 Rewrite Sentence</button>
    </div>

    <div class="card" id="resultsCard" style="display: none;">
      <h3 style="font-size: 18px; color: #1e293b; margin-bottom: 15px;">Rewritten Variations</h3>
      <div class="variations-container" id="variationsContainer"></div>
    </div>
  </div>
<?php include 'footer.php'; ?>

