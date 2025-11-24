const defaultColors = ['#667eea', '#764ba2', '#f093fb', '#4facfe', '#43e97b', '#fa709a'];
    let colors = [...defaultColors];
    let selectedColor = colors[0];
    let selectedTexture = 'none';
    let selectedFont = "'Georgia', serif";
    
    const textures = [
      { name: 'none', gradient: 'none' },
      { name: 'dots', gradient: 'radial-gradient(circle, rgba(0,0,0,0.1) 1px, transparent 1px)' },
      { name: 'lines', gradient: 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(0,0,0,0.1) 10px, rgba(0,0,0,0.1) 11px)' },
      { name: 'grid', gradient: 'linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)' },
      { name: 'noise', gradient: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'4\' numOctaves=\'4\' /%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\' opacity=\'0.1\'/%3E%3C/svg%3E")' },
      { name: 'waves', gradient: 'repeating-radial-gradient(circle at 0 0, transparent 0, rgba(0,0,0,0.05) 10px, transparent 20px)' }
    ];
    
    function initializePalette() {
      const palette = document.getElementById('colorPalette');
      palette.innerHTML = '';
      
      colors.forEach((color, index) => {
        const swatch = document.createElement('div');
        swatch.className = 'palette-swatch';
        if (color === selectedColor) swatch.classList.add('selected');
        swatch.style.background = color;
        swatch.onclick = () => selectColor(color);
        
        const label = document.createElement('div');
        label.style.cssText = 'position: absolute; bottom: 5px; left: 50%; transform: translateX(-50%); background: rgba(255,255,255,0.9); padding: 2px 6px; border-radius: 4px; font-size: 10px; font-weight: 600;';
        label.textContent = color.toUpperCase();
        swatch.appendChild(label);
        
        palette.appendChild(swatch);
      });
    }
    
    function initializeTextures() {
      const grid = document.getElementById('textureGrid');
      grid.innerHTML = '';
      
      textures.forEach(texture => {
        const option = document.createElement('div');
        option.className = 'texture-option';
        if (texture.name === selectedTexture) option.classList.add('selected');
        
        if (texture.gradient !== 'none') {
          option.style.background = texture.gradient;
          if (texture.name === 'grid') {
            option.style.backgroundSize = '20px 20px';
          } else if (texture.name === 'dots') {
            option.style.backgroundSize = '15px 15px';
          }
        } else {
          option.style.background = '#f7fafc';
        }
        
        option.onclick = () => selectTexture(texture.name);
        grid.appendChild(option);
      });
    }
    
    function initializeBoard() {
      const grid = document.getElementById('boardGrid');
      grid.innerHTML = '';
      
      const layouts = [
        { type: 'color', className: 'cell-large', colorIndex: 0 },
        { type: 'typography', className: '', colorIndex: 1 },
        { type: 'color', className: '', colorIndex: 2 },
        { type: 'color', className: '', colorIndex: 3 },
        { type: 'color', className: '', colorIndex: 4 },
        { type: 'typography', className: '', colorIndex: 5 },
        { type: 'color', className: '', colorIndex: 0 }
      ];
      
      layouts.forEach((layout, index) => {
        const cell = document.createElement('div');
        cell.className = `board-cell ${layout.className}`;
        cell.onclick = () => applyCellColor(cell, layout.type);
        
        const content = document.createElement('div');
        content.className = 'cell-content';
        
        if (layout.type === 'color') {
          const colorIndex = layout.colorIndex % colors.length;
          content.style.background = colors[colorIndex];
          
          if (selectedTexture !== 'none') {
            const overlay = document.createElement('div');
            overlay.className = 'texture-overlay';
            const texture = textures.find(t => t.name === selectedTexture);
            overlay.style.background = texture.gradient;
            if (selectedTexture === 'grid') {
              overlay.style.backgroundSize = '20px 20px';
            } else if (selectedTexture === 'dots') {
              overlay.style.backgroundSize = '15px 15px';
            }
            content.appendChild(overlay);
          }
        } else {
          const typography = document.createElement('div');
          typography.className = 'typography-preview';
          typography.style.color = colors[layout.colorIndex % colors.length];
          typography.style.fontFamily = selectedFont;
          typography.innerHTML = `
            <div class="preview-heading">Elegance</div>
            <div class="preview-subheading">Modern Design</div>
            <div class="preview-body">Beautiful typography creates lasting impressions</div>
          `;
          content.appendChild(typography);
        }
        
        cell.appendChild(content);
        grid.appendChild(cell);
      });
    }
    
    function selectColor(color) {
      selectedColor = color;
      initializePalette();
    }
    
    function addColor() {
      const newColor = document.getElementById('colorPicker').value;
      if (!colors.includes(newColor)) {
        colors.push(newColor);
        selectedColor = newColor;
        initializePalette();
        initializeBoard();
        showToast('Color added to palette!');
      } else {
        showToast('Color already in palette');
      }
    }
    
    function selectTexture(textureName) {
      selectedTexture = textureName;
      initializeTextures();
      initializeBoard();
    }
    
    function updateTypography() {
      selectedFont = document.getElementById('fontSelector').value;
      initializeBoard();
      showToast('Font updated!');
    }
    
    function applyCellColor(cell, type) {
      const content = cell.querySelector('.cell-content');
      
      if (type === 'color') {
        content.style.background = selectedColor;
        
        // Update texture overlay if exists
        const overlay = content.querySelector('.texture-overlay');
        if (overlay) {
          const texture = textures.find(t => t.name === selectedTexture);
          overlay.style.background = texture.gradient;
        }
      } else {
        const typography = content.querySelector('.typography-preview');
        if (typography) {
          typography.style.color = selectedColor;
        }
      }
      
      showToast('Cell updated!');
    }
    
    function resetBoard() {
      colors = [...defaultColors];
      selectedColor = colors[0];
      selectedTexture = 'none';
      selectedFont = "'Georgia', serif";
      document.getElementById('fontSelector').value = selectedFont;
      initializePalette();
      initializeTextures();
      initializeBoard();
      showToast('Board reset!');
    }
    
    function exportMoodBoard() {
      // Create canvas
      const board = document.getElementById('moodBoard');
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      
      canvas.width = 1600;
      canvas.height = 1200;
      
      // White background
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Draw a simplified representation
      const cells = document.querySelectorAll('.board-cell');
      let x = 40, y = 40;
      const cellWidth = 500;
      const cellHeight = 360;
      const gap = 20;
      
      cells.forEach((cell, index) => {
        const content = cell.querySelector('.cell-content');
        const bgColor = content.style.background || '#f7fafc';
        
        ctx.fillStyle = bgColor;
        ctx.fillRect(x, y, cellWidth, cellHeight);
        
        x += cellWidth + gap;
        if ((index + 1) % 3 === 0) {
          x = 40;
          y += cellHeight + gap;
        }
      });
      
      // Download
      canvas.toBlob(blob => {
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'mood-board.png';
        a.click();
        URL.revokeObjectURL(url);
        showToast('Mood board exported!');
      });
    }
    
    function showToast(message) {
      const toast = document.getElementById('toast');
      toast.textContent = message;
      toast.classList.add('show');
      setTimeout(() => toast.classList.remove('show'), 2000);
    }
    
    // Initialize
    initializePalette();
    initializeTextures();
    initializeBoard();

