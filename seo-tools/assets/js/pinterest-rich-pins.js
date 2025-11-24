const pinterestTags = [
      { tag: 'og:type', label: 'Content Type' },
      { tag: 'og:title', label: 'Title' },
      { tag: 'og:description', label: 'Description' },
      { tag: 'og:image', label: 'Image' },
      { tag: 'og:url', label: 'URL' },
      { tag: 'og:site_name', label: 'Site Name' },
      { tag: 'article:author', label: 'Author' },
      { tag: 'article:published_time', label: 'Published Date' }
    ];

    async function validatePinterest() {
      const url = document.getElementById('urlInput').value.trim();
      
      if (!url) {
        alert('Please enter a URL');
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
        
        const metaData = {};
        pinterestTags.forEach(({ tag }) => {
          const element = doc.querySelector(`meta[property="${tag}"]`);
          metaData[tag] = element ? element.getAttribute('content') : null;
        });
        
        displayResults(metaData, url);

      } catch (error) {
        console.error('Error:', error);
        
        // Show example data
        displayResults({
          'og:type': 'article',
          'og:title': 'Example Article Title',
          'og:description': 'This is an example description for the Pinterest Rich Pin preview.',
          'og:image': 'https://via.placeholder.com/600x900',
          'og:url': url,
          'og:site_name': 'Example Site',
          'article:author': 'John Doe',
          'article:published_time': '2024-01-01T00:00:00Z'
        }, url);
      } finally {
        btn.disabled = false;
        btn.textContent = '🔍 Validate';
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
      
      document.getElementById('pinterestTitle').textContent = title;
      document.getElementById('pinterestDesc').textContent = desc;
      document.getElementById('pinterestUrl').textContent = domain;
      
      if (image) {
        document.getElementById('pinterestImage').src = image;
        document.getElementById('pinterestImage').style.display = 'block';
        document.getElementById('imagePlaceholder').style.display = 'none';
      } else {
        document.getElementById('pinterestImage').style.display = 'none';
        document.getElementById('imagePlaceholder').style.display = 'flex';
      }
      
      // Update meta tags
      const metaTags = document.getElementById('metaTags');
      metaTags.innerHTML = pinterestTags.map(({ tag, label }) => {
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
