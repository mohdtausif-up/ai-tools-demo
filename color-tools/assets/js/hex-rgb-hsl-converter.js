let updating = false;
    
    function hexToRgb(hex) {
      hex = hex.replace('#', '');
      if (hex.length === 3) {
        hex = hex.split('').map(c => c + c).join('');
      }
      const num = parseInt(hex, 16);
      return {
        r: (num >> 16) & 255,
        g: (num >> 8) & 255,
        b: num & 255
      };
    }
    
    function rgbToHex(r, g, b) {
      return '#' + [r, g, b].map(x => {
        const hex = x.toString(16);
        return hex.length === 1 ? '0' + hex : hex;
      }).join('');
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
    
    function hslToRgb(h, s, l) {
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
      return {
        r: Math.round(r * 255),
        g: Math.round(g * 255),
        b: Math.round(b * 255)
      };
    }
    
    function updateFromHex() {
      if (updating) return;
      updating = true;
      
      let hex = hexInput.value;
      if (!hex.startsWith('#')) hex = '#' + hex;
      
      try {
        const rgb = hexToRgb(hex);
        const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
        
        rInput.value = rgb.r;
        gInput.value = rgb.g;
        bInput.value = rgb.b;
        
        hInput.value = hsl.h;
        sInput.value = hsl.s;
        lInput.value = hsl.l;
        
        updateDisplay();
      } catch (e) {}
      
      updating = false;
    }
    
    function updateFromRgb() {
      if (updating) return;
      updating = true;
      
      const r = parseInt(rInput.value);
      const g = parseInt(gInput.value);
      const b = parseInt(bInput.value);
      
      const hex = rgbToHex(r, g, b);
      const hsl = rgbToHsl(r, g, b);
      
      hexInput.value = hex;
      hInput.value = hsl.h;
      sInput.value = hsl.s;
      lInput.value = hsl.l;
      
      updateDisplay();
      updating = false;
    }
    
    function updateFromHsl() {
      if (updating) return;
      updating = true;
      
      const h = parseInt(hInput.value);
      const s = parseInt(sInput.value);
      const l = parseInt(lInput.value);
      
      const rgb = hslToRgb(h, s, l);
      const hex = rgbToHex(rgb.r, rgb.g, rgb.b);
      
      hexInput.value = hex;
      rInput.value = rgb.r;
      gInput.value = rgb.g;
      bInput.value = rgb.b;
      
      updateDisplay();
      updating = false;
    }
    
    function updateDisplay() {
      const hex = hexInput.value;
      const r = rInput.value, g = gInput.value, b = bInput.value;
      const h = hInput.value, s = sInput.value, l = lInput.value;
      
      rValue.textContent = r;
      gValue.textContent = g;
      bValue.textContent = b;
      hValue.textContent = h + '°';
      sValue.textContent = s + '%';
      lValue.textContent = l + '%';
      
      const color = hex;
      hexPreview.style.backgroundColor = color;
      rgbPreview.style.backgroundColor = color;
      hslPreview.style.backgroundColor = color;
      largePreview.style.backgroundColor = color;
      
      displayHex.textContent = hex;
      displayRgb.textContent = `rgb(${r}, ${g}, ${b})`;
      displayHsl.textContent = `hsl(${h}, ${s}%, ${l}%)`;
    }
    
    hexInput.addEventListener('input', updateFromHex);
    [rInput, gInput, bInput].forEach(input => {
      input.addEventListener('input', updateFromRgb);
    });
    [hInput, sInput, lInput].forEach(input => {
      input.addEventListener('input', updateFromHsl);
    });
    
    updateDisplay();

let updating = false;
    
    function hexToRgb(hex) {
      hex = hex.replace('#', '');
      if (hex.length === 3) {
        hex = hex.split('').map(c => c + c).join('');
      }
      const num = parseInt(hex, 16);
      return {
        r: (num >> 16) & 255,
        g: (num >> 8) & 255,
        b: num & 255
      };
    }
    
    function rgbToHex(r, g, b) {
      return '#' + [r, g, b].map(x => {
        const hex = x.toString(16);
        return hex.length === 1 ? '0' + hex : hex;
      }).join('');
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
    
    function hslToRgb(h, s, l) {
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
      return {
        r: Math.round(r * 255),
        g: Math.round(g * 255),
        b: Math.round(b * 255)
      };
    }
    
    function updateFromHex() {
      if (updating) return;
      updating = true;
      
      let hex = hexInput.value;
      if (!hex.startsWith('#')) hex = '#' + hex;
      
      try {
        const rgb = hexToRgb(hex);
        const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
        
        rInput.value = rgb.r;
        gInput.value = rgb.g;
        bInput.value = rgb.b;
        
        hInput.value = hsl.h;
        sInput.value = hsl.s;
        lInput.value = hsl.l;
        
        updateDisplay();
      } catch (e) {}
      
      updating = false;
    }
    
    function updateFromRgb() {
      if (updating) return;
      updating = true;
      
      const r = parseInt(rInput.value);
      const g = parseInt(gInput.value);
      const b = parseInt(bInput.value);
      
      const hex = rgbToHex(r, g, b);
      const hsl = rgbToHsl(r, g, b);
      
      hexInput.value = hex;
      hInput.value = hsl.h;
      sInput.value = hsl.s;
      lInput.value = hsl.l;
      
      updateDisplay();
      updating = false;
    }
    
    function updateFromHsl() {
      if (updating) return;
      updating = true;
      
      const h = parseInt(hInput.value);
      const s = parseInt(sInput.value);
      const l = parseInt(lInput.value);
      
      const rgb = hslToRgb(h, s, l);
      const hex = rgbToHex(rgb.r, rgb.g, rgb.b);
      
      hexInput.value = hex;
      rInput.value = rgb.r;
      gInput.value = rgb.g;
      bInput.value = rgb.b;
      
      updateDisplay();
      updating = false;
    }
    
    function updateDisplay() {
      const hex = hexInput.value;
      const r = rInput.value, g = gInput.value, b = bInput.value;
      const h = hInput.value, s = sInput.value, l = lInput.value;
      
      rValue.textContent = r;
      gValue.textContent = g;
      bValue.textContent = b;
      hValue.textContent = h + '°';
      sValue.textContent = s + '%';
      lValue.textContent = l + '%';
      
      const color = hex;
      hexPreview.style.backgroundColor = color;
      rgbPreview.style.backgroundColor = color;
      hslPreview.style.backgroundColor = color;
      largePreview.style.backgroundColor = color;
      
      displayHex.textContent = hex;
      displayRgb.textContent = `rgb(${r}, ${g}, ${b})`;
      displayHsl.textContent = `hsl(${h}, ${s}%, ${l}%)`;
    }
    
    hexInput.addEventListener('input', updateFromHex);
    [rInput, gInput, bInput].forEach(input => {
      input.addEventListener('input', updateFromRgb);
    });
    [hInput, sInput, lInput].forEach(input => {
      input.addEventListener('input', updateFromHsl);
    });
    
    updateDisplay();


