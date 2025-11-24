function detectPassive() {
      const text = document.getElementById('textInput').value.trim();
      
      if (!text) {
        showToast('Please enter text to analyze', 'error');
        return;
      }
      
      const sentences = text.match(/[^.!?]+[.!?]+/g) || [];
      const passiveInstances = [];
      
      // Passive voice patterns
      const passivePatterns = [
        { regex: /\b(is|are|was|were|been|be|being)\s+(\w+ed)\b/gi, type: 'Simple Passive' },
        { regex: /\b(is|are|was|were)\s+being\s+(\w+ed)\b/gi, type: 'Continuous Passive' },
        { regex: /\b(has|have|had)\s+been\s+(\w+ed)\b/gi, type: 'Perfect Passive' },
        { regex: /\b(will|shall)\s+be\s+(\w+ed)\b/gi, type: 'Future Passive' },
        { regex: /\b(would|could|should|might|may)\s+be\s+(\w+ed)\b/gi, type: 'Modal Passive' }
      ];
      
      sentences.forEach((sentence, index) => {
        passivePatterns.forEach(pattern => {
          let match;
          const regex = new RegExp(pattern.regex);
          while ((match = regex.exec(sentence)) !== null) {
            passiveInstances.push({
              sentence: sentence.trim(),
              match: match[0],
              type: pattern.type,
              index: index + 1
            });
          }
        });
      });
      
      displayResults(passiveInstances, sentences.length);
      showToast(`Found ${passiveInstances.length} passive voice instance(s)`);
    }
    
    function displayResults(instances, totalSentences) {
      const resultsCard = document.getElementById('resultsCard');
      const passiveList = document.getElementById('passiveList');
      
      resultsCard.style.display = 'block';
      
      document.getElementById('passiveCount').textContent = instances.length;
      document.getElementById('sentenceCount').textContent = totalSentences;
      const percent = totalSentences > 0 ? Math.round((instances.length / totalSentences) * 100) : 0;
      document.getElementById('passivePercent').textContent = percent + '%';
      
      if (instances.length === 0) {
        passiveList.innerHTML = '<p style="color: #10b981; font-weight: 600;">✓ No passive voice detected! Great job using active voice.</p>';
      } else {
        passiveList.innerHTML = instances.map(inst => {
          const highlighted = inst.sentence.replace(
            inst.match,
            `<span class="passive-highlight">${inst.match}</span>`
          );
          return `
            <div class="passive-item">
              <div class="passive-text">${highlighted}</div>
              <div class="passive-suggestion">💡 Consider rewriting in active voice</div>
            </div>
          `;
        }).join('');
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
