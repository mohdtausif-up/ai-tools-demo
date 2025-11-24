const improvements = {
      'very': { replace: ['extremely', 'highly', 'remarkably', 'exceptionally'], type: 'intensifier' },
      'good': { replace: ['excellent', 'outstanding', 'remarkable', 'exceptional'], type: 'adjective' },
      'bad': { replace: ['poor', 'inadequate', 'substandard', 'unsatisfactory'], type: 'adjective' },
      'big': { replace: ['substantial', 'significant', 'considerable', 'extensive'], type: 'adjective' },
      'small': { replace: ['minimal', 'modest', 'limited', 'minor'], type: 'adjective' },
      'nice': { replace: ['pleasant', 'agreeable', 'delightful', 'appealing'], type: 'adjective' },
      'a lot': { replace: ['numerous', 'many', 'substantial', 'considerable'], type: 'quantifier' },
      'thing': { replace: ['matter', 'aspect', 'element', 'factor'], type: 'noun' },
      'get': { replace: ['obtain', 'acquire', 'receive', 'secure'], type: 'verb' },
      'make': { replace: ['create', 'produce', 'generate', 'develop'], type: 'verb' },
      'do': { replace: ['perform', 'execute', 'accomplish', 'complete'], type: 'verb' },
      'said': { replace: ['stated', 'mentioned', 'expressed', 'remarked'], type: 'verb' },
      'went': { replace: ['proceeded', 'traveled', 'moved', 'advanced'], type: 'verb' },
      'got': { replace: ['obtained', 'acquired', 'received', 'secured'], type: 'verb' },
      'also': { replace: ['additionally', 'furthermore', 'moreover', 'likewise'], type: 'connector' },
      'but': { replace: ['however', 'nevertheless', 'yet', 'although'], type: 'connector' },
      'so': { replace: ['therefore', 'consequently', 'thus', 'hence'], type: 'connector' }
    };
    
    function rewriteSentence() {
      const sentence = document.getElementById('sentenceInput').value.trim();
      
      if (!sentence) {
        showToast('Please enter a sentence', 'error');
        return;
      }
      
      const variations = [
        generateVariation1(sentence),
        generateVariation2(sentence),
        generateVariation3(sentence),
        generateVariation4(sentence)
      ];
      
      displayVariations(variations);
      showToast('Generated 4 variations!');
    }
    
    function generateVariation1(sentence) {
      // Replace weak words with stronger alternatives
      let result = sentence;
      Object.keys(improvements).forEach(word => {
        const regex = new RegExp('\\b' + word + '\\b', 'gi');
        result = result.replace(regex, (match) => {
          const replacements = improvements[word.toLowerCase()].replace;
          return matchCase(replacements[0], match);
        });
      });
      return { label: 'Enhanced Vocabulary', text: result };
    }
    
    function generateVariation2(sentence) {
      // Active voice emphasis
      let result = sentence
        .replace(/\bis\s+(\w+ed)\s+by\b/gi, (match, verb) => `${verb.replace(/ed$/, 's')}`)
        .replace(/\bwas\s+(\w+ed)\s+by\b/gi, (match, verb) => `${verb.replace(/ed$/, 'ed')}`);
      
      // Improve if still passive
      if (result === sentence) {
        result = improveSentence(sentence);
      }
      
      return { label: 'Active Voice', text: result };
    }
    
    function generateVariation3(sentence) {
      // Concise version - remove unnecessary words
      let result = sentence
        .replace(/\bin order to\b/gi, 'to')
        .replace(/\bdue to the fact that\b/gi, 'because')
        .replace(/\bat this point in time\b/gi, 'now')
        .replace(/\bfor the purpose of\b/gi, 'to')
        .replace(/\bin the event that\b/gi, 'if')
        .replace(/\bprior to\b/gi, 'before')
        .replace(/\bsubsequent to\b/gi, 'after');
      
      return { label: 'Concise Version', text: result };
    }
    
    function generateVariation4(sentence) {
      // Professional tone
      let result = improveSentence(sentence);
      
      // Replace informal with formal
      result = result
        .replace(/\bkinda\b/gi, 'somewhat')
        .replace(/\bsorta\b/gi, 'somewhat')
        .replace(/\bgonna\b/gi, 'going to')
        .replace(/\bwanna\b/gi, 'want to')
        .replace(/\blots of\b/gi, 'numerous')
        .replace(/\ba bunch of\b/gi, 'many');
      
      return { label: 'Professional Tone', text: result };
    }
    
    function improveSentence(sentence) {
      let result = sentence;
      let replacedAny = false;
      
      Object.keys(improvements).forEach(word => {
        const regex = new RegExp('\\b' + word + '\\b', 'gi');
        if (regex.test(result) && Math.random() > 0.4) {
          const replacements = improvements[word.toLowerCase()].replace;
          const replacement = replacements[Math.floor(Math.random() * replacements.length)];
          result = result.replace(regex, (match) => matchCase(replacement, match));
          replacedAny = true;
        }
      });
      
      return replacedAny ? result : sentence;
    }
    
    function matchCase(replacement, original) {
      if (original[0] === original[0].toUpperCase()) {
        return replacement.charAt(0).toUpperCase() + replacement.slice(1);
      }
      return replacement;
    }
    
    function displayVariations(variations) {
      const resultsCard = document.getElementById('resultsCard');
      const container = document.getElementById('variationsContainer');
      
      resultsCard.style.display = 'block';
      
      container.innerHTML = variations.map((v, i) => `
        <div class="variation-item">
          <div class="variation-label">${v.label}</div>
          <div class="variation-text">${v.text}</div>
          <button class="copy-btn-small" onclick="copyVariation('${v.text.replace(/'/g, "\\'")}')">
            📋 Copy
          </button>
        </div>
      `).join('');
      
      resultsCard.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
    
    function copyVariation(text) {
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
