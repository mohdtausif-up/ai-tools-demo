<?php
$page_title = 'Sitemap Generator - XML Sitemap Builder';
$page_description = 'Generate XML sitemaps for your website to improve SEO and search engine indexing.';
$breadcrumbs = [
    ['title' => 'Home', 'url' => 'index.php'],
    ['title' => 'Sitemap Generator', 'url' => '']
];
$page_css = 'sitemap-generator.css';
$page_js = 'sitemap-generator.js';
include 'header.php';
?>
<div class="container">
    
  <div class="d-flex justify-content-end mb-3" style="gap:1rem;">
    <button id="share-btn" class="btn btn-outline-secondary" title="Share this tool"><span>ðŸ”—</span> Share</button>
    <button id="fav-btn" class="btn btn-outline-warning" title="Add to Favourites"><span>â­</span> Add to Favourites</button>
  </div>
    <p class="subtitle">Create XML sitemaps for better SEO and search engine indexing</p>

    <div class="main-grid">
      <div class="input-card">
        <div class="section-title">Add URLs</div>
        
        <div class="csv-upload-section">
          <div class="csv-upload-title">📂 Upload CSV File</div>
          <div class="csv-upload-hint">CSV format: url, priority, changefreq, lastmodified</div>
          <div class="file-input-wrapper">
            <input type="file" id="csvFile" class="file-input" accept=".csv" onchange="handleCSVUpload(event)">
            <label for="csvFile" class="file-input-label">Choose CSV File</label>
          </div>
          <a class="download-example-link" onclick="downloadExampleCSV()">⬇️ Download Example CSV</a>
        </div>

        <div class="divider">OR ADD MANUALLY</div>
        
        <div class="url-list" id="urlList">
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
                <input type="date" class="input-field lastmod-input">
              </div>
            </div>
          </div>
        </div>
        <button class="add-btn" onclick="addUrl()">+ Add URL</button>
      </div>

      <div class="output-card">
        <div class="section-title">Generated Sitemap XML</div>
        <div class="output-section">
          <pre id="sitemapOutput"></pre>
        </div>
        <button class="copy-btn" onclick="copySitemap()">📋 Copy to Clipboard</button>
        <button class="download-btn" onclick="downloadSitemap()">⬇️ Download sitemap.xml</button>
      </div>
      <section class="how-to-use" style="margin-top:2rem;padding:1.5rem;background:#f9fafb;border-radius:8px;box-shadow:0 1px 4px rgba(0,0,0,0.04);">
        <h2 style="font-size:1.2rem;color:#2563eb;margin-bottom:0.7rem;">How to Use</h2>
        <ol style="margin-left:1.2rem;">
          <li>Upload a CSV file with your URLs or add them manually using the form.</li>
          <li>Set priority, change frequency, and last modified date for each URL.</li>
          <li>View the generated XML sitemap in the output section.</li>
          <li>Copy or download the sitemap.xml file for your website.</li>
          <li>Submit your sitemap to search engines for better indexing and SEO.</li>
        </ol>
      </section>
    </div>
  </div>
<?php include 'footer.php'; ?>

