function analyzeCharacters() {
      const text = document.getElementById('inputText').value;
      
      if (!text) {
        showToast('Please enter text to analyze', 'error');
        return;
      }
      
      const caseSensitive = document.getElementById('caseSensitive').checked;
      const includeSpaces = document.getElementById('includeSpaces').checked;
      const includeSpecial = document.getElementById('includeSpecial').checked;
      
      let chars = text.split('');
      
      if (!caseSensitive) {
        chars = chars.map(c => c.toLowerCase());
      }
      
      // Filter characters
      chars = chars.filter(c => {
        if (!includeSpaces && c === ' ') return false;
        if (!includeSpecial && /[^a-zA-Z0-9 ]/.test(c)) return false;
        return true;
      });
      
      // Count frequencies
      const frequency = {};
      chars.forEach(char => {
        frequency[char] = (frequency[char] || 0) + 1;
      });
      
      // Sort by frequency
      const sorted = Object.entries(frequency)
        .sort((a, b) => b[1] - a[1]);
      
      // Display results
      displayResults(sorted, chars.length);
      showToast('Analysis complete!');
    }
    
    function displayResults(sorted, totalChars) {
      const uniqueChars = sorted.length;
      const mostCommon = sorted.length > 0 
        ? `'${sorted[0][0] === ' ' ? '␣' : sorted[0][0]}' (${sorted[0][1]}×)` 
        : '-';
      const maxCount = sorted.length > 0 ? sorted[0][1] : 1;
      
      document.getElementById('totalChars').textContent = totalChars.toLocaleString();
      document.getElementById('uniqueChars').textContent = uniqueChars.toLocaleString();
      document.getElementById('mostCommon').textContent = mostCommon;
      
      const list = document.getElementById('frequencyList');
      list.innerHTML = sorted.map(([char, count]) => {
        const displayChar = char === ' ' ? '␣' : char === '\n' ? '↵' : char === '\t' ? '⇥' : char;
        return `
          <div class="frequency-item">
            <div class="char-display">${displayChar}</div>
            <div class="char-bar-container">
              <div class="char-bar" style="width: ${(count / maxCount) * 100}%"></div>
            </div>
            <div class="char-count">${count}× (${((count/totalChars)*100).toFixed(1)}%)</div>
          </div>
        `;
      }).join('');
      
      if (sorted.length === 0) {
        list.innerHTML = '<p style="text-align: center; color: #94a3b8; padding: 40px;">No characters found</p>';
      }
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
