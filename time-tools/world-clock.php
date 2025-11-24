<?php
$page_title = 'World Clock - Multiple Timezone Display | Time Tools';
$page_description = 'View the current time in multiple timezones simultaneously.';
$breadcrumbs = [
    ['title' => 'Home', 'url' => 'index.php'],
    ['title' => 'World Clock', 'url' => '']
];
$page_css = 'world-clock.css';
$page_js = 'world-clock.js';
include 'header.php';
?>
<header class="border-bottom border-secondary py-3">
  <div class="container d-flex justify-content-between align-items-center">
    <a class="h5 mb-0" href="index.html">🌍 Time Tools</a>
    <a class="btn btn-sm btn-outline-light" href="index.html">Home</a>
  </div>
</header>
<main class="container my-4">
  <div class="text-center mb-4">
    
    <div class="d-flex justify-content-end mb-3" style="gap:1rem;">
        <button id="share-btn" class="btn btn-outline-secondary" title="Share this tool"><span>ðŸ”—</span> Share</button>
        <button id="fav-btn" class="btn btn-outline-warning" title="Add to Favourites"><span>â­</span> Add to Favourites</button>
    </div>
    <p class="lead text-muted">View current time across multiple timezones</p>
  </div>
  <div class="row g-4 justify-content-center mb-4">
    <div class="col-lg-10">
      <div class="card p-4">
        <div class="row g-3 align-items-end">
          <div class="col-md-8">
            <select class="form-select" id="timezoneSelect">
              <option value="America/New_York">New York (EST/EDT)</option>
              <option value="America/Los_Angeles">Los Angeles (PST/PDT)</option>
              <option value="Europe/London">London (GMT/BST)</option>
              <option value="Europe/Paris">Paris (CET/CEST)</option>
              <option value="Asia/Tokyo">Tokyo (JST)</option>
              <option value="Asia/Shanghai">Shanghai (CST)</option>
              <option value="Asia/Dubai">Dubai (GST)</option>
              <option value="Australia/Sydney">Sydney (AEST/AEDT)</option>
              <option value="UTC">UTC</option>
            </select>
          </div>
          <div class="col-md-4">
            <button class="btn btn-primary w-100" onclick="addTimezone()"><i class="bi bi-plus-circle"></i> Add</button>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="row g-4" id="clocksContainer"></div>
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
let timezones = JSON.parse(localStorage.getItem('worldClockTimezones') || '["America/New_York","Europe/London","Asia/Tokyo"]');
function getCityName(tz) { return tz === 'UTC' ? 'UTC' : tz.split('/').pop().replace(/_/g, ' '); }
window.addTimezone = function() {
  const tz = document.getElementById('timezoneSelect').value;
  if (!timezones.includes(tz)) { timezones.push(tz); localStorage.setItem('worldClockTimezones', JSON.stringify(timezones)); render(); }
};
window.removeTimezone = function(tz) {
  timezones = timezones.filter(t => t !== tz); localStorage.setItem('worldClockTimezones', JSON.stringify(timezones)); render();
};
function update() {
  timezones.forEach(tz => {
    const now = DateTime.now().setZone(tz), id = tz.replace(/\//g, '-');
    const t = document.getElementById(`time-${id}`), d = document.getElementById(`date-${id}`), o = document.getElementById(`offset-${id}`);
    if (t) t.textContent = now.toFormat('HH:mm:ss');
    if (d) d.textContent = now.toFormat('EEEE, MMMM dd, yyyy');
    if (o) { const off = now.offset / 60; o.textContent = `UTC${off >= 0 ? '+' : ''}${off}`; }
  });
}
function render() {
  const c = document.getElementById('clocksContainer');
  c.innerHTML = timezones.length === 0 ? '<div class="col-12 text-center py-5 text-muted">No timezones added yet</div>' :
    timezones.map(tz => {
      const id = tz.replace(/\//g, '-'), city = getCityName(tz);
      return `<div class="col-md-6 col-lg-4"><div class="card p-4 position-relative"><button class="btn btn-sm btn-danger position-absolute top-0 end-0 m-2" onclick="removeTimezone('${tz}')"><i class="bi bi-x-lg"></i></button><span class="time-offset position-absolute top-0 start-0 m-3" id="offset-${id}">UTC+0</span><div class="clock-location mb-2">${city}</div><div class="clock-time" id="time-${id}">00:00:00</div><div class="text-muted small" id="date-${id}">Loading...</div></div></div>`;
    }).join('');
  update();
}
render();
setInterval(update, 1000);
</script>

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
  <div class="container small d-flex flex-wrap gap-3">
    <span>© 2025 Time Tools</span>
    <a class="nav-link d-inline p-0" href="https://example.com/privacy/">Privacy</a>
    <a class="nav-link d-inline p-0" href="https://example.com/terms/">Terms</a>
    <span class="ms-auto">Built with HTML, Bootstrap, Luxon, and JavaScript.</span>
  </div>
</footer>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
<?php include 'footer.php'; ?>


