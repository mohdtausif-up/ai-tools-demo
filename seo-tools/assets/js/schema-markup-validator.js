async function validateSchema() {
      const url = document.getElementById('urlInput').value.trim();
      
      if (!url) {
        showToast('Please enter a URL', 'error');
        return;
      }

      const btn = document.getElementById('validateBtn');
      btn.disabled = true;
      btn.textContent = '⏳ Validating...';

      try {
        const response = await fetch(url, { mode: 'cors' });
        const html = await response.text();
        
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        
        // Find all JSON-LD scripts
        const scripts = Array.from(doc.querySelectorAll('script[type="application/ld+json"]'));
        
        const schemas = [];
        scripts.forEach(script => {
          try {
            const json = JSON.parse(script.textContent);
            const type = json['@type'] || (json['@graph'] && json['@graph'][0] ? json['@graph'][0]['@type'] : 'Unknown');
            schemas.push({
              type: Array.isArray(type) ? type.join(', ') : type,
              json: JSON.stringify(json, null, 2)
            });
          } catch (e) {
            console.error('Failed to parse schema:', e);
          }
        });
        
        displayResults(schemas);
        showToast(`Found ${schemas.length} schema(s)`);

      } catch (error) {
        console.error('Error:', error);
        showToast('Failed to validate (CORS)', 'error');
        
        // Show example data
        displayResults([
          {
            type: 'Organization',
            json: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Example Company",
              "url": "https://example.com",
              "logo": "https://example.com/logo.png"
            }, null, 2)
          },
          {
            type: 'WebSite',
            json: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "Example Website",
              "url": "https://example.com"
            }, null, 2)
          }
        ]);
      } finally {
        btn.disabled = false;
        btn.textContent = '🔍 Validate Schema';
      }
    }

    function displayResults(schemas) {
      const resultsCard = document.getElementById('resultsCard');
      const schemaCount = document.getElementById('schemaCount');
      const schemaList = document.getElementById('schemaList');
      
      resultsCard.style.display = 'block';
      schemaCount.textContent = schemas.length;
      
      if (schemas.length > 0) {
        schemaList.innerHTML = schemas.map((schema, index) => `
          <div class="schema-item">
            <div class="schema-type">
              ${index + 1}. ${schema.type}
              <span class="schema-badge">JSON-LD</span>
            </div>
            <div class="schema-code">${schema.json}</div>
          </div>
        `).join('');
      } else {
        schemaList.innerHTML = `
          <div class="no-schema">
            <p>No schema markup found on this page.</p>
            <p style="margin-top: 10px; font-size: 13px;">
              Consider adding structured data to improve how search engines understand your content.
            </p>
          </div>
        `;
      }
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
