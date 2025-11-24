let syntax = 'scss';
    let options = {
      variables: true,
      functions: true,
      mixins: true,
      map: false
    };

    function init() {
      updateAllPreviews();
      generateCode();
    }

    function addColor() {
      const container = document.getElementById('colorInputs');
      const row = document.createElement('div');
      row.className = 'color-row';
      row.innerHTML = `
        <input type="text" class="color-name" placeholder="color-name" value="">
        <input type="color" class="color-picker" value="#000000">
        <div class="color-preview" style="background: #000000;"></div>
        <button class="delete-btn" onclick="deleteColor(this)">×</button>
      `;
      container.appendChild(row);
      attachColorListeners(row);
      generateCode();
    }

    function deleteColor(btn) {
      btn.closest('.color-row').remove();
      generateCode();
    }

    function updateAllPreviews() {
      document.querySelectorAll('.color-row').forEach(row => {
        attachColorListeners(row);
      });
    }

    function attachColorListeners(row) {
      const picker = row.querySelector('.color-picker');
      const preview = row.querySelector('.color-preview');
      const nameInput = row.querySelector('.color-name');

      picker.addEventListener('input', (e) => {
        preview.style.background = e.target.value;
        generateCode();
      });

      nameInput.addEventListener('input', () => {
        generateCode();
      });
    }

    function selectSyntax(newSyntax) {
      syntax = newSyntax;
      document.querySelectorAll('.syntax-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.syntax === newSyntax);
      });
      generateCode();
    }

    function toggleOption(option) {
      options[option] = !options[option];
      const card = document.querySelector(`[data-option="${option}"]`);
      card.classList.toggle('active', options[option]);
      card.querySelector('.option-title').textContent = 
        (options[option] ? '✓ ' : '') + card.querySelector('.option-title').textContent.replace('✓ ', '');
      generateCode();
    }

    function generateCode() {
      const rows = document.querySelectorAll('.color-row');
      const colors = {};
      
      rows.forEach(row => {
        const name = row.querySelector('.color-name').value.trim();
        const color = row.querySelector('.color-picker').value;
        if (name) {
          colors[name] = color;
        }
      });

      let code = '';
      
      if (syntax === 'scss') {
        code = generateSCSS(colors);
      } else {
        code = generateSass(colors);
      }

      document.getElementById('codeOutput').innerHTML = code;
    }

    function generateSCSS(colors) {
      let code = '<span class="syntax-comment">// Color Variables</span>\n';
      
      if (options.variables) {
        Object.entries(colors).forEach(([name, color]) => {
          code += `<span class="syntax-property">$${name}</span>: <span class="syntax-value">${color}</span>;\n`;
        });
        code += '\n';
      }

      if (options.map) {
        code += '<span class="syntax-comment">// Color Map</span>\n';
        code += `<span class="syntax-property">$colors</span>: (\n`;
        Object.entries(colors).forEach(([name, color], index, arr) => {
          code += `  <span class="syntax-string">'${name}'</span>: <span class="syntax-value">${color}</span>${index < arr.length - 1 ? ',' : ''}\n`;
        });
        code += ');\n\n';
      }

      if (options.functions) {
        code += '<span class="syntax-comment">// Color Functions</span>\n';
        code += '<span class="syntax-keyword">@function</span> <span class="syntax-property">color-lighten</span>(<span class="syntax-property">$color</span>, <span class="syntax-property">$amount</span>: <span class="syntax-value">10%</span>) {\n';
        code += '  <span class="syntax-keyword">@return</span> <span class="syntax-keyword">lighten</span>(<span class="syntax-property">$color</span>, <span class="syntax-property">$amount</span>);\n';
        code += '}\n\n';
        code += '<span class="syntax-keyword">@function</span> <span class="syntax-property">color-darken</span>(<span class="syntax-property">$color</span>, <span class="syntax-property">$amount</span>: <span class="syntax-value">10%</span>) {\n';
        code += '  <span class="syntax-keyword">@return</span> <span class="syntax-keyword">darken</span>(<span class="syntax-property">$color</span>, <span class="syntax-property">$amount</span>);\n';
        code += '}\n\n';
        code += '<span class="syntax-keyword">@function</span> <span class="syntax-property">color-alpha</span>(<span class="syntax-property">$color</span>, <span class="syntax-property">$alpha</span>: <span class="syntax-value">0.5</span>) {\n';
        code += '  <span class="syntax-keyword">@return</span> <span class="syntax-keyword">rgba</span>(<span class="syntax-property">$color</span>, <span class="syntax-property">$alpha</span>);\n';
        code += '}\n\n';
      }

      if (options.mixins) {
        code += '<span class="syntax-comment">// Color Mixins</span>\n';
        code += '<span class="syntax-keyword">@mixin</span> <span class="syntax-property">color-scheme</span>(<span class="syntax-property">$color</span>) {\n';
        code += '  <span class="syntax-property">color</span>: <span class="syntax-property">$color</span>;\n';
        code += '  <span class="syntax-property">background-color</span>: <span class="syntax-keyword">lighten</span>(<span class="syntax-property">$color</span>, <span class="syntax-value">40%</span>);\n';
        code += '  <span class="syntax-property">border-color</span>: <span class="syntax-keyword">darken</span>(<span class="syntax-property">$color</span>, <span class="syntax-value">10%</span>);\n';
        code += '}\n\n';
        code += '<span class="syntax-keyword">@mixin</span> <span class="syntax-property">gradient-bg</span>(<span class="syntax-property">$color1</span>, <span class="syntax-property">$color2</span>) {\n';
        code += '  <span class="syntax-property">background</span>: <span class="syntax-keyword">linear-gradient</span>(<span class="syntax-value">135deg</span>, <span class="syntax-property">$color1</span> <span class="syntax-value">0%</span>, <span class="syntax-property">$color2</span> <span class="syntax-value">100%</span>);\n';
        code += '}\n';
      }

      return code;
    }

    function generateSass(colors) {
      let code = '<span class="syntax-comment">// Color Variables</span>\n';
      
      if (options.variables) {
        Object.entries(colors).forEach(([name, color]) => {
          code += `<span class="syntax-property">$${name}</span>: <span class="syntax-value">${color}</span>\n`;
        });
        code += '\n';
      }

      if (options.map) {
        code += '<span class="syntax-comment">// Color Map</span>\n';
        code += `<span class="syntax-property">$colors</span>:\n`;
        Object.entries(colors).forEach(([name, color], index, arr) => {
          code += `  <span class="syntax-string">'${name}'</span>: <span class="syntax-value">${color}</span>${index < arr.length - 1 ? ',' : ''}\n`;
        });
        code += '\n';
      }

      if (options.functions) {
        code += '<span class="syntax-comment">// Color Functions</span>\n';
        code += '<span class="syntax-keyword">@function</span> <span class="syntax-property">color-lighten</span>(<span class="syntax-property">$color</span>, <span class="syntax-property">$amount</span>: <span class="syntax-value">10%</span>)\n';
        code += '  <span class="syntax-keyword">@return</span> <span class="syntax-keyword">lighten</span>(<span class="syntax-property">$color</span>, <span class="syntax-property">$amount</span>)\n\n';
        code += '<span class="syntax-keyword">@function</span> <span class="syntax-property">color-darken</span>(<span class="syntax-property">$color</span>, <span class="syntax-property">$amount</span>: <span class="syntax-value">10%</span>)\n';
        code += '  <span class="syntax-keyword">@return</span> <span class="syntax-keyword">darken</span>(<span class="syntax-property">$color</span>, <span class="syntax-property">$amount</span>)\n\n';
        code += '<span class="syntax-keyword">@function</span> <span class="syntax-property">color-alpha</span>(<span class="syntax-property">$color</span>, <span class="syntax-property">$alpha</span>: <span class="syntax-value">0.5</span>)\n';
        code += '  <span class="syntax-keyword">@return</span> <span class="syntax-keyword">rgba</span>(<span class="syntax-property">$color</span>, <span class="syntax-property">$alpha</span>)\n\n';
      }

      if (options.mixins) {
        code += '<span class="syntax-comment">// Color Mixins</span>\n';
        code += '<span class="syntax-keyword">@mixin</span> <span class="syntax-property">color-scheme</span>(<span class="syntax-property">$color</span>)\n';
        code += '  <span class="syntax-property">color</span>: <span class="syntax-property">$color</span>\n';
        code += '  <span class="syntax-property">background-color</span>: <span class="syntax-keyword">lighten</span>(<span class="syntax-property">$color</span>, <span class="syntax-value">40%</span>)\n';
        code += '  <span class="syntax-property">border-color</span>: <span class="syntax-keyword">darken</span>(<span class="syntax-property">$color</span>, <span class="syntax-value">10%</span>)\n\n';
        code += '<span class="syntax-keyword">@mixin</span> <span class="syntax-property">gradient-bg</span>(<span class="syntax-property">$color1</span>, <span class="syntax-property">$color2</span>)\n';
        code += '  <span class="syntax-property">background</span>: <span class="syntax-keyword">linear-gradient</span>(<span class="syntax-value">135deg</span>, <span class="syntax-property">$color1</span> <span class="syntax-value">0%</span>, <span class="syntax-property">$color2</span> <span class="syntax-value">100%</span>)\n';
      }

      return code;
    }

    function copyCode() {
      const output = document.getElementById('codeOutput');
      const text = output.innerText;
      
      navigator.clipboard.writeText(text).then(() => {
        showToast('Code copied to clipboard!');
      });
    }

    function showToast(message) {
      const existingToast = document.querySelector('.toast');
      if (existingToast) existingToast.remove();
      
      const toast = document.createElement('div');
      toast.className = 'toast';
      toast.textContent = message;
      document.body.appendChild(toast);
      
      setTimeout(() => toast.remove(), 3000);
    }

    init();

