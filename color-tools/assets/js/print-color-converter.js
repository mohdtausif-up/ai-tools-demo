const colorPicker = document.getElementById('colorPicker');
    const hexInput = document.getElementById('hexInput');
    const rInput = document.getElementById('rInput');
    const gInput = document.getElementById('gInput');
    const bInput = document.getElementById('bInput');
    
    colorPicker.addEventListener('input', () => {
      hexInput.value = colorPicker.value;
      updateFromHex();
    });
    
    hexInput.addEventListener('input', updateFromHex);
    rInput.addEventListener('input', updateFromRGB);
    gInput.addEventListener('input', updateFromRGB);
    bInput.addEventListener('input', updateFromRGB);
    
    function updateFromHex() {
      const hex = hexInput.value;
      if (/^#[0-9A-Fa-f]{6}$/.test(hex)) {
        const rgb = hexToRgb(hex);
        rInput.value = rgb.r;
        gInput.value = rgb.g;
        bInput.value = rgb.b;
        colorPicker.value = hex;
        convertColor();
      }
    }
    
    function updateFromRGB() {
      const r = parseInt(rInput.value) || 0;
      const g = parseInt(gInput.value) || 0;
      const b = parseInt(bInput.value) || 0;
      
      const hex = rgbToHex(r, g, b);
      hexInput.value = hex;
      colorPicker.value = hex;
      convertColor();
    }
    
    function hexToRgb(hex) {
      const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
      } : { r: 0, g: 0, b: 0 };
    }
    
    function rgbToHex(r, g, b) {
      return '#' + [r, g, b].map(x => {
        const hex = Math.max(0, Math.min(255, x)).toString(16);
        return hex.length === 1 ? '0' + hex : hex;
      }).join('');
    }
    
    function rgbToHsl(r, g, b) {
      r /= 255;
      g /= 255;
      b /= 255;
      
      const max = Math.max(r, g, b);
      const min = Math.min(r, g, b);
      let h, s, l = (max + min) / 2;
      
      if (max === min) {
        h = s = 0;
      } else {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        
        switch (max) {
          case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
          case g: h = ((b - r) / d + 2) / 6; break;
          case b: h = ((r - g) / d + 4) / 6; break;
        }
      }
      
      return {
        h: Math.round(h * 360),
        s: Math.round(s * 100),
        l: Math.round(l * 100)
      };
    }
    
    function rgbToCmyk(r, g, b, profile) {
      r /= 255;
      g /= 255;
      b /= 255;
      
      let k = 1 - Math.max(r, g, b);
      
      if (k === 1) {
        return { c: 0, m: 0, y: 0, k: 100 };
      }
      
      let c = (1 - r - k) / (1 - k);
      let m = (1 - g - k) / (1 - k);
      let y = (1 - b - k) / (1 - k);
      
      // Apply profile adjustments
      const adjustments = {
        coated: { c: 1.0, m: 1.0, y: 1.0, k: 1.0 },
        uncoated: { c: 0.95, m: 0.95, y: 0.95, k: 1.05 },
        web: { c: 0.9, m: 0.9, y: 0.9, k: 1.1 },
        sheet: { c: 1.02, m: 1.02, y: 1.02, k: 0.98 }
      };
      
      const adj = adjustments[profile] || adjustments.coated;
      
      return {
        c: Math.round(c * adj.c * 100),
        m: Math.round(m * adj.m * 100),
        y: Math.round(y * adj.y * 100),
        k: Math.round(k * adj.k * 100)
      };
    }
    
    function convertColor() {
      const r = parseInt(rInput.value) || 0;
      const g = parseInt(gInput.value) || 0;
      const b = parseInt(bInput.value) || 0;
      const hex = hexInput.value;
      const profile = document.getElementById('printProfile').value;
      
      // Update preview
      document.getElementById('colorPreview').style.background = hex;
      
      // Calculate CMYK
      const cmyk = rgbToCmyk(r, g, b, profile);
      document.getElementById('cValue').textContent = cmyk.c + '%';
      document.getElementById('mValue').textContent = cmyk.m + '%';
      document.getElementById('yValue').textContent = cmyk.y + '%';
      document.getElementById('kValue').textContent = cmyk.k + '%';
      
      // Calculate HSL
      const hsl = rgbToHsl(r, g, b);
      document.getElementById('hslValue').textContent = `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`;
      
      // Update digital values
      document.getElementById('hexValue').textContent = hex.toUpperCase();
      document.getElementById('rgbValue').textContent = `rgb(${r}, ${g}, ${b})`;
      
      // Calculate total ink
      const totalInk = cmyk.c + cmyk.m + cmyk.y + cmyk.k;
      document.getElementById('totalInk').textContent = totalInk + '%';
      
      // Update profile name
      const profileNames = {
        coated: 'Coated Paper',
        uncoated: 'Uncoated Paper',
        web: 'Web Offset',
        sheet: 'Sheet Fed'
      };
      document.getElementById('profileName').textContent = profileNames[profile];
      
      // Check gamut
      const isVibrant = (hsl.s > 70 && (hsl.l > 40 && hsl.l < 60));
      const warningBox = document.getElementById('warningBox');
      const gamutStatus = document.getElementById('gamutStatus');
      
      if (isVibrant || totalInk > 320) {
        warningBox.classList.add('show');
        gamutStatus.textContent = '⚠️ Out of Gamut';
        gamutStatus.style.color = '#c53030';
      } else {
        warningBox.classList.remove('show');
        gamutStatus.textContent = '✓ In Gamut';
        gamutStatus.style.color = '#38a169';
      }
    }
    
    function copy(text) {
      navigator.clipboard.writeText(text).then(() => {
        const toast = document.getElementById('toast');
        toast.textContent = `Copied ${text}`;
        toast.classList.add('show');
        setTimeout(() => {
          toast.classList.remove('show');
          setTimeout(() => toast.textContent = 'Copied to clipboard!', 300);
        }, 2000);
      });
    }
    
    // Initial conversion
    convertColor();

