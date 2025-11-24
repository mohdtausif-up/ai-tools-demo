function countSyllables(word) {
      word = word.toLowerCase().trim();
      if (word.length <= 3) return 1;
      
      // Remove silent 'e' at the end
      word = word.replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, '');
      
      // Remove 'y' at the start
      word = word.replace(/^y/, '');
      
      // Count vowel groups
      const syllables = word.match(/[aeiouy]{1,2}/g);
      return syllables ? syllables.length : 1;
    }
    
    function countAllSyllables() {
      const text = document.getElementById('inputText').value;
      
      if (!text) {
        showToast('Please enter text to analyze', 'error');
        return;
      }
      
      const words = text.match(/\b[a-z]+\b/gi) || [];
      
      if (words.length === 0) {
        showToast('No words found', 'error');
        return;
      }
      
      let totalSyllables = 0;
      const wordData = [];
      
      words.forEach(word => {
        const syllableCount = countSyllables(word);
        totalSyllables += syllableCount;
        
        // Store unique words
        const existing = wordData.find(w => w.word.toLowerCase() === word.toLowerCase());
        if (!existing) {
          wordData.push({ word, syllables: syllableCount });
        }
      });
      
      // Sort by syllable count descending
      wordData.sort((a, b) => b.syllables - a.syllables);
      
      const avgSyllables = (totalSyllables / words.length).toFixed(2);
      
      // Display results
      document.getElementById('totalSyllables').textContent = totalSyllables;
      document.getElementById('totalWords').textContent = words.length;
      document.getElementById('avgSyllables').textContent = avgSyllables;
      
      const wordListHTML = wordData.map(item => `
        <div class="word-item">
          <span class="word-text">${item.word}</span>
          <span class="syllable-count">${item.syllables} ${item.syllables === 1 ? 'syllable' : 'syllables'}</span>
        </div>
      `).join('');
      
      document.getElementById('wordList').innerHTML = wordListHTML;
      document.getElementById('resultsCard').style.display = 'block';
      showToast('Syllables counted!');
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
