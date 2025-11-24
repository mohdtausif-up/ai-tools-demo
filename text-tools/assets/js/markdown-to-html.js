function convertToHTML() {
      const markdown = document.getElementById('markdownInput').value;
      
      if (!markdown) {
        showToast('Please enter Markdown', 'error');
        return;
      }
      
      let html = markdown;
      
      // Headers
      html = html.replace(/^### (.*$)/gim, '<h3>$1</h3>');
      html = html.replace(/^## (.*$)/gim, '<h2>$1</h2>');
      html = html.replace(/^# (.*$)/gim, '<h1>$1</h1>');
      
      // Bold
      html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
      html = html.replace(/__(.*?)__/g, '<strong>$1</strong>');
      
      // Italic
      html = html.replace(/\*(.*?)\*/g, '<em>$1</em>');
      html = html.replace(/_(.*?)_/g, '<em>$1</em>');
      
      // Links
      html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');
      
      // Images
      html = html.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1">');
      
      // Code blocks
      html = html.replace(/```([\s\S]*?)```/g, '<pre><code>$1</code></pre>');
      html = html.replace(/`([^`]+)`/g, '<code>$1</code>');
      
      // Unordered lists
      html = html.replace(/^\* (.*$)/gim, '<li>$1</li>');
      html = html.replace(/^- (.*$)/gim, '<li>$1</li>');
      html = html.replace(/(<li>.*<\/li>)/s, '<ul>$1</ul>');
      
      // Ordered lists
      html = html.replace(/^\d+\. (.*$)/gim, '<li>$1</li>');
      
      // Blockquotes
      html = html.replace(/^> (.*$)/gim, '<blockquote>$1</blockquote>');
      
      // Horizontal rule
      html = html.replace(/^---$/gim, '<hr>');
      
      // Line breaks
      html = html.replace(/\n\n/g, '</p><p>');
      html = '<p>' + html + '</p>';
      
      document.getElementById('htmlOutput').value = html;
      document.getElementById('preview').innerHTML = html;
      showToast('Converted to HTML!');
    }
    
    function copyHTML() {
      const html = document.getElementById('htmlOutput').value;
      if (!html) {
        showToast('No HTML to copy', 'error');
        return;
      }
      navigator.clipboard.writeText(html).then(() => {
        showToast('HTML copied!');
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
