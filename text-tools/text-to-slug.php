<?php
$page_title = 'Text to Slug Converter - URL-Friendly Slug Generator';
$page_description = 'Convert text into URL-friendly slugs for SEO.';
$breadcrumbs = [
    ['title' => 'Home', 'url' => 'index.php'],
    ['title' => 'Text To Slug', 'url' => '']
];
$page_css = 'text-to-slug.css';
$page_js = 'text-to-slug.js';
include 'header.php';
?>
<div class="container">
    
  <div class="d-flex justify-content-end mb-3" style="gap:1rem;">
    <button id="share-btn" class="btn btn-outline-secondary" title="Share this tool"><span>ðŸ”—</span> Share</button>
    <button id="fav-btn" class="btn btn-outline-warning" title="Add to Favourites"><span>â­</span> Add to Favourites</button>
  </div>
    <p class="subtitle">Convert text into URL-friendly slugs</p>

    <div class="card">
      <div class="card-title">📝 Input Text</div>
      <input type="text" class="input-field" id="inputText" placeholder="Enter text to convert to slug..." oninput="generateSlug()">
      
      <div class="options-bar">
        <label class="checkbox-label">
          <input type="checkbox" id="lowercase" checked onchange="generateSlug()">
          Lowercase
        </label>
        <label class="checkbox-label">
          <input type="checkbox" id="removeSpecial" checked onchange="generateSlug()">
          Remove special characters
        </label>
        <label class="checkbox-label">
          <input type="checkbox" id="maxLength" onchange="generateSlug()">
          Max 50 characters
        </label>
      </div>
    </div>

    <div class="card">
      <div class="card-title">✅ Generated Slug</div>
      <div class="slug-display" id="slugDisplay">your-url-friendly-slug-here</div>
      <button class="action-btn copy-btn" onclick="copySlug()">📋 Copy Slug</button>
      
      <div class="example-box">
        <div class="example-title">Examples</div>
        <div class="example-item">"Hello World!" → hello-world</div>
        <div class="example-item">"10 Best SEO Tips & Tricks" → 10-best-seo-tips-tricks</div>
        <div class="example-item">"C++ Programming Guide" → c-programming-guide</div>
      </div>
    </div>
  </div>
<?php include 'footer.php'; ?>

