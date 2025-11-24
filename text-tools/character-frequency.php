<?php
$page_title = 'Character Frequency Counter - Analyze Character Usage';
$page_description = 'Count character frequency and visualize character distribution.';
$breadcrumbs = [
    ['title' => 'Home', 'url' => 'index.php'],
    ['title' => 'Character Frequency', 'url' => '']
];
$page_css = 'character-frequency.css';
$page_js = 'character-frequency.js';
include 'header.php';
?>
<div class="container">
    
  <div class="d-flex justify-content-end mb-3" style="gap:1rem;">
    <button id="share-btn" class="btn btn-outline-secondary" title="Share this tool"><span>ðŸ”—</span> Share</button>
    <button id="fav-btn" class="btn btn-outline-warning" title="Add to Favourites"><span>â­</span> Add to Favourites</button>
  </div>
    <p class="subtitle">Analyze character usage and distribution</p>

    <div class="grid-container">
      <div class="card">
        <div class="card-title">📝 Input Text</div>
        <textarea class="textarea-field" id="inputText" placeholder="Enter text to analyze character frequency..."></textarea>
        
        <div class="options-bar">
          <label class="checkbox-label">
            <input type="checkbox" id="caseSensitive">
            Case sensitive
          </label>
          <label class="checkbox-label">
            <input type="checkbox" id="includeSpaces">
            Include spaces
          </label>
          <label class="checkbox-label">
            <input type="checkbox" id="includeSpecial" checked>
            Include special chars
          </label>
        </div>
        
        <button class="action-btn" onclick="analyzeCharacters()">📊 Analyze Characters</button>
      </div>

      <div class="card">
        <div class="card-title">📈 Character Distribution</div>
        
        <div class="stats-grid">
          <div class="stat-box">
            <div class="stat-label">Total Chars</div>
            <div class="stat-value" id="totalChars">0</div>
          </div>
          <div class="stat-box">
            <div class="stat-label">Unique Chars</div>
            <div class="stat-value" id="uniqueChars">0</div>
          </div>
          <div class="stat-box">
            <div class="stat-label">Most Common</div>
            <div class="stat-value" id="mostCommon">-</div>
          </div>
        </div>
        
        <div class="frequency-list" id="frequencyList"></div>
      </div>
    </div>
  </div>
<?php include 'footer.php'; ?>

