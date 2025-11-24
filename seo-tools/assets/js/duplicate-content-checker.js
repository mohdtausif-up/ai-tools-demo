// Update character count on input
    document.getElementById('content1').addEventListener('input', function() {
      updateCharInfo('content1', 'charInfo1');
    });
    
    document.getElementById('content2').addEventListener('input', function() {
      updateCharInfo('content2', 'charInfo2');
    });

    function updateCharInfo(contentId, infoId) {
      const text = document.getElementById(contentId).value;
      const words = text.trim() ? text.trim().split(/\s+/).length : 0;
      const chars = text.length;
      document.getElementById(infoId).textContent = `${words} words, ${chars} characters`;
    }

    function compareContent() {
      const content1 = document.getElementById('content1').value.trim();
      const content2 = document.getElementById('content2').value.trim();
      
      if (!content1 || !content2) {
        showToast('Please enter content in both fields', 'error');
        return;
      }
      
      const similarity = calculateSimilarity(content1, content2);
      displayResults(content1, content2, similarity);
      showToast('Analysis complete!');
    }

    function calculateSimilarity(text1, text2) {
      // Normalize texts
      const normalized1 = text1.toLowerCase().replace(/[^\w\s]/g, '');
      const normalized2 = text2.toLowerCase().replace(/[^\w\s]/g, '');
      
      // Word-based comparison
      const words1 = normalized1.split(/\s+/).filter(w => w.length > 0);
      const words2 = normalized2.split(/\s+/).filter(w => w.length > 0);
      
      // Calculate word overlap
      const set1 = new Set(words1);
      const set2 = new Set(words2);
      const intersection = new Set([...set1].filter(x => set2.has(x)));
      const union = new Set([...set1, ...set2]);
      
      // Jaccard similarity
      const jaccardSimilarity = (intersection.size / union.size) * 100;
      
      // Calculate longest common subsequence ratio
      const lcs = longestCommonSubsequence(words1, words2);
      const lcsRatio = (2 * lcs / (words1.length + words2.length)) * 100;
      
      // Average of both methods
      const averageSimilarity = (jaccardSimilarity + lcsRatio) / 2;
      
      return {
        score: Math.round(averageSimilarity),
        commonWords: intersection.size,
        uniqueWords1: set1.size - intersection.size,
        uniqueWords2: set2.size - intersection.size,
        totalWords1: words1.length,
        totalWords2: words2.length
      };
    }

    function longestCommonSubsequence(arr1, arr2) {
      const m = arr1.length;
      const n = arr2.length;
      const dp = Array(m + 1).fill(null).map(() => Array(n + 1).fill(0));
      
      for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
          if (arr1[i - 1] === arr2[j - 1]) {
            dp[i][j] = dp[i - 1][j - 1] + 1;
          } else {
            dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
          }
        }
      }
      
      return dp[m][n];
    }

    function displayResults(content1, content2, similarity) {
      const resultsCard = document.getElementById('resultsCard');
      resultsCard.style.display = 'block';
      
      // Update score circle
      const scoreCircle = document.getElementById('scoreCircle');
      const scoreLabel = document.getElementById('scoreLabel');
      const scoreDesc = document.getElementById('scoreDesc');
      
      scoreCircle.textContent = `${similarity.score}%`;
      
      let bgColor, label, desc, recClass, recText;
      
      if (similarity.score >= 80) {
        bgColor = '#ef4444';
        label = 'High Similarity';
        desc = 'Content is very similar - likely duplicate';
        recClass = 'error';
        recText = '⚠️ <strong>Critical:</strong> This content appears to be duplicate or nearly identical. This can harm SEO rankings. Consider rewriting one of the texts to make it unique.';
      } else if (similarity.score >= 50) {
        bgColor = '#f59e0b';
        label = 'Moderate Similarity';
        desc = 'Content has significant overlap';
        recClass = 'warning';
        recText = '⚠️ <strong>Warning:</strong> There is significant overlap between these texts. While not critical, consider adding more unique content to differentiate them better.';
      } else {
        bgColor = '#10b981';
        label = 'Low Similarity';
        desc = 'Content is sufficiently unique';
        recClass = '';
        recText = '✓ <strong>Good:</strong> These texts are sufficiently different from each other. No duplicate content issues detected.';
      }
      
      scoreCircle.style.background = bgColor;
      scoreLabel.textContent = label;
      scoreDesc.textContent = desc;
      
      // Update stats
      const statsGrid = document.getElementById('statsGrid');
      statsGrid.innerHTML = `
        <div class="stat-item">
          <div class="stat-label">Content 1 Words</div>
          <div class="stat-value">${similarity.totalWords1}</div>
        </div>
        <div class="stat-item">
          <div class="stat-label">Content 2 Words</div>
          <div class="stat-value">${similarity.totalWords2}</div>
        </div>
        <div class="stat-item">
          <div class="stat-label">Common Words</div>
          <div class="stat-value">${similarity.commonWords}</div>
        </div>
        <div class="stat-item">
          <div class="stat-label">Unique Words (1)</div>
          <div class="stat-value">${similarity.uniqueWords1}</div>
        </div>
        <div class="stat-item">
          <div class="stat-label">Unique Words (2)</div>
          <div class="stat-value">${similarity.uniqueWords2}</div>
        </div>
        <div class="stat-item">
          <div class="stat-label">Similarity Score</div>
          <div class="stat-value">${similarity.score}%</div>
        </div>
      `;
      
      // Update recommendation
      const recommendationBox = document.getElementById('recommendationBox');
      recommendationBox.className = `recommendation-box ${recClass}`;
      recommendationBox.innerHTML = recText;
      
      // Scroll to results
      resultsCard.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
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
