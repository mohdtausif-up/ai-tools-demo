// Popular Pantone colors database
    const pantoneColors = [
      { code: 'PANTONE 186 C', name: 'Red', hex: '#C8102E', rgb: '200, 16, 46', cmyk: '0, 92, 77, 22', category: 'red' },
      { code: 'PANTONE 185 C', name: 'Red', hex: '#E4002B', rgb: '228, 0, 43', cmyk: '0, 100, 81, 11', category: 'red' },
      { code: 'PANTONE 187 C', name: 'Red', hex: '#A6192E', rgb: '166, 25, 46', cmyk: '0, 85, 72, 35', category: 'red' },
      { code: 'PANTONE 485 C', name: 'Red', hex: '#DA291C', rgb: '218, 41, 28', cmyk: '0, 81, 87, 15', category: 'red' },
      { code: 'PANTONE Red 032 C', name: 'Red', hex: '#EF3340', rgb: '239, 51, 64', cmyk: '0, 79, 73, 6', category: 'red' },
      
      { code: 'PANTONE 294 C', name: 'Blue', hex: '#002E5D', rgb: '0, 46, 93', cmyk: '100, 50, 0, 64', category: 'blue' },
      { code: 'PANTONE 286 C', name: 'Reflex Blue', hex: '#0033A0', rgb: '0, 51, 160', cmyk: '100, 68, 0, 37', category: 'blue' },
      { code: 'PANTONE 2935 C', name: 'Process Blue', hex: '#0057B8', rgb: '0, 87, 184', cmyk: '100, 53, 0, 28', category: 'blue' },
      { code: 'PANTONE 285 C', name: 'Blue', hex: '#0072CE', rgb: '0, 114, 206', cmyk: '100, 45, 0, 19', category: 'blue' },
      { code: 'PANTONE 2728 C', name: 'Sky Blue', hex: '#006BA6', rgb: '0, 107, 166', cmyk: '100, 36, 0, 35', category: 'blue' },
      
      { code: 'PANTONE 348 C', name: 'Green', hex: '#00A950', rgb: '0, 169, 80', cmyk: '100, 0, 53, 34', category: 'green' },
      { code: 'PANTONE 355 C', name: 'Kelly Green', hex: '#009639', rgb: '0, 150, 57', cmyk: '100, 0, 62, 41', category: 'green' },
      { code: 'PANTONE 354 C', name: 'Green', hex: '#00B140', rgb: '0, 177, 64', cmyk: '100, 0, 64, 31', category: 'green' },
      { code: 'PANTONE 347 C', name: 'Green', hex: '#009A44', rgb: '0, 154, 68', cmyk: '100, 0, 56, 40', category: 'green' },
      { code: 'PANTONE 356 C', name: 'Green', hex: '#007A3D', rgb: '0, 122, 61', cmyk: '100, 0, 50, 52', category: 'green' },
      
      { code: 'PANTONE 102 C', name: 'Yellow', hex: '#FFE900', rgb: '255, 233, 0', cmyk: '0, 9, 100, 0', category: 'yellow' },
      { code: 'PANTONE 116 C', name: 'Process Yellow', hex: '#FFED00', rgb: '255, 237, 0', cmyk: '0, 7, 100, 0', category: 'yellow' },
      { code: 'PANTONE 109 C', name: 'Lemon Yellow', hex: '#FFD500', rgb: '255, 213, 0', cmyk: '0, 16, 100, 0', category: 'yellow' },
      { code: 'PANTONE 123 C', name: 'Golden Yellow', hex: '#FFC82E', rgb: '255, 200, 46', cmyk: '0, 22, 82, 0', category: 'yellow' },
      { code: 'PANTONE 110 C', name: 'Yellow', hex: '#FFC72C', rgb: '255, 199, 44', cmyk: '0, 22, 83, 0', category: 'yellow' },
      
      { code: 'PANTONE 2685 C', name: 'Purple', hex: '#7B3FF2', rgb: '123, 63, 242', cmyk: '49, 74, 0, 5', category: 'purple' },
      { code: 'PANTONE 2597 C', name: 'Purple', hex: '#5B3FFF', rgb: '91, 63, 255', cmyk: '64, 75, 0, 0', category: 'purple' },
      { code: 'PANTONE 2603 C', name: 'Purple', hex: '#7B52AB', rgb: '123, 82, 171', cmyk: '28, 52, 0, 33', category: 'purple' },
      { code: 'PANTONE 2665 C', name: 'Purple', hex: '#B78DE9', rgb: '183, 141, 233', cmyk: '21, 39, 0, 9', category: 'purple' },
      { code: 'PANTONE 2577 C', name: 'Violet', hex: '#6A2C91', rgb: '106, 44, 145', cmyk: '27, 70, 0, 43', category: 'purple' },
      
      { code: 'PANTONE 165 C', name: 'Orange', hex: '#FF6900', rgb: '255, 105, 0', cmyk: '0, 59, 100, 0', category: 'orange' },
      { code: 'PANTONE 021 C', name: 'Orange', hex: '#FE5000', rgb: '254, 80, 0', cmyk: '0, 69, 100, 0', category: 'orange' },
      { code: 'PANTONE 1585 C', name: 'Orange', hex: '#FF6A13', rgb: '255, 106, 19', cmyk: '0, 58, 93, 0', category: 'orange' },
      { code: 'PANTONE 151 C', name: 'Burnt Orange', hex: '#FF6D3A', rgb: '255, 109, 58', cmyk: '0, 57, 77, 0', category: 'orange' },
      { code: 'PANTONE 1375 C', name: 'Orange', hex: '#FF8200', rgb: '255, 130, 0', cmyk: '0, 49, 100, 0', category: 'orange' },
      
      { code: 'PANTONE Cool Gray 1 C', name: 'Cool Gray', hex: '#D9D9D6', rgb: '217, 217, 214', cmyk: '0, 0, 1, 15', category: 'gray' },
      { code: 'PANTONE Cool Gray 3 C', name: 'Cool Gray', hex: '#C8C9C7', rgb: '200, 201, 199', cmyk: '0, 0, 1, 21', category: 'gray' },
      { code: 'PANTONE Cool Gray 5 C', name: 'Cool Gray', hex: '#B1B3B3', rgb: '177, 179, 179', cmyk: '0, 0, 0, 30', category: 'gray' },
      { code: 'PANTONE Cool Gray 7 C', name: 'Cool Gray', hex: '#97999B', rgb: '151, 153, 155', cmyk: '0, 0, 0, 39', category: 'gray' },
      { code: 'PANTONE Cool Gray 9 C', name: 'Cool Gray', hex: '#75787B', rgb: '117, 120, 123', cmyk: '0, 0, 0, 52', category: 'gray' },
      { code: 'PANTONE Cool Gray 11 C', name: 'Cool Gray', hex: '#53565A', rgb: '83, 86, 90', cmyk: '0, 0, 0, 65', category: 'gray' },
      
      { code: 'PANTONE Black C', name: 'Black', hex: '#2D2926', rgb: '45, 41, 38', cmyk: '0, 9, 16, 82', category: 'gray' },
      { code: 'PANTONE White', name: 'White', hex: '#FFFFFF', rgb: '255, 255, 255', cmyk: '0, 0, 0, 0', category: 'gray' },
      
      { code: 'PANTONE 314 C', name: 'Teal', hex: '#00B2A9', rgb: '0, 178, 169', cmyk: '100, 0, 5, 30', category: 'blue' },
      { code: 'PANTONE 2738 C', name: 'Navy Blue', hex: '#1D428A', rgb: '29, 66, 138', cmyk: '79, 52, 0, 46', category: 'blue' },
      { code: 'PANTONE 7689 C', name: 'Coral', hex: '#F46F5B', rgb: '244, 111, 91', cmyk: '0, 54, 63, 4', category: 'red' },
      { code: 'PANTONE 7545 C', name: 'Forest Green', hex: '#00573F', rgb: '0, 87, 63', cmyk: '100, 0, 28, 66', category: 'green' },
      { code: 'PANTONE 7421 C', name: 'Lime', hex: '#BDDB00', rgb: '189, 219, 0', cmyk: '14, 0, 100, 14', category: 'yellow' },
    ];
    
    let filteredColors = [...pantoneColors];
    let currentCategory = 'all';
    
    document.getElementById('searchInput').addEventListener('input', (e) => {
      filterColors();
    });
    
    function filterCategory(category) {
      currentCategory = category;
      document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
      event.target.classList.add('active');
      filterColors();
    }
    
    function filterColors() {
      const searchTerm = document.getElementById('searchInput').value.toLowerCase();
      
      filteredColors = pantoneColors.filter(color => {
        const matchesSearch = color.code.toLowerCase().includes(searchTerm) ||
                             color.name.toLowerCase().includes(searchTerm) ||
                             color.hex.toLowerCase().includes(searchTerm);
        const matchesCategory = currentCategory === 'all' || color.category === currentCategory;
        return matchesSearch && matchesCategory;
      });
      
      renderColors();
    }
    
    function renderColors() {
      const grid = document.getElementById('colorsGrid');
      
      if (filteredColors.length === 0) {
        grid.innerHTML = '<div style="grid-column: 1/-1; text-align: center; padding: 60px; color: white;">No Pantone colors found. Try a different search.</div>';
        return;
      }
      
      grid.innerHTML = filteredColors.map(color => `
        <div class="pantone-card" onclick="copyPantone('${color.code}', '${color.hex}')">
          <div class="pantone-swatch" style="background: ${color.hex}">
            <div class="pantone-name">${color.name}</div>
          </div>
          <div class="pantone-details">
            <div class="pantone-code">${color.code}</div>
            <div class="color-values">
              <div class="color-value">
                <span class="color-label">HEX</span>
                <span class="color-data">${color.hex}</span>
              </div>
              <div class="color-value">
                <span class="color-label">RGB</span>
                <span class="color-data">${color.rgb}</span>
              </div>
              <div class="color-value">
                <span class="color-label">CMYK</span>
                <span class="color-data">${color.cmyk}</span>
              </div>
            </div>
          </div>
        </div>
      `).join('');
    }
    
    function copyPantone(code, hex) {
      navigator.clipboard.writeText(hex).then(() => {
        const toast = document.getElementById('toast');
        toast.textContent = `Copied ${code}: ${hex}`;
        toast.classList.add('show');
        setTimeout(() => {
          toast.classList.remove('show');
          setTimeout(() => toast.textContent = 'Copied to clipboard!', 300);
        }, 2000);
      });
    }
    
    renderColors();

