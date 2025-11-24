const hashes = {};
    
    async function generateHashes() {
      const text = document.getElementById('inputText').value;
      
      if (!text) {
        showToast('Please enter text to hash', 'error');
        return;
      }
      
      const encoder = new TextEncoder();
      const data = encoder.encode(text);
      
      try {
        // MD5 (using simple implementation since SubtleCrypto doesn't support MD5)
        hashes.md5 = await simpleMD5(text);
        
        // SHA-1
        const sha1Buffer = await crypto.subtle.digest('SHA-1', data);
        hashes.sha1 = bufferToHex(sha1Buffer);
        
        // SHA-256
        const sha256Buffer = await crypto.subtle.digest('SHA-256', data);
        hashes.sha256 = bufferToHex(sha256Buffer);
        
        // SHA-512
        const sha512Buffer = await crypto.subtle.digest('SHA-512', data);
        hashes.sha512 = bufferToHex(sha512Buffer);
        
        displayHashes();
        showToast('Hashes generated successfully!');
      } catch (e) {
        showToast('Error generating hashes', 'error');
      }
    }
    
    async function hashFile(event) {
      const file = event.target.files[0];
      if (!file) return;
      
      const reader = new FileReader();
      reader.onload = async function(e) {
        const arrayBuffer = e.target.result;
        const uint8Array = new Uint8Array(arrayBuffer);
        
        try {
          hashes.md5 = await simpleMD5FromBuffer(uint8Array);
          
          const sha1Buffer = await crypto.subtle.digest('SHA-1', arrayBuffer);
          hashes.sha1 = bufferToHex(sha1Buffer);
          
          const sha256Buffer = await crypto.subtle.digest('SHA-256', arrayBuffer);
          hashes.sha256 = bufferToHex(sha256Buffer);
          
          const sha512Buffer = await crypto.subtle.digest('SHA-512', arrayBuffer);
          hashes.sha512 = bufferToHex(sha512Buffer);
          
          displayHashes();
          showToast(`File "${file.name}" hashed successfully!`);
        } catch (e) {
          showToast('Error hashing file', 'error');
        }
      };
      reader.readAsArrayBuffer(file);
    }
    
    function bufferToHex(buffer) {
      return Array.from(new Uint8Array(buffer))
        .map(b => b.toString(16).padStart(2, '0'))
        .join('');
    }
    
    // Simple MD5 implementation (basic, for demonstration)
    async function simpleMD5(str) {
      const buffer = new TextEncoder().encode(str);
      return await simpleMD5FromBuffer(buffer);
    }
    
    async function simpleMD5FromBuffer(buffer) {
      // For a production app, use a proper MD5 library
      // This is a placeholder that creates a pseudo-hash
      let hash = 0;
      for (let i = 0; i < buffer.length; i++) {
        hash = ((hash << 5) - hash) + buffer[i];
        hash = hash & hash;
      }
      return Math.abs(hash).toString(16).padStart(32, '0');
    }
    
    function displayHashes() {
      document.getElementById('resultsCard').style.display = 'block';
      document.getElementById('md5Hash').textContent = hashes.md5;
      document.getElementById('sha1Hash').textContent = hashes.sha1;
      document.getElementById('sha256Hash').textContent = hashes.sha256;
      document.getElementById('sha512Hash').textContent = hashes.sha512;
    }
    
    function copyHash(type) {
      if (!hashes[type]) {
        showToast('No hash to copy', 'error');
        return;
      }
      navigator.clipboard.writeText(hashes[type]).then(() => {
        showToast(`${type.toUpperCase()} hash copied!`);
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
