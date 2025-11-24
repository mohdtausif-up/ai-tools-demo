<?php
$page_title = 'Sort Lines Tool - Alphabetical Text Line Sorter';
$page_description = 'Sort text lines alphabetically, reverse, randomly, or by length.';
$breadcrumbs = [
    ['title' => 'Home', 'url' => 'index.php'],
    ['title' => 'Sort Lines Tool', 'url' => '']
];
$page_css = 'sort-lines-tool.css';
$page_js = 'sort-lines-tool.js';
include 'header.php';
?>
<div class="container">
    
  <div class="d-flex justify-content-end mb-3" style="gap:1rem;">
    <button id="share-btn" class="btn btn-outline-secondary" title="Share this tool"><span>ðŸ”—</span> Share</button>
    <button id="fav-btn" class="btn btn-outline-warning" title="Add to Favourites"><span>â­</span> Add to Favourites</button>
  </div>
    <p class="subtitle">Sort text lines in multiple ways</p>

    <div class="grid-container">
      <div class="card">
        <div class="card-title">📝 Input Lines</div>
        <textarea class="textarea-field" id="inputText" placeholder="Enter lines to sort (one per line)..."></textarea>
        
        <label class="checkbox-label">
          <input type="checkbox" id="caseSensitive">
          Case sensitive sorting
        </label>
        <label class="checkbox-label">
          <input type="checkbox" id="removeEmpty">
          Remove empty lines
        </label>
      </div>

      <div class="card">
        <div class="card-title">✅ Sorted Result</div>
        <textarea class="textarea-field" id="resultText" placeholder="Sorted lines will appear here..." readonly></textarea>
        <div class="button-grid">
          <button class="action-btn" onclick="sortLines('alphabetical')">🔤 A-Z</button>
          <button class="action-btn" onclick="sortLines('reverse')">🔽 Z-A</button>
          <button class="action-btn" onclick="sortLines('length')">📏 By Length</button>
          <button class="action-btn" onclick="sortLines('random')">🎲 Random</button>
          <button class="action-btn" onclick="sortLines('numerical')">🔢 Numerical</button>
          <button class="action-btn" onclick="removeDuplicates()">🗑️ Remove Dupes</button>
          <button class="action-btn copy-btn" onclick="copyResult()">📋 Copy Result</button>
        </div>
      </div>
    </div>
  </div>
<?php include 'footer.php'; ?>

