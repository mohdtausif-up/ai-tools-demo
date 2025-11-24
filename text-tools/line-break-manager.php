<?php
$page_title = 'Line Break Manager - Add, Remove & Convert Line Breaks';
$page_description = 'Manage line breaks - add, remove, or convert between CRLF and LF.';
$breadcrumbs = [
    ['title' => 'Home', 'url' => 'index.php'],
    ['title' => 'Line Break Manager', 'url' => '']
];
$page_css = 'line-break-manager.css';
$page_js = 'line-break-manager.js';
include 'header.php';
?>
<div class="container">
    
  <div class="d-flex justify-content-end mb-3" style="gap:1rem;">
    <button id="share-btn" class="btn btn-outline-secondary" title="Share this tool"><span>ðŸ”—</span> Share</button>
    <button id="fav-btn" class="btn btn-outline-warning" title="Add to Favourites"><span>â­</span> Add to Favourites</button>
  </div>
    <p class="subtitle">Add, remove, and convert line breaks</p>

    <div class="grid-container">
      <div class="card">
        <div class="card-title">📝 Input Text</div>
        <textarea class="textarea-field" id="inputText" placeholder="Enter text..."></textarea>
        <div class="info-box">
          💡 CRLF = Windows style (\r\n), LF = Unix/Mac style (\n)
        </div>
      </div>

      <div class="card">
        <div class="card-title">✅ Modified Text</div>
        <textarea class="textarea-field" id="outputText" placeholder="Result will appear here..." readonly></textarea>
        <div class="button-grid">
          <button class="action-btn" onclick="removeAllBreaks()">❌ Remove All</button>
          <button class="action-btn" onclick="removeExtraBreaks()">🧹 Remove Extra</button>
          <button class="action-btn" onclick="addAfterSentences()">📝 After Sentences</button>
          <button class="action-btn" onclick="convertToCRLF()">🪟 To CRLF</button>
          <button class="action-btn" onclick="convertToLF()">🐧 To LF</button>
          <button class="action-btn" onclick="addEveryNChars()">🔢 Every N Chars</button>
          <button class="action-btn copy-btn" onclick="copyResult()">📋 Copy Result</button>
        </div>
      </div>
    </div>
  </div>
<?php include 'footer.php'; ?>

