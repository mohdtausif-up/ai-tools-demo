const adjectives = [
      'cool', 'swift', 'dark', 'bright', 'wild', 'brave', 'smart', 'quick',
      'super', 'mega', 'ultra', 'epic', 'pro', 'elite', 'prime', 'alpha',
      'cyber', 'tech', 'digital', 'cosmic', 'lunar', 'solar', 'fire', 'ice'
    ];
    
    const nouns = [
      'ninja', 'warrior', 'dragon', 'phoenix', 'tiger', 'wolf', 'falcon', 'eagle',
      'shadow', 'ghost', 'storm', 'thunder', 'lightning', 'blaze', 'frost', 'vortex',
      'knight', 'hunter', 'ranger', 'wizard', 'master', 'legend', 'hero', 'champion'
    ];
    
    function generateUsernames() {
      const baseWord = document.getElementById('baseWord').value.trim();
      const addNumbers = document.getElementById('addNumbers').checked;
      const addAdjective = document.getElementById('addAdjective').checked;
      const addUnderscore = document.getElementById('addUnderscore').checked;
      const capitalize = document.getElementById('capitalize').checked;
      
      const usernames = [];
      
      for (let i = 0; i < 10; i++) {
        let username = '';
        
        if (addAdjective) {
          const adj = adjectives[Math.floor(Math.random() * adjectives.length)];
          username += capitalize ? adj.charAt(0).toUpperCase() + adj.slice(1) : adj;
        }
        
        if (username && addUnderscore) {
          username += '_';
        } else if (username) {
          username += capitalize ? '' : '';
        }
        
        if (baseWord) {
          username += capitalize ? baseWord.charAt(0).toUpperCase() + baseWord.slice(1) : baseWord;
        } else {
          const noun = nouns[Math.floor(Math.random() * nouns.length)];
          username += capitalize ? noun.charAt(0).toUpperCase() + noun.slice(1) : noun;
        }
        
        if (addNumbers) {
          const num = Math.floor(Math.random() * 9999);
          username += addUnderscore ? '_' + num : num;
        }
        
        usernames.push(username);
      }
      
      displayUsernames(usernames);
      showToast('Generated 10 usernames!');
    }
    
    function displayUsernames(usernames) {
      const list = document.getElementById('usernameList');
      list.innerHTML = usernames.map((username, index) => `
        <div class="username-item">
          <span class="username-text">${username}</span>
          <button class="copy-btn-small" onclick="copyUsername('${username}')">📋 Copy</button>
        </div>
      `).join('');
    }
    
    function copyUsername(username) {
      navigator.clipboard.writeText(username).then(() => {
        showToast('Username copied!');
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
    
    // Generate initial usernames
    generateUsernames();
