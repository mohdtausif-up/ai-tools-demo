<?php
$page_title = 'HTML Tag Remover - Strip HTML Tags from Text';
$page_description = 'Remove all HTML tags from text while preserving content.';
$breadcrumbs = [
    ['title' => 'Home', 'url' => 'index.php'],
    ['title' => 'Html Tag Remover', 'url' => '']
];
$page_css = 'html-tag-remover.css';
$page_js = 'html-tag-remover.js';
include 'header.php';
?>
<div class="container">
    
  <div class="d-flex justify-content-end mb-3" style="gap:1rem;">
    <button id="share-btn" class="btn btn-outline-secondary" title="Share this tool"><span>ðŸ”—</span> Share</button>
    <button id="fav-btn" class="btn btn-outline-warning" title="Add to Favourites"><span>â­</span> Add to Favourites</button>
  </div>
    <p class="subtitle">Remove all HTML tags from text</p>

    <div class="grid-container">
      <div class="card">
        <div class="card-title">📝 HTML Input</div>
        <textarea class="textarea-field" id="inputText" placeholder="Paste HTML here..."></textarea>
        
        <div class="options-bar">
          <label class="checkbox-label">
            <input type="checkbox" id="preserveLineBreaks" checked>
            Preserve line breaks
          </label>
          <label class="checkbox-label">
            <input type="checkbox" id="decodeEntities" checked>
            Decode HTML entities
          </label>
        </div>
      </div>

      <div class="card">
        <div class="card-title">✅ Plain Text</div>
        <textarea class="textarea-field" id="outputText" placeholder="Plain text will appear here..." readonly></textarea>
        <div class="button-grid">
          <button class="action-btn" onclick="removeTags()">🗑️ Remove Tags</button>
          <button class="action-btn" onclick="extractText()">📄 Extract Text</button>
          <button class="action-btn copy-btn" onclick="copyResult()">📋 Copy Result</button>
        </div>
        
        <div class="stats-box" id="statsBox" style="display: none;">
          <div class="stat-row">
            <span class="stat-label">Original size:</span>
            <span class="stat-value" id="originalSize">0</span>
          </div>
          <div class="stat-row">
            <span class="stat-label">Plain text size:</span>
            <span class="stat-value" id="plainSize">0</span>
          </div>
          <div class="stat-row">
            <span class="stat-label">Tags removed:</span>
            <span class="stat-value" id="tagsRemoved">0</span>
          </div>
          <div class="stat-row">
            <span class="stat-label">Size reduction:</span>
            <span class="stat-value" id="reduction">0%</span>
          </div>
        </div>
      </div>
    </div>
  </div>
<?php include 'footer.php'; ?>

