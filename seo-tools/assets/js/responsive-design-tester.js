let currentDevice = 'mobile';
    let currentOrientation = 'portrait';

    const deviceDimensions = {
      mobile: { portrait: { width: 375, height: 667 }, landscape: { width: 667, height: 375 } },
      tablet: { portrait: { width: 768, height: 1024 }, landscape: { width: 1024, height: 768 } },
      laptop: { portrait: { width: 1366, height: 768 }, landscape: { width: 1366, height: 768 } },
      desktop: { portrait: { width: 1920, height: 1080 }, landscape: { width: 1920, height: 1080 } }
    };

    function loadWebsite() {
      const url = document.getElementById('urlInput').value.trim();
      if (!url) {
        showToast('Please enter a URL', 'error');
        return;
      }

      let formattedUrl = url;
      if (!url.startsWith('http://') && !url.startsWith('https://')) {
        formattedUrl = 'https://' + url;
      }

      const iframe = document.getElementById('previewFrame');
      iframe.src = formattedUrl;
      showToast('Loading website...');
    }

    function selectDevice(device) {
      currentDevice = device;
      document.querySelectorAll('.device-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.device === device);
      });
      
      const frame = document.getElementById('deviceFrame');
      frame.className = `device-frame ${device}`;
      
      updateDimensions();
    }

    function setOrientation(orientation) {
      if (currentDevice === 'laptop' || currentDevice === 'desktop') {
        showToast('Orientation not available for this device', 'warning');
        return;
      }

      currentOrientation = orientation;
      document.querySelectorAll('.orientation-btn').forEach(btn => {
        btn.classList.toggle('active', btn.textContent.includes(orientation === 'portrait' ? 'Portrait' : 'Landscape'));
      });
      
      updateDimensions();
    }

    function updateDimensions() {
      const frame = document.getElementById('deviceFrame');
      const dims = deviceDimensions[currentDevice][currentOrientation];
      
      if (currentDevice === 'mobile') {
        frame.style.width = dims.width + 'px';
        frame.style.height = dims.height + 'px';
      } else if (currentDevice === 'tablet') {
        frame.style.width = dims.width + 'px';
        frame.style.height = dims.height + 'px';
      } else if (currentDevice === 'laptop') {
        frame.style.width = '1100px';
        frame.style.height = '600px';
      } else if (currentDevice === 'desktop') {
        frame.style.width = '1200px';
        frame.style.height = '675px';
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

    // Handle iframe load errors
    document.getElementById('previewFrame').addEventListener('load', () => {
      showToast('Website loaded successfully!');
    });

    document.getElementById('previewFrame').addEventListener('error', () => {
      showToast('Failed to load website (CORS blocked)', 'error');
    });
