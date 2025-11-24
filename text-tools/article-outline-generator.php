<?php
$page_title = 'Article Outline Generator - Create Content Structure';
$page_description = 'Generate article outlines from your content automatically.';
$breadcrumbs = [
    ['title' => 'Home', 'url' => 'index.php'],
    ['title' => 'Article Outline Generator', 'url' => '']
];
$page_css = 'article-outline-generator.css';
$page_js = 'article-outline-generator.js';
include 'header.php';
?>
<div class="container">
    
  <div class="d-flex justify-content-end mb-3" style="gap:1rem;">
    <button id="share-btn" class="btn btn-outline-secondary" title="Share this tool"><span>ðŸ”—</span> Share</button>
    <button id="fav-btn" class="btn btn-outline-warning" title="Add to Favourites"><span>â­</span> Add to Favourites</button>
  </div>
    <p class="subtitle">Extract headings and create structured outlines from your content</p>

    <div class="grid-container">
      <div class="card">
        <div class="card-title">📝 Article Content</div>
        <textarea class="textarea-field" id="articleInput" placeholder="Paste your article or content here...&#10;&#10;Use # for headings:&#10;# Main Heading&#10;## Subheading&#10;### Sub-subheading&#10;&#10;Or the tool will detect natural structure."></textarea>
        <button class="action-btn" onclick="generateOutline()">📋 Generate Outline</button>
      </div>

      <div class="card">
        <div class="card-title">✅ Article Outline</div>
        <div class="outline-container" id="outlineOutput">
          <p style="color: #94a3b8; text-align: center; padding: 150px 20px;">
            Enter content and click "Generate Outline" to see the structure
          </p>
        </div>
        <button class="copy-btn" onclick="copyOutline()">📋 Copy Outline</button>
      </div>
    </div>
  </div>
<?php include 'footer.php'; ?>

