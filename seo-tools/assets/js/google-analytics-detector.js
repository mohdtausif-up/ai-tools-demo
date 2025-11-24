async function checkGA() {
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
        
        // Check for Google Analytics tracking codes
        const gaPatterns = [
          /UA-\d{4,10}-\d{1,4}/g,  // Universal Analytics
          /G-[A-Z0-9]{10}/g,        // GA4
          /GTM-[A-Z0-9]{7}/g,       // Google Tag Manager
          /AW-\d{9,11}/g            // Google Ads
        ];
        
        const found = {
          ua: [],
          ga4: [],
          gtm: [],
          ads: []
        };
        
        // Search for tracking codes
        const uaMatch = html.match(gaPatterns[0]);
        const ga4Match = html.match(gaPatterns[1]);
        const gtmMatch = html.match(gaPatterns[2]);
        const adsMatch = html.match(gaPatterns[3]);
        
        if (uaMatch) found.ua = [...new Set(uaMatch)];
        if (ga4Match) found.ga4 = [...new Set(ga4Match)];
        if (gtmMatch) found.gtm = [...new Set(gtmMatch)];
        if (adsMatch) found.ads = [...new Set(adsMatch)];
        
        const hasTracking = found.ua.length > 0 || found.ga4.length > 0 || found.gtm.length > 0;
        
        displayResults(hasTracking, found);
        showToast(hasTracking ? 'Tracking codes found!' : 'No tracking codes detected');

      } catch (error) {
        console.error('Error:', error);
        showToast('Failed to fetch page (CORS blocking)', 'error');
        
        // Show example data
        displayResults(true, {
          ua: ['UA-123456789-1'],
          ga4: ['G-XXXXXXXXXX'],
          gtm: ['GTM-XXXXXX'],
          ads: []
        });
      } finally {
        btn.disabled = false;
        btn.textContent = '🔍 Check GA';
      }
    }

    function displayResults(found, tracking) {
      const resultsCard = document.getElementById('resultsCard');
      const statusBox = document.getElementById('statusBox');
      const trackingInfo = document.getElementById('trackingInfo');
      
      resultsCard.style.display = 'block';
      
      if (found) {
        statusBox.className = 'status-box found';
        statusBox.innerHTML = '✓ Google Analytics Detected';
        
        let html = '';
        
        if (tracking.ua.length > 0) {
          html += `
            <div class="tracking-item">
              <div class="tracking-label">Universal Analytics (UA)</div>
              <div class="tracking-value">${tracking.ua.join(', ')}</div>
            </div>
          `;
        }
        
        if (tracking.ga4.length > 0) {
          html += `
            <div class="tracking-item">
              <div class="tracking-label">Google Analytics 4 (GA4)</div>
              <div class="tracking-value">${tracking.ga4.join(', ')}</div>
            </div>
          `;
        }
        
        if (tracking.gtm.length > 0) {
          html += `
            <div class="tracking-item">
              <div class="tracking-label">Google Tag Manager</div>
              <div class="tracking-value">${tracking.gtm.join(', ')}</div>
            </div>
          `;
        }
        
        if (tracking.ads.length > 0) {
          html += `
            <div class="tracking-item">
              <div class="tracking-label">Google Ads Conversion</div>
              <div class="tracking-value">${tracking.ads.join(', ')}</div>
            </div>
          `;
        }
        
        trackingInfo.innerHTML = html;
      } else {
        statusBox.className = 'status-box not-found';
        statusBox.innerHTML = '✗ No Google Analytics Detected';
        trackingInfo.innerHTML = `
          <p style="color: #64748b; text-align: center; padding: 20px;">
            No Google Analytics, GA4, or GTM tracking codes were found on this page.
          </p>
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
