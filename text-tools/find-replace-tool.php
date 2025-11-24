<?php
$page_title = 'Find & Replace Tool - Bulk Text Replacement';
$page_description = 'Find and replace multiple strings in text at once.';
$breadcrumbs = [
    ['title' => 'Home', 'url' => 'index.php'],
    ['title' => 'Find Replace Tool', 'url' => '']
];
$page_css = 'find-replace-tool.css';
$page_js = 'find-replace-tool.js';
include 'header.php';
?>
<div class="container">
    
  <div class="d-flex justify-content-end mb-3" style="gap:1rem;">
    <button id="share-btn" class="btn btn-outline-secondary" title="Share this tool"><span>ðŸ”—</span> Share</button>
    <button id="fav-btn" class="btn btn-outline-warning" title="Add to Favourites"><span>â­</span> Add to Favourites</button>
  </div>
    <p class="subtitle">Find and replace multiple strings in text at once</p>

    <div class="grid-container">
      <div class="card">
        <div class="card-title">📝 Original Text</div>
        <textarea class="textarea-field" id="originalText" placeholder="Enter text here..."></textarea>
        
        <div class="card-title" style="margin-top: 20px;">🔧 Replacements</div>
        <div class="input-group">
          <input type="text" class="input-field" id="findInput" placeholder="Find...">
          <input type="text" class="input-field" id="replaceInput" placeholder="Replace with...">
          <button class="add-btn" onclick="addReplacement()">+ Add</button>
        </div>
        
        <div class="options-bar">
          <label class="checkbox-label">
            <input type="checkbox" id="caseSensitive">
            Case sensitive
          </label>
          <label class="checkbox-label">
            <input type="checkbox" id="wholeWords">
            Whole words only
          </label>
          <label class="checkbox-label">
            <input type="checkbox" id="useRegex">
            Use regex
          </label>
        </div>
        
        <div class="replacement-list" id="replacementList"></div>
        
        <button class="action-btn" onclick="performReplacements()">🔄 Replace All</button>
      </div>

      <div class="card">
        <div class="card-title">✅ Result</div>
        <textarea class="textarea-field" id="resultText" placeholder="Result will appear here..." readonly></textarea>
        <button class="action-btn copy-btn" onclick="copyResult()">📋 Copy Result</button>
      </div>
    </div>
  </div>
<?php include 'footer.php'; ?>

