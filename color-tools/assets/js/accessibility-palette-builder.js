function hexToRgb(hex) {
      const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
      } : null;
    }
    
    function rgbToHex(r, g, b) {
      const toHex = x => {
        const hex = Math.round(Math.max(0, Math.min(255, x))).toString(16);
        return hex.length === 1 ? '0' + hex : hex;
      };
      return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
    }
    
    function getLuminance(r, g, b) {
      const [rs, gs, bs] = [r, g, b].map(c => {
        c = c / 255;
        return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
      });
      return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
    }
    
    function getContrastRatio(hex1, hex2) {
      const rgb1 = hexToRgb(hex1);
      const rgb2 = hexToRgb(hex2);
      const lum1 = getLuminance(rgb1.r, rgb1.g, rgb1.b);
      const lum2 = getLuminance(rgb2.r, rgb2.g, rgb2.b);
      const lighter = Math.max(lum1, lum2);
      const darker = Math.min(lum1, lum2);
      return (lighter + 0.05) / (darker + 0.05);
    }
    
    function adjustForContrast(baseHex, bgHex, targetRatio) {
      const baseRgb = hexToRgb(baseHex);
      let bestHex = baseHex;
      let bestRatio = getContrastRatio(baseHex, bgHex);
      
      // Try adjusting lightness
      for (let adjustment = -200; adjustment <= 200; adjustment += 10) {
        const r = Math.max(0, Math.min(255, baseRgb.r + adjustment));
        const g = Math.max(0, Math.min(255, baseRgb.g + adjustment));
        const b = Math.max(0, Math.min(255, baseRgb.b + adjustment));
        const testHex = rgbToHex(r, g, b);
        const ratio = getContrastRatio(testHex, bgHex);
        
        if (ratio >= targetRatio && Math.abs(ratio - targetRatio) < Math.abs(bestRatio - targetRatio)) {
          bestHex = testHex;
          bestRatio = ratio;
        }
      }
      
      return { hex: bestHex, ratio: bestRatio };
    }
    
    function generatePalette() {
      const baseColor = document.getElementById('baseColor').value;
      const bgType = document.getElementById('bgType').value;
      const level = document.getElementById('complianceLevel').value;
      
      const backgrounds = bgType === 'both' ? ['#FFFFFF', '#000000'] : 
                         bgType === 'white' ? ['#FFFFFF'] : ['#000000'];
      
      const targetRatios = {
        'AA': { normal: 4.5, large: 3.0 },
        'AAA': { normal: 7.0, large: 4.5 }
      };
      
      const palette = [];
      
      backgrounds.forEach(bg => {
        // Original color
        const originalRatio = getContrastRatio(baseColor, bg);
        palette.push({
          name: bg === '#FFFFFF' ? 'On White' : 'On Black',
          color: baseColor,
          background: bg,
          ratio: originalRatio,
          original: true
        });
        
        // Adjusted for AA Normal
        const aaNormal = adjustForContrast(baseColor, bg, targetRatios[level].normal);
        palette.push({
          name: `${level} Normal Text`,
          color: aaNormal.hex,
          background: bg,
          ratio: aaNormal.ratio,
          target: targetRatios[level].normal
        });
        
        // Adjusted for Large Text
        const aaLarge = adjustForContrast(baseColor, bg, targetRatios[level].large);
        palette.push({
          name: `${level} Large Text`,
          color: aaLarge.hex,
          background: bg,
          ratio: aaLarge.ratio,
          target: targetRatios[level].large
        });
      });
      
      renderPalette(palette, targetRatios[level]);
    }
    
    function renderPalette(palette, targets) {
      const grid = document.getElementById('paletteGrid');
      
      grid.innerHTML = palette.map(item => {
        const textColor = item.background === '#FFFFFF' ? '#000000' : '#FFFFFF';
        const passAA = item.ratio >= 4.5;
        const passAAA = item.ratio >= 7.0;
        const passAALarge = item.ratio >= 3.0;
        const passAAALarge = item.ratio >= 4.5;
        
        return `
          <div class="color-card" onclick="copyColor('${item.color}')">
            <div class="color-preview" style="background: ${item.background};">
              <div style="background: ${item.color}; color: ${textColor}; padding: 20px; border-radius: 8px;">
                Sample Text
              </div>
            </div>
            <div class="color-info">
              <div class="color-hex">${item.color}</div>
              <div style="font-size: 13px; font-weight: 600; color: #2d3748; margin-bottom: 8px;">
                ${item.name}
              </div>
              <div class="contrast-info">
                Contrast: ${item.ratio.toFixed(2)}:1
              </div>
              <div class="wcag-badges">
                <span class="badge ${passAA ? 'badge-pass' : 'badge-fail'}">AA Normal</span>
                <span class="badge ${passAAA ? 'badge-pass' : 'badge-fail'}">AAA Normal</span>
                <span class="badge ${passAALarge ? 'badge-pass' : 'badge-fail'}">AA Large</span>
                <span class="badge ${passAAALarge ? 'badge-pass' : 'badge-fail'}">AAA Large</span>
              </div>
            </div>
          </div>
        `;
      }).join('');
    }
    
    function copyColor(hex) {
      navigator.clipboard.writeText(hex).then(() => {
        const toast = document.getElementById('toast');
        toast.classList.add('show');
        setTimeout(() => toast.classList.remove('show'), 2000);
      });
    }
    
    generatePalette();

