<?php 
$page_title = 'Color Name Finder - Match HEX to Color Names';
$page_description = 'Find the closest color name for any HEX code. Matches with CSS named colors and common color names.';
$breadcrumbs = [
  ['title' => 'Color Name Finder', 'url' => '']
];
include 'header.php'; 
?>

<div class="main-content">
<div class="container">
    
  <div class="d-flex justify-content-end mb-3" style="gap:1rem;">
    <button id="share-btn" class="btn btn-outline-secondary" title="Share this tool"><span>ðŸ”—</span> Share</button>
    <button id="fav-btn" class="btn btn-outline-warning" title="Add to Favourites"><span>â­</span> Add to Favourites</button>
  </div>
    
    <div class="search-panel">
      <label for="colorPicker">Pick or Enter a Color</label>
      <input type="color" id="colorPicker" value="#667eea">
      <br>
      <input type="text" class="hex-input" id="hexInput" value="#667eea" placeholder="#000000">
    </div>
    
    <div class="result-section">
      <div class="result-title">Best Match</div>
      <div class="best-match" id="bestMatch">
        <div class="match-name" id="matchName">Slate Blue</div>
        <div class="match-hex" id="matchHex">#6B7AED</div>
      </div>
      
      <div class="result-title">Similar Colors</div>
      <div class="similar-grid" id="similarGrid"></div>
    </div>
    
    <div class="css-colors-section">
      <div class="section-title">All CSS Named Colors</div>
      <div class="similar-grid" id="allColorsGrid"></div>
    </div>
  </div>
  
  <div class="toast" id="toast">Copied to clipboard!</div>
  
  
</div>





<?php include 'footer.php'; ?>



