<?php
$page_title = 'Duplicate Line Remover - Remove Duplicate Text Lines';
$page_description = 'Remove duplicate lines from text while preserving order.';
$breadcrumbs = [
    ['title' => 'Home', 'url' => 'index.php'],
    ['title' => 'Duplicate Line Remover', 'url' => '']
];
$page_css = 'duplicate-line-remover.css';
$page_js = 'duplicate-line-remover.js';
include 'header.php';
?>
<div class="container">
    
  <div class="d-flex justify-content-end mb-3" style="gap:1rem;">
    <button id="share-btn" class="btn btn-outline-secondary" title="Share this tool"><span>ðŸ”—</span> Share</button>
    <button id="fav-btn" class="btn btn-outline-warning" title="Add to Favourites"><span>â­</span> Add to Favourites</button>
  </div>
    <p class="subtitle">Remove duplicate lines from your text</p>

    <div class="grid-container">
      <div class="card">
        <div class="card-title">📝 Input Text</div>
        <textarea class="textarea-field" id="inputText" placeholder="Enter text with duplicate lines..."></textarea>
        
        <div class="options-bar">
          <label class="checkbox-label">
            <input type="checkbox" id="caseSensitive">
            Case sensitive
          </label>
          <label class="checkbox-label">
            <input type="checkbox" id="trimLines" checked>
            Trim whitespace
          </label>
          <label class="checkbox-label">
            <input type="checkbox" id="removeEmpty" checked>
            Remove empty lines
          </label>
        </div>
        
        <button class="action-btn" onclick="removeDuplicates()">🧹 Remove Duplicates</button>
      </div>

      <div class="card">
        <div class="card-title">✅ Unique Lines</div>
        <textarea class="textarea-field" id="resultText" placeholder="Unique lines will appear here..." readonly></textarea>
        <button class="action-btn copy-btn" onclick="copyResult()">📋 Copy Result</button>
        
        <div class="stats-box" id="statsBox" style="display: none;">
          <div class="stat-item">
            <span class="stat-label">Original Lines:</span>
            <span class="stat-value" id="originalCount">0</span>
          </div>
          <div class="stat-item">
            <span class="stat-label">Unique Lines:</span>
            <span class="stat-value" id="uniqueCount">0</span>
          </div>
          <div class="stat-item">
            <span class="stat-label">Duplicates Removed:</span>
            <span class="stat-value" id="duplicateCount">0</span>
          </div>
          <div class="stat-item" style="border: none;">
            <span class="stat-label">Reduction:</span>
            <span class="stat-value" id="reductionPercent">0%</span>
          </div>
        </div>
      </div>
    </div>
  </div>
<?php include 'footer.php'; ?>

