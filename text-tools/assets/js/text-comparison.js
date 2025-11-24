function compareTexts() {
      const text1 = document.getElementById('text1').value;
      const text2 = document.getElementById('text2').value;
      
      if (!text1 && !text2) {
        showToast('Please enter texts to compare', 'error');
        return;
      }
      
      const words1 = text1.split(/\s+/).filter(w => w);
      const words2 = text2.split(/\s+/).filter(w => w);
      
      const diff = computeDiff(words1, words2);
      displayDiff(diff);
      showToast('Texts compared!');
    }
    
    function computeDiff(words1, words2) {
      const m = words1.length;
      const n = words2.length;
      const dp = Array(m + 1).fill(null).map(() => Array(n + 1).fill(0));
      
      // Compute LCS length
      for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
          if (words1[i - 1] === words2[j - 1]) {
            dp[i][j] = dp[i - 1][j - 1] + 1;
          } else {
            dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
          }
        }
      }
      
      // Backtrack to find diff
      const diff = [];
      let i = m, j = n;
      
      while (i > 0 || j > 0) {
        if (i > 0 && j > 0 && words1[i - 1] === words2[j - 1]) {
          diff.unshift({ type: 'unchanged', word: words1[i - 1] });
          i--;
          j--;
        } else if (j > 0 && (i === 0 || dp[i][j - 1] >= dp[i - 1][j])) {
          diff.unshift({ type: 'added', word: words2[j - 1] });
          j--;
        } else if (i > 0) {
          diff.unshift({ type: 'removed', word: words1[i - 1] });
          i--;
        }
      }
      
      return diff;
    }
    
    function displayDiff(diff) {
      let addedCount = 0;
      let removedCount = 0;
      let unchangedCount = 0;
      
      const html = diff.map(item => {
        if (item.type === 'added') {
          addedCount++;
          return `<span class="added">+${item.word}</span>`;
        } else if (item.type === 'removed') {
          removedCount++;
          return `<span class="removed">-${item.word}</span>`;
        } else {
          unchangedCount++;
          return `<span class="unchanged">${item.word}</span>`;
        }
      }).join(' ');
      
      const total = addedCount + removedCount + unchangedCount;
      const matchPercent = total > 0 ? Math.round((unchangedCount / total) * 100) : 0;
      
      document.getElementById('addedCount').textContent = addedCount;
      document.getElementById('removedCount').textContent = removedCount;
      document.getElementById('matchPercent').textContent = matchPercent + '%';
      document.getElementById('diffResult').innerHTML = html;
      document.getElementById('resultsCard').style.display = 'block';
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
