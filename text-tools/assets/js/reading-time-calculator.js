function calculateReadingTime() {
      const text = document.getElementById('textInput').value;
      const customWpm = parseInt(document.getElementById('wpmInput').value) || 200;
      const imageTime = parseInt(document.getElementById('imageTime').value) || 12;
      const imageCount = parseInt(document.getElementById('imageCount').value) || 0;
      
      if (!text) {
        resetDisplay();
        return;
      }
      
      // Count words
      const words = text.trim().split(/\s+/).filter(w => w.length > 0);
      const wordCount = words.length;
      
      // Count characters
      const charCount = text.length;
      
      // Count sentences
      const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
      const sentenceCount = sentences.length;
      
      // Count paragraphs
      const paragraphs = text.split(/\n\n+/).filter(p => p.trim().length > 0);
      const paragraphCount = paragraphs.length;
      
      // Calculate reading times (in minutes)
      const imageMinutes = (imageCount * imageTime) / 60;
      
      const slowTime = (wordCount / 150) + imageMinutes;
      const avgTime = (wordCount / customWpm) + imageMinutes;
      const fastTime = (wordCount / 250) + imageMinutes;
      
      // Update display
      document.getElementById('wordCount').textContent = wordCount.toLocaleString();
      document.getElementById('charCount').textContent = charCount.toLocaleString();
      document.getElementById('sentenceCount').textContent = sentenceCount.toLocaleString();
      document.getElementById('paragraphCount').textContent = paragraphCount.toLocaleString();
      
      document.getElementById('slowTime').textContent = formatTime(slowTime);
      document.getElementById('avgTime').textContent = formatTime(avgTime);
      document.getElementById('fastTime').textContent = formatTime(fastTime);
    }
    
    function formatTime(minutes) {
      if (minutes < 1) {
        const seconds = Math.round(minutes * 60);
        return `${seconds} sec`;
      } else if (minutes < 60) {
        const mins = Math.floor(minutes);
        const secs = Math.round((minutes - mins) * 60);
        return secs > 0 ? `${mins}m ${secs}s` : `${mins} min`;
      } else {
        const hours = Math.floor(minutes / 60);
        const mins = Math.round(minutes % 60);
        return `${hours}h ${mins}m`;
      }
    }
    
    function resetDisplay() {
      document.getElementById('wordCount').textContent = '0';
      document.getElementById('charCount').textContent = '0';
      document.getElementById('sentenceCount').textContent = '0';
      document.getElementById('paragraphCount').textContent = '0';
      document.getElementById('slowTime').textContent = '0 min';
      document.getElementById('avgTime').textContent = '0 min';
      document.getElementById('fastTime').textContent = '0 min';
    }
