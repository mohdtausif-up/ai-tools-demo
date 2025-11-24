async function checkImages() {
      const url = document.getElementById('urlInput').value.trim();
      
      if (!url) {
        showToast('Please enter a URL', 'error');
        return;
      }

      const btn = document.getElementById('checkBtn');
      btn.disabled = true;
      btn.textContent = '⏳ Checking...';

      try {
        const response = await fetch(url, { mode: 'cors' });
        const html = await response.text();
        
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        const images = Array.from(doc.querySelectorAll('img'));
        
        const imageData = images.map(img => {
          const src = img.getAttribute('src') || img.getAttribute('data-src') || 'No src';
          const alt = img.getAttribute('alt');
          
          let status = 'no-alt';
          if (alt !== null) {
            status = alt.trim() === '' ? 'empty-alt' : 'has-alt';
          }
          
          return {
            src: src,
            alt: alt,
            status: status
          };
        });
        
        displayResults(imageData);
        showToast(`Analyzed ${imageData.length} images`);

      } catch (error) {
        console.error('Error:', error);
        showToast('Failed to check images (CORS blocking)', 'error');
        
        // Show example data
        displayResults([
          { src: 'https://example.com/logo.png', alt: 'Company Logo', status: 'has-alt' },
          { src: 'https://example.com/banner.jpg', alt: '', status: 'empty-alt' },
          { src: 'https://example.com/product.jpg', alt: null, status: 'no-alt' },
          { src: 'https://example.com/icon.svg', alt: 'Search Icon', status: 'has-alt' },
          { src: 'https://example.com/photo.png', alt: null, status: 'no-alt' }
        ]);
      } finally {
        btn.disabled = false;
        btn.textContent = '🔍 Check Images';
      }
    }

    function displayResults(imageData) {
      const resultsCard = document.getElementById('resultsCard');
      const imageList = document.getElementById('imageList');
      
      resultsCard.style.display = 'block';
      
      const totalImages = imageData.length;
      const hasAlt = imageData.filter(img => img.status === 'has-alt').length;
      const noAlt = imageData.filter(img => img.status === 'no-alt' || img.status === 'empty-alt').length;
      
      document.getElementById('totalImages').textContent = totalImages;
      document.getElementById('hasAlt').textContent = hasAlt;
      document.getElementById('noAlt').textContent = noAlt;
      
      if (imageData.length > 0) {
        imageList.innerHTML = imageData.map(img => {
          const badgeClass = img.status;
          const badgeText = img.status === 'has-alt' ? '✓ Has Alt' : 
                           img.status === 'empty-alt' ? '⚠ Empty Alt' : 
                           '✗ No Alt';
          
          return `
            <div class="image-item ${badgeClass}">
              <div class="image-header">
                <div class="image-src">${img.src}</div>
                <div class="image-badge ${badgeClass}">${badgeText}</div>
              </div>
              ${img.alt !== null ? `<div class="alt-text">Alt: "${img.alt}"</div>` : ''}
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
