// Color Accessibility Analyzer JS
function analyzeAccessibility() {
  const paletteInput = document.getElementById('paletteInput').value.trim();
  if (!paletteInput) {
    document.getElementById('accessibilityResult').innerHTML = '<div class="alert alert-warning">Please enter palette colors.</div>';
    return;
  }
  fetch('color-accessibility-analyzer.php', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: `action=analyze&palette=${encodeURIComponent(paletteInput)}`
  })
  .then(res => res.text())
  .then(html => {
    document.getElementById('accessibilityResult').innerHTML = html;
  })
  .catch(() => {
    document.getElementById('accessibilityResult').innerHTML = '<div class="alert alert-danger">Analysis failed.</div>';
  });
}
