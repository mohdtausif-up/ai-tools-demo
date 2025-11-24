<?php
$page_title = 'Case Converter - Text Case Transformation Tool';
$page_description = 'Convert text to UPPER, lower, Title, camelCase, snake_case, and more.';
$breadcrumbs = [
    ['title' => 'Home', 'url' => 'index.php'],
    ['title' => 'Case Converter', 'url' => '']
];
$page_css = 'case-converter.css';
$page_js = 'case-converter.js';
include 'header.php';
?>
<div class="container">
    
  <div class="d-flex justify-content-end mb-3" style="gap:1rem;">
    <button id="share-btn" class="btn btn-outline-secondary" title="Share this tool"><span>ðŸ”—</span> Share</button>
    <button id="fav-btn" class="btn btn-outline-warning" title="Add to Favourites"><span>â­</span> Add to Favourites</button>
  </div>
    <p class="subtitle">Convert text to different case formats instantly</p>

    <div class="card">
      <textarea class="textarea-field" id="textInput" placeholder="Enter text to convert..."></textarea>
      
      <div class="button-grid">
        <button class="case-btn" onclick="convertCase('upper')">UPPERCASE</button>
        <button class="case-btn" onclick="convertCase('lower')">lowercase</button>
        <button class="case-btn" onclick="convertCase('title')">Title Case</button>
        <button class="case-btn" onclick="convertCase('sentence')">Sentence case</button>
        <button class="case-btn" onclick="convertCase('camel')">camelCase</button>
        <button class="case-btn" onclick="convertCase('pascal')">PascalCase</button>
        <button class="case-btn" onclick="convertCase('snake')">snake_case</button>
        <button class="case-btn" onclick="convertCase('kebab')">kebab-case</button>
        <button class="case-btn" onclick="convertCase('constant')">CONSTANT_CASE</button>
        <button class="case-btn" onclick="convertCase('dot')">dot.case</button>
        <button class="case-btn" onclick="convertCase('path')">path/case</button>
        <button class="case-btn" onclick="convertCase('toggle')">tOGGLE cASE</button>
      </div>
      
      <button class="case-btn copy-btn" onclick="copyText()">📋 Copy Result</button>
    </div>
  </div>
<?php include 'footer.php'; ?>

