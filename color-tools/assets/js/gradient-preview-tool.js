const gradients = [
      { name: 'Ocean Blue', css: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', colors: ['#667eea', '#764ba2'], category: 'cool', type: 'linear' },
      { name: 'Sunset Glow', css: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)', colors: ['#fa709a', '#fee140'], category: 'warm', type: 'linear' },
      { name: 'Purple Dream', css: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)', colors: ['#a8edea', '#fed6e3'], category: 'pastel', type: 'linear' },
      { name: 'Fire Blaze', css: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)', colors: ['#f093fb', '#f5576c'], category: 'vibrant', type: 'linear' },
      { name: 'Forest Green', css: 'linear-gradient(135deg, #0ba360 0%, #3cba92 100%)', colors: ['#0ba360', '#3cba92'], category: 'nature', type: 'linear' },
      { name: 'Cherry Blossom', css: 'linear-gradient(135deg, #fbc2eb 0%, #a6c1ee 100%)', colors: ['#fbc2eb', '#a6c1ee'], category: 'pastel', type: 'linear' },
      { name: 'Electric Violet', css: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)', colors: ['#4facfe', '#00f2fe'], category: 'vibrant', type: 'linear' },
      { name: 'Autumn Leaves', css: 'linear-gradient(135deg, #fc4a1a 0%, #f7b733 100%)', colors: ['#fc4a1a', '#f7b733'], category: 'warm', type: 'linear' },
      { name: 'Mint Fresh', css: 'linear-gradient(135deg, #48c6ef 0%, #6f86d6 100%)', colors: ['#48c6ef', '#6f86d6'], category: 'cool', type: 'linear' },
      { name: 'Berry Fusion', css: 'linear-gradient(135deg, #ee0979 0%, #ff6a00 100%)', colors: ['#ee0979', '#ff6a00'], category: 'vibrant', type: 'linear' },
      { name: 'Arctic Dawn', css: 'linear-gradient(135deg, #e3ffe7 0%, #d9e7ff 100%)', colors: ['#e3ffe7', '#d9e7ff'], category: 'pastel', type: 'linear' },
      { name: 'Desert Sand', css: 'linear-gradient(135deg, #f3904f 0%, #3b4371 100%)', colors: ['#f3904f', '#3b4371'], category: 'sunset', type: 'linear' },
      { name: 'Tropical Paradise', css: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)', colors: ['#11998e', '#38ef7d'], category: 'nature', type: 'linear' },
      { name: 'Lavender Dreams', css: 'linear-gradient(135deg, #cc2b5e 0%, #753a88 100%)', colors: ['#cc2b5e', '#753a88'], category: 'cool', type: 'linear' },
      { name: 'Golden Hour', css: 'linear-gradient(135deg, #ff9966 0%, #ff5e62 100%)', colors: ['#ff9966', '#ff5e62'], category: 'sunset', type: 'linear' },
      { name: 'Ocean Waves', css: 'radial-gradient(circle, #667eea 0%, #764ba2 100%)', colors: ['#667eea', '#764ba2'], category: 'cool', type: 'radial' },
      { name: 'Rose Petal', css: 'radial-gradient(circle, #fa709a 0%, #fee140 100%)', colors: ['#fa709a', '#fee140'], category: 'warm', type: 'radial' },
      { name: 'Bubble Gum', css: 'radial-gradient(circle, #f093fb 0%, #f5576c 100%)', colors: ['#f093fb', '#f5576c'], category: 'vibrant', type: 'radial' },
      { name: 'Sky Blue', css: 'linear-gradient(to right, #4facfe 0%, #00f2fe 100%)', colors: ['#4facfe', '#00f2fe'], category: 'cool', type: 'linear' },
      { name: 'Peach Melba', css: 'linear-gradient(to right, #ffecd2 0%, #fcb69f 100%)', colors: ['#ffecd2', '#fcb69f'], category: 'warm', type: 'linear' },
      { name: 'Northern Lights', css: 'linear-gradient(to right, #00c6ff 0%, #0072ff 100%)', colors: ['#00c6ff', '#0072ff'], category: 'cool', type: 'linear' },
      { name: 'Candy Shop', css: 'linear-gradient(to right, #d299c2 0%, #fef9d7 100%)', colors: ['#d299c2', '#fef9d7'], category: 'pastel', type: 'linear' },
      { name: 'Mountain Mist', css: 'linear-gradient(to right, #4b6cb7 0%, #182848 100%)', colors: ['#4b6cb7', '#182848'], category: 'cool', type: 'linear' },
      { name: 'Coral Reef', css: 'linear-gradient(to right, #ff9a56 0%, #ff6f91 100%)', colors: ['#ff9a56', '#ff6f91'], category: 'vibrant', type: 'linear' },
      { name: 'Emerald Dream', css: 'linear-gradient(to right, #00d2ff 0%, #3a47d5 100%)', colors: ['#00d2ff', '#3a47d5'], category: 'cool', type: 'linear' },
      { name: 'Rose Gold', css: 'linear-gradient(to right, #eea2a2 0%, #bbc1bf 100%)', colors: ['#eea2a2', '#bbc1bf'], category: 'pastel', type: 'linear' },
      { name: 'Tropical Sunset', css: 'linear-gradient(to right, #fdc830 0%, #f37335 100%)', colors: ['#fdc830', '#f37335'], category: 'sunset', type: 'linear' },
      { name: 'Fresh Meadow', css: 'linear-gradient(to right, #56ab2f 0%, #a8e063 100%)', colors: ['#56ab2f', '#a8e063'], category: 'nature', type: 'linear' }
    ];
    
    let filteredGradients = [...gradients];
    
    function filterGradients() {
      const category = document.getElementById('categoryFilter').value;
      const direction = document.getElementById('directionFilter').value;
      
      filteredGradients = gradients.filter(g => {
        const categoryMatch = category === 'all' || g.category === category;
        const directionMatch = direction === 'all' || g.type === direction;
        return categoryMatch && directionMatch;
      });
      
      renderGradients();
    }
    
    function copyCSS(css, name) {
      navigator.clipboard.writeText(css).then(() => {
        const toast = document.getElementById('toast');
        toast.textContent = `Copied "${name}"`;
        toast.classList.add('show');
        setTimeout(() => {
          toast.classList.remove('show');
          setTimeout(() => toast.textContent = 'Copied to clipboard!', 300);
        }, 2000);
      });
    }
    
    function renderGradients() {
      const grid = document.getElementById('gradientsGrid');
      
      grid.innerHTML = filteredGradients.map(g => `
        <div class="gradient-card">
          <div class="gradient-preview" style="background: ${g.css}"></div>
          <div class="gradient-info">
            <div class="gradient-name">${g.name}</div>
            <div class="gradient-colors">
              ${g.colors.map(c => `<div class="color-dot" style="background: ${c}" title="${c}"></div>`).join('')}
            </div>
            <div class="gradient-css">${g.css}</div>
            <button class="btn" onclick="copyCSS('${g.css}', '${g.name}')">📋 Copy CSS</button>
          </div>
        </div>
      `).join('');
    }
    
    renderGradients();

const gradients = [
      { name: 'Ocean Blue', css: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', colors: ['#667eea', '#764ba2'], category: 'cool', type: 'linear' },
      { name: 'Sunset Glow', css: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)', colors: ['#fa709a', '#fee140'], category: 'warm', type: 'linear' },
      { name: 'Purple Dream', css: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)', colors: ['#a8edea', '#fed6e3'], category: 'pastel', type: 'linear' },
      { name: 'Fire Blaze', css: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)', colors: ['#f093fb', '#f5576c'], category: 'vibrant', type: 'linear' },
      { name: 'Forest Green', css: 'linear-gradient(135deg, #0ba360 0%, #3cba92 100%)', colors: ['#0ba360', '#3cba92'], category: 'nature', type: 'linear' },
      { name: 'Cherry Blossom', css: 'linear-gradient(135deg, #fbc2eb 0%, #a6c1ee 100%)', colors: ['#fbc2eb', '#a6c1ee'], category: 'pastel', type: 'linear' },
      { name: 'Electric Violet', css: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)', colors: ['#4facfe', '#00f2fe'], category: 'vibrant', type: 'linear' },
      { name: 'Autumn Leaves', css: 'linear-gradient(135deg, #fc4a1a 0%, #f7b733 100%)', colors: ['#fc4a1a', '#f7b733'], category: 'warm', type: 'linear' },
      { name: 'Mint Fresh', css: 'linear-gradient(135deg, #48c6ef 0%, #6f86d6 100%)', colors: ['#48c6ef', '#6f86d6'], category: 'cool', type: 'linear' },
      { name: 'Berry Fusion', css: 'linear-gradient(135deg, #ee0979 0%, #ff6a00 100%)', colors: ['#ee0979', '#ff6a00'], category: 'vibrant', type: 'linear' },
      { name: 'Arctic Dawn', css: 'linear-gradient(135deg, #e3ffe7 0%, #d9e7ff 100%)', colors: ['#e3ffe7', '#d9e7ff'], category: 'pastel', type: 'linear' },
      { name: 'Desert Sand', css: 'linear-gradient(135deg, #f3904f 0%, #3b4371 100%)', colors: ['#f3904f', '#3b4371'], category: 'sunset', type: 'linear' },
      { name: 'Tropical Paradise', css: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)', colors: ['#11998e', '#38ef7d'], category: 'nature', type: 'linear' },
      { name: 'Lavender Dreams', css: 'linear-gradient(135deg, #cc2b5e 0%, #753a88 100%)', colors: ['#cc2b5e', '#753a88'], category: 'cool', type: 'linear' },
      { name: 'Golden Hour', css: 'linear-gradient(135deg, #ff9966 0%, #ff5e62 100%)', colors: ['#ff9966', '#ff5e62'], category: 'sunset', type: 'linear' },
      { name: 'Ocean Waves', css: 'radial-gradient(circle, #667eea 0%, #764ba2 100%)', colors: ['#667eea', '#764ba2'], category: 'cool', type: 'radial' },
      { name: 'Rose Petal', css: 'radial-gradient(circle, #fa709a 0%, #fee140 100%)', colors: ['#fa709a', '#fee140'], category: 'warm', type: 'radial' },
      { name: 'Bubble Gum', css: 'radial-gradient(circle, #f093fb 0%, #f5576c 100%)', colors: ['#f093fb', '#f5576c'], category: 'vibrant', type: 'radial' },
      { name: 'Sky Blue', css: 'linear-gradient(to right, #4facfe 0%, #00f2fe 100%)', colors: ['#4facfe', '#00f2fe'], category: 'cool', type: 'linear' },
      { name: 'Peach Melba', css: 'linear-gradient(to right, #ffecd2 0%, #fcb69f 100%)', colors: ['#ffecd2', '#fcb69f'], category: 'warm', type: 'linear' },
      { name: 'Northern Lights', css: 'linear-gradient(to right, #00c6ff 0%, #0072ff 100%)', colors: ['#00c6ff', '#0072ff'], category: 'cool', type: 'linear' },
      { name: 'Candy Shop', css: 'linear-gradient(to right, #d299c2 0%, #fef9d7 100%)', colors: ['#d299c2', '#fef9d7'], category: 'pastel', type: 'linear' },
      { name: 'Mountain Mist', css: 'linear-gradient(to right, #4b6cb7 0%, #182848 100%)', colors: ['#4b6cb7', '#182848'], category: 'cool', type: 'linear' },
      { name: 'Coral Reef', css: 'linear-gradient(to right, #ff9a56 0%, #ff6f91 100%)', colors: ['#ff9a56', '#ff6f91'], category: 'vibrant', type: 'linear' },
      { name: 'Emerald Dream', css: 'linear-gradient(to right, #00d2ff 0%, #3a47d5 100%)', colors: ['#00d2ff', '#3a47d5'], category: 'cool', type: 'linear' },
      { name: 'Rose Gold', css: 'linear-gradient(to right, #eea2a2 0%, #bbc1bf 100%)', colors: ['#eea2a2', '#bbc1bf'], category: 'pastel', type: 'linear' },
      { name: 'Tropical Sunset', css: 'linear-gradient(to right, #fdc830 0%, #f37335 100%)', colors: ['#fdc830', '#f37335'], category: 'sunset', type: 'linear' },
      { name: 'Fresh Meadow', css: 'linear-gradient(to right, #56ab2f 0%, #a8e063 100%)', colors: ['#56ab2f', '#a8e063'], category: 'nature', type: 'linear' }
    ];
    
    let filteredGradients = [...gradients];
    
    function filterGradients() {
      const category = document.getElementById('categoryFilter').value;
      const direction = document.getElementById('directionFilter').value;
      
      filteredGradients = gradients.filter(g => {
        const categoryMatch = category === 'all' || g.category === category;
        const directionMatch = direction === 'all' || g.type === direction;
        return categoryMatch && directionMatch;
      });
      
      renderGradients();
    }
    
    function copyCSS(css, name) {
      navigator.clipboard.writeText(css).then(() => {
        const toast = document.getElementById('toast');
        toast.textContent = `Copied "${name}"`;
        toast.classList.add('show');
        setTimeout(() => {
          toast.classList.remove('show');
          setTimeout(() => toast.textContent = 'Copied to clipboard!', 300);
        }, 2000);
      });
    }
    
    function renderGradients() {
      const grid = document.getElementById('gradientsGrid');
      
      grid.innerHTML = filteredGradients.map(g => `
        <div class="gradient-card">
          <div class="gradient-preview" style="background: ${g.css}"></div>
          <div class="gradient-info">
            <div class="gradient-name">${g.name}</div>
            <div class="gradient-colors">
              ${g.colors.map(c => `<div class="color-dot" style="background: ${c}" title="${c}"></div>`).join('')}
            </div>
            <div class="gradient-css">${g.css}</div>
            <button class="btn" onclick="copyCSS('${g.css}', '${g.name}')">📋 Copy CSS</button>
          </div>
        </div>
      `).join('');
    }
    
    renderGradients();


