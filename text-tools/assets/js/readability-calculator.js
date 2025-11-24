function countSyllables(word) {
      word = word.toLowerCase();
      if (word.length <= 3) return 1;
      
      word = word.replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, '');
      word = word.replace(/^y/, '');
      const syllables = word.match(/[aeiouy]{1,2}/g);
      return syllables ? syllables.length : 1;
    }
    
    function calculateReadability() {
      const text = document.getElementById('inputText').value;
      
      if (!text) {
        showToast('Please enter text to analyze', 'error');
        return;
      }
      
      // Count sentences
      const sentences = text.match(/[^.!?]+[.!?]+/g) || [];
      const sentenceCount = sentences.length || 1;
      
      // Count words
      const words = text.match(/\b\w+\b/g) || [];
      const wordCount = words.length;
      
      if (wordCount === 0) {
        showToast('No words found', 'error');
        return;
      }
      
      // Count syllables
      let totalSyllables = 0;
      let complexWords = 0; // 3+ syllables
      
      words.forEach(word => {
        const syllables = countSyllables(word);
        totalSyllables += syllables;
        if (syllables >= 3) complexWords++;
      });
      
      // Calculate metrics
      const avgWordsPerSentence = wordCount / sentenceCount;
      const avgSyllablesPerWord = totalSyllables / wordCount;
      
      // Flesch Reading Ease (0-100, higher = easier)
      const fleschScore = 206.835 - 1.015 * avgWordsPerSentence - 84.6 * avgSyllablesPerWord;
      
      // Flesch-Kincaid Grade Level
      const gradeScore = 0.39 * avgWordsPerSentence + 11.8 * avgSyllablesPerWord - 15.59;
      
      // Gunning Fog Index
      const complexWordPercentage = (complexWords / wordCount) * 100;
      const fogScore = 0.4 * (avgWordsPerSentence + complexWordPercentage);
      
      // SMOG Index
      const smogScore = 1.0430 * Math.sqrt(complexWords * (30 / sentenceCount)) + 3.1291;
      
      // Display results
      document.getElementById('fleschScore').textContent = Math.round(fleschScore);
      document.getElementById('gradeScore').textContent = Math.round(gradeScore * 10) / 10;
      document.getElementById('fogScore').textContent = Math.round(fogScore * 10) / 10;
      document.getElementById('smogScore').textContent = Math.round(smogScore * 10) / 10;
      
      // Descriptions
      if (fleschScore >= 90) {
        document.getElementById('fleschDesc').textContent = 'Very Easy';
      } else if (fleschScore >= 80) {
        document.getElementById('fleschDesc').textContent = 'Easy';
      } else if (fleschScore >= 70) {
        document.getElementById('fleschDesc').textContent = 'Fairly Easy';
      } else if (fleschScore >= 60) {
        document.getElementById('fleschDesc').textContent = 'Standard';
      } else if (fleschScore >= 50) {
        document.getElementById('fleschDesc').textContent = 'Fairly Difficult';
      } else if (fleschScore >= 30) {
        document.getElementById('fleschDesc').textContent = 'Difficult';
      } else {
        document.getElementById('fleschDesc').textContent = 'Very Difficult';
      }
      
      document.getElementById('gradeDesc').textContent = `Grade ${Math.round(gradeScore)} level`;
      document.getElementById('fogDesc').textContent = `Grade ${Math.round(fogScore)} level`;
      document.getElementById('smogDesc').textContent = `Grade ${Math.round(smogScore)} level`;
      
      document.getElementById('resultsCard').style.display = 'block';
      showToast('Readability calculated!');
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
