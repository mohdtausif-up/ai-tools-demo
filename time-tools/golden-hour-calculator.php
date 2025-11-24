<?php
$page_title = 'Golden Hour Calculator – Free Online | Time Tools';
$page_description = '';
$breadcrumbs = [
    ['title' => 'Home', 'url' => 'index.php'],
    ['title' => 'Golden Hour Calculator', 'url' => '']
];
$page_css = 'golden-hour-calculator.css';
$page_js = 'golden-hour-calculator.js';
include 'header.php';
?>
<header class="border-bottom border-secondary"><nav class="container navbar navbar-expand-lg"><a class="navbar-brand" href="./">⏱️ Time Tools</a></nav></header>
<main class="container my-4">
  
    <div class="d-flex justify-content-end mb-3" style="gap:1rem;">
        <button id="share-btn" class="btn btn-outline-secondary" title="Share this tool"><span>ðŸ”—</span> Share</button>
        <button id="fav-btn" class="btn btn-outline-warning" title="Add to Favourites"><span>â­</span> Add to Favourites</button>
    </div>
  <div class="row justify-content-center">
    <div class="col-lg-8">
      <div class="card p-4">
        <div class="row g-3">
          <div class="col-md-4"><label>Latitude</label><input id="lat" type="number" step="0.001" class="form-control" value="40.7128" onchange="calc()"></div>
          <div class="col-md-4"><label>Longitude</label><input id="lng" type="number" step="0.001" class="form-control" value="-74.0060" onchange="calc()"></div>
          <div class="col-md-4"><label>Date</label><input id="date" type="date" class="form-control" onchange="calc()"></div>
          <div class="col-12"><button class="btn btn-sm btn-outline-light" onclick="getLocation()">📍 Use My Location</button></div>
        </div>
        <div id="result" class="mt-4"></div>
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


