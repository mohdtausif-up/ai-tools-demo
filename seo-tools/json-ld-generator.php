<?php
$page_title = 'JSON-LD Generator - Structured Data for SEO';
$page_description = 'Generate JSON-LD structured data markup for better SEO and rich snippets in search results.';
$breadcrumbs = [
    ['title' => 'Home', 'url' => 'index.php'],
    ['title' => 'Json Ld Generator', 'url' => '']
];
$page_css = 'json-ld-generator.css';
$page_js = 'json-ld-generator.js';
include 'header.php';
?>
<div class="container">
    
  <div class="d-flex justify-content-end mb-3" style="gap:1rem;">
    <button id="share-btn" class="btn btn-outline-secondary" title="Share this tool"><span>ðŸ”—</span> Share</button>
    <button id="fav-btn" class="btn btn-outline-warning" title="Add to Favourites"><span>â­</span> Add to Favourites</button>
  </div>
    <p class="subtitle">Generate structured data markup for better SEO and rich snippets</p>

    <div class="main-grid">
      <div class="input-card">
        <div class="section-title">Select Schema Type</div>
        <div class="schema-selector">
          <button class="schema-btn active" data-schema="organization" onclick="selectSchema('organization')">
            <div class="schema-icon">🏢</div>
            <div class="schema-name">Organization</div>
          </button>
          <button class="schema-btn" data-schema="article" onclick="selectSchema('article')">
            <div class="schema-icon">📝</div>
            <div class="schema-name">Article</div>
          </button>
          <button class="schema-btn" data-schema="product" onclick="selectSchema('product')">
            <div class="schema-icon">🛍️</div>
            <div class="schema-name">Product</div>
          </button>
          <button class="schema-btn" data-schema="person" onclick="selectSchema('person')">
            <div class="schema-icon">👤</div>
            <div class="schema-name">Person</div>
          </button>
          <button class="schema-btn" data-schema="event" onclick="selectSchema('event')">
            <div class="schema-icon">📅</div>
            <div class="schema-name">Event</div>
          </button>
          <button class="schema-btn" data-schema="recipe" onclick="selectSchema('recipe')">
            <div class="schema-icon">🍳</div>
            <div class="schema-name">Recipe</div>
          </button>
        </div>

        <div class="section-title">Schema Fields</div>
        <div id="schemaFields"></div>
      </div>

      <div class="output-card">
        <div class="section-title">Generated JSON-LD</div>
        <div class="output-section">
          <pre id="jsonldOutput"></pre>
        </div>
        <button class="copy-btn" onclick="copyJsonLd()">📋 Copy to Clipboard</button>
        <button class="download-btn" onclick="downloadJsonLd()">⬇️ Download JSON-LD</button>
      </div>
    </div>
  </div>
<?php include 'footer.php'; ?>

