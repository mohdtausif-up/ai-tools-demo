function extractFromFile() {
      const fileInput = document.getElementById('fileInput');
      const file = fileInput.files[0];
      
      if (!file) {
        alert('Please select an image file');
        return;
      }
      
      const reader = new FileReader();
      reader.onload = (e) => {
        processImage(e.target.result);
      };
      reader.readAsDataURL(file);
    }
    
    function extractFromURL() {
      const url = document.getElementById('urlInput').value.trim();
      
      if (!url) {
        alert('Please enter an image URL');
        return;
      }
      
      // Note: This will fail for most external URLs due to CORS
      processImage(url);
    }
    
    function processImage(src) {
      const preview = document.getElementById('previewImage');
      const section = document.getElementById('previewSection');
      const loading = document.getElementById('loadingMessage');
      
      section.classList.add('active');
      loading.style.display = 'block';
      document.getElementById('paletteGrid').innerHTML = '';
      
      preview.onload = () => {
        extractColors(preview);
        loading.style.display = 'none';
      };
      
      preview.onerror = () => {
        alert('Failed to load image. For external URLs, the image must allow cross-origin access (CORS).');
        section.classList.remove('active');
        loading.style.display = 'none';
      };
      
      preview.src = src;
    }
    
    function extractColors(img) {
      const canvas = document.getElementById('canvas');
      const ctx = canvas.getContext('2d');
      
      // Resize for performance
      const maxSize = 200;
      const scale = Math.min(maxSize / img.width, maxSize / img.height);
      canvas.width = img.width * scale;
      canvas.height = img.height * scale;
      
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const pixels = imageData.data;
      
      // K-means clustering
      const numColors = 8;
      const colors = kMeans(pixels, numColors);
      
      displayPalette(colors);
    }
    
    function kMeans(pixels, k) {
      const points = [];
      for (let i = 0; i < pixels.length; i += 4) {
        points.push([pixels[i], pixels[i + 1], pixels[i + 2]]);
      }
      
      // Initialize centroids randomly
      let centroids = [];
      for (let i = 0; i < k; i++) {
        centroids.push(points[Math.floor(Math.random() * points.length)]);
      }
      
      // Run k-means for 10 iterations
      for (let iter = 0; iter < 10; iter++) {
        const clusters = Array.from({ length: k }, () => []);
        
        // Assign points to nearest centroid
        points.forEach(point => {
          let minDist = Infinity;
          let cluster = 0;
          
          centroids.forEach((centroid, i) => {
            const dist = Math.sqrt(
              Math.pow(point[0] - centroid[0], 2) +
              Math.pow(point[1] - centroid[1], 2) +
              Math.pow(point[2] - centroid[2], 2)
            );
            if (dist < minDist) {
              minDist = dist;
              cluster = i;
            }
          });
          
          clusters[cluster].push(point);
        });
        
        // Recalculate centroids
        centroids = clusters.map(cluster => {
          if (cluster.length === 0) return centroids[0];
          const sum = cluster.reduce((acc, point) => [
            acc[0] + point[0],
            acc[1] + point[1],
            acc[2] + point[2]
          ], [0, 0, 0]);
          return [
            Math.round(sum[0] / cluster.length),
            Math.round(sum[1] / cluster.length),
            Math.round(sum[2] / cluster.length)
          ];
        });
      }
      
      // Calculate percentages
      const clusters = Array.from({ length: k }, () => []);
      points.forEach(point => {
        let minDist = Infinity;
        let cluster = 0;
        
        centroids.forEach((centroid, i) => {
          const dist = Math.sqrt(
            Math.pow(point[0] - centroid[0], 2) +
            Math.pow(point[1] - centroid[1], 2) +
            Math.pow(point[2] - centroid[2], 2)
          );
          if (dist < minDist) {
            minDist = dist;
            cluster = i;
          }
        });
        
        clusters[cluster].push(point);
      });
      
      return centroids.map((centroid, i) => ({
        rgb: centroid,
        hex: rgbToHex(centroid[0], centroid[1], centroid[2]),
        percentage: ((clusters[i].length / points.length) * 100).toFixed(1)
      })).sort((a, b) => b.percentage - a.percentage);
    }
    
    function rgbToHex(r, g, b) {
      return '#' + [r, g, b].map(x => {
        const hex = x.toString(16);
        return hex.length === 1 ? '0' + hex : hex;
      }).join('');
    }
    
    function displayPalette(colors) {
      const grid = document.getElementById('paletteGrid');
      
      grid.innerHTML = colors.map(color => `
        <div class="color-card" onclick="copyColor('${color.hex}')">
          <div class="color-swatch" style="background: ${color.hex}"></div>
          <div class="color-info">
            <div class="color-hex">${color.hex}</div>
            <div class="color-percentage">${color.percentage}%</div>
          </div>
        </div>
      `).join('');
    }
    
    function copyColor(hex) {
      navigator.clipboard.writeText(hex).then(() => {
        const toast = document.getElementById('toast');
        toast.textContent = `Copied ${hex}`;
        toast.classList.add('show');
        setTimeout(() => {
          toast.classList.remove('show');
          setTimeout(() => toast.textContent = 'Copied to clipboard!', 300);
        }, 2000);
      });
    }

