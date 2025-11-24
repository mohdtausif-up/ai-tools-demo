<?php
$page_title = 'Text to Binary & Hex Converter';
$page_description = 'Convert text to binary, hexadecimal, decimal, or octal.';
$breadcrumbs = [
    ['title' => 'Home', 'url' => 'index.php'],
    ['title' => 'Text To Binary', 'url' => '']
];
$page_css = 'text-to-binary.css';
$page_js = 'text-to-binary.js';
include 'header.php';
?>
<div class="container">
    
  <div class="d-flex justify-content-end mb-3" style="gap:1rem;">
    <button id="share-btn" class="btn btn-outline-secondary" title="Share this tool"><span>ðŸ”—</span> Share</button>
    <button id="fav-btn" class="btn btn-outline-warning" title="Add to Favourites"><span>â­</span> Add to Favourites</button>
  </div>
    <p class="subtitle">Convert text to binary, hexadecimal, decimal, and octal formats</p>
    <script>
      document.addEventListener('DOMContentLoaded', function() {
        var favBtn = document.getElementById('fav-btn');
        var shareBtn = document.getElementById('share-btn');
        if (favBtn) {
          favBtn.onclick = function() {
            var favs = JSON.parse(localStorage.getItem('favouriteTools') || '[]');
            var url = window.location.pathname;
            var name = 'Text to Binary & Hex Converter';
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

    <div class="card">
      <div class="card-title">📝 Input Text</div>
      <textarea class="textarea-field" id="inputText" placeholder="Enter text to convert..."></textarea>
        <form method="post" action="text-to-binary.php">
          <input type="hidden" name="csrf_token" value="<?php echo bin2hex(random_bytes(32)); ?>">
          <textarea class="textarea-field" id="inputText" name="inputText" placeholder="Enter text to convert..."></textarea>
          <div class="button-grid">
            <button class="action-btn" onclick="convertText('encode')">🔒 Encode All</button>
            <button class="action-btn" onclick="convertText('decode-binary')">🔓 Decode Binary</button>
            <button class="action-btn" onclick="convertText('decode-hex')">🔓 Decode Hex</button>
            <button class="action-btn" onclick="clearAll()">🗑️ Clear</button>
          </div>
        </form>
      <div class="button-grid">
        <button class="action-btn" onclick="convertText('encode')">🔒 Encode All</button>
        <button class="action-btn" onclick="convertText('decode-binary')">🔓 Decode Binary</button>
        <button class="action-btn" onclick="convertText('decode-hex')">🔓 Decode Hex</button>
        <button class="action-btn" onclick="clearAll()">🗑️ Clear</button>
      </div>
    </div>

    <div class="card" id="resultsCard" style="display: none;">
      <div class="card-title">✅ Converted Output</div>
      
      <div class="output-box">
        <div class="output-label">
          Binary (Base 2)
          <button class="copy-btn-small" onclick="copyOutput('binary')">📋 Copy</button>
        </div>
        <div class="output-text" id="binaryOutput"></div>
      </div>

      <div class="output-box">
        <div class="output-label">
          Hexadecimal (Base 16)
          <button class="copy-btn-small" onclick="copyOutput('hex')">📋 Copy</button>
        </div>
        <div class="output-text" id="hexOutput"></div>
      </div>

      <div class="output-box">
        <div class="output-label">
          Decimal (ASCII Codes)
          <button class="copy-btn-small" onclick="copyOutput('decimal')">📋 Copy</button>
        </div>
        <div class="output-text" id="decimalOutput"></div>
      </div>

      <div class="output-box">
        <div class="output-label">
          Octal (Base 8)
          <button class="copy-btn-small" onclick="copyOutput('octal')">📋 Copy</button>
        </div>
        <div class="output-text" id="octalOutput"></div>
      </div>
    </div>
  </div>
<?php include 'footer.php'; ?>

<!-- SEO JSON-LD Schema -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "WebTool",
  "name": "Text to Binary & Hex Converter",
  "description": "Convert text to binary, hexadecimal, decimal, or octal.",
  "url": "https://yourdomain.com/text-tools/text-to-binary.php"
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
      "name": "How do I convert text to binary?",
      "acceptedAnswer": {"@type": "Answer", "text": "Enter your text and click 'Encode All' to get the binary representation."}
    },
    {
      "@type": "Question",
      "name": "Can I convert binary back to text?",
      "acceptedAnswer": {"@type": "Answer", "text": "Yes, paste your binary and use the tool to decode it back to text."}
    }
  ]
}
</script>

<div class="how-to-use">
  <h2>How to Use</h2>
  <ol>
    <li>Enter your text in the input box.</li>
    <li>Click 'Encode All' to see the binary, hex, decimal, and octal output.</li>
    <li>Use the decode buttons to convert binary or hex back to text.</li>
    <li>Copy or download the result as needed.</li>
  </ol>
</div>
<div class="faq-section">
  <h2>Frequently Asked Questions</h2>
  <div class="faq-item">
    <strong>How do I convert text to binary?</strong>
    <p>Enter your text and click 'Encode All' to get the binary representation.</p>
  </div>
  <div class="faq-item">
    <strong>Can I convert binary back to text?</strong>
    <p>Yes, paste your binary and use the tool to decode it back to text.</p>
  </div>
</div>

