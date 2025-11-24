const blendModes = ['multiply', 'screen', 'overlay', 'darken', 'lighten', 'color-dodge', 'color-burn', 'hard-light', 'soft-light', 'difference', 'exclusion', 'hue', 'saturation', 'color', 'luminosity'];
    
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
        const hex = Math.round(x).toString(16);
        return hex.length === 1 ? '0' + hex : hex;
      };
      return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
    }
    
    function rgbToHsl(r, g, b) {
      r /= 255; g /= 255; b /= 255;
      const max = Math.max(r, g, b), min = Math.min(r, g, b);
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
    
    function mixColors(color1, color2, ratio) {
      const rgb1 = hexToRgb(color1);
      const rgb2 = hexToRgb(color2);
      
      const r = Math.round(rgb1.r * (1 - ratio) + rgb2.r * ratio);
      const g = Math.round(rgb1.g * (1 - ratio) + rgb2.g * ratio);
      const b = Math.round(rgb1.b * (1 - ratio) + rgb2.b * ratio);
      
      return { r, g, b, hex: rgbToHex(r, g, b) };
    }
    
    function updateMix() {
      const color1 = document.getElementById('color1').value;
      const color2 = document.getElementById('color2').value;
      const ratio = document.getElementById('mixRatio').value / 100;
      
      // Update hex displays
      document.getElementById('hex1').textContent = color1;
      document.getElementById('hex2').textContent = color2;
      
      // Update ratio displays
      document.getElementById('ratio1').textContent = `${Math.round((1 - ratio) * 100)}%`;
      document.getElementById('ratio2').textContent = `${Math.round(ratio * 100)}%`;
      
      // Update slider gradient
      const slider = document.getElementById('mixRatio');
      slider.style.setProperty('--color1', color1);
      slider.style.setProperty('--color2', color2);
      slider.style.background = `linear-gradient(to right, ${color1}, ${color2})`;
      
      // Mix colors
      const mixed = mixColors(color1, color2, ratio);
      const hsl = rgbToHsl(mixed.r, mixed.g, mixed.b);
      
      // Update result
      document.getElementById('resultColor').style.background = mixed.hex;
      document.getElementById('resultHex').textContent = mixed.hex;
      document.getElementById('resultRgb').textContent = `${mixed.r}, ${mixed.g}, ${mixed.b}`;
      document.getElementById('resultHsl').textContent = `${hsl.h}°, ${hsl.s}%, ${hsl.l}%`;
      
      // Update blend modes
      updateBlendModes(color1, color2);
    }
    
    function updateBlendModes(color1, color2) {
      const grid = document.getElementById('blendGrid');
      grid.innerHTML = blendModes.map(mode => `
        <div class="blend-item" onclick="copyColor('${mode}')">
          <div class="blend-preview" style="background: ${color1}; position: relative;">
            <div style="position: absolute; inset: 0; background: ${color2}; mix-blend-mode: ${mode};"></div>
          </div>
          <div class="blend-label">${mode}</div>
        </div>
      `).join('');
    }
    
    function copyResultColor() {
      const hex = document.getElementById('resultHex').textContent;
      navigator.clipboard.writeText(hex).then(() => {
        const toast = document.getElementById('toast');
        toast.classList.add('show');
        setTimeout(() => toast.classList.remove('show'), 2000);
      });
    }
    
    function copyColor(mode) {
      navigator.clipboard.writeText(`mix-blend-mode: ${mode};`).then(() => {
        const toast = document.getElementById('toast');
        toast.textContent = `Copied ${mode} blend mode!`;
        toast.classList.add('show');
        setTimeout(() => {
          toast.classList.remove('show');
          setTimeout(() => toast.textContent = 'Copied to clipboard!', 300);
        }, 2000);
      });
    }
    
    document.getElementById('color1').addEventListener('input', updateMix);
    document.getElementById('color2').addEventListener('input', updateMix);
    document.getElementById('mixRatio').addEventListener('input', updateMix);
    
    updateMix();

const blendModes = ['multiply', 'screen', 'overlay', 'darken', 'lighten', 'color-dodge', 'color-burn', 'hard-light', 'soft-light', 'difference', 'exclusion', 'hue', 'saturation', 'color', 'luminosity'];
    
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
        const hex = Math.round(x).toString(16);
        return hex.length === 1 ? '0' + hex : hex;
      };
      return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
    }
    
    function rgbToHsl(r, g, b) {
      r /= 255; g /= 255; b /= 255;
      const max = Math.max(r, g, b), min = Math.min(r, g, b);
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
    
    function mixColors(color1, color2, ratio) {
      const rgb1 = hexToRgb(color1);
      const rgb2 = hexToRgb(color2);
      
      const r = Math.round(rgb1.r * (1 - ratio) + rgb2.r * ratio);
      const g = Math.round(rgb1.g * (1 - ratio) + rgb2.g * ratio);
      const b = Math.round(rgb1.b * (1 - ratio) + rgb2.b * ratio);
      
      return { r, g, b, hex: rgbToHex(r, g, b) };
    }
    
    function updateMix() {
      const color1 = document.getElementById('color1').value;
      const color2 = document.getElementById('color2').value;
      const ratio = document.getElementById('mixRatio').value / 100;
      
      // Update hex displays
      document.getElementById('hex1').textContent = color1;
      document.getElementById('hex2').textContent = color2;
      
      // Update ratio displays
      document.getElementById('ratio1').textContent = `${Math.round((1 - ratio) * 100)}%`;
      document.getElementById('ratio2').textContent = `${Math.round(ratio * 100)}%`;
      
      // Update slider gradient
      const slider = document.getElementById('mixRatio');
      slider.style.setProperty('--color1', color1);
      slider.style.setProperty('--color2', color2);
      slider.style.background = `linear-gradient(to right, ${color1}, ${color2})`;
      
      // Mix colors
      const mixed = mixColors(color1, color2, ratio);
      const hsl = rgbToHsl(mixed.r, mixed.g, mixed.b);
      
      // Update result
      document.getElementById('resultColor').style.background = mixed.hex;
      document.getElementById('resultHex').textContent = mixed.hex;
      document.getElementById('resultRgb').textContent = `${mixed.r}, ${mixed.g}, ${mixed.b}`;
      document.getElementById('resultHsl').textContent = `${hsl.h}°, ${hsl.s}%, ${hsl.l}%`;
      
      // Update blend modes
      updateBlendModes(color1, color2);
    }
    
    function updateBlendModes(color1, color2) {
      const grid = document.getElementById('blendGrid');
      grid.innerHTML = blendModes.map(mode => `
        <div class="blend-item" onclick="copyColor('${mode}')">
          <div class="blend-preview" style="background: ${color1}; position: relative;">
            <div style="position: absolute; inset: 0; background: ${color2}; mix-blend-mode: ${mode};"></div>
          </div>
          <div class="blend-label">${mode}</div>
        </div>
      `).join('');
    }
    
    function copyResultColor() {
      const hex = document.getElementById('resultHex').textContent;
      navigator.clipboard.writeText(hex).then(() => {
        const toast = document.getElementById('toast');
        toast.classList.add('show');
        setTimeout(() => toast.classList.remove('show'), 2000);
      });
    }
    
    function copyColor(mode) {
      navigator.clipboard.writeText(`mix-blend-mode: ${mode};`).then(() => {
        const toast = document.getElementById('toast');
        toast.textContent = `Copied ${mode} blend mode!`;
        toast.classList.add('show');
        setTimeout(() => {
          toast.classList.remove('show');
          setTimeout(() => toast.textContent = 'Copied to clipboard!', 300);
        }, 2000);
      });
    }
    
    document.getElementById('color1').addEventListener('input', updateMix);
    document.getElementById('color2').addEventListener('input', updateMix);
    document.getElementById('mixRatio').addEventListener('input', updateMix);
    
    updateMix();