function extractFromFile() {
      const fileInput = document.getElementById('fileInput');
      const file = fileInput.files[0];
      
      if (!file) {
        alert('Please select an image file');
        return;
      }
      
      const reader = new FileReader();
      reader.onload = (e) => {
        processImage(e.target.result);
      };
      reader.readAsDataURL(file);
    }
    
    function extractFromURL() {
      const url = document.getElementById('urlInput').value.trim();
      
      if (!url) {
        alert('Please enter an image URL');
        return;
      }
      
      // Note: This will fail for most external URLs due to CORS
      processImage(url);
    }
    
    function processImage(src) {
      const preview = document.getElementById('previewImage');
      const section = document.getElementById('previewSection');
      const loading = document.getElementById('loadingMessage');
      
      section.classList.add('active');
      loading.style.display = 'block';
      document.getElementById('paletteGrid').innerHTML = '';
      
      preview.onload = () => {
        extractColors(preview);
        loading.style.display = 'none';
      };
      
      preview.onerror = () => {
        alert('Failed to load image. For external URLs, the image must allow cross-origin access (CORS).');
        section.classList.remove('active');
        loading.style.display = 'none';
      };
      
      preview.src = src;
    }
    
    function extractColors(img) {
      const canvas = document.getElementById('canvas');
      const ctx = canvas.getContext('2d');
      
      // Resize for performance
      const maxSize = 200;
      const scale = Math.min(maxSize / img.width, maxSize / img.height);
      canvas.width = img.width * scale;
      canvas.height = img.height * scale;
      
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const pixels = imageData.data;
      
      // K-means clustering
      const numColors = 8;
      const colors = kMeans(pixels, numColors);
      
      displayPalette(colors);
    }
    
    function kMeans(pixels, k) {
      const points = [];
      for (let i = 0; i < pixels.length; i += 4) {
        points.push([pixels[i], pixels[i + 1], pixels[i + 2]]);
      }
      
      // Initialize centroids randomly
      let centroids = [];
      for (let i = 0; i < k; i++) {
        centroids.push(points[Math.floor(Math.random() * points.length)]);
      }
      
      // Run k-means for 10 iterations
      for (let iter = 0; iter < 10; iter++) {
        const clusters = Array.from({ length: k }, () => []);
        
        // Assign points to nearest centroid
        points.forEach(point => {
          let minDist = Infinity;
          let cluster = 0;
          
          centroids.forEach((centroid, i) => {
            const dist = Math.sqrt(
              Math.pow(point[0] - centroid[0], 2) +
              Math.pow(point[1] - centroid[1], 2) +
              Math.pow(point[2] - centroid[2], 2)
            );
            if (dist < minDist) {
              minDist = dist;
              cluster = i;
            }
          });
          
          clusters[cluster].push(point);
        });
        
        // Recalculate centroids
        centroids = clusters.map(cluster => {
          if (cluster.length === 0) return centroids[0];
          const sum = cluster.reduce((acc, point) => [
            acc[0] + point[0],
            acc[1] + point[1],
            acc[2] + point[2]
          ], [0, 0, 0]);
          return [
            Math.round(sum[0] / cluster.length),
            Math.round(sum[1] / cluster.length),
            Math.round(sum[2] / cluster.length)
          ];
        });
      }
      
      // Calculate percentages
      const clusters = Array.from({ length: k }, () => []);
      points.forEach(point => {
        let minDist = Infinity;
        let cluster = 0;
        
        centroids.forEach((centroid, i) => {
          const dist = Math.sqrt(
            Math.pow(point[0] - centroid[0], 2) +
            Math.pow(point[1] - centroid[1], 2) +
            Math.pow(point[2] - centroid[2], 2)
          );
          if (dist < minDist) {
            minDist = dist;
            cluster = i;
          }
        });
        
        clusters[cluster].push(point);
      });
      
      return centroids.map((centroid, i) => ({
        rgb: centroid,
        hex: rgbToHex(centroid[0], centroid[1], centroid[2]),
        percentage: ((clusters[i].length / points.length) * 100).toFixed(1)
      })).sort((a, b) => b.percentage - a.percentage);
    }
    
    function rgbToHex(r, g, b) {
      return '#' + [r, g, b].map(x => {
        const hex = x.toString(16);
        return hex.length === 1 ? '0' + hex : hex;
      }).join('');
    }
    
    function displayPalette(colors) {
      const grid = document.getElementById('paletteGrid');
      
      grid.innerHTML = colors.map(color => `
        <div class="color-card" onclick="copyColor('${color.hex}')">
          <div class="color-swatch" style="background: ${color.hex}"></div>
          <div class="color-info">
            <div class="color-hex">${color.hex}</div>
            <div class="color-percentage">${color.percentage}%</div>
          </div>
        </div>
      `).join('');
    }
    
    function copyColor(hex) {
      navigator.clipboard.writeText(hex).then(() => {
        const toast = document.getElementById('toast');
        toast.textContent = `Copied ${hex}`;
        toast.classList.add('show');
        setTimeout(() => {
          toast.classList.remove('show');
          setTimeout(() => toast.textContent = 'Copied to clipboard!', 300);
        }, 2000);
      });
    }


