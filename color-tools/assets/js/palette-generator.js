function hexToHsl(hex) {
      const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      if (!result) return null;
      
      let r = parseInt(result[1], 16) / 255;
      let g = parseInt(result[2], 16) / 255;
      let b = parseInt(result[3], 16) / 255;
      
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
      
      return { h: h * 360, s: s * 100, l: l * 100 };
    }
    
    function hslToHex(h, s, l) {
      h /= 360; s /= 100; l /= 100;
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
    
    function generateMonochromatic(baseHex, count) {
      const hsl = hexToHsl(baseHex);
      const colors = [];
      
      for (let i = 0; i < count; i++) {
        const lightness = 20 + (60 / (count - 1)) * i;
        colors.push(hslToHex(hsl.h, hsl.s, lightness));
      }
      
      return colors;
    }
    
    function generateAnalogous(baseHex, count) {
      const hsl = hexToHsl(baseHex);
      const colors = [];
      const angleStep = 30;
      
      for (let i = 0; i < count; i++) {
        const offset = (i - Math.floor(count / 2)) * angleStep;
        const hue = (hsl.h + offset + 360) % 360;
        colors.push(hslToHex(hue, hsl.s, hsl.l));
      }
      
      return colors;
    }
    
    function generateComplementary(baseHex, count) {
      const hsl = hexToHsl(baseHex);
      const colors = [baseHex];
      
      // Add complementary color
      const compHue = (hsl.h + 180) % 360;
      colors.push(hslToHex(compHue, hsl.s, hsl.l));
      
      // Add variations
      while (colors.length < count) {
        const baseL = 30 + Math.random() * 50;
        colors.push(hslToHex(hsl.h, hsl.s, baseL));
        if (colors.length < count) {
          colors.push(hslToHex(compHue, hsl.s, baseL));
        }
      }
      
      return colors;
    }
    
    function generateTriadic(baseHex, count) {
      const hsl = hexToHsl(baseHex);
      const colors = [];
      const baseColors = [
        hslToHex(hsl.h, hsl.s, hsl.l),
        hslToHex((hsl.h + 120) % 360, hsl.s, hsl.l),
        hslToHex((hsl.h + 240) % 360, hsl.s, hsl.l)
      ];
      
      for (let i = 0; i < count; i++) {
        const baseColor = baseColors[i % 3];
        const variation = hexToHsl(baseColor);
        const lightness = 30 + (Math.floor(i / 3) * 20);
        colors.push(hslToHex(variation.h, variation.s, Math.min(lightness, 90)));
      }
      
      return colors;
    }
    
    function generateTetradic(baseHex, count) {
      const hsl = hexToHsl(baseHex);
      const colors = [];
      const hues = [hsl.h, (hsl.h + 90) % 360, (hsl.h + 180) % 360, (hsl.h + 270) % 360];
      
      for (let i = 0; i < count; i++) {
        const hue = hues[i % 4];
        const lightness = 40 + (Math.floor(i / 4) * 15);
        colors.push(hslToHex(hue, hsl.s, Math.min(lightness, 80)));
      }
      
      return colors;
    }
    
    function generateSplitComplementary(baseHex, count) {
      const hsl = hexToHsl(baseHex);
      const colors = [baseHex];
      const comp = (hsl.h + 180) % 360;
      
      colors.push(hslToHex((comp - 30 + 360) % 360, hsl.s, hsl.l));
      colors.push(hslToHex((comp + 30) % 360, hsl.s, hsl.l));
      
      while (colors.length < count) {
        const baseL = 30 + Math.random() * 50;
        colors.push(hslToHex(hsl.h, hsl.s, baseL));
      }
      
      return colors;
    }
    
    function generatePalette() {
      const baseColor = document.getElementById('baseColor').value;
      const type = document.getElementById('paletteType').value;
      const count = parseInt(document.getElementById('numColors').value);
      
      let colors = [];
      let title = '';
      
      switch (type) {
        case 'monochromatic':
          colors = generateMonochromatic(baseColor, count);
          title = 'Monochromatic Palette';
          break;
        case 'analogous':
          colors = generateAnalogous(baseColor, count);
          title = 'Analogous Palette';
          break;
        case 'complementary':
          colors = generateComplementary(baseColor, count);
          title = 'Complementary Palette';
          break;
        case 'triadic':
          colors = generateTriadic(baseColor, count);
          title = 'Triadic Palette';
          break;
        case 'tetradic':
          colors = generateTetradic(baseColor, count);
          title = 'Tetradic Palette';
          break;
        case 'split-complementary':
          colors = generateSplitComplementary(baseColor, count);
          title = 'Split Complementary Palette';
          break;
      }
      
      document.getElementById('paletteTitle').textContent = title;
      renderPalette(colors);
    }
    
    function renderPalette(colors) {
      const grid = document.getElementById('paletteGrid');
      grid.innerHTML = colors.map(color => `
        <div class="color-card" onclick="copyColor('${color}')">
          <div class="color-swatch" style="background: ${color}"></div>
          <div class="color-info">
            <div class="color-code">${color}</div>
            <div class="color-name">Click to copy</div>
          </div>
        </div>
      `).join('');
    }
    
    function copyColor(color) {
      navigator.clipboard.writeText(color).then(() => {
        const toast = document.getElementById('toast');
        toast.classList.add('show');
        setTimeout(() => toast.classList.remove('show'), 2000);
      });
    }
    
    document.getElementById('baseColor').addEventListener('change', generatePalette);
    document.getElementById('paletteType').addEventListener('change', generatePalette);
    document.getElementById('numColors').addEventListener('change', generatePalette);
    
    generatePalette();

function hexToHsl(hex) {
      const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      if (!result) return null;
      
      let r = parseInt(result[1], 16) / 255;
      let g = parseInt(result[2], 16) / 255;
      let b = parseInt(result[3], 16) / 255;
      
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
      
      return { h: h * 360, s: s * 100, l: l * 100 };
    }
    
    function hslToHex(h, s, l) {
      h /= 360; s /= 100; l /= 100;
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
    
    function generateMonochromatic(baseHex, count) {
      const hsl = hexToHsl(baseHex);
      const colors = [];
      
      for (let i = 0; i < count; i++) {
        const lightness = 20 + (60 / (count - 1)) * i;
        colors.push(hslToHex(hsl.h, hsl.s, lightness));
      }
      
      return colors;
    }
    
    function generateAnalogous(baseHex, count) {
      const hsl = hexToHsl(baseHex);
      const colors = [];
      const angleStep = 30;
      
      for (let i = 0; i < count; i++) {
        const offset = (i - Math.floor(count / 2)) * angleStep;
        const hue = (hsl.h + offset + 360) % 360;
        colors.push(hslToHex(hue, hsl.s, hsl.l));
      }
      
      return colors;
    }
    
    function generateComplementary(baseHex, count) {
      const hsl = hexToHsl(baseHex);
      const colors = [baseHex];
      
      // Add complementary color
      const compHue = (hsl.h + 180) % 360;
      colors.push(hslToHex(compHue, hsl.s, hsl.l));
      
      // Add variations
      while (colors.length < count) {
        const baseL = 30 + Math.random() * 50;
        colors.push(hslToHex(hsl.h, hsl.s, baseL));
        if (colors.length < count) {
          colors.push(hslToHex(compHue, hsl.s, baseL));
        }
      }
      
      return colors;
    }
    
    function generateTriadic(baseHex, count) {
      const hsl = hexToHsl(baseHex);
      const colors = [];
      const baseColors = [
        hslToHex(hsl.h, hsl.s, hsl.l),
        hslToHex((hsl.h + 120) % 360, hsl.s, hsl.l),
        hslToHex((hsl.h + 240) % 360, hsl.s, hsl.l)
      ];
      
      for (let i = 0; i < count; i++) {
        const baseColor = baseColors[i % 3];
        const variation = hexToHsl(baseColor);
        const lightness = 30 + (Math.floor(i / 3) * 20);
        colors.push(hslToHex(variation.h, variation.s, Math.min(lightness, 90)));
      }
      
      return colors;
    }
    
    function generateTetradic(baseHex, count) {
      const hsl = hexToHsl(baseHex);
      const colors = [];
      const hues = [hsl.h, (hsl.h + 90) % 360, (hsl.h + 180) % 360, (hsl.h + 270) % 360];
      
      for (let i = 0; i < count; i++) {
        const hue = hues[i % 4];
        const lightness = 40 + (Math.floor(i / 4) * 15);
        colors.push(hslToHex(hue, hsl.s, Math.min(lightness, 80)));
      }
      
      return colors;
    }
    
    function generateSplitComplementary(baseHex, count) {
      const hsl = hexToHsl(baseHex);
      const colors = [baseHex];
      const comp = (hsl.h + 180) % 360;
      
      colors.push(hslToHex((comp - 30 + 360) % 360, hsl.s, hsl.l));
      colors.push(hslToHex((comp + 30) % 360, hsl.s, hsl.l));
      
      while (colors.length < count) {
        const baseL = 30 + Math.random() * 50;
        colors.push(hslToHex(hsl.h, hsl.s, baseL));
      }
      
      return colors;
    }
    
    function generatePalette() {
      const baseColor = document.getElementById('baseColor').value;
      const type = document.getElementById('paletteType').value;
      const count = parseInt(document.getElementById('numColors').value);
      
      let colors = [];
      let title = '';
      
      switch (type) {
        case 'monochromatic':
          colors = generateMonochromatic(baseColor, count);
          title = 'Monochromatic Palette';
          break;
        case 'analogous':
          colors = generateAnalogous(baseColor, count);
          title = 'Analogous Palette';
          break;
        case 'complementary':
          colors = generateComplementary(baseColor, count);
          title = 'Complementary Palette';
          break;
        case 'triadic':
          colors = generateTriadic(baseColor, count);
          title = 'Triadic Palette';
          break;
        case 'tetradic':
          colors = generateTetradic(baseColor, count);
          title = 'Tetradic Palette';
          break;
        case 'split-complementary':
          colors = generateSplitComplementary(baseColor, count);
          title = 'Split Complementary Palette';
          break;
      }
      
      document.getElementById('paletteTitle').textContent = title;
      renderPalette(colors);
    }
    
    function renderPalette(colors) {
      const grid = document.getElementById('paletteGrid');
      grid.innerHTML = colors.map(color => `
        <div class="color-card" onclick="copyColor('${color}')">
          <div class="color-swatch" style="background: ${color}"></div>
          <div class="color-info">
            <div class="color-code">${color}</div>
            <div class="color-name">Click to copy</div>
          </div>
        </div>
      `).join('');
    }
    
    function copyColor(color) {
      navigator.clipboard.writeText(color).then(() => {
        const toast = document.getElementById('toast');
        toast.classList.add('show');
        setTimeout(() => toast.classList.remove('show'), 2000);
      });
    }
    
    document.getElementById('baseColor').addEventListener('change', generatePalette);
    document.getElementById('paletteType').addEventListener('change', generatePalette);
    document.getElementById('numColors').addEventListener('change', generatePalette);
    
    generatePalette();


