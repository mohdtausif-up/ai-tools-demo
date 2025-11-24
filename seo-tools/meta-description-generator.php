<?php
$page_title = 'Meta Description Generator - AI-Powered SEO Descriptions';
$page_description = 'Generate SEO-optimized meta descriptions with character count and best practices.';
$breadcrumbs = [
    ['title' => 'Home', 'url' => 'index.php'],
    ['title' => 'Meta Description Generator', 'url' => '']
];
$page_css = 'meta-description-generator.css';
$page_js = 'meta-description-generator.js';
include 'header.php';
?>
<div class="container">
    
  <div class="d-flex justify-content-end mb-3" style="gap:1rem;">
    <button id="share-btn" class="btn btn-outline-secondary" title="Share this tool"><span>ðŸ”—</span> Share</button>
    <button id="fav-btn" class="btn btn-outline-warning" title="Add to Favourites"><span>â­</span> Add to Favourites</button>
  </div>
    <p class="subtitle">Generate SEO-optimized meta descriptions with best practices</p>

    <div class="input-card">
      <div class="input-group">
        <div class="input-label">Page Title or Topic</div>
        <input type="text" class="input-field" id="titleInput" placeholder="E.g., Best SEO Tools for 2024">
      </div>
      
      <div class="input-group">
        <div class="input-label">Key Points (Optional)</div>
        <textarea class="textarea-field" id="pointsInput" placeholder="List main points or keywords you want to include..."></textarea>
      </div>
      
      <button class="generate-btn" onclick="generateDescription()">✨ Generate Meta Description</button>
    </div>

    <div class="results-card" id="resultsCard" style="display: none;">
      <div class="section-title">Generated Meta Descriptions</div>
      
      <div id="outputList"></div>
      
      <div class="tips-box">
        <strong>💡 Meta Description Best Practices:</strong>
        <ul>
          <li>Keep between 150-160 characters for optimal display</li>
          <li>Include primary keyword naturally</li>
          <li>Write compelling copy that encourages clicks</li>
          <li>Accurately describe page content</li>
          <li>Include a call-to-action when appropriate</li>
        </ul>
      </div>
    </div>
  </div>
<?php include 'footer.php'; ?>

