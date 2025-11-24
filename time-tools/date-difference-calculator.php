<?php
$page_title = 'Date Difference Calculator – Free Online | Time Tools';
$page_description = 'Calculate the difference between two dates in various units.';
$breadcrumbs = [
    ['title' => 'Home', 'url' => 'index.php'],
    ['title' => 'Date Difference Calculator', 'url' => '']
];
$page_css = 'date-difference-calculator.css';
$page_js = 'date-difference-calculator.js';
include 'header.php';
?>
<header class="border-bottom border-secondary">
  <nav class="container navbar navbar-expand-lg"><a class="navbar-brand" href="../">⏱️ Time Tools</a></nav>
</header>
<main class="container my-4">
  
    <div class="d-flex justify-content-end mb-3" style="gap:1rem;">
        <button id="share-btn" class="btn btn-outline-secondary" title="Share this tool"><span>ðŸ”—</span> Share</button>
        <button id="fav-btn" class="btn btn-outline-warning" title="Add to Favourites"><span>â­</span> Add to Favourites</button>
    </div>
  <div class="row g-4 justify-content-center">
    <div class="col-lg-8">
      <div class="card p-4">
        <div class="row g-3">
          <div class="col-md-6"><label>From Date</label><input id="date1" type="date" class="form-control" onchange="calc()"></div>
          <div class="col-md-6"><label>To Date</label><input id="date2" type="date" class="form-control" onchange="calc()"></div>
        </div>
        <div id="result" class="mt-4"></div>
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
window.calc = ()=>{
  const d1 = document.getElementById('date1').value;
  const d2 = document.getElementById('date2').value;
  if(!d1 || !d2) return;
  
  const start = DateTime.fromISO(d1);
  const end = DateTime.fromISO(d2);
  const diff = end.diff(start, ['years','months','days']).toObject();
  const totalDays = Math.abs(Math.floor(end.diff(start, 'days').days));
  const totalWeeks = Math.floor(totalDays / 7);
  const totalMonths = Math.abs(Math.floor(end.diff(start, 'months').months));
  
  document.getElementById('result').innerHTML = `
    <h3 class="h5">Difference</h3>
    <p class="display-6">${Math.abs(Math.floor(diff.years||0))} years, ${Math.abs(Math.floor(diff.months||0))} months, ${Math.abs(Math.floor(diff.days||0))} days</p>
    <hr>
    <div class="row text-center">
      <div class="col-3"><strong>${totalDays}</strong><br><small class="text-muted">Days</small></div>
      <div class="col-3"><strong>${totalWeeks}</strong><br><small class="text-muted">Weeks</small></div>
      <div class="col-3"><strong>${totalMonths}</strong><br><small class="text-muted">Months</small></div>
      <div class="col-3"><strong>${Math.abs(Math.floor(diff.years||0))}</strong><br><small class="text-muted">Years</small></div>
    </div>
  `;
};
</script>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
<?php include 'footer.php'; ?>


