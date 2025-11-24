const whatsappTags = [
      { tag: 'og:title', label: 'Title' },
      { tag: 'og:description', label: 'Description' },
      { tag: 'og:image', label: 'Image' },
      { tag: 'og:url', label: 'URL' },
      { tag: 'og:type', label: 'Type' },
      { tag: 'og:site_name', label: 'Site Name' }
    ];

    async function validateWhatsApp() {
      const url = document.getElementById('urlInput').value.trim();
      
      if (!url) {
        alert('Please enter a URL');
        return;
      }

      const btn = document.getElementById('validateBtn');
      btn.disabled = true;
      btn.textContent = '⏳ Loading...';

      try {
        const response = await fetch(url, { mode: 'cors' });
        const html = await response.text();
        
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        
        const metaData = {};
        whatsappTags.forEach(({ tag }) => {
          const element = doc.querySelector(`meta[property="${tag}"]`);
          metaData[tag] = element ? element.getAttribute('content') : null;
        });
        
        displayResults(metaData, url);

      } catch (error) {
        console.error('Error:', error);
        
        // Show example data
        displayResults({
          'og:title': 'Example Page Title',
          'og:description': 'This is an example description for the WhatsApp link preview.',
          'og:image': 'https://via.placeholder.com/800x400',
          'og:url': url,
          'og:type': 'website',
          'og:site_name': 'Example Site'
        }, url);
      } finally {
        btn.disabled = false;
        btn.textContent = '🔍 Preview';
      }
    }

    function displayResults(metaData, url) {
      const resultsGrid = document.getElementById('resultsGrid');
      resultsGrid.style.display = 'grid';
      
      // Update preview
      const title = metaData['og:title'] || 'No Title';
      const desc = metaData['og:description'] || 'No description available';
      const image = metaData['og:image'];
      const domain = new URL(url).hostname;
      
      document.getElementById('whatsappTitle').textContent = title;
      document.getElementById('whatsappDesc').textContent = desc;
      document.getElementById('whatsappUrl').textContent = domain;
      
      if (image) {
        document.getElementById('whatsappImage').src = image;
        document.getElementById('whatsappImage').style.display = 'block';
        document.getElementById('imagePlaceholder').style.display = 'none';
      } else {
        document.getElementById('whatsappImage').style.display = 'none';
        document.getElementById('imagePlaceholder').style.display = 'flex';
      }
      
      // Update meta tags
      const metaTags = document.getElementById('metaTags');
      metaTags.innerHTML = whatsappTags.map(({ tag, label }) => {
        const value = metaData[tag];
        const found = value !== null;
        
        return `
          <div class="meta-item ${found ? 'found' : 'missing'}">
            <div class="meta-label">
              ${label}
              <span class="status-badge ${found ? 'found' : 'missing'}">
                ${found ? '✓' : '✗'}
              </span>
            </div>
            ${found ? `<div class="meta-value">${value}</div>` : '<div class="meta-value" style="color: #ef4444;">Not found</div>'}
          </div>
        `;
      }).join('');
    }
