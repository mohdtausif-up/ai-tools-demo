let svgContent = '';
    let originalSvgContent = '';
    let colorMap = new Map();
    
    const fileInput = document.getElementById('fileInput');
    const uploadZone = document.getElementById('uploadZone');
    const svgContainer = document.getElementById('svgContainer');
    const colorsList = document.getElementById('colorsList');
    
    // File input handler
    fileInput.addEventListener('change', handleFileSelect);
    
    // Drag and drop handlers
    uploadZone.addEventListener('dragover', (e) => {
      e.preventDefault();
      uploadZone.classList.add('dragging');
    });
    
    uploadZone.addEventListener('dragleave', () => {
      uploadZone.classList.remove('dragging');
    });
    
    uploadZone.addEventListener('drop', (e) => {
      e.preventDefault();
      uploadZone.classList.remove('dragging');
      
      const files = e.dataTransfer.files;
      if (files.length > 0 && files[0].name.endsWith('.svg')) {
        handleFile(files[0]);
      }
    });
    
    function handleFileSelect(e) {
      const file = e.target.files[0];
      if (file) {
        handleFile(file);
      }
    }
    
    function handleFile(file) {
      const reader = new FileReader();
      
      reader.onload = (e) => {
        svgContent = e.target.result;
        originalSvgContent = svgContent;
        
        extractColors();
        renderSVG();
        
        document.getElementById('downloadBtn').disabled = false;
        document.getElementById('resetBtn').disabled = false;
        
        showToast('SVG loaded successfully!');
      };
      
      reader.readAsText(file);
    }
    
    function extractColors() {
      colorMap.clear();
      
      // Extract colors from fill attributes
      const fillMatches = svgContent.matchAll(/fill=["']([^"']+)["']/gi);
      for (const match of fillMatches) {
        const color = match[1].toLowerCase();
        if (isValidColor(color)) {
          const normalized = normalizeColor(color);
          colorMap.set(normalized, (colorMap.get(normalized) || 0) + 1);
        }
      }
      
      // Extract colors from stroke attributes
      const strokeMatches = svgContent.matchAll(/stroke=["']([^"']+)["']/gi);
      for (const match of strokeMatches) {
        const color = match[1].toLowerCase();
        if (isValidColor(color)) {
          const normalized = normalizeColor(color);
          colorMap.set(normalized, (colorMap.get(normalized) || 0) + 1);
        }
      }
      
      // Extract colors from style attributes
      const styleMatches = svgContent.matchAll(/style=["']([^"']+)["']/gi);
      for (const match of styleMatches) {
        const style = match[1];
        const colorProps = style.matchAll(/(fill|stroke):\s*([^;]+)/gi);
        for (const prop of colorProps) {
          const color = prop[2].trim().toLowerCase();
          if (isValidColor(color)) {
            const normalized = normalizeColor(color);
            colorMap.set(normalized, (colorMap.get(normalized) || 0) + 1);
          }
        }
      }
      
      renderColorsList();
    }
    
    function isValidColor(color) {
      if (!color || color === 'none' || color === 'transparent') return false;
      return /^#[0-9a-f]{3,6}$/i.test(color) || 
             /^rgb/i.test(color) || 
             /^[a-z]+$/i.test(color);
    }
    
    function normalizeColor(color) {
      // Convert rgb to hex
      if (color.startsWith('rgb')) {
        const matches = color.match(/\d+/g);
        if (matches && matches.length >= 3) {
          const r = parseInt(matches[0]);
          const g = parseInt(matches[1]);
          const b = parseInt(matches[2]);
          return rgbToHex(r, g, b);
        }
      }
      
      // Convert 3-digit hex to 6-digit
      if (color.startsWith('#') && color.length === 4) {
        return '#' + color[1] + color[1] + color[2] + color[2] + color[3] + color[3];
      }
      
      // Convert named colors to hex
      const namedColors = {
        'black': '#000000', 'white': '#ffffff', 'red': '#ff0000',
        'green': '#008000', 'blue': '#0000ff', 'yellow': '#ffff00',
        'cyan': '#00ffff', 'magenta': '#ff00ff', 'gray': '#808080',
        'grey': '#808080', 'orange': '#ffa500', 'purple': '#800080',
        'pink': '#ffc0cb', 'brown': '#a52a2a'
      };
      
      return namedColors[color] || color;
    }
    
    function rgbToHex(r, g, b) {
      return '#' + [r, g, b].map(x => {
        const hex = x.toString(16);
        return hex.length === 1 ? '0' + hex : hex;
      }).join('');
    }
    
    function renderColorsList() {
      colorsList.innerHTML = '';
      
      if (colorMap.size === 0) {
        colorsList.innerHTML = '<div class="empty-state"><div style="font-size: 32px; margin-bottom: 10px;">🎨</div><div style="color: #a0aec0;">No colors found</div></div>';
        document.getElementById('colorCount').textContent = '0';
        return;
      }
      
      document.getElementById('colorCount').textContent = colorMap.size;
      
      colorMap.forEach((count, color) => {
        const item = document.createElement('div');
        item.className = 'color-item';
        
        item.innerHTML = `
          <div class="color-preview" style="background: ${color}"></div>
          <div class="color-info">
            <div class="color-label">Color ${Array.from(colorMap.keys()).indexOf(color) + 1}</div>
            <div class="color-value">${color.toUpperCase()}</div>
          </div>
          <div>
            <div class="color-count">${count}×</div>
            <input type="color" value="${color}" onchange="changeColor('${color}', this.value)">
          </div>
        `;
        
        colorsList.appendChild(item);
      });
    }
    
    function renderSVG() {
      svgContainer.innerHTML = svgContent;
      
      // Ensure SVG scales properly
      const svg = svgContainer.querySelector('svg');
      if (svg && !svg.hasAttribute('viewBox')) {
        const width = svg.getAttribute('width') || '100';
        const height = svg.getAttribute('height') || '100';
        svg.setAttribute('viewBox', `0 0 ${width} ${height}`);
      }
    }
    
    function changeColor(oldColor, newColor) {
      const oldNormalized = normalizeColor(oldColor);
      const newNormalized = normalizeColor(newColor);
      
      // Replace in fill attributes
      svgContent = svgContent.replace(
        new RegExp(`fill=["']${escapeRegex(oldColor)}["']`, 'gi'),
        `fill="${newNormalized}"`
      );
      
      // Replace in stroke attributes
      svgContent = svgContent.replace(
        new RegExp(`stroke=["']${escapeRegex(oldColor)}["']`, 'gi'),
        `stroke="${newNormalized}"`
      );
      
      // Replace in style attributes
      svgContent = svgContent.replace(
        new RegExp(`(fill|stroke):\\s*${escapeRegex(oldColor)}`, 'gi'),
        `$1:${newNormalized}`
      );
      
      // Update color map
      const count = colorMap.get(oldNormalized);
      colorMap.delete(oldNormalized);
      colorMap.set(newNormalized, count);
      
      renderSVG();
      renderColorsList();
      showToast('Color updated!');
    }
    
    function escapeRegex(str) {
      return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    }
    
    function resetColors() {
      svgContent = originalSvgContent;
      extractColors();
      renderSVG();
      showToast('Colors reset!');
    }
    
    function downloadSVG() {
      const blob = new Blob([svgContent], { type: 'image/svg+xml' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'edited-svg.svg';
      a.click();
      URL.revokeObjectURL(url);
      showToast('SVG downloaded!');
    }
    
    function showToast(message) {
      const toast = document.getElementById('toast');
      toast.textContent = message;
      toast.classList.add('show');
      setTimeout(() => toast.classList.remove('show'), 2000);
    }

let svgContent = '';
    let originalSvgContent = '';
    let colorMap = new Map();
    
    const fileInput = document.getElementById('fileInput');
    const uploadZone = document.getElementById('uploadZone');
    const svgContainer = document.getElementById('svgContainer');
    const colorsList = document.getElementById('colorsList');
    
    // File input handler
    fileInput.addEventListener('change', handleFileSelect);
    
    // Drag and drop handlers
    uploadZone.addEventListener('dragover', (e) => {
      e.preventDefault();
      uploadZone.classList.add('dragging');
    });
    
    uploadZone.addEventListener('dragleave', () => {
      uploadZone.classList.remove('dragging');
    });
    
    uploadZone.addEventListener('drop', (e) => {
      e.preventDefault();
      uploadZone.classList.remove('dragging');
      
      const files = e.dataTransfer.files;
      if (files.length > 0 && files[0].name.endsWith('.svg')) {
        handleFile(files[0]);
      }
    });
    
    function handleFileSelect(e) {
      const file = e.target.files[0];
      if (file) {
        handleFile(file);
      }
    }
    
    function handleFile(file) {
      const reader = new FileReader();
      
      reader.onload = (e) => {
        svgContent = e.target.result;
        originalSvgContent = svgContent;
        
        extractColors();
        renderSVG();
        
        document.getElementById('downloadBtn').disabled = false;
        document.getElementById('resetBtn').disabled = false;
        
        showToast('SVG loaded successfully!');
      };
      
      reader.readAsText(file);
    }
    
    function extractColors() {
      colorMap.clear();
      
      // Extract colors from fill attributes
      const fillMatches = svgContent.matchAll(/fill=["']([^"']+)["']/gi);
      for (const match of fillMatches) {
        const color = match[1].toLowerCase();
        if (isValidColor(color)) {
          const normalized = normalizeColor(color);
          colorMap.set(normalized, (colorMap.get(normalized) || 0) + 1);
        }
      }
      
      // Extract colors from stroke attributes
      const strokeMatches = svgContent.matchAll(/stroke=["']([^"']+)["']/gi);
      for (const match of strokeMatches) {
        const color = match[1].toLowerCase();
        if (isValidColor(color)) {
          const normalized = normalizeColor(color);
          colorMap.set(normalized, (colorMap.get(normalized) || 0) + 1);
        }
      }
      
      // Extract colors from style attributes
      const styleMatches = svgContent.matchAll(/style=["']([^"']+)["']/gi);
      for (const match of styleMatches) {
        const style = match[1];
        const colorProps = style.matchAll(/(fill|stroke):\s*([^;]+)/gi);
        for (const prop of colorProps) {
          const color = prop[2].trim().toLowerCase();
          if (isValidColor(color)) {
            const normalized = normalizeColor(color);
            colorMap.set(normalized, (colorMap.get(normalized) || 0) + 1);
          }
        }
      }
      
      renderColorsList();
    }
    
    function isValidColor(color) {
      if (!color || color === 'none' || color === 'transparent') return false;
      return /^#[0-9a-f]{3,6}$/i.test(color) || 
             /^rgb/i.test(color) || 
             /^[a-z]+$/i.test(color);
    }
    
    function normalizeColor(color) {
      // Convert rgb to hex
      if (color.startsWith('rgb')) {
        const matches = color.match(/\d+/g);
        if (matches && matches.length >= 3) {
          const r = parseInt(matches[0]);
          const g = parseInt(matches[1]);
          const b = parseInt(matches[2]);
          return rgbToHex(r, g, b);
        }
      }
      
      // Convert 3-digit hex to 6-digit
      if (color.startsWith('#') && color.length === 4) {
        return '#' + color[1] + color[1] + color[2] + color[2] + color[3] + color[3];
      }
      
      // Convert named colors to hex
      const namedColors = {
        'black': '#000000', 'white': '#ffffff', 'red': '#ff0000',
        'green': '#008000', 'blue': '#0000ff', 'yellow': '#ffff00',
        'cyan': '#00ffff', 'magenta': '#ff00ff', 'gray': '#808080',
        'grey': '#808080', 'orange': '#ffa500', 'purple': '#800080',
        'pink': '#ffc0cb', 'brown': '#a52a2a'
      };
      
      return namedColors[color] || color;
    }
    
    function rgbToHex(r, g, b) {
      return '#' + [r, g, b].map(x => {
        const hex = x.toString(16);
        return hex.length === 1 ? '0' + hex : hex;
      }).join('');
    }
    
    function renderColorsList() {
      colorsList.innerHTML = '';
      
      if (colorMap.size === 0) {
        colorsList.innerHTML = '<div class="empty-state"><div style="font-size: 32px; margin-bottom: 10px;">🎨</div><div style="color: #a0aec0;">No colors found</div></div>';
        document.getElementById('colorCount').textContent = '0';
        return;
      }
      
      document.getElementById('colorCount').textContent = colorMap.size;
      
      colorMap.forEach((count, color) => {
        const item = document.createElement('div');
        item.className = 'color-item';
        
        item.innerHTML = `
          <div class="color-preview" style="background: ${color}"></div>
          <div class="color-info">
            <div class="color-label">Color ${Array.from(colorMap.keys()).indexOf(color) + 1}</div>
            <div class="color-value">${color.toUpperCase()}</div>
          </div>
          <div>
            <div class="color-count">${count}×</div>
            <input type="color" value="${color}" onchange="changeColor('${color}', this.value)">
          </div>
        `;
        
        colorsList.appendChild(item);
      });
    }
    
    function renderSVG() {
      svgContainer.innerHTML = svgContent;
      
      // Ensure SVG scales properly
      const svg = svgContainer.querySelector('svg');
      if (svg && !svg.hasAttribute('viewBox')) {
        const width = svg.getAttribute('width') || '100';
        const height = svg.getAttribute('height') || '100';
        svg.setAttribute('viewBox', `0 0 ${width} ${height}`);
      }
    }
    
    function changeColor(oldColor, newColor) {
      const oldNormalized = normalizeColor(oldColor);
      const newNormalized = normalizeColor(newColor);
      
      // Replace in fill attributes
      svgContent = svgContent.replace(
        new RegExp(`fill=["']${escapeRegex(oldColor)}["']`, 'gi'),
        `fill="${newNormalized}"`
      );
      
      // Replace in stroke attributes
      svgContent = svgContent.replace(
        new RegExp(`stroke=["']${escapeRegex(oldColor)}["']`, 'gi'),
        `stroke="${newNormalized}"`
      );
      
      // Replace in style attributes
      svgContent = svgContent.replace(
        new RegExp(`(fill|stroke):\\s*${escapeRegex(oldColor)}`, 'gi'),
        `$1:${newNormalized}`
      );
      
      // Update color map
      const count = colorMap.get(oldNormalized);
      colorMap.delete(oldNormalized);
      colorMap.set(newNormalized, count);
      
      renderSVG();
      renderColorsList();
      showToast('Color updated!');
    }
    
    function escapeRegex(str) {
      return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    }
    
    function resetColors() {
      svgContent = originalSvgContent;
      extractColors();
      renderSVG();
      showToast('Colors reset!');
    }
    
    function downloadSVG() {
      const blob = new Blob([svgContent], { type: 'image/svg+xml' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'edited-svg.svg';
      a.click();
      URL.revokeObjectURL(url);
      showToast('SVG downloaded!');
    }
    
    function showToast(message) {
      const toast = document.getElementById('toast');
      toast.textContent = message;
      toast.classList.add('show');
      setTimeout(() => toast.classList.remove('show'), 2000);
    }


