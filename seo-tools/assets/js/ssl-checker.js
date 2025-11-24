async function checkSSL() {
      let input = document.getElementById('urlInput').value.trim();
      
      if (!input) {
        showToast('Please enter a URL or domain', 'error');
        return;
      }

      // Extract domain from URL or use as-is
      let domain = input;
      try {
        if (input.includes('://')) {
          const urlObj = new URL(input);
          domain = urlObj.hostname;
        } else if (input.startsWith('www.') || input.includes('.')) {
          domain = input.replace(/^https?:\/\//, '').split('/')[0];
        }
      } catch (e) {
        domain = input.replace(/^https?:\/\//, '').split('/')[0];
      }

      const btn = document.getElementById('checkBtn');
      btn.disabled = true;
      btn.textContent = '⏳ Checking...';

      try {
        // Use multiple approaches to get SSL info
        const [basicCheck, certInfo] = await Promise.all([
          checkBasicSSL(domain),
          getCertificateInfo(domain)
        ]);

        displaySSLResults({
          domain: domain,
          ...basicCheck,
          ...certInfo,
          checkedAt: new Date().toLocaleString()
        });

        showToast('SSL certificate check complete!');

      } catch (error) {
        console.error('SSL check error:', error);
        displaySSLError(error.message, domain);
        showToast('Failed to verify SSL certificate', 'error');
      } finally {
        btn.disabled = false;
        btn.textContent = '🔍 Check SSL';
      }
    }

    async function checkBasicSSL(domain) {
      try {
        const startTime = Date.now();
        const response = await fetch(`https://${domain}`, { 
          method: 'HEAD', 
          mode: 'no-cors',
          cache: 'no-cache'
        });
        const responseTime = Date.now() - startTime;

        return {
          valid: true,
          protocol: 'HTTPS',
          responseTime: responseTime,
          reachable: true
        };
      } catch (error) {
        return {
          valid: false,
          protocol: 'Unknown',
          responseTime: 0,
          reachable: false,
          error: error.message
        };
      }
    }

    async function getCertificateInfo(domain) {
      try {
        // Use crt.sh API to get certificate information
        const response = await fetch(`https://crt.sh/?q=${encodeURIComponent(domain)}&output=json`, {
          headers: { 'Accept': 'application/json' }
        });

        if (!response.ok) {
          throw new Error('Could not fetch certificate data');
        }

        const data = await response.json();
        
        if (!data || data.length === 0) {
          return {
            issuer: 'Unknown',
            validFrom: 'Unknown',
            validTo: 'Unknown',
            daysRemaining: 'Unknown'
          };
        }

        // Get the most recent certificate
        const sortedCerts = data.sort((a, b) => 
          new Date(b.entry_timestamp) - new Date(a.entry_timestamp)
        );

        const latestCert = sortedCerts[0];
        const notBefore = new Date(latestCert.not_before);
        const notAfter = new Date(latestCert.not_after);
        const now = new Date();
        const daysRemaining = Math.ceil((notAfter - now) / (1000 * 60 * 60 * 24));

        return {
          issuer: latestCert.issuer_name || 'Unknown',
          commonName: latestCert.common_name || domain,
          validFrom: notBefore.toLocaleDateString(),
          validTo: notAfter.toLocaleDateString(),
          daysRemaining: daysRemaining,
          isExpired: daysRemaining < 0,
          isExpiringSoon: daysRemaining < 30 && daysRemaining >= 0,
          serialNumber: latestCert.serial_number || 'Unknown'
        };
      } catch (error) {
        console.error('Certificate info fetch error:', error);
        return {
          issuer: 'Unable to fetch',
          validFrom: 'Unknown',
          validTo: 'Unknown',
          daysRemaining: 'Unknown'
        };
      }
    }

    function displaySSLResults(data) {
      const resultCard = document.getElementById('resultCard');
      const sslStatus = document.getElementById('sslStatus');
      const certDetails = document.getElementById('certDetails');

      resultCard.style.display = 'block';

      // Determine overall status
      let statusClass = 'valid';
      let statusIcon = '🔒';
      let statusText = 'SSL Certificate Valid';
      let statusSubtext = 'Secure Connection Established';

      if (data.isExpired) {
        statusClass = 'invalid';
        statusIcon = '⚠️';
        statusText = 'SSL Certificate EXPIRED';
        statusSubtext = 'Certificate is no longer valid';
      } else if (data.isExpiringSoon) {
        statusClass = 'warning';
        statusIcon = '⚠️';
        statusText = 'Certificate Expiring Soon';
        statusSubtext = `Expires in ${data.daysRemaining} days`;
      }

      sslStatus.className = `ssl-status ${statusClass}`;
      sslStatus.innerHTML = `
        <div class="ssl-icon">${statusIcon}</div>
        <div>
          <div>${statusText}</div>
          <div style="font-size: 14px; font-weight: 400; margin-top: 5px;">${statusSubtext}</div>
        </div>
      `;

      // Build certificate details
      let detailsHTML = `
        <div class="cert-item ${statusClass}">
          <div class="cert-label">Domain</div>
          <div class="cert-value">${data.domain}</div>
        </div>
      `;

      if (data.commonName && data.commonName !== data.domain) {
        detailsHTML += `
          <div class="cert-item ${statusClass}">
            <div class="cert-label">Common Name</div>
            <div class="cert-value">${data.commonName}</div>
          </div>
        `;
      }

      detailsHTML += `
        <div class="cert-item ${statusClass}">
          <div class="cert-label">Issuer</div>
          <div class="cert-value" style="font-size: 13px; word-break: break-word;">${data.issuer}</div>
        </div>
        <div class="cert-item ${statusClass}">
          <div class="cert-label">Valid From</div>
          <div class="cert-value">${data.validFrom}</div>
        </div>
        <div class="cert-item ${statusClass}">
          <div class="cert-label">Valid To</div>
          <div class="cert-value">${data.validTo}</div>
        </div>
      `;

      if (typeof data.daysRemaining === 'number') {
        const daysClass = data.isExpired ? 'invalid' : data.isExpiringSoon ? 'warning' : 'valid';
        detailsHTML += `
          <div class="cert-item ${daysClass}">
            <div class="cert-label">Days Remaining</div>
            <div class="cert-value">${data.daysRemaining} days ${data.isExpired ? '(EXPIRED)' : data.isExpiringSoon ? '(Expiring Soon!)' : ''}</div>
          </div>
        `;
      }

      if (data.serialNumber && data.serialNumber !== 'Unknown') {
        detailsHTML += `
          <div class="cert-item">
            <div class="cert-label">Serial Number</div>
            <div class="cert-value" style="font-family: 'Consolas', monospace; font-size: 12px; word-break: break-all;">${data.serialNumber}</div>
          </div>
        `;
      }

      detailsHTML += `
        <div class="cert-item ${data.reachable ? 'valid' : 'invalid'}">
          <div class="cert-label">Connection Status</div>
          <div class="cert-value">${data.reachable ? '✓ Reachable' : '✗ Unreachable'}</div>
        </div>
        <div class="cert-item valid">
          <div class="cert-label">Last Checked</div>
          <div class="cert-value">${data.checkedAt}</div>
        </div>
      `;

      certDetails.innerHTML = detailsHTML;
    }

    function displaySSLError(error, url) {
      const resultCard = document.getElementById('resultCard');
      const sslStatus = document.getElementById('sslStatus');
      const certDetails = document.getElementById('certDetails');

      resultCard.style.display = 'block';

      sslStatus.className = 'ssl-status invalid';
      sslStatus.innerHTML = `
        <div class="ssl-icon">⚠️</div>
        <div>
          <div>SSL Verification Failed</div>
          <div style="font-size: 14px; font-weight: 400; margin-top: 5px;">Could not establish secure connection</div>
        </div>
      `;

      let urlObj;
      try {
        urlObj = new URL(url);
      } catch {
        urlObj = { hostname: url };
      }

      certDetails.innerHTML = `
        <div class="cert-item invalid">
          <div class="cert-label">Domain</div>
          <div class="cert-value">${urlObj.hostname}</div>
        </div>
        <div class="cert-item invalid">
          <div class="cert-label">Error</div>
          <div class="cert-value">${error}</div>
        </div>
        <div class="cert-item warning">
          <div class="cert-label">Possible Issues</div>
          <div class="cert-value" style="font-size: 14px; font-weight: 400;">
            • SSL certificate expired or invalid<br>
            • CORS policy blocking the request<br>
            • Website not using HTTPS<br>
            • Domain unreachable or DNS issues
          </div>
        </div>
        <div class="cert-item" style="margin-top: 10px;">
          <div class="cert-label">Checked At</div>
          <div class="cert-value">${new Date().toLocaleString()}</div>
        </div>
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
