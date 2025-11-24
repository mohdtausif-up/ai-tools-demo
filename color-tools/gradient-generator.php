<?php 
$page_title = 'Gradient Generator - Create CSS Gradients';
$page_description = 'Create beautiful linear and radial gradients with live preview. Export CSS code instantly for your web projects.';
$breadcrumbs = [
  ['title' => 'Gradient Generator', 'url' => '']
];
include 'header.php'; 
?>

<div class="main-content">
<div class="container">
    
  <div class="d-flex justify-content-end mb-3" style="gap:1rem;">
    <button id="share-btn" class="btn btn-outline-secondary" title="Share this tool"><span>ðŸ”—</span> Share</button>
    <button id="fav-btn" class="btn btn-outline-warning" title="Add to Favourites"><span>â­</span> Add to Favourites</button>
  </div>
    
    <div class="main-grid">
      <div class="preview-section">
        <div class="gradient-preview" id="gradientPreview"></div>
      </div>
      
      <div class="controls-section">
        <div class="control-group">
          <label>Gradient Type</label>
          <select id="gradientType">
            <option value="linear">Linear</option>
            <option value="radial">Radial</option>
          </select>
        </div>
        
        <div class="control-group" id="angleGroup">
          <label>Angle: <span id="angleValue">90</span>°</label>
          <input type="range" id="angleInput" min="0" max="360" value="90">
        </div>
        
        <div class="control-group" id="shapeGroup" style="display: none;">
          <label>Shape</label>
          <select id="shapeInput">
            <option value="circle">Circle</option>
            <option value="ellipse">Ellipse</option>
          </select>
        </div>
        
        <div class="control-group">
          <label>Color Stops</label>
          <div class="color-stops" id="colorStops"></div>
          <button class="add-stop-btn" onclick="addColorStop()">+ Add Color Stop</button>
        </div>
        
        <div class="code-section">
          <div class="code-title">CSS Code</div>
          <div class="code-box" id="cssCode"></div>
          <button class="copy-btn" onclick="copyCss()">Copy CSS</button>
        </div>
      </div>
    </div>
  </div>
  
  
</div>

<!-- SEO Meta Tags -->
<meta property="og:title" content="Gradient Generator - Create CSS Gradients | Color Tools">
<meta property="og:description" content="Create beautiful linear and radial gradients with live preview. Export CSS code instantly for your web projects.">
<meta property="og:type" content="website">
<meta property="og:url" content="https://yourdomain.com/color-tools/gradient-generator.php">
<meta property="og:image" content="https://yourdomain.com/assets/img/gradient-generator-og.png">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="Gradient Generator - Create CSS Gradients | Color Tools">
<meta name="twitter:description" content="Create beautiful linear and radial gradients with live preview. Export CSS code instantly for your web projects.">
<meta name="twitter:image" content="https://yourdomain.com/assets/img/gradient-generator-og.png">
<link rel="canonical" href="https://yourdomain.com/color-tools/gradient-generator.php">

<!-- JSON-LD Schema for Tool -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Gradient Generator Tool",
  "url": "https://yourdomain.com/color-tools/gradient-generator.php",
  "description": "Create beautiful linear and radial gradients with live preview. Export CSS code instantly for your web projects.",
  "applicationCategory": "Productivity",
  "operatingSystem": "All",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  }
}
</script>

<!-- How to Use Section -->
<section class="mt-5">
  <h2>How to Use</h2>
  <ol>
    <li>Select gradient type (linear or radial).</li>
    <li>Adjust color stops and preview the gradient.</li>
    <li>Copy the CSS code for your project.</li>
    <li>Use the Share or Add to Favourites buttons for quick access.</li>
  </ol>
</section>

<!-- FAQ Section -->
<section class="mt-5">
  <h2>Frequently Asked Questions (FAQ)</h2>
  <div class="faq-list">
    <h3>How do I create a gradient?</h3>
    <p>Choose the gradient type, add color stops, and adjust their positions. The preview updates live and you can copy the CSS code instantly.</p>
    <h3>Can I use this tool for radial gradients?</h3>
    <p>Yes, select 'Radial' from the gradient type dropdown and adjust the shape and color stops as needed.</p>
    <h3>How do I add a tool to favourites?</h3>
    <p>Click the <span>⭐</span> Add to Favourites button above the form.</p>
  </div>
</section>

<!-- FAQ JSON-LD Schema -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How do I create a gradient?",
      "acceptedAnswer": { "@type": "Answer", "text": "Choose the gradient type, add color stops, and adjust their positions. The preview updates live and you can copy the CSS code instantly." }
    },
    {
      "@type": "Question",
      "name": "Can I use this tool for radial gradients?",
      "acceptedAnswer": { "@type": "Answer", "text": "Yes, select 'Radial' from the gradient type dropdown and adjust the shape and color stops as needed." }
    },
    {
      "@type": "Question",
      "name": "How do I add a tool to favourites?",
      "acceptedAnswer": { "@type": "Answer", "text": "Click the ⭐ Add to Favourites button above the form." }
    }
  ]
}
</script>

<?php include 'footer.php'; ?>



