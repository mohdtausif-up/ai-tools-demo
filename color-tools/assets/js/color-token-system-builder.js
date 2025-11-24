let currentFormat = 'json';

    function init() {
      updateAllInputs();
      generateTokens();
    }

    function addColor() {
      const container = document.getElementById('colorInputs');
      const row = document.createElement('div');
      row.className = 'color-row';
      row.innerHTML = `
        <input type="text" class="color-name" placeholder="token.name" value="">
        <input type="color" class="color-picker" value="#000000">
        <button class="delete-btn" onclick="deleteColor(this)">×</button>
      `;
      container.appendChild(row);
      attachListeners(row);
      generateTokens();
    }

    function deleteColor(btn) {
      btn.closest('.color-row').remove();
      generateTokens();
    }

    function updateAllInputs() {
      document.querySelectorAll('.color-row').forEach(row => {
        attachListeners(row);
      });
      
      document.getElementById('tokenPrefix').addEventListener('input', () => {
        generateTokens();
      });
    }

    function attachListeners(row) {
      const picker = row.querySelector('.color-picker');
      const nameInput = row.querySelector('.color-name');

      picker.addEventListener('input', () => generateTokens());
      nameInput.addEventListener('input', () => generateTokens());
    }

    function selectFormat(format) {
      currentFormat = format;
      document.querySelectorAll('.format-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.format === format);
      });
      generateTokens();
    }

    function generateTokens() {
      const prefix = document.getElementById('tokenPrefix').value.trim() || 'color';
      const rows = document.querySelectorAll('.color-row');
      const colors = {};
      
      rows.forEach(row => {
        const name = row.querySelector('.color-name').value.trim();
        const color = row.querySelector('.color-picker').value;
        if (name) {
          colors[name] = color;
        }
      });

      let output = '';
      
      switch (currentFormat) {
        case 'json':
          output = generateJSON(prefix, colors);
          break;
        case 'yaml':
          output = generateYAML(prefix, colors);
          break;
        case 'css':
          output = generateCSS(prefix, colors);
          break;
        case 'js':
          output = generateJS(prefix, colors);
          break;
      }

      document.getElementById('tokenOutput').innerHTML = output;
    }

    function generateJSON(prefix, colors) {
      const tokens = {};
      tokens[prefix] = {};
      
      Object.entries(colors).forEach(([name, value]) => {
        const parts = name.split('.');
        let current = tokens[prefix];
        
        parts.forEach((part, index) => {
          if (index === parts.length - 1) {
            current[part] = { value, type: 'color' };
          } else {
            if (!current[part]) current[part] = {};
            current = current[part];
          }
        });
      });

      const jsonStr = JSON.stringify(tokens, null, 2);
      return jsonStr
        .replace(/"([^"]+)":/g, '<span class="syntax-property">"$1"</span>:')
        .replace(/: "([^"]+)"/g, ': <span class="syntax-string">"$1"</span>')
        .replace(/: {/g, ': <span class="syntax-keyword">{</span>')
        .replace(/}/g, '<span class="syntax-keyword">}</span>');
    }

    function generateYAML(prefix, colors) {
      let yaml = `<span class="syntax-property">${prefix}</span>:\n`;
      
      const grouped = {};
      Object.entries(colors).forEach(([name, value]) => {
        const parts = name.split('.');
        if (parts.length > 1) {
          const group = parts[0];
          const subname = parts.slice(1).join('.');
          if (!grouped[group]) grouped[group] = {};
          grouped[group][subname] = value;
        } else {
          grouped[name] = { '': value };
        }
      });

      Object.entries(grouped).forEach(([group, items]) => {
        yaml += `  <span class="syntax-property">${group}</span>:\n`;
        Object.entries(items).forEach(([name, value]) => {
          if (name === '') {
            yaml += `    <span class="syntax-property">value</span>: <span class="syntax-string">${value}</span>\n`;
            yaml += `    <span class="syntax-property">type</span>: <span class="syntax-string">color</span>\n`;
          } else {
            yaml += `    <span class="syntax-property">${name}</span>:\n`;
            yaml += `      <span class="syntax-property">value</span>: <span class="syntax-string">${value}</span>\n`;
            yaml += `      <span class="syntax-property">type</span>: <span class="syntax-string">color</span>\n`;
          }
        });
      });

      return yaml;
    }

    function generateCSS(prefix, colors) {
      let css = '<span class="syntax-keyword">:root</span> {\n';
      
      Object.entries(colors).forEach(([name, value]) => {
        const varName = `--${prefix}-${name.replace(/\./g, '-')}`;
        css += `  <span class="syntax-property">${varName}</span>: <span class="syntax-value">${value}</span>;\n`;
      });
      
      css += '}';
      return css;
    }

    function generateJS(prefix, colors) {
      let js = '<span class="syntax-keyword">export</span> <span class="syntax-keyword">const</span> <span class="syntax-property">${prefix}Tokens</span> = {\n';
      
      Object.entries(colors).forEach(([name, value]) => {
        const jsName = name.replace(/\./g, '_');
        js += `  <span class="syntax-property">${jsName}</span>: <span class="syntax-string">'${value}'</span>,\n`;
      });
      
      js += '};\n\n';
      js += '<span class="syntax-comment">// Usage: import { ${prefix}Tokens } from "./tokens";</span>';
      return js;
    }

    function copyTokens() {
      const output = document.getElementById('tokenOutput');
      const text = output.innerText;
      
      navigator.clipboard.writeText(text).then(() => {
        showToast('Tokens copied to clipboard!');
      });
    }

    function downloadTokens() {
      const output = document.getElementById('tokenOutput');
      const text = output.innerText;
      
      const extensions = {
        json: 'json',
        yaml: 'yaml',
        css: 'css',
        js: 'js'
      };
      
      const filename = `color-tokens.${extensions[currentFormat]}`;
      const blob = new Blob([text], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      a.click();
      URL.revokeObjectURL(url);
      
      showToast(`Downloaded ${filename}!`);
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

let currentFormat = 'json';

    function init() {
      updateAllInputs();
      generateTokens();
    }

    function addColor() {
      const container = document.getElementById('colorInputs');
      const row = document.createElement('div');
      row.className = 'color-row';
      row.innerHTML = `
        <input type="text" class="color-name" placeholder="token.name" value="">
        <input type="color" class="color-picker" value="#000000">
        <button class="delete-btn" onclick="deleteColor(this)">×</button>
      `;
      container.appendChild(row);
      attachListeners(row);
      generateTokens();
    }

    function deleteColor(btn) {
      btn.closest('.color-row').remove();
      generateTokens();
    }

    function updateAllInputs() {
      document.querySelectorAll('.color-row').forEach(row => {
        attachListeners(row);
      });
      
      document.getElementById('tokenPrefix').addEventListener('input', () => {
        generateTokens();
      });
    }

    function attachListeners(row) {
      const picker = row.querySelector('.color-picker');
      const nameInput = row.querySelector('.color-name');

      picker.addEventListener('input', () => generateTokens());
      nameInput.addEventListener('input', () => generateTokens());
    }

    function selectFormat(format) {
      currentFormat = format;
      document.querySelectorAll('.format-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.format === format);
      });
      generateTokens();
    }

    function generateTokens() {
      const prefix = document.getElementById('tokenPrefix').value.trim() || 'color';
      const rows = document.querySelectorAll('.color-row');
      const colors = {};
      
      rows.forEach(row => {
        const name = row.querySelector('.color-name').value.trim();
        const color = row.querySelector('.color-picker').value;
        if (name) {
          colors[name] = color;
        }
      });

      let output = '';
      
      switch (currentFormat) {
        case 'json':
          output = generateJSON(prefix, colors);
          break;
        case 'yaml':
          output = generateYAML(prefix, colors);
          break;
        case 'css':
          output = generateCSS(prefix, colors);
          break;
        case 'js':
          output = generateJS(prefix, colors);
          break;
      }

      document.getElementById('tokenOutput').innerHTML = output;
    }

    function generateJSON(prefix, colors) {
      const tokens = {};
      tokens[prefix] = {};
      
      Object.entries(colors).forEach(([name, value]) => {
        const parts = name.split('.');
        let current = tokens[prefix];
        
        parts.forEach((part, index) => {
          if (index === parts.length - 1) {
            current[part] = { value, type: 'color' };
          } else {
            if (!current[part]) current[part] = {};
            current = current[part];
          }
        });
      });

      const jsonStr = JSON.stringify(tokens, null, 2);
      return jsonStr
        .replace(/"([^"]+)":/g, '<span class="syntax-property">"$1"</span>:')
        .replace(/: "([^"]+)"/g, ': <span class="syntax-string">"$1"</span>')
        .replace(/: {/g, ': <span class="syntax-keyword">{</span>')
        .replace(/}/g, '<span class="syntax-keyword">}</span>');
    }

    function generateYAML(prefix, colors) {
      let yaml = `<span class="syntax-property">${prefix}</span>:\n`;
      
      const grouped = {};
      Object.entries(colors).forEach(([name, value]) => {
        const parts = name.split('.');
        if (parts.length > 1) {
          const group = parts[0];
          const subname = parts.slice(1).join('.');
          if (!grouped[group]) grouped[group] = {};
          grouped[group][subname] = value;
        } else {
          grouped[name] = { '': value };
        }
      });

      Object.entries(grouped).forEach(([group, items]) => {
        yaml += `  <span class="syntax-property">${group}</span>:\n`;
        Object.entries(items).forEach(([name, value]) => {
          if (name === '') {
            yaml += `    <span class="syntax-property">value</span>: <span class="syntax-string">${value}</span>\n`;
            yaml += `    <span class="syntax-property">type</span>: <span class="syntax-string">color</span>\n`;
          } else {
            yaml += `    <span class="syntax-property">${name}</span>:\n`;
            yaml += `      <span class="syntax-property">value</span>: <span class="syntax-string">${value}</span>\n`;
            yaml += `      <span class="syntax-property">type</span>: <span class="syntax-string">color</span>\n`;
          }
        });
      });

      return yaml;
    }

    function generateCSS(prefix, colors) {
      let css = '<span class="syntax-keyword">:root</span> {\n';
      
      Object.entries(colors).forEach(([name, value]) => {
        const varName = `--${prefix}-${name.replace(/\./g, '-')}`;
        css += `  <span class="syntax-property">${varName}</span>: <span class="syntax-value">${value}</span>;\n`;
      });
      
      css += '}';
      return css;
    }

    function generateJS(prefix, colors) {
      let js = '<span class="syntax-keyword">export</span> <span class="syntax-keyword">const</span> <span class="syntax-property">${prefix}Tokens</span> = {\n';
      
      Object.entries(colors).forEach(([name, value]) => {
        const jsName = name.replace(/\./g, '_');
        js += `  <span class="syntax-property">${jsName}</span>: <span class="syntax-string">'${value}'</span>,\n`;
      });
      
      js += '};\n\n';
      js += '<span class="syntax-comment">// Usage: import { ${prefix}Tokens } from "./tokens";</span>';
      return js;
    }

    function copyTokens() {
      const output = document.getElementById('tokenOutput');
      const text = output.innerText;
      
      navigator.clipboard.writeText(text).then(() => {
        showToast('Tokens copied to clipboard!');
      });
    }

    function downloadTokens() {
      const output = document.getElementById('tokenOutput');
      const text = output.innerText;
      
      const extensions = {
        json: 'json',
        yaml: 'yaml',
        css: 'css',
        js: 'js'
      };
      
      const filename = `color-tokens.${extensions[currentFormat]}`;
      const blob = new Blob([text], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      a.click();
      URL.revokeObjectURL(url);
      
      showToast(`Downloaded ${filename}!`);
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


