<?php
$page_title = 'Text Summarizer - AI-Powered Summary Generator';
$page_description = 'Summarize long text into concise key points automatically.';
$breadcrumbs = [
    ['title' => 'Home', 'url' => 'index.php'],
    ['title' => 'Text Summarizer', 'url' => '']
];
$page_css = 'text-summarizer.css';
$page_js = 'text-summarizer.js';
include 'header.php';
?>
<div class="container">
    
  <div class="d-flex justify-content-end mb-3" style="gap:1rem;">
    <button id="share-btn" class="btn btn-outline-secondary" title="Share this tool"><span>ðŸ”—</span> Share</button>
    <button id="fav-btn" class="btn btn-outline-warning" title="Add to Favourites"><span>â­</span> Add to Favourites</button>
  </div>
    <p class="subtitle">Condense long text into concise summaries and key points</p>

    <div class="grid-container">
      <div class="card">
        <div class="card-title">📝 Original Text</div>
        <div class="options-bar">
          <span class="option-label">Summary Length:</span>
          <select class="option-select" id="lengthSelect">
            <option value="short">Short (3 sentences)</option>
            <option value="medium" selected>Medium (5 sentences)</option>
            <option value="long">Long (7 sentences)</option>
          </select>
        </div>
        <textarea class="textarea-field" id="originalText" placeholder="Paste long text here to summarize..."></textarea>
        <button class="action-btn" onclick="summarizeText()">✨ Generate Summary</button>
      </div>

      <div class="card">
        <div class="card-title">✅ Summary</div>
        <div class="summary-output" id="summaryOutput">
          <p style="color: #94a3b8; text-align: center; padding: 100px 20px;">
            Enter text and click "Generate Summary" to see results
          </p>
        </div>
        <button class="copy-btn" onclick="copySummary()">📋 Copy Summary</button>
      </div>
    </div>
  </div>
<?php include 'footer.php'; ?>

