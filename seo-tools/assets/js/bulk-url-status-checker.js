async function checkUrls() {
      const input = document.getElementById('urlsInput').value.trim();
      
      if (!input) {
        alert('Please enter at least one URL');
        return;
      }

      const urls = input.split('\n').filter(url => url.trim());
      
      if (urls.length === 0) {
        alert('No valid URLs found');
        return;
      }

      const btn = document.getElementById('checkBtn');
      btn.disabled = true;
      btn.textContent = `⏳ Checking ${urls.length} URLs...`;

      const results = await Promise.all(
        urls.map(url => checkUrlStatus(url.trim()))
      );

      displayResults(results);
      
      btn.disabled = false;
      btn.textContent = '🔍 Check All URLs';
    }

    async function checkUrlStatus(url) {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 10000);
        
        const response = await fetch(url, {
          method: 'HEAD',
          mode: 'no-cors',
          signal: controller.signal
        });
        
        clearTimeout(timeoutId);
        
        const status = response.status || 0;
        let type = 'success';
        let statusText = 'OK';
        
        if (status === 0) {
          type = 'success';
          statusText = 'Reachable';
        } else if (status >= 200 && status < 300) {
          type = 'success';
          statusText = status + ' OK';
        } else if (status >= 300 && status < 400) {
          type = 'redirect';
          statusText = status + ' Redirect';
        } else if (status >= 400) {
          type = 'error';
          statusText = status + ' Error';
        }
        
        return {
          url: url,
          status: status,
          statusText: statusText,
          type: type
        };
      } catch (error) {
        return {
          url: url,
          status: 0,
          statusText: 'Timeout/Error',
          type: 'error'
        };
      }
    }

    function displayResults(results) {
      const totalCount = results.length;
      const successCount = results.filter(r => r.type === 'success').length;
      const redirectCount = results.filter(r => r.type === 'redirect').length;
      const errorCount = results.filter(r => r.type === 'error').length;
      
      document.getElementById('totalCount').textContent = totalCount;
      document.getElementById('successCount').textContent = successCount;
      document.getElementById('redirectCount').textContent = redirectCount;
      document.getElementById('errorCount').textContent = errorCount;
      
      const resultsList = document.getElementById('resultsList');
      resultsList.innerHTML = results.map(result => `
        <div class="result-item ${result.type}">
          <div class="result-url">${result.url}</div>
          <div class="result-status ${result.type}">${result.statusText}</div>
        </div>
      `).join('');
    }
