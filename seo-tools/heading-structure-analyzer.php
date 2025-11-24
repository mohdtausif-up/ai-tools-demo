<?php
$page_title = 'Heading Structure Analyzer - Check H1-H6 Hierarchy';
$page_description = 'Analyze heading structure and hierarchy on any webpage for better SEO.';
$breadcrumbs = [
    ['title' => 'Home', 'url' => 'index.php'],
    ['title' => 'Heading Structure Analyzer', 'url' => '']
];
$page_css = 'heading-structure-analyzer.css';
$page_js = 'heading-structure-analyzer.js';
// FAQ JSON-LD schema
$json_ld_faq = json_encode([
  "@context" => "https://schema.org",
  "@type" => "FAQPage",
  "mainEntity" => [
    [
      "@type" => "Question",
      "name" => "What is a heading structure?",
      "acceptedAnswer" => [
        "@type" => "Answer",
        "text" => "Heading structure refers to the use of H1-H6 tags to organize content on a webpage, helping both users and search engines understand the hierarchy and importance of sections."
      ]
    ],
    [
      "@type" => "Question",
      "name" => "Why is heading hierarchy important for SEO?",
      "acceptedAnswer" => [
        "@type" => "Answer",
        "text" => "Proper heading hierarchy improves accessibility, user experience, and helps search engines index your content more effectively, boosting SEO."
      ]
    ],
    [
      "@type" => "Question",
      "name" => "Can I analyze any webpage?",
      "acceptedAnswer" => [
        "@type" => "Answer",
        "text" => "Yes, you can enter the URL of any publicly accessible webpage to analyze its heading structure."
      ]
    ],
    [
      "@type" => "Question",
      "name" => "What should I do if my page has multiple H1 tags?",
      "acceptedAnswer" => [
        "@type" => "Answer",
        "text" => "Ideally, each page should have a single H1 tag representing the main topic. Multiple H1s can confuse search engines and should be avoided."
      ]
    ]
  ]
]);
$json_ld_schema = $json_ld_faq;
include 'header.php';
?>
<div class="container">
    
  <div class="d-flex justify-content-end mb-3" style="gap:1rem;">
      <button id="share-btn" class="btn btn-outline-secondary" title="Share this tool"><span>&#128279;</span> Share</button>
      <button id="fav-btn" class="btn btn-outline-warning" title="Add to Favourites"><span>&#9733;</span> Add to Favourites</button>
      <script>
        document.addEventListener('DOMContentLoaded', function() {
          var favBtn = document.getElementById('fav-btn');
          if (favBtn) {
            favBtn.addEventListener('click', function() {
              addFavouriteTool({
                name: 'Heading Structure Analyzer',
                url: 'heading-structure-analyzer.php'
              });
              favBtn.textContent = 'Added!';
              setTimeout(function(){ favBtn.textContent = '★ Add to Favourites'; }, 1200);
            });
          }
          var shareBtn = document.getElementById('share-btn');
          if (shareBtn) {
            shareBtn.addEventListener('click', function() {
              navigator.clipboard.writeText(window.location.href);
              shareBtn.textContent = 'Link Copied!';
              setTimeout(function(){ shareBtn.textContent = '🔗 Share'; }, 1200);
            });
          }
        });
      </script>
  </div>
    <p class="subtitle">Check H1-H6 heading hierarchy for SEO optimization</p>

    <div class="input-card">
      <div class="input-row">
        <input type="text" class="input-field" id="urlInput" value="https://example.com" placeholder="Enter webpage URL">
        <button class="analyze-btn" id="analyzeBtn" onclick="analyzeHeadings()">🔍 Analyze</button>
      </div>
    </div>

    <div class="results-card" id="resultsCard" style="display: none;">
      <h2 style="margin-bottom: 20px; color: #1e293b;">Heading Structure</h2>
      
      <div class="stats-grid" id="statsGrid"></div>
      
      <div id="headingsList"></div>
    </div>
      <section class="how-to-use" style="margin-top:2rem;padding:1.5rem;background:#f9fafb;border-radius:8px;box-shadow:0 1px 4px rgba(0,0,0,0.04);">
        <h2 style="font-size:1.2rem;color:#2563eb;margin-bottom:0.7rem;">How to Use</h2>
        <ol style="margin-left:1.2rem;">
          <li>Enter the URL of the webpage you want to analyze in the input field.</li>
          <li>Click the <b>Analyze</b> button.</li>
          <li>Review the heading structure results to ensure proper H1-H6 hierarchy for SEO.</li>
          <li>Use the insights to improve your page's heading structure and SEO performance.</li>
        </ol>
      </section>
        <section class="faq-section" style="margin-top:2rem;padding:1.5rem;background:#f1f5f9;border-radius:8px;box-shadow:0 1px 4px rgba(0,0,0,0.04);">
          <h2 style="font-size:1.2rem;color:#059669;margin-bottom:0.7rem;">Frequently Asked Questions</h2>
          <dl>
            <dt><b>What is a heading structure?</b></dt>
            <dd>Heading structure refers to the use of H1-H6 tags to organize content on a webpage, helping both users and search engines understand the hierarchy and importance of sections.</dd>
            <dt><b>Why is heading hierarchy important for SEO?</b></dt>
            <dd>Proper heading hierarchy improves accessibility, user experience, and helps search engines index your content more effectively, boosting SEO.</dd>
            <dt><b>Can I analyze any webpage?</b></dt>
            <dd>Yes, you can enter the URL of any publicly accessible webpage to analyze its heading structure.</dd>
            <dt><b>What should I do if my page has multiple H1 tags?</b></dt>
            <dd>Ideally, each page should have a single H1 tag representing the main topic. Multiple H1s can confuse search engines and should be avoided.</dd>
          </dl>
        </section>
  </div>
<?php include 'footer.php'; ?>

