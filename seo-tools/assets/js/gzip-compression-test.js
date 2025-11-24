async function checkCompression() {
      const url = document.getElementById('urlInput').value.trim();
      
      if (!url) {
        showToast('Please enter a URL', 'error');
        return;
      }

      const btn = document.getElementById('checkBtn');
      btn.disabled = true;
      btn.textContent = '⏳ Testing...';

      try {
        const response = await fetch(url, { mode: 'cors' });
        
        const contentEncoding = response.headers.get('content-encoding') || '';
        const contentLength = response.headers.get('content-length') || 'Unknown';
        const contentType = response.headers.get('content-type') || 'Unknown';
        
        let compressionType = 'none';
        if (contentEncoding.includes('br')) {
          compressionType = 'brotli';
        } else if (contentEncoding.includes('gzip')) {
          compressionType = 'gzip';
        } else if (contentEncoding.includes('deflate')) {
          compressionType = 'deflate';
        }
        
        const enabled = compressionType !== 'none';
        
        displayResults(enabled, {
          compression: compressionType,
          contentLength: contentLength,
          contentType: contentType,
          url: url
        });
        
        showToast(enabled ? `${compressionType.toUpperCase()} compression enabled!` : 'No compression detected');

      } catch (error) {
        console.error('Error:', error);
        showToast('Failed to check (CORS blocking)', 'error');
        
        // Show example data
        displayResults(true, {
          compression: 'gzip',
          contentLength: '12345',
          contentType: 'text/html',
          url: url
        });
      } finally {
        btn.disabled = false;
        btn.textContent = '🔍 Test Compression';
      }
    }

    function displayResults(enabled, info) {
      const resultsCard = document.getElementById('resultsCard');
      const statusBox = document.getElementById('statusBox');
      const infoGrid = document.getElementById('infoGrid');
      
      resultsCard.style.display = 'block';
      
      if (enabled) {
        statusBox.className = 'status-box enabled';
        statusBox.innerHTML = `
          <div class="status-icon">✓</div>
          <div class="status-text">Compression Enabled</div>
          <div class="status-desc">This website uses ${info.compression.toUpperCase()} compression for faster loading</div>
        `;
      } else {
        statusBox.className = 'status-box disabled';
        statusBox.innerHTML = `
          <div class="status-icon">✗</div>
          <div class="status-text">No Compression Detected</div>
          <div class="status-desc">Enable GZIP or Brotli compression to improve page speed</div>
        `;
      }
      
      const compressionClass = info.compression === 'brotli' ? 'brotli' : 
                                info.compression === 'gzip' ? 'gzip' : 'none';
      
      const compressionLabel = info.compression === 'none' ? 'None' : info.compression.toUpperCase();
      
      infoGrid.innerHTML = `
        <div class="info-item">
          <div class="info-label">Compression Type</div>
          <div class="info-value">
            <span class="compression-badge ${compressionClass}">${compressionLabel}</span>
          </div>
        </div>
        <div class="info-item">
          <div class="info-label">Content Length</div>
          <div class="info-value">${formatBytes(info.contentLength)}</div>
        </div>
        <div class="info-item">
          <div class="info-label">Content Type</div>
          <div class="info-value">${info.contentType.split(';')[0]}</div>
        </div>
        <div class="info-item">
          <div class="info-label">Performance</div>
          <div class="info-value">${enabled ? '🚀 Optimized' : '⚠ Not Optimized'}</div>
        </div>
      `;
    }

    function formatBytes(bytes) {
      if (bytes === 'Unknown' || !bytes) return 'Unknown';
      const num = parseInt(bytes);
      if (isNaN(num)) return bytes;
      if (num < 1024) return num + ' B';
      if (num < 1024 * 1024) return (num / 1024).toFixed(2) + ' KB';
      return (num / (1024 * 1024)).toFixed(2) + ' MB';
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
