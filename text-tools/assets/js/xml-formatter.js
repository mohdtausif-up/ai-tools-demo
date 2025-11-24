function formatXML() {
      const input = document.getElementById('xmlInput').value.trim();
      
      if (!input) {
        showToast('Please enter XML', 'error');
        return;
      }
      
      try {
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(input, 'text/xml');
        
        const parserError = xmlDoc.querySelector('parsererror');
        if (parserError) {
          updateStatus('Invalid XML', 'error');
          showToast('Invalid XML format', 'error');
          return;
        }
        
        const formatted = formatXMLString(xmlDoc.documentElement, 0);
        document.getElementById('xmlOutput').value = formatted;
        updateStatus('Valid XML', 'success');
        showToast('XML formatted!');
      } catch (e) {
        updateStatus('Error', 'error');
        showToast('Error formatting XML: ' + e.message, 'error');
      }
    }
    
    function formatXMLString(node, indent) {
      let formatted = '';
      const indentStr = '  '.repeat(indent);
      
      if (node.nodeType === 3) {
        const text = node.textContent.trim();
        if (text) formatted += text;
      } else if (node.nodeType === 1) {
        formatted += indentStr + '<' + node.tagName;
        
        // Add attributes
        for (let i = 0; i < node.attributes.length; i++) {
          const attr = node.attributes[i];
          formatted += ' ' + attr.name + '="' + attr.value + '"';
        }
        
        if (node.childNodes.length === 0) {
          formatted += '/>\n';
        } else {
          formatted += '>';
          
          const hasElementChildren = Array.from(node.childNodes).some(child => child.nodeType === 1);
          
          if (hasElementChildren) {
            formatted += '\n';
          }
          
          for (let i = 0; i < node.childNodes.length; i++) {
            formatted += formatXMLString(node.childNodes[i], indent + 1);
          }
          
          if (hasElementChildren) {
            formatted += indentStr;
          }
          
          formatted += '</' + node.tagName + '>\n';
        }
      }
      
      return formatted;
    }
    
    function minifyXML() {
      const input = document.getElementById('xmlInput').value.trim();
      
      if (!input) {
        showToast('Please enter XML', 'error');
        return;
      }
      
      try {
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(input, 'text/xml');
        
        const parserError = xmlDoc.querySelector('parsererror');
        if (parserError) {
          updateStatus('Invalid XML', 'error');
          showToast('Invalid XML format', 'error');
          return;
        }
        
        const serializer = new XMLSerializer();
        const minified = serializer.serializeToString(xmlDoc)
          .replace(/>\s+</g, '><')
          .replace(/\n/g, '')
          .trim();
        
        document.getElementById('xmlOutput').value = minified;
        updateStatus('Minified', 'success');
        showToast('XML minified!');
      } catch (e) {
        updateStatus('Error', 'error');
        showToast('Error minifying XML: ' + e.message, 'error');
      }
    }
    
    function validateXML() {
      const input = document.getElementById('xmlInput').value.trim();
      
      if (!input) {
        showToast('Please enter XML', 'error');
        return;
      }
      
      try {
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(input, 'text/xml');
        
        const parserError = xmlDoc.querySelector('parsererror');
        if (parserError) {
          updateStatus('Invalid XML', 'error');
          showToast('XML is invalid', 'error');
        } else {
          updateStatus('Valid XML', 'success');
          showToast('XML is valid!');
        }
      } catch (e) {
        updateStatus('Error', 'error');
        showToast('Validation error: ' + e.message, 'error');
      }
    }
    
    function copyXML() {
      const xml = document.getElementById('xmlOutput').value;
      if (!xml) {
        showToast('No XML to copy', 'error');
        return;
      }
      navigator.clipboard.writeText(xml).then(() => {
        showToast('XML copied!');
      });
    }
    
    function updateStatus(text, type) {
      const badge = document.getElementById('statusBadge');
      const color = type === 'success' ? '#10b981' : '#ef4444';
      badge.innerHTML = `<span class="status-badge" style="background: ${color}; color: white;">${text}</span>`;
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
