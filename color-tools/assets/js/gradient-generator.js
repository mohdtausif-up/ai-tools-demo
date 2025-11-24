let stops = [
      { color: '#667eea', position: 0 },
      { color: '#764ba2', position: 100 }
    ];
    
    function renderStops() {
      const container = document.getElementById('colorStops');
      container.innerHTML = stops.map((stop, i) => `
        <div class="color-stop">
          <input type="color" value="${stop.color}" onchange="updateStopColor(${i}, this.value)">
          <input type="range" min="0" max="100" value="${stop.position}" oninput="updateStopPosition(${i}, this.value)">
          <span>${stop.position}%</span>
          ${stops.length > 2 ? `<button class="remove-btn" onclick="removeStop(${i})">Remove</button>` : '<span></span>'}
        </div>
      `).join('');
      updateGradient();
    }
    
    function addColorStop() {
      const lastStop = stops[stops.length - 1];
      const newPosition = Math.min(lastStop.position + 20, 100);
      stops.push({ color: '#ffffff', position: newPosition });
      stops.sort((a, b) => a.position - b.position);
      renderStops();
    }
    
    function removeStop(index) {
      if (stops.length > 2) {
        stops.splice(index, 1);
        renderStops();
      }
    }
    
    function updateStopColor(index, color) {
      stops[index].color = color;
      updateGradient();
    }
    
    function updateStopPosition(index, position) {
      stops[index].position = parseInt(position);
      stops.sort((a, b) => a.position - b.position);
      renderStops();
    }
    
    function updateGradient() {
      const type = document.getElementById('gradientType').value;
      const angle = document.getElementById('angleInput').value;
      const shape = document.getElementById('shapeInput').value;
      const preview = document.getElementById('gradientPreview');
      const cssCode = document.getElementById('cssCode');
      
      const colorStops = stops.map(s => `${s.color} ${s.position}%`).join(', ');
      
      let gradient;
      if (type === 'linear') {
        gradient = `linear-gradient(${angle}deg, ${colorStops})`;
      } else {
        gradient = `radial-gradient(${shape}, ${colorStops})`;
      }
      
      preview.style.background = gradient;
      cssCode.textContent = `background: ${gradient};`;
    }
    
    function copyCss() {
      const code = document.getElementById('cssCode').textContent;
      navigator.clipboard.writeText(code).then(() => {
        const btn = event.target;
        btn.textContent = 'Copied!';
        setTimeout(() => btn.textContent = 'Copy CSS', 2000);
      });
    }
    
    document.getElementById('gradientType').addEventListener('change', (e) => {
      const isRadial = e.target.value === 'radial';
      document.getElementById('angleGroup').style.display = isRadial ? 'none' : 'block';
      document.getElementById('shapeGroup').style.display = isRadial ? 'block' : 'none';
      updateGradient();
    });
    
    document.getElementById('angleInput').addEventListener('input', (e) => {
      document.getElementById('angleValue').textContent = e.target.value;
      updateGradient();
    });
    
    document.getElementById('shapeInput').addEventListener('change', updateGradient);
    
    renderStops();

let stops = [
      { color: '#667eea', position: 0 },
      { color: '#764ba2', position: 100 }
    ];
    
    function renderStops() {
      const container = document.getElementById('colorStops');
      container.innerHTML = stops.map((stop, i) => `
        <div class="color-stop">
          <input type="color" value="${stop.color}" onchange="updateStopColor(${i}, this.value)">
          <input type="range" min="0" max="100" value="${stop.position}" oninput="updateStopPosition(${i}, this.value)">
          <span>${stop.position}%</span>
          ${stops.length > 2 ? `<button class="remove-btn" onclick="removeStop(${i})">Remove</button>` : '<span></span>'}
        </div>
      `).join('');
      updateGradient();
    }
    
    function addColorStop() {
      const lastStop = stops[stops.length - 1];
      const newPosition = Math.min(lastStop.position + 20, 100);
      stops.push({ color: '#ffffff', position: newPosition });
      stops.sort((a, b) => a.position - b.position);
      renderStops();
    }
    
    function removeStop(index) {
      if (stops.length > 2) {
        stops.splice(index, 1);
        renderStops();
      }
    }
    
    function updateStopColor(index, color) {
      stops[index].color = color;
      updateGradient();
    }
    
    function updateStopPosition(index, position) {
      stops[index].position = parseInt(position);
      stops.sort((a, b) => a.position - b.position);
      renderStops();
    }
    
    function updateGradient() {
      const type = document.getElementById('gradientType').value;
      const angle = document.getElementById('angleInput').value;
      const shape = document.getElementById('shapeInput').value;
      const preview = document.getElementById('gradientPreview');
      const cssCode = document.getElementById('cssCode');
      
      const colorStops = stops.map(s => `${s.color} ${s.position}%`).join(', ');
      
      let gradient;
      if (type === 'linear') {
        gradient = `linear-gradient(${angle}deg, ${colorStops})`;
      } else {
        gradient = `radial-gradient(${shape}, ${colorStops})`;
      }
      
      preview.style.background = gradient;
      cssCode.textContent = `background: ${gradient};`;
    }
    
    function copyCss() {
      const code = document.getElementById('cssCode').textContent;
      navigator.clipboard.writeText(code).then(() => {
        const btn = event.target;
        btn.textContent = 'Copied!';
        setTimeout(() => btn.textContent = 'Copy CSS', 2000);
      });
    }
    
    document.getElementById('gradientType').addEventListener('change', (e) => {
      const isRadial = e.target.value === 'radial';
      document.getElementById('angleGroup').style.display = isRadial ? 'none' : 'block';
      document.getElementById('shapeGroup').style.display = isRadial ? 'block' : 'none';
      updateGradient();
    });
    
    document.getElementById('angleInput').addEventListener('input', (e) => {
      document.getElementById('angleValue').textContent = e.target.value;
      updateGradient();
    });
    
    document.getElementById('shapeInput').addEventListener('change', updateGradient);
    
    renderStops();


