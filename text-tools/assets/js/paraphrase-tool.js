const synonyms = {
      'important': ['significant', 'crucial', 'vital', 'essential', 'key'],
      'good': ['excellent', 'great', 'fine', 'wonderful', 'positive'],
      'bad': ['poor', 'negative', 'unfavorable', 'inferior', 'substandard'],
      'big': ['large', 'huge', 'substantial', 'considerable', 'major'],
      'small': ['tiny', 'little', 'minor', 'compact', 'modest'],
      'make': ['create', 'produce', 'generate', 'develop', 'build'],
      'use': ['utilize', 'employ', 'apply', 'implement', 'leverage'],
      'show': ['demonstrate', 'display', 'reveal', 'present', 'exhibit'],
      'help': ['assist', 'support', 'aid', 'facilitate', 'enable'],
      'need': ['require', 'necessitate', 'demand', 'call for', 'must have'],
      'want': ['desire', 'wish for', 'prefer', 'seek', 'aspire to'],
      'think': ['believe', 'consider', 'assume', 'suppose', 'reckon'],
      'know': ['understand', 'comprehend', 'recognize', 'realize', 'grasp'],
      'see': ['observe', 'notice', 'view', 'perceive', 'witness'],
      'get': ['obtain', 'acquire', 'receive', 'gain', 'secure'],
      'find': ['discover', 'locate', 'identify', 'uncover', 'detect'],
      'give': ['provide', 'offer', 'supply', 'deliver', 'present'],
      'tell': ['inform', 'notify', 'advise', 'communicate', 'explain'],
      'work': ['function', 'operate', 'perform', 'execute', 'run'],
      'call': ['name', 'designate', 'term', 'label', 'refer to'],
      'try': ['attempt', 'endeavor', 'strive', 'aim', 'seek'],
      'ask': ['inquire', 'question', 'request', 'query', 'seek'],
      'feel': ['sense', 'experience', 'perceive', 'undergo', 'encounter'],
      'become': ['turn into', 'develop into', 'transform into', 'evolve into', 'grow into'],
      'leave': ['depart', 'exit', 'vacate', 'abandon', 'withdraw from'],
      'put': ['place', 'position', 'set', 'locate', 'situate'],
      'mean': ['signify', 'indicate', 'represent', 'denote', 'imply'],
      'keep': ['maintain', 'retain', 'preserve', 'sustain', 'continue'],
      'let': ['allow', 'permit', 'enable', 'authorize', 'approve'],
      'begin': ['start', 'commence', 'initiate', 'launch', 'kick off']
    };
    
    function paraphraseText() {
      const originalText = document.getElementById('originalText').value.trim();
      const mode = document.getElementById('modeSelect').value;
      
      if (!originalText) {
        showToast('Please enter text to paraphrase', 'error');
        return;
      }
      
      let paraphrased = originalText;
      
      // Replace words with synonyms
      Object.keys(synonyms).forEach(word => {
        const regex = new RegExp('\\b' + word + '\\b', 'gi');
        paraphrased = paraphrased.replace(regex, (match) => {
          const syns = synonyms[word.toLowerCase()];
          if (syns && Math.random() > 0.3) { // 70% chance to replace
            const replacement = syns[Math.floor(Math.random() * syns.length)];
            // Match case
            if (match[0] === match[0].toUpperCase()) {
              return replacement.charAt(0).toUpperCase() + replacement.slice(1);
            }
            return replacement;
          }
          return match;
        });
      });
      
      // Mode-specific adjustments
      if (mode === 'simple') {
        // Prefer first (simpler) synonyms
        paraphrased = simplifyText(paraphrased);
      } else if (mode === 'formal') {
        // Add formal connectors
        paraphrased = formalizeText(paraphrased);
      } else if (mode === 'creative') {
        // More aggressive synonym replacement
        paraphrased = enhanceCreativity(paraphrased);
      }
      
      document.getElementById('paraphrasedText').value = paraphrased;
      showToast('Text paraphrased successfully!');
    }
    
    function simplifyText(text) {
      return text
        .replace(/\butilize\b/gi, 'use')
        .replace(/\bfacilitate\b/gi, 'help')
        .replace(/\bendeavor\b/gi, 'try');
    }
    
    function formalizeText(text) {
      return text
        .replace(/\bdon't\b/gi, 'do not')
        .replace(/\bcan't\b/gi, 'cannot')
        .replace(/\bwon't\b/gi, 'will not')
        .replace(/\bhasn't\b/gi, 'has not');
    }
    
    function enhanceCreativity(text) {
      // Shuffle sentence structure occasionally
      const sentences = text.split(/([.!?]+)/);
      return sentences.map((s, i) => {
        if (i % 2 === 0 && s.includes(',')) {
          const parts = s.split(',');
          if (parts.length === 2 && Math.random() > 0.5) {
            return parts[1].trim() + ', ' + parts[0].trim();
          }
        }
        return s;
      }).join('');
    }
    
    function copyResult() {
      const text = document.getElementById('paraphrasedText').value;
      if (!text) {
        showToast('No text to copy', 'error');
        return;
      }
      navigator.clipboard.writeText(text).then(() => {
        showToast('Copied to clipboard!');
      });
    }
    
    function downloadResult() {
      const text = document.getElementById('paraphrasedText').value;
      if (!text) {
        showToast('No text to download', 'error');
        return;
      }
      const blob = new Blob([text], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'paraphrased-text.txt';
      a.click();
      URL.revokeObjectURL(url);
      showToast('Downloaded!');
    }
    
    function clearAll() {
      document.getElementById('originalText').value = '';
      document.getElementById('paraphrasedText').value = '';
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
