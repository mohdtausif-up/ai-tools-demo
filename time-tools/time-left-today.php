<?php
$page_title = 'Time Left in Day/Week/Month – Free Online | Time Tools';
$page_description = 'See how much time is remaining in the current day, week, and month.';
$breadcrumbs = [
    ['title' => 'Home', 'url' => 'index.php'],
    ['title' => 'Time Left Today', 'url' => '']
];
$page_css = 'time-left-today.css';
$page_js = 'time-left-today.js';
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
      <div class="card p-4 mb-3">
        <h3 class="h5">Day Progress</h3>
        <div id="dayInfo"></div>
        <div class="progress mt-2" style="height:25px"><div id="dayBar" class="progress-bar"></div></div>
      </div>
      <div class="card p-4 mb-3">
        <h3 class="h5">Week Progress</h3>
        <div id="weekInfo"></div>
        <div class="progress mt-2" style="height:25px"><div id="weekBar" class="progress-bar bg-success"></div></div>
      </div>
      <div class="card p-4 mb-3">
        <h3 class="h5">Month Progress</h3>
        <div id="monthInfo"></div>
        <div class="progress mt-2" style="height:25px"><div id="monthBar" class="progress-bar bg-warning"></div></div>
      </div>
      <div class="card p-4">
        <h3 class="h5">Year Progress</h3>
        <div id="yearInfo"></div>
        <div class="progress mt-2" style="height:25px"><div id="yearBar" class="progress-bar bg-info"></div></div>
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
function update(){
  const now = DateTime.now();
  
  const endOfDay = now.endOf('day');
  const dayLeft = endOfDay.diff(now, ['hours','minutes']).toObject();
  const dayPct = ((now.hour * 60 + now.minute) / (24 * 60)) * 100;
  document.getElementById('dayInfo').textContent = `${Math.floor(dayLeft.hours)}h ${Math.floor(dayLeft.minutes)}m remaining`;
  document.getElementById('dayBar').style.width = dayPct + '%';
  document.getElementById('dayBar').textContent = Math.floor(dayPct) + '%';
  
  const endOfWeek = now.endOf('week');
  const weekLeft = endOfWeek.diff(now, 'days').days;
  const weekPct = ((now.weekday - 1) / 7) * 100;
  document.getElementById('weekInfo').textContent = `${Math.ceil(weekLeft)} days remaining`;
  document.getElementById('weekBar').style.width = weekPct + '%';
  document.getElementById('weekBar').textContent = Math.floor(weekPct) + '%';
  
  const endOfMonth = now.endOf('month');
  const monthLeft = endOfMonth.diff(now, 'days').days;
  const monthPct = (now.day / now.daysInMonth) * 100;
  document.getElementById('monthInfo').textContent = `${Math.ceil(monthLeft)} days remaining`;
  document.getElementById('monthBar').style.width = monthPct + '%';
  document.getElementById('monthBar').textContent = Math.floor(monthPct) + '%';
  
  const endOfYear = now.endOf('year');
  const yearLeft = endOfYear.diff(now, 'days').days;
  const yearPct = (now.ordinal / (now.isInLeapYear ? 366 : 365)) * 100;
  document.getElementById('yearInfo').textContent = `${Math.ceil(yearLeft)} days remaining`;
  document.getElementById('yearBar').style.width = yearPct + '%';
  document.getElementById('yearBar').textContent = Math.floor(yearPct) + '%';
}
update();
setInterval(update, 60000);
</script>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
<?php include 'footer.php'; ?>


