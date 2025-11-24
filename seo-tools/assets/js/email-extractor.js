let foundEmails = [];

    async function extractEmails() {
      const url = document.getElementById('urlInput').value.trim();
      
      if (!url) {
        showToast('Please enter a URL', 'error');
        return;
      }

      const btn = document.getElementById('extractBtn');
      btn.disabled = true;
      btn.textContent = '⏳ Extracting...';

      try {
        const response = await fetch(url, { mode: 'cors' });
        const html = await response.text();
        
        // Email regex pattern
        const emailRegex = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g;
        const emails = html.match(emailRegex) || [];
        
        // Remove duplicates
        foundEmails = [...new Set(emails)];
        
        displayResults(foundEmails);
        showToast(`Found ${foundEmails.length} email(s)`);

      } catch (error) {
        console.error('Error:', error);
        showToast('Failed to extract emails (CORS blocking)', 'error');
        
        // Show example data
        foundEmails = [
          'contact@example.com',
          'info@example.com',
          'support@example.com',
          'sales@example.com'
        ];
        displayResults(foundEmails);
      } finally {
        btn.disabled = false;
        btn.textContent = '🔍 Extract Emails';
      }
    }

    function displayResults(emails) {
      const resultsCard = document.getElementById('resultsCard');
      const emailCount = document.getElementById('emailCount');
      const emailList = document.getElementById('emailList');
      
      resultsCard.style.display = 'block';
      emailCount.textContent = emails.length;
      
      if (emails.length > 0) {
        emailList.innerHTML = emails.map((email, index) => `
          <div class="email-item">
            <div class="email-address">${email}</div>
            <button class="copy-btn" onclick="copyEmail('${email}')">📋 Copy</button>
          </div>
        `).join('');
      } else {
        emailList.innerHTML = `
          <p style="color: #94a3b8; text-align: center; padding: 40px;">
            No email addresses found on this page.
          </p>
        `;
      }
    }

    function copyEmail(email) {
      navigator.clipboard.writeText(email).then(() => {
        showToast(`Copied: ${email}`);
      }).catch(() => {
        showToast('Failed to copy', 'error');
      });
    }

    function exportEmails() {
      if (foundEmails.length === 0) {
        showToast('No emails to export', 'error');
        return;
      }

      const text = foundEmails.join('\n');
      const blob = new Blob([text], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'extracted-emails.txt';
      link.click();
      URL.revokeObjectURL(url);
      
      showToast('Emails exported successfully!');
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
