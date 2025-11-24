function hexToRgb(hex) {
      const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
      } : null;
    }
    
    function rgbToHex(r, g, b) {
      return '#' + [r, g, b].map(x => {
        const hex = Math.round(x).toString(16);
        return hex.length === 1 ? '0' + hex : hex;
      }).join('');
    }
    
    function adjustLightness(hex, amount) {
      const rgb = hexToRgb(hex);
      return rgbToHex(
        Math.max(0, Math.min(255, rgb.r + amount)),
        Math.max(0, Math.min(255, rgb.g + amount)),
        Math.max(0, Math.min(255, rgb.b + amount))
      );
    }
    
    function mixColors(color1, color2, ratio = 0.5) {
      const rgb1 = hexToRgb(color1);
      const rgb2 = hexToRgb(color2);
      
      return rgbToHex(
        rgb1.r * (1 - ratio) + rgb2.r * ratio,
        rgb1.g * (1 - ratio) + rgb2.g * ratio,
        rgb1.b * (1 - ratio) + rgb2.b * ratio
      );
    }
    
    function generateTheme() {
      const primary = document.getElementById('primaryColor').value;
      const secondary = document.getElementById('secondaryColor').value;
      const accent = document.getElementById('accentColor').value;
      
      const theme = {
        main: {
          'Primary': primary,
          'Primary Light': adjustLightness(primary, 40),
          'Primary Dark': adjustLightness(primary, -40),
          'Secondary': secondary,
          'Secondary Light': adjustLightness(secondary, 40),
          'Secondary Dark': adjustLightness(secondary, -40),
          'Accent': accent,
          'Accent Light': adjustLightness(accent, 40)
        },
        backgrounds: {
          'Background Primary': '#ffffff',
          'Background Secondary': '#f7fafc',
          'Background Tertiary': '#edf2f7',
          'Surface': '#ffffff',
          'Surface Elevated': '#f7fafc',
          'Overlay': 'rgba(0, 0, 0, 0.5)'
        },
        text: {
          'Text Primary': '#1a202c',
          'Text Secondary': '#4a5568',
          'Text Tertiary': '#718096',
          'Text Disabled': '#cbd5e0',
          'Text On Primary': '#ffffff',
          'Text On Secondary': '#ffffff'
        },
        borders: {
          'Border': '#e2e8f0',
          'Border Light': '#f7fafc',
          'Border Dark': '#cbd5e0',
          'Divider': '#edf2f7'
        },
        states: {
          'Success': '#48bb78',
          'Success Light': '#9ae6b4',
          'Warning': '#ed8936',
          'Warning Light': '#fbd38d',
          'Error': '#f56565',
          'Error Light': '#fc8181',
          'Info': '#4299e1',
          'Info Light': '#90cdf4'
        }
      };
      
      renderTheme(theme);
      applyThemeVariables(theme);
      
      document.getElementById('themePreview').classList.add('active');
    }
    
    function renderTheme(theme) {
      renderSection('mainColors', theme.main);
      renderSection('bgColors', theme.backgrounds);
      renderSection('textColors', theme.text);
      renderSection('borderColors', theme.borders);
      renderSection('stateColors', theme.states);
    }
    
    function renderSection(id, colors) {
      const container = document.getElementById(id);
      
      container.innerHTML = Object.entries(colors).map(([name, value]) => {
        const textColor = isLight(value) ? '#1a202c' : '#ffffff';
        
        return `
          <div class="color-item" onclick="copyColor('${value}', '${name}')">
            <div class="color-swatch" style="background: ${value}; display: flex; align-items: center; justify-content: center; color: ${textColor}; font-size: 11px; font-weight: 600;">
              ${name}
            </div>
            <div class="color-details">
              <div class="color-name">${name}</div>
              <div class="color-value">${value}</div>
            </div>
          </div>
        `;
      }).join('');
    }
    
    function isLight(hex) {
      if (hex.startsWith('rgba')) return true;
      const rgb = hexToRgb(hex);
      if (!rgb) return true;
      const brightness = (rgb.r * 299 + rgb.g * 587 + rgb.b * 114) / 1000;
      return brightness > 128;
    }
    
    function applyThemeVariables(theme) {
      const demo = document.getElementById('uiDemo');
      
      demo.style.setProperty('--primary', theme.main['Primary']);
      demo.style.setProperty('--secondary', theme.main['Secondary']);
      demo.style.setProperty('--accent', theme.main['Accent']);
      demo.style.setProperty('--bg-primary', theme.backgrounds['Background Primary']);
      demo.style.setProperty('--bg-secondary', theme.backgrounds['Background Secondary']);
      demo.style.setProperty('--text-primary', theme.text['Text Primary']);
      demo.style.setProperty('--text-secondary', theme.text['Text Secondary']);
      demo.style.setProperty('--border', theme.borders['Border']);
    }
    
    function copyColor(value, name) {
      navigator.clipboard.writeText(value).then(() => {
        const toast = document.getElementById('toast');
        toast.textContent = `Copied ${name}: ${value}`;
        toast.classList.add('show');
        setTimeout(() => {
          toast.classList.remove('show');
          setTimeout(() => toast.textContent = 'Copied to clipboard!', 300);
        }, 2000);
      });
    }

