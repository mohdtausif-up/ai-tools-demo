function validateEmail(email) {
      // RFC 5322 compliant email regex
      const emailRegex = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
      
      if (!email || email.length > 254) return false;
      
      const valid = emailRegex.test(email);
      
      // Additional checks
      if (valid) {
        const parts = email.split('@');
        if (parts[0].length > 64) return false;
        
        const domainParts = parts[1].split('.');
        if (domainParts.some(part => part.length > 63)) return false;
      }
      
      return valid;
    }
    
    function validateSingle() {
      const email = document.getElementById('singleEmail').value.trim();
      const resultDiv = document.getElementById('singleResult');
      
      if (!email) {
        showToast('Please enter an email address', 'error');
        resultDiv.innerHTML = '';
        return;
      }
      
      const isValid = validateEmail(email);
      
      if (isValid) {
        resultDiv.innerHTML = `
          <div class="result-box valid-box">
            <span class="result-icon">✓</span>
            <span class="result-text">Valid Email Address</span>
            <div class="result-details">${email} is a valid email format</div>
          </div>
        `;
        showToast('Email is valid!');
      } else {
        resultDiv.innerHTML = `
          <div class="result-box invalid-box">
            <span class="result-icon">✗</span>
            <span class="result-text">Invalid Email Address</span>
            <div class="result-details">${email} is not a valid email format</div>
          </div>
        `;
        showToast('Email is invalid', 'error');
      }
    }
    
    function validateBulk() {
      const text = document.getElementById('bulkEmails').value;
      
      if (!text) {
        showToast('Please enter email addresses', 'error');
        return;
      }
      
      const emails = text.split('\n').map(e => e.trim()).filter(e => e);
      
      let validCount = 0;
      let invalidCount = 0;
      
      const results = emails.map(email => {
        const isValid = validateEmail(email);
        if (isValid) validCount++;
        else invalidCount++;
        return { email, isValid };
      });
      
      displayBulkResults(results, emails.length, validCount, invalidCount);
      showToast(`Validated ${emails.length} email(s)`);
    }
    
    function displayBulkResults(results, total, valid, invalid) {
      document.getElementById('totalCount').textContent = total;
      document.getElementById('validCount').textContent = valid;
      document.getElementById('invalidCount').textContent = invalid;
      document.getElementById('statsBox').style.display = 'block';
      
      const list = document.getElementById('emailList');
      list.innerHTML = results.map(r => `
        <div class="email-item">
          <span class="email-text">${r.email}</span>
          <span class="status-badge ${r.isValid ? 'valid-badge' : 'invalid-badge'}">
            ${r.isValid ? '✓ Valid' : '✗ Invalid'}
          </span>
        </div>
      `).join('');
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
