function sortLines(mode) {
      let text = document.getElementById('inputText').value;
      
      if (!text) {
        showToast('Please enter lines to sort', 'error');
        return;
      }
      
      const caseSensitive = document.getElementById('caseSensitive').checked;
      const removeEmpty = document.getElementById('removeEmpty').checked;
      
      let lines = text.split('\n');
      
      if (removeEmpty) {
        lines = lines.filter(line => line.trim());
      }
      
      switch(mode) {
        case 'alphabetical':
          lines.sort((a, b) => {
            const aVal = caseSensitive ? a : a.toLowerCase();
            const bVal = caseSensitive ? b : b.toLowerCase();
            return aVal.localeCompare(bVal);
          });
          break;
        
        case 'reverse':
          lines.sort((a, b) => {
            const aVal = caseSensitive ? a : a.toLowerCase();
            const bVal = caseSensitive ? b : b.toLowerCase();
            return bVal.localeCompare(aVal);
          });
          break;
        
        case 'length':
          lines.sort((a, b) => a.length - b.length);
          break;
        
        case 'random':
          for (let i = lines.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [lines[i], lines[j]] = [lines[j], lines[i]];
          }
          break;
        
        case 'numerical':
          lines.sort((a, b) => {
            const numA = parseFloat(a);
            const numB = parseFloat(b);
            if (isNaN(numA) && isNaN(numB)) return 0;
            if (isNaN(numA)) return 1;
            if (isNaN(numB)) return -1;
            return numA - numB;
          });
          break;
      }
      
      document.getElementById('resultText').value = lines.join('\n');
      showToast(`Sorted by ${mode}!`);
    }
    
    function removeDuplicates() {
      let text = document.getElementById('inputText').value;
      
      if (!text) {
        showToast('Please enter lines', 'error');
        return;
      }
      
      const caseSensitive = document.getElementById('caseSensitive').checked;
      const removeEmpty = document.getElementById('removeEmpty').checked;
      
      let lines = text.split('\n');
      
      if (removeEmpty) {
        lines = lines.filter(line => line.trim());
      }
      
      const seen = new Set();
      const unique = [];
      
      lines.forEach(line => {
        const key = caseSensitive ? line : line.toLowerCase();
        if (!seen.has(key)) {
          seen.add(key);
          unique.push(line);
        }
      });
      
      const removed = lines.length - unique.length;
      document.getElementById('resultText').value = unique.join('\n');
      showToast(`Removed ${removed} duplicate(s)`);
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