function hexToRgb(hex) {
      const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
      } : null;
    }
    
    function rgbToHex(r, g, b) {
      const toHex = x => {
        const hex = Math.round(Math.max(0, Math.min(255, x))).toString(16);
        return hex.length === 1 ? '0' + hex : hex;
      };
      return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
    }
    
    function getLuminance(r, g, b) {
      const [rs, gs, bs] = [r, g, b].map(c => {
        c = c / 255;
        return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
      });
      return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
    }
    
    function getContrastRatio(hex1, hex2) {
      const rgb1 = hexToRgb(hex1);
      const rgb2 = hexToRgb(hex2);
      const lum1 = getLuminance(rgb1.r, rgb1.g, rgb1.b);
      const lum2 = getLuminance(rgb2.r, rgb2.g, rgb2.b);
      const lighter = Math.max(lum1, lum2);
      const darker = Math.min(lum1, lum2);
      return (lighter + 0.05) / (darker + 0.05);
    }
    
    function adjustForContrast(baseHex, bgHex, targetRatio) {
      const baseRgb = hexToRgb(baseHex);
      let bestHex = baseHex;
      let bestRatio = getContrastRatio(baseHex, bgHex);
      
      // Try adjusting lightness
      for (let adjustment = -200; adjustment <= 200; adjustment += 10) {
        const r = Math.max(0, Math.min(255, baseRgb.r + adjustment));
        const g = Math.max(0, Math.min(255, baseRgb.g + adjustment));
        const b = Math.max(0, Math.min(255, baseRgb.b + adjustment));
        const testHex = rgbToHex(r, g, b);
        const ratio = getContrastRatio(testHex, bgHex);
        
        if (ratio >= targetRatio && Math.abs(ratio - targetRatio) < Math.abs(bestRatio - targetRatio)) {
          bestHex = testHex;
          bestRatio = ratio;
        }
      }
      
      return { hex: bestHex, ratio: bestRatio };
    }
    
    function generatePalette() {
      const baseColor = document.getElementById('baseColor').value;
      const bgType = document.getElementById('bgType').value;
      const level = document.getElementById('complianceLevel').value;
      
      const backgrounds = bgType === 'both' ? ['#FFFFFF', '#000000'] : 
                         bgType === 'white' ? ['#FFFFFF'] : ['#000000'];
      
      const targetRatios = {
        'AA': { normal: 4.5, large: 3.0 },
        'AAA': { normal: 7.0, large: 4.5 }
      };
      
      const palette = [];
      
      backgrounds.forEach(bg => {
        // Original color
        const originalRatio = getContrastRatio(baseColor, bg);
        palette.push({
          name: bg === '#FFFFFF' ? 'On White' : 'On Black',
          color: baseColor,
          background: bg,
          ratio: originalRatio,
          original: true
        });
        
        // Adjusted for AA Normal
        const aaNormal = adjustForContrast(baseColor, bg, targetRatios[level].normal);
        palette.push({
          name: `${level} Normal Text`,
          color: aaNormal.hex,
          background: bg,
          ratio: aaNormal.ratio,
          target: targetRatios[level].normal
        });
        
        // Adjusted for Large Text
        const aaLarge = adjustForContrast(baseColor, bg, targetRatios[level].large);
        palette.push({
          name: `${level} Large Text`,
          color: aaLarge.hex,
          background: bg,
          ratio: aaLarge.ratio,
          target: targetRatios[level].large
        });
      });
      
      renderPalette(palette, targetRatios[level]);
    }
    
    function renderPalette(palette, targets) {
      const grid = document.getElementById('paletteGrid');
      
      grid.innerHTML = palette.map(item => {
        const textColor = item.background === '#FFFFFF' ? '#000000' : '#FFFFFF';
        const passAA = item.ratio >= 4.5;
        const passAAA = item.ratio >= 7.0;
        const passAALarge = item.ratio >= 3.0;
        const passAAALarge = item.ratio >= 4.5;
        
        return `
          <div class="color-card" onclick="copyColor('${item.color}')">
            <div class="color-preview" style="background: ${item.background};">
              <div style="background: ${item.color}; color: ${textColor}; padding: 20px; border-radius: 8px;">
                Sample Text
              </div>
            </div>
            <div class="color-info">
              <div class="color-hex">${item.color}</div>
              <div style="font-size: 13px; font-weight: 600; color: #2d3748; margin-bottom: 8px;">
                ${item.name}
              </div>
              <div class="contrast-info">
                Contrast: ${item.ratio.toFixed(2)}:1
              </div>
              <div class="wcag-badges">
                <span class="badge ${passAA ? 'badge-pass' : 'badge-fail'}">AA Normal</span>
                <span class="badge ${passAAA ? 'badge-pass' : 'badge-fail'}">AAA Normal</span>
                <span class="badge ${passAALarge ? 'badge-pass' : 'badge-fail'}">AA Large</span>
                <span class="badge ${passAAALarge ? 'badge-pass' : 'badge-fail'}">AAA Large</span>
              </div>
            </div>
          </div>
        `;
      }).join('');
    }
    
    function copyColor(hex) {
      navigator.clipboard.writeText(hex).then(() => {
        const toast = document.getElementById('toast');
        toast.classList.add('show');
        setTimeout(() => toast.classList.remove('show'), 2000);
      });
    }
    
    generatePalette();


