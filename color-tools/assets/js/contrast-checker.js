function hexToRgb(hex) {
      const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
      } : null;
    }
    
    function getLuminance(r, g, b) {
      const [rs, gs, bs] = [r, g, b].map(c => {
        c = c / 255;
        return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
      });
      return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
    }
    
    function getContrastRatio(fg, bg) {
      const fgRgb = hexToRgb(fg);
      const bgRgb = hexToRgb(bg);
      
      if (!fgRgb || !bgRgb) return 1;
      
      const fgLum = getLuminance(fgRgb.r, fgRgb.g, fgRgb.b);
      const bgLum = getLuminance(bgRgb.r, bgRgb.g, bgRgb.b);
      
      const lighter = Math.max(fgLum, bgLum);
      const darker = Math.min(fgLum, bgLum);
      
      return (lighter + 0.05) / (darker + 0.05);
    }
    
    function updateContrast() {
      const fg = document.getElementById('fgColor').value;
      const bg = document.getElementById('bgColor').value;
      
      document.getElementById('fgText').value = fg;
      document.getElementById('bgText').value = bg;
      
      const ratio = getContrastRatio(fg, bg);
      
      // Update preview
      const previewBox = document.getElementById('previewBox');
      previewBox.style.backgroundColor = bg;
      previewBox.style.color = fg;
      
      // Update ratio display
      document.getElementById('ratioValue').textContent = ratio.toFixed(2) + ':1';
      
      // WCAG AA (4.5:1 for normal text, 3:1 for large text and UI)
      document.getElementById('aaNormal').textContent = ratio >= 4.5 ? '✓ Pass' : '✗ Fail';
      document.getElementById('aaNormal').className = 'check-status ' + (ratio >= 4.5 ? 'pass' : 'fail');
      
      document.getElementById('aaLarge').textContent = ratio >= 3 ? '✓ Pass' : '✗ Fail';
      document.getElementById('aaLarge').className = 'check-status ' + (ratio >= 3 ? 'pass' : 'fail');
      
      document.getElementById('aaUi').textContent = ratio >= 3 ? '✓ Pass' : '✗ Fail';
      document.getElementById('aaUi').className = 'check-status ' + (ratio >= 3 ? 'pass' : 'fail');
      
      // WCAG AAA (7:1 for normal text, 4.5:1 for large text)
      document.getElementById('aaaNormal').textContent = ratio >= 7 ? '✓ Pass' : '✗ Fail';
      document.getElementById('aaaNormal').className = 'check-status ' + (ratio >= 7 ? 'pass' : 'fail');
      
      document.getElementById('aaaLarge').textContent = ratio >= 4.5 ? '✓ Pass' : '✗ Fail';
      document.getElementById('aaaLarge').className = 'check-status ' + (ratio >= 4.5 ? 'pass' : 'fail');
      
      document.getElementById('aaaUi').textContent = ratio >= 3 ? '✓ Pass' : '✗ Fail';
      document.getElementById('aaaUi').className = 'check-status ' + (ratio >= 3 ? 'pass' : 'fail');
    }
    
    function updateFromText(id) {
      const text = document.getElementById(id + 'Text').value;
      if (/^#[0-9A-F]{6}$/i.test(text)) {
        document.getElementById(id + 'Color').value = text;
        updateContrast();
      }
    }
    
    document.getElementById('fgColor').addEventListener('input', updateContrast);
    document.getElementById('bgColor').addEventListener('input', updateContrast);
    document.getElementById('fgText').addEventListener('change', () => updateFromText('fg'));
    document.getElementById('bgText').addEventListener('change', () => updateFromText('bg'));
    
    updateContrast();

function hexToRgb(hex) {
      const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
      } : null;
    }
    
    function getLuminance(r, g, b) {
      const [rs, gs, bs] = [r, g, b].map(c => {
        c = c / 255;
        return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
      });
      return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
    }
    
    function getContrastRatio(fg, bg) {
      const fgRgb = hexToRgb(fg);
      const bgRgb = hexToRgb(bg);
      
      if (!fgRgb || !bgRgb) return 1;
      
      const fgLum = getLuminance(fgRgb.r, fgRgb.g, fgRgb.b);
      const bgLum = getLuminance(bgRgb.r, bgRgb.g, bgRgb.b);
      
      const lighter = Math.max(fgLum, bgLum);
      const darker = Math.min(fgLum, bgLum);
      
      return (lighter + 0.05) / (darker + 0.05);
    }
    
    function updateContrast() {
      const fg = document.getElementById('fgColor').value;
      const bg = document.getElementById('bgColor').value;
      
      document.getElementById('fgText').value = fg;
      document.getElementById('bgText').value = bg;
      
      const ratio = getContrastRatio(fg, bg);
      
      // Update preview
      const previewBox = document.getElementById('previewBox');
      previewBox.style.backgroundColor = bg;
      previewBox.style.color = fg;
      
      // Update ratio display
      document.getElementById('ratioValue').textContent = ratio.toFixed(2) + ':1';
      
      // WCAG AA (4.5:1 for normal text, 3:1 for large text and UI)
      document.getElementById('aaNormal').textContent = ratio >= 4.5 ? '✓ Pass' : '✗ Fail';
      document.getElementById('aaNormal').className = 'check-status ' + (ratio >= 4.5 ? 'pass' : 'fail');
      
      document.getElementById('aaLarge').textContent = ratio >= 3 ? '✓ Pass' : '✗ Fail';
      document.getElementById('aaLarge').className = 'check-status ' + (ratio >= 3 ? 'pass' : 'fail');
      
      document.getElementById('aaUi').textContent = ratio >= 3 ? '✓ Pass' : '✗ Fail';
      document.getElementById('aaUi').className = 'check-status ' + (ratio >= 3 ? 'pass' : 'fail');
      
      // WCAG AAA (7:1 for normal text, 4.5:1 for large text)
      document.getElementById('aaaNormal').textContent = ratio >= 7 ? '✓ Pass' : '✗ Fail';
      document.getElementById('aaaNormal').className = 'check-status ' + (ratio >= 7 ? 'pass' : 'fail');
      
      document.getElementById('aaaLarge').textContent = ratio >= 4.5 ? '✓ Pass' : '✗ Fail';
      document.getElementById('aaaLarge').className = 'check-status ' + (ratio >= 4.5 ? 'pass' : 'fail');
      
      document.getElementById('aaaUi').textContent = ratio >= 3 ? '✓ Pass' : '✗ Fail';
      document.getElementById('aaaUi').className = 'check-status ' + (ratio >= 3 ? 'pass' : 'fail');
    }
    
    function updateFromText(id) {
      const text = document.getElementById(id + 'Text').value;
      if (/^#[0-9A-F]{6}$/i.test(text)) {
        document.getElementById(id + 'Color').value = text;
        updateContrast();
      }
    }
    
    document.getElementById('fgColor').addEventListener('input', updateContrast);
    document.getElementById('bgColor').addEventListener('input', updateContrast);
    document.getElementById('fgText').addEventListener('change', () => updateFromText('fg'));
    document.getElementById('bgText').addEventListener('change', () => updateFromText('bg'));
    
    updateContrast();


