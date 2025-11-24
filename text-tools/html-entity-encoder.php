<?php
$page_title = 'HTML Entity Encoder/Decoder';
$page_description = 'Encode and decode HTML entities for safe display.';
$breadcrumbs = [
    ['title' => 'Home', 'url' => 'index.php'],
    ['title' => 'Html Entity Encoder', 'url' => '']
];
$page_css = 'html-entity-encoder.css';
$page_js = 'html-entity-encoder.js';
include 'header.php';
?>
<div class="container">
    
  <div class="d-flex justify-content-end mb-3" style="gap:1rem;">
    <button id="share-btn" class="btn btn-outline-secondary" title="Share this tool"><span>ðŸ”—</span> Share</button>
    <button id="fav-btn" class="btn btn-outline-warning" title="Add to Favourites"><span>â­</span> Add to Favourites</button>
  </div>
    <p class="subtitle">Encode and decode HTML entities</p>

    <div class="grid-container">
      <div class="card">
        <div class="card-title">📝 Input Text</div>
        <textarea class="textarea-field" id="inputText" placeholder="Enter text or HTML entities..."></textarea>
        <div class="button-grid">
          <button class="action-btn" onclick="encodeEntities()">🔒 Encode</button>
          <button class="action-btn" onclick="decodeEntities()">🔓 Decode</button>
        </div>
        <div class="info-box">
          💡 Common entities: &lt; &gt; &amp; &quot; &apos; &nbsp;
          <div class="entity-list">
            <div class="entity-item">< → &amp;lt;</div>
            <div class="entity-item">> → &amp;gt;</div>
            <div class="entity-item">& → &amp;amp;</div>
            <div class="entity-item">" → &amp;quot;</div>
            <div class="entity-item">' → &amp;apos;</div>
            <div class="entity-item">  → &amp;nbsp;</div>
          </div>
        </div>
      </div>

      <div class="card">
        <div class="card-title">✅ Output</div>
        <textarea class="textarea-field" id="outputText" placeholder="Result will appear here..." readonly></textarea>
        <button class="action-btn copy-btn" onclick="copyResult()">📋 Copy Result</button>
      </div>
    </div>
  </div>
<?php include 'footer.php'; ?>

