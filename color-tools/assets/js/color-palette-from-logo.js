const fileInput = document.getElementById('fileInput');
    const logoImage = document.getElementById('logoImage');
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    
    fileInput.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
          logoImage.onload = () => {
            extractColors();
            document.getElementById('resultsSection').classList.add('active');
          };
          logoImage.src = event.target.result;
        };
        reader.readAsDataURL(file);
      }
    });
    
    function extractColors() {
      const maxSize = 200;
      const scale = Math.min(maxSize / logoImage.width, maxSize / logoImage.height);
      canvas.width = logoImage.width * scale;
      canvas.height = logoImage.height * scale;
      
      ctx.drawImage(logoImage, 0, 0, canvas.width, canvas.height);
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const pixels = imageData.data;
      
      const colors = kMeans(pixels, 5);
      const primary = colors[0];
      
      renderExtractedColors(colors);
      renderSuggestedPalette(primary);
      renderUsageGuide(colors);
    }
    
    function kMeans(pixels, k) {
      const points = [];
      for (let i = 0; i < pixels.length; i += 4) {
        if (pixels[i + 3] > 128) { // Skip transparent pixels
          points.push([pixels[i], pixels[i + 1], pixels[i + 2]]);
        }
      }
      
      let centroids = [];
      for (let i = 0; i < k; i++) {
        centroids.push(points[Math.floor(Math.random() * points.length)]);
      }
      
      for (let iter = 0; iter < 10; iter++) {
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
    
    function renderExtractedColors(colors) {
      const container = document.getElementById('extractedColors');
      container.innerHTML = colors.map(color => `
        <div class="color-card" onclick="copyColor('${color}')">
          <div class="color-swatch" style="background: ${color}"></div>
          <div class="color-info">
            <div class="color-hex">${color}</div>
          </div>
        </div>
      `).join('');
    }
    
    function renderSuggestedPalette(primary) {
      const hsl = hexToHsl(primary);
      const suggested = [
        { name: 'Primary', color: primary },
        { name: 'Light', color: hslToHex(hsl.h, hsl.s, Math.min(90, hsl.l + 30)) },
        { name: 'Dark', color: hslToHex(hsl.h, hsl.s, Math.max(20, hsl.l - 20)) },
        { name: 'Accent', color: hslToHex((hsl.h + 180) % 360, hsl.s, hsl.l) },
        { name: 'Neutral', color: hslToHex(hsl.h, 10, 50) }
      ];
      
      const container = document.getElementById('suggestedColors');
      container.innerHTML = suggested.map(({ name, color }) => `
        <div class="color-card" onclick="copyColor('${color}')">
          <div class="color-swatch" style="background: ${color}"></div>
          <div class="color-info">
            <div style="font-size: 11px; color: #718096; margin-bottom: 4px;">${name}</div>
            <div class="color-hex">${color}</div>
          </div>
        </div>
      `).join('');
    }
    
    function renderUsageGuide(colors) {
      const container = document.getElementById('usageGuide');
      container.innerHTML = `
        <div class="usage-card" style="--accent-color: ${colors[0]}">
          <div class="usage-title">Primary Brand Color</div>
          <div class="usage-desc">Use for logos, main CTAs, and key brand elements</div>
        </div>
        <div class="usage-card" style="--accent-color: ${colors[1]}">
          <div class="usage-title">Secondary Color</div>
          <div class="usage-desc">Supporting elements, highlights, and accents</div>
        </div>
        <div class="usage-card" style="--accent-color: ${colors[2]}">
          <div class="usage-title">Tertiary Color</div>
          <div class="usage-desc">Backgrounds, cards, and subtle details</div>
        </div>
        <div class="usage-card" style="--accent-color: #718096">
          <div class="usage-title">Neutral Colors</div>
          <div class="usage-desc">Text, borders, and interface elements</div>
        </div>
      `;
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
    const logoImage = document.getElementById('logoImage');
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    
    fileInput.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
          logoImage.onload = () => {
            extractColors();
            document.getElementById('resultsSection').classList.add('active');
          };
          logoImage.src = event.target.result;
        };
        reader.readAsDataURL(file);
      }
    });
    
    function extractColors() {
      const maxSize = 200;
      const scale = Math.min(maxSize / logoImage.width, maxSize / logoImage.height);
      canvas.width = logoImage.width * scale;
      canvas.height = logoImage.height * scale;
      
      ctx.drawImage(logoImage, 0, 0, canvas.width, canvas.height);
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const pixels = imageData.data;
      
      const colors = kMeans(pixels, 5);
      const primary = colors[0];
      
      renderExtractedColors(colors);
      renderSuggestedPalette(primary);
      renderUsageGuide(colors);
    }
    
    function kMeans(pixels, k) {
      const points = [];
      for (let i = 0; i < pixels.length; i += 4) {
        if (pixels[i + 3] > 128) { // Skip transparent pixels
          points.push([pixels[i], pixels[i + 1], pixels[i + 2]]);
        }
      }
      
      let centroids = [];
      for (let i = 0; i < k; i++) {
        centroids.push(points[Math.floor(Math.random() * points.length)]);
      }
      
      for (let iter = 0; iter < 10; iter++) {
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
    
    function renderExtractedColors(colors) {
      const container = document.getElementById('extractedColors');
      container.innerHTML = colors.map(color => `
        <div class="color-card" onclick="copyColor('${color}')">
          <div class="color-swatch" style="background: ${color}"></div>
          <div class="color-info">
            <div class="color-hex">${color}</div>
          </div>
        </div>
      `).join('');
    }
    
    function renderSuggestedPalette(primary) {
      const hsl = hexToHsl(primary);
      const suggested = [
        { name: 'Primary', color: primary },
        { name: 'Light', color: hslToHex(hsl.h, hsl.s, Math.min(90, hsl.l + 30)) },
        { name: 'Dark', color: hslToHex(hsl.h, hsl.s, Math.max(20, hsl.l - 20)) },
        { name: 'Accent', color: hslToHex((hsl.h + 180) % 360, hsl.s, hsl.l) },
        { name: 'Neutral', color: hslToHex(hsl.h, 10, 50) }
      ];
      
      const container = document.getElementById('suggestedColors');
      container.innerHTML = suggested.map(({ name, color }) => `
        <div class="color-card" onclick="copyColor('${color}')">
          <div class="color-swatch" style="background: ${color}"></div>
          <div class="color-info">
            <div style="font-size: 11px; color: #718096; margin-bottom: 4px;">${name}</div>
            <div class="color-hex">${color}</div>
          </div>
        </div>
      `).join('');
    }
    
    function renderUsageGuide(colors) {
      const container = document.getElementById('usageGuide');
      container.innerHTML = `
        <div class="usage-card" style="--accent-color: ${colors[0]}">
          <div class="usage-title">Primary Brand Color</div>
          <div class="usage-desc">Use for logos, main CTAs, and key brand elements</div>
        </div>
        <div class="usage-card" style="--accent-color: ${colors[1]}">
          <div class="usage-title">Secondary Color</div>
          <div class="usage-desc">Supporting elements, highlights, and accents</div>
        </div>
        <div class="usage-card" style="--accent-color: ${colors[2]}">
          <div class="usage-title">Tertiary Color</div>
          <div class="usage-desc">Backgrounds, cards, and subtle details</div>
        </div>
        <div class="usage-card" style="--accent-color: #718096">
          <div class="usage-title">Neutral Colors</div>
          <div class="usage-desc">Text, borders, and interface elements</div>
        </div>
      `;
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


