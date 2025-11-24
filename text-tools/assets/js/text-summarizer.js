function summarizeText() {
      const text = document.getElementById('originalText').value.trim();
      const length = document.getElementById('lengthSelect').value;
      
      if (!text) {
        showToast('Please enter text to summarize', 'error');
        return;
      }
      
      if (text.split(/\s+/).length < 50) {
        showToast('Text is too short to summarize', 'error');
        return;
      }
      
      const summary = generateSummary(text, length);
      displaySummary(summary, text);
      showToast('Summary generated!');
    }
    
    function generateSummary(text, length) {
      // Split into sentences
      const sentences = text.match(/[^.!?]+[.!?]+/g) || [];
      
      if (sentences.length === 0) return { sentences: [], keyPoints: [] };
      
      // Score sentences based on:
      // 1. Position (first and last sentences often important)
      // 2. Length (moderate length preferred)
      // 3. Keywords frequency
      
      const words = text.toLowerCase().split(/\s+/);
      const wordFreq = {};
      words.forEach(word => {
        if (word.length > 4) {
          wordFreq[word] = (wordFreq[word] || 0) + 1;
        }
      });
      
      const scoredSentences = sentences.map((sentence, index) => {
        let score = 0;
        
        // Position score
        if (index === 0 || index === sentences.length - 1) score += 3;
        if (index < 3) score += 2;
        
        // Length score (prefer 10-30 words)
        const wordCount = sentence.split(/\s+/).length;
        if (wordCount >= 10 && wordCount <= 30) score += 2;
        
        // Keyword score
        const sentenceWords = sentence.toLowerCase().split(/\s+/);
        sentenceWords.forEach(word => {
          if (wordFreq[word] && wordFreq[word] > 2) score += 1;
        });
        
        return { sentence: sentence.trim(), score, index };
      });
      
      // Sort by score and select top N
      const summaryLength = length === 'short' ? 3 : length === 'medium' ? 5 : 7;
      const topSentences = scoredSentences
        .sort((a, b) => b.score - a.score)
        .slice(0, Math.min(summaryLength, sentences.length))
        .sort((a, b) => a.index - b.index);
      
      // Generate key points (most frequent important words)
      const sortedWords = Object.entries(wordFreq)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5)
        .map(([word]) => word);
      
      return {
        sentences: topSentences.map(s => s.sentence),
        keyPoints: sortedWords
      };
    }
    
    function displaySummary(summary, originalText) {
      const originalWords = originalText.split(/\s+/).length;
      const summaryWords = summary.sentences.join(' ').split(/\s+/).length;
      const reduction = Math.round((1 - summaryWords / originalWords) * 100);
      
      const output = `
        <div class="summary-section">
          <div class="summary-heading">Summary</div>
          <div class="summary-text">${summary.sentences.join(' ')}</div>
        </div>
        
        <div class="summary-section">
          <div class="summary-heading">Key Points</div>
          <ul class="bullet-list">
            ${summary.keyPoints.map(point => `<li>${point}</li>`).join('')}
          </ul>
        </div>
        
        <div class="stats-box">
          <div class="stat-row">
            <span>Original Words:</span>
            <strong>${originalWords}</strong>
          </div>
          <div class="stat-row">
            <span>Summary Words:</span>
            <strong>${summaryWords}</strong>
          </div>
          <div class="stat-row">
            <span>Reduction:</span>
            <strong>${reduction}%</strong>
          </div>
        </div>
      `;
      
      document.getElementById('summaryOutput').innerHTML = output;
    }
    
    function copySummary() {
      const summaryText = document.getElementById('summaryOutput').innerText;
      if (summaryText.includes('Enter text')) {
        showToast('No summary to copy', 'error');
        return;
      }
      navigator.clipboard.writeText(summaryText).then(() => {
        showToast('Summary copied!');
      });
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
