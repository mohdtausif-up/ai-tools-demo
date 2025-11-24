async function lookupLocation() {
      const domain = document.getElementById('domainInput').value.trim();
      
      if (!domain) {
        showToast('Please enter a domain or IP', 'error');
        return;
      }

      const btn = document.getElementById('lookupBtn');
      btn.disabled = true;
      btn.textContent = '⏳ Looking up...';

      try {
        // Remove protocol if present
        const cleanDomain = domain.replace(/^https?:\/\//, '').split('/')[0];
        
        // Use ipapi.co for free IP geolocation (no API key needed)
        const response = await fetch(`https://ipapi.co/${cleanDomain}/json/`);
        const data = await response.json();
        
        if (data.error) {
          throw new Error(data.reason || 'Lookup failed');
        }
        
        displayResults(data);
        showToast('Location found successfully!');

      } catch (error) {
        console.error('Error:', error);
        showToast('Failed to lookup location', 'error');
        
        // Show example data
        displayResults({
          ip: '93.184.216.34',
          city: 'Norwell',
          region: 'Massachusetts',
          country: 'US',
          country_name: 'United States',
          latitude: 42.1596,
          longitude: -70.8217,
          org: 'Edgecast Inc.',
          timezone: 'America/New_York'
        });
      } finally {
        btn.disabled = false;
        btn.textContent = '🔍 Lookup';
      }
    }

    function displayResults(data) {
      const resultsCard = document.getElementById('resultsCard');
      const coordinates = document.getElementById('coordinates');
      const infoGrid = document.getElementById('infoGrid');
      
      resultsCard.style.display = 'block';
      
      coordinates.textContent = `${data.latitude}, ${data.longitude}`;
      
      const countryFlag = getCountryFlag(data.country);
      
      infoGrid.innerHTML = `
        <div class="info-item">
          <div class="info-label">IP Address</div>
          <div class="info-value">${data.ip}</div>
        </div>
        <div class="info-item">
          <div class="info-label">Country</div>
          <div class="info-value">
            <span class="flag-emoji">${countryFlag}</span>${data.country_name}
          </div>
        </div>
        <div class="info-item">
          <div class="info-label">City</div>
          <div class="info-value">${data.city || 'Unknown'}</div>
        </div>
        <div class="info-item">
          <div class="info-label">Region</div>
          <div class="info-value">${data.region || 'Unknown'}</div>
        </div>
        <div class="info-item">
          <div class="info-label">Organization</div>
          <div class="info-value">${data.org || 'Unknown'}</div>
        </div>
        <div class="info-item">
          <div class="info-label">Timezone</div>
          <div class="info-value">${data.timezone || 'Unknown'}</div>
        </div>
      `;
    }

    function getCountryFlag(countryCode) {
      if (!countryCode || countryCode.length !== 2) return '🌐';
      const codePoints = countryCode
        .toUpperCase()
        .split('')
        .map(char => 127397 + char.charCodeAt());
      return String.fromCodePoint(...codePoints);
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
