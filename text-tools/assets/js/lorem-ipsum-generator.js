const loremWords = [
      'lorem', 'ipsum', 'dolor', 'sit', 'amet', 'consectetur', 'adipiscing', 'elit',
      'sed', 'do', 'eiusmod', 'tempor', 'incididunt', 'ut', 'labore', 'et', 'dolore',
      'magna', 'aliqua', 'enim', 'ad', 'minim', 'veniam', 'quis', 'nostrud',
      'exercitation', 'ullamco', 'laboris', 'nisi', 'aliquip', 'ex', 'ea', 'commodo',
      'consequat', 'duis', 'aute', 'irure', 'in', 'reprehenderit', 'voluptate',
      'velit', 'esse', 'cillum', 'fugiat', 'nulla', 'pariatur', 'excepteur', 'sint',
      'occaecat', 'cupidatat', 'non', 'proident', 'sunt', 'culpa', 'qui', 'officia',
      'deserunt', 'mollit', 'anim', 'id', 'est', 'laborum', 'et', 'quasi', 'architecto',
      'beatae', 'vitae', 'dicta', 'sunt', 'explicabo', 'nemo', 'enim', 'ipsam',
      'voluptatem', 'quia', 'voluptas', 'aspernatur', 'aut', 'odit', 'aut', 'fugit'
    ];
    
    function generateLorem() {
      const type = document.getElementById('typeSelect').value;
      const count = parseInt(document.getElementById('countInput').value);
      const startWithLorem = document.getElementById('startSelect').value === 'yes';
      
      if (count < 1 || count > 100) {
        showToast('Count must be between 1 and 100', 'error');
        return;
      }
      
      let result = '';
      
      if (type === 'words') {
        result = generateWords(count, startWithLorem);
      } else if (type === 'sentences') {
        result = generateSentences(count, startWithLorem);
      } else {
        result = generateParagraphs(count, startWithLorem);
      }
      
      document.getElementById('loremOutput').textContent = result;
      document.getElementById('resultsCard').style.display = 'block';
      showToast('Lorem Ipsum generated!');
    }
    
    function generateWords(count, startWithLorem) {
      const words = [];
      if (startWithLorem && count >= 5) {
        words.push('Lorem', 'ipsum', 'dolor', 'sit', 'amet');
        count -= 5;
      }
      
      for (let i = 0; i < count; i++) {
        words.push(loremWords[Math.floor(Math.random() * loremWords.length)]);
      }
      
      return words.join(' ') + '.';
    }
    
    function generateSentences(count, startWithLorem) {
      const sentences = [];
      
      for (let i = 0; i < count; i++) {
        const wordCount = Math.floor(Math.random() * 10) + 5;
        let sentence = generateWords(wordCount, startWithLorem && i === 0);
        sentence = sentence.charAt(0).toUpperCase() + sentence.slice(1);
        sentences.push(sentence);
      }
      
      return sentences.join(' ');
    }
    
    function generateParagraphs(count, startWithLorem) {
      const paragraphs = [];
      
      for (let i = 0; i < count; i++) {
        const sentenceCount = Math.floor(Math.random() * 4) + 3;
        paragraphs.push(generateSentences(sentenceCount, startWithLorem && i === 0));
      }
      
      return paragraphs.join('\n\n');
    }
    
    function copyLorem() {
      const text = document.getElementById('loremOutput').textContent;
      if (!text) {
        showToast('No text to copy', 'error');
        return;
      }
      navigator.clipboard.writeText(text).then(() => {
        showToast('Copied to clipboard!');
      });
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
