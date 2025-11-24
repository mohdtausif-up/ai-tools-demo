<?php
$page_title = 'Age Calculator – Free Online | Time Tools';
$page_description = 'Calculate exact age in years, months, days, hours, and more.';
$breadcrumbs = [
    ['title' => 'Home', 'url' => 'index.php'],
    ['title' => 'Age Calculator', 'url' => '']
];
$page_css = 'age-calculator.css';
$page_js = 'age-calculator.js';
include 'header.php';
?>
<header class="border-bottom border-secondary">
  <nav class="container navbar navbar-expand-lg">
    <a class="navbar-brand" href="../">⏱️ Time Tools</a>
  </nav>
</header>
<main class="container my-4">
  
    <div class="d-flex justify-content-end mb-3" style="gap:1rem;">
        <button id="share-btn" class="btn btn-outline-secondary" title="Share this tool"><span>ðŸ”—</span> Share</button>
        <button id="fav-btn" class="btn btn-outline-warning" title="Add to Favourites"><span>â­</span> Add to Favourites</button>
    </div>
  
  <div class="row g-4 justify-content-center">
    <div class="col-lg-6">
      <div class="card p-4">
        <label class="form-label">Enter Birth Date</label>
        <input id="birthDate" type="date" class="form-control form-control-lg" onchange="calculate()">
        
        <div class="form-check mt-3">
          <input class="form-check-input" type="checkbox" id="includeTime">
          <label class="form-check-label" for="includeTime">Include birth time</label>
        </div>
        <input id="birthTime" type="time" class="form-control mt-2" style="display:none" onchange="calculate()">
      </div>
      
      <div id="results" class="mt-4"></div>
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
const { DateTime, Interval } = luxon;

document.getElementById('includeTime').addEventListener('change', (e)=>{
  document.getElementById('birthTime').style.display = e.target.checked ? 'block' : 'none';
  calculate();
});

window.calculate = ()=>{
  const dateVal = document.getElementById('birthDate').value;
  if(!dateVal){ document.getElementById('results').innerHTML=''; return; }
  
  let birth;
  if(document.getElementById('includeTime').checked && document.getElementById('birthTime').value){
    birth = DateTime.fromISO(dateVal + 'T' + document.getElementById('birthTime').value);
  } else {
    birth = DateTime.fromISO(dateVal);
  }
  
  const now = DateTime.now();
  const age = Interval.fromDateTimes(birth, now);
  const duration = age.toDuration(['years','months','days','hours','minutes','seconds']);
  
  const years = Math.floor(duration.years);
  const months = Math.floor(duration.months);
  const days = Math.floor(duration.days);
  const hours = Math.floor(duration.hours);
  const totalDays = Math.floor(age.length('days'));
  const totalHours = Math.floor(age.length('hours'));
  const totalMinutes = Math.floor(age.length('minutes'));
  const totalSeconds = Math.floor(age.length('seconds'));
  
  const nextBirthday = birth.plus({years: years + 1});
  const daysUntilBirthday = Math.ceil(nextBirthday.diff(now, 'days').days);
  
  document.getElementById('results').innerHTML = `
    <div class="stat-card p-4 rounded mb-3">
      <h2 class="display-4 mb-0">${years}</h2>
      <p class="text-muted mb-0">Years, ${months} Months, ${days} Days</p>
    </div>
    
    <div class="row g-3">
      <div class="col-6"><div class="stat-card p-3 rounded"><strong>${totalDays.toLocaleString()}</strong><br><small class="text-muted">Total Days</small></div></div>
      <div class="col-6"><div class="stat-card p-3 rounded"><strong>${totalHours.toLocaleString()}</strong><br><small class="text-muted">Total Hours</small></div></div>
      <div class="col-6"><div class="stat-card p-3 rounded"><strong>${totalMinutes.toLocaleString()}</strong><br><small class="text-muted">Total Minutes</small></div></div>
      <div class="col-6"><div class="stat-card p-3 rounded"><strong>${totalSeconds.toLocaleString()}</strong><br><small class="text-muted">Total Seconds</small></div></div>
    </div>
    
    <div class="stat-card p-3 rounded mt-3">
      <strong>Next Birthday:</strong> ${nextBirthday.toLocaleString(DateTime.DATE_FULL)}<br>
      <small class="text-muted">${daysUntilBirthday} days from now</small>
    </div>
  `;
};
</script>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
<?php include 'footer.php'; ?>


