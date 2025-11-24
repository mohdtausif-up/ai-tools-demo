// Color Naming AI JS
function suggestColorName() {
  const colorInput = document.getElementById('colorInput').value.trim();
  if (!colorInput) {
    document.getElementById('nameResult').innerHTML = '<div class="alert alert-warning">Please enter a color value.</div>';
    return;
  }
  fetch('color-naming-ai.php', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: `action=suggest&color=${encodeURIComponent(colorInput)}`
  })
  .then(res => res.text())
  .then(html => {
    document.getElementById('nameResult').innerHTML = html;
  })
  .catch(() => {
    document.getElementById('nameResult').innerHTML = '<div class="alert alert-danger">Failed to suggest name.</div>';
  });
}
