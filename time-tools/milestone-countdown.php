<?php
$page_title = 'Milestone Countdown – Free Online | Time Tools';
$page_description = 'Countdown to custom milestones like 1000 days old, 10000 days, etc.';
$breadcrumbs = [
    ['title' => 'Home', 'url' => 'index.php'],
    ['title' => 'Milestone Countdown', 'url' => '']
];
$page_css = 'milestone-countdown.css';
$page_js = 'milestone-countdown.js';
include 'header.php';
?>
<header class="border-bottom border-secondary"><nav class="container navbar navbar-expand-lg"><a class="navbar-brand" href="../">⏱️ Time Tools</a></nav></header>
<main class="container my-4">
  
    <div class="d-flex justify-content-end mb-3" style="gap:1rem;">
        <button id="share-btn" class="btn btn-outline-secondary" title="Share this tool"><span>ðŸ”—</span> Share</button>
        <button id="fav-btn" class="btn btn-outline-warning" title="Add to Favourites"><span>â­</span> Add to Favourites</button>
    </div>
  <div class="row g-4 justify-content-center">
    <div class="col-lg-8">
      <div class="card p-4">
        <label>Your Birth Date</label>
        <input id="birth" type="date" class="form-control" onchange="calc()">
        <div id="milestones" class="mt-4"></div>
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
const MILESTONES = [100, 365, 500, 1000, 2000, 3650, 5000, 7300, 10000, 14600, 18250, 20000, 25000, 30000, 36500];
window.calc = ()=>{
  const val = document.getElementById('birth').value;
  if(!val) return;
  const birth = DateTime.fromISO(val);
  const now = DateTime.now();
  const daysOld = Math.floor(now.diff(birth, 'days').days);
  
  const upcoming = MILESTONES.filter(m => m > daysOld).slice(0, 5);
  const past = MILESTONES.filter(m => m <= daysOld).slice(-3);
  
  document.getElementById('milestones').innerHTML = `
    <p class="lead">You are <strong>${daysOld}</strong> days old!</p>
    <h3 class="h5 mt-4">Past Milestones</h3>
    ${past.map(m => `<div class="milestone p-3 mb-2 rounded"><strong>${m} days</strong><br><small class="text-muted">Reached on ${birth.plus({days:m}).toLocaleString(DateTime.DATE_FULL)}</small></div>`).join('')}
    <h3 class="h5 mt-4">Upcoming Milestones</h3>
    ${upcoming.map(m => {
      const date = birth.plus({days:m});
      const daysUntil = Math.floor(date.diff(now, 'days').days);
      return `<div class="milestone p-3 mb-2 rounded"><strong>${m} days</strong><br><small class="text-muted">${date.toLocaleString(DateTime.DATE_FULL)} (in ${daysUntil} days)</small></div>`;
    }).join('')}
  `;
};
</script>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
<?php include 'footer.php'; ?>


