function generatePattern() {
      const type = document.getElementById('patternType').value;
      const color1 = document.getElementById('color1').value;
      const color2 = document.getElementById('color2').value;
      const size = document.getElementById('patternSize').value;
      const bgColor = document.getElementById('bgColor').value;
      
      document.getElementById('sizeValue').textContent = `${size}px`;
      
      let css = '';
      
      switch(type) {
        case 'stripes':
          css = `background: ${bgColor};
background-image: linear-gradient(0deg, ${color1} 50%, ${color2} 50%);
background-size: ${size}px ${size}px;`;
          break;
          
        case 'diagonal':
          css = `background: ${bgColor};
background-image: repeating-linear-gradient(
  45deg,
  ${color1},
  ${color1} ${size/2}px,
  ${color2} ${size/2}px,
  ${color2} ${size}px
);`;
          break;
          
        case 'dots':
          css = `background: ${bgColor};
background-image: radial-gradient(circle, ${color1} ${size/10}px, transparent ${size/10}px);
background-size: ${size}px ${size}px;`;
          break;
          
        case 'grid':
          css = `background: ${bgColor};
background-image: 
  linear-gradient(${color1} 2px, transparent 2px),
  linear-gradient(90deg, ${color1} 2px, transparent 2px);
background-size: ${size}px ${size}px;`;
          break;
          
        case 'checkerboard':
          css = `background: ${color2};
background-image: 
  linear-gradient(45deg, ${color1} 25%, transparent 25%),
  linear-gradient(-45deg, ${color1} 25%, transparent 25%),
  linear-gradient(45deg, transparent 75%, ${color1} 75%),
  linear-gradient(-45deg, transparent 75%, ${color1} 75%);
background-size: ${size}px ${size}px;
background-position: 0 0, 0 ${size/2}px, ${size/2}px -${size/2}px, -${size/2}px 0px;`;
          break;
          
        case 'zigzag':
          css = `background: ${bgColor};
background-image: linear-gradient(135deg, ${color1} 25%, transparent 25%),
  linear-gradient(225deg, ${color1} 25%, transparent 25%),
  linear-gradient(45deg, ${color1} 25%, transparent 25%),
  linear-gradient(315deg, ${color1} 25%, ${color2} 25%);
background-size: ${size}px ${size}px;
background-position: ${size/2}px 0, ${size/2}px 0, 0 0, 0 0;`;
          break;
          
        case 'triangles':
          css = `background: ${bgColor};
background-image: linear-gradient(45deg, ${color1} 50%, ${color2} 50%);
background-size: ${size}px ${size}px;`;
          break;
          
        case 'hexagons':
          css = `background: ${bgColor};
background-image: 
  linear-gradient(30deg, ${color1} 12%, transparent 12.5%, transparent 87%, ${color1} 87.5%, ${color1}),
  linear-gradient(150deg, ${color1} 12%, transparent 12.5%, transparent 87%, ${color1} 87.5%, ${color1}),
  linear-gradient(30deg, ${color1} 12%, transparent 12.5%, transparent 87%, ${color1} 87.5%, ${color1}),
  linear-gradient(150deg, ${color1} 12%, transparent 12.5%, transparent 87%, ${color1} 87.5%, ${color1}),
  linear-gradient(60deg, ${color2} 25%, transparent 25.5%, transparent 75%, ${color2} 75%, ${color2}),
  linear-gradient(60deg, ${color2} 25%, transparent 25.5%, transparent 75%, ${color2} 75%, ${color2});
background-size: ${size}px ${size * 1.732}px;
background-position: 0 0, 0 0, ${size/2}px ${size * 0.866}px, ${size/2}px ${size * 0.866}px, 0 0, ${size/2}px ${size * 0.866}px;`;
          break;
      }
      
      // Apply to preview
      document.getElementById('previewBox').style.cssText = css;
      
      // Display code
      const codeBox = document.getElementById('codeBox');
      codeBox.innerHTML = css
        .replace(/background(-[a-z]+)?:/g, '<span class="code-property">$&</span>')
        .replace(/(#[0-9A-Fa-f]{6}|transparent|\d+px|\d+deg|circle)/g, '<span class="code-value">$1</span>');
    }
    
    function copyCode() {
      const previewBox = document.getElementById('previewBox');
      const css = previewBox.style.cssText;
      
      navigator.clipboard.writeText(css).then(() => {
        const toast = document.getElementById('toast');
        toast.classList.add('show');
        setTimeout(() => toast.classList.remove('show'), 2000);
      });
    }
    
    ['patternType', 'color1', 'color2', 'patternSize', 'bgColor'].forEach(id => {
      document.getElementById(id).addEventListener('input', generatePattern);
    });
    
    generatePattern();

function generatePattern() {
      const type = document.getElementById('patternType').value;
      const color1 = document.getElementById('color1').value;
      const color2 = document.getElementById('color2').value;
      const size = document.getElementById('patternSize').value;
      const bgColor = document.getElementById('bgColor').value;
      
      document.getElementById('sizeValue').textContent = `${size}px`;
      
      let css = '';
      
      switch(type) {
        case 'stripes':
          css = `background: ${bgColor};
background-image: linear-gradient(0deg, ${color1} 50%, ${color2} 50%);
background-size: ${size}px ${size}px;`;
          break;
          
        case 'diagonal':
          css = `background: ${bgColor};
background-image: repeating-linear-gradient(
  45deg,
  ${color1},
  ${color1} ${size/2}px,
  ${color2} ${size/2}px,
  ${color2} ${size}px
);`;
          break;
          
        case 'dots':
          css = `background: ${bgColor};
background-image: radial-gradient(circle, ${color1} ${size/10}px, transparent ${size/10}px);
background-size: ${size}px ${size}px;`;
          break;
          
        case 'grid':
          css = `background: ${bgColor};
background-image: 
  linear-gradient(${color1} 2px, transparent 2px),
  linear-gradient(90deg, ${color1} 2px, transparent 2px);
background-size: ${size}px ${size}px;`;
          break;
          
        case 'checkerboard':
          css = `background: ${color2};
background-image: 
  linear-gradient(45deg, ${color1} 25%, transparent 25%),
  linear-gradient(-45deg, ${color1} 25%, transparent 25%),
  linear-gradient(45deg, transparent 75%, ${color1} 75%),
  linear-gradient(-45deg, transparent 75%, ${color1} 75%);
background-size: ${size}px ${size}px;
background-position: 0 0, 0 ${size/2}px, ${size/2}px -${size/2}px, -${size/2}px 0px;`;
          break;
          
        case 'zigzag':
          css = `background: ${bgColor};
background-image: linear-gradient(135deg, ${color1} 25%, transparent 25%),
  linear-gradient(225deg, ${color1} 25%, transparent 25%),
  linear-gradient(45deg, ${color1} 25%, transparent 25%),
  linear-gradient(315deg, ${color1} 25%, ${color2} 25%);
background-size: ${size}px ${size}px;
background-position: ${size/2}px 0, ${size/2}px 0, 0 0, 0 0;`;
          break;
          
        case 'triangles':
          css = `background: ${bgColor};
background-image: linear-gradient(45deg, ${color1} 50%, ${color2} 50%);
background-size: ${size}px ${size}px;`;
          break;
          
        case 'hexagons':
          css = `background: ${bgColor};
background-image: 
  linear-gradient(30deg, ${color1} 12%, transparent 12.5%, transparent 87%, ${color1} 87.5%, ${color1}),
  linear-gradient(150deg, ${color1} 12%, transparent 12.5%, transparent 87%, ${color1} 87.5%, ${color1}),
  linear-gradient(30deg, ${color1} 12%, transparent 12.5%, transparent 87%, ${color1} 87.5%, ${color1}),
  linear-gradient(150deg, ${color1} 12%, transparent 12.5%, transparent 87%, ${color1} 87.5%, ${color1}),
  linear-gradient(60deg, ${color2} 25%, transparent 25.5%, transparent 75%, ${color2} 75%, ${color2}),
  linear-gradient(60deg, ${color2} 25%, transparent 25.5%, transparent 75%, ${color2} 75%, ${color2});
background-size: ${size}px ${size * 1.732}px;
background-position: 0 0, 0 0, ${size/2}px ${size * 0.866}px, ${size/2}px ${size * 0.866}px, 0 0, ${size/2}px ${size * 0.866}px;`;
          break;
      }
      
      // Apply to preview
      document.getElementById('previewBox').style.cssText = css;
      
      // Display code
      const codeBox = document.getElementById('codeBox');
      codeBox.innerHTML = css
        .replace(/background(-[a-z]+)?:/g, '<span class="code-property">$&</span>')
        .replace(/(#[0-9A-Fa-f]{6}|transparent|\d+px|\d+deg|circle)/g, '<span class="code-value">$1</span>');
    }
    
    function copyCode() {
      const previewBox = document.getElementById('previewBox');
      const css = previewBox.style.cssText;
      
      navigator.clipboard.writeText(css).then(() => {
        const toast = document.getElementById('toast');
        toast.classList.add('show');
        setTimeout(() => toast.classList.remove('show'), 2000);
      });
    }
    
    ['patternType', 'color1', 'color2', 'patternSize', 'bgColor'].forEach(id => {
      document.getElementById(id).addEventListener('input', generatePattern);
    });
    
    generatePattern();


