<?php
$page_title = 'Anniversary Tracker – Free Online | Time Tools';
$page_description = '';
$breadcrumbs = [
    ['title' => 'Home', 'url' => 'index.php'],
    ['title' => 'Anniversary Tracker', 'url' => '']
];
$page_css = 'anniversary-tracker.css';
$page_js = 'anniversary-tracker.js';
include 'header.php';
?>
<header class="border-bottom border-secondary"><nav class="container navbar navbar-expand-lg"><a class="navbar-brand" href="./">⏱️ Time Tools</a></nav></header>
<main class="container my-4">
  
    <div class="d-flex justify-content-end mb-3" style="gap:1rem;">
        <button id="share-btn" class="btn btn-outline-secondary" title="Share this tool"><span>ðŸ”—</span> Share</button>
        <button id="fav-btn" class="btn btn-outline-warning" title="Add to Favourites"><span>â­</span> Add to Favourites</button>
    </div>
  <div class="row g-4">
    <div class="col-lg-6">
      <div class="card p-4">
        <h2 class="h5">Add Anniversary</h2>
        <form id="form" onsubmit="add(event)">
          <div class="row g-2">
            <div class="col-12"><input id="title" class="form-control" placeholder="Wedding, First Date, etc." required></div>
            <div class="col-12"><input id="date" type="date" class="form-control" required></div>
            <div class="col-12"><button type="submit" class="btn btn-primary w-100"><i class="bi bi-plus"></i> Add</button></div>
          </div>
        </form>
      </div>
    </div>
    <div class="col-lg-6">
      <div class="card p-4">
        <h3 class="h5">Your Anniversaries</h3>
        <div id="list"></div>
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
const { DateTime } = luxon;
const storage = JSON.parse(localStorage.getItem('anniversaries')||'[]');
function save(){ localStorage.setItem('anniversaries', JSON.stringify(storage)); }
function add(e){
  e.preventDefault();
  storage.push({id:Date.now(), title:document.getElementById('title').value, date:document.getElementById('date').value});
  save(); e.target.reset(); render();
}
function remove(id){ const idx = storage.findIndex(a=>a.id===id); if(idx>-1) storage.splice(idx,1); save(); render(); }
window.remove = remove;
function render(){
  const now = DateTime.now();
  document.getElementById('list').innerHTML = storage.map(a=>{
    const date = DateTime.fromISO(a.date);
    const years = now.diff(date, 'years').years;
    const nextYear = date.plus({years: Math.ceil(years)});
    const daysUntil = Math.ceil(nextYear.diff(now, 'days').days);
    return `<div class="anni-item p-3 mb-2 rounded">
      <div class="d-flex justify-content-between align-items-start">
        <div>
          <strong>${a.title}</strong><br>
          <small class="text-muted">${date.toLocaleString(DateTime.DATE_FULL)}</small><br>
          <small>${Math.floor(years)} years together</small><br>
          <small class="text-warning">Next: ${daysUntil} days (${nextYear.toLocaleString(DateTime.DATE_MED)})</small>
        </div>
        <button class="btn btn-sm btn-outline-danger" onclick="remove(${a.id})"><i class="bi bi-trash"></i></button>
      </div>
    </div>`;
  }).join('') || '<p class="text-muted">No anniversaries yet</p>';
}
render();
</script>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
<?php include 'footer.php'; ?>


