<?php
$page_title = 'Robots.txt Generator - Create SEO-Friendly Robots.txt';
$page_description = 'Generate SEO-friendly robots.txt file with customizable rules for search engine crawlers.';
$breadcrumbs = [
    ['title' => 'Home', 'url' => 'index.php'],
    ['title' => 'Robots Txt Generator', 'url' => '']
];
$page_css = 'robots-txt-generator.css';
$page_js = 'robots-txt-generator.js';
include 'header.php';
?>
<div class="container">
    
  <div class="d-flex justify-content-end mb-3" style="gap:1rem;">
    <button id="share-btn" class="btn btn-outline-secondary" title="Share this tool"><span>🔗</span> Share</button>
    <button id="fav-btn" class="btn btn-outline-warning" title="Add to Favourites"><span>★</span> Add to Favourites</button>
  </div>
    <p class="subtitle">Create SEO-friendly robots.txt file for your website</p>

    <div class="main-grid">
      <div class="input-card">
        <div class="section-title">Templates</div>
        <div class="templates-grid">
          <button class="template-btn" onclick="loadTemplate('allow-all')">
            <div class="template-name">✓ Allow All Crawlers</div>
            <div class="template-desc">Allow all bots to crawl entire site</div>
          </button>
          <button class="template-btn" onclick="loadTemplate('block-all')">
            <div class="template-name">✗ Block All Crawlers</div>
            <div class="template-desc">Prevent all bots from crawling</div>
          </button>
          <button class="template-btn" onclick="loadTemplate('wordpress')">
            <div class="template-name">📝 WordPress</div>
            <div class="template-desc">Optimized for WordPress sites</div>
          </button>
          <button class="template-btn" onclick="loadTemplate('ecommerce')">
            <div class="template-name">🛒 E-commerce</div>
            <div class="template-desc">Block checkout/cart pages</div>
          </button>
        </div>
          <section class="how-to-use" style="margin-top:2rem;padding:1.5rem;background:#f9fafb;border-radius:8px;box-shadow:0 1px 4px rgba(0,0,0,0.04);">
            <h2 style="font-size:1.2rem;color:#2563eb;margin-bottom:0.7rem;">How to Use</h2>
            <ol style="margin-left:1.2rem;">
              <li>Select a template or add custom rules.</li>
              <li>Optionally enter your sitemap URL.</li>
              <li>Copy or download the generated robots.txt file.</li>
              <li>Upload robots.txt to your website root directory.</li>
            </ol>
          </section>
          <section class="faq-section" style="margin-top:2rem;padding:1.5rem;background:#f1f5f9;border-radius:8px;box-shadow:0 1px 4px rgba(0,0,0,0.04);">
            <h2 style="font-size:1.2rem;color:#2563eb;margin-bottom:0.7rem;">Frequently Asked Questions</h2>
            <div class="faq-item"><b>What is robots.txt?</b><br>It's a file that tells search engines which pages to crawl or not crawl.</div>
            <div class="faq-item"><b>Where do I upload robots.txt?</b><br>Upload to the root directory of your website.</div>
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
                "name": "What is robots.txt?",
                "acceptedAnswer": { "@type": "Answer", "text": "It's a file that tells search engines which pages to crawl or not crawl." }
              },
              {
                "@type": "Question",
                "name": "Where do I upload robots.txt?",
                "acceptedAnswer": { "@type": "Answer", "text": "Upload to the root directory of your website." }
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
          <script src="assets/js/robots-txt-generator.js"></script>
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
            const tool = { name: 'Robots.txt Generator', url: window.location.pathname };
            if (!favs.some(f => f.url === tool.url)) {
              favs.push(tool);
              localStorage.setItem('favouriteTools', JSON.stringify(favs));
              alert('Added to favourites!');
            } else {
              alert('Already in favourites.');
            }
          };
          </script>

        <div class="section-title">Custom Rules</div>
        <div class="rules-section" id="rulesContainer">
          <div class="rule-item">
            <div class="rule-header">
              <span class="rule-title">Rule 1</span>
              <button class="delete-rule-btn" onclick="deleteRule(this)">Delete</button>
            </div>
            <label class="input-label">User-agent</label>
            <input type="text" class="input-field user-agent" value="*" placeholder="* for all bots">
            <label class="input-label">Directive</label>
            <select class="input-field directive">
              <option value="Disallow">Disallow</option>
              <option value="Allow">Allow</option>
            </select>
            <label class="input-label">Path</label>
            <input type="text" class="input-field path" value="/" placeholder="/admin/">
          </div>
        </div>
        <button class="add-btn" onclick="addRule()">+ Add Rule</button>

        <div class="section-title" style="margin-top: 25px;">Sitemap URL (Optional)</div>
        <input type="text" class="input-field" id="sitemapUrl" placeholder="https://example.com/sitemap.xml" oninput="generateRobotsTxt()">
      </div>

      <div class="output-card">
        <div class="section-title">Generated robots.txt</div>
        <div class="output-section">
          <pre id="robotsOutput"></pre>
        </div>
        <button class="copy-btn" onclick="copyRobotsTxt()">📋 Copy to Clipboard</button>
        <button class="download-btn" onclick="downloadRobotsTxt()">⬇️ Download robots.txt</button>
      </div>
    </div>
  </div>
<?php include 'footer.php'; ?>

