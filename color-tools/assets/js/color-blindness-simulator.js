const simulations = [
      {
        name: 'Normal Vision',
        desc: 'No color vision deficiency. Full color spectrum visible.',
        type: 'normal'
      },
      {
        name: 'Protanopia',
        desc: 'Red-blind. Lack of red cones. Affects ~1% of males. Reds appear darker.',
        type: 'protanopia'
      },
      {
        name: 'Deuteranopia',
        desc: 'Green-blind. Lack of green cones. Most common, affects ~1% of males.',
        type: 'deuteranopia'
      },
      {
        name: 'Tritanopia',
        desc: 'Blue-blind. Lack of blue cones. Very rare, affects <0.01% of people.',
        type: 'tritanopia'
      },
      {
        name: 'Protanomaly',
        desc: 'Red-weak. Anomalous red cones. Affects ~1% of males.',
        type: 'protanomaly'
      },
      {
        name: 'Deuteranomaly',
        desc: 'Green-weak. Most common form, affects ~5% of males.',
        type: 'deuteranomaly'
      },
      {
        name: 'Tritanomaly',
        desc: 'Blue-weak. Anomalous blue cones. Very rare.',
        type: 'tritanomaly'
      },
      {
        name: 'Achromatopsia',
        desc: 'Complete color blindness. Only black, white, and gray visible. Extremely rare.',
        type: 'achromatopsia'
      }
    ];
    
    function hexToRgb(hex) {
      const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
      } : null;
    }
    
    function rgbToHex(r, g, b) {
      const toHex = x => {
        const hex = Math.round(Math.max(0, Math.min(255, x))).toString(16);
        return hex.length === 1 ? '0' + hex : hex;
      };
      return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
    }
    
    function simulateColorBlindness(hex, type) {
      const rgb = hexToRgb(hex);
      let r = rgb.r, g = rgb.g, b = rgb.b;
      
      switch(type) {
        case 'normal':
          return hex;
          
        case 'protanopia': // No red
          return rgbToHex(
            0.567 * r + 0.433 * g,
            0.558 * r + 0.442 * g,
            0.242 * g + 0.758 * b
          );
          
        case 'deuteranopia': // No green
          return rgbToHex(
            0.625 * r + 0.375 * g,
            0.7 * r + 0.3 * g,
            0.3 * g + 0.7 * b
          );
          
        case 'tritanopia': // No blue
          return rgbToHex(
            0.95 * r + 0.05 * g,
            0.433 * r + 0.567 * g,
            0.475 * r + 0.525 * g
          );
          
        case 'protanomaly': // Weak red
          return rgbToHex(
            0.817 * r + 0.183 * g,
            0.333 * r + 0.667 * g,
            0.125 * g + 0.875 * b
          );
          
        case 'deuteranomaly': // Weak green
          return rgbToHex(
            0.8 * r + 0.2 * g,
            0.258 * r + 0.742 * g,
            0.142 * g + 0.858 * b
          );
          
        case 'tritanomaly': // Weak blue
          return rgbToHex(
            0.967 * r + 0.033 * g,
            0.733 * g + 0.267 * b,
            0.183 * r + 0.817 * b
          );
          
        case 'achromatopsia': // Grayscale
          const gray = 0.299 * r + 0.587 * g + 0.114 * b;
          return rgbToHex(gray, gray, gray);
      }
      
      return hex;
    }
    
    function updateSimulations() {
      const colors = [
        document.getElementById('color1').value,
        document.getElementById('color2').value,
        document.getElementById('color3').value,
        document.getElementById('color4').value
      ];
      
      // Update hex displays
      colors.forEach((color, i) => {
        document.getElementById(`hex${i + 1}`).textContent = color;
      });
      
      const grid = document.getElementById('simulationsGrid');
      
      grid.innerHTML = simulations.map(sim => {
        const simulatedColors = colors.map(color => 
          simulateColorBlindness(color, sim.type)
        );
        
        const previewHtml = simulatedColors.map(color => 
          `<div class="sim-color" style="background: ${color}"></div>`
        ).join('');
        
        const valuesHtml = simulatedColors.map(color => 
          `<div class="value-chip">${color}</div>`
        ).join('');
        
        return `
          <div class="simulation-card">
            <div class="sim-title">${sim.name}</div>
            <div class="sim-desc">${sim.desc}</div>
            <div class="sim-preview">${previewHtml}</div>
            <div class="sim-values">${valuesHtml}</div>
          </div>
        `;
      }).join('');
    }
    
    ['color1', 'color2', 'color3', 'color4'].forEach(id => {
      document.getElementById(id).addEventListener('input', updateSimulations);
    });
    
    updateSimulations();

