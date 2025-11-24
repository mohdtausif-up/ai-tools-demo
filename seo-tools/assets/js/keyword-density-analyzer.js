function analyzeKeywords() {
      const content = document.getElementById('contentInput').value.trim();
      
      if (!content) {
        return;
      }

      // Basic stats
      const words = content.toLowerCase()
        .replace(/[^\w\s]/g, ' ')
        .split(/\s+/)
        .filter(word => word.length > 2); // Filter out words less than 3 characters
      
      const totalWords = words.length;
      const charCount = content.length;
      
      // Count word frequency
      const wordFreq = {};
      words.forEach(word => {
        wordFreq[word] = (wordFreq[word] || 0) + 1;
      });
      
      const uniqueWords = Object.keys(wordFreq).length;
      
      // Sort by frequency
      const sorted = Object.entries(wordFreq)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 20); // Top 20 keywords
      
      // Update stats
      document.getElementById('wordCount').textContent = totalWords;
      document.getElementById('uniqueWords').textContent = uniqueWords;
      document.getElementById('charCount').textContent = charCount;
      
      // Display keywords
      const keywordList = document.getElementById('keywordList');
      keywordList.innerHTML = sorted.map(([word, count]) => {
        const density = ((count / totalWords) * 100).toFixed(2);
        return `
          <div class="keyword-item">
            <div>
              <div class="keyword-word">${word}</div>
              <div class="density-bar">
                <div class="density-fill" style="width: ${Math.min(density * 10, 100)}%"></div>
              </div>
            </div>
            <div class="keyword-stats">
              <span>${count}×</span>
              <span>${density}%</span>
            </div>
          </div>
        `;
      }).join('');
    }

    // Auto-analyze on load
    window.addEventListener('load', () => {
      analyzeKeywords();
    });
