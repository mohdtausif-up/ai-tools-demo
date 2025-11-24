const fileInput = document.getElementById('fileInput');
    const originalCanvas = document.getElementById('originalCanvas');
    const duotoneCanvas = document.getElementById('duotoneCanvas');
    const originalCtx = originalCanvas.getContext('2d');
    const duotoneCtx = duotoneCanvas.getContext('2d');
    let currentImage = null;
    
    fileInput.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
          const img = new Image();
          img.onload = () => {
            currentImage = img;
            processImage();
            document.getElementById('controlsSection').classList.add('active');
            document.getElementById('previewSection').classList.add('active');
          };
          img.src = event.target.result;
        };
        reader.readAsDataURL(file);
      }
    });
    
    document.getElementById('shadowColor').addEventListener('input', applyDuotone);
    document.getElementById('highlightColor').addEventListener('input', applyDuotone);
    
    function processImage() {
      const maxWidth = 600;
      const scale = Math.min(1, maxWidth / currentImage.width);
      const width = currentImage.width * scale;
      const height = currentImage.height * scale;
      
      originalCanvas.width = duotoneCanvas.width = width;
      originalCanvas.height = duotoneCanvas.height = height;
      
      originalCtx.drawImage(currentImage, 0, 0, width, height);
      applyDuotone();
    }
    
    function hexToRgb(hex) {
      const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
      } : null;
    }
    
    function applyDuotone() {
      if (!currentImage) return;
      
      const shadowColor = hexToRgb(document.getElementById('shadowColor').value);
      const highlightColor = hexToRgb(document.getElementById('highlightColor').value);
      
      const imageData = originalCtx.getImageData(0, 0, originalCanvas.width, originalCanvas.height);
      const data = imageData.data;
      
      for (let i = 0; i < data.length; i += 4) {
        // Convert to grayscale
        const gray = 0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2];
        const normalized = gray / 255;
        
        // Map grayscale to duotone colors
        data[i] = shadowColor.r + (highlightColor.r - shadowColor.r) * normalized;
        data[i + 1] = shadowColor.g + (highlightColor.g - shadowColor.g) * normalized;
        data[i + 2] = shadowColor.b + (highlightColor.b - shadowColor.b) * normalized;
      }
      
      duotoneCtx.putImageData(imageData, 0, 0);
    }
    
    function applyPreset(shadow, highlight) {
      document.getElementById('shadowColor').value = shadow;
      document.getElementById('highlightColor').value = highlight;
      applyDuotone();
    }
    
    function downloadDuotone() {
      const link = document.createElement('a');
      link.download = 'duotone-image.png';
      link.href = duotoneCanvas.toDataURL();
      link.click();
    }

const fileInput = document.getElementById('fileInput');
    const originalCanvas = document.getElementById('originalCanvas');
    const duotoneCanvas = document.getElementById('duotoneCanvas');
    const originalCtx = originalCanvas.getContext('2d');
    const duotoneCtx = duotoneCanvas.getContext('2d');
    let currentImage = null;
    
    fileInput.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
          const img = new Image();
          img.onload = () => {
            currentImage = img;
            processImage();
            document.getElementById('controlsSection').classList.add('active');
            document.getElementById('previewSection').classList.add('active');
          };
          img.src = event.target.result;
        };
        reader.readAsDataURL(file);
      }
    });
    
    document.getElementById('shadowColor').addEventListener('input', applyDuotone);
    document.getElementById('highlightColor').addEventListener('input', applyDuotone);
    
    function processImage() {
      const maxWidth = 600;
      const scale = Math.min(1, maxWidth / currentImage.width);
      const width = currentImage.width * scale;
      const height = currentImage.height * scale;
      
      originalCanvas.width = duotoneCanvas.width = width;
      originalCanvas.height = duotoneCanvas.height = height;
      
      originalCtx.drawImage(currentImage, 0, 0, width, height);
      applyDuotone();
    }
    
    function hexToRgb(hex) {
      const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
      } : null;
    }
    
    function applyDuotone() {
      if (!currentImage) return;
      
      const shadowColor = hexToRgb(document.getElementById('shadowColor').value);
      const highlightColor = hexToRgb(document.getElementById('highlightColor').value);
      
      const imageData = originalCtx.getImageData(0, 0, originalCanvas.width, originalCanvas.height);
      const data = imageData.data;
      
      for (let i = 0; i < data.length; i += 4) {
        // Convert to grayscale
        const gray = 0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2];
        const normalized = gray / 255;
        
        // Map grayscale to duotone colors
        data[i] = shadowColor.r + (highlightColor.r - shadowColor.r) * normalized;
        data[i + 1] = shadowColor.g + (highlightColor.g - shadowColor.g) * normalized;
        data[i + 2] = shadowColor.b + (highlightColor.b - shadowColor.b) * normalized;
      }
      
      duotoneCtx.putImageData(imageData, 0, 0);
    }
    
    function applyPreset(shadow, highlight) {
      document.getElementById('shadowColor').value = shadow;
      document.getElementById('highlightColor').value = highlight;
      applyDuotone();
    }
    
    function downloadDuotone() {
      const link = document.createElement('a');
      link.download = 'duotone-image.png';
      link.href = duotoneCanvas.toDataURL();
      link.click();
    }


