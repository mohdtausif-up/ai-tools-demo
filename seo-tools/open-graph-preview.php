<?php
$page_title = 'Open Graph Preview Tool - Social Media Link Preview';
$page_description = 'Preview how your links will appear on Facebook, Twitter, LinkedIn, and other social media platforms.';
$breadcrumbs = [
    ['title' => 'Home', 'url' => 'index.php'],
    ['title' => 'Open Graph Preview', 'url' => '']
];
$page_css = 'open-graph-preview.css';
$page_js = 'open-graph-preview.js';
include 'header.php';
?>
<div class="container">
    
  <div class="d-flex justify-content-end mb-3" style="gap:1rem;">
    <button id="share-btn" class="btn btn-outline-secondary" title="Share this tool"><span>ðŸ”—</span> Share</button>
    <button id="fav-btn" class="btn btn-outline-warning" title="Add to Favourites"><span>â­</span> Add to Favourites</button>
  </div>
    <p class="subtitle">See how your links will appear on social media platforms</p>

    <div class="input-card">
      <div class="section-title">Open Graph Meta Tags</div>
      
      <div class="input-group">
        <label class="input-label">Title</label>
        <input type="text" class="input-field" id="ogTitle" value="Your Awesome Website" placeholder="Enter page title">
      </div>

      <div class="input-group">
        <label class="input-label">Description</label>
        <textarea class="input-field" id="ogDescription" placeholder="Enter page description">Discover amazing content and features on our website. Learn more about what we offer.</textarea>
      </div>

      <div class="input-group">
        <label class="input-label">Image URL</label>
        <input type="text" class="input-field" id="ogImage" value="https://via.placeholder.com/1200x630/4facfe/ffffff?text=Your+Image" placeholder="https://example.com/image.jpg">
      </div>

      <div class="input-group">
        <label class="input-label">URL</label>
        <input type="text" class="input-field" id="ogUrl" value="https://example.com" placeholder="https://example.com">
      </div>

      <button class="generate-btn" onclick="updatePreviews()">🔄 Update Previews</button>
    </div>

    <div class="preview-section">
      <div class="preview-card">
        <div class="platform-title">📘 Facebook Preview</div>
        <div class="fb-preview">
          <div class="fb-image" id="fbImage">Preview Image</div>
          <div class="fb-content">
            <div class="fb-url" id="fbUrl">EXAMPLE.COM</div>
            <div class="fb-title" id="fbTitle">Your Awesome Website</div>
            <div class="fb-description" id="fbDescription">Discover amazing content and features on our website. Learn more about what we offer.</div>
          </div>
        </div>
      </div>

      <div class="preview-card">
        <div class="platform-title">🐦 Twitter Card Preview</div>
        <div class="twitter-preview">
          <div class="twitter-image" id="twitterImage">Preview Image</div>
          <div class="twitter-content">
            <div class="twitter-title" id="twitterTitle">Your Awesome Website</div>
            <div class="twitter-description" id="twitterDescription">Discover amazing content and features on our website. Learn more about what we offer.</div>
            <div class="twitter-url" id="twitterUrl">example.com</div>
          </div>
        </div>
      </div>

      <div class="preview-card">
        <div class="platform-title">💼 LinkedIn Preview</div>
        <div class="linkedin-preview">
          <div class="linkedin-image" id="linkedinImage">Preview Image</div>
          <div class="linkedin-content">
            <div class="linkedin-title" id="linkedinTitle">Your Awesome Website</div>
            <div class="linkedin-url" id="linkedinUrl">example.com</div>
          </div>
        </div>
      </div>
    </div>
  </div>
<?php include 'footer.php'; ?>

