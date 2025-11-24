<?php
$page_title = 'Base64 Encoder/Decoder - Encode & Decode Base64';
$page_description = 'Encode and decode Base64 strings instantly.';
$breadcrumbs = [
    ['title' => 'Home', 'url' => 'index.php'],
    ['title' => 'Base64 Encoder', 'url' => '']
];
$page_css = 'base64-encoder.css';
$page_js = 'base64-encoder.js';
include 'header.php';
?>
<div class="container">
    
  <div class="d-flex justify-content-end mb-3" style="gap:1rem;">
    <button id="share-btn" class="btn btn-outline-secondary" title="Share this tool"><span>ðŸ”—</span> Share</button>
    <button id="fav-btn" class="btn btn-outline-warning" title="Add to Favourites"><span>â­</span> Add to Favourites</button>
  </div>

    <script>
      document.addEventListener('DOMContentLoaded', function() {
        var favBtn = document.getElementById('fav-btn');
        var shareBtn = document.getElementById('share-btn');
        if (favBtn) {
          favBtn.onclick = function() {
            var favs = JSON.parse(localStorage.getItem('favouriteTools') || '[]');
            var url = window.location.pathname;
            var name = 'Base64 Encoder/Decoder';
            if (!favs.some(function(t){return t.url===url;})) {
              favs.push({url:url,name:name});
              localStorage.setItem('favouriteTools', JSON.stringify(favs));
              alert('Added to favourites!');
            } else {
              alert('Already in favourites!');
            }
          };
        }
        if (shareBtn) {
          shareBtn.onclick = function() {
            navigator.clipboard.writeText(window.location.href);
            alert('Tool link copied to clipboard!');
          };
        }
      });
    </script>
    <p class="subtitle">Encode and decode Base64 strings</p>

    <div class="grid-container">
      <div class="card">
        <div class="card-title">📝 Input Text</div>
          <form method="post" action="base64-encoder.php">
            <input type="hidden" name="csrf_token" value="<?php echo bin2hex(random_bytes(32)); ?>">
            <textarea class="textarea-field" id="inputText" name="inputText" placeholder="Enter text or Base64 string..."></textarea>
            <div class="button-grid">
              <button class="action-btn" onclick="encodeBase64()">🔒 Encode</button>
              <button class="action-btn" onclick="decodeBase64()">🔓 Decode</button>
            </div>
          </form>
        <div class="button-grid">
          <button class="action-btn" onclick="encodeBase64()">🔒 Encode</button>
          <button class="action-btn" onclick="decodeBase64()">🔓 Decode</button>
        </div>
        <div class="file-input-wrapper">
          <label class="file-input-label" for="fileInput">
            📁 Encode File to Base64
          </label>
          <input type="file" class="file-input" id="fileInput" onchange="handleFileSelect(event)">
        </div>
        <div class="info-box">
          💡 You can encode text or files to Base64, or decode Base64 strings back to text
        </div>
      </div>

      <div class="card">
        <div class="card-title">✅ Output</div>
        <textarea class="textarea-field" id="outputText" placeholder="Result will appear here..." readonly></textarea>
        <div class="button-grid">
          <button class="action-btn copy-btn" onclick="copyResult()">📋 Copy Result</button>
          <button class="action-btn" onclick="downloadResult()" style="grid-column: span 2; background: #8b5cf6;">
            💾 Download Result
          </button>
        </div>
      </div>
    </div>
  </div>
<?php include 'footer.php'; ?>

<!-- SEO JSON-LD Schema -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "WebTool",
  "name": "Base64 Encoder/Decoder",
  "description": "Encode and decode Base64 strings instantly.",
  "url": "https://yourdomain.com/text-tools/base64-encoder.php"
}
</script>
<!-- FAQ JSON-LD Schema -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is Base64 encoding?",
      "acceptedAnswer": {"@type": "Answer", "text": "Base64 encoding is a way to convert data into a text format using only ASCII characters."}
    },
    {
      "@type": "Question",
      "name": "Can I decode Base64 files?",
      "acceptedAnswer": {"@type": "Answer", "text": "Yes, you can decode Base64 strings back to their original format using this tool."}
    }
  ]
}
</script>

<div class="how-to-use">
  <h2>How to Use</h2>
  <ol>
    <li>Enter your text or Base64 string in the input box.</li>
    <li>Click 'Encode' to convert text to Base64, or 'Decode' to convert Base64 to text.</li>
    <li>Copy or download the result as needed.</li>
    <li>Optionally, encode files to Base64 using the file input.</li>
  </ol>
</div>
<div class="faq-section">
  <h2>Frequently Asked Questions</h2>
  <div class="faq-item">
    <strong>What is Base64 encoding?</strong>
    <p>Base64 encoding is a way to convert data into a text format using only ASCII characters.</p>
  </div>
  <div class="faq-item">
    <strong>Can I decode Base64 files?</strong>
    <p>Yes, you can decode Base64 strings back to their original format using this tool.</p>
  </div>
</div>

