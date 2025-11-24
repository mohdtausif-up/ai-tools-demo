let languageVersions = [];

    function addLanguageVersion() {
      const lang = document.getElementById('langInput').value.trim();
      const url = document.getElementById('urlInput').value.trim();
      
      if (!lang || !url) {
        showToast('Please enter both language code and URL', 'error');
        return;
      }
      
      // Check if language already exists
      if (languageVersions.find(v => v.lang === lang)) {
        showToast('This language code already exists', 'error');
        return;
      }
      
      languageVersions.push({ lang, url });
      
      document.getElementById('langInput').value = '';
      document.getElementById('urlInput').value = '';
      
      updateUrlList();
      showToast(`Added ${lang}`);
    }

    function removeLanguageVersion(lang) {
      languageVersions = languageVersions.filter(v => v.lang !== lang);
      updateUrlList();
      showToast('Removed');
    }

    function updateUrlList() {
      const urlList = document.getElementById('urlList');
      
      if (languageVersions.length === 0) {
        urlList.innerHTML = `
          <p style="color: #94a3b8; text-align: center; padding: 20px; font-size: 13px;">
            No language versions added yet
          </p>
        `;
        return;
      }
      
      urlList.innerHTML = languageVersions.map(v => `
        <div class="url-item">
          <span class="url-lang">${v.lang}</span>
          <span class="url-path">${v.url}</span>
          <button class="remove-btn" onclick="removeLanguageVersion('${v.lang}')">✕</button>
        </div>
      `).join('');
    }

    function generateHreflang() {
      if (languageVersions.length === 0) {
        showToast('Add at least one language version', 'error');
        return;
      }
      
      let code = '<!-- Hreflang Tags -->\n';
      
      languageVersions.forEach(v => {
        code += `<link rel="alternate" hreflang="${v.lang}" href="${v.url}" />\n`;
      });
      
      // Add x-default if not already present
      if (!languageVersions.find(v => v.lang === 'x-default')) {
        code += `<link rel="alternate" hreflang="x-default" href="${languageVersions[0].url}" />\n`;
      }
      
      document.getElementById('codeOutput').textContent = code;
      document.getElementById('copyBtn').style.display = 'block';
      
      showToast('Hreflang tags generated!');
    }

    function copyCode() {
      const code = document.getElementById('codeOutput').textContent;
      navigator.clipboard.writeText(code).then(() => {
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
