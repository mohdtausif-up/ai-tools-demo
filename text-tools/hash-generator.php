<?php
$page_title = 'Hash Generator - MD5, SHA-1, SHA-256, SHA-512';
$page_description = 'Generate cryptographic hashes for text and files.';
$breadcrumbs = [
    ['title' => 'Home', 'url' => 'index.php'],
    ['title' => 'Hash Generator', 'url' => '']
];
$page_css = 'hash-generator.css';
$page_js = 'hash-generator.js';
include 'header.php';
?>
<div class="container">
    
  <div class="d-flex justify-content-end mb-3" style="gap:1rem;">
    <button id="share-btn" class="btn btn-outline-secondary" title="Share this tool"><span>ðŸ”—</span> Share</button>
    <button id="fav-btn" class="btn btn-outline-warning" title="Add to Favourites"><span>â­</span> Add to Favourites</button>
  </div>
    <p class="subtitle">Generate cryptographic hashes (MD5, SHA-1, SHA-256, SHA-512)</p>

    <div class="card">
      <div class="card-title">📝 Input Text</div>
      <textarea class="textarea-field" id="inputText" placeholder="Enter text to hash..."></textarea>
      <button class="action-btn" onclick="generateHashes()">🔒 Generate Hashes</button>
      
      <div class="file-input-wrapper" onclick="document.getElementById('fileInput').click()">
        <label class="file-input-label">
          📁 Or click to hash a file
        </label>
        <input type="file" class="file-input" id="fileInput" onchange="hashFile(event)">
      </div>
    </div>

    <div class="card" id="resultsCard" style="display: none;">
      <div class="card-title">✅ Hash Results</div>
      
      <div class="hash-box">
        <div class="hash-label">
          MD5
          <button class="copy-btn-small" onclick="copyHash('md5')">📋 Copy</button>
        </div>
        <div class="hash-value" id="md5Hash"></div>
      </div>

      <div class="hash-box">
        <div class="hash-label">
          SHA-1
          <button class="copy-btn-small" onclick="copyHash('sha1')">📋 Copy</button>
        </div>
        <div class="hash-value" id="sha1Hash"></div>
      </div>

      <div class="hash-box">
        <div class="hash-label">
          SHA-256
          <button class="copy-btn-small" onclick="copyHash('sha256')">📋 Copy</button>
        </div>
        <div class="hash-value" id="sha256Hash"></div>
      </div>

      <div class="hash-box">
        <div class="hash-label">
          SHA-512
          <button class="copy-btn-small" onclick="copyHash('sha512')">📋 Copy</button>
        </div>
        <div class="hash-value" id="sha512Hash"></div>
      </div>
    </div>
  </div>
<?php include 'footer.php'; ?>

