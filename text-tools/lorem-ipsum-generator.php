<?php
$page_title = 'Lorem Ipsum Generator - Placeholder Text Generator';
$page_description = 'Generate Lorem Ipsum placeholder text for design mockups.';
$breadcrumbs = [
    ['title' => 'Home', 'url' => 'index.php'],
    ['title' => 'Lorem Ipsum Generator', 'url' => '']
];
$page_css = 'lorem-ipsum-generator.css';
$page_js = 'lorem-ipsum-generator.js';
include 'header.php';
?>
<div class="container">
    
  <div class="d-flex justify-content-end mb-3" style="gap:1rem;">
    <button id="share-btn" class="btn btn-outline-secondary" title="Share this tool"><span>ðŸ”—</span> Share</button>
    <button id="fav-btn" class="btn btn-outline-warning" title="Add to Favourites"><span>â­</span> Add to Favourites</button>
  </div>
    <p class="subtitle">Generate placeholder text for your design mockups</p>

    <div class="card">
      <div class="options-grid">
        <div class="option-group">
          <label class="option-label">Type</label>
          <select class="option-select" id="typeSelect">
            <option value="paragraphs">Paragraphs</option>
            <option value="sentences">Sentences</option>
            <option value="words">Words</option>
          </select>
        </div>
        
        <div class="option-group">
          <label class="option-label">Count</label>
          <input type="number" class="option-input" id="countInput" value="3" min="1" max="100">
        </div>
        
        <div class="option-group">
          <label class="option-label">Start With</label>
          <select class="option-select" id="startSelect">
            <option value="yes">Lorem ipsum...</option>
            <option value="no">Random start</option>
          </select>
        </div>
      </div>
      
      <button class="action-btn" onclick="generateLorem()">✨ Generate Lorem Ipsum</button>
    </div>

    <div class="card" id="resultsCard" style="display: none;">
      <div class="output-box" id="loremOutput"></div>
      <button class="action-btn copy-btn" onclick="copyLorem()">📋 Copy Text</button>
    </div>
  </div>
<?php include 'footer.php'; ?>

