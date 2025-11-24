<?php
$page_title = 'Birthday Countdown – Free Online | Time Tools';
$page_description = '';
$breadcrumbs = [
    ['title' => 'Home', 'url' => 'index.php'],
    ['title' => 'Birthday Countdown', 'url' => '']
];
$page_css = 'birthday-countdown.css';
$page_js = 'birthday-countdown.js';
include 'header.php';
?>
<header class="border-bottom border-secondary"><nav class="container navbar navbar-expand-lg"><a class="navbar-brand" href="../">⏱️ Time Tools</a></nav></header>
<main class="container my-4">
  
    <div class="d-flex justify-content-end mb-3" style="gap:1rem;">
        <button id="share-btn" class="btn btn-outline-secondary" title="Share this tool"><span>ðŸ”—</span> Share</button>
        <button id="fav-btn" class="btn btn-outline-warning" title="Add to Favourites"><span>â­</span> Add to Favourites</button>
    </div>
  <div class="row justify-content-center">
    <div class="col-lg-6">
      <div class="card p-4">
        <label>Your Birth Date</label>
        <input id="birth" type="date" class="form-control" onchange="calc()">
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
window.calc = ()=>{
  const val = document.getElementById('birth').value;
  if(!val) return;
  const birth = DateTime.fromISO(val);
  const now = DateTime.now();
  const age = Math.floor(now.diff(birth, 'years').years);
  const nextBirthday = birth.plus({years: age + 1}).set({year: now.year});
  const final = nextBirthday < now ? nextBirthday.plus({years:1}) : nextBirthday;
  const days = Math.ceil(final.diff(now, 'days').days);
  document.getElementById('result').innerHTML = `
    <h2 class="display-1">${days}</h2>
    <p class="lead">days until you turn ${age + 1}</p>
    <p class="text-muted">${final.toLocaleString(DateTime.DATE_FULL)}</p>
    <p class="mt-3">🎉 That's ${Math.floor(days/7)} weeks and ${days%7} days!</p>
  `;
};
</script>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
<?php include 'footer.php'; ?>