let syntax = 'scss';
    let options = {
      variables: true,
      functions: true,
      mixins: true,
      map: false
    };

    function init() {
      updateAllPreviews();
      generateCode();
    }

    function addColor() {
      const container = document.getElementById('colorInputs');
      const row = document.createElement('div');
      row.className = 'color-row';
      row.innerHTML = `
        <input type="text" class="color-name" placeholder="color-name" value="">
        <input type="color" class="color-picker" value="#000000">
        <div class="color-preview" style="background: #000000;"></div>
        <button class="delete-btn" onclick="deleteColor(this)">×</button>
      `;
      container.appendChild(row);
      attachColorListeners(row);
      generateCode();
    }

    function deleteColor(btn) {
      btn.closest('.color-row').remove();
      generateCode();
    }

    function updateAllPreviews() {
      document.querySelectorAll('.color-row').forEach(row => {
        attachColorListeners(row);
      });
    }

    function attachColorListeners(row) {
      const picker = row.querySelector('.color-picker');
      const preview = row.querySelector('.color-preview');
      const nameInput = row.querySelector('.color-name');

      picker.addEventListener('input', (e) => {
        preview.style.background = e.target.value;
        generateCode();
      });

      nameInput.addEventListener('input', () => {
        generateCode();
      });
    }

    function selectSyntax(newSyntax) {
      syntax = newSyntax;
      document.querySelectorAll('.syntax-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.syntax === newSyntax);
      });
      generateCode();
    }

    function toggleOption(option) {
      options[option] = !options[option];
      const card = document.querySelector(`[data-option="${option}"]`);
      card.classList.toggle('active', options[option]);
      card.querySelector('.option-title').textContent = 
        (options[option] ? '✓ ' : '') + card.querySelector('.option-title').textContent.replace('✓ ', '');
      generateCode();
    }

    function generateCode() {
      const rows = document.querySelectorAll('.color-row');
      const colors = {};
      
      rows.forEach(row => {
        const name = row.querySelector('.color-name').value.trim();
        const color = row.querySelector('.color-picker').value;
        if (name) {
          colors[name] = color;
        }
      });

      let code = '';
      
      if (syntax === 'scss') {
        code = generateSCSS(colors);
      } else {
        code = generateSass(colors);
      }

      document.getElementById('codeOutput').innerHTML = code;
    }

    function generateSCSS(colors) {
      let code = '<span class="syntax-comment">// Color Variables</span>\n';
      
      if (options.variables) {
        Object.entries(colors).forEach(([name, color]) => {
          code += `<span class="syntax-property">$${name}</span>: <span class="syntax-value">${color}</span>;\n`;
        });
        code += '\n';
      }

      if (options.map) {
        code += '<span class="syntax-comment">// Color Map</span>\n';
        code += `<span class="syntax-property">$colors</span>: (\n`;
        Object.entries(colors).forEach(([name, color], index, arr) => {
          code += `  <span class="syntax-string">'${name}'</span>: <span class="syntax-value">${color}</span>${index < arr.length - 1 ? ',' : ''}\n`;
        });
        code += ');\n\n';
      }

      if (options.functions) {
        code += '<span class="syntax-comment">// Color Functions</span>\n';
        code += '<span class="syntax-keyword">@function</span> <span class="syntax-property">color-lighten</span>(<span class="syntax-property">$color</span>, <span class="syntax-property">$amount</span>: <span class="syntax-value">10%</span>) {\n';
        code += '  <span class="syntax-keyword">@return</span> <span class="syntax-keyword">lighten</span>(<span class="syntax-property">$color</span>, <span class="syntax-property">$amount</span>);\n';
        code += '}\n\n';
        code += '<span class="syntax-keyword">@function</span> <span class="syntax-property">color-darken</span>(<span class="syntax-property">$color</span>, <span class="syntax-property">$amount</span>: <span class="syntax-value">10%</span>) {\n';
        code += '  <span class="syntax-keyword">@return</span> <span class="syntax-keyword">darken</span>(<span class="syntax-property">$color</span>, <span class="syntax-property">$amount</span>);\n';
        code += '}\n\n';
        code += '<span class="syntax-keyword">@function</span> <span class="syntax-property">color-alpha</span>(<span class="syntax-property">$color</span>, <span class="syntax-property">$alpha</span>: <span class="syntax-value">0.5</span>) {\n';
        code += '  <span class="syntax-keyword">@return</span> <span class="syntax-keyword">rgba</span>(<span class="syntax-property">$color</span>, <span class="syntax-property">$alpha</span>);\n';
        code += '}\n\n';
      }

      if (options.mixins) {
        code += '<span class="syntax-comment">// Color Mixins</span>\n';
        code += '<span class="syntax-keyword">@mixin</span> <span class="syntax-property">color-scheme</span>(<span class="syntax-property">$color</span>) {\n';
        code += '  <span class="syntax-property">color</span>: <span class="syntax-property">$color</span>;\n';
        code += '  <span class="syntax-property">background-color</span>: <span class="syntax-keyword">lighten</span>(<span class="syntax-property">$color</span>, <span class="syntax-value">40%</span>);\n';
        code += '  <span class="syntax-property">border-color</span>: <span class="syntax-keyword">darken</span>(<span class="syntax-property">$color</span>, <span class="syntax-value">10%</span>);\n';
        code += '}\n\n';
        code += '<span class="syntax-keyword">@mixin</span> <span class="syntax-property">gradient-bg</span>(<span class="syntax-property">$color1</span>, <span class="syntax-property">$color2</span>) {\n';
        code += '  <span class="syntax-property">background</span>: <span class="syntax-keyword">linear-gradient</span>(<span class="syntax-value">135deg</span>, <span class="syntax-property">$color1</span> <span class="syntax-value">0%</span>, <span class="syntax-property">$color2</span> <span class="syntax-value">100%</span>);\n';
        code += '}\n';
      }

      return code;
    }

    function generateSass(colors) {
      let code = '<span class="syntax-comment">// Color Variables</span>\n';
      
      if (options.variables) {
        Object.entries(colors).forEach(([name, color]) => {
          code += `<span class="syntax-property">$${name}</span>: <span class="syntax-value">${color}</span>\n`;
        });
        code += '\n';
      }

      if (options.map) {
        code += '<span class="syntax-comment">// Color Map</span>\n';
        code += `<span class="syntax-property">$colors</span>:\n`;
        Object.entries(colors).forEach(([name, color], index, arr) => {
          code += `  <span class="syntax-string">'${name}'</span>: <span class="syntax-value">${color}</span>${index < arr.length - 1 ? ',' : ''}\n`;
        });
        code += '\n';
      }

      if (options.functions) {
        code += '<span class="syntax-comment">// Color Functions</span>\n';
        code += '<span class="syntax-keyword">@function</span> <span class="syntax-property">color-lighten</span>(<span class="syntax-property">$color</span>, <span class="syntax-property">$amount</span>: <span class="syntax-value">10%</span>)\n';
        code += '  <span class="syntax-keyword">@return</span> <span class="syntax-keyword">lighten</span>(<span class="syntax-property">$color</span>, <span class="syntax-property">$amount</span>)\n\n';
        code += '<span class="syntax-keyword">@function</span> <span class="syntax-property">color-darken</span>(<span class="syntax-property">$color</span>, <span class="syntax-property">$amount</span>: <span class="syntax-value">10%</span>)\n';
        code += '  <span class="syntax-keyword">@return</span> <span class="syntax-keyword">darken</span>(<span class="syntax-property">$color</span>, <span class="syntax-property">$amount</span>)\n\n';
        code += '<span class="syntax-keyword">@function</span> <span class="syntax-property">color-alpha</span>(<span class="syntax-property">$color</span>, <span class="syntax-property">$alpha</span>: <span class="syntax-value">0.5</span>)\n';
        code += '  <span class="syntax-keyword">@return</span> <span class="syntax-keyword">rgba</span>(<span class="syntax-property">$color</span>, <span class="syntax-property">$alpha</span>)\n\n';
      }

      if (options.mixins) {
        code += '<span class="syntax-comment">// Color Mixins</span>\n';
        code += '<span class="syntax-keyword">@mixin</span> <span class="syntax-property">color-scheme</span>(<span class="syntax-property">$color</span>)\n';
        code += '  <span class="syntax-property">color</span>: <span class="syntax-property">$color</span>\n';
        code += '  <span class="syntax-property">background-color</span>: <span class="syntax-keyword">lighten</span>(<span class="syntax-property">$color</span>, <span class="syntax-value">40%</span>)\n';
        code += '  <span class="syntax-property">border-color</span>: <span class="syntax-keyword">darken</span>(<span class="syntax-property">$color</span>, <span class="syntax-value">10%</span>)\n\n';
        code += '<span class="syntax-keyword">@mixin</span> <span class="syntax-property">gradient-bg</span>(<span class="syntax-property">$color1</span>, <span class="syntax-property">$color2</span>)\n';
        code += '  <span class="syntax-property">background</span>: <span class="syntax-keyword">linear-gradient</span>(<span class="syntax-value">135deg</span>, <span class="syntax-property">$color1</span> <span class="syntax-value">0%</span>, <span class="syntax-property">$color2</span> <span class="syntax-value">100%</span>)\n';
      }

      return code;
    }

    function copyCode() {
      const output = document.getElementById('codeOutput');
      const text = output.innerText;
      
      navigator.clipboard.writeText(text).then(() => {
        showToast('Code copied to clipboard!');
      });
    }

    function showToast(message) {
      const existingToast = document.querySelector('.toast');
      if (existingToast) existingToast.remove();
      
      const toast = document.createElement('div');
      toast.className = 'toast';
      toast.textContent = message;
      document.body.appendChild(toast);
      
      setTimeout(() => toast.remove(), 3000);
    }

    init();


