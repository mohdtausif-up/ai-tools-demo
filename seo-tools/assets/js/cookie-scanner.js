// Set current domain
    document.getElementById('domainInput').value = window.location.hostname || 'localhost';

    function scanCookies() {
      const btn = document.getElementById('scanBtn');
      btn.disabled = true;
      btn.textContent = '⏳ Scanning...';

      setTimeout(() => {
        const cookies = document.cookie;
        
        if (!cookies) {
          showToast('No cookies found on this domain', 'error');
          displayNoCookies();
        } else {
          const cookieArray = parseCookies(cookies);
          displayResults(cookieArray);
          showToast(`Found ${cookieArray.length} cookies`);
        }
        
        btn.disabled = false;
        btn.textContent = '🔍 Scan Cookies';
      }, 500);
    }

    function parseCookies(cookieString) {
      if (!cookieString) return [];
      
      const cookies = [];
      const pairs = cookieString.split(';');
      
      pairs.forEach(pair => {
        const [name, ...valueParts] = pair.split('=');
        const value = valueParts.join('=');
        
        cookies.push({
          name: name.trim(),
          value: value.trim(),
          secure: cookieString.includes('Secure'),
          httpOnly: false // Can't detect from document.cookie
        });
      });
      
      return cookies;
    }

    function displayResults(cookies) {
      const resultsCard = document.getElementById('resultsCard');
      resultsCard.style.display = 'block';
      
      const totalCookies = cookies.length;
      const secureCookies = cookies.filter(c => c.secure).length;
      const sessionCookies = cookies.filter(c => !c.value.includes('expires')).length;
      
      document.getElementById('totalCookies').textContent = totalCookies;
      document.getElementById('secureCookies').textContent = secureCookies;
      document.getElementById('thirdPartyCookies').textContent = sessionCookies;
      
      const cookieList = document.getElementById('cookieList');
      
      if (cookies.length > 0) {
        cookieList.innerHTML = `
          <table class="cookie-table">
            <thead>
              <tr>
                <th>Cookie Name</th>
                <th>Value</th>
                <th>Security</th>
              </tr>
            </thead>
            <tbody>
              ${cookies.map(cookie => `
                <tr>
                  <td class="cookie-name">${cookie.name}</td>
                  <td class="cookie-value" title="${cookie.value}">${cookie.value || '(empty)'}</td>
                  <td>
                    <span class="badge ${cookie.secure ? 'secure' : 'not-secure'}">
                      ${cookie.secure ? '🔒 Secure' : '⚠ Not Secure'}
                    </span>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        `;
      } else {
        displayNoCookies();
      }
    }

    function displayNoCookies() {
      const resultsCard = document.getElementById('resultsCard');
      resultsCard.style.display = 'block';
      
      document.getElementById('totalCookies').textContent = '0';
      document.getElementById('secureCookies').textContent = '0';
      document.getElementById('thirdPartyCookies').textContent = '0';
      
      const cookieList = document.getElementById('cookieList');
      cookieList.innerHTML = `
        <p style="color: #94a3b8; text-align: center; padding: 40px;">
          No cookies found on this domain. Try visiting a website that uses cookies.
        </p>
      `;
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

    // Auto-scan on load
    window.addEventListener('load', () => {
      setTimeout(() => scanCookies(), 1000);
    });
