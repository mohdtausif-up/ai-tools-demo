<?php
$page_title = 'Time Rounding Tool | Time Tools';
$page_description = 'Round a time to nearest/up/down by custom minutes.';
$breadcrumbs = [
    ['title' => 'Home', 'url' => 'index.php'],
    ['title' => 'Time Rounding Tool', 'url' => '']
];
$page_css = 'time-rounding-tool.css';
$page_js = 'time-rounding-tool.js';
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
    <p class="lead text-muted">Round time to nearest interval</p>
  </div>
  <div class="row justify-content-center">
    <div class="col-lg-6">
      <div class="card p-4 mb-3">
        <div class="mb-3"><label class="form-label">Time</label><input type="time" class="form-control" id="time" value="09:17"></div>
        <div class="mb-3"><label class="form-label">Round To</label><select class="form-select" id="interval"><option value="5">5 minutes</option><option value="10">10 minutes</option><option value="15" selected>15 minutes</option><option value="30">30 minutes</option><option value="60">1 hour</option></select></div>
        <button class="btn btn-primary w-100" onclick="round()">Round</button>
      </div>
      <div class="card p-4"><div class="text-center"><div class="text-muted mb-2">Rounded Time</div><div class="result" id="result">09:15</div></div></div>
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

<footer class="border-bottom border-secondary py-4 mt-5"><div class="container small text-center text-muted"><p class="mb-0">© 2025 Time Tools</p></div></footer>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
<script type="module">
const { DateTime } = luxon;
window.round = function() {
  const t = document.getElementById('time').value;
  const interval = Number(document.getElementById('interval').value);
  const [h, m] = t.split(':').map(Number);
  const totalMin = h * 60 + m;
  const rounded = Math.round(totalMin / interval) * interval;
  const rh = Math.floor(rounded / 60) % 24;
  const rm = rounded % 60;
  document.getElementById('result').textContent = `${String(rh).padStart(2,'0')}:${String(rm).padStart(2,'0')}`;
};
round();
</script>

  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Time Rounding Tool (nearest/up/down) – Free Online | Time Tools</title>
  <meta name="description" content="Round a time to nearest/up/down by custom minutes." />
  <link rel="canonical" href="https://example.com/time-tools/time-rounding-tool/" />
  <meta property="og:type" content="website" />
  <meta property="og:title" content="Time Rounding Tool (nearest/up/down) – Free Online" />
  <meta property="og:description" content="Round a time to nearest/up/down by custom minutes." />
  <meta property="og:url" content="https://example.com/time-tools/time-rounding-tool/" />
  <meta property="og:image" content="https://example.com/assets/og-default.png" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="Time Rounding Tool (nearest/up/down) – Free Online" />
  <meta name="twitter:description" content="Round a time to nearest/up/down by custom minutes." />
  <meta name="twitter:image" content="https://example.com/assets/og-default.png" />
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" />
  <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.css" rel="stylesheet" />
  <script src="https://cdn.jsdelivr.net/npm/luxon@3/build/global/luxon.min.js"></script>
  
  <script type="application/ld+json">{ "@context": "https://schema.org", "@type": "BreadcrumbList", "itemListElement": [ { "@type": "ListItem", "position": 1, "name": "Time & Date Tools", "item": "https://example.com/time-tools/" }, { "@type": "ListItem", "position": 2, "name": "Time Rounding Tool (nearest/up/down)", "item": "https://example.com/time-tools/time-rounding-tool/" } ] }</script>
  <script type="application/ld+json">{ "@context": "https://schema.org", "@type": ["WebApplication","SoftwareApplication"], "name": "Time Rounding Tool (nearest/up/down)", "applicationCategory": "UtilitiesApplication", "operatingSystem": "Web", "url": "https://example.com/time-tools/time-rounding-tool/", "description": "Round a time to nearest/up/down by custom minutes.", "offers": {"@type": "Offer", "price": "0", "priceCurrency": "USD"} }</script>
</head>

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
      <p class="lead text-muted">Round a date/time to the nearest, up, or down increment.</p>
      <div class="ad-slot top d-flex align-items-center justify-content-center mt-3" aria-label="ad"><span class="text-muted">Ad slot (reserved)</span></div>
    </section>
    
    <section class="row g-4 align-items-start">
    <div class="col-lg-7">
      <div class="card p-3">
        <h2 class="h4">Use the Time Rounding Tool (nearest/up/down)</h2>
        <form id="toolForm" novalidate>
          
<div class="row g-3">
  <div class="col-sm-6"><label for="t" class="form-label">Date & time</label><input id="t" type="datetime-local" class="form-control"></div>
  <div class="col-sm-3"><label for="step" class="form-label">Step (minutes)</label><input id="step" type="number" class="form-control" value="5"></div>
  <div class="col-sm-3"><label for="mode" class="form-label">Mode</label><select id="mode" class="form-select"><option value="nearest">Nearest</option><option value="up">Round up</option><option value="down">Round down</option></select></div>
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
      <div class="card mt-3 p-3"><h3 class="h5">How it works</h3><p>Rounds using integer minute buckets then formats the final timestamp.</p><p class="small text-muted mb-0">No data leaves your browser. Everything runs locally.</p></div>
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
      <section class="card mt-3 p-3"><h2 class="h5">FAQ</h2><div class="accordion" id="faq"><div class="accordion-item"><h3 class="accordion-header"><button class="accordion-button collapsed" data-bs-toggle="collapse" data-bs-target="#trfaq">Custom steps?</button></h3><div id="trfaq" class="accordion-collapse collapse"><div class="accordion-body">Enter any integer minutes.</div></div></div></div></section>
    </aside>
    </section>
    

<script type="module">
const $ = s => document.querySelector(s);
const qs = new URLSearchParams(location.search);
const storage = { get:(k,d=null)=>{ try{return JSON.parse(localStorage.getItem(k))??d;}catch{return d;} }, set:(k,v)=>localStorage.setItem(k,JSON.stringify(v)) };

  form.querySelectorAll('input,select,textarea').forEach(inp=>{ const key='time-rounding-tool.'+inp.id; const urlV=qs.get(inp.id); const stored=storage.get(key); if(urlV!==null) inp.value=urlV; else if(stored!==null) inp.value=stored; inp.addEventListener('change',()=>storage.set(key, inp.value)); });
  document.getElementById('shareBtn')?.addEventListener('click', ()=>{ const link = copyLinkFromForm(form); navigator.clipboard?.writeText(link); toast('Link copied'); });
  document.getElementById('resetBtn')?.addEventListener('click', ()=>{ form.reset(); document.getElementById('result').textContent='—'; document.getElementById('subResult').textContent=''; toast('Reset complete'); });
  form.addEventListener('submit', (e)=>{ e.preventDefault(); runTool(); });
  if([...qs.keys()].length) runTool();
  function runTool(){
    
const tStr=document.getElementById('t').value; const step=Math.max(1, +(document.getElementById('step').value||5)); const mode=document.getElementById('mode').value;
let d = tStr? DateTime.fromISO(tStr) : DateTime.now();
const minutes = Math.floor(d.toSeconds()/60);
let rounded;
if(mode==='nearest') rounded = Math.round(minutes/step)*step;
else if(mode==='up') rounded = Math.ceil(minutes/step)*step;
else rounded = Math.floor(minutes/step)*step;
const out = DateTime.fromSeconds(rounded*60);
document.getElementById('result').textContent = out.toLocaleString(DateTime.DATETIME_MED_WITH_SECONDS);
document.getElementById('subResult').textContent = `Step ${step} min • Mode ${mode}`;

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


