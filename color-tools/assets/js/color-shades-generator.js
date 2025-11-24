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
    
    function mixColors(color1, color2, weight) {
      const w = weight * 2 - 1;
      const w1 = (w + 1) / 2;
      const w2 = 1 - w1;
      
      return {
        r: color1.r * w1 + color2.r * w2,
        g: color1.g * w1 + color2.g * w2,
        b: color1.b * w1 + color2.b * w2
      };
    }
    
    function generateTints(baseHex, steps = 9) {
      const base = hexToRgb(baseHex);
      const white = { r: 255, g: 255, b: 255 };
      const tints = [];
      
      for (let i = 1; i <= steps; i++) {
        const weight = i / (steps + 1);
        const mixed = mixColors(white, base, weight);
        tints.push(rgbToHex(mixed.r, mixed.g, mixed.b));
      }
      
      return tints;
    }
    
    function generateShades(baseHex, steps = 9) {
      const base = hexToRgb(baseHex);
      const black = { r: 0, g: 0, b: 0 };
      const shades = [];
      
      for (let i = 1; i <= steps; i++) {
        const weight = i / (steps + 1);
        const mixed = mixColors(base, black, weight);
        shades.push(rgbToHex(mixed.r, mixed.g, mixed.b));
      }
      
      return shades;
    }
    
    function generateTones(baseHex, steps = 9) {
      const base = hexToRgb(baseHex);
      const gray = { r: 128, g: 128, b: 128 };
      const tones = [];
      
      for (let i = 1; i <= steps; i++) {
        const weight = i / (steps + 1);
        const mixed = mixColors(base, gray, weight);
        tones.push(rgbToHex(mixed.r, mixed.g, mixed.b));
      }
      
      return tones;
    }
    
    function generateTailwindScale(baseHex) {
      const base = hexToRgb(baseHex);
      const white = { r: 255, g: 255, b: 255 };
      const black = { r: 0, g: 0, b: 0 };
      const scale = {};
      
      // 50-400: tints
      scale[50] = rgbToHex(...Object.values(mixColors(white, base, 0.05)));
      scale[100] = rgbToHex(...Object.values(mixColors(white, base, 0.1)));
      scale[200] = rgbToHex(...Object.values(mixColors(white, base, 0.25)));
      scale[300] = rgbToHex(...Object.values(mixColors(white, base, 0.4)));
      scale[400] = rgbToHex(...Object.values(mixColors(white, base, 0.6)));
      
      // 500: base
      scale[500] = baseHex;
      
      // 600-950: shades
      scale[600] = rgbToHex(...Object.values(mixColors(base, black, 0.15)));
      scale[700] = rgbToHex(...Object.values(mixColors(base, black, 0.3)));
      scale[800] = rgbToHex(...Object.values(mixColors(base, black, 0.5)));
      scale[900] = rgbToHex(...Object.values(mixColors(base, black, 0.7)));
      scale[950] = rgbToHex(...Object.values(mixColors(base, black, 0.85)));
      
      return scale;
    }
    
    function copyColor(hex) {
      navigator.clipboard.writeText(hex).then(() => {
        const toast = document.getElementById('toast');
        toast.classList.add('show');
        setTimeout(() => toast.classList.remove('show'), 2000);
      });
    }
    
    function updateColors() {
      const baseHex = document.getElementById('baseColor').value;
      const rgb = hexToRgb(baseHex);
      
      // Tints
      const tints = generateTints(baseHex);
      document.getElementById('tintsScale').innerHTML = tints.map((hex, i) => `
        <div class="color-item" onclick="copyColor('${hex}')">
          <div class="color-swatch" style="background: ${hex}">
            <span class="color-label">${hex}</span>
          </div>
          <div class="color-value">${Math.round((i + 1) * 10)}% lighter</div>
        </div>
      `).join('');
      
      // Base color
      document.getElementById('baseColorDisplay').innerHTML = `
        <div class="color-item" onclick="copyColor('${baseHex}')" style="max-width: 300px; margin: 0 auto;">
          <div class="color-swatch" style="background: ${baseHex}; height: 150px;">
            <span class="color-label">${baseHex}</span>
          </div>
          <div class="color-value">RGB(${rgb.r}, ${rgb.g}, ${rgb.b})</div>
        </div>
      `;
      
      // Shades
      const shades = generateShades(baseHex);
      document.getElementById('shadesScale').innerHTML = shades.map((hex, i) => `
        <div class="color-item" onclick="copyColor('${hex}')">
          <div class="color-swatch" style="background: ${hex}">
            <span class="color-label">${hex}</span>
          </div>
          <div class="color-value">${Math.round((i + 1) * 10)}% darker</div>
        </div>
      `).join('');
      
      // Tones
      const tones = generateTones(baseHex);
      document.getElementById('tonesScale').innerHTML = tones.map((hex, i) => `
        <div class="color-item" onclick="copyColor('${hex}')">
          <div class="color-swatch" style="background: ${hex}">
            <span class="color-label">${hex}</span>
          </div>
          <div class="color-value">${Math.round((i + 1) * 10)}% gray</div>
        </div>
      `).join('');
      
      // Tailwind scale
      const twScale = generateTailwindScale(baseHex);
      document.getElementById('tailwindScale').innerHTML = Object.entries(twScale).map(([weight, hex]) => `
        <div class="color-item" onclick="copyColor('${hex}')">
          <div class="color-swatch" style="background: ${hex}">
            <div class="tw-label">${weight}</div>
          </div>
          <div class="color-value">${hex}</div>
        </div>
      `).join('');
    }
    
    document.getElementById('baseColor').addEventListener('input', updateColors);
    updateColors();

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
    
    function mixColors(color1, color2, weight) {
      const w = weight * 2 - 1;
      const w1 = (w + 1) / 2;
      const w2 = 1 - w1;
      
      return {
        r: color1.r * w1 + color2.r * w2,
        g: color1.g * w1 + color2.g * w2,
        b: color1.b * w1 + color2.b * w2
      };
    }
    
    function generateTints(baseHex, steps = 9) {
      const base = hexToRgb(baseHex);
      const white = { r: 255, g: 255, b: 255 };
      const tints = [];
      
      for (let i = 1; i <= steps; i++) {
        const weight = i / (steps + 1);
        const mixed = mixColors(white, base, weight);
        tints.push(rgbToHex(mixed.r, mixed.g, mixed.b));
      }
      
      return tints;
    }
    
    function generateShades(baseHex, steps = 9) {
      const base = hexToRgb(baseHex);
      const black = { r: 0, g: 0, b: 0 };
      const shades = [];
      
      for (let i = 1; i <= steps; i++) {
        const weight = i / (steps + 1);
        const mixed = mixColors(base, black, weight);
        shades.push(rgbToHex(mixed.r, mixed.g, mixed.b));
      }
      
      return shades;
    }
    
    function generateTones(baseHex, steps = 9) {
      const base = hexToRgb(baseHex);
      const gray = { r: 128, g: 128, b: 128 };
      const tones = [];
      
      for (let i = 1; i <= steps; i++) {
        const weight = i / (steps + 1);
        const mixed = mixColors(base, gray, weight);
        tones.push(rgbToHex(mixed.r, mixed.g, mixed.b));
      }
      
      return tones;
    }
    
    function generateTailwindScale(baseHex) {
      const base = hexToRgb(baseHex);
      const white = { r: 255, g: 255, b: 255 };
      const black = { r: 0, g: 0, b: 0 };
      const scale = {};
      
      // 50-400: tints
      scale[50] = rgbToHex(...Object.values(mixColors(white, base, 0.05)));
      scale[100] = rgbToHex(...Object.values(mixColors(white, base, 0.1)));
      scale[200] = rgbToHex(...Object.values(mixColors(white, base, 0.25)));
      scale[300] = rgbToHex(...Object.values(mixColors(white, base, 0.4)));
      scale[400] = rgbToHex(...Object.values(mixColors(white, base, 0.6)));
      
      // 500: base
      scale[500] = baseHex;
      
      // 600-950: shades
      scale[600] = rgbToHex(...Object.values(mixColors(base, black, 0.15)));
      scale[700] = rgbToHex(...Object.values(mixColors(base, black, 0.3)));
      scale[800] = rgbToHex(...Object.values(mixColors(base, black, 0.5)));
      scale[900] = rgbToHex(...Object.values(mixColors(base, black, 0.7)));
      scale[950] = rgbToHex(...Object.values(mixColors(base, black, 0.85)));
      
      return scale;
    }
    
    function copyColor(hex) {
      navigator.clipboard.writeText(hex).then(() => {
        const toast = document.getElementById('toast');
        toast.classList.add('show');
        setTimeout(() => toast.classList.remove('show'), 2000);
      });
    }
    
    function updateColors() {
      const baseHex = document.getElementById('baseColor').value;
      const rgb = hexToRgb(baseHex);
      
      // Tints
      const tints = generateTints(baseHex);
      document.getElementById('tintsScale').innerHTML = tints.map((hex, i) => `
        <div class="color-item" onclick="copyColor('${hex}')">
          <div class="color-swatch" style="background: ${hex}">
            <span class="color-label">${hex}</span>
          </div>
          <div class="color-value">${Math.round((i + 1) * 10)}% lighter</div>
        </div>
      `).join('');
      
      // Base color
      document.getElementById('baseColorDisplay').innerHTML = `
        <div class="color-item" onclick="copyColor('${baseHex}')" style="max-width: 300px; margin: 0 auto;">
          <div class="color-swatch" style="background: ${baseHex}; height: 150px;">
            <span class="color-label">${baseHex}</span>
          </div>
          <div class="color-value">RGB(${rgb.r}, ${rgb.g}, ${rgb.b})</div>
        </div>
      `;
      
      // Shades
      const shades = generateShades(baseHex);
      document.getElementById('shadesScale').innerHTML = shades.map((hex, i) => `
        <div class="color-item" onclick="copyColor('${hex}')">
          <div class="color-swatch" style="background: ${hex}">
            <span class="color-label">${hex}</span>
          </div>
          <div class="color-value">${Math.round((i + 1) * 10)}% darker</div>
        </div>
      `).join('');
      
      // Tones
      const tones = generateTones(baseHex);
      document.getElementById('tonesScale').innerHTML = tones.map((hex, i) => `
        <div class="color-item" onclick="copyColor('${hex}')">
          <div class="color-swatch" style="background: ${hex}">
            <span class="color-label">${hex}</span>
          </div>
          <div class="color-value">${Math.round((i + 1) * 10)}% gray</div>
        </div>
      `).join('');
      
      // Tailwind scale
      const twScale = generateTailwindScale(baseHex);
      document.getElementById('tailwindScale').innerHTML = Object.entries(twScale).map(([weight, hex]) => `
        <div class="color-item" onclick="copyColor('${hex}')">
          <div class="color-swatch" style="background: ${hex}">
            <div class="tw-label">${weight}</div>
          </div>
          <div class="color-value">${hex}</div>
        </div>
      `).join('');
    }
    
    document.getElementById('baseColor').addEventListener('input', updateColors);
    updateColors();


