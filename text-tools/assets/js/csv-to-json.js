function convertToJSON() {
      const csv = document.getElementById('csvInput').value.trim();
      
      if (!csv) {
        showToast('Please enter CSV data', 'error');
        return;
      }
      
      try {
        const lines = csv.split('\n').filter(line => line.trim());
        
        if (lines.length < 2) {
          showToast('CSV must have headers and at least one data row', 'error');
          return;
        }
        
        // Parse headers
        const headers = lines[0].split(',').map(h => h.trim());
        
        // Parse data rows
        const jsonData = [];
        for (let i = 1; i < lines.length; i++) {
          const values = lines[i].split(',').map(v => v.trim());
          const obj = {};
          
          headers.forEach((header, index) => {
            let value = values[index] || '';
            
            // Try to parse as number
            if (!isNaN(value) && value !== '') {
              value = parseFloat(value);
            }
            
            obj[header] = value;
          });
          
          jsonData.push(obj);
        }
        
        const prettyPrint = document.getElementById('prettyPrint').checked;
        const json = prettyPrint 
          ? JSON.stringify(jsonData, null, 2)
          : JSON.stringify(jsonData);
        
        document.getElementById('jsonOutput').value = json;
        showToast('Converted to JSON!');
      } catch (e) {
        showToast('Error parsing CSV: ' + e.message, 'error');
      }
    }
    
    function copyJSON() {
      const json = document.getElementById('jsonOutput').value;
      if (!json) {
        showToast('No JSON to copy', 'error');
        return;
      }
      navigator.clipboard.writeText(json).then(() => {
        showToast('JSON copied!');
      });
    }
    
    function downloadJSON() {
      const json = document.getElementById('jsonOutput').value;
      if (!json) {
        showToast('No JSON to download', 'error');
        return;
      }
      
      const blob = new Blob([json], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'data.json';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      showToast('JSON downloaded!');
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
