function analyzeReadability() {
      const text = document.getElementById('textInput').value.trim();
      
      if (!text) {
        return;
      }

      // Count sentences (simplified)
      const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0).length;
      
      // Count words
      const words = text.split(/\s+/).filter(w => w.length > 0).length;
      
      // Count syllables (simplified approximation)
      const syllables = countSyllables(text);
      
      // Calculate scores
      const fleschReading = calculateFleschReading(sentences, words, syllables);
      const fleschKincaid = calculateFleschKincaid(sentences, words, syllables);
      const gunningFog = calculateGunningFog(sentences, words, text);
      
      displayScores(fleschReading, fleschKincaid, gunningFog, sentences, words);
    }

    function countSyllables(text) {
      const words = text.toLowerCase().split(/\s+/);
      let count = 0;
      
      words.forEach(word => {
        word = word.replace(/[^a-z]/g, '');
        if (word.length <= 3) {
          count += 1;
        } else {
          const vowels = word.match(/[aeiouy]+/g);
          count += vowels ? vowels.length : 1;
        }
      });
      
      return count;
    }

    function calculateFleschReading(sentences, words, syllables) {
      if (sentences === 0 || words === 0) return 0;
      return 206.835 - 1.015 * (words / sentences) - 84.6 * (syllables / words);
    }

    function calculateFleschKincaid(sentences, words, syllables) {
      if (sentences === 0 || words === 0) return 0;
      return 0.39 * (words / sentences) + 11.8 * (syllables / words) - 15.59;
    }

    function calculateGunningFog(sentences, words, text) {
      if (sentences === 0 || words === 0) return 0;
      const wordArray = text.split(/\s+/);
      const complexWords = wordArray.filter(w => w.length > 6).length;
      return 0.4 * ((words / sentences) + 100 * (complexWords / words));
    }

    function displayScores(flesch, kincaid, gunning, sentences, words) {
      const container = document.getElementById('scoresContainer');
      
      let fleschClass = 'excellent';
      let fleschDesc = 'Very easy to read';
      if (flesch < 30) {
        fleschClass = 'poor';
        fleschDesc = 'Very difficult to read';
      } else if (flesch < 50) {
        fleschClass = 'fair';
        fleschDesc = 'Difficult to read';
      } else if (flesch < 70) {
        fleschClass = 'good';
        fleschDesc = 'Fairly easy to read';
      }
      
      let kincaidClass = kincaid <= 6 ? 'excellent' : kincaid <= 9 ? 'good' : kincaid <= 12 ? 'fair' : 'poor';
      
      container.innerHTML = `
        <div class="score-card ${fleschClass}">
          <div class="score-title">Flesch Reading Ease</div>
          <div class="score-value">${flesch.toFixed(1)}</div>
          <div class="score-description">${fleschDesc}</div>
        </div>
        
        <div class="score-card ${kincaidClass}">
          <div class="score-title">Flesch-Kincaid Grade Level</div>
          <div class="score-value">${kincaid.toFixed(1)}</div>
          <div class="score-description">Grade ${Math.round(kincaid)} reading level</div>
        </div>
        
        <div class="score-card">
          <div class="score-title">Gunning Fog Index</div>
          <div class="score-value">${gunning.toFixed(1)}</div>
          <div class="score-description">Years of education needed</div>
        </div>
        
        <div class="score-card">
          <div class="score-title">Text Statistics</div>
          <div style="font-size: 14px; color: #64748b;">
            <div>Sentences: ${sentences}</div>
            <div>Words: ${words}</div>
            <div>Avg words/sentence: ${(words/sentences).toFixed(1)}</div>
          </div>
        </div>
      `;
    }

    // Auto-analyze on load
    window.addEventListener('load', () => {
      analyzeReadability();
    });
