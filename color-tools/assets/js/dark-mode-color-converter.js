function init() {
      updateAllPreviews();
      setupSliders();
    }

    function setupSliders() {
      document.getElementById('luminanceAdjust').addEventListener('input', (e) => {
        document.getElementById('luminanceValue').textContent = e.target.value;
      });
      document.getElementById('saturationShift').addEventListener('input', (e) => {
        document.getElementById('saturationValue').textContent = e.target.value;
      });
      document.getElementById('hueRotation').addEventListener('input', (e) => {
        document.getElementById('hueValue').textContent = e.target.value;
      });
    }

    function addLightColor() {
      const container = document.getElementById('lightColors');
      const row = document.createElement('div');
      row.className = 'color-row';
      row.innerHTML = `
        <input type="text" class="color-name" placeholder="name" value="">
        <input type="color" class="color-picker" value="#000000">
        <div class="color-preview" style="background: #000000; color: #ffffff;" onclick="copyColor(this)">#000000</div>
        <button class="delete-btn" onclick="deleteColor(this)">×</button>
      `;
      container.appendChild(row);
      attachLightColorListeners(row);
    }

    function deleteColor(btn) {
      const row = btn.closest('.color-row');
      const index = Array.from(row.parentElement.children).indexOf(row);
      row.remove();
      
      const darkContainer = document.getElementById('darkColors');
      if (darkContainer.children[index]) {
        darkContainer.children[index].remove();
      }
    }

    function updateAllPreviews() {
      document.querySelectorAll('#lightColors .color-row').forEach(row => {
        attachLightColorListeners(row);
      });
    }

    function attachLightColorListeners(row) {
      const picker = row.querySelector('.color-picker');
      const preview = row.querySelector('.color-preview');

      picker.addEventListener('input', (e) => {
        const color = e.target.value;
        preview.style.background = color;
        preview.textContent = color;
        preview.style.color = getContrastColor(color);
      });
    }

    function convertToDark() {
      const lightRows = document.querySelectorAll('#lightColors .color-row');
      const darkContainer = document.getElementById('darkColors');
      darkContainer.innerHTML = '';

      const luminance = parseInt(document.getElementById('luminanceAdjust').value) / 100;
      const saturationShift = parseInt(document.getElementById('saturationShift').value);
      const hueRotation = parseInt(document.getElementById('hueRotation').value);

      lightRows.forEach(lightRow => {
        const name = lightRow.querySelector('.color-name').value;
        const lightColor = lightRow.querySelector('.color-picker').value;
        const darkColor = convertColorToDark(lightColor, luminance, saturationShift, hueRotation);

        const darkRow = document.createElement('div');
        darkRow.className = 'color-row';
        darkRow.innerHTML = `
          <input type="text" class="color-name" placeholder="${name}" value="${name}" readonly>
          <input type="color" class="color-picker" value="${darkColor}">
          <div class="color-preview" style="background: ${darkColor}; color: ${getContrastColor(darkColor)};" onclick="copyColor(this)">${darkColor}</div>
          <button class="add-btn-small" style="background: #3b82f6;" onclick="applyColor(this)">✓</button>
        `;
        darkContainer.appendChild(darkRow);
      });

      showToast('Converted to dark mode!');
    }

    function convertColorToDark(hex, luminance, saturationShift, hueRotation) {
      const hsl = hexToHSL(hex);
      
      // Invert lightness for dark mode
      let newLightness = 100 - hsl.l;
      newLightness = newLightness * luminance;
      
      // Adjust saturation
      let newSaturation = hsl.s + saturationShift;
      newSaturation = Math.max(0, Math.min(100, newSaturation));
      
      // Rotate hue
      let newHue = hsl.h + hueRotation;
      if (newHue < 0) newHue += 360;
      if (newHue > 360) newHue -= 360;
      
      return hslToHex(newHue, newSaturation, newLightness);
    }

    function hexToHSL(hex) {
      let r = parseInt(hex.slice(1, 3), 16) / 255;
      let g = parseInt(hex.slice(3, 5), 16) / 255;
      let b = parseInt(hex.slice(5, 7), 16) / 255;

      const max = Math.max(r, g, b);
      const min = Math.min(r, g, b);
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
      h = h / 360;
      s = s / 100;
      l = l / 100;

      let r, g, b;
      if (s === 0) {
        r = g = b = l;
      } else {
        const hue2rgb = (p, q, t) => {
          if (t < 0) t += 1;
          if (t > 1) t -= 1;
          if (t < 1/6) return p + (q - p) * 6 * t;
          if (t < 1/2) return q;
          if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
          return p;
        };
        const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        const p = 2 * l - q;
        r = hue2rgb(p, q, h + 1/3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1/3);
      }

      const toHex = x => {
        const hex = Math.round(x * 255).toString(16);
        return hex.length === 1 ? '0' + hex : hex;
      };

      return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
    }

    function getContrastColor(hex) {
      const r = parseInt(hex.slice(1, 3), 16);
      const g = parseInt(hex.slice(3, 5), 16);
      const b = parseInt(hex.slice(5, 7), 16);
      const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
      return luminance > 0.5 ? '#000000' : '#ffffff';
    }

    function copyColor(preview) {
      const color = preview.textContent;
      navigator.clipboard.writeText(color).then(() => {
        showToast(`Copied ${color}!`);
      });
    }

    function applyColor(btn) {
      const row = btn.closest('.color-row');
      const picker = row.querySelector('.color-picker');
      const preview = row.querySelector('.color-preview');
      preview.style.background = picker.value;
      preview.textContent = picker.value;
      preview.style.color = getContrastColor(picker.value);
      showToast('Color applied!');
    }

    function showToast(message) {
      const existingToast = document.querySelector('.toast');
      if (existingToast) existingToast.remove();
      
      const toast = document.createElement('div');
      toast.className = 'toast';
      toast.textContent = message;
      document.body.appendChild(toast);
      
      setTimeout(() => toast.remove(), 3000);
    }

    init();

