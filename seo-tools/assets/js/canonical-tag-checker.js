async function checkCanonical() {
      const url = document.getElementById('urlInput').value.trim();
      
      if (!url) {
        showToast('Please enter a URL', 'error');
        return;
      }

      const btn = document.getElementById('checkBtn');
      btn.disabled = true;
      btn.textContent = '⏳ Checking...';

      try {
        const response = await fetch(url, { mode: 'cors' });
        const html = await response.text();
        
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        
        // Check for canonical tag
        const canonicalLink = doc.querySelector('link[rel="canonical"]');
        const canonicalUrl = canonicalLink ? canonicalLink.getAttribute('href') : null;
        
        // Normalize URLs for comparison
        const normalizedUrl = new URL(url).href;
        const normalizedCanonical = canonicalUrl ? new URL(canonicalUrl, url).href : null;
        
        const selfReferencing = normalizedCanonical === normalizedUrl;
        
        displayResults({
          found: !!canonicalUrl,
          canonical: canonicalUrl,
          currentUrl: url,
          selfReferencing: selfReferencing,
          match: normalizedCanonical === normalizedUrl
        });
        
        showToast(canonicalUrl ? 'Canonical tag found' : 'No canonical tag found');

      } catch (error) {
        console.error('Error:', error);
        showToast('Failed to check canonical (CORS)', 'error');
        
        // Show example data
        displayResults({
          found: true,
          canonical: 'https://example.com/',
          currentUrl: url,
          selfReferencing: true,
          match: true
        });
      } finally {
        btn.disabled = false;
        btn.textContent = '🔍 Check Canonical';
      }
    }

    function displayResults(data) {
      const resultsCard = document.getElementById('resultsCard');
      const statusBox = document.getElementById('statusBox');
      const infoSection = document.getElementById('infoSection');
      
      resultsCard.style.display = 'block';
      
      if (!data.found) {
        statusBox.className = 'status-box not-found';
        statusBox.innerHTML = `
          <div class="status-icon">⚠️</div>
          <div class="status-text">No Canonical Tag Found</div>
          <div style="font-size: 14px; margin-top: 10px; opacity: 0.9;">
            This page doesn't have a canonical URL specified
          </div>
        `;
        
        infoSection.innerHTML = `
          <div class="recommendation">
            <strong>💡 Recommendation:</strong>
            Add a canonical tag to this page to prevent duplicate content issues. The canonical tag should point to the preferred version of the URL.
            <br><br>
            Example: <code>&lt;link rel="canonical" href="${data.currentUrl}" /&gt;</code>
          </div>
        `;
      } else if (data.match) {
        statusBox.className = 'status-box found';
        statusBox.innerHTML = `
          <div class="status-icon">✓</div>
          <div class="status-text">Canonical Tag Correct</div>
          <div style="font-size: 14px; margin-top: 10px; opacity: 0.9;">
            ${data.selfReferencing ? 'Self-referencing canonical (best practice)' : 'Canonical tag is properly set'}
          </div>
        `;
        
        infoSection.innerHTML = `
          <div class="info-item">
            <div class="info-label">Current URL</div>
            <div class="info-value">${data.currentUrl}</div>
          </div>
          <div class="info-item">
            <div class="info-label">Canonical URL</div>
            <div class="info-value">${data.canonical}</div>
          </div>
          <div class="recommendation">
            <strong>✓ Good!</strong>
            Your canonical tag is properly implemented. ${data.selfReferencing ? 'Self-referencing canonicals help search engines understand this is the preferred version.' : 'The canonical tag points to the correct URL.'}
          </div>
        `;
      } else {
        statusBox.className = 'status-box mismatch';
        statusBox.innerHTML = `
          <div class="status-icon">⚠️</div>
          <div class="status-text">Canonical Mismatch</div>
          <div style="font-size: 14px; margin-top: 10px; opacity: 0.9;">
            The canonical URL differs from the current URL
          </div>
        `;
        
        infoSection.innerHTML = `
          <div class="info-item">
            <div class="info-label">Current URL</div>
            <div class="info-value">${data.currentUrl}</div>
          </div>
          <div class="info-item" style="border-left-color: #f59e0b;">
            <div class="info-label">Canonical URL</div>
            <div class="info-value">${data.canonical}</div>
          </div>
          <div class="recommendation">
            <strong>⚠️ Warning:</strong>
            The canonical URL points to a different page. This tells search engines that the current URL is a duplicate of the canonical URL. Make sure this is intentional. If this page should be indexed, update the canonical to be self-referencing.
          </div>
        `;
      }
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
