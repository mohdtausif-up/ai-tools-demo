<?php
$page_title = 'Readability Calculator - Flesch-Kincaid Score';
$page_description = 'Calculate readability scores using Flesch-Kincaid and other indices.';
$breadcrumbs = [
    ['title' => 'Home', 'url' => 'index.php'],
    ['title' => 'Readability Calculator', 'url' => '']
];
$page_css = 'readability-calculator.css';
$page_js = 'readability-calculator.js';
include 'header.php';
?>
<div class="container">
    
  <div class="d-flex justify-content-end mb-3" style="gap:1rem;">
    <button id="share-btn" class="btn btn-outline-secondary" title="Share this tool"><span>ðŸ”—</span> Share</button>
    <button id="fav-btn" class="btn btn-outline-warning" title="Add to Favourites"><span>â­</span> Add to Favourites</button>
  </div>
    <p class="subtitle">Calculate Flesch-Kincaid and other readability scores</p>

    <div class="card">
      <div class="card-title">📝 Input Text</div>
      <textarea class="textarea-field" id="inputText" placeholder="Enter text to calculate readability..."></textarea>
      <button class="action-btn" onclick="calculateReadability()">🔍 Calculate Readability</button>
    </div>

    <div class="card" id="resultsCard" style="display: none;">
      <div class="card-title">📊 Readability Scores</div>
      
      <div class="scores-grid">
        <div class="score-box">
          <div class="score-label">Flesch Reading Ease</div>
          <div class="score-value" id="fleschScore">0</div>
          <div class="score-desc" id="fleschDesc">-</div>
        </div>
        
        <div class="score-box">
          <div class="score-label">Flesch-Kincaid Grade</div>
          <div class="score-value" id="gradeScore">0</div>
          <div class="score-desc" id="gradeDesc">-</div>
        </div>
        
        <div class="score-box">
          <div class="score-label">Gunning Fog Index</div>
          <div class="score-value" id="fogScore">0</div>
          <div class="score-desc" id="fogDesc">-</div>
        </div>
        
        <div class="score-box">
          <div class="score-label">SMOG Index</div>
          <div class="score-value" id="smogScore">0</div>
          <div class="score-desc" id="smogDesc">-</div>
        </div>
      </div>
      
      <div class="info-box">
        <strong>Understanding the Scores:</strong><br>
        • Flesch Reading Ease: 90-100 = Very Easy, 60-70 = Standard, 0-30 = Very Difficult<br>
        • Grade Level: U.S. school grade level needed to understand the text<br>
        • Lower scores indicate easier readability
      </div>
    </div>
  </div>
<?php include 'footer.php'; ?>

