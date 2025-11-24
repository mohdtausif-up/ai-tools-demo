<?php
$page_title = 'Text Reverser - Reverse Text, Words, or Sentences';
$page_description = 'Reverse text by characters, words, or sentences instantly.';
$breadcrumbs = [
    ['title' => 'Home', 'url' => 'index.php'],
    ['title' => 'Text Reverser', 'url' => '']
];
$page_css = 'text-reverser.css';
$page_js = 'text-reverser.js';
include 'header.php';
?>
<div class="container">
    
  <div class="d-flex justify-content-end mb-3" style="gap:1rem;">
    <button id="share-btn" class="btn btn-outline-secondary" title="Share this tool"><span>ðŸ”—</span> Share</button>
    <button id="fav-btn" class="btn btn-outline-warning" title="Add to Favourites"><span>â­</span> Add to Favourites</button>
  </div>
    <p class="subtitle">Reverse text by characters, words, or sentences</p>

    <div class="grid-container">
      <div class="card">
        <div class="card-title">📝 Original Text</div>
        <textarea class="textarea-field" id="originalText" placeholder="Enter text to reverse..."></textarea>
        <div class="button-grid">
          <button class="action-btn" onclick="reverseText('characters')">⬅️ Characters</button>
          <button class="action-btn" onclick="reverseText('words')">🔤 Words</button>
          <button class="action-btn" onclick="reverseText('sentences')">📄 Sentences</button>
          <button class="action-btn" onclick="reverseText('lines')">📋 Lines</button>
          <button class="action-btn" onclick="reverseText('flip')">🔄 Flip Text</button>
          <button class="action-btn" onclick="clearAll()">🗑️ Clear</button>
        </div>
      </div>

      <div class="card">
        <div class="card-title">✅ Reversed Text</div>
        <textarea class="textarea-field" id="reversedText" placeholder="Reversed text will appear here..." readonly></textarea>
        <button class="action-btn copy-btn" onclick="copyResult()">📋 Copy Result</button>
      </div>
    </div>
  </div>
<?php include 'footer.php'; ?>

