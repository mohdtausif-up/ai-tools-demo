document.getElementById('inputText').addEventListener('input', updateStats);
    
    function updateStats() {
      const text = document.getElementById('inputText').value;
      document.getElementById('beforeChars').textContent = text.length;
      document.getElementById('beforeSpaces').textContent = (text.match(/ /g) || []).length;
      document.getElementById('beforeBreaks').textContent = (text.match(/\n/g) || []).length;
    }
    
    function cleanAll() {
      const text = document.getElementById('inputText').value;
      if (!text) {
        showToast('Please enter text', 'error');
        return;
      }
      
      let result = text;
      // Remove extra spaces
      result = result.replace(/ +/g, ' ');
      // Remove trailing spaces
      result = result.split('\n').map(line => line.trim()).join('\n');
      // Remove empty lines
      result = result.replace(/\n{3,}/g, '\n\n');
      // Convert tabs to spaces
      result = result.replace(/\t/g, '  ');
      
      displayResult(result);
      showToast('Text cleaned completely');
    }
    
    function removeExtraSpaces() {
      const text = document.getElementById('inputText').value;
      if (!text) {
        showToast('Please enter text', 'error');
        return;
      }
      
      const result = text.replace(/ +/g, ' ');
      displayResult(result);
      showToast('Extra spaces removed');
    }
    
    function trimLines() {
      const text = document.getElementById('inputText').value;
      if (!text) {
        showToast('Please enter text', 'error');
        return;
      }
      
      const result = text.split('\n').map(line => line.trim()).join('\n');
      displayResult(result);
      showToast('Lines trimmed');
    }
    
    function normalizeWhitespace() {
      const text = document.getElementById('inputText').value;
      if (!text) {
        showToast('Please enter text', 'error');
        return;
      }
      
      const result = text.replace(/[ \t]+/g, ' ').replace(/\n +/g, '\n');
      displayResult(result);
      showToast('Whitespace normalized');
    }
    
    function removeEmptyLines() {
      const text = document.getElementById('inputText').value;
      if (!text) {
        showToast('Please enter text', 'error');
        return;
      }
      
      const result = text.split('\n').filter(line => line.trim()).join('\n');
      displayResult(result);
      showToast('Empty lines removed');
    }
    
    function tabsToSpaces() {
      const text = document.getElementById('inputText').value;
      if (!text) {
        showToast('Please enter text', 'error');
        return;
      }
      
      const spaces = prompt('Replace each tab with how many spaces?', '4');
      if (!spaces || isNaN(spaces)) {
        showToast('Invalid number', 'error');
        return;
      }
      
      const result = text.replace(/\t/g, ' '.repeat(parseInt(spaces)));
      displayResult(result);
      showToast('Tabs converted to spaces');
    }
    
    function displayResult(result) {
      const original = document.getElementById('inputText').value;
      document.getElementById('outputText').value = result;
      
      const saved = original.length - result.length;
      const reduction = original.length > 0 
        ? ((saved / original.length) * 100).toFixed(1)
        : 0;
      
      document.getElementById('charsSaved').textContent = saved;
      document.getElementById('reduction').textContent = reduction + '%';
      document.getElementById('afterStats').style.display = 'block';
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
    
    updateStats();
