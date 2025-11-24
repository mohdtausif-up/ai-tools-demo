const vatFormats = {
      'GB': { name: 'United Kingdom', pattern: /^GB\d{9}$|^GB\d{12}$|^GBGD\d{3}$|^GBHA\d{3}$/ },
      'DE': { name: 'Germany', pattern: /^DE\d{9}$/ },
      'FR': { name: 'France', pattern: /^FR[A-Z0-9]{2}\d{9}$/ },
      'IT': { name: 'Italy', pattern: /^IT\d{11}$/ },
      'ES': { name: 'Spain', pattern: /^ES[A-Z0-9]\d{7}[A-Z0-9]$/ },
      'NL': { name: 'Netherlands', pattern: /^NL\d{9}B\d{2}$/ },
      'BE': { name: 'Belgium', pattern: /^BE0\d{9}$/ },
      'AT': { name: 'Austria', pattern: /^ATU\d{8}$/ },
      'PL': { name: 'Poland', pattern: /^PL\d{10}$/ },
      'SE': { name: 'Sweden', pattern: /^SE\d{12}$/ }
    };
    
    function validateVAT() {
      let vat = document.getElementById('vatInput').value.trim().toUpperCase().replace(/\s/g, '');
      let country = document.getElementById('countrySelect').value;
      
      if (!vat) {
        showToast('Please enter a VAT number', 'error');
        return;
      }
      
      // Auto-detect country if not selected
      if (!country) {
        const prefix = vat.substring(0, 2);
        if (vatFormats[prefix]) {
          country = prefix;
        } else {
          showToast('Cannot detect country. Please select manually.', 'error');
          return;
        }
      }
      
      // Ensure VAT starts with country code
      if (!vat.startsWith(country)) {
        vat = country + vat;
      }
      
      const format = vatFormats[country];
      if (!format) {
        showToast('Country not supported', 'error');
        return;
      }
      
      const isValid = format.pattern.test(vat);
      
      // Display results
      const resultIcon = document.getElementById('resultIcon');
      const resultStatus = document.getElementById('resultStatus');
      
      if (isValid) {
        resultIcon.textContent = '✓';
        resultIcon.style.color = '#10b981';
        resultStatus.textContent = 'Valid VAT Number';
        resultStatus.style.color = '#10b981';
        showToast('VAT number is valid!');
      } else {
        resultIcon.textContent = '✗';
        resultIcon.style.color = '#ef4444';
        resultStatus.textContent = 'Invalid VAT Number';
        resultStatus.style.color = '#ef4444';
        showToast('VAT number is invalid', 'error');
      }
      
      document.getElementById('country').textContent = format.name;
      document.getElementById('format').textContent = vat;
      document.getElementById('resultsCard').style.display = 'block';
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
