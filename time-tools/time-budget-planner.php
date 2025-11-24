<?php
$page_title = 'Time Budget Planner – Free Online | Time Tools';
$page_description = 'Allocate hours to tasks and track your time budget.';
$breadcrumbs = [
    ['title' => 'Home', 'url' => 'index.php'],
    ['title' => 'Time Budget Planner', 'url' => '']
];
$page_css = 'time-budget-planner.css';
$page_js = 'time-budget-planner.js';
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
        <h2 class="h5">Add Task</h2>
        <form id="form" onsubmit="add(event)">
          <div class="row g-2">
            <div class="col-8"><input id="task" class="form-control" placeholder="Task name" required></div>
            <div class="col-4"><input id="hours" type="number" step="0.5" min="0.5" class="form-control" placeholder="Hours" required></div>
            <div class="col-12"><button type="submit" class="btn btn-primary w-100"><i class="bi bi-plus"></i> Add</button></div>
          </div>
        </form>
      </div>
      <div class="card mt-3 p-4">
        <h3 class="h5">Available Hours per Week</h3>
        <input id="totalHours" type="number" class="form-control" value="40" min="1" max="168" onchange="render()">
      </div>
    </div>
    <div class="col-lg-6">
      <div class="card p-4">
        <div class="d-flex justify-content-between mb-3">
          <h3 class="h5">Tasks</h3>
          <div><strong id="used">0</strong> / <strong id="total">40</strong> hours</div>
        </div>
        <div id="tasks"></div>
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


