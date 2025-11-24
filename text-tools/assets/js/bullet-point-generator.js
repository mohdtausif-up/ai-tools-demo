function generateBullets() {
      const text = document.getElementById('originalText').value.trim();
      const bulletStyle = document.getElementById('bulletStyle').value;
      const splitMode = document.getElementById('splitMode').value;
      
      if (!text) {
        showToast('Please enter text to convert', 'error');
        return;
      }
      
      let items = [];
      
      if (splitMode === 'sentence') {
        items = text.match(/[^.!?]+[.!?]+/g) || [];
        items = items.map(s => s.trim()).filter(s => s.length > 0);
      } else if (splitMode === 'paragraph') {
        items = text.split(/\n\n+/).filter(p => p.trim().length > 0);
      } else {
        items = text.split('\n').filter(l => l.trim().length > 0);
      }
      
      let bulletText = '';
      items.forEach((item, index) => {
        const cleaned = item.trim().replace(/^[•\-*]\s*/, '');
        
        if (bulletStyle === 'numbered') {
          bulletText += `${index + 1}. ${cleaned}\n`;
        } else {
          bulletText += `${bulletStyle} ${cleaned}\n`;
        }
      });
      
      document.getElementById('bulletText').value = bulletText;
      showToast('Bullet points generated!');
    }
    
    function copyBullets() {
      const text = document.getElementById('bulletText').value;
      if (!text) {
        showToast('No bullets to copy', 'error');
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
