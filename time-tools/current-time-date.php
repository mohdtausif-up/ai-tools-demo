<?php
$page_title = 'Current Time & Date | Time Tools';
$page_description = '';
$breadcrumbs = [
    ['title' => 'Home', 'url' => 'index.php'],
    ['title' => 'Current Time Date', 'url' => '']
];
$page_css = 'current-time-date.css';
$page_js = 'current-time-date.js';
include 'header.php';
?>
<header class="border-bottom border-secondary py-3">
  <div class="container d-flex justify-content-between align-items-center">
    <a class="h5 mb-0 text-light text-decoration-none" href="index.html">🕐 Time Tools</a>
    <a class="btn btn-sm btn-outline-light" href="index.html">Home</a>
  </div>
</header>
<main class="container my-4">
  <div class="text-center mb-4">
    
    <div class="d-flex justify-content-end mb-3" style="gap:1rem;">
        <button id="share-btn" class="btn btn-outline-secondary" title="Share this tool"><span>ðŸ”—</span> Share</button>
        <button id="fav-btn" class="btn btn-outline-warning" title="Add to Favourites"><span>â­</span> Add to Favourites</button>
    </div>
    <p class="lead text-muted">Live clock display</p>
  </div>
  <div class="row justify-content-center">
    <div class="col-lg-8">
      <div class="card p-5 text-center">
        <div class="time-display mb-3" id="time">00:00:00</div>
        <div class="h4 mb-3" id="date">Loading...</div>
        <div class="mb-3"><select class="form-select" id="tz"><option value="local">Local Time</option><option value="UTC">UTC</option><option value="America/New_York">New York</option><option value="Europe/London">London</option><option value="Asia/Tokyo">Tokyo</option></select></div>
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

<footer class="border-top border-secondary py-4 mt-5"><div class="container small text-center text-muted"><p class="mb-0">© 2025 Time Tools</p></div></footer>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
<script type="module">
const { DateTime } = luxon;
function update() {
  const tz = document.getElementById('tz').value;
  const now = tz === 'local' ? DateTime.now() : DateTime.now().setZone(tz);
  document.getElementById('time').textContent = now.toFormat('HH:mm:ss');
  document.getElementById('date').textContent = now.toFormat('EEEE, MMMM dd, yyyy');
}
setInterval(update, 1000);
document.getElementById('tz').addEventListener('change', update);
update();
</script>
<?php include 'footer.php'; ?>


