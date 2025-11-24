function reverseText(mode) {
      const text = document.getElementById('originalText').value;
      
      if (!text) {
        showToast('Please enter text to reverse', 'error');
        return;
      }
      
      let result = '';
      
      switch(mode) {
        case 'characters':
          result = text.split('').reverse().join('');
          break;
        case 'words':
          result = text.split(/\s+/).reverse().join(' ');
          break;
        case 'sentences':
          result = text.match(/[^.!?]+[.!?]+/g)
            ?.reverse().join(' ') || text;
          break;
        case 'lines':
          result = text.split('\n').reverse().join('\n');
          break;
        case 'flip':
          result = flipText(text);
          break;
      }
      
      document.getElementById('reversedText').value = result;
      showToast(`Text reversed by ${mode}!`);
    }
    
    function flipText(text) {
      const flipped = {
        'a': 'ɐ', 'b': 'q', 'c': 'ɔ', 'd': 'p', 'e': 'ǝ', 'f': 'ɟ', 'g': 'ƃ',
        'h': 'ɥ', 'i': 'ᴉ', 'j': 'ɾ', 'k': 'ʞ', 'l': 'l', 'm': 'ɯ', 'n': 'u',
        'o': 'o', 'p': 'd', 'q': 'b', 'r': 'ɹ', 's': 's', 't': 'ʇ', 'u': 'n',
        'v': 'ʌ', 'w': 'ʍ', 'x': 'x', 'y': 'ʎ', 'z': 'z',
        'A': '∀', 'B': 'q', 'C': 'Ɔ', 'D': 'p', 'E': 'Ǝ', 'F': 'Ⅎ', 'G': 'פ',
        'H': 'H', 'I': 'I', 'J': 'ſ', 'K': 'ʞ', 'L': '˥', 'M': 'W', 'N': 'N',
        'O': 'O', 'P': 'Ԁ', 'Q': 'Q', 'R': 'ɹ', 'S': 'S', 'T': '┴', 'U': '∩',
        'V': 'Λ', 'W': 'M', 'X': 'X', 'Y': '⅄', 'Z': 'Z',
        '1': 'Ɩ', '2': 'ᄅ', '3': 'Ɛ', '4': 'ㄣ', '5': 'ϛ', '6': '9', '7': 'ㄥ',
        '8': '8', '9': '6', '0': '0',
        '.': '˙', ',': '\'', '!': '¡', '?': '¿', '\'': ',', '"': '„'
      };
      
      return text.split('').reverse().map(c => flipped[c] || c).join('');
    }
    
    function copyResult() {
      const text = document.getElementById('reversedText').value;
      if (!text) {
        showToast('No text to copy', 'error');
        return;
      }
      navigator.clipboard.writeText(text).then(() => {
        showToast('Copied to clipboard!');
      });
    }
    
    function clearAll() {
      document.getElementById('originalText').value = '';
      document.getElementById('reversedText').value = '';
      showToast('Cleared');
    }
    
    function showToast(message, type = 'success') {
      const existingToast = document.querySelector('.toast');
      if (existingToast) existingToast.remove();
      
      const toast = document.createElement('div');
      toast.className = 'toast';
      toast.style.background = type === 'error' ? '#ef4444' : '#10b981';
      toast.textContent = message;
      document.body.appendChild(toast);
      
      setTimeout(() => toast.remove(), 3000);
    }
