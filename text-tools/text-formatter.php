<?php
$page_title = 'Text Formatter - Add Prefixes, Suffixes & Line Numbers';
$page_description = 'Format text by adding prefixes, suffixes, line numbers, or bullets.';
$breadcrumbs = [
    ['title' => 'Home', 'url' => 'index.php'],
    ['title' => 'Text Formatter', 'url' => '']
];
$page_css = 'text-formatter.css';
$page_js = 'text-formatter.js';
include 'header.php';
?>
<div class="container">
    
  <div class="d-flex justify-content-end mb-3" style="gap:1rem;">
    <button id="share-btn" class="btn btn-outline-secondary" title="Share this tool"><span>ðŸ”—</span> Share</button>
    <button id="fav-btn" class="btn btn-outline-warning" title="Add to Favourites"><span>â­</span> Add to Favourites</button>
  </div>
    <p class="subtitle">Add prefixes, suffixes, line numbers, and more</p>

    <div class="grid-container">
      <div class="card">
        <div class="card-title">📝 Input Text</div>
        <textarea class="textarea-field" id="inputText" placeholder="Enter text (one item per line)..."></textarea>
        
        <div class="options-panel">
          <div class="input-group">
            <label class="input-label">Prefix (before each line)</label>
            <input type="text" class="input-field" id="prefixInput" placeholder="e.g., > or - ">
          </div>
          <div class="input-group">
            <label class="input-label">Suffix (after each line)</label>
            <input type="text" class="input-field" id="suffixInput" placeholder="e.g., ; or ,">
          </div>
        </div>
      </div>

      <div class="card">
        <div class="card-title">✅ Formatted Text</div>
        <textarea class="textarea-field" id="outputText" placeholder="Formatted text will appear here..." readonly></textarea>
        <div class="button-grid">
          <button class="action-btn" onclick="addPrefixSuffix()">➕ Prefix/Suffix</button>
          <button class="action-btn" onclick="addLineNumbers()">🔢 Line Numbers</button>
          <button class="action-btn" onclick="addBullets()">• Bullets</button>
          <button class="action-btn" onclick="addCheckboxes()">☐ Checkboxes</button>
          <button class="action-btn" onclick="addQuotes()">❝ Quotes</button>
          <button class="action-btn" onclick="indentLines()">⇥ Indent</button>
          <button class="action-btn copy-btn" onclick="copyResult()">📋 Copy Result</button>
        </div>
      </div>
    </div>
  </div>
<?php include 'footer.php'; ?>

