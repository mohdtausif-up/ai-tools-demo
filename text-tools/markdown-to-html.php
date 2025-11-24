<?php
$page_title = 'Markdown to HTML Converter';
$page_description = 'Convert Markdown syntax to HTML.';
$breadcrumbs = [
    ['title' => 'Home', 'url' => 'index.php'],
    ['title' => 'Markdown To Html', 'url' => '']
];
$page_css = 'markdown-to-html.css';
$page_js = 'markdown-to-html.js';
include 'header.php';
?>
<div class="container">
    
  <div class="d-flex justify-content-end mb-3" style="gap:1rem;">
    <button id="share-btn" class="btn btn-outline-secondary" title="Share this tool"><span>ðŸ”—</span> Share</button>
    <button id="fav-btn" class="btn btn-outline-warning" title="Add to Favourites"><span>â­</span> Add to Favourites</button>
  </div>
    <p class="subtitle">Convert Markdown syntax to HTML</p>

    <div class="grid-container">
      <div class="card">
        <div class="card-title">📝 Markdown Input</div>
        <textarea class="textarea-field" id="markdownInput" placeholder="# Heading
## Subheading
**Bold** and *italic*
- List item
[Link](url)"></textarea>
        <button class="action-btn" onclick="convertToHTML()">🔄 Convert to HTML</button>
      </div>

      <div class="card">
        <div class="card-title">✅ HTML Output</div>
        <textarea class="textarea-field" id="htmlOutput" placeholder="HTML will appear here..." readonly></textarea>
        <button class="action-btn copy-btn" onclick="copyHTML()">📋 Copy HTML</button>
        
        <div class="card-title" style="margin-top: 20px;">👁️ Preview</div>
        <div class="preview-box" id="preview"></div>
      </div>
    </div>
  </div>
<?php include 'footer.php'; ?>

