const textInput = document.getElementById('textInput');
    
    textInput.addEventListener('input', updateStats);
    
    function updateStats() {
      const text = textInput.value;
      const words = text.trim() ? text.trim().split(/\s+/).length : 0;
      const chars = text.length;
      const sentences = text.split(/[.!?]+/).filter(s => s.trim()).length;
      
      document.getElementById('wordCount').textContent = words;
      document.getElementById('charCount').textContent = chars;
      document.getElementById('sentenceCount').textContent = sentences;
    }
    
    function checkGrammar() {
      const text = textInput.value.trim();
      
      if (!text) {
        showToast('Please enter some text', 'error');
        return;
      }
      
      // Basic pattern-based grammar checking
      const errors = [];
      
      // Common grammar mistakes
      const patterns = [
        { regex: /\b(there|their|they're)\b/gi, type: 'Common Confusion', check: checkThereTheirTheyre },
        { regex: /\b(your|you're)\b/gi, type: 'Common Confusion', check: checkYourYoure },
        { regex: /\b(its|it's)\b/gi, type: 'Common Confusion', check: checkItsIts },
        { regex: /\b(then|than)\b/gi, type: 'Common Confusion', check: checkThenThan },
        { regex: /\b(affect|effect)\b/gi, type: 'Common Confusion', check: checkAffectEffect },
        { regex: /\b(a)\s+([aeiou])/gi, type: 'Article Error', msg: 'Use "an" before vowel sounds' },
        { regex: /\b(an)\s+([^aeiou])/gi, type: 'Article Error', msg: 'Use "a" before consonant sounds' },
        { regex: /([.!?])\s*([a-z])/g, type: 'Capitalization', msg: 'Sentence should start with capital letter' },
        { regex: /\s{2,}/g, type: 'Spacing', msg: 'Multiple spaces detected' },
        { regex: /[.!?]{2,}/g, type: 'Punctuation', msg: 'Multiple punctuation marks' },
        { regex: /\b(alot)\b/gi, type: 'Spelling', msg: 'Should be "a lot" (two words)' },
        { regex: /\b(recieve)\b/gi, type: 'Spelling', msg: 'Correct spelling: "receive"' },
        { regex: /\b(definately)\b/gi, type: 'Spelling', msg: 'Correct spelling: "definitely"' },
        { regex: /\b(seperate)\b/gi, type: 'Spelling', msg: 'Correct spelling: "separate"' },
        { regex: /\b(occured)\b/gi, type: 'Spelling', msg: 'Correct spelling: "occurred"' }
      ];
      
      patterns.forEach(pattern => {
        let match;
        const regex = new RegExp(pattern.regex);
        while ((match = regex.exec(text)) !== null) {
          const context = getContext(text, match.index, match[0].length);
          errors.push({
            type: pattern.type,
            match: match[0],
            context: context,
            message: pattern.msg || pattern.check(match[0], context)
          });
        }
      });
      
      displayResults(errors);
      showToast(`Found ${errors.length} potential issue${errors.length !== 1 ? 's' : ''}`);
    }
    
    function checkThereTheirTheyre(word, context) {
      const lower = word.toLowerCase();
      if (lower === 'there') return 'Check if you mean "their" (possessive) or "they\'re" (they are)';
      if (lower === 'their') return 'Check if you mean "there" (place) or "they\'re" (they are)';
      return 'Check if you mean "there" (place) or "their" (possessive)';
    }
    
    function checkYourYoure(word, context) {
      const lower = word.toLowerCase();
      if (lower === 'your') return 'Check if you mean "you\'re" (you are)';
      return 'Check if you mean "your" (possessive)';
    }
    
    function checkItsIts(word, context) {
      const lower = word.toLowerCase();
      if (lower === 'its') return 'Check if you mean "it\'s" (it is)';
      return 'Check if you mean "its" (possessive)';
    }
    
    function checkThenThan(word, context) {
      const lower = word.toLowerCase();
      if (lower === 'then') return 'Check if you mean "than" (comparison)';
      return 'Check if you mean "then" (time/sequence)';
    }
    
    function checkAffectEffect(word, context) {
      const lower = word.toLowerCase();
      if (lower === 'affect') return 'Usually a verb. Check if you mean "effect" (noun)';
      return 'Usually a noun. Check if you mean "affect" (verb)';
    }
    
    function getContext(text, index, length) {
      const start = Math.max(0, index - 30);
      const end = Math.min(text.length, index + length + 30);
      let context = text.substring(start, end);
      if (start > 0) context = '...' + context;
      if (end < text.length) context = context + '...';
      return context;
    }
    
    function displayResults(errors) {
      const resultsCard = document.getElementById('resultsCard');
      const resultsContent = document.getElementById('resultsContent');
      
      resultsCard.style.display = 'block';
      
      if (errors.length === 0) {
        resultsContent.innerHTML = '<div class="success-msg">✓ No grammar issues detected! Your text looks good.</div>';
      } else {
        resultsContent.innerHTML = '<div class="error-list">' +
          errors.map(error => `
            <div class="error-item">
              <div class="error-type">${error.type}</div>
              <div class="error-text">
                ${error.context.replace(error.match, `<span class="error-match">${error.match}</span>`)}
              </div>
              <div class="error-suggestion">💡 ${error.message}</div>
            </div>
          `).join('') +
          '</div>';
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
