<?php
$page_title = 'Sentiment Analyzer - Detect Text Sentiment';
$page_description = 'Analyze text sentiment as positive, negative, or neutral.';
$breadcrumbs = [
    ['title' => 'Home', 'url' => 'index.php'],
    ['title' => 'Sentiment Analyzer', 'url' => '']
];
$page_css = 'sentiment-analyzer.css';
$page_js = 'sentiment-analyzer.js';
include 'header.php';
?>
<div class="container">
    
  <div class="d-flex justify-content-end mb-3" style="gap:1rem;">
    <button id="share-btn" class="btn btn-outline-secondary" title="Share this tool"><span>ðŸ”—</span> Share</button>
    <button id="fav-btn" class="btn btn-outline-warning" title="Add to Favourites"><span>â­</span> Add to Favourites</button>
  </div>
    <p class="subtitle">Analyze the emotional tone of your text</p>

    <div class="card">
      <div class="card-title">📝 Input Text</div>
      <textarea class="textarea-field" id="inputText" placeholder="Enter text to analyze sentiment..."></textarea>
      <button class="action-btn" onclick="analyzeSentiment()">🔍 Analyze Sentiment</button>
    </div>

    <div class="card" id="resultsCard" style="display: none;">
      <div class="card-title">📊 Sentiment Results</div>
      
      <div class="sentiment-result">
        <div class="sentiment-icon" id="sentimentIcon">😐</div>
        <div class="sentiment-label" id="sentimentLabel">Neutral</div>
        <div class="sentiment-score" id="sentimentScore">0</div>
        
        <div class="score-bar">
          <div class="score-fill" id="scoreFill" style="width: 50%; background: #64748b;"></div>
        </div>
      </div>
      
      <div class="stats-grid">
        <div class="stat-box">
          <div class="stat-label">Positive Words</div>
          <div class="stat-value" id="positiveCount">0</div>
        </div>
        <div class="stat-box">
          <div class="stat-label">Negative Words</div>
          <div class="stat-value" id="negativeCount">0</div>
        </div>
        <div class="stat-box">
          <div class="stat-label">Total Words</div>
          <div class="stat-value" id="totalWords">0</div>
        </div>
      </div>
    </div>
  </div>
<?php include 'footer.php'; ?>

