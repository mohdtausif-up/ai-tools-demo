async function lookupWhois() {
      const domain = document.getElementById('domainInput').value.trim();
      
      if (!domain) {
        showToast('Please enter a domain', 'error');
        return;
      }

      const btn = document.getElementById('lookupBtn');
      btn.disabled = true;
      btn.textContent = '⏳ Looking up...';

      try {
        // Remove protocol if present
        const cleanDomain = domain.replace(/^https?:\/\//, '').split('/')[0];
        
        // Note: Real WHOIS lookup requires server-side API
        // Using simulated data for demonstration
        showToast('WHOIS lookup requires server-side API', 'error');
        
        // Show example data
        displayResults({
          domain: cleanDomain,
          registrar: 'Example Registrar, Inc.',
          registrant: 'Example Organization',
          created: '1995-08-14',
          updated: '2023-08-14',
          expires: '2024-08-13',
          status: 'clientTransferProhibited',
          nameservers: ['a.iana-servers.net', 'b.iana-servers.net'],
          raw: `Domain Name: ${cleanDomain.toUpperCase()}
Registry Domain ID: 2336799_DOMAIN_COM-VRSN
Registrar WHOIS Server: whois.example.com
Registrar URL: http://www.example.com
Updated Date: 2023-08-14T07:01:31Z
Creation Date: 1995-08-14T04:00:00Z
Registry Expiry Date: 2024-08-13T04:00:00Z
Registrar: Example Registrar, Inc.
Registrar IANA ID: 292
Registrar Abuse Contact Email: abuse@example.com
Registrar Abuse Contact Phone: +1.5555551234
Domain Status: clientTransferProhibited
Registry Registrant ID: REDACTED FOR PRIVACY
Registrant Name: REDACTED FOR PRIVACY
Registrant Organization: Example Organization
Registrant Street: REDACTED FOR PRIVACY
Registrant City: REDACTED FOR PRIVACY
Registrant State/Province: CA
Registrant Postal Code: REDACTED FOR PRIVACY
Registrant Country: US
Name Server: A.IANA-SERVERS.NET
Name Server: B.IANA-SERVERS.NET`
        });

      } catch (error) {
        console.error('Error:', error);
        showToast('Failed to lookup WHOIS', 'error');
      } finally {
        btn.disabled = false;
        btn.textContent = '🔍 Lookup';
      }
    }

    function displayResults(data) {
      const resultsCard = document.getElementById('resultsCard');
      const infoGrid = document.getElementById('infoGrid');
      const whoisRaw = document.getElementById('whoisRaw');
      
      resultsCard.style.display = 'block';
      
      infoGrid.innerHTML = `
        <div class="info-item">
          <div class="info-label">Domain Name</div>
          <div class="info-value">${data.domain}</div>
        </div>
        <div class="info-item">
          <div class="info-label">Registrar</div>
          <div class="info-value">${data.registrar}</div>
        </div>
        <div class="info-item">
          <div class="info-label">Registrant Organization</div>
          <div class="info-value">${data.registrant}</div>
        </div>
        <div class="info-item">
          <div class="info-label">Created Date</div>
          <div class="info-value">${data.created}</div>
        </div>
        <div class="info-item">
          <div class="info-label">Updated Date</div>
          <div class="info-value">${data.updated}</div>
        </div>
        <div class="info-item">
          <div class="info-label">Expires Date</div>
          <div class="info-value">${data.expires}</div>
        </div>
        <div class="info-item">
          <div class="info-label">Status</div>
          <div class="info-value">${data.status}</div>
        </div>
        <div class="info-item">
          <div class="info-label">Name Servers</div>
          <div class="info-value">${data.nameservers.join(', ')}</div>
        </div>
      `;
      
      whoisRaw.textContent = data.raw;
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
