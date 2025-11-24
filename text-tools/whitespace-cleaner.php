<?php
$page_title = 'Whitespace Cleaner - Remove Extra Spaces & Tabs';
$page_description = 'Clean up extra whitespace, spaces, and tabs from text.';
$breadcrumbs = [
    ['title' => 'Home', 'url' => 'index.php'],
    ['title' => 'Whitespace Cleaner', 'url' => '']
];
$page_css = 'whitespace-cleaner.css';
$page_js = 'whitespace-cleaner.js';
include 'header.php';
?>
<div class="container">
    
  <div class="d-flex justify-content-end mb-3" style="gap:1rem;">
    <button id="share-btn" class="btn btn-outline-secondary" title="Share this tool"><span>ðŸ”—</span> Share</button>
    <button id="fav-btn" class="btn btn-outline-warning" title="Add to Favourites"><span>â­</span> Add to Favourites</button>
  </div>
    <p class="subtitle">Remove extra spaces, tabs, and clean up whitespace</p>
    <script>
      document.addEventListener('DOMContentLoaded', function() {
        var favBtn = document.getElementById('fav-btn');
        var shareBtn = document.getElementById('share-btn');
        if (favBtn) {
          favBtn.onclick = function() {
            var favs = JSON.parse(localStorage.getItem('favouriteTools') || '[]');
            var url = window.location.pathname;
            var name = 'Whitespace Cleaner';
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

    <div class="grid-container">
      <div class="card">
        <div class="card-title">📝 Input Text</div>
        <textarea class="textarea-field" id="inputText" placeholder="Enter text with extra whitespace..."></textarea>
          <form method="post" action="whitespace-cleaner.php">
            <input type="hidden" name="csrf_token" value="<?php echo bin2hex(random_bytes(32)); ?>">
            <textarea class="textarea-field" id="inputText" name="inputText" placeholder="Enter text with extra whitespace..."></textarea>
            <div class="button-grid">
              <button class="action-btn" onclick="cleanAll()">🧼 Clean All</button>
              <button class="action-btn" onclick="removeExtraSpaces()">📏 Extra Spaces</button>
              <button class="action-btn" onclick="trimLines()">✂️ Trim Lines</button>
              <button class="action-btn" onclick="normalizeWhitespace()">⚖️ Normalize</button>
              <button class="action-btn" onclick="removeEmptyLines()">🗑️ Empty Lines</button>
              <button class="action-btn" onclick="tabsToSpaces()">🔄 Tabs to Spaces</button>
              <button class="action-btn copy-btn" onclick="copyResult()">📋 Copy Result</button>
            </div>
          </form>
        <div class="stats-box">
          <div class="stat-row">
            <span class="stat-label">Characters (with spaces):</span>
            <span class="stat-value" id="beforeChars">0</span>
          </div>
          <div class="stat-row">
            <span class="stat-label">Spaces:</span>
            <span class="stat-value" id="beforeSpaces">0</span>
          </div>
          <div class="stat-row">
            <span class="stat-label">Line breaks:</span>
            <span class="stat-value" id="beforeBreaks">0</span>
          </div>
        </div>
      </div>

      <div class="card">
        <div class="card-title">✅ Cleaned Text</div>
        <textarea class="textarea-field" id="outputText" placeholder="Cleaned text will appear here..." readonly></textarea>
        <div class="button-grid">
          <button class="action-btn" onclick="cleanAll()">🧼 Clean All</button>
          <button class="action-btn" onclick="removeExtraSpaces()">📏 Extra Spaces</button>
          <button class="action-btn" onclick="trimLines()">✂️ Trim Lines</button>
          <button class="action-btn" onclick="normalizeWhitespace()">⚖️ Normalize</button>
          <button class="action-btn" onclick="removeEmptyLines()">🗑️ Empty Lines</button>
          <button class="action-btn" onclick="tabsToSpaces()">🔄 Tabs to Spaces</button>
          <button class="action-btn copy-btn" onclick="copyResult()">📋 Copy Result</button>
        </div>
        <div class="stats-box" id="afterStats" style="display: none;">
          <div class="stat-row">
            <span class="stat-label">Characters saved:</span>
            <span class="stat-value" id="charsSaved">0</span>
          </div>
          <div class="stat-row">
            <span class="stat-label">Reduction:</span>
            <span class="stat-value" id="reduction">0%</span>
          </div>
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
  "name": "Whitespace Cleaner",
  "description": "Remove extra spaces, tabs, and line breaks from your text.",
  "url": "https://yourdomain.com/text-tools/whitespace-cleaner.php"
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
      "name": "What does Whitespace Cleaner do?",
      "acceptedAnswer": {"@type": "Answer", "text": "It removes extra spaces, tabs, and line breaks from your text for cleaner formatting."}
    },
    {
      "@type": "Question",
      "name": "Is my text processed securely?",
      "acceptedAnswer": {"@type": "Answer", "text": "Yes, your text is processed securely and not stored."}
    }
  ]
}
</script>

<div class="how-to-use">
  <h2>How to Use</h2>
  <ol>
    <li>Paste your text in the input box.</li>
    <li>Click 'Clean All' to remove extra spaces, tabs, and line breaks.</li>
    <li>Use other buttons for specific cleaning actions.</li>
    <li>Copy or download the cleaned result as needed.</li>
  </ol>
</div>
<div class="faq-section">
  <h2>Frequently Asked Questions</h2>
  <div class="faq-item">
    <strong>What does Whitespace Cleaner do?</strong>
    <p>It removes extra spaces, tabs, and line breaks from your text for cleaner formatting.</p>
  </div>
  <div class="faq-item">
    <strong>Is my text processed securely?</strong>
    <p>Yes, your text is processed securely and not stored.</p>
  </div>
</div>

