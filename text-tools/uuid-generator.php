<?php
$page_title = 'UUID Generator - Generate UUIDs v4';
$page_description = 'Generate random UUIDs (Universally Unique Identifiers).';
$breadcrumbs = [
    ['title' => 'Home', 'url' => 'index.php'],
    ['title' => 'Uuid Generator', 'url' => '']
];
$page_css = 'uuid-generator.css';
$page_js = 'uuid-generator.js';
include 'header.php';
?>
<div class="container">
    
  <div class="d-flex justify-content-end mb-3" style="gap:1rem;">
    <button id="share-btn" class="btn btn-outline-secondary" title="Share this tool"><span>ðŸ”—</span> Share</button>
    <button id="fav-btn" class="btn btn-outline-warning" title="Add to Favourites"><span>â­</span> Add to Favourites</button>
  </div>
    <p class="subtitle">Generate UUIDs v4 (Universally Unique Identifiers)</p>

    <div class="card">
      <div class="settings-group">
        <label class="setting-label">Number of UUIDs to Generate:</label>
        <input type="number" class="number-input" id="countInput" value="10" min="1" max="1000">
      </div>
      
      <div class="button-row">
        <button class="action-btn" onclick="generateUUIDs()">🎲 Generate UUIDs</button>
        <button class="action-btn" onclick="clearUUIDs()">🗑️ Clear All</button>
      </div>
      
      <div class="uuid-list" id="uuidList"></div>
      
      <div class="bulk-actions" id="bulkActions" style="display: none;">
        <button class="bulk-btn" onclick="copyAllUUIDs()">📋 Copy All</button>
        <button class="bulk-btn" onclick="downloadUUIDs()">💾 Download</button>
      </div>
    </div>
  </div>
<?php include 'footer.php'; ?>

<!-- SEO JSON-LD Schema -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "WebTool",
  "name": "UUID Generator",
  "description": "Generate random UUIDs (Universally Unique Identifiers).",
  "url": "https://yourdomain.com/text-tools/uuid-generator.php"
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
      "name": "What is a UUID?",
      "acceptedAnswer": {"@type": "Answer", "text": "A UUID is a 128-bit number used to uniquely identify information in computer systems."}
    },
    {
      "@type": "Question",
      "name": "How do I generate a UUID?",
      "acceptedAnswer": {"@type": "Answer", "text": "Click 'Generate UUIDs' to create new unique identifiers."}
    }
  ]
}
</script>

<div class="how-to-use">
  <h2>How to Use</h2>
  <ol>
    <li>Set the number of UUIDs to generate.</li>
    <li>Click 'Generate UUIDs' to create new identifiers.</li>
    <li>Copy or download the generated UUIDs as needed.</li>
  </ol>
</div>
<div class="faq-section">
  <h2>Frequently Asked Questions</h2>
  <div class="faq-item">
    <strong>What is a UUID?</strong>
    <p>A UUID is a 128-bit number used to uniquely identify information in computer systems.</p>
  </div>
  <div class="faq-item">
    <strong>How do I generate a UUID?</strong>
    <p>Click 'Generate UUIDs' to create new unique identifiers.</p>
  </div>
</div>

