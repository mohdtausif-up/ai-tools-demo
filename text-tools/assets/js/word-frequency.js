const commonWords = new Set([
      'the', 'be', 'to', 'of', 'and', 'a', 'in', 'that', 'have', 'i',
      'it', 'for', 'not', 'on', 'with', 'he', 'as', 'you', 'do', 'at',
      'this', 'but', 'his', 'by', 'from', 'they', 'we', 'say', 'her', 'she',
      'or', 'an', 'will', 'my', 'one', 'all', 'would', 'there', 'their', 'what',
      'so', 'up', 'out', 'if', 'about', 'who', 'get', 'which', 'go', 'me',
      'when', 'make', 'can', 'like', 'time', 'no', 'just', 'him', 'know', 'take',
      'people', 'into', 'year', 'your', 'good', 'some', 'could', 'them', 'see', 'other',
      'than', 'then', 'now', 'look', 'only', 'come', 'its', 'over', 'think', 'also',
      'back', 'after', 'use', 'two', 'how', 'our', 'work', 'first', 'well', 'way',
      'even', 'new', 'want', 'because', 'any', 'these', 'give', 'day', 'most', 'us'
    ]);
    
    function analyzeFrequency() {
      const text = document.getElementById('inputText').value;
      
      if (!text) {
        showToast('Please enter text to analyze', 'error');
        return;
      }
      
      const caseSensitive = document.getElementById('caseSensitive').checked;
      const excludeCommon = document.getElementById('excludeCommon').checked;
      
      // Extract words
      let words = text.match(/\b[\w'-]+\b/g) || [];
      
      if (!caseSensitive) {
        words = words.map(w => w.toLowerCase());
      }
      
      // Count frequencies
      const frequency = {};
      words.forEach(word => {
        if (excludeCommon && commonWords.has(word.toLowerCase())) {
          return;
        }
        frequency[word] = (frequency[word] || 0) + 1;
      });
      
      // Sort by frequency
      const sorted = Object.entries(frequency)
        .sort((a, b) => b[1] - a[1]);
      
      // Display results
      displayResults(sorted, words.length);
      showToast('Analysis complete!');
    }
    
    function displayResults(sorted, totalWords) {
      const uniqueWords = sorted.length;
      const mostCommon = sorted.length > 0 ? `"${sorted[0][0]}" (${sorted[0][1]}×)` : '-';
      const maxCount = sorted.length > 0 ? sorted[0][1] : 1;
      
      document.getElementById('totalWords').textContent = totalWords.toLocaleString();
      document.getElementById('uniqueWords').textContent = uniqueWords.toLocaleString();
      document.getElementById('mostCommon').textContent = mostCommon;
      document.getElementById('statsBox').style.display = 'block';
      
      const list = document.getElementById('frequencyList');
      list.innerHTML = sorted.slice(0, 50).map(([word, count]) => `
        <div class="frequency-item">
          <span class="word-text">${word}</span>
          <div class="frequency-bar-container">
            <div class="frequency-bar" style="width: ${(count / maxCount) * 100}%"></div>
          </div>
          <span class="count-badge">${count}×</span>
        </div>
      `).join('');
      
      if (sorted.length === 0) {
        list.innerHTML = '<p style="text-align: center; color: #94a3b8; padding: 40px;">No words found</p>';
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
