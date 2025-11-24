function removeTags() {
      const html = document.getElementById('inputText').value;
      
      if (!html) {
        showToast('Please enter HTML', 'error');
        return;
      }
      
      const preserveLineBreaks = document.getElementById('preserveLineBreaks').checked;
      const decodeEntities = document.getElementById('decodeEntities').checked;
      
      // Count tags before removal
      const tagMatches = html.match(/<[^>]+>/g);
      const tagCount = tagMatches ? tagMatches.length : 0;
      
      // Replace br and p tags with line breaks if preserving
      let text = html;
      if (preserveLineBreaks) {
        text = text.replace(/<br\s*\/?>/gi, '\n');
        text = text.replace(/<\/p>/gi, '\n\n');
        text = text.replace(/<\/div>/gi, '\n');
        text = text.replace(/<\/li>/gi, '\n');
      }
      
      // Remove all HTML tags
      text = text.replace(/<[^>]+>/g, '');
      
      // Decode HTML entities if enabled
      if (decodeEntities) {
        text = decodeHtmlEntities(text);
      }
      
      // Clean up extra whitespace
      text = text.replace(/\n{3,}/g, '\n\n');
      text = text.trim();
      
      displayResult(text, html.length, tagCount);
      showToast('HTML tags removed!');
    }
    
    function extractText() {
      const html = document.getElementById('inputText').value;
      
      if (!html) {
        showToast('Please enter HTML', 'error');
        return;
      }
      
      // Use DOMParser for more accurate text extraction
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, 'text/html');
      const text = doc.body.textContent || '';
      
      const tagMatches = html.match(/<[^>]+>/g);
      const tagCount = tagMatches ? tagMatches.length : 0;
      
      displayResult(text.trim(), html.length, tagCount);
      showToast('Text extracted!');
    }
    
    function decodeHtmlEntities(text) {
      const textarea = document.createElement('textarea');
      textarea.innerHTML = text;
      return textarea.value;
    }
    
    function displayResult(text, originalSize, tagCount) {
      document.getElementById('outputText').value = text;
      document.getElementById('originalSize').textContent = originalSize + ' chars';
      document.getElementById('plainSize').textContent = text.length + ' chars';
      document.getElementById('tagsRemoved').textContent = tagCount;
      
      const reduction = originalSize > 0 
        ? (((originalSize - text.length) / originalSize) * 100).toFixed(1)
        : 0;
      document.getElementById('reduction').textContent = reduction + '%';
      document.getElementById('statsBox').style.display = 'block';
    }
    
    function copyResult() {
      const text = document.getElementById('outputText').value;
      if (!text) {
        showToast('No result to copy', 'error');
        return;
      }
      navigator.clipboard.writeText(text).then(() => {
        showToast('Copied to clipboard!');
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
