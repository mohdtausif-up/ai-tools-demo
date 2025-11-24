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
        const hex = Math.round(Math.max(0, Math.min(255, x))).toString(16);
        return hex.length === 1 ? '0' + hex : hex;
      };
      return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
    }
    
    function adjustTemperature(hex, temperature) {
      const rgb = hexToRgb(hex);
      const factor = temperature / 100;
      
      let r = rgb.r;
      let g = rgb.g;
      let b = rgb.b;
      
      if (factor > 0) {
        // Warmer - increase red/yellow, decrease blue
        r = r + (255 - r) * factor * 0.5;
        g = g + (255 - g) * factor * 0.2;
        b = b - b * factor * 0.4;
      } else {
        // Cooler - increase blue, decrease red/yellow
        r = r + r * factor * 0.4;
        g = g + g * factor * 0.2;
        b = b + (255 - b) * Math.abs(factor) * 0.5;
      }
      
      return rgbToHex(r, g, b);
    }
    
    let currentAdjustedColor = '#667eea';
    
    function updateColors() {
      const baseHex = document.getElementById('hexInput').value;
      const temperature = parseInt(document.getElementById('temperature').value);
      
      if (!/^#[0-9A-Fa-f]{6}$/.test(baseHex)) return;
      
      document.getElementById('baseColor').value = baseHex;
      
      // Update temperature value display
      let tempText = temperature === 0 ? '0 (Neutral)' : 
                     temperature > 0 ? `+${temperature} (Warmer 🔥)` :
                     `${temperature} (Cooler ❄️)`;
      document.getElementById('tempValue').textContent = tempText;
      
      // Adjust color
      const adjustedHex = adjustTemperature(baseHex, temperature);
      currentAdjustedColor = adjustedHex;
      
      const baseRgb = hexToRgb(baseHex);
      const adjustedRgb = hexToRgb(adjustedHex);
      
      // Update original
      document.getElementById('previewOriginal').style.background = baseHex;
      document.getElementById('hexOriginal').textContent = baseHex;
      document.getElementById('rgbOriginal').textContent = `RGB(${baseRgb.r}, ${baseRgb.g}, ${baseRgb.b})`;
      
      // Update adjusted
      document.getElementById('previewAdjusted').style.background = adjustedHex;
      document.getElementById('hexAdjusted').textContent = adjustedHex;
      document.getElementById('rgbAdjusted').textContent = `RGB(${adjustedRgb.r}, ${adjustedRgb.g}, ${adjustedRgb.b})`;
      
      // Update comparison
      document.getElementById('compLeft').style.background = baseHex;
      document.getElementById('compRight').style.background = adjustedHex;
    }
    
    function copyColor(type) {
      let color;
      if (type === 'original') {
        color = document.getElementById('hexInput').value;
      } else {
        color = currentAdjustedColor;
      }
      
      navigator.clipboard.writeText(color).then(() => {
        const toast = document.getElementById('toast');
        toast.classList.add('show');
        setTimeout(() => toast.classList.remove('show'), 2000);
      });
    }
    
    document.getElementById('baseColor').addEventListener('input', (e) => {
      document.getElementById('hexInput').value = e.target.value;
      updateColors();
    });
    
    document.getElementById('hexInput').addEventListener('input', updateColors);
    document.getElementById('temperature').addEventListener('input', updateColors);
    
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
        const hex = Math.round(Math.max(0, Math.min(255, x))).toString(16);
        return hex.length === 1 ? '0' + hex : hex;
      };
      return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
    }
    
    function adjustTemperature(hex, temperature) {
      const rgb = hexToRgb(hex);
      const factor = temperature / 100;
      
      let r = rgb.r;
      let g = rgb.g;
      let b = rgb.b;
      
      if (factor > 0) {
        // Warmer - increase red/yellow, decrease blue
        r = r + (255 - r) * factor * 0.5;
        g = g + (255 - g) * factor * 0.2;
        b = b - b * factor * 0.4;
      } else {
        // Cooler - increase blue, decrease red/yellow
        r = r + r * factor * 0.4;
        g = g + g * factor * 0.2;
        b = b + (255 - b) * Math.abs(factor) * 0.5;
      }
      
      return rgbToHex(r, g, b);
    }
    
    let currentAdjustedColor = '#667eea';
    
    function updateColors() {
      const baseHex = document.getElementById('hexInput').value;
      const temperature = parseInt(document.getElementById('temperature').value);
      
      if (!/^#[0-9A-Fa-f]{6}$/.test(baseHex)) return;
      
      document.getElementById('baseColor').value = baseHex;
      
      // Update temperature value display
      let tempText = temperature === 0 ? '0 (Neutral)' : 
                     temperature > 0 ? `+${temperature} (Warmer 🔥)` :
                     `${temperature} (Cooler ❄️)`;
      document.getElementById('tempValue').textContent = tempText;
      
      // Adjust color
      const adjustedHex = adjustTemperature(baseHex, temperature);
      currentAdjustedColor = adjustedHex;
      
      const baseRgb = hexToRgb(baseHex);
      const adjustedRgb = hexToRgb(adjustedHex);
      
      // Update original
      document.getElementById('previewOriginal').style.background = baseHex;
      document.getElementById('hexOriginal').textContent = baseHex;
      document.getElementById('rgbOriginal').textContent = `RGB(${baseRgb.r}, ${baseRgb.g}, ${baseRgb.b})`;
      
      // Update adjusted
      document.getElementById('previewAdjusted').style.background = adjustedHex;
      document.getElementById('hexAdjusted').textContent = adjustedHex;
      document.getElementById('rgbAdjusted').textContent = `RGB(${adjustedRgb.r}, ${adjustedRgb.g}, ${adjustedRgb.b})`;
      
      // Update comparison
      document.getElementById('compLeft').style.background = baseHex;
      document.getElementById('compRight').style.background = adjustedHex;
    }
    
    function copyColor(type) {
      let color;
      if (type === 'original') {
        color = document.getElementById('hexInput').value;
      } else {
        color = currentAdjustedColor;
      }
      
      navigator.clipboard.writeText(color).then(() => {
        const toast = document.getElementById('toast');
        toast.classList.add('show');
        setTimeout(() => toast.classList.remove('show'), 2000);
      });
    }
    
    document.getElementById('baseColor').addEventListener('input', (e) => {
      document.getElementById('hexInput').value = e.target.value;
      updateColors();
    });
    
    document.getElementById('hexInput').addEventListener('input', updateColors);
    document.getElementById('temperature').addEventListener('input', updateColors);
    
    updateColors();


