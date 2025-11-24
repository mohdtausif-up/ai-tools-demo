async function analyzeMetaTags() {
      const input = document.getElementById('htmlInput').value.trim();
      if (!input) {
        showToast('Please enter HTML code or a URL', 'error');
        return;
      }

      let html = input;

      // Check if input is a URL
      if (input.startsWith('http://') || input.startsWith('https://')) {
        showToast('Fetching URL... (Note: CORS may prevent fetching)', 'info');
        try {
          const response = await fetch(input);
          html = await response.text();
        } catch (error) {
          showToast('Cannot fetch URL due to CORS. Please paste HTML instead.', 'error');
          return;
        }
      }

      // Parse HTML
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, 'text/html');

      // Extract meta tags
      const results = {
        basic: extractBasicMeta(doc),
        openGraph: extractOpenGraph(doc),
        twitter: extractTwitter(doc)
      };

      // Display results
      displayResults(results);
      
      // Show results section
      document.getElementById('resultsSection').classList.add('active');
      
      showToast('Analysis complete!');
    }

    function extractBasicMeta(doc) {
      const results = [];
      
      // Title
      const title = doc.querySelector('title');
      const titleText = title ? title.textContent.trim() : '';
      const titleLength = titleText.length;
      results.push({
        name: 'Title',
        value: titleText || 'Not found',
        status: titleText ? (titleLength >= 30 && titleLength <= 60 ? 'success' : 'warning') : 'error',
        message: titleText ? 
          `${titleLength} characters ${titleLength < 30 ? '(too short, recommend 30-60)' : titleLength > 60 ? '(too long, recommend 30-60)' : '(optimal)'}` :
          'Title tag is missing',
        charCount: titleLength
      });

      // Description
      const description = doc.querySelector('meta[name="description"]');
      const descText = description ? description.getAttribute('content').trim() : '';
      const descLength = descText.length;
      results.push({
        name: 'Description',
        value: descText || 'Not found',
        status: descText ? (descLength >= 120 && descLength <= 160 ? 'success' : 'warning') : 'error',
        message: descText ?
          `${descLength} characters ${descLength < 120 ? '(too short, recommend 120-160)' : descLength > 160 ? '(too long, recommend 120-160)' : '(optimal)'}` :
          'Description meta tag is missing',
        charCount: descLength
      });

      // Keywords
      const keywords = doc.querySelector('meta[name="keywords"]');
      const keywordsText = keywords ? keywords.getAttribute('content').trim() : '';
      results.push({
        name: 'Keywords',
        value: keywordsText || 'Not found',
        status: keywordsText ? 'success' : 'warning',
        message: keywordsText ? 'Keywords found (note: less important for modern SEO)' : 'Keywords meta tag not found (optional)',
        charCount: keywordsText.length
      });

      // Viewport
      const viewport = doc.querySelector('meta[name="viewport"]');
      const viewportText = viewport ? viewport.getAttribute('content').trim() : '';
      results.push({
        name: 'Viewport',
        value: viewportText || 'Not found',
        status: viewportText ? 'success' : 'error',
        message: viewportText ? 'Viewport meta tag found' : 'Viewport meta tag is missing (required for mobile)',
        charCount: viewportText.length
      });

      // Charset
      const charset = doc.querySelector('meta[charset]');
      const charsetText = charset ? charset.getAttribute('charset').trim() : '';
      results.push({
        name: 'Charset',
        value: charsetText || 'Not found',
        status: charsetText ? 'success' : 'error',
        message: charsetText ? 'Charset declared' : 'Charset not declared',
        charCount: charsetText.length
      });

      // Canonical
      const canonical = doc.querySelector('link[rel="canonical"]');
      const canonicalText = canonical ? canonical.getAttribute('href').trim() : '';
      results.push({
        name: 'Canonical URL',
        value: canonicalText || 'Not found',
        status: canonicalText ? 'success' : 'warning',
        message: canonicalText ? 'Canonical URL specified' : 'No canonical URL (optional but recommended)',
        charCount: canonicalText.length
      });

      return results;
    }

    function extractOpenGraph(doc) {
      const results = [];
      
      const ogTags = [
        { property: 'og:title', name: 'OG Title' },
        { property: 'og:description', name: 'OG Description' },
        { property: 'og:image', name: 'OG Image' },
        { property: 'og:url', name: 'OG URL' },
        { property: 'og:type', name: 'OG Type' },
        { property: 'og:site_name', name: 'OG Site Name' }
      ];

      ogTags.forEach(tag => {
        const element = doc.querySelector(`meta[property="${tag.property}"]`);
        const content = element ? element.getAttribute('content').trim() : '';
        results.push({
          name: tag.name,
          value: content || 'Not found',
          status: content ? 'success' : 'warning',
          message: content ? 'Open Graph tag found' : 'Not specified (recommended for social sharing)',
          charCount: content.length
        });
      });

      return results;
    }

    function extractTwitter(doc) {
      const results = [];
      
      const twitterTags = [
        { name: 'twitter:card', label: 'Twitter Card' },
        { name: 'twitter:title', label: 'Twitter Title' },
        { name: 'twitter:description', label: 'Twitter Description' },
        { name: 'twitter:image', label: 'Twitter Image' },
        { name: 'twitter:site', label: 'Twitter Site' },
        { name: 'twitter:creator', label: 'Twitter Creator' }
      ];

      twitterTags.forEach(tag => {
        const element = doc.querySelector(`meta[name="${tag.name}"]`);
        const content = element ? element.getAttribute('content').trim() : '';
        results.push({
          name: tag.label,
          value: content || 'Not found',
          status: content ? 'success' : 'warning',
          message: content ? 'Twitter Card tag found' : 'Not specified (recommended for Twitter sharing)',
          charCount: content.length
        });
      });

      return results;
    }

    function displayResults(results) {
      // Calculate scores
      const allTags = [...results.basic, ...results.openGraph, ...results.twitter];
      const foundCount = allTags.filter(tag => tag.status === 'success').length;
      const missingCount = allTags.filter(tag => tag.status === 'error' || tag.status === 'warning').length;
      const score = Math.round((foundCount / allTags.length) * 100);

      // Update score cards
      const scoreElement = document.getElementById('overallScore');
      scoreElement.textContent = score + '%';
      scoreElement.className = 'score-value ' + (score >= 80 ? 'good' : score >= 50 ? 'medium' : 'poor');
      
      document.getElementById('foundTags').textContent = foundCount;
      document.getElementById('foundTags').className = 'score-value good';
      
      document.getElementById('missingTags').textContent = missingCount;
      document.getElementById('missingTags').className = 'score-value ' + (missingCount === 0 ? 'good' : missingCount < 5 ? 'medium' : 'poor');

      // Display basic meta
      displayTagResults('basicMetaResults', results.basic);
      
      // Display Open Graph
      displayTagResults('ogResults', results.openGraph);
      
      // Display Twitter
      displayTagResults('twitterResults', results.twitter);
    }

    function displayTagResults(elementId, tags) {
      const container = document.getElementById(elementId);
      container.innerHTML = '';

      tags.forEach(tag => {
        const tagItem = document.createElement('div');
        tagItem.className = `tag-item ${tag.status}`;
        
        const statusIcon = tag.status === 'success' ? '✓' : tag.status === 'warning' ? '⚠' : '✗';
        
        tagItem.innerHTML = `
          <div class="tag-name">${tag.name}</div>
          <div class="tag-value">${escapeHtml(tag.value)}</div>
          <div class="tag-status ${tag.status}">
            <span>${statusIcon}</span>
            <span>${tag.message}</span>
          </div>
        `;
        
        container.appendChild(tagItem);
      });
    }

    function escapeHtml(text) {
      const div = document.createElement('div');
      div.textContent = text;
      return div.innerHTML;
    }

    function showToast(message, type = 'success') {
      const existingToast = document.querySelector('.toast');
      if (existingToast) existingToast.remove();
      
      const toast = document.createElement('div');
      toast.className = 'toast';
      toast.style.background = type === 'error' ? '#ef4444' : type === 'info' ? '#3b82f6' : '#10b981';
      toast.textContent = message;
      document.body.appendChild(toast);
      
      setTimeout(() => toast.remove(), 3000);
    }
