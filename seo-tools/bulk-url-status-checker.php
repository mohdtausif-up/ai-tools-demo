<?php
$page_title = 'Bulk URL Status Checker - Check Multiple URLs';
$page_description = 'Check HTTP status codes for multiple URLs at once (200, 404, 301, 500, etc).';
$breadcrumbs = [
    ['title' => 'Home', 'url' => 'index.php'],
    ['title' => 'Bulk Url Status Checker', 'url' => '']
];
$page_css = 'bulk-url-status-checker.css';
$page_js = 'bulk-url-status-checker.js';
include 'header.php';
?>
<div class="container">
  <div class="d-flex justify-content-end mb-3" style="gap:1rem;">
    <button id="share-btn" class="btn btn-outline-secondary" title="Share this tool"><span>🔗</span> Share</button>
    <button id="fav-btn" class="btn btn-outline-warning" title="Add to Favourites"><span>★</span> Add to Favourites</button>
  </div>
    <p class="subtitle">Check HTTP status codes for multiple URLs at once</p>

    <div class="main-grid">
      <div class="card">
        <div class="section-title">Enter URLs (one per line)</div>
        <textarea class="textarea-field" id="urlsInput" placeholder="https://example.com&#10;https://example.com/about&#10;https://example.com/contact">https://example.com
https://example.com/about
https://example.com/products
https://example.com/contact</textarea>
        <button class="check-btn" id="checkBtn" onclick="checkUrls()">🔍 Check All URLs</button>
      </div>

      <div class="card">
        <div class="section-title">Status Results</div>
        
        <div class="stats-row">
          <div class="stat-box">
            <div class="stat-value" id="totalCount">0</div>
            <div class="stat-label">Total</div>
          </div>
          <div class="stat-box">
            <div class="stat-value" id="successCount" style="color: #10b981;">0</div>
            <div class="stat-label">Success</div>
          </div>
          <div class="stat-box">
            <div class="stat-value" id="redirectCount" style="color: #f59e0b;">0</div>
            <div class="stat-label">Redirects</div>
          </div>
          <div class="stat-box">
            <div class="stat-value" id="errorCount" style="color: #ef4444;">0</div>
            <div class="stat-label">Errors</div>
          </div>
        </div>

        <div class="results-list" id="resultsList">
          <p style="color: #94a3b8; text-align: center; padding: 40px;">Enter URLs and click Check</p>
        </div>
      </div>
    </div>
      <section class="how-to-use" style="margin-top:2rem;padding:1.5rem;background:#f9fafb;border-radius:8px;box-shadow:0 1px 4px rgba(0,0,0,0.04);">
        <h2 style="font-size:1.2rem;color:#2563eb;margin-bottom:0.7rem;">How to Use</h2>
        <ol style="margin-left:1.2rem;">
          <li>Enter one or more URLs in the input field (one per line).</li>
          <li>Click the <b>Check All URLs</b> button.</li>
          <li>Review the HTTP status results for each URL.</li>
          <li>Use the results to fix broken links or optimize redirects.</li>
        </ol>
      </section>
      <section class="faq-section" style="margin-top:2rem;padding:1.5rem;background:#f1f5f9;border-radius:8px;box-shadow:0 1px 4px rgba(0,0,0,0.04);">
        <h2 style="font-size:1.2rem;color:#2563eb;margin-bottom:0.7rem;">Frequently Asked Questions</h2>
        <div class="faq-item"><b>What does this tool do?</b><br>It checks HTTP status codes for multiple URLs at once.</div>
        <div class="faq-item"><b>Is this tool free?</b><br>Yes, all features are free to use.</div>
        <div class="faq-item"><b>Do I need to register?</b><br>No registration required.</div>
        <div class="faq-item"><b>Can I check any website?</b><br>Yes, you can check any public website URLs.</div>
      </section>
      <script type="application/ld+json">
      {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "What does this tool do?",
            "acceptedAnswer": { "@type": "Answer", "text": "It checks HTTP status codes for multiple URLs at once." }
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
            "name": "Can I check any website?",
            "acceptedAnswer": { "@type": "Answer", "text": "Yes, you can check any public website URLs." }
          }
        ]
      }
      </script>
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
        const tool = { name: 'Bulk URL Status Checker', url: window.location.pathname };
        if (!favs.some(f => f.url === tool.url)) {
          favs.push(tool);
          localStorage.setItem('favouriteTools', JSON.stringify(favs));
          alert('Added to favourites!');
        } else {
          alert('Already in favourites.');
        }
      };
      </script>
      <form method="post" action="" style="display:none;">
        <input type="hidden" name="csrf_token" value="<?php echo htmlspecialchars($_SESSION['csrf_token'] ?? ''); ?>">
      </form>
  </div>
<?php include 'footer.php'; ?>

