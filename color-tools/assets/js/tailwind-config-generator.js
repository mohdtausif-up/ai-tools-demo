let configType = 'extend';

    function init() {
      updateAllPreviews();
      generateConfig();
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
      generateConfig();
    }

    function deleteColor(btn) {
      btn.closest('.color-row').remove();
      generateConfig();
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
        generateConfig();
      });

      nameInput.addEventListener('input', () => {
        generateConfig();
      });
    }

    function selectConfigType(type) {
      configType = type;
      document.querySelectorAll('.config-type-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.type === type);
      });
      generateConfig();
    }

    function generateConfig() {
      const rows = document.querySelectorAll('.color-row');
      const colors = {};
      
      rows.forEach(row => {
        const name = row.querySelector('.color-name').value.trim();
        const color = row.querySelector('.color-picker').value;
        if (name) {
          colors[name] = color;
        }
      });

      let config = '';
      
      if (configType === 'extend') {
        config = generateExtendConfig(colors);
      } else if (configType === 'replace') {
        config = generateReplaceConfig(colors);
      } else {
        config = generateFullConfig(colors);
      }

      document.getElementById('configOutput').innerHTML = config;
    }

    function generateExtendConfig(colors) {
      let config = `<span class="syntax-keyword">module.exports</span> = {\n`;
      config += `  <span class="syntax-property">theme</span>: {\n`;
      config += `    <span class="syntax-property">extend</span>: {\n`;
      config += `      <span class="syntax-property">colors</span>: {\n`;
      
      Object.entries(colors).forEach(([name, color]) => {
        config += `        <span class="syntax-string">'${name}'</span>: <span class="syntax-string">'${color}'</span>,\n`;
      });
      
      config += `      },\n`;
      config += `    },\n`;
      config += `  },\n`;
      config += `}`;
      
      return config;
    }

    function generateReplaceConfig(colors) {
      let config = `<span class="syntax-keyword">module.exports</span> = {\n`;
      config += `  <span class="syntax-property">theme</span>: {\n`;
      config += `    <span class="syntax-property">colors</span>: {\n`;
      
      Object.entries(colors).forEach(([name, color]) => {
        config += `      <span class="syntax-string">'${name}'</span>: <span class="syntax-string">'${color}'</span>,\n`;
      });
      
      config += `    },\n`;
      config += `  },\n`;
      config += `}`;
      
      return config;
    }

    function generateFullConfig(colors) {
      let config = `<span class="syntax-keyword">module.exports</span> = {\n`;
      config += `  <span class="syntax-property">content</span>: [<span class="syntax-string">'./src/**/*.{js,jsx,ts,tsx}'</span>],\n`;
      config += `  <span class="syntax-property">theme</span>: {\n`;
      config += `    <span class="syntax-property">extend</span>: {\n`;
      config += `      <span class="syntax-property">colors</span>: {\n`;
      
      Object.entries(colors).forEach(([name, color]) => {
        config += `        <span class="syntax-string">'${name}'</span>: <span class="syntax-string">'${color}'</span>,\n`;
      });
      
      config += `      },\n`;
      config += `    },\n`;
      config += `  },\n`;
      config += `  <span class="syntax-property">plugins</span>: [],\n`;
      config += `}`;
      
      return config;
    }

    function copyConfig() {
      const output = document.getElementById('configOutput');
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

let configType = 'extend';

    function init() {
      updateAllPreviews();
      generateConfig();
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
      generateConfig();
    }

    function deleteColor(btn) {
      btn.closest('.color-row').remove();
      generateConfig();
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
        generateConfig();
      });

      nameInput.addEventListener('input', () => {
        generateConfig();
      });
    }

    function selectConfigType(type) {
      configType = type;
      document.querySelectorAll('.config-type-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.type === type);
      });
      generateConfig();
    }

    function generateConfig() {
      const rows = document.querySelectorAll('.color-row');
      const colors = {};
      
      rows.forEach(row => {
        const name = row.querySelector('.color-name').value.trim();
        const color = row.querySelector('.color-picker').value;
        if (name) {
          colors[name] = color;
        }
      });

      let config = '';
      
      if (configType === 'extend') {
        config = generateExtendConfig(colors);
      } else if (configType === 'replace') {
        config = generateReplaceConfig(colors);
      } else {
        config = generateFullConfig(colors);
      }

      document.getElementById('configOutput').innerHTML = config;
    }

    function generateExtendConfig(colors) {
      let config = `<span class="syntax-keyword">module.exports</span> = {\n`;
      config += `  <span class="syntax-property">theme</span>: {\n`;
      config += `    <span class="syntax-property">extend</span>: {\n`;
      config += `      <span class="syntax-property">colors</span>: {\n`;
      
      Object.entries(colors).forEach(([name, color]) => {
        config += `        <span class="syntax-string">'${name}'</span>: <span class="syntax-string">'${color}'</span>,\n`;
      });
      
      config += `      },\n`;
      config += `    },\n`;
      config += `  },\n`;
      config += `}`;
      
      return config;
    }

    function generateReplaceConfig(colors) {
      let config = `<span class="syntax-keyword">module.exports</span> = {\n`;
      config += `  <span class="syntax-property">theme</span>: {\n`;
      config += `    <span class="syntax-property">colors</span>: {\n`;
      
      Object.entries(colors).forEach(([name, color]) => {
        config += `      <span class="syntax-string">'${name}'</span>: <span class="syntax-string">'${color}'</span>,\n`;
      });
      
      config += `    },\n`;
      config += `  },\n`;
      config += `}`;
      
      return config;
    }

    function generateFullConfig(colors) {
      let config = `<span class="syntax-keyword">module.exports</span> = {\n`;
      config += `  <span class="syntax-property">content</span>: [<span class="syntax-string">'./src/**/*.{js,jsx,ts,tsx}'</span>],\n`;
      config += `  <span class="syntax-property">theme</span>: {\n`;
      config += `    <span class="syntax-property">extend</span>: {\n`;
      config += `      <span class="syntax-property">colors</span>: {\n`;
      
      Object.entries(colors).forEach(([name, color]) => {
        config += `        <span class="syntax-string">'${name}'</span>: <span class="syntax-string">'${color}'</span>,\n`;
      });
      
      config += `      },\n`;
      config += `    },\n`;
      config += `  },\n`;
      config += `  <span class="syntax-property">plugins</span>: [],\n`;
      config += `}`;
      
      return config;
    }

    function copyConfig() {
      const output = document.getElementById('configOutput');
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


