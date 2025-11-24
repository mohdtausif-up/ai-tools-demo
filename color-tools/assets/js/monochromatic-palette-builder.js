const colorPicker = document.getElementById('colorPicker');
    const stepsSlider = document.getElementById('stepsSlider');
    const tintSlider = document.getElementById('tintSlider');
    const shadeSlider = document.getElementById('shadeSlider');
    
    let currentPalette = {};
    
    colorPicker.addEventListener('input', generatePalette);
    stepsSlider.addEventListener('input', () => {
      document.getElementById('stepsValue').textContent = stepsSlider.value;
      generatePalette();
    });
    tintSlider.addEventListener('input', () => {
      document.getElementById('tintValue').textContent = tintSlider.value + '%';
      generatePalette();
    });
    shadeSlider.addEventListener('input', () => {
      document.getElementById('shadeValue').textContent = shadeSlider.value + '%';
      generatePalette();
    });
    
    function hexToHsl(hex) {
      const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      let r = parseInt(result[1], 16) / 255;
      let g = parseInt(result[2], 16) / 255;
      let b = parseInt(result[3], 16) / 255;
      
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
      
      return { h: h * 360, s: s * 100, l: l * 100 };
    }
    
    function hslToHex(h, s, l) {
      h /= 360;
      s /= 100;
      l /= 100;
      
      let r, g, b;
      
      if (s === 0) {
        r = g = b = l;
      } else {
        const hue2rgb = (p, q, t) => {
          if (t < 0) t += 1;
          if (t > 1) t -= 1;
          if (t < 1/6) return p + (q - p) * 6 * t;
          if (t < 1/2) return q;
          if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
          return p;
        };
        
        const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        const p = 2 * l - q;
        r = hue2rgb(p, q, h + 1/3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1/3);
      }
      
      const toHex = x => {
        const hex = Math.round(x * 255).toString(16);
        return hex.length === 1 ? '0' + hex : hex;
      };
      
      return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
    }
    
    function generatePalette() {
      const baseColor = colorPicker.value;
      const steps = parseInt(stepsSlider.value);
      const tintRange = parseInt(tintSlider.value) / 100;
      const shadeRange = parseInt(shadeSlider.value) / 100;
      
      document.getElementById('basePreview').style.background = baseColor;
      
      const hsl = hexToHsl(baseColor);
      
      currentPalette = {
        base: [baseColor],
        tints: [],
        shades: [],
        tones: []
      };
      
      // Generate tints (increase lightness toward white)
      for (let i = 1; i <= steps; i++) {
        const lightness = hsl.l + ((100 - hsl.l) * (i / steps) * tintRange);
        const color = hslToHex(hsl.h, hsl.s, lightness);
        currentPalette.tints.push(color);
      }
      
      // Generate shades (decrease lightness toward black)
      for (let i = 1; i <= steps; i++) {
        const lightness = hsl.l - (hsl.l * (i / steps) * shadeRange);
        const color = hslToHex(hsl.h, hsl.s, lightness);
        currentPalette.shades.push(color);
      }
      
      // Generate tones (decrease saturation toward gray)
      for (let i = 1; i <= steps; i++) {
        const saturation = hsl.s - (hsl.s * (i / steps));
        const color = hslToHex(hsl.h, saturation, hsl.l);
        currentPalette.tones.push(color);
      }
      
      renderPalette();
    }
    
    function renderPalette() {
      renderSwatches('tintsGrid', currentPalette.tints, 'Tint');
      renderSwatches('baseGrid', currentPalette.base, 'Base');
      renderSwatches('shadesGrid', currentPalette.shades, 'Shade');
      renderSwatches('tonesGrid', currentPalette.tones, 'Tone');
    }
    
    function renderSwatches(containerId, colors, label) {
      const container = document.getElementById(containerId);
      container.innerHTML = '';
      
      colors.forEach((color, index) => {
        const swatch = document.createElement('div');
        swatch.className = 'color-swatch';
        swatch.style.background = color;
        swatch.onclick = () => copy(color);
        
        const swatchLabel = document.createElement('div');
        swatchLabel.className = 'swatch-label';
        swatchLabel.innerHTML = `
          ${label} ${colors.length > 1 ? index + 1 : ''}<br>
          <span class="hex-label">${color.toUpperCase()}</span>
        `;
        
        swatch.appendChild(swatchLabel);
        container.appendChild(swatch);
      });
    }
    
    function copy(text) {
      navigator.clipboard.writeText(text).then(() => {
        const toast = document.getElementById('toast');
        toast.textContent = `Copied ${text}`;
        toast.classList.add('show');
        setTimeout(() => toast.classList.remove('show'), 2000);
      });
    }
    
    function exportCSS() {
      let css = ':root {\n';
      css += `  --base-color: ${currentPalette.base[0]};\n\n`;
      
      currentPalette.tints.forEach((color, i) => {
        css += `  --tint-${i + 1}: ${color};\n`;
      });
      css += '\n';
      
      currentPalette.shades.forEach((color, i) => {
        css += `  --shade-${i + 1}: ${color};\n`;
      });
      css += '\n';
      
      currentPalette.tones.forEach((color, i) => {
        css += `  --tone-${i + 1}: ${color};\n`;
      });
      
      css += '}';
      
      copy(css);
    }
    
    function exportJSON() {
      const json = JSON.stringify(currentPalette, null, 2);
      copy(json);
    }
    
    function exportArray() {
      const allColors = [
        ...currentPalette.tints,
        ...currentPalette.base,
        ...currentPalette.shades
      ];
      copy(allColors.join(', '));
    }
    
    // Initial generation
    generatePalette();

