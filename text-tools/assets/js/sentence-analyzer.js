function analyzeSentences() {
      const text = document.getElementById('inputText').value;
      
      if (!text) {
        showToast('Please enter text to analyze', 'error');
        return;
      }
      
      // Split into sentences
      const sentences = text.match(/[^.!?]+[.!?]+/g) || [];
      
      if (sentences.length === 0) {
        showToast('No sentences found', 'error');
        return;
      }
      
      // Analyze each sentence
      let totalWords = 0;
      let totalChars = 0;
      let shortestLength = Infinity;
      let longestLength = 0;
      let questionCount = 0;
      let exclamationCount = 0;
      let complexCount = 0;
      
      sentences.forEach(sentence => {
        const words = sentence.trim().split(/\s+/).filter(w => w.length > 0);
        const wordCount = words.length;
        const charCount = sentence.trim().length;
        
        totalWords += wordCount;
        totalChars += charCount;
        
        if (wordCount < shortestLength) shortestLength = wordCount;
        if (wordCount > longestLength) longestLength = wordCount;
        
        if (sentence.includes('?')) questionCount++;
        if (sentence.includes('!')) exclamationCount++;
        if (wordCount > 25) complexCount++;
      });
      
      const avgWords = (totalWords / sentences.length).toFixed(1);
      const avgChars = Math.round(totalChars / sentences.length);
      
      // Determine complexity
      let complexity = 'Simple';
      let complexityColor = '#10b981';
      
      if (avgWords > 20) {
        complexity = 'Complex';
        complexityColor = '#ef4444';
      } else if (avgWords > 15) {
        complexity = 'Moderate';
        complexityColor = '#f59e0b';
      }
      
      // Display results
      document.getElementById('sentenceCount').textContent = sentences.length;
      document.getElementById('avgWords').textContent = avgWords;
      document.getElementById('avgChars').textContent = avgChars;
      document.getElementById('shortestLength').textContent = shortestLength + ' words';
      document.getElementById('longestLength').textContent = longestLength + ' words';
      document.getElementById('questionCount').textContent = questionCount;
      document.getElementById('exclamationCount').textContent = exclamationCount;
      document.getElementById('complexCount').textContent = complexCount;
      
      const badge = document.getElementById('complexityBadge');
      badge.innerHTML = `<span class="complexity-badge" style="background: ${complexityColor}; color: white;">${complexity}</span>`;
      
      document.getElementById('resultsCard').style.display = 'block';
      showToast('Sentence analysis complete!');
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
