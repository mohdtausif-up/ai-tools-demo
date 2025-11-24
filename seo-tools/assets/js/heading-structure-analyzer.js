async function analyzeHeadings() {
      const url = document.getElementById('urlInput').value.trim();
      
      if (!url) {
        showToast('Please enter a URL', 'error');
        return;
      }

      const btn = document.getElementById('analyzeBtn');
      btn.disabled = true;
      btn.textContent = '⏳ Analyzing...';

      try {
        const response = await fetch(url, { mode: 'cors' });
        const html = await response.text();
        
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        
        const headings = [];
        ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].forEach(tag => {
          const elements = doc.querySelectorAll(tag);
          elements.forEach(el => {
            headings.push({
              tag: tag.toUpperCase(),
              text: el.textContent.trim()
            });
          });
        });

        displayResults(headings);
        showToast('Heading analysis complete!');

      } catch (error) {
        console.error('Error:', error);
        showToast('Failed to fetch page (CORS blocking)', 'error');
        
        // Show example data
        displayResults([
          { tag: 'H1', text: 'Main Page Title' },
          { tag: 'H2', text: 'Section 1: Introduction' },
          { tag: 'H3', text: 'Subsection 1.1' },
          { tag: 'H3', text: 'Subsection 1.2' },
          { tag: 'H2', text: 'Section 2: Content' },
          { tag: 'H3', text: 'Subsection 2.1' },
          { tag: 'H4', text: 'Detail 2.1.1' }
        ]);
      } finally {
        btn.disabled = false;
        btn.textContent = '🔍 Analyze';
      }
    }

    function displayResults(headings) {
      const resultsCard = document.getElementById('resultsCard');
      const statsGrid = document.getElementById('statsGrid');
      const headingsList = document.getElementById('headingsList');
      
      resultsCard.style.display = 'block';
      
      // Count headings
      const counts = { H1: 0, H2: 0, H3: 0, H4: 0, H5: 0, H6: 0 };
      headings.forEach(h => counts[h.tag]++);
      
      // Display stats
      statsGrid.innerHTML = Object.entries(counts).map(([tag, count]) => `
        <div class="stat-box">
          <div class="stat-value">${count}</div>
          <div class="stat-label">${tag}</div>
        </div>
      `).join('');
      
      // Display headings
      headingsList.innerHTML = headings.map(h => `
        <div class="heading-item ${h.tag.toLowerCase()}">
          <span class="heading-tag ${h.tag.toLowerCase()}">${h.tag}</span>
          <span class="heading-text">${h.text}</span>
        </div>
      `).join('');
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
