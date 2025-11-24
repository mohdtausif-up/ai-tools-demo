function generateOutline() {
      const text = document.getElementById('articleInput').value.trim();
      
      if (!text) {
        showToast('Please enter article content', 'error');
        return;
      }
      
      const outline = [];
      const lines = text.split('\n');
      
      lines.forEach(line => {
        const trimmed = line.trim();
        
        // Markdown-style headings
        if (trimmed.startsWith('# ')) {
          outline.push({ level: 1, text: trimmed.substring(2) });
        } else if (trimmed.startsWith('## ')) {
          outline.push({ level: 2, text: trimmed.substring(3) });
        } else if (trimmed.startsWith('### ')) {
          outline.push({ level: 3, text: trimmed.substring(4) });
        }
        // ALL CAPS as headings
        else if (trimmed.length > 5 && trimmed === trimmed.toUpperCase() && /^[A-Z\s]+$/.test(trimmed)) {
          outline.push({ level: 1, text: trimmed });
        }
        // Short lines ending with colon (likely headings)
        else if (trimmed.endsWith(':') && trimmed.split(/\s+/).length <= 8) {
          outline.push({ level: 2, text: trimmed.slice(0, -1) });
        }
      });
      
      // If no headings found, generate from sentences
      if (outline.length === 0) {
        const sentences = text.match(/[^.!?]+[.!?]+/g) || [];
        if (sentences.length > 0) {
          outline.push({ level: 1, text: 'Main Content' });
          
          // Group every 3 sentences as a section
          for (let i = 0; i < Math.min(sentences.length, 9); i += 3) {
            const sectionNum = Math.floor(i / 3) + 1;
            outline.push({ level: 2, text: `Section ${sectionNum}` });
            
            for (let j = i; j < Math.min(i + 3, sentences.length); j++) {
              const sentence = sentences[j].trim().substring(0, 50);
              outline.push({ level: 3, text: sentence + (sentence.length === 50 ? '...' : '') });
            }
          }
        }
      }
      
      displayOutline(outline);
      showToast('Outline generated!');
    }
    
    function displayOutline(outline) {
      const outputDiv = document.getElementById('outlineOutput');
      
      if (outline.length === 0) {
        outputDiv.innerHTML = '<p style="color: #ef4444;">No structure detected. Try adding headings with # or ## syntax.</p>';
        return;
      }
      
      let html = '';
      outline.forEach((item, index) => {
        const number = index + 1;
        const indent = '  '.repeat(item.level - 1);
        
        if (item.level === 1) {
          html += `<div class="outline-h1">${number}. ${item.text}</div>`;
        } else if (item.level === 2) {
          html += `<div class="outline-h2">${number}. ${item.text}</div>`;
        } else {
          html += `<div class="outline-h3">${number}. ${item.text}</div>`;
        }
      });
      
      outputDiv.innerHTML = html;
    }
    
    function copyOutline() {
      const text = document.getElementById('outlineOutput').innerText;
      if (text.includes('Enter content')) {
        showToast('No outline to copy', 'error');
        return;
      }
      navigator.clipboard.writeText(text).then(() => {
        showToast('Outline copied!');
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
