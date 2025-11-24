function removeAllBreaks() {
      const text = document.getElementById('inputText').value;
      if (!text) {
        showToast('Please enter text', 'error');
        return;
      }
      
      const result = text.replace(/[\r\n]+/g, ' ').replace(/\s+/g, ' ');
      document.getElementById('outputText').value = result;
      showToast('All line breaks removed');
    }
    
    function removeExtraBreaks() {
      const text = document.getElementById('inputText').value;
      if (!text) {
        showToast('Please enter text', 'error');
        return;
      }
      
      // Replace multiple line breaks with single line break
      const result = text.replace(/[\r\n]{3,}/g, '\n\n').replace(/[\r\n]{2}/g, '\n\n');
      document.getElementById('outputText').value = result;
      showToast('Extra line breaks removed');
    }
    
    function addAfterSentences() {
      const text = document.getElementById('inputText').value;
      if (!text) {
        showToast('Please enter text', 'error');
        return;
      }
      
      const result = text
        .replace(/([.!?])\s+/g, '$1\n')
        .replace(/\n{3,}/g, '\n\n');
      document.getElementById('outputText').value = result;
      showToast('Line breaks added after sentences');
    }
    
    function convertToCRLF() {
      const text = document.getElementById('inputText').value;
      if (!text) {
        showToast('Please enter text', 'error');
        return;
      }
      
      // First normalize to LF, then convert to CRLF
      const result = text.replace(/\r\n/g, '\n').replace(/\n/g, '\r\n');
      document.getElementById('outputText').value = result;
      showToast('Converted to CRLF (Windows)');
    }
    
    function convertToLF() {
      const text = document.getElementById('inputText').value;
      if (!text) {
        showToast('Please enter text', 'error');
        return;
      }
      
      const result = text.replace(/\r\n/g, '\n').replace(/\r/g, '\n');
      document.getElementById('outputText').value = result;
      showToast('Converted to LF (Unix/Mac)');
    }
    
    function addEveryNChars() {
      const text = document.getElementById('inputText').value;
      if (!text) {
        showToast('Please enter text', 'error');
        return;
      }
      
      const n = prompt('Add line break every N characters:', '80');
      if (!n || isNaN(n)) {
        showToast('Invalid number', 'error');
        return;
      }
      
      const num = parseInt(n);
      const result = text.match(new RegExp(`.{1,${num}}`, 'g')).join('\n');
      document.getElementById('outputText').value = result;
      showToast(`Line breaks added every ${num} characters`);
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
