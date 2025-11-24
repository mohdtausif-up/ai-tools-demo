let combinations = [
      { id: 1, colors: ['#667eea', '#764ba2', '#f093fb', '#4facfe', '#00f2fe'] },
      { id: 2, colors: ['#fa709a', '#fee140', '#30cfd0', '#330867', '#667eea'] }
    ];
    let nextId = 3;
    
    function addCombination() {
      combinations.push({
        id: nextId++,
        colors: ['#667eea', '#48bb78', '#f093fb', '#fbbf24', '#ef4444']
      });
      render();
    }
    
    function deleteCombination(id) {
      combinations = combinations.filter(c => c.id !== id);
      render();
    }
    
    function updateColor(id, index, value) {
      const combo = combinations.find(c => c.id === id);
      if (combo) {
        combo.colors[index] = value;
        render();
      }
    }
    
    function copyPalette(colors, event) {
      event.stopPropagation();
      const paletteStr = colors.join(', ');
      navigator.clipboard.writeText(paletteStr).then(() => {
        const toast = document.getElementById('toast');
        toast.textContent = `Copied palette: ${paletteStr}`;
        toast.classList.add('show');
        setTimeout(() => {
          toast.classList.remove('show');
          setTimeout(() => toast.textContent = 'Copied to clipboard!', 300);
        }, 2000);
      });
    }
    
    function render() {
      const container = document.getElementById('combinationsContainer');
      
      container.innerHTML = combinations.map(combo => `
        <div class="combination-card">
          <div class="combination-header">
            <div class="combination-title">Combination ${combo.id}</div>
            ${combinations.length > 1 ? `<button class="delete-btn" onclick="deleteCombination(${combo.id})">Delete</button>` : ''}
          </div>
          
          <div class="color-inputs">
            ${combo.colors.map((color, i) => `
              <div class="color-input-group">
                <input type="color" value="${color}" 
                       onchange="updateColor(${combo.id}, ${i}, this.value)">
                <input type="text" value="${color}" 
                       onchange="updateColor(${combo.id}, ${i}, this.value)"
                       oninput="if(this.value.match(/^#[0-9A-Fa-f]{6}$/)) updateColor(${combo.id}, ${i}, this.value)">
              </div>
            `).join('')}
          </div>
          
          <div class="preview-modes">
            <div class="preview-box" style="background: linear-gradient(135deg, ${combo.colors.join(', ')})" 
                 onclick="copyPalette([${combo.colors.map(c => `'${c}'`).join(',')}], event)">
              <div class="preview-label">Diagonal Gradient</div>
            </div>
            
            <div class="preview-box" style="background: linear-gradient(90deg, ${combo.colors.join(', ')})" 
                 onclick="copyPalette([${combo.colors.map(c => `'${c}'`).join(',')}], event)">
              <div class="preview-label">Horizontal Gradient</div>
            </div>
            
            <div class="preview-box" style="background: radial-gradient(circle, ${combo.colors.join(', ')})" 
                 onclick="copyPalette([${combo.colors.map(c => `'${c}'`).join(',')}], event)">
              <div class="preview-label">Radial Gradient</div>
            </div>
            
            <div class="preview-box" style="display: flex;" 
                 onclick="copyPalette([${combo.colors.map(c => `'${c}'`).join(',')}], event)">
              ${combo.colors.map(c => `<div style="flex: 1; background: ${c}"></div>`).join('')}
              <div class="preview-label">Color Blocks</div>
            </div>
            
            <div class="preview-box" style="background: ${combo.colors[0]}; display: flex; align-items: center; justify-content: center; flex-direction: column; gap: 15px; padding: 20px;" 
                 onclick="copyPalette([${combo.colors.map(c => `'${c}'`).join(',')}], event)">
              <div style="width: 80%; padding: 15px; background: ${combo.colors[1]}; color: ${combo.colors[4]}; border-radius: 8px; text-align: center; font-weight: 600;">Button</div>
              <div style="width: 80%; padding: 15px; background: ${combo.colors[2]}; color: white; border-radius: 8px; text-align: center; font-weight: 600;">Button</div>
              <div class="preview-label">UI Elements</div>
            </div>
            
            <div class="preview-box" style="background: ${combo.colors[0]}; padding: 20px; display: flex; flex-direction: column; gap: 10px;" 
                 onclick="copyPalette([${combo.colors.map(c => `'${c}'`).join(',')}], event)">
              <div style="padding: 15px; background: white; border-radius: 8px; border-left: 4px solid ${combo.colors[1]}; font-size: 12px; font-weight: 600; color: ${combo.colors[4]};">Card Header</div>
              <div style="padding: 15px; background: white; border-radius: 8px; border-left: 4px solid ${combo.colors[2]}; font-size: 11px; color: #666;">Card Content</div>
              <div class="preview-label">Card Layout</div>
            </div>
          </div>
        </div>
      `).join('');
    }
    
    render();

