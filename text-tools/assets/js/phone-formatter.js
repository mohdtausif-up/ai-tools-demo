function formatPhone() {
      let phone = document.getElementById('phoneInput').value;
      const countryCode = document.getElementById('countryCode').value;
      
      if (!phone) {
        showToast('Please enter a phone number', 'error');
        return;
      }
      
      // Remove all non-numeric characters
      const digits = phone.replace(/\D/g, '');
      
      if (digits.length < 10) {
        showToast('Phone number must have at least 10 digits', 'error');
        return;
      }
      
      // Use last 10 digits if more than 10
      const phoneDigits = digits.slice(-10);
      
      const formats = [
        {
          label: 'Standard',
          value: `(${phoneDigits.slice(0,3)}) ${phoneDigits.slice(3,6)}-${phoneDigits.slice(6)}`
        },
        {
          label: 'International',
          value: `${countryCode} ${phoneDigits.slice(0,3)} ${phoneDigits.slice(3,6)} ${phoneDigits.slice(6)}`
        },
        {
          label: 'Dotted',
          value: `${phoneDigits.slice(0,3)}.${phoneDigits.slice(3,6)}.${phoneDigits.slice(6)}`
        },
        {
          label: 'Dashed',
          value: `${phoneDigits.slice(0,3)}-${phoneDigits.slice(3,6)}-${phoneDigits.slice(6)}`
        },
        {
          label: 'Plain',
          value: phoneDigits
        },
        {
          label: 'RFC3966',
          value: `tel:${countryCode}-${phoneDigits.slice(0,3)}-${phoneDigits.slice(3,6)}-${phoneDigits.slice(6)}`
        }
      ];
      
      const resultHTML = formats.map(format => `
        <div class="result-item">
          <div>
            <div class="result-label">${format.label}</div>
            <div class="result-value">${format.value}</div>
          </div>
          <button class="copy-btn-small" onclick="copyText('${format.value}')">📋 Copy</button>
        </div>
      `).join('');
      
      document.getElementById('resultList').innerHTML = resultHTML;
      document.getElementById('resultsCard').style.display = 'block';
      showToast('Phone number formatted!');
    }
    
    function copyText(text) {
      navigator.clipboard.writeText(text).then(() => {
        showToast('Copied!');
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
