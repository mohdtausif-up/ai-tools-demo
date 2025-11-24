function analyzeText() {
      const text = document.getElementById('textInput').value;
      
      // Words
      const words = text.trim().split(/\s+/).filter(w => w.length > 0);
      const wordCount = text.trim() === '' ? 0 : words.length;
      
      // Characters
      const charCount = text.length;
      const charNoSpaceCount = text.replace(/\s/g, '').length;
      
      // Sentences
      const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
      const sentenceCount = sentences.length;
      
      // Paragraphs
      const paragraphs = text.split(/\n\n+/).filter(p => p.trim().length > 0);
      const paragraphCount = paragraphs.length;
      
      // Reading time (avg 200 words per minute)
      const readingTime = Math.ceil(wordCount / 200);
      
      // Update display
      document.getElementById('wordCount').textContent = wordCount;
      document.getElementById('charCount').textContent = charCount;
      document.getElementById('charNoSpaceCount').textContent = charNoSpaceCount;
      document.getElementById('sentenceCount').textContent = sentenceCount;
      document.getElementById('paragraphCount').textContent = paragraphCount;
      document.getElementById('readingTime').textContent = readingTime;
    }

    function copyText() {
      const text = document.getElementById('textInput').value;
      navigator.clipboard.writeText(text).then(() => {
        alert('Text copied to clipboard!');
      });
    }

    function clearText() {
      document.getElementById('textInput').value = '';
      analyzeText();
    }
