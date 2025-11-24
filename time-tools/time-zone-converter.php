<?php
$page_title = 'Time Zone Converter | Time Tools';
$page_description = 'Convert time between timezones with DST awareness.';
$breadcrumbs = [
    ['title' => 'Home', 'url' => 'index.php'],
    ['title' => 'Time Zone Converter', 'url' => '']
];
$page_css = 'time-zone-converter.css';
$page_js = 'time-zone-converter.js';
include 'header.php';
?>
<header class="border-bottom border-secondary py-3">
  <div class="container d-flex justify-content-between align-items-center">
    <a class="h5 mb-0" href="index.html">🕐 Time Tools</a>
    <a class="btn btn-sm btn-outline-light" href="index.html">Home</a>
  </div>
</header>
<main class="container my-4">
  <div class="text-center mb-4">
    
    <div class="d-flex justify-content-end mb-3" style="gap:1rem;">
        <button id="share-btn" class="btn btn-outline-secondary" title="Share this tool"><span>ðŸ”—</span> Share</button>
        <button id="fav-btn" class="btn btn-outline-warning" title="Add to Favourites"><span>â­</span> Add to Favourites</button>
    </div>
    <p class="lead text-muted">Convert time between different timezones</p>
  </div>
  <div class="row g-4 justify-content-center">
    <div class="col-lg-10">
      <div class="card p-4 mb-4">
        <form id="converterForm">
          <div class="row g-3">
            <div class="col-md-6">
              <label for="sourceDateTime" class="form-label">Date & Time</label>
              <input type="datetime-local" class="form-control" id="sourceDateTime" required>
            </div>
            <div class="col-md-6">
              <label for="sourceTimezone" class="form-label">From Timezone</label>
              <select class="form-select" id="sourceTimezone">
                <option value="America/New_York">New York (EST/EDT)</option>
                <option value="America/Los_Angeles">Los Angeles (PST/PDT)</option>
                <option value="Europe/London">London (GMT/BST)</option>
                <option value="Europe/Paris">Paris (CET/CEST)</option>
                <option value="Asia/Tokyo">Tokyo (JST)</option>
                <option value="UTC">UTC</option>
              </select>
            </div>
            <div class="col-12">
              <button type="button" class="btn btn-secondary btn-sm" onclick="setNow()">Use Current Time</button>
            </div>
          </div>
        </form>
      </div>
      <div class="card p-4" id="resultsContainer" style="display:none;">
        <h2 class="h5 mb-3">Converted Times</h2>
        <div id="results"></div>
      </div>
    </div>
  </div>
    <section class="mt-5">
        <h2>How to Use</h2>
        <ol>
            <li>Fill in the required fields and options for your tool.</li>
            <li>Click the main action button to get results.</li>
            <li>Review the output and use additional features as needed.</li>
            <li>Use the Share or Add to Favourites buttons for quick access.</li>
        </ol>
    </section>
    <section class="mt-5">
        <h2>Frequently Asked Questions (FAQ)</h2>
        <div class="faq-list">
            <h3>How does this tool work?</h3>
            <p>This tool runs entirely in your browser. No data is sent to any server.</p>
            <h3>Can I use this tool on mobile?</h3>
            <p>Yes, all Time Tools are fully responsive and work on all devices.</p>
            <h3>How do I add a tool to favourites?</h3>
            <p>Click the <span>â­</span> Add to Favourites button above the form.</p>
        </div>
    </section>
    <script type="application/ld+json">
    {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
            {
                "@type": "Question",
                "name": "How does this tool work?",
                "acceptedAnswer": { "@type": "Answer", "text": "This tool runs entirely in your browser. No data is sent to any server." }
            },
            {
                "@type": "Question",
                "name": "Can I use this tool on mobile?",
                "acceptedAnswer": { "@type": "Answer", "text": "Yes, all Time Tools are fully responsive and work on all devices." }
            },
            {
                "@type": "Question",
                "name": "How do I add a tool to favourites?",
                "acceptedAnswer": { "@type": "Answer", "text": "Click the â­ Add to Favourites button above the form." }
            }
        ]
    }
    </script>

<footer class="border-top border-secondary py-4">
  <div class="container small text-center text-muted">
    <p class="mb-0">© 2025 Time Tools</p>
  </div>
</footer>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
<script type="module">
const { DateTime } = luxon;
const targetZones = ['America/New_York','America/Los_Angeles','Europe/London','Europe/Paris','Asia/Tokyo','Asia/Dubai','Australia/Sydney','UTC'];
window.setNow = function() {
  const now = DateTime.now();
  document.getElementById('sourceDateTime').value = now.toFormat("yyyy-MM-dd'T'HH:mm");
  convert();
};
function convert() {
  const dt = document.getElementById('sourceDateTime').value;
  const srcZone = document.getElementById('sourceTimezone').value;
  if (!dt) return;
  const source = DateTime.fromISO(dt, { zone: srcZone });
  if (!source.isValid) { alert('Invalid date/time'); return; }
  const results = document.getElementById('results');
  const container = document.getElementById('resultsContainer');
  container.style.display = 'block';
  results.innerHTML = targetZones.map(tz => {
    const converted = source.setZone(tz);
    const offset = converted.offset / 60;
    const city = tz === 'UTC' ? 'UTC' : tz.split('/').pop().replace(/_/g, ' ');
    return `<div class="mb-3 pb-3 border-bottom"><div class="d-flex justify-content-between align-items-center"><div><strong>${city}</strong><div class="result-time">${converted.toFormat('HH:mm:ss')}</div><small class="text-muted">${converted.toFormat('EEEE, MMMM dd, yyyy')}</small></div><div class="text-end"><span class="badge bg-secondary">UTC${offset >= 0 ? '+' : ''}${offset}</span></div></div></div>`;
  }).join('');
}
document.getElementById('sourceDateTime').addEventListener('change', convert);
document.getElementById('sourceTimezone').addEventListener('change', convert);
window.setNow();
</script>
<?php include 'footer.php'; ?>


