let uuidList = [];
    
    function generateUUIDs() {
      const count = parseInt(document.getElementById('countInput').value);
      
      if (count < 1 || count > 1000) {
        showToast('Count must be between 1 and 1000', 'error');
        return;
      }
      
      uuidList = [];
      for (let i = 0; i < count; i++) {
        uuidList.push(generateUUID());
      }
      
      displayUUIDs();
      showToast(`Generated ${count} UUID(s)!`);
    }
    
    function generateUUID() {
      if (typeof crypto.randomUUID === 'function') {
        return crypto.randomUUID();
      }
      
      // Fallback for older browsers
      return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        const r = Math.random() * 16 | 0;
        const v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
      });
    }
    
    function displayUUIDs() {
      const container = document.getElementById('uuidList');
      
      if (uuidList.length === 0) {
        container.innerHTML = '<p style="text-align: center; color: #94a3b8; padding: 40px;">No UUIDs generated yet</p>';
        document.getElementById('bulkActions').style.display = 'none';
        return;
      }
      
      container.innerHTML = uuidList.map((uuid, index) => `
        <div class="uuid-item">
          <span class="uuid-text">${uuid}</span>
          <button class="copy-btn-small" onclick="copySingleUUID(${index})">📋 Copy</button>
        </div>
      `).join('');
      
      document.getElementById('bulkActions').style.display = 'flex';
    }
    
    function copySingleUUID(index) {
      const uuid = uuidList[index];
      navigator.clipboard.writeText(uuid).then(() => {
        showToast('UUID copied!');
      });
    }
    
    function copyAllUUIDs() {
      if (uuidList.length === 0) {
        showToast('No UUIDs to copy', 'error');
        return;
      }
      
      const text = uuidList.join('\n');
      navigator.clipboard.writeText(text).then(() => {
        showToast(`Copied ${uuidList.length} UUIDs!`);
      });
    }
    
    function downloadUUIDs() {
      if (uuidList.length === 0) {
        showToast('No UUIDs to download', 'error');
        return;
      }
      
      const text = uuidList.join('\n');
      const blob = new Blob([text], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `uuids-${Date.now()}.txt`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      showToast('UUIDs downloaded!');
    }
    
    function clearUUIDs() {
      uuidList = [];
      displayUUIDs();
      showToast('Cleared all UUIDs');
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
    
    // Display initial empty state
    displayUUIDs();
