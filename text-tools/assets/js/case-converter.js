function convertCase(type) {
      const textarea = document.getElementById('textInput');
      let text = textarea.value;
      
      if (!text) {
        showToast('Please enter text to convert', 'error');
        return;
      }
      
      let result = '';
      
      switch(type) {
        case 'upper':
          result = text.toUpperCase();
          break;
        case 'lower':
          result = text.toLowerCase();
          break;
        case 'title':
          result = toTitleCase(text);
          break;
        case 'sentence':
          result = toSentenceCase(text);
          break;
        case 'camel':
          result = toCamelCase(text);
          break;
        case 'pascal':
          result = toPascalCase(text);
          break;
        case 'snake':
          result = toSnakeCase(text);
          break;
        case 'kebab':
          result = toKebabCase(text);
          break;
        case 'constant':
          result = toConstantCase(text);
          break;
        case 'dot':
          result = toDotCase(text);
          break;
        case 'path':
          result = toPathCase(text);
          break;
        case 'toggle':
          result = toggleCase(text);
          break;
      }
      
      textarea.value = result;
      showToast(`Converted to ${type} case!`);
    }
    
    function toTitleCase(text) {
      return text.toLowerCase().replace(/\b\w/g, c => c.toUpperCase());
    }
    
    function toSentenceCase(text) {
      return text.toLowerCase().replace(/(^\s*\w|[.!?]\s*\w)/g, c => c.toUpperCase());
    }
    
    function toCamelCase(text) {
      return text.toLowerCase()
        .replace(/[^a-zA-Z0-9]+(.)/g, (m, chr) => chr.toUpperCase());
    }
    
    function toPascalCase(text) {
      const camel = toCamelCase(text);
      return camel.charAt(0).toUpperCase() + camel.slice(1);
    }
    
    function toSnakeCase(text) {
      return text.replace(/[^a-zA-Z0-9]+/g, '_')
        .replace(/([A-Z])/g, '_$1')
        .toLowerCase()
        .replace(/^_/, '');
    }
    
    function toKebabCase(text) {
      return text.replace(/[^a-zA-Z0-9]+/g, '-')
        .replace(/([A-Z])/g, '-$1')
        .toLowerCase()
        .replace(/^-/, '');
    }
    
    function toConstantCase(text) {
      return toSnakeCase(text).toUpperCase();
    }
    
    function toDotCase(text) {
      return text.replace(/[^a-zA-Z0-9]+/g, '.')
        .replace(/([A-Z])/g, '.$1')
        .toLowerCase()
        .replace(/^\./, '');
    }
    
    function toPathCase(text) {
      return text.replace(/[^a-zA-Z0-9]+/g, '/')
        .replace(/([A-Z])/g, '/$1')
        .toLowerCase()
        .replace(/^\//, '');
    }
    
    function toggleCase(text) {
      return text.split('').map(c => 
        c === c.toUpperCase() ? c.toLowerCase() : c.toUpperCase()
      ).join('');
    }
    
    function copyText() {
      const text = document.getElementById('textInput').value;
      if (!text) {
        showToast('No text to copy', 'error');
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
