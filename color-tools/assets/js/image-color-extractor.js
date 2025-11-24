const fileInput = document.getElementById('fileInput');
    const uploadArea = document.getElementById('uploadArea');
    const previewSection = document.getElementById('previewSection');
    const previewImage = document.getElementById('previewImage');
    const colorsSection = document.getElementById('colorsSection');
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    
    // Drag and drop handlers
    uploadArea.addEventListener('dragover', (e) => {
      e.preventDefault();
      uploadArea.classList.add('dragover');
    });
    
    uploadArea.addEventListener('dragleave', () => {
      uploadArea.classList.remove('dragover');
    });
    
    uploadArea.addEventListener('drop', (e) => {
      e.preventDefault();
      uploadArea.classList.remove('dragover');
      const file = e.dataTransfer.files[0];
      if (file && file.type.startsWith('image/')) {
        handleImage(file);
      }
    });
    
    fileInput.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (file) {
        handleImage(file);
      }
    });
    
    function handleImage(file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        previewImage.src = e.target.result;
        previewImage.onload = () => {
          previewSection.classList.add('active');
          extractColors();
        };
      };
      reader.readAsDataURL(file);
    }
    
    function extractColors() {
      const img = previewImage;
      const colorCount = parseInt(document.getElementById('colorCount').value);
      
      // Set canvas size
      const maxSize = 200;
      const scale = Math.min(maxSize / img.width, maxSize / img.height);
      canvas.width = img.width * scale;
      canvas.height = img.height * scale;
      
      // Draw image
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      
      // Get image data
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const pixels = imageData.data;
      
      // Extract colors using k-means clustering
      const colors = kMeansClustering(pixels, colorCount);
      
      displayColors(colors);
    }
    
    function kMeansClustering(pixels, k) {
      const colors = [];
      const step = 4;
      
      // Sample pixels
      for (let i = 0; i < pixels.length; i += step * 10) {
        colors.push([pixels[i], pixels[i + 1], pixels[i + 2]]);
      }
      
      // Initialize centroids randomly
      let centroids = [];
      for (let i = 0; i < k; i++) {
        const randomIndex = Math.floor(Math.random() * colors.length);
        centroids.push([...colors[randomIndex]]);
      }
      
      // K-means iterations
      for (let iter = 0; iter < 10; iter++) {
        const clusters = Array(k).fill().map(() => []);
        
        // Assign colors to nearest centroid
        colors.forEach(color => {
          let minDist = Infinity;
          let clusterIndex = 0;
          
          centroids.forEach((centroid, i) => {
            const dist = Math.sqrt(
              Math.pow(color[0] - centroid[0], 2) +
              Math.pow(color[1] - centroid[1], 2) +
              Math.pow(color[2] - centroid[2], 2)
            );
            
            if (dist < minDist) {
              minDist = dist;
              clusterIndex = i;
            }
          });
          
          clusters[clusterIndex].push(color);
        });
        
        // Update centroids
        centroids = clusters.map(cluster => {
          if (cluster.length === 0) return centroids[0];
          
          const sum = cluster.reduce((acc, color) => {
            return [acc[0] + color[0], acc[1] + color[1], acc[2] + color[2]];
          }, [0, 0, 0]);
          
          return [
            Math.round(sum[0] / cluster.length),
            Math.round(sum[1] / cluster.length),
            Math.round(sum[2] / cluster.length)
          ];
        });
      }
      
      // Calculate percentages
      const clusters = Array(k).fill().map(() => []);
      colors.forEach(color => {
        let minDist = Infinity;
        let clusterIndex = 0;
        
        centroids.forEach((centroid, i) => {
          const dist = Math.sqrt(
            Math.pow(color[0] - centroid[0], 2) +
            Math.pow(color[1] - centroid[1], 2) +
            Math.pow(color[2] - centroid[2], 2)
          );
          
          if (dist < minDist) {
            minDist = dist;
            clusterIndex = i;
          }
        });
        
        clusters[clusterIndex].push(color);
      });
      
      return centroids.map((centroid, i) => {
        const percentage = ((clusters[i].length / colors.length) * 100).toFixed(1);
        const hex = rgbToHex(centroid[0], centroid[1], centroid[2]);
        return { hex, percentage };
      }).sort((a, b) => parseFloat(b.percentage) - parseFloat(a.percentage));
    }
    
    function rgbToHex(r, g, b) {
      return '#' + [r, g, b].map(x => {
        const hex = x.toString(16);
        return hex.length === 1 ? '0' + hex : hex;
      }).join('');
    }
    
    function displayColors(colors) {
      const grid = document.getElementById('colorsGrid');
      grid.innerHTML = colors.map(color => `
        <div class="color-item" onclick="copyColor('${color.hex}')">
          <div class="color-swatch" style="background: ${color.hex}"></div>
          <div class="color-details">
            <div class="color-hex">${color.hex}</div>
            <div class="color-percentage">${color.percentage}% of image</div>
          </div>
        </div>
      `).join('');
      
      colorsSection.classList.add('active');
    }
    
    function copyColor(hex) {
      navigator.clipboard.writeText(hex).then(() => {
        const toast = document.getElementById('toast');
        toast.classList.add('show');
        setTimeout(() => toast.classList.remove('show'), 2000);
      });
    }

