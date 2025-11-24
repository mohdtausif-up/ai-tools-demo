<?php
$page_title = 'Stopwatch - Online Precision Timer | Time Tools';
$page_description = 'Precision stopwatch with lap timing, split times, and export functionality. Track time with millisecond accuracy.';
$breadcrumbs = [
    ['title' => 'Home', 'url' => 'index.php'],
    ['title' => 'Stopwatch', 'url' => '']
];
$page_css = 'stopwatch.css';
$page_js = 'stopwatch.js';
include 'header.php';
?>
<header class="border-bottom border-secondary py-3">
  <div class="container d-flex justify-content-between align-items-center">
    <a class="h5 mb-0" href="index.html">⏱️ Time Tools</a>
    <a class="btn btn-sm btn-outline-light" href="index.html">Home</a>
  </div>
</header>

<main id="main" class="container my-4">
  <div class="text-center mb-4">
    
    <div class="d-flex justify-content-end mb-3" style="gap:1rem;">
        <button id="share-btn" class="btn btn-outline-secondary" title="Share this tool"><span>ðŸ”—</span> Share</button>
        <button id="fav-btn" class="btn btn-outline-warning" title="Add to Favourites"><span>â­</span> Add to Favourites</button>
    </div>
    <p class="lead text-muted">Precision timing with lap tracking</p>
  </div>

  <div class="row g-4 justify-content-center">
    <div class="col-lg-10">
      <!-- Stopwatch Display -->
      <div class="card p-4 text-center mb-4">
        <div id="stopwatchDisplay" class="stopwatch-display">00:00:00.00</div>
        
        <div class="d-flex gap-3 justify-content-center flex-wrap mt-3">
          <button id="startBtn" class="btn btn-success btn-control">
            <i class="bi bi-play-fill"></i> Start
          </button>
          <button id="pauseBtn" class="btn btn-warning btn-control" disabled>
            <i class="bi bi-pause-fill"></i> Pause
          </button>
          <button id="lapBtn" class="btn btn-primary btn-control" disabled>
            <i class="bi bi-flag-fill"></i> Lap
          </button>
          <button id="resetBtn" class="btn btn-danger btn-control">
            <i class="bi bi-arrow-counterclockwise"></i> Reset
          </button>
        </div>
      </div>

      <!-- Lap Times -->
      <div class="card p-4 mb-4">
        <div class="d-flex justify-content-between align-items-center mb-3">
          <h2 class="h5 mb-0">Lap Times</h2>
          <button id="exportBtn" class="btn btn-sm btn-outline-primary" disabled>
            <i class="bi bi-download"></i> Export CSV
          </button>
        </div>
        
        <div class="lap-table">
          <table class="table table-dark table-striped table-hover mb-0">
            <thead>
              <tr>
                <th style="width: 15%;">#</th>
                <th style="width: 42.5%;">Lap Time</th>
                <th style="width: 42.5%;">Total Time</th>
              </tr>
            </thead>
            <tbody id="lapsTableBody">
              <tr>
                <td colspan="3" class="text-center text-muted">No laps recorded yet</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Info -->
      <div class="card p-3">
        <h3 class="h6 mb-2">Features</h3>
        <ul class="small mb-0 text-muted">
          <li>High-precision timing using performance.now()</li>
          <li>Lap time recording with fastest/slowest tracking</li>
          <li>Export lap data to CSV format</li>
          <li>All calculations run locally in your browser</li>
        </ul>
      </div>
    </div>
  </div>

<script type="module">
let startTime = 0;
let elapsedTime = 0;
let timerInterval = null;
let isRunning = false;
let laps = [];
let lapStartTime = 0;

// DOM Elements
const display = document.getElementById('stopwatchDisplay');
const startBtn = document.getElementById('startBtn');
const pauseBtn = document.getElementById('pauseBtn');
const lapBtn = document.getElementById('lapBtn');
const resetBtn = document.getElementById('resetBtn');
const exportBtn = document.getElementById('exportBtn');
const lapsTableBody = document.getElementById('lapsTableBody');

// Format time as HH:MM:SS.mm
function formatTime(ms) {
  const totalSeconds = Math.floor(ms / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  const milliseconds = Math.floor((ms % 1000) / 10);
  
  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}.${String(milliseconds).padStart(2, '0')}`;
}

// Update display
function updateDisplay() {
  const currentTime = performance.now();
  const totalElapsed = elapsedTime + (currentTime - startTime);
  display.textContent = formatTime(totalElapsed);
}

// Start stopwatch
function start() {
  if (isRunning) return;
  
  startTime = performance.now();
  lapStartTime = startTime;
  isRunning = true;
  
  timerInterval = setInterval(updateDisplay, 10);
  
  startBtn.disabled = true;
  pauseBtn.disabled = false;
  lapBtn.disabled = false;
}

// Pause stopwatch
function pause() {
  if (!isRunning) return;
  
  clearInterval(timerInterval);
  elapsedTime += performance.now() - startTime;
  isRunning = false;
  
  startBtn.disabled = false;
  pauseBtn.disabled = true;
  lapBtn.disabled = true;
}

// Record lap
function recordLap() {
  if (!isRunning) return;
  
  const currentTime = performance.now();
  const totalTime = elapsedTime + (currentTime - startTime);
  const lapTime = totalTime - (laps.length > 0 ? laps.reduce((sum, lap) => sum + lap.lapTime, 0) : 0);
  
  laps.push({
    number: laps.length + 1,
    lapTime: lapTime,
    totalTime: totalTime
  });
  
  lapStartTime = currentTime;
  updateLapsTable();
  exportBtn.disabled = false;
}

// Reset stopwatch
function reset() {
  clearInterval(timerInterval);
  startTime = 0;
  elapsedTime = 0;
  lapStartTime = 0;
  isRunning = false;
  laps = [];
  
  display.textContent = '00:00:00.00';
  updateLapsTable();
  
  startBtn.disabled = false;
  pauseBtn.disabled = true;
  lapBtn.disabled = true;
  exportBtn.disabled = true;
}

// Update laps table
function updateLapsTable() {
  if (laps.length === 0) {
    lapsTableBody.innerHTML = '<tr><td colspan="3" class="text-center text-muted">No laps recorded yet</td></tr>';
    return;
  }
  
  // Find fastest and slowest laps
  const lapTimes = laps.map(l => l.lapTime);
  const fastest = Math.min(...lapTimes);
  const slowest = Math.max(...lapTimes);
  
  lapsTableBody.innerHTML = laps
    .slice()
    .reverse()
    .map(lap => {
      let className = '';
      if (laps.length > 1) {
        if (lap.lapTime === fastest) className = 'fastest-lap';
        if (lap.lapTime === slowest) className = 'slowest-lap';
      }
      
      return `
        <tr>
          <td>${lap.number}</td>
          <td class="${className}">${formatTime(lap.lapTime)}</td>
          <td>${formatTime(lap.totalTime)}</td>
        </tr>
      `;
    })
    .join('');
}

// Export to CSV
function exportToCSV() {
  if (laps.length === 0) return;
  
  const csv = [
    'Lap,Lap Time,Total Time',
    ...laps.map(lap => `${lap.number},${formatTime(lap.lapTime)},${formatTime(lap.totalTime)}`)
  ].join('\n');
  
  const blob = new Blob([csv], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `stopwatch-laps-${new Date().toISOString().slice(0, 10)}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}

// Event listeners
startBtn.addEventListener('click', start);
pauseBtn.addEventListener('click', pause);
lapBtn.addEventListener('click', recordLap);
resetBtn.addEventListener('click', reset);
exportBtn.addEventListener('click', exportToCSV);
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