// Popular Pantone colors database
    const pantoneColors = [
      { code: 'PANTONE 186 C', name: 'Red', hex: '#C8102E', rgb: '200, 16, 46', cmyk: '0, 92, 77, 22', category: 'red' },
      { code: 'PANTONE 185 C', name: 'Red', hex: '#E4002B', rgb: '228, 0, 43', cmyk: '0, 100, 81, 11', category: 'red' },
      { code: 'PANTONE 187 C', name: 'Red', hex: '#A6192E', rgb: '166, 25, 46', cmyk: '0, 85, 72, 35', category: 'red' },
      { code: 'PANTONE 485 C', name: 'Red', hex: '#DA291C', rgb: '218, 41, 28', cmyk: '0, 81, 87, 15', category: 'red' },
      { code: 'PANTONE Red 032 C', name: 'Red', hex: '#EF3340', rgb: '239, 51, 64', cmyk: '0, 79, 73, 6', category: 'red' },
      
      { code: 'PANTONE 294 C', name: 'Blue', hex: '#002E5D', rgb: '0, 46, 93', cmyk: '100, 50, 0, 64', category: 'blue' },
      { code: 'PANTONE 286 C', name: 'Reflex Blue', hex: '#0033A0', rgb: '0, 51, 160', cmyk: '100, 68, 0, 37', category: 'blue' },
      { code: 'PANTONE 2935 C', name: 'Process Blue', hex: '#0057B8', rgb: '0, 87, 184', cmyk: '100, 53, 0, 28', category: 'blue' },
      { code: 'PANTONE 285 C', name: 'Blue', hex: '#0072CE', rgb: '0, 114, 206', cmyk: '100, 45, 0, 19', category: 'blue' },
      { code: 'PANTONE 2728 C', name: 'Sky Blue', hex: '#006BA6', rgb: '0, 107, 166', cmyk: '100, 36, 0, 35', category: 'blue' },
      
      { code: 'PANTONE 348 C', name: 'Green', hex: '#00A950', rgb: '0, 169, 80', cmyk: '100, 0, 53, 34', category: 'green' },
      { code: 'PANTONE 355 C', name: 'Kelly Green', hex: '#009639', rgb: '0, 150, 57', cmyk: '100, 0, 62, 41', category: 'green' },
      { code: 'PANTONE 354 C', name: 'Green', hex: '#00B140', rgb: '0, 177, 64', cmyk: '100, 0, 64, 31', category: 'green' },
      { code: 'PANTONE 347 C', name: 'Green', hex: '#009A44', rgb: '0, 154, 68', cmyk: '100, 0, 56, 40', category: 'green' },
      { code: 'PANTONE 356 C', name: 'Green', hex: '#007A3D', rgb: '0, 122, 61', cmyk: '100, 0, 50, 52', category: 'green' },
      
      { code: 'PANTONE 102 C', name: 'Yellow', hex: '#FFE900', rgb: '255, 233, 0', cmyk: '0, 9, 100, 0', category: 'yellow' },
      { code: 'PANTONE 116 C', name: 'Process Yellow', hex: '#FFED00', rgb: '255, 237, 0', cmyk: '0, 7, 100, 0', category: 'yellow' },
      { code: 'PANTONE 109 C', name: 'Lemon Yellow', hex: '#FFD500', rgb: '255, 213, 0', cmyk: '0, 16, 100, 0', category: 'yellow' },
      { code: 'PANTONE 123 C', name: 'Golden Yellow', hex: '#FFC82E', rgb: '255, 200, 46', cmyk: '0, 22, 82, 0', category: 'yellow' },
      { code: 'PANTONE 110 C', name: 'Yellow', hex: '#FFC72C', rgb: '255, 199, 44', cmyk: '0, 22, 83, 0', category: 'yellow' },
      
      { code: 'PANTONE 2685 C', name: 'Purple', hex: '#7B3FF2', rgb: '123, 63, 242', cmyk: '49, 74, 0, 5', category: 'purple' },
      { code: 'PANTONE 2597 C', name: 'Purple', hex: '#5B3FFF', rgb: '91, 63, 255', cmyk: '64, 75, 0, 0', category: 'purple' },
      { code: 'PANTONE 2603 C', name: 'Purple', hex: '#7B52AB', rgb: '123, 82, 171', cmyk: '28, 52, 0, 33', category: 'purple' },
      { code: 'PANTONE 2665 C', name: 'Purple', hex: '#B78DE9', rgb: '183, 141, 233', cmyk: '21, 39, 0, 9', category: 'purple' },
      { code: 'PANTONE 2577 C', name: 'Violet', hex: '#6A2C91', rgb: '106, 44, 145', cmyk: '27, 70, 0, 43', category: 'purple' },
      
      { code: 'PANTONE 165 C', name: 'Orange', hex: '#FF6900', rgb: '255, 105, 0', cmyk: '0, 59, 100, 0', category: 'orange' },
      { code: 'PANTONE 021 C', name: 'Orange', hex: '#FE5000', rgb: '254, 80, 0', cmyk: '0, 69, 100, 0', category: 'orange' },
      { code: 'PANTONE 1585 C', name: 'Orange', hex: '#FF6A13', rgb: '255, 106, 19', cmyk: '0, 58, 93, 0', category: 'orange' },
      { code: 'PANTONE 151 C', name: 'Burnt Orange', hex: '#FF6D3A', rgb: '255, 109, 58', cmyk: '0, 57, 77, 0', category: 'orange' },
      { code: 'PANTONE 1375 C', name: 'Orange', hex: '#FF8200', rgb: '255, 130, 0', cmyk: '0, 49, 100, 0', category: 'orange' },
      
      { code: 'PANTONE Cool Gray 1 C', name: 'Cool Gray', hex: '#D9D9D6', rgb: '217, 217, 214', cmyk: '0, 0, 1, 15', category: 'gray' },
      { code: 'PANTONE Cool Gray 3 C', name: 'Cool Gray', hex: '#C8C9C7', rgb: '200, 201, 199', cmyk: '0, 0, 1, 21', category: 'gray' },
      { code: 'PANTONE Cool Gray 5 C', name: 'Cool Gray', hex: '#B1B3B3', rgb: '177, 179, 179', cmyk: '0, 0, 0, 30', category: 'gray' },
      { code: 'PANTONE Cool Gray 7 C', name: 'Cool Gray', hex: '#97999B', rgb: '151, 153, 155', cmyk: '0, 0, 0, 39', category: 'gray' },
      { code: 'PANTONE Cool Gray 9 C', name: 'Cool Gray', hex: '#75787B', rgb: '117, 120, 123', cmyk: '0, 0, 0, 52', category: 'gray' },
      { code: 'PANTONE Cool Gray 11 C', name: 'Cool Gray', hex: '#53565A', rgb: '83, 86, 90', cmyk: '0, 0, 0, 65', category: 'gray' },
      
      { code: 'PANTONE Black C', name: 'Black', hex: '#2D2926', rgb: '45, 41, 38', cmyk: '0, 9, 16, 82', category: 'gray' },
      { code: 'PANTONE White', name: 'White', hex: '#FFFFFF', rgb: '255, 255, 255', cmyk: '0, 0, 0, 0', category: 'gray' },
      
      { code: 'PANTONE 314 C', name: 'Teal', hex: '#00B2A9', rgb: '0, 178, 169', cmyk: '100, 0, 5, 30', category: 'blue' },
      { code: 'PANTONE 2738 C', name: 'Navy Blue', hex: '#1D428A', rgb: '29, 66, 138', cmyk: '79, 52, 0, 46', category: 'blue' },
      { code: 'PANTONE 7689 C', name: 'Coral', hex: '#F46F5B', rgb: '244, 111, 91', cmyk: '0, 54, 63, 4', category: 'red' },
      { code: 'PANTONE 7545 C', name: 'Forest Green', hex: '#00573F', rgb: '0, 87, 63', cmyk: '100, 0, 28, 66', category: 'green' },
      { code: 'PANTONE 7421 C', name: 'Lime', hex: '#BDDB00', rgb: '189, 219, 0', cmyk: '14, 0, 100, 14', category: 'yellow' },
    ];
    
    let filteredColors = [...pantoneColors];
    let currentCategory = 'all';
    
    document.getElementById('searchInput').addEventListener('input', (e) => {
      filterColors();
    });
    
    function filterCategory(category) {
      currentCategory = category;
      document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
      event.target.classList.add('active');
      filterColors();
    }
    
    function filterColors() {
      const searchTerm = document.getElementById('searchInput').value.toLowerCase();
      
      filteredColors = pantoneColors.filter(color => {
        const matchesSearch = color.code.toLowerCase().includes(searchTerm) ||
                             color.name.toLowerCase().includes(searchTerm) ||
                             color.hex.toLowerCase().includes(searchTerm);
        const matchesCategory = currentCategory === 'all' || color.category === currentCategory;
        return matchesSearch && matchesCategory;
      });
      
      renderColors();
    }
    
    function renderColors() {
      const grid = document.getElementById('colorsGrid');
      
      if (filteredColors.length === 0) {
        grid.innerHTML = '<div style="grid-column: 1/-1; text-align: center; padding: 60px; color: white;">No Pantone colors found. Try a different search.</div>';
        return;
      }
      
      grid.innerHTML = filteredColors.map(color => `
        <div class="pantone-card" onclick="copyPantone('${color.code}', '${color.hex}')">
          <div class="pantone-swatch" style="background: ${color.hex}">
            <div class="pantone-name">${color.name}</div>
          </div>
          <div class="pantone-details">
            <div class="pantone-code">${color.code}</div>
            <div class="color-values">
              <div class="color-value">
                <span class="color-label">HEX</span>
                <span class="color-data">${color.hex}</span>
              </div>
              <div class="color-value">
                <span class="color-label">RGB</span>
                <span class="color-data">${color.rgb}</span>
              </div>
              <div class="color-value">
                <span class="color-label">CMYK</span>
                <span class="color-data">${color.cmyk}</span>
              </div>
            </div>
          </div>
        </div>
      `).join('');
    }
    
    function copyPantone(code, hex) {
      navigator.clipboard.writeText(hex).then(() => {
        const toast = document.getElementById('toast');
        toast.textContent = `Copied ${code}: ${hex}`;
        toast.classList.add('show');
        setTimeout(() => {
          toast.classList.remove('show');
          setTimeout(() => toast.textContent = 'Copied to clipboard!', 300);
        }, 2000);
      });
    }
    
    renderColors();


