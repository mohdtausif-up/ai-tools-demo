<?php
$page_title = 'Day Counter – Free Online | Time Tools';
$page_description = 'Count days from a specific date or to a future date.';
$breadcrumbs = [
    ['title' => 'Home', 'url' => 'index.php'],
    ['title' => 'Day Counter', 'url' => '']
];
$page_css = 'day-counter.css';
$page_js = 'day-counter.js';
include 'header.php';
?>
<header class="border-bottom border-secondary"><nav class="container navbar navbar-expand-lg"><a class="navbar-brand" href="../">⏱️ Time Tools</a></nav></header>
<main class="container my-4">
  
    <div class="d-flex justify-content-end mb-3" style="gap:1rem;">
        <button id="share-btn" class="btn btn-outline-secondary" title="Share this tool"><span>ðŸ”—</span> Share</button>
        <button id="fav-btn" class="btn btn-outline-warning" title="Add to Favourites"><span>â­</span> Add to Favourites</button>
    </div>
  <div class="row g-4 justify-content-center">
    <div class="col-lg-6">
      <div class="card p-4">
        <label>Select Mode</label>
        <select id="mode" class="form-select mb-3" onchange="updateMode()">
          <option value="from">Days Since</option>
          <option value="to">Days Until</option>
        </select>
        <label id="label">Date</label>
        <input id="targetDate" type="date" class="form-control" onchange="calc()">
        <div id="result" class="mt-4 text-center"></div>
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
window.updateMode = ()=>{ document.getElementById('label').textContent = document.getElementById('mode').value==='from'?'Date (Past)':'Date (Future)'; calc(); };
window.calc = ()=>{
  const val = document.getElementById('targetDate').value;
  if(!val) return;
  const target = DateTime.fromISO(val);
  const now = DateTime.now();
  const days = Math.abs(Math.floor(now.diff(target, 'days').days));
  const mode = document.getElementById('mode').value;
  document.getElementById('result').innerHTML = `<h2 class="display-3">${days}</h2><p class="text-muted">${mode==='from'?'days since':'days until'} ${target.toLocaleString(DateTime.DATE_FULL)}</p>`;
};
</script>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
<?php include 'footer.php'; ?>


