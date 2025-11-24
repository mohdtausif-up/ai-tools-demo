<?php
$page_title = 'Paraphrase Tool - Rewrite Text with Synonyms';
$page_description = 'Paraphrase and rewrite text using synonyms while maintaining meaning.';
$breadcrumbs = [
    ['title' => 'Home', 'url' => 'index.php'],
    ['title' => 'Paraphrase Tool', 'url' => '']
];
$page_css = 'paraphrase-tool.css';
$page_js = 'paraphrase-tool.js';
include 'header.php';
?>
<div class="container">
    
  <div class="d-flex justify-content-end mb-3" style="gap:1rem;">
    <button id="share-btn" class="btn btn-outline-secondary" title="Share this tool"><span>ðŸ”—</span> Share</button>
    <button id="fav-btn" class="btn btn-outline-warning" title="Add to Favourites"><span>â­</span> Add to Favourites</button>
  </div>
    <p class="subtitle">Rewrite text using synonyms while maintaining original meaning</p>

    <div class="options-card">
      <div class="option-group">
        <label class="option-label">Paraphrase Mode</label>
        <select class="option-select" id="modeSelect">
          <option value="standard">Standard - Balanced rewriting</option>
          <option value="creative">Creative - More variations</option>
          <option value="formal">Formal - Professional tone</option>
          <option value="simple">Simple - Simpler words</option>
        </select>
      </div>
    </div>

    <div class="grid-container">
      <div class="card">
        <div class="card-title">📝 Original Text</div>
        <textarea class="textarea-field" id="originalText" placeholder="Enter your text here to paraphrase..."></textarea>
        <div class="action-buttons">
          <button class="action-btn" onclick="paraphraseText()">✨ Paraphrase</button>
          <button class="action-btn secondary-btn" onclick="clearAll()">🗑️ Clear</button>
        </div>
      </div>

      <div class="card">
        <div class="card-title">✅ Paraphrased Text</div>
        <textarea class="textarea-field" id="paraphrasedText" placeholder="Paraphrased text will appear here..." readonly></textarea>
        <div class="action-buttons">
          <button class="action-btn secondary-btn" onclick="copyResult()">📋 Copy</button>
          <button class="action-btn secondary-btn" onclick="downloadResult()">💾 Download</button>
        </div>
      </div>
    </div>
  </div>
<?php include 'footer.php'; ?>

