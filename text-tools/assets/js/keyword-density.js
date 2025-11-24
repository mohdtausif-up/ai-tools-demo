function calculateDensity() {
      const text = document.getElementById('inputText').value.toLowerCase();
      const keywordsInput = document.getElementById('keywords').value;
      
      if (!text) {
        showToast('Please enter text to analyze', 'error');
        return;
      }
      
      if (!keywordsInput) {
        showToast('Please enter keywords', 'error');
        return;
      }
      
      const keywords = keywordsInput.split(',').map(k => k.trim().toLowerCase()).filter(k => k);
      const totalWords = text.match(/\b\w+\b/g)?.length || 0;
      
      if (totalWords === 0) {
        showToast('No words found in text', 'error');
        return;
      }
      
      const results = [];
      
      keywords.forEach(keyword => {
        // Count occurrences
        const regex = new RegExp('\\b' + keyword + '\\b', 'gi');
        const matches = text.match(regex);
        const count = matches ? matches.length : 0;
        
        // Calculate density percentage
        const density = ((count / totalWords) * 100).toFixed(2);
        
        results.push({ keyword, count, density });
      });
      
      // Sort by density descending
      results.sort((a, b) => b.density - a.density);
      
      // Find max density for scaling bars
      const maxDensity = Math.max(...results.map(r => parseFloat(r.density)));
      
      const resultsHTML = results.map(item => {
        const barWidth = maxDensity > 0 ? (item.density / maxDensity * 100) : 0;
        return `
          <div class="keyword-item">
            <div class="keyword-text">${item.keyword}</div>
            <div class="keyword-stats">
              <span class="stat-badge">×${item.count}</span>
              <span class="stat-badge">${item.density}%</span>
              <div class="density-bar">
                <div class="density-fill" style="width: ${barWidth}%"></div>
              </div>
            </div>
          </div>
        `;
      }).join('');
      
      document.getElementById('resultsList').innerHTML = resultsHTML || '<p>No keywords found in text.</p>';
      document.getElementById('resultsCard').style.display = 'block';
      showToast('Keyword density calculated!');
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
