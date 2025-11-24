<?php
$page_title = 'Epoch Converter – Free Online | Time Tools';
$page_description = '';
$breadcrumbs = [
    ['title' => 'Home', 'url' => 'index.php'],
    ['title' => 'Epoch Converter', 'url' => '']
];
$page_css = 'epoch-converter.css';
$page_js = 'epoch-converter.js';
include 'header.php';
?>
<header class="border-bottom border-secondary"><nav class="container navbar navbar-expand-lg"><a class="navbar-brand" href="../">⏱️ Time Tools</a></nav></header>
<main class="container my-4">
  
    <div class="d-flex justify-content-end mb-3" style="gap:1rem;">
        <button id="share-btn" class="btn btn-outline-secondary" title="Share this tool"><span>ðŸ”—</span> Share</button>
        <button id="fav-btn" class="btn btn-outline-warning" title="Add to Favourites"><span>â­</span> Add to Favourites</button>
    </div>
  <div class="row g-4">
    <div class="col-lg-6">
      <div class="card p-4">
        <label>Epoch Timestamp (seconds)</label>
        <input id="epoch" type="number" class="form-control" placeholder="1700000000" oninput="fromEpoch()">
        <div id="fromResult" class="mt-3"></div>
      </div>
    </div>
    <div class="col-lg-6">
      <div class="card p-4">
        <label>Date & Time</label>
        <input id="datetime" type="datetime-local" class="form-control" oninput="toEpoch()">
        <div id="toResult" class="mt-3"></div>
      </div>
    </div>
    <div class="col-12">
      <div class="card p-4 text-center">
        <h3 class="h5">Current Epoch Time</h3>
        <h2 class="display-6 font-monospace" id="current"></h2>
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

<script type="module">
const { DateTime } = luxon;
window.fromEpoch = ()=>{
  const val = +document.getElementById('epoch').value;
  if(!val) return;
  const dt = DateTime.fromSeconds(val);
  document.getElementById('fromResult').innerHTML = `
    <strong>Date:</strong> ${dt.toLocaleString(DateTime.DATE_FULL)}<br>
    <strong>Time:</strong> ${dt.toLocaleString(DateTime.TIME_24_WITH_SECONDS)}<br>
    <strong>ISO:</strong> ${dt.toISO()}
  `;
};
window.toEpoch = ()=>{
  const val = document.getElementById('datetime').value;
  if(!val) return;
  const dt = DateTime.fromISO(val);
  const epoch = Math.floor(dt.toSeconds());
  document.getElementById('toResult').innerHTML = `
    <strong>Epoch (seconds):</strong> ${epoch}<br>
    <strong>Epoch (ms):</strong> ${epoch * 1000}
  `;
};
function updateCurrent(){
  document.getElementById('current').textContent = Math.floor(DateTime.now().toSeconds());
}
updateCurrent();
setInterval(updateCurrent, 1000);
</script>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
<?php include 'footer.php'; ?>


