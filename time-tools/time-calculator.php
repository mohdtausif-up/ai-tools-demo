<?php
$page_title = 'Time Calculator | Time Tools';
$page_description = 'Add or subtract hours/minutes/seconds to a base date/time.';
$breadcrumbs = [
    ['title' => 'Home', 'url' => 'index.php'],
    ['title' => 'Time Calculator', 'url' => '']
];
$page_css = 'time-calculator.css';
$page_js = 'time-calculator.js';
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
    <p class="lead text-muted">Add or subtract time durations</p>
  </div>
  <div class="row justify-content-center">
    <div class="col-lg-8">
      <div class="card p-4 mb-3">
        <div class="row g-3">
          <div class="col-md-6"><label class="form-label">Start Time</label><input type="time" class="form-control" id="startTime" value="09:00"></div>
          <div class="col-md-6"><label class="form-label">Operation</label><select class="form-select" id="operation"><option value="add">Add</option><option value="subtract">Subtract</option></select></div>
          <div class="col-md-4"><label class="form-label">Hours</label><input type="number" class="form-control" id="hours" value="0" min="0"></div>
          <div class="col-md-4"><label class="form-label">Minutes</label><input type="number" class="form-control" id="minutes" value="30" min="0" max="59"></div>
          <div class="col-md-4"><label class="form-label">Seconds</label><input type="number" class="form-control" id="seconds" value="0" min="0" max="59"></div>
          <div class="col-12"><button class="btn btn-primary w-100" onclick="calculate()">Calculate</button></div>
        </div>
      </div>
      <div class="card p-4"><div class="text-center"><div class="text-muted mb-2">Result</div><div class="result" id="result">09:30:00</div></div></div>
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
const { DateTime, Duration } = luxon;
window.calculate = function() {
  const time = document.getElementById('startTime').value;
  const op = document.getElementById('operation').value;
  const h = Number(document.getElementById('hours').value) || 0;
  const m = Number(document.getElementById('minutes').value) || 0;
  const s = Number(document.getElementById('seconds').value) || 0;
  const dt = DateTime.fromFormat(time, 'HH:mm');
  const dur = Duration.fromObject({ hours: h, minutes: m, seconds: s });
  const result = op === 'add' ? dt.plus(dur) : dt.minus(dur);
  document.getElementById('result').textContent = result.toFormat('HH:mm:ss');
};
calculate();
</script>

  <meta name="description" content="Add or subtract hours/minutes/seconds to a base date/time." />
  <link rel="canonical" href="https://example.com/time-tools/time-calculator/" />
  <meta property="og:type" content="website" />
  <meta property="og:title" content="Time Calculator (Add/Subtract durations) – Free Online" />
  <meta property="og:description" content="Add or subtract hours/minutes/seconds to a base date/time." />
  <meta property="og:url" content="https://example.com/time-tools/time-calculator/" />
  <meta property="og:image" content="https://example.com/assets/og-default.png" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="Time Calculator (Add/Subtract durations) – Free Online" />
  <meta name="twitter:description" content="Add or subtract hours/minutes/seconds to a base date/time." />
  <meta name="twitter:image" content="https://example.com/assets/og-default.png" />
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" />
  <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.css" rel="stylesheet" />
  <script src="https://cdn.jsdelivr.net/npm/luxon@3/build/global/luxon.min.js"></script>
  
  <script type="application/ld+json">{ "@context": "https://schema.org", "@type": "BreadcrumbList", "itemListElement": [ { "@type": "ListItem", "position": 1, "name": "Time & Date Tools", "item": "https://example.com/time-tools/" }, { "@type": "ListItem", "position": 2, "name": "Time Calculator (Add/Subtract durations)", "item": "https://example.com/time-tools/time-calculator/" } ] }</script>
  <script type="application/ld+json">{ "@context": "https://schema.org", "@type": ["WebApplication","SoftwareApplication"], "name": "Time Calculator (Add/Subtract durations)", "applicationCategory": "UtilitiesApplication", "operatingSystem": "Web", "url": "https://example.com/time-tools/time-calculator/", "description": "Add or subtract hours/minutes/seconds to a base date/time.", "offers": {"@type": "Offer", "price": "0", "priceCurrency": "USD"} }</script>
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
      <p class="lead text-muted">Add or subtract durations to a base date/time.</p>
      <div class="ad-slot top d-flex align-items-center justify-content-center mt-3" aria-label="ad"><span class="text-muted">Ad slot (reserved)</span></div>
    </section>
    
    <section class="row g-4 align-items-start">
    <div class="col-lg-7">
      <div class="card p-3">
        <h2 class="h4">Use the Time Calculator (Add/Subtract durations)</h2>
        <form id="toolForm" novalidate>
          
<div class="row g-3">
  <div class="col-sm-6"><label for="base" class="form-label">Base date & time</label><input id="base" type="datetime-local" class="form-control"></div>
  <div class="col-sm-2"><label class="form-label">Hours</label><input id="dh" type="number" class="form-control" value="0"></div>
  <div class="col-sm-2"><label class="form-label">Minutes</label><input id="dm" type="number" class="form-control" value="0"></div>
  <div class="col-sm-2"><label class="form-label">Seconds</label><input id="ds" type="number" class="form-control" value="0"></div>
  <div class="col-sm-6"><label for="op" class="form-label">Operation</label><select id="op" class="form-select"><option value="add">Add</option><option value="sub">Subtract</option></select></div>
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
      <div class="card mt-3 p-3"><h3 class="h5">How it works</h3><p>We add a precise Luxon Duration to your base time.</p><p class="small text-muted mb-0">No data leaves your browser. Everything runs locally.</p></div>
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
      <section class="card mt-3 p-3"><h2 class="h5">FAQ</h2><div class="accordion" id="faq"><div class="accordion-item"><h3 class="accordion-header"><button class="accordion-button collapsed" data-bs-toggle="collapse" data-bs-target="#tcfaq">Negative values?</button></h3><div id="tcfaq" class="accordion-collapse collapse"><div class="accordion-body">Use the Subtract operation for clarity.</div></div></div></div></section>
    </aside>
    </section>
<?php include 'footer.php'; ?>


