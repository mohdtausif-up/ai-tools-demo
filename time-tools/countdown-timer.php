<?php
$page_title = 'Countdown Timer – Free Online | Time Tools';
$page_description = 'Free online countdown timer with time zone support and notifications.';
$breadcrumbs = [
    ['title' => 'Home', 'url' => 'index.php'],
    ['title' => 'Countdown Timer', 'url' => '']
];
$page_css = 'countdown-timer.css';
$page_js = 'countdown-timer.js';
include 'header.php';
?>
<header class="border-bottom border-secondary py-3">
  <nav class="container">
    <div class="d-flex justify-content-between align-items-center">
      <a class="h5 mb-0" href="index.html">⏱️ Time Tools</a>
      <a class="btn btn-sm btn-outline-light" href="index.html"><i class="bi bi-house"></i> Home</a>
    </div>
  </nav>
</header>

  <div class="text-center mb-4">
    
    <div class="d-flex justify-content-end mb-3" style="gap:1rem;">
        <button id="share-btn" class="btn btn-outline-secondary" title="Share this tool"><span>ðŸ”—</span> Share</button>
        <button id="fav-btn" class="btn btn-outline-warning" title="Add to Favourites"><span>â­</span> Add to Favourites</button>
    </div>
    <p class="lead text-muted">Set a target date & time and watch the countdown</p>
  </div>

  <div class="row g-4 justify-content-center">
    <div class="col-lg-10">
      <!-- Countdown Display -->
      <div class="card p-4 text-center mb-4">
        <div id="countdownDisplay" class="countdown-display text-white mb-3">
          <div class="time-unit">
            <span class="time-value" id="days">0</span>
            <span class="time-label">DAYS</span>
          </div>
          <div class="time-unit">
            <span class="time-value" id="hours">00</span>
            <span class="time-label">HOURS</span>
          </div>
          <div class="time-unit">
            <span class="time-value" id="minutes">00</span>
            <span class="time-label">MINUTES</span>
          </div>
          <div class="time-unit">
            <span class="time-value" id="seconds">00</span>
            <span class="time-label">SECONDS</span>
          </div>
        </div>
        <div id="statusBadge">
          <span class="badge bg-secondary status-badge">Set a target time</span>
        </div>
      </div>

      <!-- Configuration -->
      <div class="card p-4 mb-4">
        <h2 class="h5 mb-3">Configure Countdown</h2>
        <form id="countdownForm">
          <div class="row g-3">
            <div class="col-md-6">
              <label for="eventTitle" class="form-label">Event Title (Optional)</label>
              <input type="text" class="form-control" id="eventTitle" placeholder="e.g., Product Launch">
            </div>
            <div class="col-md-6">
              <label for="targetDateTime" class="form-label">Target Date & Time</label>
              <input type="datetime-local" class="form-control" id="targetDateTime" required>
            </div>
            <div class="col-md-6">
              <label for="timezone" class="form-label">Time Zone</label>
              <select class="form-select" id="timezone">
                <option value="local" selected>Local Time</option>
                <option value="UTC">UTC</option>
                <option value="America/New_York">Eastern Time</option>
                <option value="America/Chicago">Central Time</option>
                <option value="America/Denver">Mountain Time</option>
                <option value="America/Los_Angeles">Pacific Time</option>
                <option value="Europe/London">London</option>
                <option value="Europe/Paris">Paris</option>
                <option value="Europe/Berlin">Berlin</option>
                <option value="Asia/Tokyo">Tokyo</option>
                <option value="Asia/Shanghai">Shanghai</option>
                <option value="Asia/Dubai">Dubai</option>
                <option value="Australia/Sydney">Sydney</option>
              </select>
            </div>
            <div class="col-md-6">
              <label class="form-label">Quick Presets</label>
              <div class="btn-group w-100" role="group">
                <button type="button" class="btn preset-btn" onclick="setPreset(1)">1 hr</button>
                <button type="button" class="btn preset-btn" onclick="setPreset(24)">1 day</button>
                <button type="button" class="btn preset-btn" onclick="setPreset(168)">1 week</button>
              </div>
            </div>
            <div class="col-12">
              <div class="form-check">
                <input class="form-check-input" type="checkbox" id="notifyOnComplete">
                <label class="form-check-label" for="notifyOnComplete">
                  Enable browser notification when countdown completes
                </label>
              </div>
            </div>
            <div class="col-12">
              <button type="submit" class="btn btn-primary btn-lg w-100">
                <i class="bi bi-play-circle"></i> Start Countdown
              </button>
            </div>
          </div>
        </form>
      </div>

      <!-- Info -->
      <div class="card p-3">
        <h3 class="h6 mb-2">Features</h3>
        <ul class="small mb-0 text-muted">
          <li>Real-time countdown with precision to the second</li>
          <li>Time zone support for accurate countdowns</li>
          <li>Optional browser notifications</li>
          <li>All calculations run locally in your browser</li>
        </ul>
      </div>
    </div>
  </div>
    

<script type="module">
const { DateTime } = luxon;
let countdownInterval = null;
let targetTime = null;
let isRunning = false;

