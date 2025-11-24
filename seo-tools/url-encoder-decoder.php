<?php
$page_title = 'URL Encoder/Decoder - URL Converter Tool';
$page_description = 'Encode and decode URLs with this simple online tool.';
$breadcrumbs = [
    ['title' => 'Home', 'url' => 'index.php'],
    ['title' => 'Url Encoder Decoder', 'url' => '']
];
$page_css = 'url-encoder-decoder.css';
$page_js = 'url-encoder-decoder.js';
include 'header.php';
?>
<div class="container">
    
  <div class="d-flex justify-content-end mb-3" style="gap:1rem;">
    <button id="share-btn" class="btn btn-outline-secondary" title="Share this tool"><span>ðŸ”—</span> Share</button>
    <button id="fav-btn" class="btn btn-outline-warning" title="Add to Favourites"><span>â­</span> Add to Favourites</button>
  </div>
    <p class="subtitle">Convert URLs to and from encoded format</p>

    <div class="card">
      <div class="section-title">Input</div>
      <textarea class="textarea-field" id="inputText" placeholder="Enter URL to encode or decode...">https://example.com/search?q=hello world&lang=en</textarea>
      <div class="button-row">
        <button class="btn btn-encode" onclick="encodeURL()">⬇️ Encode URL</button>
        <button class="btn btn-decode" onclick="decodeURL()">⬆️ Decode URL</button>
      </div>
    </div>

    <div class="card">
      <div class="section-title">Output</div>
      <textarea class="textarea-field" id="outputText" placeholder="Result will appear here..." readonly></textarea>
      <div class="button-row">
        <button class="btn btn-copy" onclick="copyOutput()">📋 Copy</button>
        <button class="btn btn-clear" onclick="clearAll()">🗑️ Clear</button>
      </div>
    </div>
  </div>
<?php include 'footer.php'; ?>

