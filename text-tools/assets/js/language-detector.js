const languagePatterns = {
      'English': { flag: '🇬🇧', chars: /[a-zA-Z]/, common: ['the', 'is', 'and', 'of', 'to'] },
      'Spanish': { flag: '🇪🇸', chars: /[áéíóúñü]/, common: ['el', 'la', 'de', 'que', 'y'] },
      'French': { flag: '🇫🇷', chars: /[àâçéèêëîïôùûü]/, common: ['le', 'de', 'un', 'et', 'à'] },
      'German': { flag: '🇩🇪', chars: /[äöüß]/, common: ['der', 'die', 'und', 'in', 'den'] },
      'Italian': { flag: '🇮🇹', chars: /[àèéìòù]/, common: ['il', 'di', 'e', 'la', 'che'] },
      'Portuguese': { flag: '🇵🇹', chars: /[ãâáàçêéíóôõú]/, common: ['o', 'de', 'a', 'e', 'que'] },
      'Russian': { flag: '🇷🇺', chars: /[а-яА-ЯёЁ]/, common: ['и', 'в', 'не', 'на', 'что'] },
      'Chinese': { flag: '🇨🇳', chars: /[\u4e00-\u9fff]/, common: [] },
      'Japanese': { flag: '🇯🇵', chars: /[\u3040-\u309f\u30a0-\u30ff]/, common: [] },
      'Korean': { flag: '🇰🇷', chars: /[\uac00-\ud7af]/, common: [] },
      'Arabic': { flag: '🇸🇦', chars: /[\u0600-\u06ff]/, common: [] },
      'Hindi': { flag: '🇮🇳', chars: /[\u0900-\u097f]/, common: [] }
    };
    
    function detectLanguage() {
      const text = document.getElementById('inputText').value.toLowerCase();
      
      if (!text) {
        showToast('Please enter text to detect', 'error');
        return;
      }
      
      const scores = {};
      
      // Check character patterns
      for (const [lang, pattern] of Object.entries(languagePatterns)) {
        let score = 0;
        
        // Check for language-specific characters
        const matches = text.match(pattern.chars);
        if (matches) {
          score += matches.length * 10;
        }
        
        // Check for common words
        const words = text.split(/\s+/);
        pattern.common.forEach(commonWord => {
          if (words.includes(commonWord)) {
            score += 5;
          }
        });
        
        scores[lang] = score;
      }
      
      // Find language with highest score
      let detectedLang = 'English'; // Default
      let maxScore = 0;
      
      for (const [lang, score] of Object.entries(scores)) {
        if (score > maxScore) {
          maxScore = score;
          detectedLang = lang;
        }
      }
      
      // Calculate confidence (simple heuristic)
      const totalScore = Object.values(scores).reduce((a, b) => a + b, 0);
      const confidence = totalScore > 0 ? Math.min(Math.round((maxScore / totalScore) * 100), 99) : 50;
      
      // Display results
      document.getElementById('languageFlag').textContent = languagePatterns[detectedLang].flag;
      document.getElementById('languageName').textContent = detectedLang;
      document.getElementById('confidence').textContent = `Confidence: ${confidence}%`;
      document.getElementById('resultsCard').style.display = 'block';
      showToast('Language detected!');
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
