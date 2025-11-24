let lockedColors = new Set();
    let currentColors = [];
    
    function randomInt(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
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
    
    function hexToRgb(hex) {
      const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
      } : null;
    }
    
    function generateRandomColor(type) {
      let h, s, l;
      
      switch(type) {
        case 'pastel':
          h = randomInt(0, 360);
          s = randomInt(25, 50);
          l = randomInt(75, 90);
          break;
        case 'vibrant':
          h = randomInt(0, 360);
          s = randomInt(70, 100);
          l = randomInt(45, 65);
          break;
        case 'dark':
          h = randomInt(0, 360);
          s = randomInt(20, 80);
          l = randomInt(10, 35);
          break;
        case 'light':
          h = randomInt(0, 360);
          s = randomInt(20, 60);
          l = randomInt(75, 95);
          break;
        case 'warm':
          h = randomInt(0, 60);
          s = randomInt(50, 100);
          l = randomInt(40, 70);
          break;
        case 'cool':
          h = randomInt(180, 240);
          s = randomInt(50, 100);
          l = randomInt(40, 70);
          break;
        case 'grayscale':
          h = 0;
          s = 0;
          l = randomInt(10, 90);
          break;
        default:
          h = randomInt(0, 360);
          s = randomInt(20, 100);
          l = randomInt(30, 80);
      }
      
      return hslToHex(h, s, l);
    }
    
    function generateColors() {
      const type = document.getElementById('colorType').value;
      const count = parseInt(document.getElementById('colorCount').value);
      
      // Keep locked colors, generate new ones for unlocked positions
      const newColors = [];
      for (let i = 0; i < count; i++) {
        if (lockedColors.has(i) && currentColors[i]) {
          newColors.push(currentColors[i]);
        } else {
          newColors.push(generateRandomColor(type));
        }
      }
      
      currentColors = newColors;
      renderColors();
    }
    
    function toggleLock(index, event) {
      event.stopPropagation();
      if (lockedColors.has(index)) {
        lockedColors.delete(index);
      } else {
        lockedColors.add(index);
      }
      renderColors();
    }
    
    function copyColor(hex) {
      navigator.clipboard.writeText(hex).then(() => {
        const toast = document.getElementById('toast');
        toast.classList.add('show');
        setTimeout(() => toast.classList.remove('show'), 2000);
      });
    }
    
    function renderColors() {
      const grid = document.getElementById('colorGrid');
      
      grid.innerHTML = currentColors.map((hex, index) => {
        const rgb = hexToRgb(hex);
        const locked = lockedColors.has(index);
        
        return `
          <div class="color-card" onclick="copyColor('${hex}')">
            <div class="color-preview" style="background: ${hex}">
              <button class="lock-btn" onclick="toggleLock(${index}, event)">
                ${locked ? '🔒' : '🔓'}
              </button>
            </div>
            <div class="color-info">
              <div class="color-hex">${hex}</div>
              <div class="color-formats">
                RGB(${rgb.r}, ${rgb.g}, ${rgb.b})
              </div>
            </div>
          </div>
        `;
      }).join('');
    }
    
    // Generate initial colors
    generateColors();
    
    // Spacebar to regenerate
    document.addEventListener('keydown', (e) => {
      if (e.code === 'Space' && e.target.tagName !== 'INPUT' && e.target.tagName !== 'SELECT') {
        e.preventDefault();
        generateColors();
      }
    });

let lockedColors = new Set();
    let currentColors = [];
    
    function randomInt(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
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
    
    function hexToRgb(hex) {
      const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
      } : null;
    }
    
    function generateRandomColor(type) {
      let h, s, l;
      
      switch(type) {
        case 'pastel':
          h = randomInt(0, 360);
          s = randomInt(25, 50);
          l = randomInt(75, 90);
          break;
        case 'vibrant':
          h = randomInt(0, 360);
          s = randomInt(70, 100);
          l = randomInt(45, 65);
          break;
        case 'dark':
          h = randomInt(0, 360);
          s = randomInt(20, 80);
          l = randomInt(10, 35);
          break;
        case 'light':
          h = randomInt(0, 360);
          s = randomInt(20, 60);
          l = randomInt(75, 95);
          break;
        case 'warm':
          h = randomInt(0, 60);
          s = randomInt(50, 100);
          l = randomInt(40, 70);
          break;
        case 'cool':
          h = randomInt(180, 240);
          s = randomInt(50, 100);
          l = randomInt(40, 70);
          break;
        case 'grayscale':
          h = 0;
          s = 0;
          l = randomInt(10, 90);
          break;
        default:
          h = randomInt(0, 360);
          s = randomInt(20, 100);
          l = randomInt(30, 80);
      }
      
      return hslToHex(h, s, l);
    }
    
    function generateColors() {
      const type = document.getElementById('colorType').value;
      const count = parseInt(document.getElementById('colorCount').value);
      
      // Keep locked colors, generate new ones for unlocked positions
      const newColors = [];
      for (let i = 0; i < count; i++) {
        if (lockedColors.has(i) && currentColors[i]) {
          newColors.push(currentColors[i]);
        } else {
          newColors.push(generateRandomColor(type));
        }
      }
      
      currentColors = newColors;
      renderColors();
    }
    
    function toggleLock(index, event) {
      event.stopPropagation();
      if (lockedColors.has(index)) {
        lockedColors.delete(index);
      } else {
        lockedColors.add(index);
      }
      renderColors();
    }
    
    function copyColor(hex) {
      navigator.clipboard.writeText(hex).then(() => {
        const toast = document.getElementById('toast');
        toast.classList.add('show');
        setTimeout(() => toast.classList.remove('show'), 2000);
      });
    }
    
    function renderColors() {
      const grid = document.getElementById('colorGrid');
      
      grid.innerHTML = currentColors.map((hex, index) => {
        const rgb = hexToRgb(hex);
        const locked = lockedColors.has(index);
        
        return `
          <div class="color-card" onclick="copyColor('${hex}')">
            <div class="color-preview" style="background: ${hex}">
              <button class="lock-btn" onclick="toggleLock(${index}, event)">
                ${locked ? '🔒' : '🔓'}
              </button>
            </div>
            <div class="color-info">
              <div class="color-hex">${hex}</div>
              <div class="color-formats">
                RGB(${rgb.r}, ${rgb.g}, ${rgb.b})
              </div>
            </div>
          </div>
        `;
      }).join('');
    }
    
    // Generate initial colors
    generateColors();
    
    // Spacebar to regenerate
    document.addEventListener('keydown', (e) => {
      if (e.code === 'Space' && e.target.tagName !== 'INPUT' && e.target.tagName !== 'SELECT') {
        e.preventDefault();
        generateColors();
      }
    });


