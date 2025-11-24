let colors = [
      { name: 'primary', color: '#667eea' },
      { name: 'secondary', color: '#764ba2' },
      { name: 'accent', color: '#f093fb' },
      { name: 'success', color: '#48bb78' },
      { name: 'warning', color: '#f6ad55' },
      { name: 'error', color: '#f56565' },
      { name: 'background', color: '#ffffff' },
      { name: 'text', color: '#2d3748' }
    ];
    
    function convertCase(str, convention) {
      switch(convention) {
        case 'kebab':
          return str.toLowerCase().replace(/[_\s]+/g, '-');
        case 'camel':
          return str.replace(/[-_\s](.)/g, (_, c) => c.toUpperCase()).replace(/^(.)/, c => c.toLowerCase());
        case 'snake':
          return str.toLowerCase().replace(/[-\s]+/g, '_');
        default:
          return str;
      }
    }
    
    function renderColors() {
      const list = document.getElementById('colorList');
      
      list.innerHTML = colors.map((color, index) => `
        <div class="color-item">
          <div class="color-preview" style="background: ${color.color}"></div>
          <input type="text" value="${color.name}" onchange="updateColorName(${index}, this.value)" placeholder="Variable name">
          <input type="text" value="${color.color}" onchange="updateColorValue(${index}, this.value)" placeholder="#000000">
          <input type="color" value="${color.color}" onchange="updateColorValue(${index}, this.value)">
          <button class="delete-btn" onclick="deleteColor(${index})">🗑️</button>
        </div>
      `).join('');
      
      generateCSS();
    }
    
    function addColor() {
      colors.push({ name: 'new-color', color: '#000000' });
      renderColors();
    }
    
    function deleteColor(index) {
      colors.splice(index, 1);
      renderColors();
    }
    
    function updateColorName(index, name) {
      colors[index].name = name;
      generateCSS();
    }
    
    function updateColorValue(index, value) {
      colors[index].color = value;
      renderColors();
    }
    
    function generateCSS() {
      const prefix = document.getElementById('prefix').value;
      const convention = document.getElementById('namingConvention').value;
      const scope = document.getElementById('scope').value;
      
      let css = `${scope} {\n`;
      
      colors.forEach(color => {
        const varName = convertCase(color.name, convention);
        const fullName = prefix ? `${convertCase(prefix, convention)}-${varName}` : varName;
        css += `  --${fullName}: ${color.color};\n`;
      });
      
      css += `}\n\n/* Usage Example */\n`;
      css += `.element {\n`;
      
      const exampleVar = colors[0];
      if (exampleVar) {
        const varName = convertCase(exampleVar.name, convention);
        const fullName = prefix ? `${convertCase(prefix, convention)}-${varName}` : varName;
        css += `  background-color: var(--${fullName});\n`;
        css += `  color: var(--${fullName});\n`;
      }
      
      css += `}`;
      
      document.getElementById('codeBox').textContent = css;
    }
    
    function copyCode() {
      const code = document.getElementById('codeBox').textContent;
      
      navigator.clipboard.writeText(code).then(() => {
        const toast = document.getElementById('toast');
        toast.classList.add('show');
        setTimeout(() => toast.classList.remove('show'), 2000);
      });
    }
    
    ['prefix', 'namingConvention', 'scope'].forEach(id => {
      document.getElementById(id).addEventListener('change', generateCSS);
    });
    
    renderColors();

let colors = [
      { name: 'primary', color: '#667eea' },
      { name: 'secondary', color: '#764ba2' },
      { name: 'accent', color: '#f093fb' },
      { name: 'success', color: '#48bb78' },
      { name: 'warning', color: '#f6ad55' },
      { name: 'error', color: '#f56565' },
      { name: 'background', color: '#ffffff' },
      { name: 'text', color: '#2d3748' }
    ];
    
    function convertCase(str, convention) {
      switch(convention) {
        case 'kebab':
          return str.toLowerCase().replace(/[_\s]+/g, '-');
        case 'camel':
          return str.replace(/[-_\s](.)/g, (_, c) => c.toUpperCase()).replace(/^(.)/, c => c.toLowerCase());
        case 'snake':
          return str.toLowerCase().replace(/[-\s]+/g, '_');
        default:
          return str;
      }
    }
    
    function renderColors() {
      const list = document.getElementById('colorList');
      
      list.innerHTML = colors.map((color, index) => `
        <div class="color-item">
          <div class="color-preview" style="background: ${color.color}"></div>
          <input type="text" value="${color.name}" onchange="updateColorName(${index}, this.value)" placeholder="Variable name">
          <input type="text" value="${color.color}" onchange="updateColorValue(${index}, this.value)" placeholder="#000000">
          <input type="color" value="${color.color}" onchange="updateColorValue(${index}, this.value)">
          <button class="delete-btn" onclick="deleteColor(${index})">🗑️</button>
        </div>
      `).join('');
      
      generateCSS();
    }
    
    function addColor() {
      colors.push({ name: 'new-color', color: '#000000' });
      renderColors();
    }
    
    function deleteColor(index) {
      colors.splice(index, 1);
      renderColors();
    }
    
    function updateColorName(index, name) {
      colors[index].name = name;
      generateCSS();
    }
    
    function updateColorValue(index, value) {
      colors[index].color = value;
      renderColors();
    }
    
    function generateCSS() {
      const prefix = document.getElementById('prefix').value;
      const convention = document.getElementById('namingConvention').value;
      const scope = document.getElementById('scope').value;
      
      let css = `${scope} {\n`;
      
      colors.forEach(color => {
        const varName = convertCase(color.name, convention);
        const fullName = prefix ? `${convertCase(prefix, convention)}-${varName}` : varName;
        css += `  --${fullName}: ${color.color};\n`;
      });
      
      css += `}\n\n/* Usage Example */\n`;
      css += `.element {\n`;
      
      const exampleVar = colors[0];
      if (exampleVar) {
        const varName = convertCase(exampleVar.name, convention);
        const fullName = prefix ? `${convertCase(prefix, convention)}-${varName}` : varName;
        css += `  background-color: var(--${fullName});\n`;
        css += `  color: var(--${fullName});\n`;
      }
      
      css += `}`;
      
      document.getElementById('codeBox').textContent = css;
    }
    
    function copyCode() {
      const code = document.getElementById('codeBox').textContent;
      
      navigator.clipboard.writeText(code).then(() => {
        const toast = document.getElementById('toast');
        toast.classList.add('show');
        setTimeout(() => toast.classList.remove('show'), 2000);
      });
    }
    
    ['prefix', 'namingConvention', 'scope'].forEach(id => {
      document.getElementById(id).addEventListener('change', generateCSS);
    });
    
    renderColors();


