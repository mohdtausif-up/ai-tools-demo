let capturedImage = null;
    let screenshotBlob = null;

    async function captureScreenshot() {
      const url = document.getElementById('urlInput').value.trim();
      const width = parseInt(document.getElementById('widthInput').value) || 1920;
      const height = parseInt(document.getElementById('heightInput').value) || 1080;

      if (!url) {
        showToast('Please enter a URL', 'error');
        return;
      }

      const btn = document.getElementById('captureBtn');
      btn.disabled = true;
      btn.textContent = '⏳ Capturing...';

      try {
        const previewArea = document.getElementById('previewArea');
        previewArea.innerHTML = '<p style="color: #64748b;">📸 Taking screenshot...</p>';

        let formattedUrl = url;
        if (!url.startsWith('http://') && !url.startsWith('https://')) {
          formattedUrl = 'https://' + url;
        }

        // Use Screenshot.one API (free, no API key required for basic usage)
        // Alternative: Use thum.io or other free services
        const apiUrl = `https://image.thum.io/get/width/${width}/crop/${height}/${encodeURIComponent(formattedUrl)}`;
        
        // Try to fetch the screenshot
        const response = await fetch(apiUrl);
        
        if (!response.ok) {
          throw new Error('Failed to capture screenshot');
        }

        screenshotBlob = await response.blob();
        const imageUrl = URL.createObjectURL(screenshotBlob);
        
        const img = document.createElement('img');
        img.src = imageUrl;
        img.onload = () => {
          previewArea.innerHTML = '';
          previewArea.appendChild(img);
          capturedImage = imageUrl;
          document.getElementById('downloadBtn').disabled = false;
          showToast('Screenshot captured successfully!');
        };
        img.onerror = () => {
          throw new Error('Failed to display screenshot');
        };

      } catch (error) {
        console.error('Screenshot error:', error);
        
        // Fallback to direct image method
        try {
          const previewArea = document.getElementById('previewArea');
          const fallbackUrl = `https://image.thum.io/get/width/${width}/crop/${height}/${encodeURIComponent(
            url.startsWith('http') ? url : 'https://' + url
          )}`;
          
          const img = document.createElement('img');
          img.style.maxWidth = '100%';
          img.src = fallbackUrl;
          
          img.onload = () => {
            previewArea.innerHTML = '';
            previewArea.appendChild(img);
            capturedImage = fallbackUrl;
            document.getElementById('downloadBtn').disabled = false;
            showToast('Screenshot captured!');
          };
          
          img.onerror = () => {
            previewArea.innerHTML = `
              <div style="color: #ef4444; padding: 20px; text-align: center;">
                <p style="font-size: 18px; margin-bottom: 10px;">❌ Could not capture screenshot</p>
                <p style="font-size: 14px; color: #64748b;">The website may block screenshots or the API is rate-limited.</p>
                <p style="font-size: 12px; margin-top: 15px; color: #94a3b8;">
                  Alternative free services:<br>
                  • thum.io<br>
                  • screenshot.rocks<br>
                  • microlink.io
                </p>
              </div>
            `;
            showToast('Screenshot capture failed', 'error');
          };
          
        } catch (fallbackError) {
          document.getElementById('previewArea').innerHTML = `
            <div style="color: #ef4444; padding: 20px; text-align: center;">
              <p style="font-size: 18px; margin-bottom: 10px;">❌ Screenshot Failed</p>
              <p style="font-size: 14px; color: #64748b;">${error.message}</p>
            </div>
          `;
          showToast('Screenshot capture failed', 'error');
        }
      } finally {
        btn.disabled = false;
        btn.textContent = '📷 Capture Screenshot';
      }
    }

    async function downloadScreenshot() {
      if (!capturedImage && !screenshotBlob) {
        showToast('No screenshot to download', 'error');
        return;
      }

      try {
        const url = document.getElementById('urlInput').value.trim();
        const domain = url.replace(/^https?:\/\//, '').replace(/\//g, '_').substring(0, 50);
        const filename = `screenshot-${domain}-${Date.now()}.png`;

        if (screenshotBlob) {
          // Download from blob
          const url = URL.createObjectURL(screenshotBlob);
          const link = document.createElement('a');
          link.href = url;
          link.download = filename;
          link.click();
          URL.revokeObjectURL(url);
        } else if (capturedImage) {
          // Try to download from URL
          const response = await fetch(capturedImage);
          const blob = await response.blob();
          const url = URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = url;
          link.download = filename;
          link.click();
          URL.revokeObjectURL(url);
        }

        showToast('Screenshot downloaded!');
      } catch (error) {
        console.error('Download error:', error);
        showToast('Download failed - try right-clicking the image and saving manually', 'error');
      }
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
