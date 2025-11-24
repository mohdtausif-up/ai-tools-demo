function generateTitles() {
      const keyword = document.getElementById('keywordInput').value.trim();
      const brand = document.getElementById('brandInput').value.trim();
      const modifier = document.getElementById('modifierInput').value.trim();
      
      if (!keyword) {
        showToast('Please enter a keyword', 'error');
        return;
      }
      
      const titles = [
        generateVariation1(keyword, brand, modifier),
        generateVariation2(keyword, brand, modifier),
        generateVariation3(keyword, brand, modifier),
        generateVariation4(keyword, brand, modifier)
      ];
      
      displayResults(titles);
      showToast('Generated 4 title variations!');
    }

    function generateVariation1(keyword, brand, modifier) {
      let title = keyword;
      if (modifier) title = `${modifier} ${title}`;
      if (brand) title = `${title} | ${brand}`;
      return title;
    }

    function generateVariation2(keyword, brand, modifier) {
      let title = `${keyword} - Complete Guide`;
      if (modifier) title = `${keyword} - ${modifier} Guide`;
      if (brand) title = `${title} | ${brand}`;
      return title;
    }

    function generateVariation3(keyword, brand, modifier) {
      let title = modifier ? `${keyword}: ${modifier} Tips & Tricks` : `${keyword}: Tips & Strategies`;
      if (brand) title = `${title} - ${brand}`;
      return title;
    }

    function generateVariation4(keyword, brand, modifier) {
      let title = modifier ? `How to Use ${keyword} (${modifier})` : `How to Use ${keyword}`;
      if (brand) title = `${title} | ${brand}`;
      return title;
    }

    function displayResults(titles) {
      const resultsCard = document.getElementById('resultsCard');
      const outputList = document.getElementById('outputList');
      
      resultsCard.style.display = 'block';
      
      outputList.innerHTML = titles.map((title, index) => {
        const charCount = title.length;
        let countClass = 'good';
        let countStatus = '✓ Optimal';
        
        if (charCount < 40) {
          countClass = 'warning';
          countStatus = '⚠ Too Short';
        } else if (charCount > 60) {
          countClass = 'error';
          countStatus = '✗ May Get Truncated';
        }
        
        return `
          <div class="title-output">
            <div class="title-text">${title}</div>
            <div class="char-count ${countClass}">
              ${charCount} characters · ${countStatus}
            </div>
            <div class="serp-preview">
              <div class="serp-url">https://example.com › page</div>
              <div class="serp-title">${title}</div>
            </div>
            <div class="action-buttons">
              <button class="action-btn copy-btn" onclick="copyTitle('${title.replace(/'/g, "\\'")}')">
                📋 Copy
              </button>
              <button class="action-btn regenerate-btn" onclick="generateTitles()">
                🔄 Regenerate
              </button>
            </div>
          </div>
        `;
      }).join('');
    }

    function copyTitle(title) {
      navigator.clipboard.writeText(title).then(() => {
        showToast('Title copied to clipboard!');
      }).catch(() => {
        showToast('Failed to copy', 'error');
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