// DOM Elements
const form = document.getElementById('countdownForm');
const eventTitleInput = document.getElementById('eventTitle');
const targetDateTimeInput = document.getElementById('targetDateTime');
const timezoneSelect = document.getElementById('timezone');
const notifyCheckbox = document.getElementById('notifyOnComplete');
const statusBadge = document.getElementById('statusBadge');

// Display elements
const daysDisplay = document.getElementById('days');
const hoursDisplay = document.getElementById('hours');
const minutesDisplay = document.getElementById('minutes');
const secondsDisplay = document.getElementById('seconds');

// Quick preset function
window.setPreset = function(hours) {
  const now = DateTime.now();
  const target = now.plus({ hours });
  targetDateTimeInput.value = target.toFormat("yyyy-MM-dd'T'HH:mm");
};

// Update countdown display
function updateCountdown() {
  if (!targetTime) return;

  const now = DateTime.now();
  const diff = targetTime.diff(now, ['days', 'hours', 'minutes', 'seconds']).toObject();

  if (targetTime <= now) {
    // Countdown complete
    stopCountdown();
    daysDisplay.textContent = '0';
    hoursDisplay.textContent = '00';
    minutesDisplay.textContent = '00';
    secondsDisplay.textContent = '00';
    
    const eventName = eventTitleInput.value || 'Event';
    statusBadge.innerHTML = `<span class="badge bg-success status-badge">🎉 ${eventName} has arrived!</span>`;
    
    // Show notification if enabled
    if (notifyCheckbox.checked && 'Notification' in window && Notification.permission === 'granted') {
      new Notification('Countdown Complete!', {
        body: `${eventName} is here!`,
        icon: '⏱️'
      });
    }
    return;
  }

  // Update display
  const days = Math.floor(diff.days);
  const hours = Math.floor(diff.hours);
  const minutes = Math.floor(diff.minutes);
  const seconds = Math.floor(diff.seconds);

  daysDisplay.textContent = days;
  hoursDisplay.textContent = String(hours).padStart(2, '0');
  minutesDisplay.textContent = String(minutes).padStart(2, '0');
  secondsDisplay.textContent = String(seconds).padStart(2, '0');

  const eventName = eventTitleInput.value || 'Event';
  statusBadge.innerHTML = `<span class="badge bg-primary status-badge">⏱️ ${eventName} - ${targetTime.toFormat('MMM dd, yyyy HH:mm ZZZZ')}</span>`;
}

// Start countdown
function startCountdown(target) {
  stopCountdown(); // Clear any existing countdown
  targetTime = target;
  isRunning = true;
  updateCountdown();
  countdownInterval = setInterval(updateCountdown, 1000);
  
  // Save to localStorage
  saveToLocalStorage();
}

// Stop countdown
function stopCountdown() {
  if (countdownInterval) {
    clearInterval(countdownInterval);
    countdownInterval = null;
  }
  isRunning = false;
}

// Save countdown configuration
function saveToLocalStorage() {
  const config = {
    eventTitle: eventTitleInput.value,
    targetDateTime: targetDateTimeInput.value,
    timezone: timezoneSelect.value,
    notify: notifyCheckbox.checked
  };
  localStorage.setItem('countdownConfig', JSON.stringify(config));
}

// Load countdown configuration
function loadFromLocalStorage() {
  const saved = localStorage.getItem('countdownConfig');
  if (saved) {
    try {
      const config = JSON.parse(saved);
      if (config.eventTitle) eventTitleInput.value = config.eventTitle;
      if (config.targetDateTime) targetDateTimeInput.value = config.targetDateTime;
      if (config.timezone) timezoneSelect.value = config.timezone;
      if (config.notify !== undefined) notifyCheckbox.checked = config.notify;
    } catch (e) {
      console.error('Failed to load saved configuration:', e);
    }
  }
}

// Form submit handler
form.addEventListener('submit', (e) => {
  e.preventDefault();
  
  if (!targetDateTimeInput.value) {
    alert('Please select a target date and time.');
    return;
  }

  // Request notification permission if enabled
  if (notifyCheckbox.checked && 'Notification' in window && Notification.permission === 'default') {
    Notification.requestPermission();
  }

  // Parse target time
  const timezone = timezoneSelect.value === 'local' ? DateTime.local().zoneName : timezoneSelect.value;
  const target = DateTime.fromISO(targetDateTimeInput.value, { zone: timezone });

  if (!target.isValid) {
    alert('Invalid date/time: ' + target.invalidReason);
    return;
  }

  if (target <= DateTime.now()) {
    alert('Target time must be in the future!');
    return;
  }

  startCountdown(target);
});

// Initialize
loadFromLocalStorage();

// Check URL parameters for shared countdown
const urlParams = new URLSearchParams(window.location.search);
if (urlParams.has('target')) {
  targetDateTimeInput.value = urlParams.get('target');
  if (urlParams.has('title')) eventTitleInput.value = urlParams.get('title');
  if (urlParams.has('tz')) timezoneSelect.value = urlParams.get('tz');
  // Auto-start if URL parameters present
  setTimeout(() => form.requestSubmit(), 100);
}
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


