<?php
$page_title = 'Password Generator - Secure Random Password Creator';
$page_description = 'Generate secure random passwords with custom options.';
$breadcrumbs = [
    ['title' => 'Home', 'url' => 'index.php'],
    ['title' => 'Password Generator', 'url' => '']
];
$page_css = 'password-generator.css';
$page_js = 'password-generator.js';
include 'header.php';
?>
<div class="container">
    
  <div class="d-flex justify-content-end mb-3" style="gap:1rem;">
    <button id="share-btn" class="btn btn-outline-secondary" title="Share this tool"><span>ðŸ”—</span> Share</button>
    <button id="fav-btn" class="btn btn-outline-warning" title="Add to Favourites"><span>â­</span> Add to Favourites</button>
  </div>
    <p class="subtitle">Generate secure random passwords</p>

    <div class="card">
      <div class="password-display" id="passwordDisplay">Click Generate to create password</div>
      
      <div class="button-row">
        <button class="action-btn" onclick="generatePassword()">🎲 Generate Password</button>
        <button class="action-btn copy-btn" onclick="copyPassword()">📋 Copy Password</button>
      </div>
      
      <div class="option-group">
        <label class="option-label">Password Length: <span id="lengthValue">16</span></label>
        <div class="slider-container">
          <input type="range" min="8" max="64" value="16" class="slider" id="lengthSlider" oninput="updateLength()">
        </div>
      </div>
      
      <div class="option-group">
        <label class="option-label">Include Characters:</label>
        <div class="checkbox-grid">
          <label class="checkbox-label">
            <input type="checkbox" id="includeUppercase" checked>
            Uppercase (A-Z)
          </label>
          <label class="checkbox-label">
            <input type="checkbox" id="includeLowercase" checked>
            Lowercase (a-z)
          </label>
          <label class="checkbox-label">
            <input type="checkbox" id="includeNumbers" checked>
            Numbers (0-9)
          </label>
          <label class="checkbox-label">
            <input type="checkbox" id="includeSymbols" checked>
            Symbols (!@#$...)
          </label>
        </div>
      </div>
      
      <div class="option-group">
        <label class="checkbox-label">
          <input type="checkbox" id="excludeAmbiguous">
          Exclude ambiguous characters (0, O, l, I)
        </label>
      </div>
      
      <div id="strengthIndicator">
        <div class="strength-bar" id="strengthBar"></div>
        <div class="strength-label" id="strengthLabel"></div>
      </div>
    </div>
  </div>
<?php include 'footer.php'; ?>

