function addPrefixSuffix() {
      const text = document.getElementById('inputText').value;
      if (!text) {
        showToast('Please enter text', 'error');
        return;
      }
      
      const prefix = document.getElementById('prefixInput').value;
      const suffix = document.getElementById('suffixInput').value;
      
      const lines = text.split('\n');
      const result = lines.map(line => `${prefix}${line}${suffix}`).join('\n');
      
      document.getElementById('outputText').value = result;
      showToast('Prefix/suffix added!');
    }
    
    function addLineNumbers() {
      const text = document.getElementById('inputText').value;
      if (!text) {
        showToast('Please enter text', 'error');
        return;
      }
      
      const lines = text.split('\n');
      const result = lines.map((line, i) => `${i + 1}. ${line}`).join('\n');
      
      document.getElementById('outputText').value = result;
      showToast('Line numbers added!');
    }
    
    function addBullets() {
      const text = document.getElementById('inputText').value;
      if (!text) {
        showToast('Please enter text', 'error');
        return;
      }
      
      const lines = text.split('\n');
      const result = lines.map(line => line.trim() ? `• ${line}` : line).join('\n');
      
      document.getElementById('outputText').value = result;
      showToast('Bullets added!');
    }
    
    function addCheckboxes() {
      const text = document.getElementById('inputText').value;
      if (!text) {
        showToast('Please enter text', 'error');
        return;
      }
      
      const lines = text.split('\n');
      const result = lines.map(line => line.trim() ? `☐ ${line}` : line).join('\n');
      
      document.getElementById('outputText').value = result;
      showToast('Checkboxes added!');
    }
    
    function addQuotes() {
      const text = document.getElementById('inputText').value;
      if (!text) {
        showToast('Please enter text', 'error');
        return;
      }
      
      const lines = text.split('\n');
      const result = lines.map(line => line.trim() ? `"${line}"` : line).join('\n');
      
      document.getElementById('outputText').value = result;
      showToast('Quotes added!');
    }
    
    function indentLines() {
      const text = document.getElementById('inputText').value;
      if (!text) {
        showToast('Please enter text', 'error');
        return;
      }
      
      const spaces = prompt('Number of spaces to indent:', '4');
      if (!spaces || isNaN(spaces)) {
        showToast('Invalid number', 'error');
        return;
      }
      
      const indent = ' '.repeat(parseInt(spaces));
      const lines = text.split('\n');
      const result = lines.map(line => `${indent}${line}`).join('\n');
      
      document.getElementById('outputText').value = result;
      showToast(`Lines indented by ${spaces} spaces!`);
    }
    
    function copyResult() {
      const text = document.getElementById('outputText').value;
      if (!text) {
        showToast('No result to copy', 'error');
        return;
      }
      navigator.clipboard.writeText(text).then(() => {
        showToast('Copied to clipboard!');
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
