function generateDescription() {
      const title = document.getElementById('titleInput').value.trim();
      const points = document.getElementById('pointsInput').value.trim();
      
      if (!title) {
        showToast('Please enter a page title', 'error');
        return;
      }
      
      // Generate 3 variations
      const descriptions = [
        generateVariation1(title, points),
        generateVariation2(title, points),
        generateVariation3(title, points)
      ];
      
      displayResults(descriptions);
      showToast('Generated 3 variations!');
    }

    function generateVariation1(title, points) {
      const baseDesc = `Discover ${title.toLowerCase()}. ${points ? points.split('\n')[0] + '. ' : ''}Learn more about this topic and get actionable insights.`;
      return baseDesc.substring(0, 160);
    }

    function generateVariation2(title, points) {
      const baseDesc = `${title} - Everything you need to know. ${points ? points.split('\n')[0] + '. ' : ''}Find comprehensive information and expert tips.`;
      return baseDesc.substring(0, 160);
    }

    function generateVariation3(title, points) {
      const baseDesc = `Looking for ${title.toLowerCase()}? Get detailed information, best practices, and proven strategies. ${points ? points.split('\n')[0] : 'Click to learn more!'}.`;
      return baseDesc.substring(0, 160);
    }

    function displayResults(descriptions) {
      const resultsCard = document.getElementById('resultsCard');
      const outputList = document.getElementById('outputList');
      
      resultsCard.style.display = 'block';
      
      outputList.innerHTML = descriptions.map((desc, index) => {
        const charCount = desc.length;
        let countClass = 'good';
        let countStatus = '✓ Optimal';
        
        if (charCount < 120) {
          countClass = 'warning';
          countStatus = '⚠ Too Short';
        } else if (charCount > 160) {
          countClass = 'error';
          countStatus = '✗ Too Long';
        }
        
        return `
          <div class="meta-output">
            <div class="meta-text">${desc}</div>
            <div class="char-count ${countClass}">
              ${charCount} characters · ${countStatus}
            </div>
            <div class="action-buttons">
              <button class="action-btn copy-btn" onclick="copyDescription('${desc.replace(/'/g, "\\'")}')">
                📋 Copy
              </button>
              <button class="action-btn regenerate-btn" onclick="generateDescription()">
                🔄 Regenerate
              </button>
            </div>
          </div>
        `;
      }).join('');
    }

    function copyDescription(desc) {
      navigator.clipboard.writeText(desc).then(() => {
        showToast('Copied to clipboard!');
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
