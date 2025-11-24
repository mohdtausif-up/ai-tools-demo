function generateAnimation() {
      const color1 = document.getElementById('color1').value;
      const color2 = document.getElementById('color2').value;
      const color3 = document.getElementById('color3').value;
      const color4 = document.getElementById('color4').value;
      const type = document.getElementById('animationType').value;
      const duration = document.getElementById('duration').value;
      const angle = document.getElementById('angle').value;
      const easing = document.getElementById('easing').value;
      
      let keyframes = '';
      let backgroundStyle = '';
      
      switch(type) {
        case 'rotate':
          keyframes = `@keyframes gradientRotate {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}`;
          backgroundStyle = `background: linear-gradient(${angle}deg, ${color1}, ${color2}, ${color3}, ${color4});
background-size: 400% 400%;
animation: gradientRotate ${duration}s ${easing} infinite;`;
          break;
          
        case 'shift':
          keyframes = `@keyframes gradientShift {
  0% {
    background: linear-gradient(${angle}deg, ${color1}, ${color2});
  }
  25% {
    background: linear-gradient(${angle}deg, ${color2}, ${color3});
  }
  50% {
    background: linear-gradient(${angle}deg, ${color3}, ${color4});
  }
  75% {
    background: linear-gradient(${angle}deg, ${color4}, ${color1});
  }
  100% {
    background: linear-gradient(${angle}deg, ${color1}, ${color2});
  }
}`;
          backgroundStyle = `animation: gradientShift ${duration}s ${easing} infinite;`;
          break;
          
        case 'wave':
          keyframes = `@keyframes gradientWave {
  0%, 100% {
    background-position: 0% 50%;
    background-size: 200% 200%;
  }
  50% {
    background-position: 100% 50%;
    background-size: 250% 250%;
  }
}`;
          backgroundStyle = `background: linear-gradient(${angle}deg, ${color1} 0%, ${color2} 25%, ${color3} 50%, ${color4} 75%, ${color1} 100%);
background-size: 200% 200%;
animation: gradientWave ${duration}s ${easing} infinite;`;
          break;
          
        case 'pulse':
          keyframes = `@keyframes gradientPulse {
  0%, 100% {
    opacity: 1;
    filter: brightness(1);
  }
  50% {
    opacity: 0.8;
    filter: brightness(1.2);
  }
}`;
          backgroundStyle = `background: linear-gradient(${angle}deg, ${color1}, ${color2}, ${color3}, ${color4});
animation: gradientPulse ${duration}s ${easing} infinite;`;
          break;
      }
      
      const fullCSS = `${keyframes}

.animated-gradient {
  ${backgroundStyle}
}`;
      
      // Apply to preview
      const previewBox = document.getElementById('previewBox');
      
      // Remove old animation
      const oldStyle = document.getElementById('animationStyle');
      if (oldStyle) oldStyle.remove();
      
      // Add new animation
      const style = document.createElement('style');
      style.id = 'animationStyle';
      style.textContent = keyframes;
      document.head.appendChild(style);
      
      previewBox.style.cssText = backgroundStyle;
      
      // Display code
      document.getElementById('codeBox').textContent = fullCSS;
    }
    
    function copyCode() {
      const code = document.getElementById('codeBox').textContent;
      
      navigator.clipboard.writeText(code).then(() => {
        const toast = document.getElementById('toast');
        toast.classList.add('show');
        setTimeout(() => toast.classList.remove('show'), 2000);
      });
    }
    
    ['color1', 'color2', 'color3', 'color4', 'animationType', 'duration', 'angle', 'easing'].forEach(id => {
      document.getElementById(id).addEventListener('input', generateAnimation);
      document.getElementById(id).addEventListener('change', generateAnimation);
    });
    
    generateAnimation();

function generateAnimation() {
      const color1 = document.getElementById('color1').value;
      const color2 = document.getElementById('color2').value;
      const color3 = document.getElementById('color3').value;
      const color4 = document.getElementById('color4').value;
      const type = document.getElementById('animationType').value;
      const duration = document.getElementById('duration').value;
      const angle = document.getElementById('angle').value;
      const easing = document.getElementById('easing').value;
      
      let keyframes = '';
      let backgroundStyle = '';
      
      switch(type) {
        case 'rotate':
          keyframes = `@keyframes gradientRotate {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}`;
          backgroundStyle = `background: linear-gradient(${angle}deg, ${color1}, ${color2}, ${color3}, ${color4});
background-size: 400% 400%;
animation: gradientRotate ${duration}s ${easing} infinite;`;
          break;
          
        case 'shift':
          keyframes = `@keyframes gradientShift {
  0% {
    background: linear-gradient(${angle}deg, ${color1}, ${color2});
  }
  25% {
    background: linear-gradient(${angle}deg, ${color2}, ${color3});
  }
  50% {
    background: linear-gradient(${angle}deg, ${color3}, ${color4});
  }
  75% {
    background: linear-gradient(${angle}deg, ${color4}, ${color1});
  }
  100% {
    background: linear-gradient(${angle}deg, ${color1}, ${color2});
  }
}`;
          backgroundStyle = `animation: gradientShift ${duration}s ${easing} infinite;`;
          break;
          
        case 'wave':
          keyframes = `@keyframes gradientWave {
  0%, 100% {
    background-position: 0% 50%;
    background-size: 200% 200%;
  }
  50% {
    background-position: 100% 50%;
    background-size: 250% 250%;
  }
}`;
          backgroundStyle = `background: linear-gradient(${angle}deg, ${color1} 0%, ${color2} 25%, ${color3} 50%, ${color4} 75%, ${color1} 100%);
background-size: 200% 200%;
animation: gradientWave ${duration}s ${easing} infinite;`;
          break;
          
        case 'pulse':
          keyframes = `@keyframes gradientPulse {
  0%, 100% {
    opacity: 1;
    filter: brightness(1);
  }
  50% {
    opacity: 0.8;
    filter: brightness(1.2);
  }
}`;
          backgroundStyle = `background: linear-gradient(${angle}deg, ${color1}, ${color2}, ${color3}, ${color4});
animation: gradientPulse ${duration}s ${easing} infinite;`;
          break;
      }
      
      const fullCSS = `${keyframes}

.animated-gradient {
  ${backgroundStyle}
}`;
      
      // Apply to preview
      const previewBox = document.getElementById('previewBox');
      
      // Remove old animation
      const oldStyle = document.getElementById('animationStyle');
      if (oldStyle) oldStyle.remove();
      
      // Add new animation
      const style = document.createElement('style');
      style.id = 'animationStyle';
      style.textContent = keyframes;
      document.head.appendChild(style);
      
      previewBox.style.cssText = backgroundStyle;
      
      // Display code
      document.getElementById('codeBox').textContent = fullCSS;
    }
    
    function copyCode() {
      const code = document.getElementById('codeBox').textContent;
      
      navigator.clipboard.writeText(code).then(() => {
        const toast = document.getElementById('toast');
        toast.classList.add('show');
        setTimeout(() => toast.classList.remove('show'), 2000);
      });
    }
    
    ['color1', 'color2', 'color3', 'color4', 'animationType', 'duration', 'angle', 'easing'].forEach(id => {
      document.getElementById(id).addEventListener('input', generateAnimation);
      document.getElementById(id).addEventListener('change', generateAnimation);
    });
    
    generateAnimation();


