<?php 
$page_title = 'Contrast Checker - WCAG Accessibility Compliance';
$page_description = 'Check color contrast ratios for WCAG 2.1 accessibility compliance. Test foreground and background color combinations.';
$breadcrumbs = [
  ['title' => 'Contrast Checker', 'url' => '']
];
include 'header.php'; 
?>

<div class="main-content">
<div class="container">
    
  <div class="d-flex justify-content-end mb-3" style="gap:1rem;">
    <button id="share-btn" class="btn btn-outline-secondary" title="Share this tool"><span>ðŸ”—</span> Share</button>
    <button id="fav-btn" class="btn btn-outline-warning" title="Add to Favourites"><span>â­</span> Add to Favourites</button>
  </div>
    
    <div class="controls">
      <div class="color-inputs">
        <div class="input-group">
          <label for="fgColor">Foreground (Text)</label>
          <input type="color" id="fgColor" value="#000000">
          <input type="text" id="fgText" value="#000000">
        </div>
        <div class="input-group">
          <label for="bgColor">Background</label>
          <input type="color" id="bgColor" value="#ffffff">
          <input type="text" id="bgText" value="#ffffff">
        </div>
      </div>
    </div>
    
    <div class="preview-area">
      <div class="preview-title">Preview</div>
      <div class="preview-box" id="previewBox">
        <div class="preview-large" id="previewLarge">Large Text Sample</div>
        <div class="preview-normal" id="previewNormal">Normal text sample for accessibility testing</div>
        <div class="preview-small" id="previewSmall">Small text sample</div>
      </div>
    </div>
    
    <div class="results">
      <div class="result-title">WCAG 2.1 Compliance Results</div>
      
      <div class="ratio-display">
        <div class="ratio-value" id="ratioValue">21:1</div>
        <div class="ratio-label">Contrast Ratio</div>
      </div>
      
      <div class="wcag-grid">
        <div class="wcag-card">
          <div class="wcag-level">WCAG AA</div>
          <div class="check-item">
            <span class="check-label">Normal Text</span>
            <span class="check-status" id="aaNormal"></span>
          </div>
          <div class="check-item">
            <span class="check-label">Large Text (18pt+)</span>
            <span class="check-status" id="aaLarge"></span>
          </div>
          <div class="check-item">
            <span class="check-label">UI Components</span>
            <span class="check-status" id="aaUi"></span>
          </div>
        </div>
        
        <div class="wcag-card">
          <div class="wcag-level">WCAG AAA</div>
          <div class="check-item">
            <span class="check-label">Normal Text</span>
            <span class="check-status" id="aaaNormal"></span>
          </div>
          <div class="check-item">
            <span class="check-label">Large Text (18pt+)</span>
            <span class="check-status" id="aaaLarge"></span>
          </div>
          <div class="check-item">
            <span class="check-label">UI Components</span>
            <span class="check-status" id="aaaUi"></span>
          </div>
        </div>
      </div>
    </div>
  </div>
  
  
</div>





<?php include 'footer.php'; ?>



