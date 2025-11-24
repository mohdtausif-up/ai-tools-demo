<?php
$page_title = 'Pomodoro Timer – Free Online | Time Tools';
$page_description = 'Productivity timer with work/break intervals.';
$breadcrumbs = [
    ['title' => 'Home', 'url' => 'index.php'],
    ['title' => 'Pomodoro Timer', 'url' => '']
];
$page_css = 'pomodoro-timer.css';
$page_js = 'pomodoro-timer.js';
include 'header.php';
?>
<header class="border-bottom border-secondary"><nav class="container navbar navbar-expand-lg"><a class="navbar-brand" href="../">⏱️ Time Tools</a></nav></header>
<main class="container my-4">
  
    <div class="d-flex justify-content-end mb-3" style="gap:1rem;">
        <button id="share-btn" class="btn btn-outline-secondary" title="Share this tool"><span>ðŸ”—</span> Share</button>
        <button id="fav-btn" class="btn btn-outline-warning" title="Add to Favourites"><span>â­</span> Add to Favourites</button>
    </div>
  <div class="row g-4 justify-content-center">
    <div class="col-lg-6">
      <div class="card p-4 text-center">
        <div id="timer" class="mb-4">25:00</div>
        <div id="status" class="mb-3 text-muted">Ready to start</div>
        <div class="btn-group mb-4">
          <button class="btn btn-primary" onclick="start()"><i class="bi bi-play"></i> Start</button>
          <button class="btn btn-secondary" onclick="pause()"><i class="bi bi-pause"></i> Pause</button>
          <button class="btn btn-outline-light" onclick="reset()"><i class="bi bi-arrow-counterclockwise"></i> Reset</button>
        </div>
        <div class="row g-2">
          <div class="col-4"><label class="form-label small">Work (min)</label><input id="workMin" type="number" class="form-control" value="25" min="1"></div>
          <div class="col-4"><label class="form-label small">Break (min)</label><input id="breakMin" type="number" class="form-control" value="5" min="1"></div>
          <div class="col-4"><label class="form-label small">Long Break</label><input id="longBreak" type="number" class="form-control" value="15" min="1"></div>
        </div>
        <div class="mt-3"><small class="text-muted">Completed: <strong id="count">0</strong> sessions</small></div>
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


<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
<?php include 'footer.php'; ?>


