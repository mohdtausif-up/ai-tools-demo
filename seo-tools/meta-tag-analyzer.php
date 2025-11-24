<?php
$page_title = 'Meta Tag Analyzer - SEO Meta Tags Checker';
$page_description = 'Analyze and check meta tags including title, description, keywords, Open Graph, and Twitter Card tags for SEO optimization.';
$breadcrumbs = [
    ['title' => 'Home', 'url' => 'index.php'],
    ['title' => 'Meta Tag Analyzer', 'url' => '']
];
$page_css = 'meta-tag-analyzer.css';
$page_js = 'meta-tag-analyzer.js';
include 'header.php';
?>
<div class="container">
    
  <div class="d-flex justify-content-end mb-3" style="gap:1rem;">
  <button id="share-btn" class="btn btn-outline-secondary" title="Share this tool"><span>🔗</span> Share</button>
  <button id="fav-btn" class="btn btn-outline-warning" title="Add to Favourites"><span>★</span> Add to Favourites</button>
  </div>
    <p class="subtitle">Analyze and optimize your website's meta tags for better SEO</p>

    <div class="input-card">
      <div class="input-group">
        <label class="label">Website HTML or URL</label>
        <textarea class="input-field" id="htmlInput" placeholder="Paste your HTML code or enter a URL to analyze..."></textarea>
      </div>
      <button class="analyze-btn" onclick="analyzeMetaTags()">🔍 Analyze Meta Tags</button>
    </div>

    <div class="results-section" id="resultsSection">
      <div class="score-section">
        <div class="score-card">
          <div class="score-value" id="overallScore">0</div>
          <div class="score-label">Overall Score</div>
        </div>
        <div class="score-card">
          <div class="score-value" id="foundTags">0</div>
          <div class="score-label">Tags Found</div>
        </div>
        <div class="score-card">
          <div class="score-value" id="missingTags">0</div>
          <div class="score-label">Missing Tags</div>
        </div>
      </div>

      <div class="result-card">
        <div class="result-title">📄 Basic Meta Tags</div>
        <div id="basicMetaResults"></div>
      </div>

      <div class="result-card">
        <div class="result-title">📱 Open Graph Tags</div>
        <div id="ogResults"></div>
      </div>

      <div class="result-card">
        <div class="result-title">🐦 Twitter Card Tags</div>
        <div id="twitterResults"></div>
      </div>
    </div>
      <section class="how-to-use" style="margin-top:2rem;padding:1.5rem;background:#f9fafb;border-radius:8px;box-shadow:0 1px 4px rgba(0,0,0,0.04);">
        <h2 style="font-size:1.2rem;color:#2563eb;margin-bottom:0.7rem;">How to Use</h2>
        <ol style="margin-left:1.2rem;">
          <li>Paste your website's HTML code or enter a URL in the input field.</li>
          <li>Click the <b>Analyze Meta Tags</b> button.</li>
          <li>Review the results for basic meta tags, Open Graph, and Twitter Card tags.</li>
          <li>Identify missing or incomplete tags and update your website for better SEO and social sharing.</li>
        </ol>
      </section>
        <section class="faq-section" style="margin-top:2rem;padding:1.5rem;background:#f1f5f9;border-radius:8px;box-shadow:0 1px 4px rgba(0,0,0,0.04);">
          <h2 style="font-size:1.2rem;color:#2563eb;margin-bottom:0.7rem;">Frequently Asked Questions</h2>
          <div class="faq-item"><b>What does this tool do?</b><br>It analyzes your website's meta tags for SEO and social sharing optimization.</div>
          <div class="faq-item"><b>Is this tool free?</b><br>Yes, all features are free to use.</div>
          <div class="faq-item"><b>Do I need to register?</b><br>No registration required.</div>
          <div class="faq-item"><b>Can I analyze any website?</b><br>Yes, you can analyze any public website or your own HTML code.</div>
        </section>
        <script type="application/ld+json">
        {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": [
            {
              "@type": "Question",
              "name": "What does this tool do?",
              "acceptedAnswer": { "@type": "Answer", "text": "It analyzes your website's meta tags for SEO and social sharing optimization." }
            },
            {
              "@type": "Question",
              "name": "Is this tool free?",
              "acceptedAnswer": { "@type": "Answer", "text": "Yes, all features are free to use." }
            },
            {
              "@type": "Question",
              "name": "Do I need to register?",
              "acceptedAnswer": { "@type": "Answer", "text": "No registration required." }
            },
            {
              "@type": "Question",
              "name": "Can I analyze any website?",
              "acceptedAnswer": { "@type": "Answer", "text": "Yes, you can analyze any public website or your own HTML code." }
            }
          ]
        }
        </script>
        <script src="assets/js/meta-tag-analyzer.js"></script>
        <script>
        // Share button logic
        document.getElementById('share-btn').onclick = function() {
          if (navigator.share) {
            navigator.share({
              title: document.title,
              url: window.location.href
            });
          } else {
            prompt('Copy this URL:', window.location.href);
          }
        };
        // Favourite button logic
        document.getElementById('fav-btn').onclick = function() {
          let favs = JSON.parse(localStorage.getItem('favouriteTools') || '[]');
          const tool = { name: 'Meta Tag Analyzer', url: window.location.pathname };
          if (!favs.some(f => f.url === tool.url)) {
            favs.push(tool);
            localStorage.setItem('favouriteTools', JSON.stringify(favs));
            alert('Added to favourites!');
          } else {
            alert('Already in favourites.');
          }
        };
        </script>
  </div>
<?php include 'footer.php'; ?>

