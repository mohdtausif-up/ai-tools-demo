function init() {
      // Set today's date as default
      document.querySelector('.lastmod-input').value = new Date().toISOString().split('T')[0];
      generateSitemap();
      attachUrlListeners();
    }

    function addUrl() {
      const container = document.getElementById('urlList');
      const urlCount = container.children.length + 1;
      const today = new Date().toISOString().split('T')[0];
      
      const urlHtml = `
        <div class="url-item">
          <div class="url-header">
            <span class="url-number">URL ${urlCount}</span>
            <button class="delete-url-btn" onclick="deleteUrl(this)">Delete</button>
          </div>
          <label class="input-label">URL</label>
          <input type="text" class="input-field url-input" value="" placeholder="https://example.com/page">
          <div class="input-row">
            <div>
              <label class="input-label">Priority (0.0-1.0)</label>
              <input type="number" class="input-field priority-input" value="0.5" min="0" max="1" step="0.1">
            </div>
            <div>
              <label class="input-label">Change Freq</label>
              <select class="input-field changefreq-input">
                <option value="daily">Daily</option>
                <option value="weekly" selected>Weekly</option>
                <option value="monthly">Monthly</option>
                <option value="yearly">Yearly</option>
                <option value="always">Always</option>
                <option value="hourly">Hourly</option>
                <option value="never">Never</option>
              </select>
            </div>
            <div>
              <label class="input-label">Last Modified</label>
              <input type="date" class="input-field lastmod-input" value="${today}">
            </div>
          </div>
        </div>
      `;
      
      container.insertAdjacentHTML('beforeend', urlHtml);
      attachUrlListeners();
      generateSitemap();
    }

    function deleteUrl(btn) {
      const container = document.getElementById('urlList');
      if (container.children.length > 1) {
        btn.closest('.url-item').remove();
        updateUrlNumbers();
        generateSitemap();
      } else {
        showToast('Must have at least one URL', 'error');
      }
    }

    function updateUrlNumbers() {
      const urls = document.querySelectorAll('.url-item');
      urls.forEach((url, index) => {
        url.querySelector('.url-number').textContent = `URL ${index + 1}`;
      });
    }

    function attachUrlListeners() {
      document.querySelectorAll('.url-input, .priority-input, .changefreq-input, .lastmod-input').forEach(input => {
        input.removeEventListener('input', generateSitemap);
        input.removeEventListener('change', generateSitemap);
        input.addEventListener('input', generateSitemap);
        input.addEventListener('change', generateSitemap);
      });
    }

    function generateSitemap() {
      const urlItems = document.querySelectorAll('.url-item');
      
      let sitemap = '<?xml version="1.0" encoding="UTF-8"?>\n';
      sitemap += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
      
      urlItems.forEach(item => {
        const url = item.querySelector('.url-input').value.trim();
        const priority = item.querySelector('.priority-input').value;
        const changefreq = item.querySelector('.changefreq-input').value;
        const lastmod = item.querySelector('.lastmod-input').value;
        
        if (url) {
          sitemap += '  <url>\n';
          sitemap += `    <loc>${escapeXml(url)}</loc>\n`;
          if (lastmod) {
            sitemap += `    <lastmod>${lastmod}</lastmod>\n`;
          }
          sitemap += `    <changefreq>${changefreq}</changefreq>\n`;
          sitemap += `    <priority>${priority}</priority>\n`;
          sitemap += '  </url>\n';
        }
      });
      
      sitemap += '</urlset>';
      
      // Syntax highlight
      const highlighted = sitemap
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/<(\/?[a-z]+)>/g, '<span class="syntax-tag">&lt;$1&gt;</span>')
        .replace(/<\?xml([^?]+)\?>/g, '<span class="syntax-tag">&lt;?xml</span><span class="syntax-attr">$1</span><span class="syntax-tag">?&gt;</span>')
        .replace(/([a-z]+)="([^"]+)"/g, '<span class="syntax-attr">$1</span>=<span class="syntax-value">"$2"</span>');
      
      document.getElementById('sitemapOutput').innerHTML = highlighted;
    }

    function escapeXml(text) {
      return text
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&apos;');
    }

    function copySitemap() {
      const urlItems = document.querySelectorAll('.url-item');
      
      let sitemap = '<?xml version="1.0" encoding="UTF-8"?>\n';
      sitemap += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
      
      urlItems.forEach(item => {
        const url = item.querySelector('.url-input').value.trim();
        const priority = item.querySelector('.priority-input').value;
        const changefreq = item.querySelector('.changefreq-input').value;
        const lastmod = item.querySelector('.lastmod-input').value;
        
        if (url) {
          sitemap += '  <url>\n';
          sitemap += `    <loc>${escapeXml(url)}</loc>\n`;
          if (lastmod) {
            sitemap += `    <lastmod>${lastmod}</lastmod>\n`;
          }
          sitemap += `    <changefreq>${changefreq}</changefreq>\n`;
          sitemap += `    <priority>${priority}</priority>\n`;
          sitemap += '  </url>\n';
        }
      });
      
      sitemap += '</urlset>';
      
      navigator.clipboard.writeText(sitemap).then(() => {
        showToast('Sitemap copied to clipboard!');
      });
    }

    function downloadSitemap() {
      const urlItems = document.querySelectorAll('.url-item');
      
      let sitemap = '<?xml version="1.0" encoding="UTF-8"?>\n';
      sitemap += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
      
      urlItems.forEach(item => {
        const url = item.querySelector('.url-input').value.trim();
        const priority = item.querySelector('.priority-input').value;
        const changefreq = item.querySelector('.changefreq-input').value;
        const lastmod = item.querySelector('.lastmod-input').value;
        
        if (url) {
          sitemap += '  <url>\n';
          sitemap += `    <loc>${escapeXml(url)}</loc>\n`;
          if (lastmod) {
            sitemap += `    <lastmod>${lastmod}</lastmod>\n`;
          }
          sitemap += `    <changefreq>${changefreq}</changefreq>\n`;
          sitemap += `    <priority>${priority}</priority>\n`;
          sitemap += '  </url>\n';
        }
      });
      
      sitemap += '</urlset>';
      
      const blob = new Blob([sitemap], { type: 'application/xml' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'sitemap.xml';
      a.click();
      URL.revokeObjectURL(url);
      showToast('Downloaded sitemap.xml!');
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

    function handleCSVUpload(event) {
      const file = event.target.files[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = function(e) {
        const text = e.target.result;
        parseCSV(text);
      };
      reader.readAsText(file);
    }

    function parseCSV(text) {
      const lines = text.split('\n').map(line => line.trim()).filter(line => line);
      
      if (lines.length === 0) {
        showToast('CSV file is empty', 'error');
        return;
      }

      // Check if first line is a header
      const firstLine = lines[0].toLowerCase();
      const hasHeader = firstLine.includes('url') || firstLine.includes('priority') || firstLine.includes('changefreq');
      const dataLines = hasHeader ? lines.slice(1) : lines;

      if (dataLines.length === 0) {
        showToast('No data found in CSV', 'error');
        return;
      }

      // Clear existing URLs
      const container = document.getElementById('urlList');
      container.innerHTML = '';

      let successCount = 0;
      const today = new Date().toISOString().split('T')[0];

      dataLines.forEach((line, index) => {
        // Parse CSV line (handle quoted fields)
        const fields = parseCSVLine(line);
        
        if (fields.length < 1 || !fields[0].trim()) return;

        const url = fields[0].trim();
        const priority = fields[1] ? parseFloat(fields[1].trim()) : 0.5;
        const changefreq = fields[2] ? fields[2].trim().toLowerCase() : 'weekly';
        const lastmod = fields[3] ? fields[3].trim() : today;

        // Validate priority
        const validPriority = Math.min(Math.max(priority, 0), 1);

        // Validate changefreq
        const validFreqs = ['always', 'hourly', 'daily', 'weekly', 'monthly', 'yearly', 'never'];
        const validChangefreq = validFreqs.includes(changefreq) ? changefreq : 'weekly';

        // Validate date format (YYYY-MM-DD)
        const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
        const validLastmod = dateRegex.test(lastmod) ? lastmod : today;

        const urlHtml = `
          <div class="url-item">
            <div class="url-header">
              <span class="url-number">URL ${index + 1}</span>
              <button class="delete-url-btn" onclick="deleteUrl(this)">Delete</button>
            </div>
            <label class="input-label">URL</label>
            <input type="text" class="input-field url-input" value="${escapeHtml(url)}" placeholder="https://example.com/page">
            <div class="input-row">
              <div>
                <label class="input-label">Priority (0.0-1.0)</label>
                <input type="number" class="input-field priority-input" value="${validPriority}" min="0" max="1" step="0.1">
              </div>
              <div>
                <label class="input-label">Change Freq</label>
                <select class="input-field changefreq-input">
                  <option value="always" ${validChangefreq === 'always' ? 'selected' : ''}>Always</option>
                  <option value="hourly" ${validChangefreq === 'hourly' ? 'selected' : ''}>Hourly</option>
                  <option value="daily" ${validChangefreq === 'daily' ? 'selected' : ''}>Daily</option>
                  <option value="weekly" ${validChangefreq === 'weekly' ? 'selected' : ''}>Weekly</option>
                  <option value="monthly" ${validChangefreq === 'monthly' ? 'selected' : ''}>Monthly</option>
                  <option value="yearly" ${validChangefreq === 'yearly' ? 'selected' : ''}>Yearly</option>
                  <option value="never" ${validChangefreq === 'never' ? 'selected' : ''}>Never</option>
                </select>
              </div>
              <div>
                <label class="input-label">Last Modified</label>
                <input type="date" class="input-field lastmod-input" value="${validLastmod}">
              </div>
            </div>
          </div>
        `;
        
        container.insertAdjacentHTML('beforeend', urlHtml);
        successCount++;
      });

      if (successCount > 0) {
        attachUrlListeners();
        generateSitemap();
        showToast(`Imported ${successCount} URLs from CSV!`);
      } else {
        // Add default URL if nothing was imported
        container.innerHTML = `
          <div class="url-item">
            <div class="url-header">
              <span class="url-number">URL 1</span>
              <button class="delete-url-btn" onclick="deleteUrl(this)">Delete</button>
            </div>
            <label class="input-label">URL</label>
            <input type="text" class="input-field url-input" value="https://example.com/" placeholder="https://example.com/page">
            <div class="input-row">
              <div>
                <label class="input-label">Priority (0.0-1.0)</label>
                <input type="number" class="input-field priority-input" value="1.0" min="0" max="1" step="0.1">
              </div>
              <div>
                <label class="input-label">Change Freq</label>
                <select class="input-field changefreq-input">
                  <option value="daily" selected>Daily</option>
                  <option value="weekly">Weekly</option>
                  <option value="monthly">Monthly</option>
                  <option value="yearly">Yearly</option>
                  <option value="always">Always</option>
                  <option value="hourly">Hourly</option>
                  <option value="never">Never</option>
                </select>
              </div>
              <div>
                <label class="input-label">Last Modified</label>
                <input type="date" class="input-field lastmod-input" value="${today}">
              </div>
            </div>
          </div>
        `;
        attachUrlListeners();
        generateSitemap();
        showToast('No valid URLs found in CSV', 'error');
      }

      // Reset file input
      document.getElementById('csvFile').value = '';
    }

    function parseCSVLine(line) {
      const result = [];
      let current = '';
      let inQuotes = false;

      for (let i = 0; i < line.length; i++) {
        const char = line[i];
        
        if (char === '"') {
          inQuotes = !inQuotes;
        } else if (char === ',' && !inQuotes) {
          result.push(current);
          current = '';
        } else {
          current += char;
        }
      }
      
      result.push(current);
      return result.map(field => field.trim().replace(/^"|"$/g, ''));
    }

    function escapeHtml(text) {
      const div = document.createElement('div');
      div.textContent = text;
      return div.innerHTML;
    }

    function downloadExampleCSV() {
      const exampleCSV = `url,priority,changefreq,lastmodified
https://example.com/,1.0,daily,2025-11-17
https://example.com/about,0.8,weekly,2025-11-10
https://example.com/services,0.9,weekly,2025-11-15
https://example.com/blog,0.9,daily,2025-11-17
https://example.com/contact,0.7,monthly,2025-11-01
https://example.com/products/product-1,0.6,weekly,2025-11-12
https://example.com/products/product-2,0.6,weekly,2025-11-14`;

      const blob = new Blob([exampleCSV], { type: 'text/csv' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'sitemap-example.csv';
      a.click();
      URL.revokeObjectURL(url);
      showToast('Downloaded example CSV file!');
    }

    init();
