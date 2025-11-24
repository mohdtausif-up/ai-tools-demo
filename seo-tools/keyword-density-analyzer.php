<?php
$page_title = 'Keyword Density Analyzer - SEO Content Tool';
$page_description = 'Analyze keyword density and frequency in your content for better SEO optimization.';
$breadcrumbs = [
    ['title' => 'Home', 'url' => 'index.php'],
    ['title' => 'Keyword Density Analyzer', 'url' => '']
];
$page_css = 'keyword-density-analyzer.css';
$page_js = 'keyword-density-analyzer.js';
include 'header.php';
?>
<div class="container">
    
  <div class="d-flex justify-content-end mb-3" style="gap:1rem;">
    <button id="share-btn" class="btn btn-outline-secondary" title="Share this tool"><span>🔗</span> Share</button>
    <button id="fav-btn" class="btn btn-outline-warning" title="Add to Favourites"><span>★</span> Add to Favourites</button>
  </div>
    <p class="subtitle">Analyze keyword frequency and density in your content</p>

    <div class="main-grid">
      <div class="input-card">
        <div class="section-title">Enter Your Content</div>
        <textarea class="textarea-field" id="contentInput" placeholder="Paste your content here...">SEO is important for websites. Search engine optimization helps websites rank better. Good SEO practices improve visibility.</textarea>
        <button class="analyze-btn" onclick="analyzeKeywords()">🔍 Analyze Keywords</button>
      </div>
        <section class="how-to-use" style="margin-top:2rem;padding:1.5rem;background:#f9fafb;border-radius:8px;box-shadow:0 1px 4px rgba(0,0,0,0.04);">
          <h2 style="font-size:1.2rem;color:#2563eb;margin-bottom:0.7rem;">How to Use</h2>
          <ol style="margin-left:1.2rem;">
            <li>Paste your content in the input field.</li>
            <li>Click <b>Analyze Keywords</b>.</li>
            <li>Review keyword frequency and density results.</li>
            <li>Optimize your content for better SEO.</li>
          </ol>
        </section>
        <section class="faq-section" style="margin-top:2rem;padding:1.5rem;background:#f1f5f9;border-radius:8px;box-shadow:0 1px 4px rgba(0,0,0,0.04);">
          <h2 style="font-size:1.2rem;color:#2563eb;margin-bottom:0.7rem;">Frequently Asked Questions</h2>
          <div class="faq-item"><b>What is keyword density?</b><br>Keyword density is the percentage of times a keyword appears in your content compared to the total word count.</div>
          <div class="faq-item"><b>Why is keyword analysis important?</b><br>It helps optimize your content for search engines and improves ranking.</div>
          <div class="faq-item"><b>Is this tool free?</b><br>Yes, it's free to use.</div>
          <div class="faq-item"><b>Do I need to register?</b><br>No registration required.</div>
        </section>
        <script type="application/ld+json">
        {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": [
            {
              "@type": "Question",
              "name": "What is keyword density?",
              "acceptedAnswer": { "@type": "Answer", "text": "Keyword density is the percentage of times a keyword appears in your content compared to the total word count." }
            },
            {
              "@type": "Question",
              "name": "Why is keyword analysis important?",
              "acceptedAnswer": { "@type": "Answer", "text": "It helps optimize your content for search engines and improves ranking." }
            },
            {
              "@type": "Question",
              "name": "Is this tool free?",
              "acceptedAnswer": { "@type": "Answer", "text": "Yes, it's free to use." }
            },
            {
              "@type": "Question",
              "name": "Do I need to register?",
              "acceptedAnswer": { "@type": "Answer", "text": "No registration required." }
            }
          ]
        }
        </script>
        <script src="assets/js/keyword-density-analyzer.js"></script>
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
          const tool = { name: 'Keyword Density Analyzer', url: window.location.pathname };
          if (!favs.some(f => f.url === tool.url)) {
            favs.push(tool);
            localStorage.setItem('favouriteTools', JSON.stringify(favs));
            alert('Added to favourites!');
          } else {
            alert('Already in favourites.');
          }
        };
        </script>

      <div class="results-card">
        <div class="section-title">Analysis Results</div>
        
        <div class="stats-row">
          <div class="stat-box">
            <div class="stat-value" id="wordCount">0</div>
            <div class="stat-label">Total Words</div>
          </div>
          <div class="stat-box">
            <div class="stat-value" id="uniqueWords">0</div>
            <div class="stat-label">Unique Words</div>
          </div>
          <div class="stat-box">
            <div class="stat-value" id="charCount">0</div>
            <div class="stat-label">Characters</div>
          </div>
        </div>

        <h3 style="font-size: 16px; margin-bottom: 15px; color: #1e293b;">Top Keywords</h3>
        <div class="keyword-list" id="keywordList">
          <p style="color: #94a3b8; text-align: center; padding: 40px;">Enter content to see keyword analysis</p>
        </div>
      </div>
    </div>
  </div>
<?php include 'footer.php'; ?>

