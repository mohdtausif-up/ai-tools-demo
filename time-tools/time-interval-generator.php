<?php
$page_title = 'Time Interval Generator | Time Tools';
$page_description = 'Split a time range into equal intervals and export CSV.';
$breadcrumbs = [
    ['title' => 'Home', 'url' => 'index.php'],
    ['title' => 'Time Interval Generator', 'url' => '']
];
$page_css = 'time-interval-generator.css';
$page_js = 'time-interval-generator.js';
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
    <p class="lead text-muted">Generate time intervals with custom steps</p>
  </div>
  <div class="row justify-content-center">
    <div class="col-lg-8">
      <div class="card p-4 mb-3">
        <div class="row g-3">
          <div class="col-md-4"><label class="form-label">Start</label><input type="time" class="form-control" id="start" value="09:00"></div>
          <div class="col-md-4"><label class="form-label">End</label><input type="time" class="form-control" id="end" value="17:00"></div>
          <div class="col-md-4"><label class="form-label">Step (min)</label><input type="number" class="form-control" id="step" value="30" min="1"></div>
          <div class="col-12"><button class="btn btn-primary w-100" onclick="generate()">Generate</button> <button class="btn btn-secondary w-100 mt-2" onclick="exportCSV()">Export CSV</button></div>
        </div>
      </div>
      <div class="card p-4"><div class="intervals" id="intervals"></div></div>
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
let intervals = [];
window.generate = function() {
  const start = DateTime.fromFormat(document.getElementById('start').value, 'HH:mm');
  const end = DateTime.fromFormat(document.getElementById('end').value, 'HH:mm');
  const step = Number(document.getElementById('step').value);
  intervals = [];
  let current = start;
  while (current <= end) {
    intervals.push(current.toFormat('HH:mm'));
    current = current.plus({ minutes: step });
  }
  document.getElementById('intervals').innerHTML = intervals.map(t => `<div>${t}</div>`).join('');
};
window.exportCSV = function() {
  if (intervals.length === 0) return;
  const csv = intervals.join('\n');
  const blob = new Blob([csv], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'time-intervals.csv';
  a.click();
  URL.revokeObjectURL(url);
};
generate();
</script>




<a href="#main" class="skip-link">Skip to content</a>
<header class="border-bottom border-secondary">
  <nav class="container navbar navbar-expand-lg" aria-label="Primary">
    <a class="navbar-brand" href="https://example.com/time-tools/">⏱️ Time Tools</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#nav"><span class="navbar-toggler-icon"></span></button>
    <div id="nav" class="collapse navbar-collapse">
      <ul class="navbar-nav ms-auto">
        <li class="nav-item"><a class="nav-link" href="https://example.com/time-tools/">Time Tools</a></li>
        <li class="nav-item"><a class="nav-link" href="https://example.com/about/">About</a></li>
      </ul>
    </div>
  </nav>
</header>
<main id="main" class="container my-4">

    <section class="hero text-center">
      
    <div class="d-flex justify-content-end mb-3" style="gap:1rem;">
        <button id="share-btn" class="btn btn-outline-secondary" title="Share this tool"><span>ðŸ”—</span> Share</button>
        <button id="fav-btn" class="btn btn-outline-warning" title="Add to Favourites"><span>â­</span> Add to Favourites</button>
    </div>
      <p class="lead text-muted">Generate evenly spaced intervals between two times.</p>
      <div class="ad-slot top d-flex align-items-center justify-content-center mt-3" aria-label="ad"><span class="text-muted">Ad slot (reserved)</span></div>
    </section>
    
    <section class="row g-4 align-items-start">
    <div class="col-lg-7">
      <div class="card p-3">
        <h2 class="h4">Use the Time Interval Generator</h2>
        <form id="toolForm" novalidate>
          
<div class="row g-3">
  <div class="col-sm-6"><label class="form-label" for="start">Start</label><input id="start" type="datetime-local" class="form-control"></div>
  <div class="col-sm-6"><label class="form-label" for="end">End</label><input id="end" type="datetime-local" class="form-control"></div>
  <div class="col-sm-6"><label class="form-label" for="stepMin">Interval (minutes)</label><input id="stepMin" type="number" class="form-control" value="30"></div>
  <div class="col-sm-6"><label class="form-label" for="includeEnd">Include end</label><select id="includeEnd" class="form-select"><option value="1">Yes</option><option value="0" selected>No</option></select></div>
  <div class="col-12"><button type="button" id="csvBtn" class="btn btn-outline-light"><i class="bi bi-filetype-csv"></i> Export CSV</button></div>
  <div class="col-12"><table class="table table-dark table-striped table-sm"><thead><tr><th>#</th><th>Start</th><th>End</th></tr></thead><tbody id="rows"></tbody></table></div>
</div>

          <div class="mt-3 d-flex gap-2 justify-content-end">
            <button type="button" id="resetBtn" class="btn btn-outline-light"><i class="bi bi-arrow-counterclockwise"></i> Reset</button>
            <button type="button" id="shareBtn" class="btn btn-secondary"><i class="bi bi-share"></i> Share</button>
            <button type="submit" id="runBtn" class="btn btn-primary"><i class="bi bi-play-circle"></i> Run</button>
          </div>
        </form>
      </div>
      <div class="card mt-3 p-3"><h3 class="h5">Result</h3><div id="result" class="result-display mono" aria-live="polite">—</div><div id="subResult" class="text-muted mt-2"></div></div>
      <div class="ad-slot mid d-flex align-items-center justify-content-center mt-3" aria-label="ad"><span class="text-muted">Ad slot (reserved)</span></div>
      <div class="card mt-3 p-3"><h3 class="h5">How it works</h3><p>Generates ISO timestamps for easy import into spreadsheets or calendars.</p><p class="small text-muted mb-0">No data leaves your browser. Everything runs locally.</p></div>
    </div>
    
    <aside class="col-lg-5">
      <div class="card p-3"><h2 class="h5">Related tools</h2>
        <ul class="list-unstyled mb-0">
          <li><a href="https://example.com/time-tools/countdown-timer/">Countdown Timer</a></li>
          <li><a href="https://example.com/time-tools/stopwatch/">Stopwatch</a></li>
          <li><a href="https://example.com/time-tools/world-clock/">World Clock</a></li>
          <li><a href="https://example.com/time-tools/time-zone-converter/">Time Zone Converter</a></li>
          <li><a href="https://example.com/time-tools/time-interval-generator/">Time Interval Generator</a></li>
          <li><a href="https://example.com/time-tools/time-duration-converter/">Time Duration Converter</a></li>
        </ul>
      </div>
      <section class="card mt-3 p-3"><h2 class="h5">FAQ</h2><div class="accordion" id="faq"><div class="accordion-item"><h3 class="accordion-header"><button class="accordion-button collapsed" data-bs-toggle="collapse" data-bs-target="#tigfaq">Include end?</button></h3><div id="tigfaq" class="accordion-collapse collapse"><div class="accordion-body">Toggle to include the final boundary.</div></div></div></div></section>
    </aside>
    </section>
    

<script type="module">
const $ = s => document.querySelector(s);
const qs = new URLSearchParams(location.search);
const storage = { get:(k,d=null)=>{ try{return JSON.parse(localStorage.getItem(k))??d;}catch{return d;} }, set:(k,v)=>localStorage.setItem(k,JSON.stringify(v)) };

  form.querySelectorAll('input,select,textarea').forEach(inp=>{ const key='time-interval-generator.'+inp.id; const urlV=qs.get(inp.id); const stored=storage.get(key); if(urlV!==null) inp.value=urlV; else if(stored!==null) inp.value=stored; inp.addEventListener('change',()=>storage.set(key, inp.value)); });
  document.getElementById('shareBtn')?.addEventListener('click', ()=>{ const link = copyLinkFromForm(form); navigator.clipboard?.writeText(link); toast('Link copied'); });
  document.getElementById('resetBtn')?.addEventListener('click', ()=>{ form.reset(); document.getElementById('result').textContent='—'; document.getElementById('subResult').textContent=''; toast('Reset complete'); });
  form.addEventListener('submit', (e)=>{ e.preventDefault(); runTool(); });
  if([...qs.keys()].length) runTool();
  function runTool(){
    
let sStr=document.getElementById('start').value; let eStr=document.getElementById('end').value;
let s = sStr? DateTime.fromISO(sStr) : DateTime.now();
let e = eStr? DateTime.fromISO(eStr) : s.plus({hours:1});
if(e < s){ const tmp=s; s=e; e=tmp; }
const step = Math.max(1, +(document.getElementById('stepMin').value||30));
const includeEnd = document.getElementById('includeEnd').value==='1';
const rows = document.getElementById('rows'); rows.innerHTML='';
let i=0; let t = s; while(includeEnd ? t <= e : t < e){ const end = t.plus({minutes:step}); const row=document.createElement('tr'); row.innerHTML = `<td>${++i}</td><td>${t.toISO()}</td><td>${(end<e?end:e).toISO()}</td>`; rows.appendChild(row); t = end; }
document.getElementById('result').textContent = `${i} interval(s) generated`;
document.getElementById('subResult').textContent = `${s.toISO()} → ${e.toISO()} • step ${step}m`;
document.getElementById('csvBtn').onclick=()=>{ const lines=['index,start,end']; let j=0; let t2=s; while(includeEnd ? t2<=e : t2<e){ const end=t2.plus({minutes:step}); lines.push(`${++j},${t2.toISO()},${(end<e?end:e).toISO()}`); t2=end; } const blob=new Blob([lines.join('\n')],{type:'text/csv'}); const a=document.createElement('a'); a.href=URL.createObjectURL(blob); a.download='intervals.csv'; a.click(); };

  }
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


