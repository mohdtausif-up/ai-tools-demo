<?php
$page_title = 'Plagiarism Detector - Check Text Originality';
$page_description = 'Detect potential plagiarism in your text.';
$breadcrumbs = [
    ['title' => 'Home', 'url' => 'index.php'],
    ['title' => 'Plagiarism Detector', 'url' => '']
];
$page_css = 'plagiarism-detector.css';
$page_js = 'plagiarism-detector.js';
include 'header.php';
?>
<div class="container">
    
  <div class="d-flex justify-content-end mb-3" style="gap:1rem;">
    <button id="share-btn" class="btn btn-outline-secondary" title="Share this tool"><span>ðŸ”—</span> Share</button>
    <button id="fav-btn" class="btn btn-outline-warning" title="Add to Favourites"><span>â­</span> Add to Favourites</button>
  </div>
    <p class="subtitle">Check text for potential plagiarism and unoriginal content</p>

    <div class="card">
      <textarea class="textarea-field" id="textInput" placeholder="Paste text to check for plagiarism..."></textarea>
      <button class="action-btn" onclick="checkPlagiarism()">🔎 Check Plagiarism</button>
    </div>

    <div class="card" id="resultsCard" style="display: none;">
      <div class="score-circle" id="scoreCircle">0%</div>
      <div class="score-label" id="scoreLabel">Originality Score</div>
      <div id="detectionsContainer"></div>
      
      <div class="info-box">
        <strong>ℹ️ Note:</strong> This is a basic pattern-based plagiarism detector. For comprehensive checks, use specialized plagiarism detection services like Turnitin, Copyscape, or Grammarly Premium.
      </div>
    </div>
  </div>
<?php include 'footer.php'; ?>

