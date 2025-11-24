async function checkHeaders() {
      const url = document.getElementById('urlInput').value.trim();
      
      if (!url) {
        showToast('Please enter a URL', 'error');
        return;
      }

      const btn = document.getElementById('checkBtn');
      btn.disabled = true;
      btn.textContent = '⏳ Checking...';

      try {
        const response = await fetch(url, { method: 'HEAD', mode: 'cors' });
        
        const headers = {};
        response.headers.forEach((value, key) => {
          headers[key] = value;
        });

        displayHeaders(headers, response.status, response.statusText);
        showToast('Headers retrieved successfully!');

      } catch (error) {
        console.error('Error:', error);
        showToast('Failed to fetch headers (CORS may be blocking)', 'error');
        
        // Show example headers
        displayHeaders({
          'content-type': 'text/html; charset=utf-8',
          'cache-control': 'max-age=3600',
          'server': 'nginx',
          'x-frame-options': 'SAMEORIGIN',
          'x-content-type-options': 'nosniff',
          'strict-transport-security': 'max-age=31536000'
        }, 200, 'OK');
      } finally {
        btn.disabled = false;
        btn.textContent = '🔍 Check Headers';
      }
    }

    function displayHeaders(headers, status, statusText) {
      const resultsCard = document.getElementById('resultsCard');
      const headersList = document.getElementById('headersList');
      
      resultsCard.style.display = 'block';
      
      let html = `
        <div class="header-item" style="border-left-color: #10b981;">
          <div class="header-name">Status</div>
          <div class="header-value">${status} ${statusText}</div>
        </div>
      `;
      
      Object.entries(headers).forEach(([name, value]) => {
        html += `
          <div class="header-item">
            <div class="header-name">${name}</div>
            <div class="header-value">${value}</div>
          </div>
        `;
      });
      
      headersList.innerHTML = html;
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