const fileInput = document.getElementById('fileInput');
    const uploadArea = document.getElementById('uploadArea');
    const previewSection = document.getElementById('previewSection');
    const previewImage = document.getElementById('previewImage');
    const colorsSection = document.getElementById('colorsSection');
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    
    // Drag and drop handlers
    uploadArea.addEventListener('dragover', (e) => {
      e.preventDefault();
      uploadArea.classList.add('dragover');
    });
    
    uploadArea.addEventListener('dragleave', () => {
      uploadArea.classList.remove('dragover');
    });
    
    uploadArea.addEventListener('drop', (e) => {
      e.preventDefault();
      uploadArea.classList.remove('dragover');
      const file = e.dataTransfer.files[0];
      if (file && file.type.startsWith('image/')) {
        handleImage(file);
      }
    });
    
    fileInput.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (file) {
        handleImage(file);
      }
    });
    
    function handleImage(file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        previewImage.src = e.target.result;
        previewImage.onload = () => {
          previewSection.classList.add('active');
          extractColors();
        };
      };
      reader.readAsDataURL(file);
    }
    
    function extractColors() {
      const img = previewImage;
      const colorCount = parseInt(document.getElementById('colorCount').value);
      
      // Set canvas size
      const maxSize = 200;
      const scale = Math.min(maxSize / img.width, maxSize / img.height);
      canvas.width = img.width * scale;
      canvas.height = img.height * scale;
      
      // Draw image
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      
      // Get image data
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const pixels = imageData.data;
      
      // Extract colors using k-means clustering
      const colors = kMeansClustering(pixels, colorCount);
      
      displayColors(colors);
    }
    
    function kMeansClustering(pixels, k) {
      const colors = [];
      const step = 4;
      
      // Sample pixels
      for (let i = 0; i < pixels.length; i += step * 10) {
        colors.push([pixels[i], pixels[i + 1], pixels[i + 2]]);
      }
      
      // Initialize centroids randomly
      let centroids = [];
      for (let i = 0; i < k; i++) {
        const randomIndex = Math.floor(Math.random() * colors.length);
        centroids.push([...colors[randomIndex]]);
      }
      
      // K-means iterations
      for (let iter = 0; iter < 10; iter++) {
        const clusters = Array(k).fill().map(() => []);
        
        // Assign colors to nearest centroid
        colors.forEach(color => {
          let minDist = Infinity;
          let clusterIndex = 0;
          
          centroids.forEach((centroid, i) => {
            const dist = Math.sqrt(
              Math.pow(color[0] - centroid[0], 2) +
              Math.pow(color[1] - centroid[1], 2) +
              Math.pow(color[2] - centroid[2], 2)
            );
            
            if (dist < minDist) {
              minDist = dist;
              clusterIndex = i;
            }
          });
          
          clusters[clusterIndex].push(color);
        });
        
        // Update centroids
        centroids = clusters.map(cluster => {
          if (cluster.length === 0) return centroids[0];
          
          const sum = cluster.reduce((acc, color) => {
            return [acc[0] + color[0], acc[1] + color[1], acc[2] + color[2]];
          }, [0, 0, 0]);
          
          return [
            Math.round(sum[0] / cluster.length),
            Math.round(sum[1] / cluster.length),
            Math.round(sum[2] / cluster.length)
          ];
        });
      }
      
      // Calculate percentages
      const clusters = Array(k).fill().map(() => []);
      colors.forEach(color => {
        let minDist = Infinity;
        let clusterIndex = 0;
        
        centroids.forEach((centroid, i) => {
          const dist = Math.sqrt(
            Math.pow(color[0] - centroid[0], 2) +
            Math.pow(color[1] - centroid[1], 2) +
            Math.pow(color[2] - centroid[2], 2)
          );
          
          if (dist < minDist) {
            minDist = dist;
            clusterIndex = i;
          }
        });
        
        clusters[clusterIndex].push(color);
      });
      
      return centroids.map((centroid, i) => {
        const percentage = ((clusters[i].length / colors.length) * 100).toFixed(1);
        const hex = rgbToHex(centroid[0], centroid[1], centroid[2]);
        return { hex, percentage };
      }).sort((a, b) => parseFloat(b.percentage) - parseFloat(a.percentage));
    }
    
    function rgbToHex(r, g, b) {
      return '#' + [r, g, b].map(x => {
        const hex = x.toString(16);
        return hex.length === 1 ? '0' + hex : hex;
      }).join('');
    }
    
    function displayColors(colors) {
      const grid = document.getElementById('colorsGrid');
      grid.innerHTML = colors.map(color => `
        <div class="color-item" onclick="copyColor('${color.hex}')">
          <div class="color-swatch" style="background: ${color.hex}"></div>
          <div class="color-details">
            <div class="color-hex">${color.hex}</div>
            <div class="color-percentage">${color.percentage}% of image</div>
          </div>
        </div>
      `).join('');
      
      colorsSection.classList.add('active');
    }
    
    function copyColor(hex) {
      navigator.clipboard.writeText(hex).then(() => {
        const toast = document.getElementById('toast');
        toast.classList.add('show');
        setTimeout(() => toast.classList.remove('show'), 2000);
      });
    }


