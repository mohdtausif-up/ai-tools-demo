<?php 
$page_title = 'Color Picker Tool - Select Colors Visually';
$page_description = 'Interactive color picker tool to select colors visually and get HEX, RGB, HSL, and CMYK codes instantly. Copy colors with one click.';
$breadcrumbs = [
  ['title' => 'Color Picker', 'url' => '']
];
include 'header.php'; 
?>

<div class="main-content">
<div class="container">
    
  <div class="d-flex justify-content-end mb-3" style="gap:1rem;">
    <button id="share-btn" class="btn btn-outline-secondary" title="Share this tool"><span>ðŸ”—</span> Share</button>
    <button id="fav-btn" class="btn btn-outline-warning" title="Add to Favourites"><span>â­</span> Add to Favourites</button>
  </div>
    <p class="subtitle">Select colors visually and get all color codes</p>
    
    <div class="color-display" id="colorDisplay"></div>
    
    <div class="input-group">
      <label for="colorInput">Choose Color</label>
      <input type="color" id="colorInput" value="#667eea">
    </div>
    
    <div class="code-group">
      <div class="code-label">HEX</div>
      <div class="code-value" onclick="copyCode('hex')">
        <span id="hexCode">#667eea</span>
        <button class="copy-btn">Copy</button>
      </div>
    </div>
    
    <div class="code-group">
      <div class="code-label">RGB</div>
      <div class="code-value" onclick="copyCode('rgb')">
        <span id="rgbCode">rgb(102, 126, 234)</span>
        <button class="copy-btn">Copy</button>
      </div>
    </div>
    
    <div class="code-group">
      <div class="code-label">HSL</div>
      <div class="code-value" onclick="copyCode('hsl')">
        <span id="hslCode">hsl(229, 76%, 66%)</span>
        <button class="copy-btn">Copy</button>
      </div>
    </div>
    
    <div class="code-group">
      <div class="code-label">CMYK</div>
      <div class="code-value" onclick="copyCode('cmyk')">
        <span id="cmykCode">cmyk(56%, 46%, 0%, 8%)</span>
        <button class="copy-btn">Copy</button>
      </div>
    </div>
    
    <div class="history">
      <div class="history-title">Recent Colors</div>
      <div class="history-colors" id="historyColors"></div>
    </div>
  </div>
  
  <div class="toast" id="toast">Copied to clipboard!</div>

  <!-- How to Use Section -->
  <section class="mt-5">
    <h2>How to Use</h2>
    <ol>
      <li>Pick a color using the color input above.</li>
      <li>View HEX, RGB, HSL, and CMYK codes instantly.</li>
      <li>Click 'Copy' to copy any color code to your clipboard.</li>
      <li>Use the Share or Add to Favourites buttons for quick access.</li>
    </ol>
  </section>

  <!-- FAQ Section -->
  <section class="mt-5">
    <h2>Frequently Asked Questions (FAQ)</h2>
    <div class="faq-list">
      <h3>How does this tool work?</h3>
      <p>This tool runs entirely in your browser. No data is sent to any server.</p>
      <h3>Can I use this tool on mobile?</h3>
      <p>Yes, Color Picker is fully responsive and works on all devices.</p>
      <h3>How do I add a tool to favourites?</h3>
      <p>Click the <span>⭐</span> Add to Favourites button above the form.</p>
    </div>
  </section>

  <!-- SEO Meta Tags -->
  <meta property="og:title" content="Color Picker Tool - Select Colors Visually | Color Tools">
  <meta property="og:description" content="Interactive color picker tool to select colors visually and get HEX, RGB, HSL, and CMYK codes instantly. Copy colors with one click.">
  <meta property="og:type" content="website">
  <meta property="og:url" content="https://yourdomain.com/color-tools/color-picker.php">
  <meta property="og:image" content="https://yourdomain.com/assets/img/color-picker-og.png">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="Color Picker Tool - Select Colors Visually | Color Tools">
  <meta name="twitter:description" content="Interactive color picker tool to select colors visually and get HEX, RGB, HSL, and CMYK codes instantly. Copy colors with one click.">
  <meta name="twitter:image" content="https://yourdomain.com/assets/img/color-picker-og.png">
  <link rel="canonical" href="https://yourdomain.com/color-tools/color-picker.php">

  <!-- JSON-LD Schema for Tool -->
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Color Picker Tool",
    "url": "https://yourdomain.com/color-tools/color-picker.php",
    "description": "Interactive color picker tool to select colors visually and get HEX, RGB, HSL, and CMYK codes instantly. Copy colors with one click.",
    "applicationCategory": "Productivity",
    "operatingSystem": "All",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    }
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
        "name": "How does this tool work?",
        "acceptedAnswer": { "@type": "Answer", "text": "This tool runs entirely in your browser. No data is sent to any server." }
      },
      {
        "@type": "Question",
        "name": "Can I use this tool on mobile?",
        "acceptedAnswer": { "@type": "Answer", "text": "Yes, Color Picker is fully responsive and works on all devices." }
      },
      {
        "@type": "Question",
        "name": "How do I add a tool to favourites?",
        "acceptedAnswer": { "@type": "Answer", "text": "Click the ⭐ Add to Favourites button above the form." }
      }
    ]
  }
  </script>

  <script>
    document.addEventListener('DOMContentLoaded', function() {
      var shareBtn = document.getElementById('share-btn');
      var favBtn = document.getElementById('fav-btn');
      if (shareBtn) {
        shareBtn.onclick = function() {
          if (navigator.share) {
            navigator.share({
              title: document.title,
              url: window.location.href
            });
          } else {
            window.prompt('Copy this link:', window.location.href);
          }
        };
      }
      if (favBtn) {
        favBtn.onclick = function() {
          var favs = JSON.parse(localStorage.getItem('favouriteColorTools') || '[]');
          var exists = favs.some(f => f.url === window.location.pathname);
          if (!exists) {
            favs.push({ name: "Color Picker Tool", url: window.location.pathname });
            localStorage.setItem('favouriteColorTools', JSON.stringify(favs));
            alert('Added to favourites!');
          } else {
            alert('Already in favourites.');
          }
        };
      }
    });
  </script>
  
</div>

<?php include 'footer.php'; ?>