function init() {
      updateAllPreviews();
      setupSliders();
    }

    function setupSliders() {
      document.getElementById('luminanceAdjust').addEventListener('input', (e) => {
        document.getElementById('luminanceValue').textContent = e.target.value;
      });
      document.getElementById('saturationShift').addEventListener('input', (e) => {
        document.getElementById('saturationValue').textContent = e.target.value;
      });
      document.getElementById('hueRotation').addEventListener('input', (e) => {
        document.getElementById('hueValue').textContent = e.target.value;
      });
    }

    function addLightColor() {
      const container = document.getElementById('lightColors');
      const row = document.createElement('div');
      row.className = 'color-row';
      row.innerHTML = `
        <input type="text" class="color-name" placeholder="name" value="">
        <input type="color" class="color-picker" value="#000000">
        <div class="color-preview" style="background: #000000; color: #ffffff;" onclick="copyColor(this)">#000000</div>
        <button class="delete-btn" onclick="deleteColor(this)">×</button>
      `;
      container.appendChild(row);
      attachLightColorListeners(row);
    }

    function deleteColor(btn) {
      const row = btn.closest('.color-row');
      const index = Array.from(row.parentElement.children).indexOf(row);
      row.remove();
      
      const darkContainer = document.getElementById('darkColors');
      if (darkContainer.children[index]) {
        darkContainer.children[index].remove();
      }
    }

    function updateAllPreviews() {
      document.querySelectorAll('#lightColors .color-row').forEach(row => {
        attachLightColorListeners(row);
      });
    }

    function attachLightColorListeners(row) {
      const picker = row.querySelector('.color-picker');
      const preview = row.querySelector('.color-preview');

      picker.addEventListener('input', (e) => {
        const color = e.target.value;
        preview.style.background = color;
        preview.textContent = color;
        preview.style.color = getContrastColor(color);
      });
    }

    function convertToDark() {
      const lightRows = document.querySelectorAll('#lightColors .color-row');
      const darkContainer = document.getElementById('darkColors');
      darkContainer.innerHTML = '';

      const luminance = parseInt(document.getElementById('luminanceAdjust').value) / 100;
      const saturationShift = parseInt(document.getElementById('saturationShift').value);
      const hueRotation = parseInt(document.getElementById('hueRotation').value);

      lightRows.forEach(lightRow => {
        const name = lightRow.querySelector('.color-name').value;
        const lightColor = lightRow.querySelector('.color-picker').value;
        const darkColor = convertColorToDark(lightColor, luminance, saturationShift, hueRotation);

        const darkRow = document.createElement('div');
        darkRow.className = 'color-row';
        darkRow.innerHTML = `
          <input type="text" class="color-name" placeholder="${name}" value="${name}" readonly>
          <input type="color" class="color-picker" value="${darkColor}">
          <div class="color-preview" style="background: ${darkColor}; color: ${getContrastColor(darkColor)};" onclick="copyColor(this)">${darkColor}</div>
          <button class="add-btn-small" style="background: #3b82f6;" onclick="applyColor(this)">✓</button>
        `;
        darkContainer.appendChild(darkRow);
      });

      showToast('Converted to dark mode!');
    }

    function convertColorToDark(hex, luminance, saturationShift, hueRotation) {
      const hsl = hexToHSL(hex);
      
      // Invert lightness for dark mode
      let newLightness = 100 - hsl.l;
      newLightness = newLightness * luminance;
      
      // Adjust saturation
      let newSaturation = hsl.s + saturationShift;
      newSaturation = Math.max(0, Math.min(100, newSaturation));
      
      // Rotate hue
      let newHue = hsl.h + hueRotation;
      if (newHue < 0) newHue += 360;
      if (newHue > 360) newHue -= 360;
      
      return hslToHex(newHue, newSaturation, newLightness);
    }

    function hexToHSL(hex) {
      let r = parseInt(hex.slice(1, 3), 16) / 255;
      let g = parseInt(hex.slice(3, 5), 16) / 255;
      let b = parseInt(hex.slice(5, 7), 16) / 255;

      const max = Math.max(r, g, b);
      const min = Math.min(r, g, b);
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
      h = h / 360;
      s = s / 100;
      l = l / 100;

      let r, g, b;
      if (s === 0) {
        r = g = b = l;
      } else {
        const hue2rgb = (p, q, t) => {
          if (t < 0) t += 1;
          if (t > 1) t -= 1;
          if (t < 1/6) return p + (q - p) * 6 * t;
          if (t < 1/2) return q;
          if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
          return p;
        };
        const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        const p = 2 * l - q;
        r = hue2rgb(p, q, h + 1/3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1/3);
      }

      const toHex = x => {
        const hex = Math.round(x * 255).toString(16);
        return hex.length === 1 ? '0' + hex : hex;
      };

      return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
    }

    function getContrastColor(hex) {
      const r = parseInt(hex.slice(1, 3), 16);
      const g = parseInt(hex.slice(3, 5), 16);
      const b = parseInt(hex.slice(5, 7), 16);
      const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
      return luminance > 0.5 ? '#000000' : '#ffffff';
    }

    function copyColor(preview) {
      const color = preview.textContent;
      navigator.clipboard.writeText(color).then(() => {
        showToast(`Copied ${color}!`);
      });
    }

    function applyColor(btn) {
      const row = btn.closest('.color-row');
      const picker = row.querySelector('.color-picker');
      const preview = row.querySelector('.color-preview');
      preview.style.background = picker.value;
      preview.textContent = picker.value;
      preview.style.color = getContrastColor(picker.value);
      showToast('Color applied!');
    }

    function showToast(message) {
      const existingToast = document.querySelector('.toast');
      if (existingToast) existingToast.remove();
      
      const toast = document.createElement('div');
      toast.className = 'toast';
      toast.textContent = message;
      document.body.appendChild(toast);
      
      setTimeout(() => toast.remove(), 3000);
    }

    init();


