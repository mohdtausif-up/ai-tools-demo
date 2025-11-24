const harmonies = [
      {
        name: 'Complementary',
        desc: 'Colors opposite on the wheel. High contrast, vibrant.',
        angles: [0, 180]
      },
      {
        name: 'Split Complementary',
        desc: 'Base color plus two adjacent to its complement.',
        angles: [0, 150, 210]
      },
      {
        name: 'Analogous',
        desc: 'Three colors side by side on the wheel. Harmonious.',
        angles: [0, 30, 60]
      },
      {
        name: 'Triadic',
        desc: 'Three evenly spaced colors. Balanced and vibrant.',
        angles: [0, 120, 240]
      },
      {
        name: 'Tetradic',
        desc: 'Four colors in two complementary pairs.',
        angles: [0, 90, 180, 270]
      },
      {
        name: 'Square',
        desc: 'Four evenly spaced colors. Balanced variety.',
        angles: [0, 90, 180, 270]
      }
    ];
    
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
    
    function generateHarmony(baseHex, angles) {
      const hsl = hexToHsl(baseHex);
      return angles.map(angle => {
        const newHue = (hsl.h + angle) % 360;
        return hslToHex(newHue, hsl.s, hsl.l);
      });
    }
    
    function drawColorWheel() {
      const canvas = document.getElementById('colorWheel');
      const ctx = canvas.getContext('2d');
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const radius = canvas.width / 2 - 10;
      
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw color wheel
      for (let angle = 0; angle < 360; angle++) {
        const startAngle = (angle - 90) * Math.PI / 180;
        const endAngle = (angle + 1 - 90) * Math.PI / 180;
        
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.arc(centerX, centerY, radius, startAngle, endAngle);
        ctx.closePath();
        
        const color = hslToHex(angle, 80, 60);
        ctx.fillStyle = color;
        ctx.fill();
      }
      
      // Draw center circle
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius * 0.3, 0, 2 * Math.PI);
      ctx.fillStyle = 'white';
      ctx.fill();
      
      // Draw base color indicator
      const baseHsl = hexToHsl(document.getElementById('baseColor').value);
      const indicatorAngle = (baseHsl.h - 90) * Math.PI / 180;
      const indicatorRadius = radius * 0.85;
      const x = centerX + indicatorRadius * Math.cos(indicatorAngle);
      const y = centerY + indicatorRadius * Math.sin(indicatorAngle);
      
      ctx.beginPath();
      ctx.arc(x, y, 12, 0, 2 * Math.PI);
      ctx.fillStyle = 'white';
      ctx.fill();
      ctx.strokeStyle = '#2d3748';
      ctx.lineWidth = 3;
      ctx.stroke();
    }
    
    function updateHarmonies() {
      const baseColor = document.getElementById('baseColor').value;
      const grid = document.getElementById('harmonyGrid');
      
      grid.innerHTML = harmonies.map(harmony => {
        const colors = generateHarmony(baseColor, harmony.angles);
        const colorBlocks = colors.map(color => `
          <div class="color-block" style="background: ${color}" onclick="copyColor('${color}')">
            <span class="color-label">${color}</span>
          </div>
        `).join('');
        
        return `
          <div class="harmony-card">
            <div class="harmony-title">${harmony.name}</div>
            <div class="harmony-desc">${harmony.desc}</div>
            <div class="color-row">${colorBlocks}</div>
          </div>
        `;
      }).join('');
      
      drawColorWheel();
    }
    
    function copyColor(color) {
      navigator.clipboard.writeText(color).then(() => {
        const toast = document.getElementById('toast');
        toast.classList.add('show');
        setTimeout(() => toast.classList.remove('show'), 2000);
      });
    }
    
    document.getElementById('baseColor').addEventListener('input', updateHarmonies);
    
    updateHarmonies();

const harmonies = [
      {
        name: 'Complementary',
        desc: 'Colors opposite on the wheel. High contrast, vibrant.',
        angles: [0, 180]
      },
      {
        name: 'Split Complementary',
        desc: 'Base color plus two adjacent to its complement.',
        angles: [0, 150, 210]
      },
      {
        name: 'Analogous',
        desc: 'Three colors side by side on the wheel. Harmonious.',
        angles: [0, 30, 60]
      },
      {
        name: 'Triadic',
        desc: 'Three evenly spaced colors. Balanced and vibrant.',
        angles: [0, 120, 240]
      },
      {
        name: 'Tetradic',
        desc: 'Four colors in two complementary pairs.',
        angles: [0, 90, 180, 270]
      },
      {
        name: 'Square',
        desc: 'Four evenly spaced colors. Balanced variety.',
        angles: [0, 90, 180, 270]
      }
    ];
    
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
    
    function generateHarmony(baseHex, angles) {
      const hsl = hexToHsl(baseHex);
      return angles.map(angle => {
        const newHue = (hsl.h + angle) % 360;
        return hslToHex(newHue, hsl.s, hsl.l);
      });
    }
    
    function drawColorWheel() {
      const canvas = document.getElementById('colorWheel');
      const ctx = canvas.getContext('2d');
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const radius = canvas.width / 2 - 10;
      
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw color wheel
      for (let angle = 0; angle < 360; angle++) {
        const startAngle = (angle - 90) * Math.PI / 180;
        const endAngle = (angle + 1 - 90) * Math.PI / 180;
        
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.arc(centerX, centerY, radius, startAngle, endAngle);
        ctx.closePath();
        
        const color = hslToHex(angle, 80, 60);
        ctx.fillStyle = color;
        ctx.fill();
      }
      
      // Draw center circle
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius * 0.3, 0, 2 * Math.PI);
      ctx.fillStyle = 'white';
      ctx.fill();
      
      // Draw base color indicator
      const baseHsl = hexToHsl(document.getElementById('baseColor').value);
      const indicatorAngle = (baseHsl.h - 90) * Math.PI / 180;
      const indicatorRadius = radius * 0.85;
      const x = centerX + indicatorRadius * Math.cos(indicatorAngle);
      const y = centerY + indicatorRadius * Math.sin(indicatorAngle);
      
      ctx.beginPath();
      ctx.arc(x, y, 12, 0, 2 * Math.PI);
      ctx.fillStyle = 'white';
      ctx.fill();
      ctx.strokeStyle = '#2d3748';
      ctx.lineWidth = 3;
      ctx.stroke();
    }
    
    function updateHarmonies() {
      const baseColor = document.getElementById('baseColor').value;
      const grid = document.getElementById('harmonyGrid');
      
      grid.innerHTML = harmonies.map(harmony => {
        const colors = generateHarmony(baseColor, harmony.angles);
        const colorBlocks = colors.map(color => `
          <div class="color-block" style="background: ${color}" onclick="copyColor('${color}')">
            <span class="color-label">${color}</span>
          </div>
        `).join('');
        
        return `
          <div class="harmony-card">
            <div class="harmony-title">${harmony.name}</div>
            <div class="harmony-desc">${harmony.desc}</div>
            <div class="color-row">${colorBlocks}</div>
          </div>
        `;
      }).join('');
      
      drawColorWheel();
    }
    
    function copyColor(color) {
      navigator.clipboard.writeText(color).then(() => {
        const toast = document.getElementById('toast');
        toast.classList.add('show');
        setTimeout(() => toast.classList.remove('show'), 2000);
      });
    }
    
    document.getElementById('baseColor').addEventListener('input', updateHarmonies);
    
    updateHarmonies();


