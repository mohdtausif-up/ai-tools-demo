<?php
$page_title = 'Work Hours Calculator – Free Online | Time Tools';
$page_description = '';
$breadcrumbs = [
    ['title' => 'Home', 'url' => 'index.php'],
    ['title' => 'Work Hours Calculator', 'url' => '']
];
$page_css = 'work-hours-calculator.css';
$page_js = 'work-hours-calculator.js';
include 'header.php';
?>
<header class="border-bottom border-secondary"><nav class="container navbar navbar-expand-lg"><a class="navbar-brand" href="../">⏱️ Time Tools</a></nav></header>
<main class="container my-4">
  
    <div class="d-flex justify-content-end mb-3" style="gap:1rem;">
        <button id="share-btn" class="btn btn-outline-secondary" title="Share this tool"><span>ðŸ”—</span> Share</button>
        <button id="fav-btn" class="btn btn-outline-warning" title="Add to Favourites"><span>â­</span> Add to Favourites</button>
    </div>
  <div class="row g-4">
    <div class="col-lg-6">
      <div class="card p-4">
        <h2 class="h5">Add Shift</h2>
        <form id="form" onsubmit="add(event)">
          <div class="row g-2">
            <div class="col-md-4"><label class="form-label small">Date</label><input id="date" type="date" class="form-control" required></div>
            <div class="col-md-4"><label class="form-label small">Start</label><input id="start" type="time" class="form-control" required></div>
            <div class="col-md-4"><label class="form-label small">End</label><input id="end" type="time" class="form-control" required></div>
            <div class="col-md-6"><label class="form-label small">Break (min)</label><input id="break" type="number" class="form-control" value="30" min="0"></div>
            <div class="col-md-6"><label class="form-label small">Rate ($/hr)</label><input id="rate" type="number" step="0.01" class="form-control" value="15"></div>
            <div class="col-12"><button type="submit" class="btn btn-primary w-100"><i class="bi bi-plus"></i> Add Shift</button></div>
          </div>
        </form>
      </div>
    </div>
    <div class="col-lg-6">
      <div class="card p-4">
        <div class="d-flex justify-content-between mb-3">
          <h3 class="h5">Shifts</h3>
          <button class="btn btn-sm btn-outline-danger" onclick="if(confirm('Clear all?')){localStorage.removeItem('workShifts');location.reload();}">Clear</button>
        </div>
        <div id="shifts"></div>
        <div class="mt-3 p-3 border-top">
          <strong>Total: <span id="total">0</span> hours</strong><br>
          <strong>Earnings: $<span id="earnings">0</span></strong>
        </div>
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