const defaultColors = ['#667eea', '#764ba2', '#f093fb', '#4facfe', '#43e97b', '#fa709a'];
    let colors = [...defaultColors];
    let selectedColor = colors[0];
    let selectedTexture = 'none';
    let selectedFont = "'Georgia', serif";
    
    const textures = [
      { name: 'none', gradient: 'none' },
      { name: 'dots', gradient: 'radial-gradient(circle, rgba(0,0,0,0.1) 1px, transparent 1px)' },
      { name: 'lines', gradient: 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(0,0,0,0.1) 10px, rgba(0,0,0,0.1) 11px)' },
      { name: 'grid', gradient: 'linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)' },
      { name: 'noise', gradient: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'4\' numOctaves=\'4\' /%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\' opacity=\'0.1\'/%3E%3C/svg%3E")' },
      { name: 'waves', gradient: 'repeating-radial-gradient(circle at 0 0, transparent 0, rgba(0,0,0,0.05) 10px, transparent 20px)' }
    ];
    
    function initializePalette() {
      const palette = document.getElementById('colorPalette');
      palette.innerHTML = '';
      
      colors.forEach((color, index) => {
        const swatch = document.createElement('div');
        swatch.className = 'palette-swatch';
        if (color === selectedColor) swatch.classList.add('selected');
        swatch.style.background = color;
        swatch.onclick = () => selectColor(color);
        
        const label = document.createElement('div');
        label.style.cssText = 'position: absolute; bottom: 5px; left: 50%; transform: translateX(-50%); background: rgba(255,255,255,0.9); padding: 2px 6px; border-radius: 4px; font-size: 10px; font-weight: 600;';
        label.textContent = color.toUpperCase();
        swatch.appendChild(label);
        
        palette.appendChild(swatch);
      });
    }
    
    function initializeTextures() {
      const grid = document.getElementById('textureGrid');
      grid.innerHTML = '';
      
      textures.forEach(texture => {
        const option = document.createElement('div');
        option.className = 'texture-option';
        if (texture.name === selectedTexture) option.classList.add('selected');
        
        if (texture.gradient !== 'none') {
          option.style.background = texture.gradient;
          if (texture.name === 'grid') {
            option.style.backgroundSize = '20px 20px';
          } else if (texture.name === 'dots') {
            option.style.backgroundSize = '15px 15px';
          }
        } else {
          option.style.background = '#f7fafc';
        }
        
        option.onclick = () => selectTexture(texture.name);
        grid.appendChild(option);
      });
    }
    
    function initializeBoard() {
      const grid = document.getElementById('boardGrid');
      grid.innerHTML = '';
      
      const layouts = [
        { type: 'color', className: 'cell-large', colorIndex: 0 },
        { type: 'typography', className: '', colorIndex: 1 },
        { type: 'color', className: '', colorIndex: 2 },
        { type: 'color', className: '', colorIndex: 3 },
        { type: 'color', className: '', colorIndex: 4 },
        { type: 'typography', className: '', colorIndex: 5 },
        { type: 'color', className: '', colorIndex: 0 }
      ];
      
      layouts.forEach((layout, index) => {
        const cell = document.createElement('div');
        cell.className = `board-cell ${layout.className}`;
        cell.onclick = () => applyCellColor(cell, layout.type);
        
        const content = document.createElement('div');
        content.className = 'cell-content';
        
        if (layout.type === 'color') {
          const colorIndex = layout.colorIndex % colors.length;
          content.style.background = colors[colorIndex];
          
          if (selectedTexture !== 'none') {
            const overlay = document.createElement('div');
            overlay.className = 'texture-overlay';
            const texture = textures.find(t => t.name === selectedTexture);
            overlay.style.background = texture.gradient;
            if (selectedTexture === 'grid') {
              overlay.style.backgroundSize = '20px 20px';
            } else if (selectedTexture === 'dots') {
              overlay.style.backgroundSize = '15px 15px';
            }
            content.appendChild(overlay);
          }
        } else {
          const typography = document.createElement('div');
          typography.className = 'typography-preview';
          typography.style.color = colors[layout.colorIndex % colors.length];
          typography.style.fontFamily = selectedFont;
          typography.innerHTML = `
            <div class="preview-heading">Elegance</div>
            <div class="preview-subheading">Modern Design</div>
            <div class="preview-body">Beautiful typography creates lasting impressions</div>
          `;
          content.appendChild(typography);
        }
        
        cell.appendChild(content);
        grid.appendChild(cell);
      });
    }
    
    function selectColor(color) {
      selectedColor = color;
      initializePalette();
    }
    
    function addColor() {
      const newColor = document.getElementById('colorPicker').value;
      if (!colors.includes(newColor)) {
        colors.push(newColor);
        selectedColor = newColor;
        initializePalette();
        initializeBoard();
        showToast('Color added to palette!');
      } else {
        showToast('Color already in palette');
      }
    }
    
    function selectTexture(textureName) {
      selectedTexture = textureName;
      initializeTextures();
      initializeBoard();
    }
    
    function updateTypography() {
      selectedFont = document.getElementById('fontSelector').value;
      initializeBoard();
      showToast('Font updated!');
    }
    
    function applyCellColor(cell, type) {
      const content = cell.querySelector('.cell-content');
      
      if (type === 'color') {
        content.style.background = selectedColor;
        
        // Update texture overlay if exists
        const overlay = content.querySelector('.texture-overlay');
        if (overlay) {
          const texture = textures.find(t => t.name === selectedTexture);
          overlay.style.background = texture.gradient;
        }
      } else {
        const typography = content.querySelector('.typography-preview');
        if (typography) {
          typography.style.color = selectedColor;
        }
      }
      
      showToast('Cell updated!');
    }
    
    function resetBoard() {
      colors = [...defaultColors];
      selectedColor = colors[0];
      selectedTexture = 'none';
      selectedFont = "'Georgia', serif";
      document.getElementById('fontSelector').value = selectedFont;
      initializePalette();
      initializeTextures();
      initializeBoard();
      showToast('Board reset!');
    }
    
    function exportMoodBoard() {
      // Create canvas
      const board = document.getElementById('moodBoard');
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      
      canvas.width = 1600;
      canvas.height = 1200;
      
      // White background
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Draw a simplified representation
      const cells = document.querySelectorAll('.board-cell');
      let x = 40, y = 40;
      const cellWidth = 500;
      const cellHeight = 360;
      const gap = 20;
      
      cells.forEach((cell, index) => {
        const content = cell.querySelector('.cell-content');
        const bgColor = content.style.background || '#f7fafc';
        
        ctx.fillStyle = bgColor;
        ctx.fillRect(x, y, cellWidth, cellHeight);
        
        x += cellWidth + gap;
        if ((index + 1) % 3 === 0) {
          x = 40;
          y += cellHeight + gap;
        }
      });
      
      // Download
      canvas.toBlob(blob => {
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'mood-board.png';
        a.click();
        URL.revokeObjectURL(url);
        showToast('Mood board exported!');
      });
    }
    
    function showToast(message) {
      const toast = document.getElementById('toast');
      toast.textContent = message;
      toast.classList.add('show');
      setTimeout(() => toast.classList.remove('show'), 2000);
    }
    
    // Initialize
    initializePalette();
    initializeTextures();
    initializeBoard();


