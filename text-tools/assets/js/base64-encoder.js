function encodeBase64() {
      const input = document.getElementById('inputText').value;
      
      if (!input) {
        showToast('Please enter text to encode', 'error');
        return;
      }
      
      try {
        const encoded = btoa(unescape(encodeURIComponent(input)));
        document.getElementById('outputText').value = encoded;
        showToast('Text encoded to Base64!');
      } catch (e) {
        showToast('Encoding failed: ' + e.message, 'error');
      }
    }
    
    function decodeBase64() {
      const input = document.getElementById('inputText').value.trim();
      
      if (!input) {
        showToast('Please enter Base64 to decode', 'error');
        return;
      }
      
      try {
        const decoded = decodeURIComponent(escape(atob(input)));
        document.getElementById('outputText').value = decoded;
        showToast('Base64 decoded to text!');
      } catch (e) {
        showToast('Invalid Base64 string', 'error');
      }
    }
    
    function handleFileSelect(event) {
      const file = event.target.files[0];
      if (!file) return;
      
      const reader = new FileReader();
      reader.onload = function(e) {
        const base64 = e.target.result.split(',')[1];
        document.getElementById('outputText').value = base64;
        showToast(`File "${file.name}" encoded to Base64!`);
      };
      reader.readAsDataURL(file);
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
    
    function downloadResult() {
      const text = document.getElementById('outputText').value;
      if (!text) {
        showToast('No result to download', 'error');
        return;
      }
      
      const blob = new Blob([text], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'base64-result.txt';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      showToast('File downloaded!');
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
