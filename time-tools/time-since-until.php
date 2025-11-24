<?php
$page_title = 'Time Since/Until – Free Online | Time Tools';
$page_description = '';
$breadcrumbs = [
    ['title' => 'Home', 'url' => 'index.php'],
    ['title' => 'Time Since Until', 'url' => '']
];
$page_css = 'time-since-until.css';
$page_js = 'time-since-until.js';
include 'header.php';
?>
<header class="border-bottom border-secondary"><nav class="container navbar navbar-expand-lg"><a class="navbar-brand" href="../">⏱️ Time Tools</a></nav></header>
<main class="container my-4">
  
    <div class="d-flex justify-content-end mb-3" style="gap:1rem;">
        <button id="share-btn" class="btn btn-outline-secondary" title="Share this tool"><span>ðŸ”—</span> Share</button>
        <button id="fav-btn" class="btn btn-outline-warning" title="Add to Favourites"><span>â­</span> Add to Favourites</button>
    </div>
  <div class="row justify-content-center">
    <div class="col-lg-8">
      <div class="card p-4">
        <div class="btn-group mb-3 w-100" role="group">
          <input type="radio" class="btn-check" name="mode" id="since" value="since" checked onchange="calc()">
          <label class="btn btn-outline-primary" for="since">Time Since</label>
          <input type="radio" class="btn-check" name="mode" id="until" value="until" onchange="calc()">
          <label class="btn btn-outline-primary" for="until">Time Until</label>
        </div>
        
        <label>Event</label>
        <input id="event" class="form-control mb-2" placeholder="Moon landing" onchange="calc()">
        
        <label>Date & Time</label>
        <input id="datetime" type="datetime-local" class="form-control mb-4" onchange="calc()">
        
        <div id="result" class="text-center"></div>
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
const { DateTime, Interval } = luxon;
window.calc = ()=>{
  const val = document.getElementById('datetime').value;
  if(!val) return;
  
  const target = DateTime.fromISO(val);
  const now = DateTime.now();
  const mode = document.querySelector('input[name="mode"]:checked').value;
  const event = document.getElementById('event').value || 'that moment';
  
  const diff = mode === 'since' ? now.diff(target) : target.diff(now);
  const duration = diff.shiftTo('years','months','days','hours','minutes','seconds');
  
  const parts = [];
  if(duration.years >= 1) parts.push(`${Math.floor(duration.years)} years`);
  if(duration.months >= 1) parts.push(`${Math.floor(duration.months)} months`);
  if(duration.days >= 1) parts.push(`${Math.floor(duration.days)} days`);
  if(duration.hours >= 1) parts.push(`${Math.floor(duration.hours)} hours`);
  if(duration.minutes >= 1) parts.push(`${Math.floor(duration.minutes)} minutes`);
  
  const totalDays = Math.abs(Math.floor(diff.as('days')));
  const totalHours = Math.abs(Math.floor(diff.as('hours')));
  const totalMinutes = Math.abs(Math.floor(diff.as('minutes')));
  
  document.getElementById('result').innerHTML = `
    <h2 class="h4 mb-3">${mode === 'since' ? 'Time since' : 'Time until'} ${event}</h2>
    <p class="display-6">${parts.join(', ')}</p>
    <hr class="my-4">
    <div class="row text-center">
      <div class="col-4"><h3 class="h5">${totalDays.toLocaleString()}</h3><small class="text-muted">Days</small></div>
      <div class="col-4"><h3 class="h5">${totalHours.toLocaleString()}</h3><small class="text-muted">Hours</small></div>
      <div class="col-4"><h3 class="h5">${totalMinutes.toLocaleString()}</h3><small class="text-muted">Minutes</small></div>
    </div>
  `;
};
</script>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
<?php include 'footer.php'; ?>


