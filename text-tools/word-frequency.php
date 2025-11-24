<?php
$page_title = 'Word Frequency Counter - Analyze Word Usage';
$page_description = 'Count word frequency and find most common words in text.';
$breadcrumbs = [
    ['title' => 'Home', 'url' => 'index.php'],
    ['title' => 'Word Frequency', 'url' => '']
];
$page_css = 'word-frequency.css';
$page_js = 'word-frequency.js';
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
            var name = 'Word Frequency Counter';
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
    <p class="subtitle">Analyze word usage and frequency in your text</p>

    <div class="grid-container">
      <div class="card">
        <div class="card-title">📝 Input Text</div>
          <form method="post" action="word-frequency.php">
            <input type="hidden" name="csrf_token" value="<?php echo bin2hex(random_bytes(32)); ?>">
            <textarea class="textarea-field" id="inputText" name="inputText" placeholder="Enter text to analyze..."></textarea>
            <div class="options-bar">
              <label class="checkbox-label">
                <input type="checkbox" id="caseSensitive" name="caseSensitive">
                Case sensitive
              </label>
              <label class="checkbox-label">
                <input type="checkbox" id="excludeCommon" name="excludeCommon" checked>
                Exclude common words
              </label>
            </div>
            <button class="action-btn" onclick="analyzeFrequency()">📊 Analyze Frequency</button>
          </form>
        
        <div class="options-bar">
          <label class="checkbox-label">
            <input type="checkbox" id="caseSensitive">
            Case sensitive
          </label>
          <label class="checkbox-label">
            <input type="checkbox" id="excludeCommon" checked>
            Exclude common words
          </label>
        </div>
        
        <button class="action-btn" onclick="analyzeFrequency()">📊 Analyze Frequency</button>
      </div>

      <div class="card">
        <div class="card-title">📈 Word Frequency</div>
        
        <div class="stats-box" id="statsBox" style="display: none;">
          <div class="stat-row">
            <span class="stat-label">Total Words:</span>
            <span class="stat-value" id="totalWords">0</span>
          </div>
          <div class="stat-row">
            <span class="stat-label">Unique Words:</span>
            <span class="stat-value" id="uniqueWords">0</span>
          </div>
          <div class="stat-row" style="border: none;">
            <span class="stat-label">Most Common:</span>
            <span class="stat-value" id="mostCommon">-</span>
          </div>
        </div>
        
        <div class="frequency-list" id="frequencyList"></div>
      </div>
    </div>
  </div>
<?php include 'footer.php'; ?>

<!-- SEO JSON-LD Schema -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "WebTool",
  "name": "Word Frequency Counter",
  "description": "Count word frequency and find most common words in text.",
  "url": "https://yourdomain.com/text-tools/word-frequency.php"
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
      "name": "How does the Word Frequency Counter work?",
      "acceptedAnswer": {"@type": "Answer", "text": "It analyzes your text and counts the frequency of each word, showing the most common words and statistics."}
    },
    {
      "@type": "Question",
      "name": "Can I exclude common words?",
      "acceptedAnswer": {"@type": "Answer", "text": "Yes, you can exclude common words using the provided checkbox option."}
    }
  ]
}
</script>

<div class="how-to-use">
  <h2>How to Use</h2>
  <ol>
    <li>Enter your text in the input box.</li>
    <li>Choose options for case sensitivity and excluding common words.</li>
    <li>Click 'Analyze Frequency' to see word statistics and frequency list.</li>
  </ol>
</div>
<div class="faq-section">
  <h2>Frequently Asked Questions</h2>
  <div class="faq-item">
    <strong>How does the Word Frequency Counter work?</strong>
    <p>It analyzes your text and counts the frequency of each word, showing the most common words and statistics.</p>
  </div>
  <div class="faq-item">
    <strong>Can I exclude common words?</strong>
    <p>Yes, you can exclude common words using the provided checkbox option.</p>
  </div>
</div>

