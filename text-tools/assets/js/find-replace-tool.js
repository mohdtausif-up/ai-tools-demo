const replacements = [];
    
    function addReplacement() {
      const find = document.getElementById('findInput').value;
      const replace = document.getElementById('replaceInput').value;
      
      if (!find) {
        showToast('Please enter text to find', 'error');
        return;
      }
      
      replacements.push({ find, replace });
      updateReplacementList();
      
      document.getElementById('findInput').value = '';
      document.getElementById('replaceInput').value = '';
      showToast('Replacement added');
    }
    
    function removeReplacement(index) {
      replacements.splice(index, 1);
      updateReplacementList();
      showToast('Replacement removed');
    }
    
    function updateReplacementList() {
      const list = document.getElementById('replacementList');
      
      if (replacements.length === 0) {
        list.innerHTML = '<p style="color: #94a3b8; text-align: center; padding: 20px;">No replacements added yet</p>';
        return;
      }
      
      list.innerHTML = replacements.map((r, i) => `
        <div class="replacement-item">
          <span>"${r.find}" → "${r.replace}"</span>
          <button class="remove-btn" onclick="removeReplacement(${i})">Remove</button>
        </div>
      `).join('');
    }
    
    function performReplacements() {
      let text = document.getElementById('originalText').value;
      
      if (!text) {
        showToast('Please enter text', 'error');
        return;
      }
      
      if (replacements.length === 0) {
        showToast('Please add at least one replacement', 'error');
        return;
      }
      
      const caseSensitive = document.getElementById('caseSensitive').checked;
      const wholeWords = document.getElementById('wholeWords').checked;
      const useRegex = document.getElementById('useRegex').checked;
      
      let totalReplacements = 0;
      
      replacements.forEach(r => {
        const find = r.find;
        const replace = r.replace;
        
        try {
          let pattern;
          if (useRegex) {
            pattern = new RegExp(find, caseSensitive ? 'g' : 'gi');
          } else {
            const escaped = find.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
            const wordBoundary = wholeWords ? '\\b' : '';
            pattern = new RegExp(wordBoundary + escaped + wordBoundary, caseSensitive ? 'g' : 'gi');
          }
          
          const matches = text.match(pattern);
          if (matches) totalReplacements += matches.length;
          
          text = text.replace(pattern, replace);
        } catch (e) {
          showToast(`Invalid regex: ${find}`, 'error');
        }
      });
      
      document.getElementById('resultText').value = text;
      showToast(`Made ${totalReplacements} replacement(s)`);
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
    
    updateReplacementList();