let combinations = [
      { id: 1, colors: ['#667eea', '#764ba2', '#f093fb', '#4facfe', '#00f2fe'] },
      { id: 2, colors: ['#fa709a', '#fee140', '#30cfd0', '#330867', '#667eea'] }
    ];
    let nextId = 3;
    
    function addCombination() {
      combinations.push({
        id: nextId++,
        colors: ['#667eea', '#48bb78', '#f093fb', '#fbbf24', '#ef4444']
      });
      render();
    }
    
    function deleteCombination(id) {
      combinations = combinations.filter(c => c.id !== id);
      render();
    }
    
    function updateColor(id, index, value) {
      const combo = combinations.find(c => c.id === id);
      if (combo) {
        combo.colors[index] = value;
        render();
      }
    }
    
    function copyPalette(colors, event) {
      event.stopPropagation();
      const paletteStr = colors.join(', ');
      navigator.clipboard.writeText(paletteStr).then(() => {
        const toast = document.getElementById('toast');
        toast.textContent = `Copied palette: ${paletteStr}`;
        toast.classList.add('show');
        setTimeout(() => {
          toast.classList.remove('show');
          setTimeout(() => toast.textContent = 'Copied to clipboard!', 300);
        }, 2000);
      });
    }
    
    function render() {
      const container = document.getElementById('combinationsContainer');
      
      container.innerHTML = combinations.map(combo => `
        <div class="combination-card">
          <div class="combination-header">
            <div class="combination-title">Combination ${combo.id}</div>
            ${combinations.length > 1 ? `<button class="delete-btn" onclick="deleteCombination(${combo.id})">Delete</button>` : ''}
          </div>
          
          <div class="color-inputs">
            ${combo.colors.map((color, i) => `
              <div class="color-input-group">
                <input type="color" value="${color}" 
                       onchange="updateColor(${combo.id}, ${i}, this.value)">
                <input type="text" value="${color}" 
                       onchange="updateColor(${combo.id}, ${i}, this.value)"
                       oninput="if(this.value.match(/^#[0-9A-Fa-f]{6}$/)) updateColor(${combo.id}, ${i}, this.value)">
              </div>
            `).join('')}
          </div>
          
          <div class="preview-modes">
            <div class="preview-box" style="background: linear-gradient(135deg, ${combo.colors.join(', ')})" 
                 onclick="copyPalette([${combo.colors.map(c => `'${c}'`).join(',')}], event)">
              <div class="preview-label">Diagonal Gradient</div>
            </div>
            
            <div class="preview-box" style="background: linear-gradient(90deg, ${combo.colors.join(', ')})" 
                 onclick="copyPalette([${combo.colors.map(c => `'${c}'`).join(',')}], event)">
              <div class="preview-label">Horizontal Gradient</div>
            </div>
            
            <div class="preview-box" style="background: radial-gradient(circle, ${combo.colors.join(', ')})" 
                 onclick="copyPalette([${combo.colors.map(c => `'${c}'`).join(',')}], event)">
              <div class="preview-label">Radial Gradient</div>
            </div>
            
            <div class="preview-box" style="display: flex;" 
                 onclick="copyPalette([${combo.colors.map(c => `'${c}'`).join(',')}], event)">
              ${combo.colors.map(c => `<div style="flex: 1; background: ${c}"></div>`).join('')}
              <div class="preview-label">Color Blocks</div>
            </div>
            
            <div class="preview-box" style="background: ${combo.colors[0]}; display: flex; align-items: center; justify-content: center; flex-direction: column; gap: 15px; padding: 20px;" 
                 onclick="copyPalette([${combo.colors.map(c => `'${c}'`).join(',')}], event)">
              <div style="width: 80%; padding: 15px; background: ${combo.colors[1]}; color: ${combo.colors[4]}; border-radius: 8px; text-align: center; font-weight: 600;">Button</div>
              <div style="width: 80%; padding: 15px; background: ${combo.colors[2]}; color: white; border-radius: 8px; text-align: center; font-weight: 600;">Button</div>
              <div class="preview-label">UI Elements</div>
            </div>
            
            <div class="preview-box" style="background: ${combo.colors[0]}; padding: 20px; display: flex; flex-direction: column; gap: 10px;" 
                 onclick="copyPalette([${combo.colors.map(c => `'${c}'`).join(',')}], event)">
              <div style="padding: 15px; background: white; border-radius: 8px; border-left: 4px solid ${combo.colors[1]}; font-size: 12px; font-weight: 600; color: ${combo.colors[4]};">Card Header</div>
              <div style="padding: 15px; background: white; border-radius: 8px; border-left: 4px solid ${combo.colors[2]}; font-size: 11px; color: #666;">Card Content</div>
              <div class="preview-label">Card Layout</div>
            </div>
          </div>
        </div>
      `).join('');
    }
    
    render();