function hexToRgb(hex) {
      const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
      } : null;
    }
    
    function rgbToHex(r, g, b) {
      return '#' + [r, g, b].map(x => {
        const hex = Math.round(x).toString(16);
        return hex.length === 1 ? '0' + hex : hex;
      }).join('');
    }
    
    function adjustLightness(hex, amount) {
      const rgb = hexToRgb(hex);
      return rgbToHex(
        Math.max(0, Math.min(255, rgb.r + amount)),
        Math.max(0, Math.min(255, rgb.g + amount)),
        Math.max(0, Math.min(255, rgb.b + amount))
      );
    }
    
    function mixColors(color1, color2, ratio = 0.5) {
      const rgb1 = hexToRgb(color1);
      const rgb2 = hexToRgb(color2);
      
      return rgbToHex(
        rgb1.r * (1 - ratio) + rgb2.r * ratio,
        rgb1.g * (1 - ratio) + rgb2.g * ratio,
        rgb1.b * (1 - ratio) + rgb2.b * ratio
      );
    }
    
    function generateTheme() {
      const primary = document.getElementById('primaryColor').value;
      const secondary = document.getElementById('secondaryColor').value;
      const accent = document.getElementById('accentColor').value;
      
      const theme = {
        main: {
          'Primary': primary,
          'Primary Light': adjustLightness(primary, 40),
          'Primary Dark': adjustLightness(primary, -40),
          'Secondary': secondary,
          'Secondary Light': adjustLightness(secondary, 40),
          'Secondary Dark': adjustLightness(secondary, -40),
          'Accent': accent,
          'Accent Light': adjustLightness(accent, 40)
        },
        backgrounds: {
          'Background Primary': '#ffffff',
          'Background Secondary': '#f7fafc',
          'Background Tertiary': '#edf2f7',
          'Surface': '#ffffff',
          'Surface Elevated': '#f7fafc',
          'Overlay': 'rgba(0, 0, 0, 0.5)'
        },
        text: {
          'Text Primary': '#1a202c',
          'Text Secondary': '#4a5568',
          'Text Tertiary': '#718096',
          'Text Disabled': '#cbd5e0',
          'Text On Primary': '#ffffff',
          'Text On Secondary': '#ffffff'
        },
        borders: {
          'Border': '#e2e8f0',
          'Border Light': '#f7fafc',
          'Border Dark': '#cbd5e0',
          'Divider': '#edf2f7'
        },
        states: {
          'Success': '#48bb78',
          'Success Light': '#9ae6b4',
          'Warning': '#ed8936',
          'Warning Light': '#fbd38d',
          'Error': '#f56565',
          'Error Light': '#fc8181',
          'Info': '#4299e1',
          'Info Light': '#90cdf4'
        }
      };
      
      renderTheme(theme);
      applyThemeVariables(theme);
      
      document.getElementById('themePreview').classList.add('active');
    }
    
    function renderTheme(theme) {
      renderSection('mainColors', theme.main);
      renderSection('bgColors', theme.backgrounds);
      renderSection('textColors', theme.text);
      renderSection('borderColors', theme.borders);
      renderSection('stateColors', theme.states);
    }
    
    function renderSection(id, colors) {
      const container = document.getElementById(id);
      
      container.innerHTML = Object.entries(colors).map(([name, value]) => {
        const textColor = isLight(value) ? '#1a202c' : '#ffffff';
        
        return `
          <div class="color-item" onclick="copyColor('${value}', '${name}')">
            <div class="color-swatch" style="background: ${value}; display: flex; align-items: center; justify-content: center; color: ${textColor}; font-size: 11px; font-weight: 600;">
              ${name}
            </div>
            <div class="color-details">
              <div class="color-name">${name}</div>
              <div class="color-value">${value}</div>
            </div>
          </div>
        `;
      }).join('');
    }
    
    function isLight(hex) {
      if (hex.startsWith('rgba')) return true;
      const rgb = hexToRgb(hex);
      if (!rgb) return true;
      const brightness = (rgb.r * 299 + rgb.g * 587 + rgb.b * 114) / 1000;
      return brightness > 128;
    }
    
    function applyThemeVariables(theme) {
      const demo = document.getElementById('uiDemo');
      
      demo.style.setProperty('--primary', theme.main['Primary']);
      demo.style.setProperty('--secondary', theme.main['Secondary']);
      demo.style.setProperty('--accent', theme.main['Accent']);
      demo.style.setProperty('--bg-primary', theme.backgrounds['Background Primary']);
      demo.style.setProperty('--bg-secondary', theme.backgrounds['Background Secondary']);
      demo.style.setProperty('--text-primary', theme.text['Text Primary']);
      demo.style.setProperty('--text-secondary', theme.text['Text Secondary']);
      demo.style.setProperty('--border', theme.borders['Border']);
    }
    
    function copyColor(value, name) {
      navigator.clipboard.writeText(value).then(() => {
        const toast = document.getElementById('toast');
        toast.textContent = `Copied ${name}: ${value}`;
        toast.classList.add('show');
        setTimeout(() => {
          toast.classList.remove('show');
          setTimeout(() => toast.textContent = 'Copied to clipboard!', 300);
        }, 2000);
      });
    }


