<?php
$page_title = 'SEO Title Generator - Create Optimized Page Titles';
$page_description = 'Generate SEO-optimized page titles with character count and best practices.';
$breadcrumbs = [
    ['title' => 'Home', 'url' => 'index.php'],
    ['title' => 'Seo Title Generator', 'url' => '']
];
$page_css = 'seo-title-generator.css';
$page_js = 'seo-title-generator.js';
include 'header.php';
?>
<div class="container">
    
  <div class="d-flex justify-content-end mb-3" style="gap:1rem;">
    <button id="share-btn" class="btn btn-outline-secondary" title="Share this tool"><span>ðŸ”—</span> Share</button>
    <button id="fav-btn" class="btn btn-outline-warning" title="Add to Favourites"><span>â­</span> Add to Favourites</button>
  </div>
    <p class="subtitle">Create SEO-optimized page titles that rank and convert</p>

    <div class="input-card">
      <div class="input-group">
        <div class="input-label">Main Topic/Keyword</div>
        <input type="text" class="input-field" id="keywordInput" placeholder="E.g., SEO Tools">
      </div>
      
      <div class="input-group">
        <div class="input-label">Brand Name (Optional)</div>
        <input type="text" class="input-field" id="brandInput" placeholder="E.g., YourBrand">
      </div>
      
      <div class="input-group">
        <div class="input-label">Modifier (Optional)</div>
        <input type="text" class="input-field" id="modifierInput" placeholder="E.g., 2024, Best, Free, Guide">
      </div>
      
      <button class="generate-btn" onclick="generateTitles()">✨ Generate Title Tags</button>
    </div>

    <div class="results-card" id="resultsCard" style="display: none;">
      <div class="section-title">Generated Title Tags</div>
      
      <div id="outputList"></div>
      
      <div class="tips-box">
        <strong>💡 Title Tag Best Practices:</strong>
        <ul>
          <li>Keep between 50-60 characters (Google shows ~600px)</li>
          <li>Include primary keyword near the beginning</li>
          <li>Add brand name at the end (if space permits)</li>
          <li>Use power words and numbers when relevant</li>
          <li>Make it compelling and click-worthy</li>
        </ul>
      </div>
    </div>
  </div>
<?php include 'footer.php'; ?>

