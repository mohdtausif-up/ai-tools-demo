let checkHistory = [];

    async function checkUptime() {
      const url = document.getElementById('urlInput').value.trim();
      if (!url) {
        showToast('Please enter a URL', 'error');
        return;
      }

      let formattedUrl = url;
      if (!url.startsWith('http://') && !url.startsWith('https://')) {
        formattedUrl = 'https://' + url;
      }

      const btn = document.getElementById('checkBtn');
      btn.disabled = true;
      btn.textContent = '⏳ Checking...';

      const statusIndicator = document.getElementById('statusIndicator');
      statusIndicator.className = 'status-indicator checking';
      statusIndicator.innerHTML = '<span class="status-pulse checking"></span><span>Checking website...</span>';

      const startTime = Date.now();

      try {
        const response = await fetch(formattedUrl, { 
          method: 'HEAD',
          mode: 'no-cors'
        });
        
        const endTime = Date.now();
        const responseTime = endTime - startTime;

        // Note: no-cors mode doesn't give us actual response data
        // This is a limitation of browser-based checking
        displayOnlineStatus(responseTime, formattedUrl);
        addToHistory(formattedUrl, true, responseTime);
        
      } catch (error) {
        const endTime = Date.now();
        const responseTime = endTime - startTime;
        displayOfflineStatus(error.message);
        addToHistory(formattedUrl, false, responseTime);
      } finally {
        btn.disabled = false;
        btn.textContent = '🔍 Check Status';
      }
    }

    function displayOnlineStatus(responseTime, url) {
      const statusIndicator = document.getElementById('statusIndicator');
      statusIndicator.className = 'status-indicator online';
      statusIndicator.innerHTML = '<span class="status-pulse online"></span><span>✓ Website is Online</span>';

      document.getElementById('infoGrid').style.display = 'grid';
      document.getElementById('responseTime').textContent = responseTime + ' ms';
      document.getElementById('statusCode').textContent = 'Reachable';
      document.getElementById('serverInfo').textContent = new URL(url).hostname;
      document.getElementById('lastChecked').textContent = new Date().toLocaleTimeString();

      showToast('Website is online!');
    }

    function displayOfflineStatus(error) {
      const statusIndicator = document.getElementById('statusIndicator');
      statusIndicator.className = 'status-indicator offline';
      statusIndicator.innerHTML = '<span class="status-pulse offline"></span><span>✗ Website is Offline</span>';

      document.getElementById('infoGrid').style.display = 'grid';
      document.getElementById('responseTime').textContent = 'N/A';
      document.getElementById('statusCode').textContent = 'Unreachable';
      document.getElementById('serverInfo').textContent = error;
      document.getElementById('lastChecked').textContent = new Date().toLocaleTimeString();

      showToast('Website appears to be offline', 'error');
    }

    function addToHistory(url, isOnline, responseTime) {
      const historyItem = {
        url: url,
        status: isOnline ? 'Online' : 'Offline',
        responseTime: responseTime,
        time: new Date().toLocaleString()
      };

      checkHistory.unshift(historyItem);
      if (checkHistory.length > 5) checkHistory.pop();

      displayHistory();
    }

    function displayHistory() {
      const historySection = document.getElementById('historySection');
      const historyList = document.getElementById('historyList');
      
      historySection.style.display = 'block';
      historyList.innerHTML = '';

      checkHistory.forEach(item => {
        const div = document.createElement('div');
        div.className = 'history-item';
        div.innerHTML = `
          <div>
            <strong>${item.url}</strong><br>
            <small style="color: #64748b;">${item.time}</small>
          </div>
          <div style="text-align: right;">
            <span style="color: ${item.status === 'Online' ? '#10b981' : '#ef4444'}; font-weight: 600;">
              ${item.status}
            </span><br>
            <small style="color: #64748b;">${item.responseTime} ms</small>
          </div>
        `;
        historyList.appendChild(div);
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
