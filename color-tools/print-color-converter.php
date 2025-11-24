<?php 
$page_title = 'Print Color Converter (CMYK) - Professional CMYK Color Conversion';
$page_description = 'Convert RGB/HEX to CMYK for print with color profiles and gamut warnings.';
$breadcrumbs = [
  ['title' => 'Print Color Converter', 'url' => '']
];
include 'header.php'; 
?>

<div class="main-content">
<div class="container">
    
  <div class="d-flex justify-content-end mb-3" style="gap:1rem;">
    <button id="share-btn" class="btn btn-outline-secondary" title="Share this tool"><span>ðŸ”—</span> Share</button>
    <button id="fav-btn" class="btn btn-outline-warning" title="Add to Favourites"><span>â­</span> Add to Favourites</button>
  </div>
    <div class="subtitle">Professional RGB to CMYK conversion for print design</div>
    
    <div class="converter-section">
      <div class="profile-selector">
        <div class="label">Print Profile</div>
        <select id="printProfile" onchange="convertColor()">
          <option value="coated">Coated Paper (Magazine Quality)</option>
          <option value="uncoated">Uncoated Paper (Newsprint)</option>
          <option value="web">Web Offset (Newspapers)</option>
          <option value="sheet">Sheet Fed (High Quality)</option>
        </select>
      </div>
      
      <div class="input-section">
        <div class="color-preview" id="colorPreview"></div>
        
        <div class="input-controls">
          <div>
            <div class="label">Pick a Color</div>
            <input type="color" id="colorPicker" value="#667eea">
          </div>
          
          <div>
            <div class="label">Or Enter HEX</div>
            <input type="text" id="hexInput" placeholder="#667eea" value="#667eea">
          </div>
          
          <div class="label" style="margin-top: 10px;">Or Enter RGB Values</div>
          <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px;">
            <input type="number" id="rInput" placeholder="R" min="0" max="255" value="102">
            <input type="number" id="gInput" placeholder="G" min="0" max="255" value="126">
            <input type="number" id="bInput" placeholder="B" min="0" max="255" value="234">
          </div>
        </div>
      </div>
      
      <div class="results-grid">
        <div class="result-card">
          <div class="result-title">🖨️ CMYK Values</div>
          <div class="value-row">
            <span class="value-label">Cyan (C)</span>
            <span class="value-data" id="cValue">0%</span>
          </div>
          <div class="value-row">
            <span class="value-label">Magenta (M)</span>
            <span class="value-data" id="mValue">0%</span>
          </div>
          <div class="value-row">
            <span class="value-label">Yellow (Y)</span>
            <span class="value-data" id="yValue">0%</span>
          </div>
          <div class="value-row">
            <span class="value-label">Black (K)</span>
            <span class="value-data" id="kValue">0%</span>
          </div>
        </div>
        
        <div class="result-card">
          <div class="result-title">📱 Digital Values</div>
          <div class="value-row">
            <span class="value-label">HEX</span>
            <span class="value-data" id="hexValue" style="cursor: pointer;" onclick="copy(this.textContent)">#667eea</span>
          </div>
          <div class="value-row">
            <span class="value-label">RGB</span>
            <span class="value-data" id="rgbValue">rgb(102, 126, 234)</span>
          </div>
          <div class="value-row">
            <span class="value-label">HSL</span>
            <span class="value-data" id="hslValue">hsl(229, 76%, 66%)</span>
          </div>
        </div>
        
        <div class="result-card">
          <div class="result-title">📊 Print Info</div>
          <div class="value-row">
            <span class="value-label">Total Ink</span>
            <span class="value-data" id="totalInk">0%</span>
          </div>
          <div class="value-row">
            <span class="value-label">Profile</span>
            <span class="value-data" id="profileName">Coated</span>
          </div>
          <div class="value-row">
            <span class="value-label">Gamut Status</span>
            <span class="value-data" id="gamutStatus">✓ In Gamut</span>
          </div>
        </div>
      </div>
      
      <div class="warning-box" id="warningBox">
        <div class="warning-title">⚠️ Gamut Warning</div>
        <div class="warning-text">This color may not reproduce accurately in CMYK print. Consider using a color closer to the CMYK gamut for better results.</div>
      </div>
      
      <div class="info-box">
        <div class="info-title">💡 Print Tips</div>
        <div class="info-text">
          • <strong>Total Ink Limit:</strong> Most printers recommend staying below 280-320% total ink coverage<br>
          • <strong>Rich Black:</strong> For deep blacks, use C:60 M:40 Y:40 K:100 instead of pure K:100<br>
          • <strong>Color Profiles:</strong> Always consult with your printer about their preferred color profile<br>
          • <strong>Proofing:</strong> Request a physical proof before final print run
        </div>
      </div>
    </div>
  </div>
  
  <div class="toast" id="toast">Copied to clipboard!</div>
  
  
</div>





<?php include 'footer.php'; ?>



