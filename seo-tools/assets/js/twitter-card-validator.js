const twitterTags = [
      { tag: 'twitter:card', label: 'Card Type' },
      { tag: 'twitter:title', label: 'Title' },
      { tag: 'twitter:description', label: 'Description' },
      { tag: 'twitter:image', label: 'Image' },
      { tag: 'twitter:site', label: 'Site Handle' },
      { tag: 'twitter:creator', label: 'Creator Handle' }
    ];

    async function validateTwitterCard() {
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
        twitterTags.forEach(({ tag }) => {
          const element = doc.querySelector(`meta[name="${tag}"], meta[property="${tag}"]`);
          metaData[tag] = element ? element.getAttribute('content') : null;
        });
        
        displayResults(metaData, url);

      } catch (error) {
        console.error('Error:', error);
        
        // Show example data
        displayResults({
          'twitter:card': 'summary_large_image',
          'twitter:title': 'Example Page Title',
          'twitter:description': 'This is an example description for the Twitter card preview.',
          'twitter:image': 'https://via.placeholder.com/800x400',
          'twitter:site': '@example',
          'twitter:creator': '@creator'
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
      const title = metaData['twitter:title'] || 'No Title';
      const desc = metaData['twitter:description'] || 'No description available';
      const image = metaData['twitter:image'];
      const domain = new URL(url).hostname;
      
      document.getElementById('twitterTitle').textContent = title;
      document.getElementById('twitterDesc').textContent = desc;
      document.getElementById('twitterUrl').textContent = domain;
      
      if (image) {
        document.getElementById('twitterImage').src = image;
        document.getElementById('twitterImage').style.display = 'block';
        document.getElementById('imagePlaceholder').style.display = 'none';
      } else {
        document.getElementById('twitterImage').style.display = 'none';
        document.getElementById('imagePlaceholder').style.display = 'flex';
      }
      
      // Update meta tags
      const metaTags = document.getElementById('metaTags');
      metaTags.innerHTML = twitterTags.map(({ tag, label }) => {
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
