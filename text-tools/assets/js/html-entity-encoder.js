function encodeEntities() {
      const text = document.getElementById('inputText').value;
      
      if (!text) {
        showToast('Please enter text to encode', 'error');
        return;
      }
      
      const encoded = text
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&apos;')
        .replace(/\u00A0/g, '&nbsp;')
        .replace(/©/g, '&copy;')
        .replace(/®/g, '&reg;')
        .replace(/™/g, '&trade;')
        .replace(/€/g, '&euro;')
        .replace(/£/g, '&pound;')
        .replace(/¥/g, '&yen;')
        .replace(/¢/g, '&cent;')
        .replace(/°/g, '&deg;')
        .replace(/±/g, '&plusmn;')
        .replace(/×/g, '&times;')
        .replace(/÷/g, '&divide;');
      
      document.getElementById('outputText').value = encoded;
      showToast('Text encoded to HTML entities!');
    }
    
    function decodeEntities() {
      const text = document.getElementById('inputText').value;
      
      if (!text) {
        showToast('Please enter entities to decode', 'error');
        return;
      }
      
      // Use textarea to decode entities
      const textarea = document.createElement('textarea');
      textarea.innerHTML = text;
      const decoded = textarea.value;
      
      document.getElementById('outputText').value = decoded;
      showToast('HTML entities decoded!');
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
