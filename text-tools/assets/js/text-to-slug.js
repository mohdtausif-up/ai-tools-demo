function generateSlug() {
      const text = document.getElementById('inputText').value;
      
      if (!text) {
        document.getElementById('slugDisplay').textContent = 'your-url-friendly-slug-here';
        return;
      }
      
      const lowercase = document.getElementById('lowercase').checked;
      const removeSpecial = document.getElementById('removeSpecial').checked;
      const maxLength = document.getElementById('maxLength').checked;
      
      let slug = text;
      
      // Convert to lowercase if enabled
      if (lowercase) {
        slug = slug.toLowerCase();
      }
      
      // Replace special characters
      if (removeSpecial) {
        // Remove accents and diacritics
        slug = slug.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
        
        // Replace common symbols
        slug = slug.replace(/&/g, 'and');
        slug = slug.replace(/\+/g, 'plus');
        slug = slug.replace(/@/g, 'at');
        slug = slug.replace(/#/g, 'number');
        slug = slug.replace(/\$/g, 'dollar');
        slug = slug.replace(/%/g, 'percent');
        
        // Remove all non-alphanumeric except spaces and hyphens
        slug = slug.replace(/[^a-z0-9\s-]/gi, '');
      }
      
      // Replace spaces and multiple hyphens with single hyphen
      slug = slug.replace(/\s+/g, '-');
      slug = slug.replace(/-+/g, '-');
      
      // Remove leading and trailing hyphens
      slug = slug.replace(/^-+|-+$/g, '');
      
      // Limit length if enabled
      if (maxLength && slug.length > 50) {
        slug = slug.substring(0, 50);
        // Remove partial word at the end
        const lastHyphen = slug.lastIndexOf('-');
        if (lastHyphen > 0) {
          slug = slug.substring(0, lastHyphen);
        }
      }
      
      document.getElementById('slugDisplay').textContent = slug || 'invalid-slug';
      
      if (slug) {
        showToast('Slug generated!', 'success', false);
      }
    }
    
    function copySlug() {
      const slug = document.getElementById('slugDisplay').textContent;
      
      if (slug === 'your-url-friendly-slug-here' || slug === 'invalid-slug') {
        showToast('Please enter text first', 'error');
        return;
      }
      
      navigator.clipboard.writeText(slug).then(() => {
        showToast('Slug copied to clipboard!');
      });
    }
    
    function showToast(message, type = 'success', show = true) {
      if (!show) return;
      
      const existingToast = document.querySelector('.toast');
      if (existingToast) existingToast.remove();
      
      const toast = document.createElement('div');
      toast.className = 'toast';
      toast.style.background = type === 'error' ? '#ef4444' : '#10b981';
      toast.textContent = message;
      document.body.appendChild(toast);
      
      setTimeout(() => toast.remove(), 3000);
    }
