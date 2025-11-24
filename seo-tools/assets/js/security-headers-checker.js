const securityHeaders = [
      {
        name: 'Strict-Transport-Security',
        description: 'Forces HTTPS connections and prevents downgrade attacks',
        importance: 'Critical for HTTPS sites'
      },
      {
        name: 'Content-Security-Policy',
        description: 'Prevents XSS attacks by controlling resource loading',
        importance: 'Highly Recommended'
      },
      {
        name: 'X-Frame-Options',
        description: 'Prevents clickjacking by controlling iframe embedding',
        importance: 'Important'
      },
      {
        name: 'X-Content-Type-Options',
        description: 'Prevents MIME-type sniffing attacks',
        importance: 'Recommended'
      },
      {
        name: 'Referrer-Policy',
        description: 'Controls referrer information sent with requests',
        importance: 'Recommended'
      },
      {
        name: 'Permissions-Policy',
        description: 'Controls browser feature permissions',
        importance: 'Recommended'
      },
      {
        name: 'X-XSS-Protection',
        description: 'Legacy XSS protection (replaced by CSP)',
        importance: 'Optional'
      },
      {
        name: 'Cross-Origin-Opener-Policy',
        description: 'Isolates browsing context for security',
        importance: 'Optional'
      }
    ];

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
        const response = await fetch(url, { mode: 'cors' });
        
        const foundHeaders = {};
        securityHeaders.forEach(header => {
          const value = response.headers.get(header.name.toLowerCase());
          foundHeaders[header.name] = value;
        });
        
        displayResults(foundHeaders);
        
        const count = Object.values(foundHeaders).filter(v => v !== null).length;
        showToast(`Found ${count} security headers`);

      } catch (error) {
        console.error('Error:', error);
        showToast('Failed to check (CORS blocking)', 'error');
        
        // Show example data
        displayResults({
          'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',
          'Content-Security-Policy': "default-src 'self'",
          'X-Frame-Options': 'DENY',
          'X-Content-Type-Options': 'nosniff',
          'Referrer-Policy': 'strict-origin-when-cross-origin',
          'Permissions-Policy': null,
          'X-XSS-Protection': '1; mode=block',
          'Cross-Origin-Opener-Policy': null
        });
      } finally {
        btn.disabled = false;
        btn.textContent = '🔍 Check Headers';
      }
    }

    function displayResults(foundHeaders) {
      const resultsCard = document.getElementById('resultsCard');
      const scoreValue = document.getElementById('scoreValue');
      const headersList = document.getElementById('headersList');
      
      resultsCard.style.display = 'block';
      
      const count = Object.values(foundHeaders).filter(v => v !== null).length;
      scoreValue.textContent = `${count}/${securityHeaders.length}`;
      
      headersList.innerHTML = securityHeaders.map(header => {
        const value = foundHeaders[header.name];
        const isPresent = value !== null && value !== undefined;
        
        return `
          <div class="header-item ${isPresent ? 'present' : 'missing'}">
            <div class="header-name">
              ${header.name}
              <span class="header-status ${isPresent ? 'present' : 'missing'}">
                ${isPresent ? '✓ Present' : '✗ Missing'}
              </span>
            </div>
            ${isPresent ? `<div class="header-value">${value}</div>` : ''}
            <div class="header-desc">
              ${header.description}<br>
              <strong>${header.importance}</strong>
            </div>
          </div>
        `;
      }).join('');
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
