<?php
$page_title = 'Meeting Time Planner – Free Online | Time Tools';
$page_description = 'Find the best meeting time across multiple time zones.';
$breadcrumbs = [
    ['title' => 'Home', 'url' => 'index.php'],
    ['title' => 'Meeting Time Planner', 'url' => '']
];
$page_css = 'meeting-time-planner.css';
$page_js = 'meeting-time-planner.js';
include 'header.php';
?>
<header class="border-bottom border-secondary">
  <nav class="container navbar navbar-expand-lg">
    <a class="navbar-brand" href="../">⏱️ Time Tools</a>
  </nav>
</header>
<main class="container my-4">
  
    <div class="d-flex justify-content-end mb-3" style="gap:1rem;">
        <button id="share-btn" class="btn btn-outline-secondary" title="Share this tool"><span>ðŸ”—</span> Share</button>
        <button id="fav-btn" class="btn btn-outline-warning" title="Add to Favourites"><span>â­</span> Add to Favourites</button>
    </div>
  
  <div class="row g-4">
    <div class="col-lg-6">
      <div class="card p-3">
        <h2 class="h4">Add Participants</h2>
        <form id="addParticipant">
          <div class="row g-2">
            <div class="col-md-6"><input id="pName" class="form-control" placeholder="Name" required></div>
            <div class="col-md-4"><select id="pTZ" class="form-select"><option>UTC</option><option>America/New_York</option><option>America/Los_Angeles</option><option>Europe/London</option><option>Europe/Paris</option><option>Asia/Tokyo</option><option>Australia/Sydney</option></select></div>
            <div class="col-md-2"><button type="submit" class="btn btn-primary w-100"><i class="bi bi-plus"></i></button></div>
          </div>
        </form>
        <div id="participants" class="mt-3"></div>
      </div>
      
      <div class="card mt-3 p-3">
        <h3 class="h5">Select Meeting Time</h3>
        <label>Your Time:</label>
        <input id="meetingTime" type="datetime-local" class="form-control">
        <button class="btn btn-primary mt-2" onclick="calculateTimes()">Calculate</button>
      </div>
    </div>
    
    <div class="col-lg-6">
      <div class="card p-3">
        <h3 class="h5">Meeting Times by Zone</h3>
        <div id="result"></div>
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
const storage = { get:(k,d=[])=>JSON.parse(localStorage.getItem(k)||'null')??d, set:(k,v)=>localStorage.setItem(k,JSON.stringify(v)) };
let participants = storage.get('meetingParticipants', []);

document.getElementById('addParticipant').addEventListener('submit',(e)=>{
  e.preventDefault();
  participants.push({ name: document.getElementById('pName').value, tz: document.getElementById('pTZ').value });
  storage.set('meetingParticipants', participants);
  e.target.reset();
  renderParticipants();
});

function renderParticipants(){
  const div = document.getElementById('participants');
  div.innerHTML = participants.map((p,i)=>`<div class="d-flex justify-content-between align-items-center p-2 border-bottom"><span>${p.name} <small class="text-muted">(${p.tz})</small></span><button class="btn btn-sm btn-outline-danger" onclick="removeP(${i})"><i class="bi bi-x"></i></button></div>`).join('');
}

window.removeP = (i)=>{ participants.splice(i,1); storage.set('meetingParticipants', participants); renderParticipants(); };

window.calculateTimes = ()=>{
  const input = document.getElementById('meetingTime').value;
  if(!input){ document.getElementById('result').innerHTML='<p class="text-muted">Select a time</p>'; return; }
  
  const baseTime = DateTime.fromISO(input);
  const res = document.getElementById('result');
  
  if(!participants.length){ res.innerHTML='<p class="text-muted">Add participants first</p>'; return; }
  
  res.innerHTML = participants.map(p=>{
    const converted = baseTime.setZone(p.tz);
    const hour = converted.hour;
    const isGood = hour >= 9 && hour <= 17;
    return `<div class="time-slot p-3 mb-2 rounded ${isGood?'good':''}">
      <strong>${p.name}</strong><br>
      ${converted.toLocaleString(DateTime.DATETIME_MED)} (${p.tz})<br>
      <small class="${isGood?'text-success':'text-warning'}">${isGood?'✓ Business hours':'⚠ Outside business hours'}</small>
    </div>`;
  }).join('');
};

renderParticipants();
</script>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
<?php include 'footer.php'; ?>


