const outputs = {};
    
    function convertText(mode) {
      const text = document.getElementById('inputText').value;
      
      if (!text) {
        showToast('Please enter text', 'error');
        return;
      }
      
      if (mode === 'encode') {
        encodeText(text);
      } else if (mode === 'decode-binary') {
        decodeBinary(text);
      } else if (mode === 'decode-hex') {
        decodeHex(text);
      }
    }
    
    function encodeText(text) {
      outputs.binary = text.split('').map(c => 
        c.charCodeAt(0).toString(2).padStart(8, '0')
      ).join(' ');
      
      outputs.hex = text.split('').map(c => 
        c.charCodeAt(0).toString(16).padStart(2, '0')
      ).join(' ');
      
      outputs.decimal = text.split('').map(c => 
        c.charCodeAt(0)
      ).join(' ');
      
      outputs.octal = text.split('').map(c => 
        c.charCodeAt(0).toString(8)
      ).join(' ');
      
      displayOutputs();
      showToast('Text encoded successfully!');
    }
    
    function decodeBinary(binary) {
      try {
        const cleaned = binary.replace(/\s+/g, '');
        let result = '';
        for (let i = 0; i < cleaned.length; i += 8) {
          const byte = cleaned.substr(i, 8);
          result += String.fromCharCode(parseInt(byte, 2));
        }
        document.getElementById('inputText').value = result;
        showToast('Binary decoded successfully!');
      } catch (e) {
        showToast('Invalid binary format', 'error');
      }
    }
    
    function decodeHex(hex) {
      try {
        const cleaned = hex.replace(/\s+/g, '');
        let result = '';
        for (let i = 0; i < cleaned.length; i += 2) {
          const byte = cleaned.substr(i, 2);
          result += String.fromCharCode(parseInt(byte, 16));
        }
        document.getElementById('inputText').value = result;
        showToast('Hex decoded successfully!');
      } catch (e) {
        showToast('Invalid hex format', 'error');
      }
    }
    
    function displayOutputs() {
      document.getElementById('resultsCard').style.display = 'block';
      document.getElementById('binaryOutput').textContent = outputs.binary;
      document.getElementById('hexOutput').textContent = outputs.hex;
      document.getElementById('decimalOutput').textContent = outputs.decimal;
      document.getElementById('octalOutput').textContent = outputs.octal;
    }
    
    function copyOutput(type) {
      if (!outputs[type]) {
        showToast('No output to copy', 'error');
        return;
      }
      navigator.clipboard.writeText(outputs[type]).then(() => {
        showToast(`${type.toUpperCase()} copied!`);
      });
    }
    
    function clearAll() {
      document.getElementById('inputText').value = '';
      document.getElementById('resultsCard').style.display = 'none';
      outputs = {};
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
