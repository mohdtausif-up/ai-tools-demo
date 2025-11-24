let colorHistory = JSON.parse(localStorage.getItem('colorHistory') || '[]');
    
    function saveColor() {
      const hex = document.getElementById('hexInput').value;
      
      if (!/^#[0-9A-Fa-f]{6}$/.test(hex)) {
        alert('Please enter a valid HEX color');
        return;
      }
      
      colorHistory.unshift({
        hex: hex.toUpperCase(),
        timestamp: Date.now()
      });
      
      localStorage.setItem('colorHistory', JSON.stringify(colorHistory));
      renderColors();
      
      const toast = document.getElementById('toast');
      toast.textContent = 'Color saved!';
      toast.classList.add('show');
      setTimeout(() => toast.classList.remove('show'), 2000);
    }
    
    function deleteColor(index) {
      if (confirm('Delete this color?')) {
        colorHistory.splice(index, 1);
        localStorage.setItem('colorHistory', JSON.stringify(colorHistory));
        renderColors();
      }
    }
    
    function copyColor(hex) {
      navigator.clipboard.writeText(hex).then(() => {
        const toast = document.getElementById('toast');
        toast.textContent = `Copied ${hex}`;
        toast.classList.add('show');
        setTimeout(() => {
          toast.classList.remove('show');
          setTimeout(() => toast.textContent = 'Copied to clipboard!', 300);
        }, 2000);
      });
    }
    
    function clearHistory() {
      if (confirm('Clear all color history? This cannot be undone.')) {
        colorHistory = [];
        localStorage.setItem('colorHistory', JSON.stringify(colorHistory));
        renderColors();
      }
    }
    
    function hexToHsl(hex) {
      const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      if (!result) return { h: 0, s: 0, l: 0 };
      
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
    
    function renderColors() {
      const sortBy = document.getElementById('sortBy').value;
      let sorted = [...colorHistory];
      
      switch(sortBy) {
        case 'oldest':
          sorted.reverse();
          break;
        case 'hue':
          sorted.sort((a, b) => hexToHsl(a.hex).h - hexToHsl(b.hex).h);
          break;
        case 'lightness':
          sorted.sort((a, b) => hexToHsl(a.hex).l - hexToHsl(b.hex).l);
          break;
      }
      
      const grid = document.getElementById('colorsGrid');
      const unique = new Set(colorHistory.map(c => c.hex)).size;
      
      document.getElementById('totalCount').textContent = colorHistory.length;
      document.getElementById('uniqueCount').textContent = unique;
      
      if (sorted.length === 0) {
        grid.innerHTML = '<div class="empty-state">No colors saved yet. Add your first color above! 🎨</div>';
        return;
      }
      
      grid.innerHTML = sorted.map((item, index) => {
        const date = new Date(item.timestamp).toLocaleDateString();
        const time = new Date(item.timestamp).toLocaleTimeString();
        
        return `
          <div class="color-item" onclick="copyColor('${item.hex}')">
            <div class="color-swatch" style="background: ${item.hex}">
              <div class="color-actions">
                <button class="action-btn" onclick="event.stopPropagation(); document.getElementById('hexInput').value='${item.hex}'; document.getElementById('colorInput').value='${item.hex}'">📝</button>
                <button class="action-btn" onclick="event.stopPropagation(); deleteColor(${index})">🗑️</button>
              </div>
            </div>
            <div class="color-details">
              <div class="color-hex">${item.hex}</div>
              <div class="color-date">${date} ${time}</div>
            </div>
          </div>
        `;
      }).join('');
    }
    
    document.getElementById('colorInput').addEventListener('input', (e) => {
      document.getElementById('hexInput').value = e.target.value.toUpperCase();
    });
    
    document.getElementById('hexInput').addEventListener('input', (e) => {
      const hex = e.target.value;
      if (/^#[0-9A-Fa-f]{6}$/.test(hex)) {
        document.getElementById('colorInput').value = hex;
      }
    });
    
    renderColors();

let colorHistory = JSON.parse(localStorage.getItem('colorHistory') || '[]');
    
    function saveColor() {
      const hex = document.getElementById('hexInput').value;
      
      if (!/^#[0-9A-Fa-f]{6}$/.test(hex)) {
        alert('Please enter a valid HEX color');
        return;
      }
      
      colorHistory.unshift({
        hex: hex.toUpperCase(),
        timestamp: Date.now()
      });
      
      localStorage.setItem('colorHistory', JSON.stringify(colorHistory));
      renderColors();
      
      const toast = document.getElementById('toast');
      toast.textContent = 'Color saved!';
      toast.classList.add('show');
      setTimeout(() => toast.classList.remove('show'), 2000);
    }
    
    function deleteColor(index) {
      if (confirm('Delete this color?')) {
        colorHistory.splice(index, 1);
        localStorage.setItem('colorHistory', JSON.stringify(colorHistory));
        renderColors();
      }
    }
    
    function copyColor(hex) {
      navigator.clipboard.writeText(hex).then(() => {
        const toast = document.getElementById('toast');
        toast.textContent = `Copied ${hex}`;
        toast.classList.add('show');
        setTimeout(() => {
          toast.classList.remove('show');
          setTimeout(() => toast.textContent = 'Copied to clipboard!', 300);
        }, 2000);
      });
    }
    
    function clearHistory() {
      if (confirm('Clear all color history? This cannot be undone.')) {
        colorHistory = [];
        localStorage.setItem('colorHistory', JSON.stringify(colorHistory));
        renderColors();
      }
    }
    
    function hexToHsl(hex) {
      const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      if (!result) return { h: 0, s: 0, l: 0 };
      
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
    
    function renderColors() {
      const sortBy = document.getElementById('sortBy').value;
      let sorted = [...colorHistory];
      
      switch(sortBy) {
        case 'oldest':
          sorted.reverse();
          break;
        case 'hue':
          sorted.sort((a, b) => hexToHsl(a.hex).h - hexToHsl(b.hex).h);
          break;
        case 'lightness':
          sorted.sort((a, b) => hexToHsl(a.hex).l - hexToHsl(b.hex).l);
          break;
      }
      
      const grid = document.getElementById('colorsGrid');
      const unique = new Set(colorHistory.map(c => c.hex)).size;
      
      document.getElementById('totalCount').textContent = colorHistory.length;
      document.getElementById('uniqueCount').textContent = unique;
      
      if (sorted.length === 0) {
        grid.innerHTML = '<div class="empty-state">No colors saved yet. Add your first color above! 🎨</div>';
        return;
      }
      
      grid.innerHTML = sorted.map((item, index) => {
        const date = new Date(item.timestamp).toLocaleDateString();
        const time = new Date(item.timestamp).toLocaleTimeString();
        
        return `
          <div class="color-item" onclick="copyColor('${item.hex}')">
            <div class="color-swatch" style="background: ${item.hex}">
              <div class="color-actions">
                <button class="action-btn" onclick="event.stopPropagation(); document.getElementById('hexInput').value='${item.hex}'; document.getElementById('colorInput').value='${item.hex}'">📝</button>
                <button class="action-btn" onclick="event.stopPropagation(); deleteColor(${index})">🗑️</button>
              </div>
            </div>
            <div class="color-details">
              <div class="color-hex">${item.hex}</div>
              <div class="color-date">${date} ${time}</div>
            </div>
          </div>
        `;
      }).join('');
    }
    
    document.getElementById('colorInput').addEventListener('input', (e) => {
      document.getElementById('hexInput').value = e.target.value.toUpperCase();
    });
    
    document.getElementById('hexInput').addEventListener('input', (e) => {
      const hex = e.target.value;
      if (/^#[0-9A-Fa-f]{6}$/.test(hex)) {
        document.getElementById('colorInput').value = hex;
      }
    });
    
    renderColors();


