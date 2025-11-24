<?php
$page_title = 'Username Generator - Create Unique Usernames';
$page_description = 'Generate random unique usernames for accounts and profiles.';
$breadcrumbs = [
    ['title' => 'Home', 'url' => 'index.php'],
    ['title' => 'Username Generator', 'url' => '']
];
$page_css = 'username-generator.css';
$page_js = 'username-generator.js';
include 'header.php';
?>
<div class="container">
    
  <div class="d-flex justify-content-end mb-3" style="gap:1rem;">
    <button id="share-btn" class="btn btn-outline-secondary" title="Share this tool"><span>ðŸ”—</span> Share</button>
    <button id="fav-btn" class="btn btn-outline-warning" title="Add to Favourites"><span>â­</span> Add to Favourites</button>
  </div>
    <p class="subtitle">Generate unique and creative usernames</p>

    <div class="card">
      <div class="input-group">
        <label class="input-label">Base Word (Optional):</label>
        <input type="text" class="input-field" id="baseWord" placeholder="e.g., ninja, pro, master...">
      </div>
      
      <div class="options-grid">
        <label class="checkbox-label">
          <input type="checkbox" id="addNumbers" checked>
          Add Numbers
        </label>
        <label class="checkbox-label">
          <input type="checkbox" id="addAdjective" checked>
          Add Adjective
        </label>
        <label class="checkbox-label">
          <input type="checkbox" id="addUnderscore">
          Use Underscores
        </label>
        <label class="checkbox-label">
          <input type="checkbox" id="capitalize">
          Capitalize Words
        </label>
      </div>
      
      <button class="action-btn" onclick="generateUsernames()">🎲 Generate Usernames (10)</button>
      
      <div class="username-list" id="usernameList"></div>
    </div>
  </div>
<?php include 'footer.php'; ?>

