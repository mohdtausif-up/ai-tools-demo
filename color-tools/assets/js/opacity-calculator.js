function hexToRgb(hex) {
      const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
      } : null;
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
    
    let currentFormats = {};
    
    function updateOpacity() {
      const color = document.getElementById('baseColor').value;
      const opacity = document.getElementById('opacitySlider').value / 100;
      const rgb = hexToRgb(color);
      const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
      
      // Update displays
      document.getElementById('hexDisplay').textContent = color;
      document.getElementById('opacityDisplay').textContent = opacity.toFixed(2);
      document.getElementById('percentDisplay').textContent = `(${Math.round(opacity * 100)}%)`;
      
      // Generate formats
      const alphaHex = Math.round(opacity * 255).toString(16).padStart(2, '0').toUpperCase();
      const hex8 = `${color}${alphaHex}`;
      const rgba = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${opacity.toFixed(2)})`;
      const hsla = `hsla(${hsl.h}, ${hsl.s}%, ${hsl.l}%, ${opacity.toFixed(2)})`;
      const cssNew = `rgb(${rgb.r} ${rgb.g} ${rgb.b} / ${opacity.toFixed(2)})`;
      
      currentFormats = { hex8, rgba, hsla, css: cssNew };
      
      // Update format displays
      document.getElementById('hex8Format').textContent = hex8;
      document.getElementById('rgbaFormat').textContent = rgba;
      document.getElementById('hslaFormat').textContent = hsla;
      document.getElementById('cssFormat').textContent = cssNew;
      
      // Update all preview overlays
      for (let i = 1; i <= 6; i++) {
        document.getElementById(`overlay${i}`).style.background = rgba;
      }
    }
    
    function copyFormat(type) {
      const value = currentFormats[type];
      navigator.clipboard.writeText(value).then(() => {
        const toast = document.getElementById('toast');
        toast.classList.add('show');
        setTimeout(() => toast.classList.remove('show'), 2000);
      });
    }
    
    document.getElementById('baseColor').addEventListener('input', updateOpacity);
    document.getElementById('opacitySlider').addEventListener('input', updateOpacity);
    
    updateOpacity();

function hexToRgb(hex) {
      const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
      } : null;
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
    
    let currentFormats = {};
    
    function updateOpacity() {
      const color = document.getElementById('baseColor').value;
      const opacity = document.getElementById('opacitySlider').value / 100;
      const rgb = hexToRgb(color);
      const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
      
      // Update displays
      document.getElementById('hexDisplay').textContent = color;
      document.getElementById('opacityDisplay').textContent = opacity.toFixed(2);
      document.getElementById('percentDisplay').textContent = `(${Math.round(opacity * 100)}%)`;
      
      // Generate formats
      const alphaHex = Math.round(opacity * 255).toString(16).padStart(2, '0').toUpperCase();
      const hex8 = `${color}${alphaHex}`;
      const rgba = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${opacity.toFixed(2)})`;
      const hsla = `hsla(${hsl.h}, ${hsl.s}%, ${hsl.l}%, ${opacity.toFixed(2)})`;
      const cssNew = `rgb(${rgb.r} ${rgb.g} ${rgb.b} / ${opacity.toFixed(2)})`;
      
      currentFormats = { hex8, rgba, hsla, css: cssNew };
      
      // Update format displays
      document.getElementById('hex8Format').textContent = hex8;
      document.getElementById('rgbaFormat').textContent = rgba;
      document.getElementById('hslaFormat').textContent = hsla;
      document.getElementById('cssFormat').textContent = cssNew;
      
      // Update all preview overlays
      for (let i = 1; i <= 6; i++) {
        document.getElementById(`overlay${i}`).style.background = rgba;
      }
    }
    
    function copyFormat(type) {
      const value = currentFormats[type];
      navigator.clipboard.writeText(value).then(() => {
        const toast = document.getElementById('toast');
        toast.classList.add('show');
        setTimeout(() => toast.classList.remove('show'), 2000);
      });
    }
    
    document.getElementById('baseColor').addEventListener('input', updateOpacity);
    document.getElementById('opacitySlider').addEventListener('input', updateOpacity);
    
    updateOpacity();


