function removeDuplicates() {
      const text = document.getElementById('inputText').value;
      
      if (!text) {
        showToast('Please enter text', 'error');
        return;
      }
      
      const caseSensitive = document.getElementById('caseSensitive').checked;
      const trimLines = document.getElementById('trimLines').checked;
      const removeEmpty = document.getElementById('removeEmpty').checked;
      
      let lines = text.split('\n');
      const originalCount = lines.length;
      
      // Process lines
      if (trimLines) {
        lines = lines.map(line => line.trim());
      }
      
      if (removeEmpty) {
        lines = lines.filter(line => line.length > 0);
      }
      
      // Remove duplicates while preserving order
      const seen = new Set();
      const unique = [];
      
      lines.forEach(line => {
        const key = caseSensitive ? line : line.toLowerCase();
        if (!seen.has(key)) {
          seen.add(key);
          unique.push(line);
        }
      });
      
      // Display results
      document.getElementById('resultText').value = unique.join('\n');
      
      // Update stats
      const uniqueCount = unique.length;
      const duplicateCount = originalCount - uniqueCount;
      const reduction = originalCount > 0 
        ? ((duplicateCount / originalCount) * 100).toFixed(1)
        : 0;
      
      document.getElementById('originalCount').textContent = originalCount;
      document.getElementById('uniqueCount').textContent = uniqueCount;
      document.getElementById('duplicateCount').textContent = duplicateCount;
      document.getElementById('reductionPercent').textContent = reduction + '%';
      document.getElementById('statsBox').style.display = 'block';
      
      showToast(`Removed ${duplicateCount} duplicate line(s)`);
    }
    
    function copyResult() {
      const text = document.getElementById('resultText').value;
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
