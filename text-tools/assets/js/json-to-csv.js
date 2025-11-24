function convertToCSV() {
      const jsonText = document.getElementById('jsonInput').value.trim();
      
      if (!jsonText) {
        showToast('Please enter JSON data', 'error');
        return;
      }
      
      try {
        const data = JSON.parse(jsonText);
        
        if (!Array.isArray(data)) {
          showToast('JSON must be an array of objects', 'error');
          return;
        }
        
        if (data.length === 0) {
          showToast('JSON array is empty', 'error');
          return;
        }
        
        // Get all unique keys from all objects
        const keys = new Set();
        data.forEach(obj => {
          Object.keys(obj).forEach(key => keys.add(key));
        });
        
        const headers = Array.from(keys);
        const includeHeaders = document.getElementById('includeHeaders').checked;
        
        let csv = '';
        
        // Add headers
        if (includeHeaders) {
          csv += headers.join(',') + '\n';
        }
        
        // Add data rows
        data.forEach(obj => {
          const row = headers.map(header => {
            let value = obj[header] !== undefined ? obj[header] : '';
            
            // Escape quotes and wrap in quotes if contains comma or quote
            if (typeof value === 'string' && (value.includes(',') || value.includes('"'))) {
              value = '"' + value.replace(/"/g, '""') + '"';
            }
            
            return value;
          });
          csv += row.join(',') + '\n';
        });
        
        document.getElementById('csvOutput').value = csv;
        showToast('Converted to CSV!');
      } catch (e) {
        showToast('Error parsing JSON: ' + e.message, 'error');
      }
    }
    
    function copyCSV() {
      const csv = document.getElementById('csvOutput').value;
      if (!csv) {
        showToast('No CSV to copy', 'error');
        return;
      }
      navigator.clipboard.writeText(csv).then(() => {
        showToast('CSV copied!');
      });
    }
    
    function downloadCSV() {
      const csv = document.getElementById('csvOutput').value;
      if (!csv) {
        showToast('No CSV to download', 'error');
        return;
      }
      
      const blob = new Blob([csv], { type: 'text/csv' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'data.csv';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      showToast('CSV downloaded!');
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
