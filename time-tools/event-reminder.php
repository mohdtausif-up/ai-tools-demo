<?php
$page_title = 'Event Reminder Tool – Free Online | Time Tools';
$page_description = 'Create and manage event reminders with notifications.';
$breadcrumbs = [
    ['title' => 'Home', 'url' => 'index.php'],
    ['title' => 'Event Reminder', 'url' => '']
];
$page_css = 'event-reminder.css';
$page_js = 'event-reminder.js';
include 'header.php';
?>
<header class="border-bottom border-secondary">
  <nav class="container navbar navbar-expand-lg">
    <a class="navbar-brand" href="../">⏱️ Time Tools</a>
  </nav>
</header>
<main class="container my-4">
  <section class="hero text-center">
    
    <div class="d-flex justify-content-end mb-3" style="gap:1rem;">
        <button id="share-btn" class="btn btn-outline-secondary" title="Share this tool"><span>ðŸ”—</span> Share</button>
        <button id="fav-btn" class="btn btn-outline-warning" title="Add to Favourites"><span>â­</span> Add to Favourites</button>
    </div>
    <p class="lead text-muted">Create and manage event reminders with notifications.</p>
  </section>
  
  <div class="row g-4">
    <div class="col-lg-8">
      <div class="card p-3">
        <h2 class="h4">Add Event Reminder</h2>
        <form id="eventForm">
          <div class="row g-3">
            <div class="col-md-6"><label class="form-label">Event Name</label><input id="eventName" class="form-control" required></div>
            <div class="col-md-6"><label class="form-label">Date & Time</label><input id="eventTime" type="datetime-local" class="form-control" required></div>
            <div class="col-md-6"><label class="form-label">Remind Before (minutes)</label><input id="remindBefore" type="number" class="form-control" value="15" min="0"></div>
            <div class="col-md-6"><label class="form-label">Priority</label><select id="priority" class="form-select"><option>Low</option><option selected>Medium</option><option>High</option></select></div>
            <div class="col-12"><button type="submit" class="btn btn-primary"><i class="bi bi-plus-circle"></i> Add Event</button></div>
          </div>
        </form>
      </div>
      
      <div class="card mt-3 p-3">
        <h3 class="h5">Your Events</h3>
        <div id="eventsList"></div>
      </div>
    </div>
    
    <aside class="col-lg-4">
      <div class="card p-3">
        <h2 class="h5">Features</h2>
        <ul class="small mb-0">
          <li>Browser notifications</li>
          <li>Local storage persistence</li>
          <li>Priority levels</li>
          <li>Countdown display</li>
        </ul>
      </div>
    </aside>
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
const storage = { get:(k,d=[])=>{ try{return JSON.parse(localStorage.getItem(k))??d;}catch{return d;} }, set:(k,v)=>localStorage.setItem(k,JSON.stringify(v)) };

let events = storage.get('eventReminders', []);

document.getElementById('eventForm').addEventListener('submit', (e)=>{
  e.preventDefault();
  const event = {
    id: Date.now(),
    name: document.getElementById('eventName').value,
    time: document.getElementById('eventTime').value,
    remindBefore: +document.getElementById('remindBefore').value,
    priority: document.getElementById('priority').value
  };
  events.push(event);
  storage.set('eventReminders', events);
  e.target.reset();
  render();
  requestNotificationPermission();
});

function render(){
  const list = document.getElementById('eventsList');
  if(!events.length){ list.innerHTML='<p class="text-muted">No events yet.</p>'; return; }
  
  events.sort((a,b)=> new Date(a.time) - new Date(b.time));
  list.innerHTML = events.map(ev=>{
    const dt = DateTime.fromISO(ev.time);
    const now = DateTime.now();
    const diff = dt.diff(now, ['days','hours','minutes']).toObject();
    const isPast = dt < now;
    const color = ev.priority==='High'?'danger':ev.priority==='Low'?'info':'warning';
    
    return `<div class="event-item p-3 mb-2 rounded">
      <div class="d-flex justify-content-between align-items-start">
        <div>
          <h4 class="h6 mb-1"><span class="badge bg-${color}">${ev.priority}</span> ${ev.name}</h4>
          <small class="text-muted">${dt.toLocaleString(DateTime.DATETIME_MED)}</small>
          ${!isPast ? `<div class="mt-1 text-${color}">In ${Math.floor(diff.days||0)}d ${Math.floor(diff.hours||0)}h ${Math.floor(diff.minutes||0)}m</div>` : '<div class="mt-1 text-muted">Past event</div>'}
        </div>
        <button class="btn btn-sm btn-outline-danger" onclick="deleteEvent(${ev.id})"><i class="bi bi-trash"></i></button>
      </div>
    </div>`;
  }).join('');
}

window.deleteEvent = (id)=>{
  events = events.filter(e=>e.id!==id);
  storage.set('eventReminders', events);
  render();
};

function requestNotificationPermission(){
  if('Notification' in window && Notification.permission === 'default'){
    Notification.requestPermission();
  }
}

function checkReminders(){
  const now = DateTime.now();
  events.forEach(ev=>{
    const dt = DateTime.fromISO(ev.time);
    const remindAt = dt.minus({minutes: ev.remindBefore});
    if(now >= remindAt && now < dt && 'Notification' in window && Notification.permission === 'granted'){
      new Notification('Event Reminder', { body: `${ev.name} in ${ev.remindBefore} minutes!`, icon: 'https://cdn-icons-png.flaticon.com/512/2972/2972531.png' });
    }
  });
}

render();
setInterval(()=>{ render(); checkReminders(); }, 30000);
</script>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
<?php include 'footer.php'; ?>


