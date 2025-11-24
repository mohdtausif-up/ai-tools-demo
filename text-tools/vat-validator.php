<?php
$page_title = 'VAT Number Validator - EU VAT Validation';
$page_description = 'Validate EU VAT numbers by country format.';
$breadcrumbs = [
    ['title' => 'Home', 'url' => 'index.php'],
    ['title' => 'Vat Validator', 'url' => '']
];
$page_css = 'vat-validator.css';
$page_js = 'vat-validator.js';
include 'header.php';
?>
<div class="container">
    
  <div class="d-flex justify-content-end mb-3" style="gap:1rem;">
    <button id="share-btn" class="btn btn-outline-secondary" title="Share this tool"><span>ðŸ”—</span> Share</button>
    <button id="fav-btn" class="btn btn-outline-warning" title="Add to Favourites"><span>â­</span> Add to Favourites</button>
  </div>
    <p class="subtitle">Validate EU VAT numbers by format</p>

    <div class="card">
      <div class="card-title">📝 Enter VAT Number</div>
      <input type="text" class="input-field" id="vatInput" placeholder="e.g., GB123456789">
      
      <select class="select-field" id="countrySelect">
        <option value="">Auto-detect Country</option>
        <option value="GB">United Kingdom (GB)</option>
        <option value="DE">Germany (DE)</option>
        <option value="FR">France (FR)</option>
        <option value="IT">Italy (IT)</option>
        <option value="ES">Spain (ES)</option>
        <option value="NL">Netherlands (NL)</option>
        <option value="BE">Belgium (BE)</option>
        <option value="AT">Austria (AT)</option>
        <option value="PL">Poland (PL)</option>
        <option value="SE">Sweden (SE)</option>
      </select>
      
      <button class="action-btn" onclick="validateVAT()">✓ Validate VAT Number</button>
    </div>

    <div class="card" id="resultsCard" style="display: none;">
      <div class="result-box">
        <div class="result-icon" id="resultIcon">✓</div>
        <div class="result-status" id="resultStatus">Valid VAT</div>
      </div>
      
      <div class="info-grid">
        <div class="info-box">
          <div class="info-label">Country</div>
          <div class="info-value" id="country">-</div>
        </div>
        <div class="info-box">
          <div class="info-label">Format</div>
          <div class="info-value" id="format">-</div>
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
  "name": "VAT Number Validator",
  "description": "Validate EU VAT numbers by country format.",
  "url": "https://yourdomain.com/text-tools/vat-validator.php"
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
      "name": "What is a VAT number?",
      "acceptedAnswer": {"@type": "Answer", "text": "A VAT number is a unique identifier for businesses registered for Value Added Tax in the EU."}
    },
    {
      "@type": "Question",
      "name": "How do I validate a VAT number?",
      "acceptedAnswer": {"@type": "Answer", "text": "Enter the VAT number and click 'Validate' to check its validity."}
    }
  ]
}
</script>

<div class="how-to-use">
  <h2>How to Use</h2>
  <ol>
    <li>Enter the VAT number in the input box.</li>
    <li>Select the country or use auto-detect.</li>
    <li>Click 'Validate' to check if the VAT number is valid.</li>
    <li>Review the result and copy if needed.</li>
  </ol>
</div>
<div class="faq-section">
  <h2>Frequently Asked Questions</h2>
  <div class="faq-item">
    <strong>What is a VAT number?</strong>
    <p>A VAT number is a unique identifier for businesses registered for Value Added Tax in the EU.</p>
  </div>
  <div class="faq-item">
    <strong>How do I validate a VAT number?</strong>
    <p>Enter the VAT number and click 'Validate' to check its validity.</p>
  </div>
</div>

