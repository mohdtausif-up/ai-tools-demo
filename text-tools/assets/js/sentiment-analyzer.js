const positiveWords = [
      'good', 'great', 'excellent', 'amazing', 'wonderful', 'fantastic', 'awesome', 'love',
      'happy', 'joy', 'beautiful', 'best', 'better', 'perfect', 'brilliant', 'success',
      'positive', 'nice', 'enjoy', 'delightful', 'pleased', 'excited', 'superb', 'outstanding'
    ];
    
    const negativeWords = [
      'bad', 'terrible', 'awful', 'horrible', 'worst', 'hate', 'sad', 'angry',
      'poor', 'negative', 'fail', 'failure', 'wrong', 'mistake', 'problem', 'difficult',
      'hard', 'disappointed', 'disappoint', 'unhappy', 'unfortunate', 'boring', 'dull'
    ];
    
    function analyzeSentiment() {
      const text = document.getElementById('inputText').value.toLowerCase();
      
      if (!text) {
        showToast('Please enter text to analyze', 'error');
        return;
      }
      
      const words = text.match(/\b\w+\b/g) || [];
      const totalWordCount = words.length;
      
      let positiveCount = 0;
      let negativeCount = 0;
      
      words.forEach(word => {
        if (positiveWords.includes(word)) positiveCount++;
        if (negativeWords.includes(word)) negativeCount++;
      });
      
      // Calculate sentiment score (-100 to +100)
      const sentimentScore = ((positiveCount - negativeCount) / totalWordCount * 100);
      
      // Determine sentiment
      let sentiment, icon, color, fillWidth;
      
      if (sentimentScore > 10) {
        sentiment = 'Positive';
        icon = '😊';
        color = '#10b981';
        fillWidth = 50 + (Math.min(sentimentScore, 50) / 50 * 50);
      } else if (sentimentScore < -10) {
        sentiment = 'Negative';
        icon = '😞';
        color = '#ef4444';
        fillWidth = 50 - (Math.min(Math.abs(sentimentScore), 50) / 50 * 50);
      } else {
        sentiment = 'Neutral';
        icon = '😐';
        color = '#64748b';
        fillWidth = 50;
      }
      
      // Display results
      document.getElementById('sentimentIcon').textContent = icon;
      document.getElementById('sentimentLabel').textContent = sentiment;
      document.getElementById('sentimentLabel').style.color = color;
      document.getElementById('sentimentScore').textContent = sentimentScore.toFixed(1);
      document.getElementById('sentimentScore').style.color = color;
      
      const scoreFill = document.getElementById('scoreFill');
      scoreFill.style.width = fillWidth + '%';
      scoreFill.style.background = color;
      
      document.getElementById('positiveCount').textContent = positiveCount;
      document.getElementById('negativeCount').textContent = negativeCount;
      document.getElementById('totalWords').textContent = totalWordCount;
      
      document.getElementById('resultsCard').style.display = 'block';
      showToast('Sentiment analyzed!');
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
