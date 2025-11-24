const colorInput = document.getElementById('colorInput');
    const colorDisplay = document.getElementById('colorDisplay');
    const hexCode = document.getElementById('hexCode');
    const rgbCode = document.getElementById('rgbCode');
    const hslCode = document.getElementById('hslCode');
    const cmykCode = document.getElementById('cmykCode');
    const historyColors = document.getElementById('historyColors');
    const toast = document.getElementById('toast');
    
    let history = JSON.parse(localStorage.getItem('colorHistory') || '[]');
    
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
    
    function rgbToCmyk(r, g, b) {
      let c = 1 - (r / 255);
      let m = 1 - (g / 255);
      let y = 1 - (b / 255);
      let k = Math.min(c, m, y);
      
      if (k === 1) {
        return { c: 0, m: 0, y: 0, k: 100 };
      }
      
      c = Math.round(((c - k) / (1 - k)) * 100);
      m = Math.round(((m - k) / (1 - k)) * 100);
      y = Math.round(((y - k) / (1 - k)) * 100);
      k = Math.round(k * 100);
      
      return { c, m, y, k };
    }
    
    function updateColor(hex) {
      colorDisplay.style.backgroundColor = hex;
      hexCode.textContent = hex;
      
      const rgb = hexToRgb(hex);
      if (rgb) {
        rgbCode.textContent = `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
        
        const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
        hslCode.textContent = `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`;
        
        const cmyk = rgbToCmyk(rgb.r, rgb.g, rgb.b);
        cmykCode.textContent = `cmyk(${cmyk.c}%, ${cmyk.m}%, ${cmyk.y}%, ${cmyk.k}%)`;
        
        addToHistory(hex);
      }
    }
    
    function addToHistory(color) {
      if (!history.includes(color)) {
        history.unshift(color);
        if (history.length > 12) history.pop();
        localStorage.setItem('colorHistory', JSON.stringify(history));
        renderHistory();
      }
    }
    
    function renderHistory() {
      historyColors.innerHTML = history.map(color => 
        `<div class="history-color" style="background: ${color}" onclick="selectFromHistory('${color}')"></div>`
      ).join('');
    }
    
    function selectFromHistory(color) {
      colorInput.value = color;
      updateColor(color);
    }
    
    function copyCode(type) {
      let text = '';
      switch(type) {
        case 'hex': text = hexCode.textContent; break;
        case 'rgb': text = rgbCode.textContent; break;
        case 'hsl': text = hslCode.textContent; break;
        case 'cmyk': text = cmykCode.textContent; break;
      }
      
      navigator.clipboard.writeText(text).then(() => {
        toast.classList.add('show');
        setTimeout(() => toast.classList.remove('show'), 2000);
      });
    }
    
    colorInput.addEventListener('input', (e) => updateColor(e.target.value));
    colorDisplay.addEventListener('click', () => colorInput.click());
    
    updateColor(colorInput.value);
    renderHistory();

const colorInput = document.getElementById('colorInput');
    const colorDisplay = document.getElementById('colorDisplay');
    const hexCode = document.getElementById('hexCode');
    const rgbCode = document.getElementById('rgbCode');
    const hslCode = document.getElementById('hslCode');
    const cmykCode = document.getElementById('cmykCode');
    const historyColors = document.getElementById('historyColors');
    const toast = document.getElementById('toast');
    
    let history = JSON.parse(localStorage.getItem('colorHistory') || '[]');
    
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
    
    function rgbToCmyk(r, g, b) {
      let c = 1 - (r / 255);
      let m = 1 - (g / 255);
      let y = 1 - (b / 255);
      let k = Math.min(c, m, y);
      
      if (k === 1) {
        return { c: 0, m: 0, y: 0, k: 100 };
      }
      
      c = Math.round(((c - k) / (1 - k)) * 100);
      m = Math.round(((m - k) / (1 - k)) * 100);
      y = Math.round(((y - k) / (1 - k)) * 100);
      k = Math.round(k * 100);
      
      return { c, m, y, k };
    }
    
    function updateColor(hex) {
      colorDisplay.style.backgroundColor = hex;
      hexCode.textContent = hex;
      
      const rgb = hexToRgb(hex);
      if (rgb) {
        rgbCode.textContent = `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
        
        const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
        hslCode.textContent = `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`;
        
        const cmyk = rgbToCmyk(rgb.r, rgb.g, rgb.b);
        cmykCode.textContent = `cmyk(${cmyk.c}%, ${cmyk.m}%, ${cmyk.y}%, ${cmyk.k}%)`;
        
        addToHistory(hex);
      }
    }
    
    function addToHistory(color) {
      if (!history.includes(color)) {
        history.unshift(color);
        if (history.length > 12) history.pop();
        localStorage.setItem('colorHistory', JSON.stringify(history));
        renderHistory();
      }
    }
    
    function renderHistory() {
      historyColors.innerHTML = history.map(color => 
        `<div class="history-color" style="background: ${color}" onclick="selectFromHistory('${color}')"></div>`
      ).join('');
    }
    
    function selectFromHistory(color) {
      colorInput.value = color;
      updateColor(color);
    }
    
    function copyCode(type) {
      let text = '';
      switch(type) {
        case 'hex': text = hexCode.textContent; break;
        case 'rgb': text = rgbCode.textContent; break;
        case 'hsl': text = hslCode.textContent; break;
        case 'cmyk': text = cmykCode.textContent; break;
      }
      
      navigator.clipboard.writeText(text).then(() => {
        toast.classList.add('show');
        setTimeout(() => toast.classList.remove('show'), 2000);
      });
    }
    
    colorInput.addEventListener('input', (e) => updateColor(e.target.value));
    colorDisplay.addEventListener('click', () => colorInput.click());
    
    updateColor(colorInput.value);
    renderHistory();