const colorPicker = document.getElementById('colorPicker');
    const stepsSlider = document.getElementById('stepsSlider');
    const tintSlider = document.getElementById('tintSlider');
    const shadeSlider = document.getElementById('shadeSlider');
    
    let currentPalette = {};
    
    colorPicker.addEventListener('input', generatePalette);
    stepsSlider.addEventListener('input', () => {
      document.getElementById('stepsValue').textContent = stepsSlider.value;
      generatePalette();
    });
    tintSlider.addEventListener('input', () => {
      document.getElementById('tintValue').textContent = tintSlider.value + '%';
      generatePalette();
    });
    shadeSlider.addEventListener('input', () => {
      document.getElementById('shadeValue').textContent = shadeSlider.value + '%';
      generatePalette();
    });
    
    function hexToHsl(hex) {
      const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      let r = parseInt(result[1], 16) / 255;
      let g = parseInt(result[2], 16) / 255;
      let b = parseInt(result[3], 16) / 255;
      
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
      
      return { h: h * 360, s: s * 100, l: l * 100 };
    }
    
    function hslToHex(h, s, l) {
      h /= 360;
      s /= 100;
      l /= 100;
      
      let r, g, b;
      
      if (s === 0) {
        r = g = b = l;
      } else {
        const hue2rgb = (p, q, t) => {
          if (t < 0) t += 1;
          if (t > 1) t -= 1;
          if (t < 1/6) return p + (q - p) * 6 * t;
          if (t < 1/2) return q;
          if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
          return p;
        };
        
        const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        const p = 2 * l - q;
        r = hue2rgb(p, q, h + 1/3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1/3);
      }
      
      const toHex = x => {
        const hex = Math.round(x * 255).toString(16);
        return hex.length === 1 ? '0' + hex : hex;
      };
      
      return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
    }
    
    function generatePalette() {
      const baseColor = colorPicker.value;
      const steps = parseInt(stepsSlider.value);
      const tintRange = parseInt(tintSlider.value) / 100;
      const shadeRange = parseInt(shadeSlider.value) / 100;
      
      document.getElementById('basePreview').style.background = baseColor;
      
      const hsl = hexToHsl(baseColor);
      
      currentPalette = {
        base: [baseColor],
        tints: [],
        shades: [],
        tones: []
      };
      
      // Generate tints (increase lightness toward white)
      for (let i = 1; i <= steps; i++) {
        const lightness = hsl.l + ((100 - hsl.l) * (i / steps) * tintRange);
        const color = hslToHex(hsl.h, hsl.s, lightness);
        currentPalette.tints.push(color);
      }
      
      // Generate shades (decrease lightness toward black)
      for (let i = 1; i <= steps; i++) {
        const lightness = hsl.l - (hsl.l * (i / steps) * shadeRange);
        const color = hslToHex(hsl.h, hsl.s, lightness);
        currentPalette.shades.push(color);
      }
      
      // Generate tones (decrease saturation toward gray)
      for (let i = 1; i <= steps; i++) {
        const saturation = hsl.s - (hsl.s * (i / steps));
        const color = hslToHex(hsl.h, saturation, hsl.l);
        currentPalette.tones.push(color);
      }
      
      renderPalette();
    }
    
    function renderPalette() {
      renderSwatches('tintsGrid', currentPalette.tints, 'Tint');
      renderSwatches('baseGrid', currentPalette.base, 'Base');
      renderSwatches('shadesGrid', currentPalette.shades, 'Shade');
      renderSwatches('tonesGrid', currentPalette.tones, 'Tone');
    }
    
    function renderSwatches(containerId, colors, label) {
      const container = document.getElementById(containerId);
      container.innerHTML = '';
      
      colors.forEach((color, index) => {
        const swatch = document.createElement('div');
        swatch.className = 'color-swatch';
        swatch.style.background = color;
        swatch.onclick = () => copy(color);
        
        const swatchLabel = document.createElement('div');
        swatchLabel.className = 'swatch-label';
        swatchLabel.innerHTML = `
          ${label} ${colors.length > 1 ? index + 1 : ''}<br>
          <span class="hex-label">${color.toUpperCase()}</span>
        `;
        
        swatch.appendChild(swatchLabel);
        container.appendChild(swatch);
      });
    }
    
    function copy(text) {
      navigator.clipboard.writeText(text).then(() => {
        const toast = document.getElementById('toast');
        toast.textContent = `Copied ${text}`;
        toast.classList.add('show');
        setTimeout(() => toast.classList.remove('show'), 2000);
      });
    }
    
    function exportCSS() {
      let css = ':root {\n';
      css += `  --base-color: ${currentPalette.base[0]};\n\n`;
      
      currentPalette.tints.forEach((color, i) => {
        css += `  --tint-${i + 1}: ${color};\n`;
      });
      css += '\n';
      
      currentPalette.shades.forEach((color, i) => {
        css += `  --shade-${i + 1}: ${color};\n`;
      });
      css += '\n';
      
      currentPalette.tones.forEach((color, i) => {
        css += `  --tone-${i + 1}: ${color};\n`;
      });
      
      css += '}';
      
      copy(css);
    }
    
    function exportJSON() {
      const json = JSON.stringify(currentPalette, null, 2);
      copy(json);
    }
    
    function exportArray() {
      const allColors = [
        ...currentPalette.tints,
        ...currentPalette.base,
        ...currentPalette.shades
      ];
      copy(allColors.join(', '));
    }
    
    // Initial generation
    generatePalette();


