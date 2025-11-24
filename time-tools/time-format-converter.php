<?php
$page_title = 'Time Format Converter (12-hour ↔ 24-hour) | Time Tools';
$page_description = '';
$breadcrumbs = [
    ['title' => 'Home', 'url' => 'index.php'],
    ['title' => 'Time Format Converter', 'url' => '']
];
$page_css = 'time-format-converter.css';
$page_js = 'time-format-converter.js';
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
    <p class="lead text-muted">Convert between 12-hour and 24-hour formats</p>
  </div>
  <div class="row justify-content-center">
    <div class="col-lg-6">
      <div class="card p-4">
        <div class="mb-3"><label class="form-label">Enter Time</label><input type="time" class="form-control" id="timeInput"></div>
        <div class="result text-center mb-3" id="result12">12:00 PM</div>
        <div class="result text-center" id="result24">12:00</div>
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

<footer class="border-top border-secondary py-4 mt-5"><div class="container small text-center text-muted"><p class="mb-0">© 2025 Time Tools</p></div></footer>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>


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
      <p class="lead text-muted">Convert a time string between 12-hour and 24-hour formats.</p>
      <div class="ad-slot top d-flex align-items-center justify-content-center mt-3" aria-label="ad"><span class="text-muted">Ad slot (reserved)</span></div>
    </section>
    
    <section class="row g-4 align-items-start">
    <div class="col-lg-7">
      <div class="card p-3">
        <h2 class="h4">Use the Time Format Converter (12-hour ↔ 24-hour)</h2>
        <form id="toolForm" novalidate>
          
<div class="row g-3">
  <div class="col-sm-6"><label for="time12" class="form-label">12-hour (e.g., 2:45 PM)</label><input id="time12" class="form-control" placeholder="2:45 PM"></div>
  <div class="col-sm-6"><label for="time24" class="form-label">24-hour (e.g., 14:45)</label><input id="time24" class="form-control" placeholder="14:45"></div>
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
      <div class="card mt-3 p-3"><h3 class="h5">How it works</h3><p>Simple regex parsing converts between popular time notations.</p><p class="small text-muted mb-0">No data leaves your browser. Everything runs locally.</p></div>
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
      <section class="card mt-3 p-3"><h2 class="h5">FAQ</h2><div class="accordion" id="faq"><div class="accordion-item"><h3 class="accordion-header"><button class="accordion-button collapsed" data-bs-toggle="collapse" data-bs-target="#tffaq">Does it support seconds?</button></h3><div id="tffaq" class="accordion-collapse collapse"><div class="accordion-body">Yes, optional seconds are parsed and rendered.</div></div></div></div></section>
    </aside>
    </section>
    

<script type="module">
const $ = s => document.querySelector(s);
const qs = new URLSearchParams(location.search);
const storage = { get:(k,d=null)=>{ try{return JSON.parse(localStorage.getItem(k))??d;}catch{return d;} }, set:(k,v)=>localStorage.setItem(k,JSON.stringify(v)) };
const pad = n => String(n).padStart(2,'0');
const { DateTime, Duration, Interval } = luxon;
const ZONES = [
  "UTC","Europe/London","Europe/Berlin","Europe/Paris","Africa/Cairo",
  "Asia/Kolkata","Asia/Dubai","Asia/Singapore","Asia/Tokyo","Asia/Shanghai",
  "America/New_York","America/Chicago","America/Denver","America/Los_Angeles",
  "Australia/Sydney","Pacific/Auckland"
];
function populateTZ(id, defTZ="UTC"){ const sel = document.getElementById(id); if(!sel) return; if(!sel.options.length){ ZONES.forEach(z=>{ const o=document.createElement('option'); o.value=z; o.textContent=z; sel.appendChild(o);}); } const saved=storage.get('tz',defTZ); sel.value = qs.get(id) || saved || defTZ; sel.addEventListener('change', ()=> storage.set('tz', sel.value)); }
function copyLinkFromForm(form){ const params = new URLSearchParams(); form.querySelectorAll('input,select,textarea').forEach(i=> params.set(i.id, i.value)); return location.origin + location.pathname + '?' + params.toString(); }
function toast(msg){ const el=document.createElement('div'); el.className='toast align-items-center text-bg-dark border-0 position-fixed bottom-0 end-0 m-3'; el.innerHTML=`<div class=\"d-flex\"><div class=\"toast-body\">${msg}</div><button class=\"btn-close btn-close-white me-2 m-auto\" data-bs-dismiss=\"toast\"></button></div>`; document.body.appendChild(el); const t=new bootstrap.Toast(el,{delay:2000}); t.show(); el.addEventListener('hidden.bs.toast',()=>el.remove()); }
</script>

<script type="module">
  // restore from URL/localStorage
  const form = document.getElementById('toolForm');
  form.querySelectorAll('input,select,textarea').forEach(inp=>{ const key='time-format-converter.'+inp.id; const urlV=qs.get(inp.id); const stored=storage.get(key); if(urlV!==null) inp.value=urlV; else if(stored!==null) inp.value=stored; inp.addEventListener('change',()=>storage.set(key, inp.value)); });
  document.getElementById('shareBtn')?.addEventListener('click', ()=>{ const link = copyLinkFromForm(form); navigator.clipboard?.writeText(link); toast('Link copied'); });
  document.getElementById('resetBtn')?.addEventListener('click', ()=>{ form.reset(); document.getElementById('result').textContent='—'; document.getElementById('subResult').textContent=''; toast('Reset complete'); });
  form.addEventListener('submit', (e)=>{ e.preventDefault(); runTool(); });
  if([...qs.keys()].length) runTool();
  function runTool(){
    
const t12 = document.getElementById('time12').value.trim();
const t24 = document.getElementById('time24').value.trim();
function to24(s){ const m=s.match(/^(\d{1,2})(?::(\d{2}))?(?::(\d{2}))?\s*([ap]m)$/i); if(!m) return null; let h=+m[1], mi=+(m[2]||0), se=+(m[3]||0), ampm=m[4].toLowerCase(); if(ampm==='pm'&&h<12) h+=12; if(ampm==='am'&&h===12) h=0; return `${pad(h)}:${pad(mi)}:${pad(se)}`; }
function to12(s){ const m=s.match(/^(\d{1,2})(?::(\d{2}))?(?::(\d{2}))?$/); if(!m) return null; let h=+m[1], mi=+(m[2]||0), se=+(m[3]||0); const ampm=h>=12?'PM':'AM'; h=h%12||12; return `${h}:${pad(mi)}:${pad(se)} ${ampm}`; }
let res='', sub='';
if(t12){ const out=to24(t12); res= out||'Invalid 12-hour time'; sub='12→24'; }
else if(t24){ const out=to12(t24); res= out||'Invalid 24-hour time'; sub='24→12'; }
else { res='Enter a time in either field.'; }
document.getElementById('result').textContent=res; document.getElementById('subResult').textContent=sub;

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


