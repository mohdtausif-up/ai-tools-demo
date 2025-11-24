function convertToMarkdown() {
      const html = document.getElementById('htmlInput').value.trim();
      
      if (!html) {
        showToast('Please enter HTML', 'error');
        return;
      }
      
      try {
        let markdown = html;
        
        // Headers
        markdown = markdown.replace(/<h1[^>]*>(.*?)<\/h1>/gi, '# $1\n\n');
        markdown = markdown.replace(/<h2[^>]*>(.*?)<\/h2>/gi, '## $1\n\n');
        markdown = markdown.replace(/<h3[^>]*>(.*?)<\/h3>/gi, '### $1\n\n');
        markdown = markdown.replace(/<h4[^>]*>(.*?)<\/h4>/gi, '#### $1\n\n');
        markdown = markdown.replace(/<h5[^>]*>(.*?)<\/h5>/gi, '##### $1\n\n');
        markdown = markdown.replace(/<h6[^>]*>(.*?)<\/h6>/gi, '###### $1\n\n');
        
        // Bold
        markdown = markdown.replace(/<(strong|b)[^>]*>(.*?)<\/(strong|b)>/gi, '**$2**');
        
        // Italic
        markdown = markdown.replace(/<(em|i)[^>]*>(.*?)<\/(em|i)>/gi, '*$2*');
        
        // Links
        markdown = markdown.replace(/<a[^>]*href="([^"]*)"[^>]*>(.*?)<\/a>/gi, '[$2]($1)');
        
        // Images
        markdown = markdown.replace(/<img[^>]*src="([^"]*)"[^>]*alt="([^"]*)"[^>]*>/gi, '![$2]($1)');
        markdown = markdown.replace(/<img[^>]*src="([^"]*)"[^>]*>/gi, '![]($1)');
        
        // Code blocks
        markdown = markdown.replace(/<pre[^>]*><code[^>]*>(.*?)<\/code><\/pre>/gis, '```\n$1\n```\n\n');
        markdown = markdown.replace(/<code[^>]*>(.*?)<\/code>/gi, '`$1`');
        
        // Unordered lists
        markdown = markdown.replace(/<ul[^>]*>(.*?)<\/ul>/gis, function(match, content) {
          return content.replace(/<li[^>]*>(.*?)<\/li>/gi, '- $1\n');
        });
        
        // Ordered lists
        markdown = markdown.replace(/<ol[^>]*>(.*?)<\/ol>/gis, function(match, content) {
          let counter = 1;
          return content.replace(/<li[^>]*>(.*?)<\/li>/gi, function(m, item) {
            return counter++ + '. ' + item + '\n';
          });
        });
        
        // Blockquotes
        markdown = markdown.replace(/<blockquote[^>]*>(.*?)<\/blockquote>/gis, '> $1\n\n');
        
        // Horizontal rule
        markdown = markdown.replace(/<hr[^>]*>/gi, '---\n\n');
        
        // Line breaks
        markdown = markdown.replace(/<br[^>]*>/gi, '\n');
        
        // Paragraphs
        markdown = markdown.replace(/<p[^>]*>(.*?)<\/p>/gis, '$1\n\n');
        
        // Remove remaining HTML tags
        markdown = markdown.replace(/<[^>]+>/g, '');
        
        // Clean up extra newlines
        markdown = markdown.replace(/\n{3,}/g, '\n\n');
        markdown = markdown.trim();
        
        document.getElementById('markdownOutput').value = markdown;
        showToast('Converted to Markdown!');
      } catch (e) {
        showToast('Error converting HTML: ' + e.message, 'error');
      }
    }
    
    function copyMarkdown() {
      const markdown = document.getElementById('markdownOutput').value;
      if (!markdown) {
        showToast('No Markdown to copy', 'error');
        return;
      }
      navigator.clipboard.writeText(markdown).then(() => {
        showToast('Markdown copied!');
      });
    }
    
    function clearAll() {
      document.getElementById('htmlInput').value = '';
      document.getElementById('markdownOutput').value = '';
      showToast('Cleared!');
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
