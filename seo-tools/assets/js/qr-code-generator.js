let currentQRUrl = '';

    function generateQR() {
      const text = document.getElementById('urlInput').value.trim();
      const size = document.getElementById('sizeSelect').value;
      
      if (!text) {
        alert('Please enter URL or text');
        return;
      }

      // Using QR Server API (free, no API key needed)
      currentQRUrl = `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodeURIComponent(text)}`;
      
      const preview = document.getElementById('qrPreview');
      preview.innerHTML = `<img src="${currentQRUrl}" alt="QR Code">`;
      
      document.getElementById('downloadBtn').style.display = 'block';
    }

    async function downloadQR() {
      if (!currentQRUrl) return;
      
      try {
        const response = await fetch(currentQRUrl);
        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        
        const link = document.createElement('a');
        link.href = url;
        link.download = 'qrcode.png';
        link.click();
        
        URL.revokeObjectURL(url);
      } catch (error) {
        alert('Download failed. Try right-clicking the QR code and saving manually.');
      }
    }
