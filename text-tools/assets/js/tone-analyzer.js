const toneWords = {
      positive: ['excellent', 'amazing', 'wonderful', 'great', 'fantastic', 'love', 'best', 'perfect', 'awesome', 'brilliant', 'outstanding', 'superb', 'happy', 'delighted', 'thrilled'],
      negative: ['bad', 'terrible', 'awful', 'worst', 'hate', 'horrible', 'poor', 'disappointing', 'unfortunate', 'sad', 'angry', 'frustrated', 'disappointed', 'unhappy'],
      professional: ['regarding', 'therefore', 'consequently', 'furthermore', 'respectively', 'accordingly', 'subsequently', 'notwithstanding', 'henceforth'],
      casual: ['hey', 'yeah', 'cool', 'awesome', 'stuff', 'things', 'kinda', 'sorta', 'gonna', 'wanna', 'pretty', 'really'],
      formal: ['shall', 'would kindly', 'herein', 'aforementioned', 'pursuant', 'whereby', 'heretofore', 'undersigned'],
      friendly: ['thanks', 'please', 'appreciate', 'hope', 'help', 'welcome', 'feel free', 'happy to', 'glad']
    };
    
    function analyzeTone() {
      const text = document.getElementById('textInput').value.trim().toLowerCase();
      
      if (!text) {
        showToast('Please enter text to analyze', 'error');
        return;
      }
      
      const tones = {};
      let totalMatches = 0;
      
      // Count tone indicators
      Object.keys(toneWords).forEach(tone => {
        let count = 0;
        toneWords[tone].forEach(word => {
          const regex = new RegExp('\\b' + word + '\\b', 'gi');
          const matches = text.match(regex);
          if (matches) count += matches.length;
        });
        if (count > 0) {
          tones[tone] = count;
          totalMatches += count;
        }
      });
      
      // Additional analysis
      const sentences = text.match(/[^.!?]+[.!?]+/g) || [];
      const avgSentenceLength = text.split(/\s+/).length / (sentences.length || 1);
      const hasQuestions = (text.match(/\?/g) || []).length;
      const hasExclamations = (text.match(/!/g) || []).length;
      
      // Determine primary and secondary tones
      const sortedTones = Object.entries(tones).sort((a, b) => b[1] - a[1]);
      
      displayResults(sortedTones, {
        avgSentenceLength: Math.round(avgSentenceLength),
        questions: hasQuestions,
        exclamations: hasExclamations,
        totalWords: text.split(/\s+/).length
      });
      
      showToast('Tone analysis complete!');
    }
    
    function displayResults(tones, stats) {
      const resultsCard = document.getElementById('resultsCard');
      const toneBadges = document.getElementById('toneBadges');
      const analysisDetails = document.getElementById('analysisDetails');
      
      resultsCard.style.display = 'block';
      
      if (tones.length === 0) {
        toneBadges.innerHTML = '<div class="tone-badge tone-neutral">Neutral</div>';
      } else {
        toneBadges.innerHTML = tones.map(([tone, count]) => 
          `<div class="tone-badge tone-${tone}">${capitalize(tone)} (${count})</div>`
        ).join('');
      }
      
      const formality = stats.avgSentenceLength > 20 ? 'Formal' : 'Casual';
      const engagement = stats.exclamations > 2 ? 'High' : stats.questions > 2 ? 'Moderate' : 'Low';
      
      analysisDetails.innerHTML = `
        <div class="analysis-item">
          <span>Overall Formality:</span>
          <strong>${formality}</strong>
        </div>
        <div class="analysis-item">
          <span>Engagement Level:</span>
          <strong>${engagement}</strong>
        </div>
        <div class="analysis-item">
          <span>Avg Sentence Length:</span>
          <strong>${stats.avgSentenceLength} words</strong>
        </div>
        <div class="analysis-item">
          <span>Questions:</span>
          <strong>${stats.questions}</strong>
        </div>
        <div class="analysis-item">
          <span>Exclamations:</span>
          <strong>${stats.exclamations}</strong>
        </div>
      `;
      
      resultsCard.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
    
    function capitalize(str) {
      return str.charAt(0).toUpperCase() + str.slice(1);
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