const colorPicker = document.getElementById('colorPicker');
    const hexInput = document.getElementById('hexInput');
    const rInput = document.getElementById('rInput');
    const gInput = document.getElementById('gInput');
    const bInput = document.getElementById('bInput');
    
    colorPicker.addEventListener('input', () => {
      hexInput.value = colorPicker.value;
      updateFromHex();
    });
    
    hexInput.addEventListener('input', updateFromHex);
    rInput.addEventListener('input', updateFromRGB);
    gInput.addEventListener('input', updateFromRGB);
    bInput.addEventListener('input', updateFromRGB);
    
    function updateFromHex() {
      const hex = hexInput.value;
      if (/^#[0-9A-Fa-f]{6}$/.test(hex)) {
        const rgb = hexToRgb(hex);
        rInput.value = rgb.r;
        gInput.value = rgb.g;
        bInput.value = rgb.b;
        colorPicker.value = hex;
        convertColor();
      }
    }
    
    function updateFromRGB() {
      const r = parseInt(rInput.value) || 0;
      const g = parseInt(gInput.value) || 0;
      const b = parseInt(bInput.value) || 0;
      
      const hex = rgbToHex(r, g, b);
      hexInput.value = hex;
      colorPicker.value = hex;
      convertColor();
    }
    
    function hexToRgb(hex) {
      const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
      } : { r: 0, g: 0, b: 0 };
    }
    
    function rgbToHex(r, g, b) {
      return '#' + [r, g, b].map(x => {
        const hex = Math.max(0, Math.min(255, x)).toString(16);
        return hex.length === 1 ? '0' + hex : hex;
      }).join('');
    }
    
    function rgbToHsl(r, g, b) {
      r /= 255;
      g /= 255;
      b /= 255;
      
      const max = Math.max(r, g, b);
      const min = Math.min(r, g, b);
      let h, s, l = (max + min) / 2;
      
      if (max === min) {
        h = s = 0;
      } else {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        
        switch (max) {
          case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
          case g: h = ((b - r) / d + 2) / 6; break;
          case b: h = ((r - g) / d + 4) / 6; break;
        }
      }
      
      return {
        h: Math.round(h * 360),
        s: Math.round(s * 100),
        l: Math.round(l * 100)
      };
    }
    
    function rgbToCmyk(r, g, b, profile) {
      r /= 255;
      g /= 255;
      b /= 255;
      
      let k = 1 - Math.max(r, g, b);
      
      if (k === 1) {
        return { c: 0, m: 0, y: 0, k: 100 };
      }
      
      let c = (1 - r - k) / (1 - k);
      let m = (1 - g - k) / (1 - k);
      let y = (1 - b - k) / (1 - k);
      
      // Apply profile adjustments
      const adjustments = {
        coated: { c: 1.0, m: 1.0, y: 1.0, k: 1.0 },
        uncoated: { c: 0.95, m: 0.95, y: 0.95, k: 1.05 },
        web: { c: 0.9, m: 0.9, y: 0.9, k: 1.1 },
        sheet: { c: 1.02, m: 1.02, y: 1.02, k: 0.98 }
      };
      
      const adj = adjustments[profile] || adjustments.coated;
      
      return {
        c: Math.round(c * adj.c * 100),
        m: Math.round(m * adj.m * 100),
        y: Math.round(y * adj.y * 100),
        k: Math.round(k * adj.k * 100)
      };
    }
    
    function convertColor() {
      const r = parseInt(rInput.value) || 0;
      const g = parseInt(gInput.value) || 0;
      const b = parseInt(bInput.value) || 0;
      const hex = hexInput.value;
      const profile = document.getElementById('printProfile').value;
      
      // Update preview
      document.getElementById('colorPreview').style.background = hex;
      
      // Calculate CMYK
      const cmyk = rgbToCmyk(r, g, b, profile);
      document.getElementById('cValue').textContent = cmyk.c + '%';
      document.getElementById('mValue').textContent = cmyk.m + '%';
      document.getElementById('yValue').textContent = cmyk.y + '%';
      document.getElementById('kValue').textContent = cmyk.k + '%';
      
      // Calculate HSL
      const hsl = rgbToHsl(r, g, b);
      document.getElementById('hslValue').textContent = `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`;
      
      // Update digital values
      document.getElementById('hexValue').textContent = hex.toUpperCase();
      document.getElementById('rgbValue').textContent = `rgb(${r}, ${g}, ${b})`;
      
      // Calculate total ink
      const totalInk = cmyk.c + cmyk.m + cmyk.y + cmyk.k;
      document.getElementById('totalInk').textContent = totalInk + '%';
      
      // Update profile name
      const profileNames = {
        coated: 'Coated Paper',
        uncoated: 'Uncoated Paper',
        web: 'Web Offset',
        sheet: 'Sheet Fed'
      };
      document.getElementById('profileName').textContent = profileNames[profile];
      
      // Check gamut
      const isVibrant = (hsl.s > 70 && (hsl.l > 40 && hsl.l < 60));
      const warningBox = document.getElementById('warningBox');
      const gamutStatus = document.getElementById('gamutStatus');
      
      if (isVibrant || totalInk > 320) {
        warningBox.classList.add('show');
        gamutStatus.textContent = '⚠️ Out of Gamut';
        gamutStatus.style.color = '#c53030';
      } else {
        warningBox.classList.remove('show');
        gamutStatus.textContent = '✓ In Gamut';
        gamutStatus.style.color = '#38a169';
      }
    }
    
    function copy(text) {
      navigator.clipboard.writeText(text).then(() => {
        const toast = document.getElementById('toast');
        toast.textContent = `Copied ${text}`;
        toast.classList.add('show');
        setTimeout(() => {
          toast.classList.remove('show');
          setTimeout(() => toast.textContent = 'Copied to clipboard!', 300);
        }, 2000);
      });
    }
    
    // Initial conversion
    convertColor();