const simulations = [
      {
        name: 'Normal Vision',
        desc: 'No color vision deficiency. Full color spectrum visible.',
        type: 'normal'
      },
      {
        name: 'Protanopia',
        desc: 'Red-blind. Lack of red cones. Affects ~1% of males. Reds appear darker.',
        type: 'protanopia'
      },
      {
        name: 'Deuteranopia',
        desc: 'Green-blind. Lack of green cones. Most common, affects ~1% of males.',
        type: 'deuteranopia'
      },
      {
        name: 'Tritanopia',
        desc: 'Blue-blind. Lack of blue cones. Very rare, affects <0.01% of people.',
        type: 'tritanopia'
      },
      {
        name: 'Protanomaly',
        desc: 'Red-weak. Anomalous red cones. Affects ~1% of males.',
        type: 'protanomaly'
      },
      {
        name: 'Deuteranomaly',
        desc: 'Green-weak. Most common form, affects ~5% of males.',
        type: 'deuteranomaly'
      },
      {
        name: 'Tritanomaly',
        desc: 'Blue-weak. Anomalous blue cones. Very rare.',
        type: 'tritanomaly'
      },
      {
        name: 'Achromatopsia',
        desc: 'Complete color blindness. Only black, white, and gray visible. Extremely rare.',
        type: 'achromatopsia'
      }
    ];
    
    function hexToRgb(hex) {
      const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
      } : null;
    }
    
    function rgbToHex(r, g, b) {
      const toHex = x => {
        const hex = Math.round(Math.max(0, Math.min(255, x))).toString(16);
        return hex.length === 1 ? '0' + hex : hex;
      };
      return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
    }
    
    function simulateColorBlindness(hex, type) {
      const rgb = hexToRgb(hex);
      let r = rgb.r, g = rgb.g, b = rgb.b;
      
      switch(type) {
        case 'normal':
          return hex;
          
        case 'protanopia': // No red
          return rgbToHex(
            0.567 * r + 0.433 * g,
            0.558 * r + 0.442 * g,
            0.242 * g + 0.758 * b
          );
          
        case 'deuteranopia': // No green
          return rgbToHex(
            0.625 * r + 0.375 * g,
            0.7 * r + 0.3 * g,
            0.3 * g + 0.7 * b
          );
          
        case 'tritanopia': // No blue
          return rgbToHex(
            0.95 * r + 0.05 * g,
            0.433 * r + 0.567 * g,
            0.475 * r + 0.525 * g
          );
          
        case 'protanomaly': // Weak red
          return rgbToHex(
            0.817 * r + 0.183 * g,
            0.333 * r + 0.667 * g,
            0.125 * g + 0.875 * b
          );
          
        case 'deuteranomaly': // Weak green
          return rgbToHex(
            0.8 * r + 0.2 * g,
            0.258 * r + 0.742 * g,
            0.142 * g + 0.858 * b
          );
          
        case 'tritanomaly': // Weak blue
          return rgbToHex(
            0.967 * r + 0.033 * g,
            0.733 * g + 0.267 * b,
            0.183 * r + 0.817 * b
          );
          
        case 'achromatopsia': // Grayscale
          const gray = 0.299 * r + 0.587 * g + 0.114 * b;
          return rgbToHex(gray, gray, gray);
      }
      
      return hex;
    }
    
    function updateSimulations() {
      const colors = [
        document.getElementById('color1').value,
        document.getElementById('color2').value,
        document.getElementById('color3').value,
        document.getElementById('color4').value
      ];
      
      // Update hex displays
      colors.forEach((color, i) => {
        document.getElementById(`hex${i + 1}`).textContent = color;
      });
      
      const grid = document.getElementById('simulationsGrid');
      
      grid.innerHTML = simulations.map(sim => {
        const simulatedColors = colors.map(color => 
          simulateColorBlindness(color, sim.type)
        );
        
        const previewHtml = simulatedColors.map(color => 
          `<div class="sim-color" style="background: ${color}"></div>`
        ).join('');
        
        const valuesHtml = simulatedColors.map(color => 
          `<div class="value-chip">${color}</div>`
        ).join('');
        
        return `
          <div class="simulation-card">
            <div class="sim-title">${sim.name}</div>
            <div class="sim-desc">${sim.desc}</div>
            <div class="sim-preview">${previewHtml}</div>
            <div class="sim-values">${valuesHtml}</div>
          </div>
        `;
      }).join('');
    }
    
    ['color1', 'color2', 'color3', 'color4'].forEach(id => {
      document.getElementById(id).addEventListener('input', updateSimulations);
    });
    
    updateSimulations();


