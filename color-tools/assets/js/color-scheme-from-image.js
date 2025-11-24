const fileInput = document.getElementById('fileInput');
    const uploadArea = document.getElementById('uploadArea');
    const previewSection = document.getElementById('previewSection');
    const previewImage = document.getElementById('previewImage');
    
    // Drag and drop
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
        processImage(file);
      }
    });
    
    fileInput.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (file) {
        processImage(file);
      }
    });
    
    function processImage(file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        previewImage.onload = () => {
          extractAndGenerateSchemes();
          previewSection.classList.add('active');
        };
        previewImage.src = e.target.result;
      };
      reader.readAsDataURL(file);
    }
    
    function extractAndGenerateSchemes() {
      const canvas = document.getElementById('canvas');
      const ctx = canvas.getContext('2d');
      
      const maxSize = 200;
      const scale = Math.min(maxSize / previewImage.width, maxSize / previewImage.height);
      canvas.width = previewImage.width * scale;
      canvas.height = previewImage.height * scale;
      
      ctx.drawImage(previewImage, 0, 0, canvas.width, canvas.height);
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const pixels = imageData.data;
      
      // Extract 5 dominant colors
      const dominantColors = extractDominantColors(pixels, 5);
      
      // Generate various schemes
      const schemes = {
        extracted: {
          title: '🎨 Extracted Colors',
          desc: 'Dominant colors extracted from your image',
          colors: dominantColors
        },
        monochromatic: {
          title: '🔵 Monochromatic Scheme',
          desc: 'Variations of the primary color with different lightness',
          colors: generateMonochromatic(dominantColors[0])
        },
        complementary: {
          title: '🎯 Complementary Scheme',
          desc: 'Primary color with its opposite on the color wheel',
          colors: generateComplementary(dominantColors[0])
        },
        analogous: {
          title: '🌈 Analogous Scheme',
          desc: 'Colors adjacent to the primary color on the wheel',
          colors: generateAnalogous(dominantColors[0])
        },
        triadic: {
          title: '🔺 Triadic Scheme',
          desc: 'Three colors evenly spaced on the color wheel',
          colors: generateTriadic(dominantColors[0])
        },
        tetradic: {
          title: '🔲 Tetradic Scheme',
          desc: 'Four colors forming a rectangle on the wheel',
          colors: generateTetradic(dominantColors[0])
        }
      };
      
      renderSchemes(schemes);
    }
    
    function extractDominantColors(pixels, count) {
      const points = [];
      for (let i = 0; i < pixels.length; i += 4) {
        points.push([pixels[i], pixels[i + 1], pixels[i + 2]]);
      }
      
      let centroids = [];
      for (let i = 0; i < count; i++) {
        centroids.push(points[Math.floor(Math.random() * points.length)]);
      }
      
      for (let iter = 0; iter < 10; iter++) {
        const clusters = Array.from({ length: count }, () => []);
        
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
      
      return centroids.map(rgb => rgbToHex(rgb[0], rgb[1], rgb[2]));
    }
    
    function rgbToHex(r, g, b) {
      return '#' + [r, g, b].map(x => {
        const hex = x.toString(16);
        return hex.length === 1 ? '0' + hex : hex;
      }).join('');
    }
    
    function hexToHsl(hex) {
      const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      let r = parseInt(result[1], 16) / 255;
      let g = parseInt(result[2], 16) / 255;
      let b = parseInt(result[3], 16) / 255;
      
      const max = Math.max(r, g, b), min = Math.min(r, g, b);
      let h, s, l = (max + min) / 2;
      
      if (max === min) {
        h = s = 0;
      } else {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
          case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
          case g: h = ((b - r) / d + 2) / 6; break;
          case b: h = ((r - g) / d + 4) / 6; break;
        }
      }
      
      return { h: h * 360, s: s * 100, l: l * 100 };
    }
    
    function hslToHex(h, s, l) {
      s /= 100;
      l /= 100;
      const c = (1 - Math.abs(2 * l - 1)) * s;
      const x = c * (1 - Math.abs((h / 60) % 2 - 1));
      const m = l - c / 2;
      let r = 0, g = 0, b = 0;
      
      if (0 <= h && h < 60) { r = c; g = x; b = 0; }
      else if (60 <= h && h < 120) { r = x; g = c; b = 0; }
      else if (120 <= h && h < 180) { r = 0; g = c; b = x; }
      else if (180 <= h && h < 240) { r = 0; g = x; b = c; }
      else if (240 <= h && h < 300) { r = x; g = 0; b = c; }
      else if (300 <= h && h < 360) { r = c; g = 0; b = x; }
      
      return rgbToHex(
        Math.round((r + m) * 255),
        Math.round((g + m) * 255),
        Math.round((b + m) * 255)
      );
    }
    
    function generateMonochromatic(baseHex) {
      const hsl = hexToHsl(baseHex);
      return [
        hslToHex(hsl.h, hsl.s, 20),
        hslToHex(hsl.h, hsl.s, 35),
        hslToHex(hsl.h, hsl.s, 50),
        hslToHex(hsl.h, hsl.s, 65),
        hslToHex(hsl.h, hsl.s, 80)
      ];
    }
    
    function generateComplementary(baseHex) {
      const hsl = hexToHsl(baseHex);
      const compHue = (hsl.h + 180) % 360;
      return [
        baseHex,
        hslToHex(hsl.h, hsl.s, hsl.l - 15),
        hslToHex(compHue, hsl.s, hsl.l),
        hslToHex(compHue, hsl.s, hsl.l - 15),
        hslToHex(compHue, hsl.s, hsl.l + 15)
      ];
    }
    
    function generateAnalogous(baseHex) {
      const hsl = hexToHsl(baseHex);
      return [
        hslToHex((hsl.h - 30 + 360) % 360, hsl.s, hsl.l),
        hslToHex((hsl.h - 15 + 360) % 360, hsl.s, hsl.l),
        baseHex,
        hslToHex((hsl.h + 15) % 360, hsl.s, hsl.l),
        hslToHex((hsl.h + 30) % 360, hsl.s, hsl.l)
      ];
    }
    
    function generateTriadic(baseHex) {
      const hsl = hexToHsl(baseHex);
      return [
        baseHex,
        hslToHex((hsl.h + 120) % 360, hsl.s, hsl.l),
        hslToHex((hsl.h + 240) % 360, hsl.s, hsl.l),
        hslToHex(hsl.h, hsl.s, hsl.l - 15),
        hslToHex((hsl.h + 120) % 360, hsl.s, hsl.l - 15)
      ];
    }
    
    function generateTetradic(baseHex) {
      const hsl = hexToHsl(baseHex);
      return [
        baseHex,
        hslToHex((hsl.h + 90) % 360, hsl.s, hsl.l),
        hslToHex((hsl.h + 180) % 360, hsl.s, hsl.l),
        hslToHex((hsl.h + 270) % 360, hsl.s, hsl.l),
        hslToHex(hsl.h, hsl.s, hsl.l - 15)
      ];
    }
    
    function renderSchemes(schemes) {
      const container = document.getElementById('schemesContainer');
      
      container.innerHTML = Object.values(schemes).map(scheme => `
        <div class="scheme-section">
          <div class="scheme-title">${scheme.title}</div>
          <div class="scheme-desc">${scheme.desc}</div>
          <div class="colors-row">
            ${scheme.colors.map(color => `
              <div class="color-card" onclick="copyColor('${color}')">
                <div class="color-swatch" style="background: ${color}"></div>
                <div class="color-info">
                  <div class="color-hex">${color}</div>
                </div>
              </div>
            `).join('')}
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

const fileInput = document.getElementById('fileInput');
    const uploadArea = document.getElementById('uploadArea');
    const previewSection = document.getElementById('previewSection');
    const previewImage = document.getElementById('previewImage');
    
    // Drag and drop
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
        processImage(file);
      }
    });
    
    fileInput.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (file) {
        processImage(file);
      }
    });
    
    function processImage(file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        previewImage.onload = () => {
          extractAndGenerateSchemes();
          previewSection.classList.add('active');
        };
        previewImage.src = e.target.result;
      };
      reader.readAsDataURL(file);
    }
    
    function extractAndGenerateSchemes() {
      const canvas = document.getElementById('canvas');
      const ctx = canvas.getContext('2d');
      
      const maxSize = 200;
      const scale = Math.min(maxSize / previewImage.width, maxSize / previewImage.height);
      canvas.width = previewImage.width * scale;
      canvas.height = previewImage.height * scale;
      
      ctx.drawImage(previewImage, 0, 0, canvas.width, canvas.height);
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const pixels = imageData.data;
      
      // Extract 5 dominant colors
      const dominantColors = extractDominantColors(pixels, 5);
      
      // Generate various schemes
      const schemes = {
        extracted: {
          title: '🎨 Extracted Colors',
          desc: 'Dominant colors extracted from your image',
          colors: dominantColors
        },
        monochromatic: {
          title: '🔵 Monochromatic Scheme',
          desc: 'Variations of the primary color with different lightness',
          colors: generateMonochromatic(dominantColors[0])
        },
        complementary: {
          title: '🎯 Complementary Scheme',
          desc: 'Primary color with its opposite on the color wheel',
          colors: generateComplementary(dominantColors[0])
        },
        analogous: {
          title: '🌈 Analogous Scheme',
          desc: 'Colors adjacent to the primary color on the wheel',
          colors: generateAnalogous(dominantColors[0])
        },
        triadic: {
          title: '🔺 Triadic Scheme',
          desc: 'Three colors evenly spaced on the color wheel',
          colors: generateTriadic(dominantColors[0])
        },
        tetradic: {
          title: '🔲 Tetradic Scheme',
          desc: 'Four colors forming a rectangle on the wheel',
          colors: generateTetradic(dominantColors[0])
        }
      };
      
      renderSchemes(schemes);
    }
    
    function extractDominantColors(pixels, count) {
      const points = [];
      for (let i = 0; i < pixels.length; i += 4) {
        points.push([pixels[i], pixels[i + 1], pixels[i + 2]]);
      }
      
      let centroids = [];
      for (let i = 0; i < count; i++) {
        centroids.push(points[Math.floor(Math.random() * points.length)]);
      }
      
      for (let iter = 0; iter < 10; iter++) {
        const clusters = Array.from({ length: count }, () => []);
        
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
      
      return centroids.map(rgb => rgbToHex(rgb[0], rgb[1], rgb[2]));
    }
    
    function rgbToHex(r, g, b) {
      return '#' + [r, g, b].map(x => {
        const hex = x.toString(16);
        return hex.length === 1 ? '0' + hex : hex;
      }).join('');
    }
    
    function hexToHsl(hex) {
      const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      let r = parseInt(result[1], 16) / 255;
      let g = parseInt(result[2], 16) / 255;
      let b = parseInt(result[3], 16) / 255;
      
      const max = Math.max(r, g, b), min = Math.min(r, g, b);
      let h, s, l = (max + min) / 2;
      
      if (max === min) {
        h = s = 0;
      } else {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
          case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
          case g: h = ((b - r) / d + 2) / 6; break;
          case b: h = ((r - g) / d + 4) / 6; break;
        }
      }
      
      return { h: h * 360, s: s * 100, l: l * 100 };
    }
    
    function hslToHex(h, s, l) {
      s /= 100;
      l /= 100;
      const c = (1 - Math.abs(2 * l - 1)) * s;
      const x = c * (1 - Math.abs((h / 60) % 2 - 1));
      const m = l - c / 2;
      let r = 0, g = 0, b = 0;
      
      if (0 <= h && h < 60) { r = c; g = x; b = 0; }
      else if (60 <= h && h < 120) { r = x; g = c; b = 0; }
      else if (120 <= h && h < 180) { r = 0; g = c; b = x; }
      else if (180 <= h && h < 240) { r = 0; g = x; b = c; }
      else if (240 <= h && h < 300) { r = x; g = 0; b = c; }
      else if (300 <= h && h < 360) { r = c; g = 0; b = x; }
      
      return rgbToHex(
        Math.round((r + m) * 255),
        Math.round((g + m) * 255),
        Math.round((b + m) * 255)
      );
    }
    
    function generateMonochromatic(baseHex) {
      const hsl = hexToHsl(baseHex);
      return [
        hslToHex(hsl.h, hsl.s, 20),
        hslToHex(hsl.h, hsl.s, 35),
        hslToHex(hsl.h, hsl.s, 50),
        hslToHex(hsl.h, hsl.s, 65),
        hslToHex(hsl.h, hsl.s, 80)
      ];
    }
    
    function generateComplementary(baseHex) {
      const hsl = hexToHsl(baseHex);
      const compHue = (hsl.h + 180) % 360;
      return [
        baseHex,
        hslToHex(hsl.h, hsl.s, hsl.l - 15),
        hslToHex(compHue, hsl.s, hsl.l),
        hslToHex(compHue, hsl.s, hsl.l - 15),
        hslToHex(compHue, hsl.s, hsl.l + 15)
      ];
    }
    
    function generateAnalogous(baseHex) {
      const hsl = hexToHsl(baseHex);
      return [
        hslToHex((hsl.h - 30 + 360) % 360, hsl.s, hsl.l),
        hslToHex((hsl.h - 15 + 360) % 360, hsl.s, hsl.l),
        baseHex,
        hslToHex((hsl.h + 15) % 360, hsl.s, hsl.l),
        hslToHex((hsl.h + 30) % 360, hsl.s, hsl.l)
      ];
    }
    
    function generateTriadic(baseHex) {
      const hsl = hexToHsl(baseHex);
      return [
        baseHex,
        hslToHex((hsl.h + 120) % 360, hsl.s, hsl.l),
        hslToHex((hsl.h + 240) % 360, hsl.s, hsl.l),
        hslToHex(hsl.h, hsl.s, hsl.l - 15),
        hslToHex((hsl.h + 120) % 360, hsl.s, hsl.l - 15)
      ];
    }
    
    function generateTetradic(baseHex) {
      const hsl = hexToHsl(baseHex);
      return [
        baseHex,
        hslToHex((hsl.h + 90) % 360, hsl.s, hsl.l),
        hslToHex((hsl.h + 180) % 360, hsl.s, hsl.l),
        hslToHex((hsl.h + 270) % 360, hsl.s, hsl.l),
        hslToHex(hsl.h, hsl.s, hsl.l - 15)
      ];
    }
    
    function renderSchemes(schemes) {
      const container = document.getElementById('schemesContainer');
      
      container.innerHTML = Object.values(schemes).map(scheme => `
        <div class="scheme-section">
          <div class="scheme-title">${scheme.title}</div>
          <div class="scheme-desc">${scheme.desc}</div>
          <div class="colors-row">
            ${scheme.colors.map(color => `
              <div class="color-card" onclick="copyColor('${color}')">
                <div class="color-swatch" style="background: ${color}"></div>
                <div class="color-info">
                  <div class="color-hex">${color}</div>
                </div>
              </div>
            `).join('')}
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


