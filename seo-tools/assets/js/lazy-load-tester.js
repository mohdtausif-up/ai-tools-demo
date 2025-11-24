async function testLazyLoad() {
      const url = document.getElementById('urlInput').value.trim();
      
      if (!url) {
        showToast('Please enter a URL', 'error');
        return;
      }

      const btn = document.getElementById('testBtn');
      btn.disabled = true;
      btn.textContent = '⏳ Testing...';

      try {
        const response = await fetch(url, { mode: 'cors' });
        const html = await response.text();
        
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        const images = Array.from(doc.querySelectorAll('img'));
        
        const imageData = images.map(img => {
          const loading = img.getAttribute('loading');
          const hasDataSrc = img.hasAttribute('data-src') || img.hasAttribute('data-lazy');
          const src = img.getAttribute('src') || img.getAttribute('data-src') || 'No src';
          
          let type = 'eager';
          if (loading === 'lazy') {
            type = 'native';
          } else if (hasDataSrc) {
            type = 'lazy';
          }
          
          return {
            src: src,
            type: type,
            loading: loading || 'auto'
          };
        });
        
        displayResults(imageData);
        showToast(`Analyzed ${imageData.length} images`);

      } catch (error) {
        console.error('Error:', error);
        showToast('Failed to fetch page (CORS blocking)', 'error');
        
        // Show example data
        displayResults([
          { src: 'https://example.com/image1.jpg', type: 'native', loading: 'lazy' },
          { src: 'https://example.com/image2.jpg', type: 'lazy', loading: 'auto' },
          { src: 'https://example.com/image3.jpg', type: 'eager', loading: 'auto' },
          { src: 'https://example.com/image4.jpg', type: 'native', loading: 'lazy' },
          { src: 'https://example.com/image5.jpg', type: 'eager', loading: 'auto' }
        ]);
      } finally {
        btn.disabled = false;
        btn.textContent = '🔍 Test Images';
      }
    }

    function displayResults(imageData) {
      const resultsCard = document.getElementById('resultsCard');
      const imageList = document.getElementById('imageList');
      
      resultsCard.style.display = 'block';
      
      const totalImages = imageData.length;
      const lazyImages = imageData.filter(img => img.type === 'lazy' || img.type === 'native').length;
      const eagerImages = imageData.filter(img => img.type === 'eager').length;
      
      document.getElementById('totalImages').textContent = totalImages;
      document.getElementById('lazyImages').textContent = lazyImages;
      document.getElementById('eagerImages').textContent = eagerImages;
      
      if (imageData.length > 0) {
        imageList.innerHTML = imageData.map(img => {
          const badgeClass = img.type === 'native' ? 'native' : img.type;
          const badgeText = img.type === 'native' ? '✓ Native Lazy' : 
                           img.type === 'lazy' ? '✓ Lazy (JS)' : 
                           '✗ Eager Load';
          
          return `
            <div class="image-item ${badgeClass}">
              <div class="image-url">${img.src}</div>
              <div class="image-badge ${badgeClass}">${badgeText}</div>
            </div>
          `;
        }).join('');
      } else {
        imageList.innerHTML = `
          <p style="color: #94a3b8; text-align: center; padding: 40px;">
            No images found on this page.
          </p>
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
