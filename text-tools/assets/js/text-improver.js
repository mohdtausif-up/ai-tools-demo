function improveText() {
      const text = document.getElementById('textInput').value.trim();
      
      if (!text) {
        showToast('Please enter text to analyze', 'error');
        return;
      }
      
      const suggestions = [];
      
      // Check 1: Sentence length
      const sentences = text.match(/[^.!?]+[.!?]+/g) || [];
      sentences.forEach((s, i) => {
        const words = s.trim().split(/\s+/).length;
        if (words > 40) {
          suggestions.push({
            type: 'Long Sentence',
            text: `Sentence ${i + 1} has ${words} words`,
            fix: 'Consider breaking into shorter sentences for better readability'
          });
        }
      });
      
      // Check 2: Passive voice
      const passivePatterns = [
        /\b(is|are|was|were|been|be)\s+\w+ed\b/gi,
        /\b(is|are|was|were|been|be)\s+being\s+\w+ed\b/gi
      ];
      passivePatterns.forEach(pattern => {
        const matches = text.match(pattern);
        if (matches && matches.length > 2) {
          suggestions.push({
            type: 'Passive Voice',
            text: `Found ${matches.length} passive voice instances`,
            fix: 'Use active voice for more direct, engaging writing'
          });
        }
      });
      
      // Check 3: Weak words
      const weakWords = ['very', 'really', 'quite', 'just', 'actually', 'basically'];
      weakWords.forEach(word => {
        const regex = new RegExp('\\b' + word + '\\b', 'gi');
        const matches = text.match(regex);
        if (matches && matches.length > 0) {
          suggestions.push({
            type: 'Weak Word',
            text: `"${word}" appears ${matches.length} time(s)`,
            fix: 'Remove or replace with stronger alternatives'
          });
        }
      });
      
      // Check 4: Repeated words
      const words = text.toLowerCase().split(/\s+/);
      const wordCount = {};
      words.forEach(w => {
        if (w.length > 5) {
          wordCount[w] = (wordCount[w] || 0) + 1;
        }
      });
      Object.entries(wordCount).forEach(([word, count]) => {
        if (count > 5) {
          suggestions.push({
            type: 'Repetition',
            text: `"${word}" repeated ${count} times`,
            fix: 'Use synonyms to add variety'
          });
        }
      });
      
      // Check 5: Paragraph length
      const paragraphs = text.split(/\n\n+/);
      paragraphs.forEach((p, i) => {
        const words = p.trim().split(/\s+/).length;
        if (words > 150) {
          suggestions.push({
            type: 'Long Paragraph',
            text: `Paragraph ${i + 1} has ${words} words`,
            fix: 'Break into smaller paragraphs for better flow'
          });
        }
      });
      
      displaySuggestions(suggestions);
      showToast(`Found ${suggestions.length} suggestion(s)`);
    }
    
    function displaySuggestions(suggestions) {
      const resultsCard = document.getElementById('resultsCard');
      const container = document.getElementById('suggestionsContainer');
      
      resultsCard.style.display = 'block';
      
      if (suggestions.length === 0) {
        container.innerHTML = '<p style="color: #10b981; font-weight: 600;">✓ Your text looks great! No major issues found.</p>';
      } else {
        container.innerHTML = suggestions.map(s => `
          <div class="suggestion-item">
            <div class="suggestion-type">${s.type}</div>
            <div class="suggestion-text">${s.text}</div>
            <div class="suggestion-fix">💡 ${s.fix}</div>
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
