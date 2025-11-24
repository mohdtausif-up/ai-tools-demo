<?php
// CSRF Token Generation
$csrf_token = bin2hex(random_bytes(32));
if (session_status() === PHP_SESSION_NONE) session_start();
$_SESSION['csrf_token'] = $csrf_token;
$page_title = 'SEO & Web Tools - 40 Free Tools for Bloggers & Developers';
$page_description = 'Collection of 40 free SEO and web tools including meta tag analyzer, robots.txt generator, sitemap builder, SSL checker, and more.';
$breadcrumbs = [ ['title' => 'Home', 'url' => ''] ];
$page_css = 'index.css';
include 'header.php';
?>

  <div class="container">
    <header>
      <h1>🧪 SEO & Web Tools</h1>
      <p class="subtitle">40 Free Tools for Bloggers, Marketers & Developers</p>
      <p class="description">Powerful SEO analysis, website testing, and optimization tools - all running in your browser with no registration required.</p>
    </header>

    <div class="tools-grid">
      <!-- Meta Tag Analyzer -->
  <a href="meta-tag-analyzer.php" class="tool-card">
        <div class="tool-icon">🏷️</div>
        <div class="tool-title">Meta Tag Analyzer</div>
        <div class="tool-description">Check title, description, keywords, Open Graph tags, and Twitter Cards. Get SEO scores and optimization suggestions.</div>
        <span class="tool-status">✓ Available</span>
      </a>

      <!-- Robots.txt Generator -->
  <a href="robots-txt-generator.php" class="tool-card">
        <div class="tool-icon">🤖</div>
        <div class="tool-title">Robots.txt Generator</div>
        <div class="tool-description">Create SEO-friendly robots.txt files with templates for WordPress, e-commerce, or custom rules. Download instantly.</div>
        <span class="tool-status">✓ Available</span>
      </a>

      <!-- Sitemap Generator -->
  <a href="sitemap-generator.php" class="tool-card">
        <div class="tool-icon">🗺️</div>
        <div class="tool-title">XML Sitemap Generator</div>
        <div class="tool-description">Build XML sitemaps with priority, changefreq, and lastmod dates. CSV upload support. Syntax highlighting and instant download.</div>
        <span class="tool-status">✓ Available</span>
      </a>

      <!-- Open Graph Preview -->
  <a href="open-graph-preview.php" class="tool-card">
        <div class="tool-icon">🔗</div>
        <div class="tool-title">Open Graph Preview Tool</div>
        <div class="tool-description">See how your links appear on Facebook, Twitter, and LinkedIn. Preview social media cards in real-time.</div>
        <span class="tool-status">✓ Available</span>
      </a>

      <!-- JSON-LD Generator -->
  <a href="json-ld-generator.php" class="tool-card">
        <div class="tool-icon">📊</div>
        <div class="tool-title">JSON-LD Generator</div>
        <div class="tool-description">Generate structured data for SEO with 6 schema types: Organization, Article, Product, Person, Event, Recipe.</div>
        <span class="tool-status">✓ Available</span>
      </a>

      <!-- Responsive Design Tester -->
  <a href="responsive-design-tester.php" class="tool-card">
        <div class="tool-icon">📱</div>
        <div class="tool-title">Responsive Design Tester</div>
        <div class="tool-description">Preview your website on mobile, tablet, laptop, and desktop. Test portrait and landscape orientations.</div>
        <span class="tool-status">✓ Available</span>
      </a>

      <!-- Website Screenshot Tool -->
  <a href="website-screenshot.php" class="tool-card">
        <div class="tool-icon">📸</div>
        <div class="tool-title">Website Screenshot Tool</div>
        <div class="tool-description">Capture full-page website screenshots with custom dimensions using thum.io API. Download as PNG.</div>
        <span class="tool-status">✓ Available</span>
      </a>

      <!-- Website Uptime Checker -->
  <a href="uptime-checker.php" class="tool-card">
        <div class="tool-icon">⏱️</div>
        <div class="tool-title">Website Uptime Checker</div>
        <div class="tool-description">Ping any website to check online status. Monitor response time, server info, and track check history.</div>
        <span class="tool-status">✓ Available</span>
      </a>

      <!-- SSL Checker -->
  <a href="ssl-checker.php" class="tool-card">
        <div class="tool-icon">🔒</div>
        <div class="tool-title">SSL Certificate Checker</div>
        <div class="tool-description">Verify HTTPS certificate status using crt.sh API. Check expiration date, issuer, and certificate validity.</div>
        <span class="tool-status">✓ Available</span>
      </a>

      <!-- DNS Lookup Tool -->
  <a href="dns-lookup.php" class="tool-card">
        <div class="tool-icon">🌐</div>
        <div class="tool-title">DNS Lookup Tool</div>
        <div class="tool-description">Display domain DNS records using Google DNS API: A, AAAA, MX, NS, TXT, CNAME, and SOA records.</div>
        <span class="tool-status">✓ Available</span>
      </a>

      <!-- Broken Link Checker -->
  <a href="broken-link-checker.php" class="tool-card">
        <div class="tool-icon">🔗</div>
        <div class="tool-title">Broken Link Checker</div>
        <div class="tool-description">Find broken links and dead URLs on any webpage. Get detailed status reports for all links.</div>
        <span class="tool-status">✓ Available</span>
      </a>

      <!-- Keyword Density Analyzer -->
  <a href="keyword-density-analyzer.php" class="tool-card">
        <div class="tool-icon">📊</div>
        <div class="tool-title">Keyword Density Analyzer</div>
        <div class="tool-description">Analyze keyword frequency and density in your content. Get top 20 keywords with percentage breakdown.</div>
        <span class="tool-status">✓ Available</span>
      </a>

      <!-- Readability Score -->
  <a href="readability-score.php" class="tool-card">
        <div class="tool-icon">📖</div>
        <div class="tool-title">Readability Score Calculator</div>
        <div class="tool-description">Calculate Flesch Reading Ease, Flesch-Kincaid Grade Level, and Gunning Fog Index for your content.</div>
        <span class="tool-status">✓ Available</span>
      </a>

      <!-- Word Counter -->
  <a href="word-counter.php" class="tool-card">
        <div class="tool-icon">📝</div>
        <div class="tool-title">Word Counter & Text Analyzer</div>
        <div class="tool-description">Count words, characters, sentences, paragraphs, and calculate reading time for your content.</div>
        <span class="tool-status">✓ Available</span>
      </a>

      <!-- HTTP Header Checker -->
  <a href="http-header-checker.php" class="tool-card">
        <div class="tool-icon">🌐</div>
        <div class="tool-title">HTTP Header Checker</div>
        <div class="tool-description">View HTTP response headers including status codes, content type, and security headers.</div>
        <span class="tool-status">✓ Available</span>
      </a>

      <!-- URL Encoder/Decoder -->
  <a href="url-encoder-decoder.php" class="tool-card">
        <div class="tool-icon">🔗</div>
        <div class="tool-title">URL Encoder/Decoder</div>
        <div class="tool-description">Convert URLs to and from encoded format. Encode/decode special characters instantly.</div>
        <span class="tool-status">✓ Available</span>
      </a>

      <!-- QR Code Generator -->
  <a href="qr-code-generator.php" class="tool-card">
        <div class="tool-icon">📱</div>
        <div class="tool-title">QR Code Generator</div>
        <div class="tool-description">Create QR codes for URLs and text using QR Server API. Multiple sizes available.</div>
        <span class="tool-status">✓ Available</span>
      </a>

      <!-- Heading Structure Analyzer -->
  <a href="heading-structure-analyzer.php" class="tool-card">
        <div class="tool-icon">🏗️</div>
        <div class="tool-title">Heading Structure Analyzer</div>
        <div class="tool-description">Check H1-H6 heading hierarchy on webpages. Visual representation of heading structure.</div>
        <span class="tool-status">✓ Available</span>
      </a>

      <!-- Page Speed Insights -->
  <a href="page-speed-insights.php" class="tool-card">
        <div class="tool-icon">⚡</div>
        <div class="tool-title">Page Speed Insights</div>
        <div class="tool-description">Analyze website loading performance with simulated Core Web Vitals metrics.</div>
        <span class="tool-status">✓ Available</span>
      </a>

      <!-- Analytics & Tracking Tools -->
  <a href="google-analytics-detector.php" class="tool-card">
        <div class="tool-icon">📊</div>
        <div class="tool-title">Google Analytics Detector</div>
        <div class="tool-description">Detect GA4, Universal Analytics, and GTM tracking codes on websites.</div>
        <span class="tool-status">✓ Available</span>
      </a>

  <a href="facebook-pixel-checker.php" class="tool-card">
        <div class="tool-icon">📱</div>
        <div class="tool-title">Facebook Pixel Checker</div>
        <div class="tool-description">Verify if Facebook Pixel is installed and tracking correctly.</div>
        <span class="tool-status">✓ Available</span>
      </a>

  <a href="bulk-url-status-checker.php" class="tool-card">
        <div class="tool-icon">🔗</div>
        <div class="tool-title">Bulk URL Status Checker</div>
        <div class="tool-description">Check HTTP status codes for multiple URLs simultaneously.</div>
        <span class="tool-status">✓ Available</span>
      </a>

  <a href="cookie-scanner.php" class="tool-card">
        <div class="tool-icon">🍪</div>
        <div class="tool-title">Cookie Scanner</div>
        <div class="tool-description">Scan and list all cookies used by a website for compliance.</div>
        <span class="tool-status">✓ Available</span>
      </a>

      <!-- Security & Performance Tools -->
  <a href="http2-checker.php" class="tool-card">
        <div class="tool-icon">🚀</div>
        <div class="tool-title">HTTP/2 Checker</div>
        <div class="tool-description">Verify if a website supports HTTP/2 protocol for faster loading.</div>
        <span class="tool-status">✓ Available</span>
      </a>

  <a href="gzip-compression-test.php" class="tool-card">
        <div class="tool-icon">🗜️</div>
        <div class="tool-title">GZIP Compression Test</div>
        <div class="tool-description">Check if GZIP or Brotli compression is enabled on a website.</div>
        <span class="tool-status">✓ Available</span>
      </a>

  <a href="security-headers-checker.php" class="tool-card">
        <div class="tool-icon">🔒</div>
        <div class="tool-title">Security Headers Checker</div>
        <div class="tool-description">Analyze HTTP security headers like CSP, HSTS, and X-Frame-Options.</div>
        <span class="tool-status">✓ Available</span>
      </a>

  <a href="favicon-generator.php" class="tool-card">
        <div class="tool-icon">🎨</div>
        <div class="tool-title">Favicon Generator</div>
        <div class="tool-description">Create favicons in multiple sizes from your images using Canvas API.</div>
        <span class="tool-status">✓ Available</span>
      </a>

  <a href="lazy-load-tester.php" class="tool-card">
        <div class="tool-icon">⚡</div>
        <div class="tool-title">Lazy Load Tester</div>
        <div class="tool-description">Test if images use lazy loading for better performance optimization.</div>
        <span class="tool-status">✓ Available</span>
      </a>

      <!-- Social Media SEO Tools -->
  <a href="twitter-card-validator.php" class="tool-card">
        <div class="tool-icon">🐦</div>
        <div class="tool-title">Twitter Card Validator</div>
        <div class="tool-description">Validate Twitter Card meta tags and preview how your content appears.</div>
        <span class="tool-status">✓ Available</span>
      </a>

  <a href="pinterest-rich-pins.php" class="tool-card">
        <div class="tool-icon">📌</div>
        <div class="tool-title">Pinterest Rich Pins</div>
        <div class="tool-description">Check Pinterest Rich Pins metadata and preview your pins.</div>
        <span class="tool-status">✓ Available</span>
      </a>

  <a href="whatsapp-link-preview.php" class="tool-card">
        <div class="tool-icon">💬</div>
        <div class="tool-title">WhatsApp Link Preview</div>
        <div class="tool-description">Test how your links will appear when shared on WhatsApp.</div>
        <span class="tool-status">✓ Available</span>
      </a>

      <!-- Utility Tools -->
  <a href="ip-geolocation.php" class="tool-card">
        <div class="tool-icon">🌍</div>
        <div class="tool-title">IP Geolocation Lookup</div>
        <div class="tool-description">Find the geographic location of any website's server using ipapi.co.</div>
        <span class="tool-status">✓ Available</span>
      </a>

  <a href="whois-lookup.php" class="tool-card">
        <div class="tool-icon">🔍</div>
        <div class="tool-title">WHOIS Lookup</div>
        <div class="tool-description">Get domain registration and ownership information.</div>
        <span class="tool-status">✓ Available</span>
      </a>

  <a href="email-extractor.php" class="tool-card">
        <div class="tool-icon">📧</div>
        <div class="tool-title">Email Extractor</div>
        <div class="tool-description">Extract all email addresses from any webpage automatically.</div>
        <span class="tool-status">✓ Available</span>
      </a>

  <a href="image-alt-checker.php" class="tool-card">
        <div class="tool-icon">🖼️</div>
        <div class="tool-title">Image Alt Checker</div>
        <div class="tool-description">Verify alt text attributes for better SEO and accessibility.</div>
        <span class="tool-status">✓ Available</span>
      </a>

  <a href="redirect-chain-checker.php" class="tool-card">
        <div class="tool-icon">🔄</div>
        <div class="tool-title">Redirect Chain Checker</div>
        <div class="tool-description">Analyze URL redirect paths and detect redirect loops for SEO.</div>
        <span class="tool-status">✓ Available</span>
      </a>

  <a href="canonical-tag-checker.php" class="tool-card">
        <div class="tool-icon">🔗</div>
        <div class="tool-title">Canonical Tag Checker</div>
        <div class="tool-description">Verify canonical tags to prevent duplicate content issues.</div>
        <span class="tool-status">✓ Available</span>
      </a>

  <a href="hreflang-generator.php" class="tool-card">
        <div class="tool-icon">🌐</div>
        <div class="tool-title">Hreflang Generator</div>
        <div class="tool-description">Generate hreflang tags for multilingual and multi-regional websites.</div>
        <span class="tool-status">✓ Available</span>
      </a>

  <a href="schema-markup-validator.php" class="tool-card">
        <div class="tool-icon">📋</div>
        <div class="tool-title">Schema Markup Validator</div>
        <div class="tool-description">Detect and validate JSON-LD schema markup on webpages.</div>
        <span class="tool-status">✓ Available</span>
      </a>

  <a href="meta-description-generator.php" class="tool-card">
        <div class="tool-icon">📝</div>
        <div class="tool-title">Meta Description Generator</div>
        <div class="tool-description">Generate SEO-optimized meta descriptions with character count and templates.</div>
        <span class="tool-status">✓ Available</span>
      </a>

  <a href="seo-title-generator.php" class="tool-card">
        <div class="tool-icon">🏷️</div>
        <div class="tool-title">SEO Title Generator</div>
        <div class="tool-description">Create optimized page titles with keyword placement and length validation.</div>
        <span class="tool-status">✓ Available</span>
      </a>

  <a href="duplicate-content-checker.php" class="tool-card">
        <div class="tool-icon">🔍</div>
        <div class="tool-title">Duplicate Content Checker</div>
        <div class="tool-description">Compare text content to detect similarity and duplicates.</div>
        <span class="tool-status">✓ Available</span>
      </a>
    </div>

    <!--existing code-->
<?php include 'footer.php'; ?>
