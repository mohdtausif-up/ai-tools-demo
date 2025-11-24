<?php
$page_title = 'Bullet Point Generator - Convert Text to Bullets';
$page_description = 'Convert text into formatted bullet points.';
$breadcrumbs = [
    ['title' => 'Home', 'url' => 'index.php'],
    ['title' => 'Bullet Point Generator', 'url' => '']
];
$page_css = 'bullet-point-generator.css';
$page_js = 'bullet-point-generator.js';
include 'header.php';
?>
<div class="container">
    
  <div class="d-flex justify-content-end mb-3" style="gap:1rem;">
    <button id="share-btn" class="btn btn-outline-secondary" title="Share this tool"><span>ðŸ”—</span> Share</button>
    <button id="fav-btn" class="btn btn-outline-warning" title="Add to Favourites"><span>â­</span> Add to Favourites</button>
  </div>
    <p class="subtitle">Convert text into organized bullet points</p>

    <div class="grid-container">
      <div class="card">
        <div class="card-title">📄 Original Text</div>
        <div class="options-bar">
          <div class="option-group">
            <label class="option-label">Bullet Style</label>
            <select class="option-select" id="bulletStyle">
              <option value="•">• Bullet</option>
              <option value="-">- Dash</option>
              <option value="*">* Asterisk</option>
              <option value="numbered">1. Numbered</option>
              <option value="✓">✓ Checkmark</option>
              <option value="→">→ Arrow</option>
            </select>
          </div>
          <div class="option-group">
            <label class="option-label">Split By</label>
            <select class="option-select" id="splitMode">
              <option value="sentence">Sentences</option>
              <option value="paragraph">Paragraphs</option>
              <option value="line">Lines</option>
            </select>
          </div>
        </div>
        <textarea class="textarea-field" id="originalText" placeholder="Enter text to convert to bullet points..."></textarea>
        <button class="action-btn" onclick="generateBullets()">✨ Generate Bullets</button>
      </div>

      <div class="card">
        <div class="card-title">✅ Bullet Points</div>
        <textarea class="textarea-field" id="bulletText" placeholder="Bullet points will appear here..." readonly></textarea>
        <button class="action-btn secondary-btn" onclick="copyBullets()">📋 Copy Bullets</button>
      </div>
    </div>
  </div>
<?php include 'footer.php'; ?>

