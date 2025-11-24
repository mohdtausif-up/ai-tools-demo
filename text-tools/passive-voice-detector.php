<?php
$page_title = 'Passive Voice Detector - Find Passive Constructions';
$page_description = 'Detect and highlight passive voice in your text.';
$breadcrumbs = [
    ['title' => 'Home', 'url' => 'index.php'],
    ['title' => 'Passive Voice Detector', 'url' => '']
];
$page_css = 'passive-voice-detector.css';
$page_js = 'passive-voice-detector.js';
include 'header.php';
?>
<div class="container">
    
  <div class="d-flex justify-content-end mb-3" style="gap:1rem;">
    <button id="share-btn" class="btn btn-outline-secondary" title="Share this tool"><span>ðŸ”—</span> Share</button>
    <button id="fav-btn" class="btn btn-outline-warning" title="Add to Favourites"><span>â­</span> Add to Favourites</button>
  </div>
    <p class="subtitle">Find and fix passive voice constructions in your writing</p>

    <div class="card">
      <textarea class="textarea-field" id="textInput" placeholder="Paste your text here to detect passive voice..."></textarea>
      <button class="action-btn" onclick="detectPassive()">🔎 Detect Passive Voice</button>
    </div>

    <div class="card" id="resultsCard" style="display: none;">
      <div class="stats-box">
        <div class="stat-item">
          <div class="stat-value" id="passiveCount">0</div>
          <div class="stat-label">Passive Instances</div>
        </div>
        <div class="stat-item">
          <div class="stat-value" id="sentenceCount">0</div>
          <div class="stat-label">Total Sentences</div>
        </div>
        <div class="stat-item">
          <div class="stat-value" id="passivePercent">0%</div>
          <div class="stat-label">Passive Voice</div>
        </div>
      </div>
      
      <h3 style="font-size: 18px; color: #1e293b; margin-bottom: 15px;">Detected Passive Voice</h3>
      <div id="passiveList"></div>
    </div>
  </div>
<?php include 'footer.php'; ?>

