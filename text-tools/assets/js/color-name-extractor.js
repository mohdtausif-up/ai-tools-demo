const namedColors = {
      'red': '#FF0000', 'blue': '#0000FF', 'green': '#008000', 'yellow': '#FFFF00',
      'orange': '#FFA500', 'purple': '#800080', 'pink': '#FFC0CB', 'brown': '#A52A2A',
      'black': '#000000', 'white': '#FFFFFF', 'gray': '#808080', 'grey': '#808080',
      'cyan': '#00FFFF', 'magenta': '#FF00FF', 'lime': '#00FF00', 'navy': '#000080',
      'teal': '#008080', 'olive': '#808000', 'maroon': '#800000', 'aqua': '#00FFFF',
      'silver': '#C0C0C0', 'gold': '#FFD700', 'coral': '#FF7F50', 'salmon': '#FA8072'
    };
    
    function extractColors() {
      const text = document.getElementById('inputText').value;
      
      if (!text) {
        showToast('Please enter text', 'error');
        return;
      }
      
      const colors = new Set();
      
      // Extract hex colors (#RGB or #RRGGBB)
      const hexMatches = text.match(/#([0-9A-Fa-f]{3}){1,2}\b/g);
      if (hexMatches) {
        hexMatches.forEach(hex => {
          // Convert 3-digit to 6-digit
          if (hex.length === 4) {
            hex = '#' + hex[1] + hex[1] + hex[2] + hex[2] + hex[3] + hex[3];
          }
          colors.add(hex.toUpperCase());
        });
      }
      
      // Extract RGB/RGBA colors
      const rgbMatches = text.match(/rgba?\(\s*\d+\s*,\s*\d+\s*,\s*\d+\s*(?:,\s*[\d.]+\s*)?\)/gi);
      if (rgbMatches) {
        rgbMatches.forEach(rgb => {
          const values = rgb.match(/\d+/g).map(Number);
          const hex = '#' + values.slice(0, 3).map(v => v.toString(16).padStart(2, '0')).join('').toUpperCase();
          colors.add(hex);
        });
      }
      
      // Extract named colors
      Object.keys(namedColors).forEach(name => {
        const regex = new RegExp('\\b' + name + '\\b', 'gi');
        if (regex.test(text)) {
          colors.add(namedColors[name]);
        }
      });
      
      if (colors.size === 0) {
        showToast('No colors found', 'error');
        return;
      }
      
      displayColors(Array.from(colors));
      showToast(`Found ${colors.size} colors!`);
    }
    
    function displayColors(colors) {
      document.getElementById('colorCount').textContent = colors.length;
      
      const colorHTML = colors.map(color => {
        const name = Object.keys(namedColors).find(key => namedColors[key] === color) || 'Custom';
        return `
          <div class="color-item">
            <div class="color-preview" style="background: ${color}"></div>
            <div class="color-info">
              <div class="color-code">${color}</div>
              <div class="color-name">${name}</div>
              <button class="copy-btn-small" onclick="copyColor('${color}')">📋 Copy</button>
            </div>
          </div>
        `;
      }).join('');
      
      document.getElementById('colorGrid').innerHTML = colorHTML;
      document.getElementById('resultsCard').style.display = 'block';
    }
    
    function copyColor(color) {
      navigator.clipboard.writeText(color).then(() => {
        showToast('Color copied!');
      });
    }
    
    function showToast(message, type = 'success') {
      const existingToast = document.querySelector('.toast');
      if (existingToast) existingToast.remove();
      
      const toast = document.createElement('div');
      toast.className = 'toast';
      toast.style.background = type === 'error' ? '#ef4444' : '#10b981';
      toast.textContent = message;
      document.body.appendChild(toast);
      
      setTimeout(() => toast.remove(), 3000);
    }
