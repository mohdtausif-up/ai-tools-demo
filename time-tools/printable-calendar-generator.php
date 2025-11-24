<?php
$page_title = 'Printable Calendar Generator – Free Online Calendar Maker';
$page_description = 'Create and print custom monthly or yearly calendars with holidays, week numbers, and notes. Free online calendar generator supporting multiple languages, timezones, and paper sizes.';
$breadcrumbs = [
    ['title' => 'Home', 'url' => 'index.php'],
    ['title' => 'Printable Calendar Generator', 'url' => '']
];
$page_css = 'printable-calendar-generator.css';
$page_js = 'printable-calendar-generator.js';
include 'header.php';
?>
<a href="#main" class="skip-link">Skip to content</a>
  
  <header class="bg-primary text-white py-3 no-print">
    <div class="container">
      <div class="d-flex justify-content-between align-items-center">
        <h2 class="h4 mb-0">📅 Calendar Tools</h2>
        <nav aria-label="Primary navigation">
          <ul class="nav">
            <li class="nav-item"><a href="#" class="nav-link text-white">Time Tools</a></li>
            <li class="nav-item"><a href="#" class="nav-link text-white">About</a></li>
          </ul>
        </nav>
      </div>
    </div>
  </header>
  
  <main id="main">
    <!-- Hero Section -->
    <section class="bg-light py-5 no-print">
      <div class="container text-center">
        
    <div class="d-flex justify-content-end mb-3" style="gap:1rem;">
        <button id="share-btn" class="btn btn-outline-secondary" title="Share this tool"><span>ðŸ”—</span> Share</button>
        <button id="fav-btn" class="btn btn-outline-warning" title="Add to Favourites"><span>â­</span> Add to Favourites</button>
    </div>
        <p class="lead mb-2">Create custom monthly or yearly calendars with holidays, week numbers, and notes.</p>
        <p class="text-muted">No sign-up. Works offline. Print or save to PDF.</p>
      </div>
    </section>
    
    <!-- Tool Controls -->
    <section class="container my-5 tool-controls no-print">
      <div class="card shadow-sm">
        <div class="card-body">
          <form id="calendarForm">
            <div class="row g-3">
              <!-- Year & Mode -->
              <div class="col-md-3">
                <label for="year" class="form-label">Year</label>
                <select id="year" class="form-select" aria-label="Select year">
                  <!-- Populated by JS -->
                </select>
              </div>
              
              <div class="col-md-3">
                <label for="mode" class="form-label">Mode</label>
                <select id="mode" class="form-select" aria-label="Select calendar mode">
                  <option value="monthly">Monthly</option>
                  <option value="yearly">Yearly</option>
                </select>
              </div>
              
              <div class="col-md-3" id="monthSelectWrapper">
                <label for="month" class="form-label">Month</label>
                <select id="month" class="form-select" aria-label="Select month">
                  <option value="1">January</option>
                  <option value="2">February</option>
                  <option value="3">March</option>
                  <option value="4">April</option>
                  <option value="5">May</option>
                  <option value="6">June</option>
                  <option value="7">July</option>
                  <option value="8">August</option>
                  <option value="9">September</option>
                  <option value="10">October</option>
                  <option value="11">November</option>
                  <option value="12">December</option>
                </select>
              </div>
              
              <div class="col-md-3">
                <label for="locale" class="form-label">Locale</label>
                <select id="locale" class="form-select" aria-label="Select locale">
                  <option value="en-US">English (US)</option>
                  <option value="en-GB">English (UK)</option>
                  <option value="hi-IN">Hindi (India)</option>
                  <option value="fr-FR">Français</option>
                  <option value="de-DE">Deutsch</option>
                  <option value="ja-JP">日本語</option>
                  <option value="es-ES">Español</option>
                  <option value="pt-BR">Português (BR)</option>
                  <option value="zh-CN">中文</option>
                </select>
              </div>
              
              <!-- Timezone & Week Start -->
              <div class="col-md-4">
                <label for="timezone" class="form-label">Timezone</label>
                <select id="timezone" class="form-select" aria-label="Select timezone">
                  <option value="UTC">UTC</option>
                  <option value="Europe/London">Europe/London</option>
                  <option value="Europe/Berlin">Europe/Berlin</option>
                  <option value="Europe/Paris">Europe/Paris</option>
                  <option value="Asia/Kolkata">Asia/Kolkata</option>
                  <option value="Asia/Dubai">Asia/Dubai</option>
                  <option value="Asia/Tokyo">Asia/Tokyo</option>
                  <option value="Asia/Shanghai">Asia/Shanghai</option>
                  <option value="America/New_York">America/New_York</option>
                  <option value="America/Chicago">America/Chicago</option>
                  <option value="America/Los_Angeles">America/Los_Angeles</option>
                  <option value="Australia/Sydney">Australia/Sydney</option>
                </select>
              </div>
              
              <div class="col-md-4">
                <label for="weekStart" class="form-label">Week Starts On</label>
                <select id="weekStart" class="form-select" aria-label="Select week start day">
                  <option value="1">Monday</option>
                  <option value="7">Sunday</option>
                </select>
              </div>
              
              <div class="col-md-4">
                <label for="headerFormat" class="form-label">Header Format</label>
                <select id="headerFormat" class="form-select" aria-label="Select header format">
                  <option value="MMMM yyyy">MMMM yyyy (January 2025)</option>
                  <option value="MMM yy">MMM yy (Jan 25)</option>
                  <option value="LLLL yyyy">LLLL yyyy (Long format)</option>
                </select>
              </div>
              
              <!-- Paper Settings -->
              <div class="col-md-3">
                <label for="paperSize" class="form-label">Paper Size</label>
                <select id="paperSize" class="form-select" aria-label="Select paper size">
                  <option value="a4">A4</option>
                  <option value="letter">US Letter</option>
                </select>
              </div>
              
              <div class="col-md-3">
                <label for="orientation" class="form-label">Orientation</label>
                <select id="orientation" class="form-select" aria-label="Select orientation">
                  <option value="portrait">Portrait</option>
                  <option value="landscape" selected>Landscape</option>
                </select>
              </div>
              
              <div class="col-md-3">
                <label for="fontSize" class="form-label">Font Size</label>
                <select id="fontSize" class="form-select" aria-label="Select font size">
                  <option value="small">Small</option>
                  <option value="medium" selected>Medium</option>
                  <option value="large">Large</option>
                </select>
              </div>
              
              <div class="col-md-3">
                <label for="accentColor" class="form-label">Accent Color</label>
                <select id="accentColor" class="form-select" aria-label="Select accent color">
                  <option value="#0d6efd" selected>Blue</option>
                  <option value="#198754">Green</option>
                  <option value="#dc3545">Red</option>
                  <option value="#6f42c1">Purple</option>
                  <option value="#fd7e14">Orange</option>
                  <option value="#0dcaf0">Cyan</option>
                </select>
              </div>
              
              <!-- Toggles -->
              <div class="col-12">
                <label class="form-label d-block">Display Options</label>
                <div class="form-check form-check-inline">
                  <input class="form-check-input" type="checkbox" id="showWeekNumbers" value="1">
                  <label class="form-check-label" for="showWeekNumbers">Week Numbers</label>
                </div>
                <div class="form-check form-check-inline">
                  <input class="form-check-input" type="checkbox" id="showNotes" value="1">
                  <label class="form-check-label" for="showNotes">Notes Area</label>
                </div>
                <div class="form-check form-check-inline">
                  <input class="form-check-input" type="checkbox" id="showHolidays" value="1" checked>
                  <label class="form-check-label" for="showHolidays">Holidays</label>
                </div>
                <div class="form-check form-check-inline">
                  <input class="form-check-input" type="checkbox" id="compactMode" value="1">
                  <label class="form-check-label" for="compactMode">Compact Mode</label>
                </div>
                <div class="form-check form-check-inline">
                  <input class="form-check-input" type="checkbox" id="highContrast" value="1">
                  <label class="form-check-label" for="highContrast">High Contrast</label>
                </div>
                <div class="form-check form-check-inline">
                  <input class="form-check-input" type="checkbox" id="darkTheme" value="1">
                  <label class="form-check-label" for="darkTheme">Dark Theme</label>
                </div>
              </div>
              
              <!-- Holiday Region -->
              <div class="col-md-6" id="holidayRegionWrapper">
                <label for="holidayRegion" class="form-label">Holiday Region</label>
                <select id="holidayRegion" class="form-select" aria-label="Select holiday region">
                  <option value="">None</option>
                  <option value="US">United States</option>
                  <option value="UK">United Kingdom</option>
                  <option value="IN">India</option>
                  <option value="custom">Custom CSV</option>
                </select>
              </div>
              
              <div class="col-md-6" id="customHolidayWrapper" style="display:none;">
                <label for="customHolidays" class="form-label">Upload Custom Holidays CSV</label>
                <input type="file" class="form-control" id="customHolidays" accept=".csv" aria-label="Upload custom holidays CSV file">
                <small class="form-text text-muted">Format: YYYY-MM-DD,Holiday Name</small>
              </div>
              
              <!-- Action Buttons -->
              <div class="col-12">
                <button type="button" id="generateBtn" class="btn btn-primary btn-lg me-2">
                  <i class="bi bi-calendar-check"></i> Generate Calendar
                </button>
                <button type="button" id="printBtn" class="btn btn-secondary me-2">
                  <i class="bi bi-printer"></i> Print
                </button>
                <button type="button" id="exportBtn" class="btn btn-info me-2">
                  <i class="bi bi-file-pdf"></i> Export PDF/PNG
                </button>
                <button type="button" id="shareBtn" class="btn btn-success me-2">
                  <i class="bi bi-share"></i> Share Link
                </button>
                <button type="button" id="resetBtn" class="btn btn-outline-secondary">
                  <i class="bi bi-arrow-clockwise"></i> Reset
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
    
    <!-- Loader -->
    <div class="loader" id="loader" role="status" aria-live="polite">
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
      <p class="mt-2">Generating calendar...</p>
    </div>
    
    <!-- Calendar Output -->
    <section class="container">
      <div id="calendarOutput" class="calendar-container" role="region" aria-live="polite" aria-label="Generated calendar">
        <!-- Calendar will be rendered here -->
      </div>
    </section>
    
    <!-- SEO Content -->
    <section class="container my-5 seo-content no-print">
      <div class="row">
        <div class="col-lg-8 mx-auto">
          <!-- How It Works -->
          <h2 class="h3 mb-3">How It Works</h2>
          <p>Our Printable Calendar Generator is a powerful yet simple tool that helps you create customized calendars in seconds. Select your desired year, choose between monthly or yearly view, and customize the appearance with various styling options. The tool uses the Luxon library to ensure accurate date calculations across all timezones and handles daylight saving time changes correctly.</p>
          <p>You can add holidays from predefined regional sets (US, UK, India) or upload your own custom CSV file. Toggle week numbers to display ISO 8601 week numbers, add notes areas for journaling, and choose from multiple font sizes and color schemes. Once generated, simply click Print to save as PDF or use your browser's print dialog.</p>
          
          <!-- Benefits -->
          <h2 class="h3 mb-3 mt-5">Benefits and Use Cases</h2>
          <ul>
            <li><strong>Teachers & Educators:</strong> Create academic year calendars with school holidays, exam dates, and important deadlines. Print and distribute to students.</li>
            <li><strong>Project Teams:</strong> Generate project timelines with milestone markers and sprint planning dates. Share with team members.</li>
            <li><strong>Personal Planning:</strong> Design custom planners with birthdays, anniversaries, and vacation days marked. Add notes areas for daily journaling.</li>
            <li><strong>Habit Tracking:</strong> Print blank calendars for tracking fitness goals, meditation practice, or any daily habits you want to build.</li>
            <li><strong>Event Organizers:</strong> Create event calendars highlighting key dates, registration deadlines, and conference schedules.</li>
            <li><strong>International Teams:</strong> Generate calendars in multiple languages and timezones to coordinate across global offices.</li>
          </ul>
          
          <!-- FAQ -->
          <h2 class="h3 mb-3 mt-5">Frequently Asked Questions</h2>
          <div class="accordion" id="faqAccordion">
            <div class="accordion-item">
              <h3 class="accordion-header">
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faq1" aria-expanded="false" aria-controls="faq1">
                  Does this calendar handle daylight saving time correctly?
                </button>
              </h3>
              <div id="faq1" class="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                <div class="accordion-body">
                  Yes, the calendar uses Luxon library which properly handles DST transitions and timezone changes. Dates are calculated based on your selected timezone, ensuring accuracy across all regions and time periods.
                </div>
              </div>
            </div>
            
            <div class="accordion-item">
              <h3 class="accordion-header">
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faq2" aria-expanded="false" aria-controls="faq2">
                  How do I print my calendar?
                </button>
              </h3>
              <div id="faq2" class="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                <div class="accordion-body">
                  Click the Print button to open your browser's print dialog. The page is optimized for printing on A4 or US Letter paper in both portrait and landscape orientations. You can save as PDF directly from the print dialog by selecting "Save as PDF" as your printer destination.
                </div>
              </div>
            </div>
            
            <div class="accordion-item">
              <h3 class="accordion-header">
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faq3" aria-expanded="false" aria-controls="faq3">
                  Can I add my own custom holidays?
                </button>
              </h3>
              <div id="faq3" class="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                <div class="accordion-body">
                  Yes! Select "Custom CSV" from the Holiday Region dropdown, then upload a CSV file with your holidays. The format should be: <code>YYYY-MM-DD,Holiday Name</code> with each holiday on a new line. Example: <code>2025-12-25,Christmas Day</code>
                </div>
              </div>
            </div>
            
            <div class="accordion-item">
              <h3 class="accordion-header">
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faq4" aria-expanded="false" aria-controls="faq4">
                  Is my data stored or sent to a server?
                </button>
              </h3>
              <div id="faq4" class="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                <div class="accordion-body">
                  No, all processing happens locally in your browser. Your settings are saved in browser localStorage for convenience, but nothing is sent to any server. Your custom holidays and calendar data remain completely private.
                </div>
              </div>
            </div>
            
            <div class="accordion-item">
              <h3 class="accordion-header">
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faq5" aria-expanded="false" aria-controls="faq5">
                  Does this work on mobile devices?
                </button>
              </h3>
              <div id="faq5" class="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                <div class="accordion-body">
                  Yes, the calendar generator is fully responsive and works on mobile devices. However, for the best printing experience and to access all features, we recommend using a desktop browser.
                </div>
              </div>
            </div>
            
            <div class="accordion-item">
              <h3 class="accordion-header">
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faq6" aria-expanded="false" aria-controls="faq6">
                  What languages and locales are supported?
                </button>
              </h3>
              <div id="faq6" class="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                <div class="accordion-body">
                  The calendar supports multiple locales including English (US/GB), Hindi, French, German, Japanese, Spanish, Portuguese, and Chinese. Weekday and month names automatically adapt to your selected locale, including proper diacritical marks and character sets.
                </div>
              </div>
            </div>
            
            <div class="accordion-item">
              <h3 class="accordion-header">
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faq7" aria-expanded="false" aria-controls="faq7">
                  How do week numbers work?
                </button>
              </h3>
              <div id="faq7" class="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                <div class="accordion-body">
                  Week numbers follow the ISO 8601 standard, where week 1 is the first week with at least 4 days in the new year. This is the internationally recognized standard used in most business and academic contexts.
                </div>
              </div>
            </div>
            
            <div class="accordion-item">
              <h3 class="accordion-header">
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faq8" aria-expanded="false" aria-controls="faq8">
                  Can I export the calendar as an image or PDF?
                </button>
              </h3>
              <div id="faq8" class="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                <div class="accordion-body">
                  Yes! Click the "Export PDF/PNG" button to generate a downloadable file. The tool uses html2canvas and jspdf libraries loaded on-demand. However, we recommend using your browser's native Print to PDF feature (via the Print button) for the best quality and smallest file size.
                </div>
              </div>
            </div>
          </div>
          
          <!-- Related Tools -->
          <h2 class="h3 mb-3 mt-5">Related Time Tools</h2>
          <ul class="list-unstyled">
            <li><a href="countdown-timer.html">Countdown Timer</a> – Count down to important events</li>
            <li><a href="world-clock.html">World Clock</a> – View multiple timezones simultaneously</li>
            <li><a href="time-zone-converter.html">Time Zone Converter</a> – Convert times across zones</li>
            <li><a href="stopwatch.html">Stopwatch</a> – Precision timing with lap recording</li>
            <li><a href="time-calculator.html">Time Calculator</a> – Add and subtract time durations</li>
          </ul>
        </div>
      </div>
    </section>
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

  
  <footer class="bg-dark text-white py-4 mt-5 no-print">
    <div class="container text-center">
      <p class="mb-2">&copy; 2025 Calendar Tools. All rights reserved.</p>
      <p class="mb-2">
        <a href="#" class="text-white-50 me-3">Privacy Policy</a>
        <a href="#" class="text-white-50">Terms of Service</a>
      </p>
      <p class="text-white-50 small mb-0">
        <i class="bi bi-shield-check"></i> All processing happens in your browser. No data is sent to any server.
      </p>
    </div>
  </footer>
  
  <!-- Toast Container -->
  <div class="toast-container position-fixed top-0 end-0 p-3"></div>
  
  <!-- Scripts -->
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous" defer></script>
  <script src="https://cdn.jsdelivr.net/npm/luxon@3.4.4/build/global/luxon.min.js" defer></script>
  
  <script defer>
    // Wait for Luxon to load
    document.addEventListener('DOMContentLoaded', () => {
      if (typeof luxon === 'undefined') {
        setTimeout(() => initApp(), 100);
      } else {
        initApp();
      }
    });
    
    function initApp() {
      const { DateTime } = luxon;
      
      // State
      let state = {
        year: new Date().getFullYear(),
        month: new Date().getMonth() + 1,
        mode: 'monthly',
        locale: 'en-US',
        timezone: 'UTC',
        weekStart: 1,
        paperSize: 'a4',
        orientation: 'landscape',
        fontSize: 'medium',
        accentColor: '#0d6efd',
        showWeekNumbers: false,
        showNotes: false,
        showHolidays: true,
        compactMode: false,
        highContrast: false,
        darkTheme: false,
        holidayRegion: '',
        headerFormat: 'MMMM yyyy',
        customHolidays: []
      };
      
      // Holiday data
      const holidays = {
        US: [
          { date: '2025-01-01', name: 'New Year\'s Day' },
          { date: '2025-01-20', name: 'MLK Day' },
          { date: '2025-02-17', name: 'Presidents Day' },
          { date: '2025-05-26', name: 'Memorial Day' },
          { date: '2025-07-04', name: 'Independence Day' },
          { date: '2025-09-01', name: 'Labor Day' },
          { date: '2025-10-13', name: 'Columbus Day' },
          { date: '2025-11-11', name: 'Veterans Day' },
          { date: '2025-11-27', name: 'Thanksgiving' },
          { date: '2025-12-25', name: 'Christmas Day' }
        ],
        UK: [
          { date: '2025-01-01', name: 'New Year\'s Day' },
          { date: '2025-04-18', name: 'Good Friday' },
          { date: '2025-04-21', name: 'Easter Monday' },
          { date: '2025-05-05', name: 'Early May Bank Holiday' },
          { date: '2025-05-26', name: 'Spring Bank Holiday' },
          { date: '2025-08-25', name: 'Summer Bank Holiday' },
          { date: '2025-12-25', name: 'Christmas Day' },
          { date: '2025-12-26', name: 'Boxing Day' }
        ],
        IN: [
          { date: '2025-01-26', name: 'Republic Day' },
          { date: '2025-03-14', name: 'Holi' },
          { date: '2025-04-14', name: 'Ambedkar Jayanti' },
          { date: '2025-08-15', name: 'Independence Day' },
          { date: '2025-10-02', name: 'Gandhi Jayanti' },
          { date: '2025-10-22', name: 'Dussehra' },
          { date: '2025-11-12', name: 'Diwali' },
          { date: '2025-12-25', name: 'Christmas Day' }
        ]
      };
      
      // Initialize form
      function initForm() {
        const yearSelect = document.getElementById('year');
        const currentYear = new Date().getFullYear();
        for (let y = currentYear - 10; y <= currentYear + 10; y++) {
          const opt = document.createElement('option');
          opt.value = y;
          opt.textContent = y;
          if (y === currentYear) opt.selected = true;
          yearSelect.appendChild(opt);
        }
        
        // Set current month
        document.getElementById('month').value = new Date().getMonth() + 1;
        
        // Load from URL or localStorage
        loadState();
        applyState();
        
        // Event listeners
        document.getElementById('generateBtn').addEventListener('click', generateCalendar);
        document.getElementById('printBtn').addEventListener('click', printCalendar);
        document.getElementById('exportBtn').addEventListener('click', exportCalendar);
        document.getElementById('shareBtn').addEventListener('click', shareLink);
        document.getElementById('resetBtn').addEventListener('click', resetForm);
        
        document.getElementById('mode').addEventListener('change', (e) => {
          document.getElementById('monthSelectWrapper').style.display = e.target.value === 'monthly' ? 'block' : 'none';
          
          // Auto-switch orientation based on mode
          const orientationSelect = document.getElementById('orientation');
          if (e.target.value === 'monthly') {
            orientationSelect.value = 'landscape';
            state.orientation = 'landscape';
          } else if (e.target.value === 'yearly') {
            orientationSelect.value = 'portrait';
            state.orientation = 'portrait';
          }
          
          // Update body classes
          document.body.classList.remove('orientation-landscape', 'orientation-portrait');
          document.body.classList.add(`orientation-${state.orientation}`);
          
          // Regenerate calendar if already generated
          if (document.getElementById('calendarOutput').innerHTML) {
            generateCalendar();
          }
        });
        
        document.getElementById('holidayRegion').addEventListener('change', (e) => {
          document.getElementById('customHolidayWrapper').style.display = e.target.value === 'custom' ? 'block' : 'none';
        });
        
        document.getElementById('customHolidays').addEventListener('change', handleCustomHolidays);
        
        document.getElementById('darkTheme').addEventListener('change', (e) => {
          document.body.classList.toggle('dark-theme', e.target.checked);
        });
      }
      
      function loadState() {
        // Load from URL
        const params = new URLSearchParams(window.location.search);
        if (params.toString()) {
          params.forEach((value, key) => {
            if (key in state) {
              if (typeof state[key] === 'boolean') {
                state[key] = value === 'true' || value === '1';
              } else if (typeof state[key] === 'number') {
                state[key] = parseInt(value);
              } else {
                state[key] = value;
              }
            }
          });
        } else {
          // Load from localStorage
          const saved = localStorage.getItem('calendarState');
          if (saved) {
            try {
              const parsed = JSON.parse(saved);
              state = { ...state, ...parsed };
            } catch (e) {
              console.error('Failed to parse saved state', e);
            }
          }
        }
      }
      
      function saveState() {
        localStorage.setItem('calendarState', JSON.stringify(state));
      }
      
      function applyState() {
        document.getElementById('year').value = state.year;
        document.getElementById('month').value = state.month;
        document.getElementById('mode').value = state.mode;
        document.getElementById('locale').value = state.locale;
        document.getElementById('timezone').value = state.timezone;
        document.getElementById('weekStart').value = state.weekStart;
        document.getElementById('paperSize').value = state.paperSize;
        document.getElementById('orientation').value = state.orientation;
        document.getElementById('fontSize').value = state.fontSize;
        document.getElementById('accentColor').value = state.accentColor;
        document.getElementById('headerFormat').value = state.headerFormat;
        document.getElementById('showWeekNumbers').checked = state.showWeekNumbers;
        document.getElementById('showNotes').checked = state.showNotes;
        document.getElementById('showHolidays').checked = state.showHolidays;
        document.getElementById('compactMode').checked = state.compactMode;
        document.getElementById('highContrast').checked = state.highContrast;
        document.getElementById('darkTheme').checked = state.darkTheme;
        document.getElementById('holidayRegion').value = state.holidayRegion;
        
        document.getElementById('monthSelectWrapper').style.display = state.mode === 'monthly' ? 'block' : 'none';
        document.getElementById('customHolidayWrapper').style.display = state.holidayRegion === 'custom' ? 'block' : 'none';
        
        document.body.classList.toggle('dark-theme', state.darkTheme);
        document.body.className = document.body.className.replace(/paper-\w+|orientation-\w+/g, '');
        document.body.classList.add(`paper-${state.paperSize}`, `orientation-${state.orientation}`);
        
        document.documentElement.style.setProperty('--accent-color', state.accentColor);
      }
      
      function readFormState() {
        state.year = parseInt(document.getElementById('year').value);
        state.month = parseInt(document.getElementById('month').value);
        state.mode = document.getElementById('mode').value;
        state.locale = document.getElementById('locale').value;
        state.timezone = document.getElementById('timezone').value;
        state.weekStart = parseInt(document.getElementById('weekStart').value);
        state.paperSize = document.getElementById('paperSize').value;
        state.orientation = document.getElementById('orientation').value;
        state.fontSize = document.getElementById('fontSize').value;
        state.accentColor = document.getElementById('accentColor').value;
        state.headerFormat = document.getElementById('headerFormat').value;
        state.showWeekNumbers = document.getElementById('showWeekNumbers').checked;
        state.showNotes = document.getElementById('showNotes').checked;
        state.showHolidays = document.getElementById('showHolidays').checked;
        state.compactMode = document.getElementById('compactMode').checked;
        state.highContrast = document.getElementById('highContrast').checked;
        state.darkTheme = document.getElementById('darkTheme').checked;
        state.holidayRegion = document.getElementById('holidayRegion').value;
        
        document.body.className = document.body.className.replace(/paper-\w+|orientation-\w+/g, '');
        document.body.classList.add(`paper-${state.paperSize}`, `orientation-${state.orientation}`);
        document.body.classList.toggle('dark-theme', state.darkTheme);
        document.documentElement.style.setProperty('--accent-color', state.accentColor);
        
        saveState();
      }
      
      function handleCustomHolidays(e) {
        const file = e.target.files[0];
        if (!file) return;
        
        const reader = new FileReader();
        reader.onload = (evt) => {
          const csv = evt.target.result;
          const lines = csv.split('\n');
          state.customHolidays = [];
          
          lines.forEach((line, idx) => {
            if (!line.trim()) return;
            const [date, ...nameParts] = line.split(',');
            const name = nameParts.join(',').trim();
            
            // Validate date format
            if (!/^\d{4}-\d{2}-\d{2}$/.test(date.trim())) {
              console.warn(`Invalid date format on line ${idx + 1}: ${date}`);
              return;
            }
            
            state.customHolidays.push({ date: date.trim(), name });
          });
          
          showToast(`Loaded ${state.customHolidays.length} custom holidays`);
        };
        reader.readAsText(file);
      }
      
      function printCalendar() {
        readFormState();
        
        // Inject dynamic print styles based on paper size and orientation
        let styleId = 'dynamic-print-style';
        let existingStyle = document.getElementById(styleId);
        if (existingStyle) {
          existingStyle.remove();
        }
        
        const style = document.createElement('style');
        style.id = styleId;
        let pageSize = state.paperSize === 'a4' ? 'A4' : 'letter';
        // Yearly mode should be portrait, monthly should be landscape
        let orientation = state.mode === 'yearly' ? 'portrait' : 'landscape';
        
        style.textContent = `
          @media print {
            @page {
              size: ${pageSize} ${orientation};
              margin: 10mm;
            }
          }
        `;
        document.head.appendChild(style);
        
        // Trigger print
        setTimeout(() => window.print(), 100);
      }
      
      function generateCalendar() {
        readFormState();
        
        const loader = document.getElementById('loader');
        const output = document.getElementById('calendarOutput');
        
        loader.classList.add('active');
        output.innerHTML = '';
        
        // Small delay to show loader
        setTimeout(() => {
          try {
            const months = state.mode === 'yearly' 
              ? Array.from({ length: 12 }, (_, i) => i + 1)
              : [state.month];
            
            let html = '';
            
            months.forEach(month => {
              html += renderMonth(state.year, month);
            });
            
            output.innerHTML = html;
            
            // Apply classes
            output.className = 'calendar-container';
            if (state.mode === 'yearly') output.classList.add('yearly-view');
            if (state.fontSize !== 'medium') output.classList.add(`font-${state.fontSize}`);
            if (state.compactMode) output.classList.add('compact');
            if (state.highContrast) output.classList.add('high-contrast');
            
            loader.classList.remove('active');
            showToast('Calendar generated successfully!');
          } catch (error) {
            loader.classList.remove('active');
            output.innerHTML = `<div class="alert alert-danger">Error generating calendar: ${error.message}</div>`;
            console.error('Calendar generation error:', error);
          }
        }, 100);
      }
      
      function renderMonth(year, month) {
        const dt = DateTime.fromObject({ year, month, day: 1 }, { zone: state.timezone, locale: state.locale });
        const daysInMonth = dt.daysInMonth;
        const firstDayOfWeek = dt.weekday; // 1=Mon, 7=Sun
        const monthName = dt.toFormat(state.headerFormat, { locale: state.locale });
        
        // Calculate offset based on week start
        let offset = state.weekStart === 1 ? firstDayOfWeek - 1 : firstDayOfWeek === 7 ? 0 : firstDayOfWeek;
        
        // Get weekday names
        const weekdays = [];
        const sampleWeek = DateTime.fromObject({ year: 2025, month: 1, day: state.weekStart === 1 ? 6 : 5 }, { locale: state.locale });
        for (let i = 0; i < 7; i++) {
          weekdays.push(sampleWeek.plus({ days: i }).toFormat('EEE'));
        }
        
        let html = `<div class="calendar-month">`;
        html += `<div class="calendar-header">${monthName}</div>`;
        html += `<div class="calendar-grid ${state.showWeekNumbers ? 'with-week-numbers' : ''}">`;
        
        // Week number header
        if (state.showWeekNumbers) {
          html += `<div class="calendar-cell header">Wk</div>`;
        }
        
        // Weekday headers
        weekdays.forEach(day => {
          html += `<div class="calendar-cell header">${day}</div>`;
        });
        
        // Get holidays for this month
        const monthHolidays = getHolidaysForMonth(year, month);
        
        // Calculate total rows needed
        const totalCells = offset + daysInMonth;
        const rows = Math.ceil(totalCells / 7);
        
        let dayNum = 1;
        for (let row = 0; row < rows; row++) {
          // Week number
          if (state.showWeekNumbers) {
            const weekDate = DateTime.fromObject({ year, month, day: Math.max(1, dayNum) });
            html += `<div class="calendar-cell week-number">W${weekDate.weekNumber}</div>`;
          }
          
          for (let col = 0; col < 7; col++) {
            const cellIndex = row * 7 + col;
            
            if (cellIndex < offset || dayNum > daysInMonth) {
              // Empty cell or other month
              const otherDay = cellIndex < offset 
                ? dt.minus({ days: offset - cellIndex }).day
                : dayNum - daysInMonth;
              html += `<div class="calendar-cell other-month"><div class="day-number">${cellIndex < offset ? dt.minus({ days: offset - cellIndex }).day : dayNum++ - daysInMonth}</div></div>`;
            } else {
              const currentDate = DateTime.fromObject({ year, month, day: dayNum });
              const isWeekend = currentDate.weekday === 6 || currentDate.weekday === 7;
              const isToday = currentDate.hasSame(DateTime.now(), 'day');
              const holiday = monthHolidays.find(h => h.day === dayNum);
              
              let classes = 'calendar-cell';
              if (isWeekend) classes += ' weekend';
              if (isToday) classes += ' today';
              if (holiday) classes += ' holiday';
              
              let ariaLabel = currentDate.toFormat('MMMM d, yyyy', { locale: state.locale });
              if (holiday) ariaLabel += `, ${holiday.name}`;
              
              html += `<div class="${classes}" aria-label="${ariaLabel}">`;
              html += `<div class="day-number">${dayNum}</div>`;
              
              if (holiday && state.showHolidays) {
                html += `<div class="holiday-label">${holiday.name}</div>`;
              }
              
              if (state.showNotes) {
                html += `<div class="notes-area"></div>`;
              }
              
              html += `</div>`;
              dayNum++;
            }
          }
        }
        
        html += `</div></div>`;
        return html;
      }
      
      function getHolidaysForMonth(year, month) {
        if (!state.showHolidays) return [];
        
        let holidayList = [];
        if (state.holidayRegion && state.holidayRegion !== 'custom') {
          holidayList = holidays[state.holidayRegion] || [];
        } else if (state.holidayRegion === 'custom') {
          holidayList = state.customHolidays;
        }
        
        return holidayList
          .filter(h => {
            const [y, m] = h.date.split('-').map(Number);
            return y === year && m === month;
          })
          .map(h => ({
            day: parseInt(h.date.split('-')[2]),
            name: h.name
          }));
      }
      
      async function exportCalendar() {
        try {
          showToast('Loading export libraries...');
          
          // Load html2canvas and jspdf on demand
          if (typeof html2canvas === 'undefined') {
            await loadScript('https://cdn.jsdelivr.net/npm/html2canvas@1.4.1/dist/html2canvas.min.js');
          }
          if (typeof jspdf === 'undefined') {
            await loadScript('https://cdn.jsdelivr.net/npm/jspdf@2.5.1/dist/jspdf.umd.min.js');
          }
          
          const output = document.getElementById('calendarOutput');
          if (!output.innerHTML) {
            showToast('Please generate a calendar first', 'warning');
            return;
          }
          
          showToast('Generating export...');
          
          // Calculate page dimensions in pixels (A4 at 300 DPI)
          const dpi = 300;
          const mmToInch = 0.0393701;
          
          // Determine actual orientation (yearly mode should be portrait, monthly should be landscape)
          const actualOrientation = state.mode === 'yearly' ? 'portrait' : 'landscape';
          
          let pageWidthMM, pageHeightMM;
          if (state.paperSize === 'a4') {
            pageWidthMM = actualOrientation === 'landscape' ? 297 : 210;
            pageHeightMM = actualOrientation === 'landscape' ? 210 : 297;
          } else {
            pageWidthMM = actualOrientation === 'landscape' ? 279.4 : 215.9;
            pageHeightMM = actualOrientation === 'landscape' ? 215.9 : 279.4;
          }
          
          const pageWidthPx = Math.floor(pageWidthMM * mmToInch * dpi);
          const pageHeightPx = Math.floor(pageHeightMM * mmToInch * dpi);
          
          // Temporarily set output size for export
          const originalWidth = output.style.width;
          const originalHeight = output.style.height;
          output.style.width = `${pageWidthPx / 2}px`; // Scale down for html2canvas scale factor
          output.style.height = `${pageHeightPx / 2}px`;
          
          const canvas = await html2canvas(output, {
            scale: 2,
            width: pageWidthPx / 2,
            height: pageHeightPx / 2,
            logging: false,
            useCORS: true,
            backgroundColor: '#ffffff'
          });
          
          // Restore original size
          output.style.width = originalWidth;
          output.style.height = originalHeight;
          
          // PNG export
          const imgData = canvas.toDataURL('image/png');
          const link = document.createElement('a');
          const fileName = state.mode === 'yearly' 
            ? `calendar-${state.year}`
            : `calendar-${state.year}-${String(state.month).padStart(2, '0')}`;
          link.download = `${fileName}-${state.orientation}.png`;
          link.href = imgData;
          link.click();
          
          // PDF export
          const { jsPDF } = jspdf;
          const pdf = new jsPDF({
            orientation: actualOrientation === 'landscape' ? 'l' : 'p',
            unit: 'mm',
            format: state.paperSize === 'a4' ? 'a4' : 'letter'
          });
          
          // Add image to fit exactly on the page with margins
          const margin = 10;
          const imgWidth = pageWidthMM - (margin * 2);
          const imgHeight = pageHeightMM - (margin * 2);
          
          pdf.addImage(imgData, 'PNG', margin, margin, imgWidth, imgHeight);
          pdf.save(`${fileName}-${actualOrientation}.pdf`);
          
          showToast('Export complete! PNG and PDF downloaded.');
        } catch (error) {
          console.error('Export error:', error);
          showToast('Export failed. Try using Print → Save as PDF instead.', 'danger');
        }
      }
      
      function loadScript(src) {
        return new Promise((resolve, reject) => {
          const script = document.createElement('script');
          script.src = src;
          script.onload = resolve;
          script.onerror = reject;
          document.head.appendChild(script);
        });
      }
      
      function shareLink() {
        readFormState();
        const params = new URLSearchParams();
        Object.keys(state).forEach(key => {
          if (key !== 'customHolidays') {
            params.set(key, state[key]);
          }
        });
        
        const url = `${window.location.origin}${window.location.pathname}?${params.toString()}`;
        
        if (navigator.clipboard) {
          navigator.clipboard.writeText(url).then(() => {
            showToast('Link copied to clipboard!');
          }).catch(() => {
            promptCopy(url);
          });
        } else {
          promptCopy(url);
        }
      }
      
      function promptCopy(text) {
        const input = document.createElement('input');
        input.value = text;
        document.body.appendChild(input);
        input.select();
        document.execCommand('copy');
        document.body.removeChild(input);
        showToast('Link copied!');
      }
      
      function resetForm() {
        localStorage.removeItem('calendarState');
        window.location.href = window.location.pathname;
      }
      
      function showToast(message, type = 'success') {
        const container = document.querySelector('.toast-container');
        const toast = document.createElement('div');
        toast.className = `toast align-items-center text-bg-${type} border-0`;
        toast.setAttribute('role', 'alert');
        toast.setAttribute('aria-live', 'assertive');
        toast.setAttribute('aria-atomic', 'true');
        
        toast.innerHTML = `
          <div class="d-flex">
            <div class="toast-body">${message}</div>
            <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
          </div>
        `;
        
        container.appendChild(toast);
        const bsToast = new bootstrap.Toast(toast, { delay: 3000 });
        bsToast.show();
        
        toast.addEventListener('hidden.bs.toast', () => {
          toast.remove();
        });
      }
      
      // Initialize
      initForm();
      
      // Auto-generate calendar on page load
      setTimeout(() => {
        generateCalendar();
      }, 300);
    }
  </script>
<?php include 'footer.php'; ?>


