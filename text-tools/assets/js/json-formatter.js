function formatJson(indent = 2) {
      const input = document.getElementById('inputJson').value.trim();
      
      if (!input) {
        showToast('Please enter JSON', 'error');
        return;
      }
      
      try {
        const parsed = JSON.parse(input);
        const formatted = JSON.stringify(parsed, null, indent);
        document.getElementById('outputJson').value = formatted;
        updateStatus(true, 'Valid JSON');
        showToast('JSON formatted successfully!');
      } catch (e) {
        updateStatus(false, `Error: ${e.message}`);
        showToast('Invalid JSON', 'error');
      }
    }
    
    function minifyJson() {
      const input = document.getElementById('inputJson').value.trim();
      
      if (!input) {
        showToast('Please enter JSON', 'error');
        return;
      }
      
      try {
        const parsed = JSON.parse(input);
        const minified = JSON.stringify(parsed);
        document.getElementById('outputJson').value = minified;
        updateStatus(true, 'Valid JSON - Minified');
        showToast('JSON minified successfully!');
      } catch (e) {
        updateStatus(false, `Error: ${e.message}`);
        showToast('Invalid JSON', 'error');
      }
    }
    
    function validateJson() {
      const input = document.getElementById('inputJson').value.trim();
      
      if (!input) {
        showToast('Please enter JSON', 'error');
        return;
      }
      
      try {
        JSON.parse(input);
        updateStatus(true, '✓ Valid JSON');
        showToast('JSON is valid!');
      } catch (e) {
        updateStatus(false, `✗ Invalid: ${e.message}`);
        showToast('Invalid JSON', 'error');
      }
    }
    
    function sortKeys() {
      const input = document.getElementById('inputJson').value.trim();
      
      if (!input) {
        showToast('Please enter JSON', 'error');
        return;
      }
      
      try {
        const parsed = JSON.parse(input);
        const sorted = sortObjectKeys(parsed);
        const formatted = JSON.stringify(sorted, null, 2);
        document.getElementById('outputJson').value = formatted;
        updateStatus(true, 'Valid JSON - Keys Sorted');
        showToast('Keys sorted alphabetically!');
      } catch (e) {
        updateStatus(false, `Error: ${e.message}`);
        showToast('Invalid JSON', 'error');
      }
    }
    
    function sortObjectKeys(obj) {
      if (Array.isArray(obj)) {
        return obj.map(item => sortObjectKeys(item));
      } else if (obj !== null && typeof obj === 'object') {
        return Object.keys(obj).sort().reduce((sorted, key) => {
          sorted[key] = sortObjectKeys(obj[key]);
          return sorted;
        }, {});
      }
      return obj;
    }
    
    function updateStatus(isValid, message) {
      const badge = document.getElementById('statusBadge');
      badge.className = `status-badge ${isValid ? 'valid' : 'invalid'}`;
      badge.textContent = message;
    }
    
    function copyResult() {
      const text = document.getElementById('outputJson').value;
      if (!text) {
        showToast('No result to copy', 'error');
        return;
      }
      navigator.clipboard.writeText(text).then(() => {
        showToast('Copied to clipboard!');
      });
    }
    
    function clearAll() {
      document.getElementById('inputJson').value = '';
      document.getElementById('outputJson').value = '';
      document.getElementById('statusBadge').textContent = '';
      showToast('Cleared');
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
