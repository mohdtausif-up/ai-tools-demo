async function performLookup() {
      const domain = document.getElementById('domainInput').value.trim();
      
      if (!domain) {
        showToast('Please enter a domain name', 'error');
        return;
      }

      const btn = document.getElementById('lookupBtn');
      btn.disabled = true;
      btn.textContent = '⏳ Looking up...';

      try {
        // Use Google Public DNS API
        const dnsData = await fetchDNSRecords(domain);
        displayResults(dnsData);
        showToast('DNS lookup complete!');

      } catch (error) {
        console.error('DNS lookup error:', error);
        showToast('DNS lookup failed: ' + error.message, 'error');
      } finally {
        btn.disabled = false;
        btn.textContent = '🔍 DNS Lookup';
      }
    }

    async function fetchDNSRecords(domain) {
      const recordTypes = {
        A: 1,
        AAAA: 28,
        MX: 15,
        NS: 2,
        TXT: 16,
        CNAME: 5,
        SOA: 6
      };

      const results = {
        a: [],
        aaaa: [],
        mx: [],
        ns: [],
        txt: [],
        cname: null,
        soa: null
      };

      // Fetch all record types in parallel
      const promises = Object.entries(recordTypes).map(async ([type, typeId]) => {
        try {
          const response = await fetch(
            `https://dns.google/resolve?name=${encodeURIComponent(domain)}&type=${typeId}`,
            { headers: { 'Accept': 'application/dns-json' } }
          );
          
          if (!response.ok) return null;
          
          const data = await response.json();
          return { type, data };
        } catch (error) {
          console.error(`Failed to fetch ${type} records:`, error);
          return null;
        }
      });

      const responses = await Promise.all(promises);

      // Process responses
      for (const result of responses) {
        if (!result || !result.data || !result.data.Answer) continue;

        const { type, data } = result;

        switch (type) {
          case 'A':
            results.a = data.Answer.map(record => record.data);
            break;
          
          case 'AAAA':
            results.aaaa = data.Answer.map(record => record.data);
            break;
          
          case 'MX':
            results.mx = data.Answer.map(record => {
              const parts = record.data.split(' ');
              return {
                priority: parseInt(parts[0]),
                server: parts[1]
              };
            }).sort((a, b) => a.priority - b.priority);
            break;
          
          case 'NS':
            results.ns = data.Answer.map(record => record.data);
            break;
          
          case 'TXT':
            results.txt = data.Answer.map(record => record.data.replace(/"/g, ''));
            break;
          
          case 'CNAME':
            results.cname = data.Answer.map(record => record.data);
            break;
          
          case 'SOA':
            if (data.Answer.length > 0) {
              const soaParts = data.Answer[0].data.split(' ');
              results.soa = {
                mname: soaParts[0],
                rname: soaParts[1],
                serial: parseInt(soaParts[2]),
                refresh: parseInt(soaParts[3]),
                retry: parseInt(soaParts[4]),
                expire: parseInt(soaParts[5]),
                minimum: parseInt(soaParts[6])
              };
            }
            break;
        }
      }

      return results;
    }

    function displayResults(data) {
      const resultsGrid = document.getElementById('resultsGrid');
      resultsGrid.innerHTML = '';

      // A Records
      if (data.a && data.a.length > 0) {
        resultsGrid.innerHTML += createRecordCard(
          '🎯',
          'A Records',
          'IPv4 Addresses',
          data.a
        );
      }

      // AAAA Records
      if (data.aaaa && data.aaaa.length > 0) {
        resultsGrid.innerHTML += createRecordCard(
          '🌐',
          'AAAA Records',
          'IPv6 Addresses',
          data.aaaa
        );
      }

      // MX Records
      if (data.mx && data.mx.length > 0) {
        const mxRecords = data.mx.map(mx => `Priority: ${mx.priority} → ${mx.server}`);
        resultsGrid.innerHTML += createRecordCard(
          '📧',
          'MX Records',
          'Mail Servers',
          mxRecords
        );
      }

      // NS Records
      if (data.ns && data.ns.length > 0) {
        resultsGrid.innerHTML += createRecordCard(
          '🖥️',
          'NS Records',
          'Name Servers',
          data.ns
        );
      }

      // TXT Records
      if (data.txt && data.txt.length > 0) {
        resultsGrid.innerHTML += createRecordCard(
          '📝',
          'TXT Records',
          'Text Records',
          data.txt
        );
      }

      // CNAME Records
      if (data.cname) {
        resultsGrid.innerHTML += createRecordCard(
          '🔗',
          'CNAME Record',
          'Canonical Name',
          data.cname
        );
      }

      // SOA Record
      if (data.soa) {
        const soaInfo = [
          `Primary NS: ${data.soa.mname}`,
          `Admin Email: ${data.soa.rname}`,
          `Serial: ${data.soa.serial}`,
          `Refresh: ${data.soa.refresh}s`,
          `Retry: ${data.soa.retry}s`,
          `Expire: ${data.soa.expire}s`,
          `Minimum TTL: ${data.soa.minimum}s`
        ];
        resultsGrid.innerHTML += createRecordCard(
          '⚙️',
          'SOA Record',
          'Start of Authority',
          soaInfo
        );
      }
    }

    function createRecordCard(icon, title, type, records) {
      const recordItems = records.map(record => 
        `<div class="record-item">${record}</div>`
      ).join('');

      return `
        <div class="record-card">
          <div class="record-header">
            <div class="record-icon">${icon}</div>
            <div class="record-title">${title}</div>
            <div class="record-type">${type}</div>
          </div>
          <div class="record-list">
            ${recordItems}
          </div>
        </div>
      `;
    }

    function showToast(message, type = 'success') {
      const existingToast = document.querySelector('.toast');
      if (existingToast) existingToast.remove();
      
      const toast = document.createElement('div');
      toast.className = 'toast';
      toast.style.background = type === 'error' ? '#ef4444' : type === 'warning' ? '#f59e0b' : '#10b981';
      toast.textContent = message;
      document.body.appendChild(toast);
      
      setTimeout(() => toast.remove(), 3000);
    }

    // Show example on load
    window.addEventListener('load', () => {
      setTimeout(() => performLookup(), 500);
    });
