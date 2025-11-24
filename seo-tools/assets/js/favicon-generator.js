let uploadedImage = null;

    function handleFileSelect(event) {
      const file = event.target.files[0];
      if (!file) return;

      if (!file.type.match('image.*')) {
        showToast('Please select an image file', 'error');
        return;
      }

      const reader = new FileReader();
      reader.onload = function(e) {
        uploadedImage = e.target.result;
        const preview = document.getElementById('previewImg');
        preview.src = uploadedImage;
        preview.style.display = 'block';
        document.getElementById('generateBtn').style.display = 'block';
        showToast('Image uploaded successfully!');
      };
      reader.readAsDataURL(file);
    }

    function generateFavicons() {
      if (!uploadedImage) {
        showToast('Please upload an image first', 'error');
        return;
      }

      const btn = document.getElementById('generateBtn');
      btn.disabled = true;
      btn.textContent = '⏳ Generating...';

      const sizes = [16, 32, 48, 64, 128, 256];
      
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new Image();
      
      img.onload = function() {
        const favicons = sizes.map(size => {
          canvas.width = size;
          canvas.height = size;
          ctx.clearRect(0, 0, size, size);
          ctx.drawImage(img, 0, 0, size, size);
          return {
            size: size,
            dataUrl: canvas.toDataURL('image/png')
          };
        });
        
        displayFavicons(favicons);
        showToast('Favicons generated successfully!');
        
        btn.disabled = false;
        btn.textContent = '🎯 Generate Favicons';
      };
      
      img.src = uploadedImage;
    }

    function displayFavicons(favicons) {
      const resultsCard = document.getElementById('resultsCard');
      const faviconGrid = document.getElementById('faviconGrid');
      
      resultsCard.style.display = 'block';
      
      faviconGrid.innerHTML = favicons.map(favicon => `
        <div class="favicon-item">
          <div class="favicon-preview">
            <img src="${favicon.dataUrl}" width="${favicon.size}" height="${favicon.size}" alt="${favicon.size}x${favicon.size}">
          </div>
          <div class="favicon-size">${favicon.size}x${favicon.size} px</div>
          <button class="download-btn" onclick="downloadFavicon('${favicon.dataUrl}', ${favicon.size})">
            ⬇ Download
          </button>
        </div>
      `).join('');
    }

    function downloadFavicon(dataUrl, size) {
      const link = document.createElement('a');
      link.download = `favicon-${size}x${size}.png`;
      link.href = dataUrl;
      link.click();
      showToast(`Downloaded ${size}x${size} favicon`);
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
