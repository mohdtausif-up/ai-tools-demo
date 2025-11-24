<?php
$page_title = 'HTML to Markdown Converter';
$page_description = 'Convert HTML to Markdown syntax.';
$breadcrumbs = [
    ['title' => 'Home', 'url' => 'index.php'],
    ['title' => 'Html To Markdown', 'url' => '']
];
$page_css = 'html-to-markdown.css';
$page_js = 'html-to-markdown.js';
include 'header.php';
?>
<div class="container">
    
  <div class="d-flex justify-content-end mb-3" style="gap:1rem;">
    <button id="share-btn" class="btn btn-outline-secondary" title="Share this tool"><span>ðŸ”—</span> Share</button>
    <button id="fav-btn" class="btn btn-outline-warning" title="Add to Favourites"><span>â­</span> Add to Favourites</button>
  </div>
    <p class="subtitle">Convert HTML to Markdown syntax</p>

    <div class="grid-container">
      <div class="card">
        <div class="card-title">📝 HTML Input</div>
        <textarea class="textarea-field" id="htmlInput" placeholder='
  <div class="d-flex justify-content-end mb-3" style="gap:1rem;">
    <button id="share-btn" class="btn btn-outline-secondary" title="Share this tool"><span>ðŸ”—</span> Share</button>
    <button id="fav-btn" class="btn btn-outline-warning" title="Add to Favourites"><span>â­</span> Add to Favourites</button>
  </div>
<p><strong>Bold</strong> and <em>italic</em></p>
<ul><li>List item</li></ul>'></textarea>
      </div>

      <div class="card">
        <div class="card-title">✅ Markdown Output</div>
        <textarea class="textarea-field" id="markdownOutput" placeholder="Markdown will appear here..." readonly></textarea>
        <div class="button-grid">
          <button class="action-btn" onclick="convertToMarkdown()">🔄 Convert</button>
          <button class="action-btn" onclick="clearAll()">🗑️ Clear</button>
          <button class="action-btn copy-btn" onclick="copyMarkdown()">📋 Copy Markdown</button>
        </div>
      </div>
    </div>
  </div>
<?php include 'footer.php'; ?>

