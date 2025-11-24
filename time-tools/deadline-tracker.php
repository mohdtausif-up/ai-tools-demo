<?php
$page_title = 'Deadline Tracker – Free Online | Time Tools';
$page_description = 'Track deadlines, projects, and tasks with reminders and priorities. Free online deadline tracker tool.';
$breadcrumbs = [
    ['title' => 'Home', 'url' => 'index.php'],
    ['title' => 'Deadline Tracker', 'url' => '']
];
$page_css = 'deadline-tracker.css';
$page_js = 'deadline-tracker.js';
include 'header.php';
?>
<!-- SEO Meta Tags -->
<meta property="og:title" content="Deadline Tracker – Free Online | Time Tools">
<meta property="og:description" content="Track deadlines, projects, and tasks with reminders and priorities. Free online deadline tracker tool.">
<meta property="og:type" content="website">
<meta property="og:url" content="https://yourdomain.com/deadline-tracker.php">
<meta property="og:image" content="https://yourdomain.com/assets/img/deadline-tracker-og.png">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="Deadline Tracker – Free Online | Time Tools">
<meta name="twitter:description" content="Track deadlines, projects, and tasks with reminders and priorities. Free online deadline tracker tool.">
<meta name="twitter:image" content="https://yourdomain.com/assets/img/deadline-tracker-og.png">
<!-- JSON-LD Schema for Tool -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Deadline Tracker",
  "url": "https://yourdomain.com/deadline-tracker.php",
  "description": "Track deadlines, projects, and tasks with reminders and priorities. Free online deadline tracker tool.",
  "applicationCategory": "Productivity",
  "operatingSystem": "All",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  }
}
</script>
<header class="border-bottom border-secondary"><nav class="container navbar navbar-expand-lg"><a class="navbar-brand" href="../">⏱️ Time Tools</a></nav></header>
<main class="container my-4">
  
  <!-- Only one set of share/favourite buttons, with correct Unicode -->
  <div class="d-flex justify-content-end mb-3" style="gap:1rem;">
    <button id="share-btn" class="btn btn-outline-secondary" title="Share this tool"><span>🔗</span> Share</button>
    <button id="fav-btn" class="btn btn-outline-warning" title="Add to Favourites"><span>⭐</span> Add to Favourites</button>
  </div>
  <div class="d-flex justify-content-end mb-3" style="gap:1rem;">
    <button id="share-btn" class="btn btn-outline-secondary" title="Share this tool"><span>🔗</span> Share</button>
    <button id="fav-btn" class="btn btn-outline-warning" title="Add to Favourites"><span>⭐</span> Add to Favourites</button>
  </div>
  <div class="row g-4">
    <div class="col-lg-6">
      <div class="card p-4">
        <h2 class="h5">Add Deadline</h2>
        <form id="form" onsubmit="add(event)">
          <div class="row g-2">
            <div class="col-12"><input id="task" class="form-control" placeholder="Task/Project name" required></div>
            <div class="col-md-6"><input id="deadline" type="datetime-local" class="form-control" required></div>
            <div class="col-md-6">
              <select id="priority" class="form-select">
                <option value="low">Low Priority</option>
                <option value="medium" selected>Medium Priority</option>
                <option value="high">High Priority</option>
              </select>
            </div>
            <div class="col-12"><button type="submit" class="btn btn-primary w-100"><i class="bi bi-plus"></i> Add</button></div>
          </div>
        </form>
      </div>
    </div>
    <div class="col-lg-6">
      <div class="card p-4">
        <h3 class="h5">Deadlines</h3>
        <div id="deadlines"></div>
      </div>
    </div>
  </div>
  <!-- ...existing code... -->
  <!-- ...existing code... -->


<script type="module">
const { DateTime } = luxon;
const storage = JSON.parse(localStorage.getItem('deadlines')||'[]');
function save(){ localStorage.setItem('deadlines', JSON.stringify(storage)); }
function add(e){
  e.preventDefault();
  storage.push({
    id: Date.now(),
    task: document.getElementById('task').value,
    deadline: document.getElementById('deadline').value,
    priority: document.getElementById('priority').value,
    done: false
  });
  save();
  e.target.reset();
  render();
}
function toggle(id){ const item = storage.find(d=>d.id===id); if(item) item.done = !item.done; save(); render(); }
function remove(id){ const idx = storage.findIndex(d=>d.id===id); if(idx>-1) storage.splice(idx,1); save(); render(); }
window.toggle = toggle;
window.remove = remove;
function render(){
  storage.sort((a,b)=>new Date(a.deadline)-new Date(b.deadline));
  const now = DateTime.now();
  document.getElementById('deadlines').innerHTML = storage.map(d=>{
    const deadline = DateTime.fromISO(d.deadline);
    const diff = deadline.diff(now, ['days','hours']).toObject();
    const days = Math.floor(diff.days || 0);
    const hours = Math.floor(diff.hours || 0);
    const isUrgent = days < 2 && !d.done;
    return `<div class="deadline-item p-3 mb-2 rounded ${isUrgent?'urgent':''} ${d.done?'done':''}">
      <div class="d-flex justify-content-between align-items-start">
        <div class="flex-grow-1">
          <div class="form-check">
            <input class="form-check-input" type="checkbox" ${d.done?'checked':''} onchange="toggle(${d.id})">
            <label class="form-check-label">
              <strong>${d.task}</strong> <span class="badge bg-${d.priority==='high'?'danger':d.priority==='low'?'secondary':'warning'}">${d.priority}</span>
            </label>
          </div>
          <small class="text-muted d-block mt-1">${deadline.toLocaleString(DateTime.DATETIME_MED)}</small>
          ${!d.done ? `<small class="${isUrgent?'text-danger':'text-warning'}">${days}d ${hours}h remaining</small>` : '<small class="text-success">✓ Completed</small>'}
        </div>
        <button class="btn btn-sm btn-outline-danger" onclick="remove(${d.id})"><i class="bi bi-trash"></i></button>
      </div>
    </div>`;
  }).join('') || '<p class="text-muted">No deadlines yet</p>';
}
render();
setInterval(render, 60000);

// Share and Favourite logic
document.getElementById('share-btn').onclick = function() {
  if (navigator.share) {
    navigator.share({
      title: document.title,
      url: window.location.href
    });
  } else {
    window.prompt('Copy this link:', window.location.href);
  }
};
document.getElementById('fav-btn').onclick = function() {
  var favs = JSON.parse(localStorage.getItem('favouriteTimeTools') || '[]');
  var exists = favs.some(f => f.url === window.location.pathname);
  if (!exists) {
    favs.push({ name: 'Deadline Tracker', url: window.location.pathname });
    localStorage.setItem('favouriteTimeTools', JSON.stringify(favs));
    alert('Added to favourites!');
  } else {
    alert('Already in favourites.');
  }
};
</script>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
<?php include 'footer.php'; ?>


