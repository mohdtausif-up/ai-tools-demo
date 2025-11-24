function checkPlagiarism() {
      const text = document.getElementById('textInput').value.trim();
      
      if (!text) {
        showToast('Please enter text to check', 'error');
        return;
      }
      
      if (text.split(/\s+/).length < 20) {
        showToast('Text is too short (minimum 20 words)', 'error');
        return;
      }
      
      const detections = [];
      
      // Check for common plagiarism indicators
      const sentences = text.match(/[^.!?]+[.!?]+/g) || [];
      
      // Pattern 1: Repeated phrases
      const phrases = extractPhrases(text, 5);
      const phraseCount = {};
      phrases.forEach(p => {
        phraseCount[p] = (phraseCount[p] || 0) + 1;
      });
      Object.entries(phraseCount).forEach(([phrase, count]) => {
        if (count > 1) {
          detections.push({
            type: 'Repeated Phrase',
            text: phrase,
            severity: 'medium'
          });
        }
      });
      
      // Pattern 2: Unusual vocabulary density
      const words = text.toLowerCase().split(/\s+/);
      const uniqueWords = new Set(words);
      const uniqueRatio = uniqueWords.size / words.length;
      
      if (uniqueRatio < 0.4) {
        detections.push({
          type: 'Low Vocabulary Diversity',
          text: `Only ${Math.round(uniqueRatio * 100)}% unique words`,
          severity: 'low'
        });
      }
      
      // Pattern 3: Check for copied academic phrases
      const academicPhrases = [
        'according to the research',
        'studies have shown',
        'it is well established',
        'previous research indicates',
        'in conclusion it can be said'
      ];
      
      academicPhrases.forEach(phrase => {
        if (text.toLowerCase().includes(phrase)) {
          detections.push({
            type: 'Common Academic Phrase',
            text: phrase,
            severity: 'low'
          });
        }
      });
      
      // Calculate originality score
      const maxDetections = 10;
      const detectionPenalty = Math.min(detections.length / maxDetections, 1);
      const originalityScore = Math.round((1 - detectionPenalty) * 100);
      
      displayResults(originalityScore, detections);
      showToast('Plagiarism check complete!');
    }
    
    function extractPhrases(text, wordCount) {
      const words = text.toLowerCase().split(/\s+/);
      const phrases = [];
      for (let i = 0; i <= words.length - wordCount; i++) {
        phrases.push(words.slice(i, i + wordCount).join(' '));
      }
      return phrases;
    }
    
    function displayResults(score, detections) {
      const resultsCard = document.getElementById('resultsCard');
      const scoreCircle = document.getElementById('scoreCircle');
      const scoreLabel = document.getElementById('scoreLabel');
      const container = document.getElementById('detectionsContainer');
      
      resultsCard.style.display = 'block';
      
      scoreCircle.textContent = score + '%';
      
      if (score >= 80) {
        scoreCircle.style.background = '#10b981';
        scoreLabel.textContent = 'High Originality';
      } else if (score >= 60) {
        scoreCircle.style.background = '#f59e0b';
        scoreLabel.textContent = 'Moderate Originality';
      } else {
        scoreCircle.style.background = '#ef4444';
        scoreLabel.textContent = 'Low Originality';
      }
      
      if (detections.length === 0) {
        container.innerHTML = '<p style="color: #10b981; font-weight: 600; text-align: center;">✓ No plagiarism indicators detected</p>';
      } else {
        container.innerHTML = '<h3 style="font-size: 16px; margin-bottom: 15px; color: #1e293b;">Potential Issues:</h3>' +
          detections.map(d => `
            <div class="detection-item">
              <strong>${d.type}</strong><br>
              <span class="detection-text">${d.text}</span>
            </div>
          `).join('');
      }
      
      resultsCard.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
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
