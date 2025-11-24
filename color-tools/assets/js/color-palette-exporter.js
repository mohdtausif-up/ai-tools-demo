// Color Palette Exporter JS
function exportPalette() {
  const paletteInput = document.getElementById('paletteInput').value.trim();
  const format = document.getElementById('exportFormat').value;
  if (!paletteInput) {
    document.getElementById('exportResult').innerHTML = '<div class="alert alert-warning">Please enter palette colors.</div>';
    return;
  }
  fetch('color-palette-exporter.php', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: `action=export&palette=${encodeURIComponent(paletteInput)}&format=${format}`
  })
  .then(res => res.text())
  .then(html => {
    document.getElementById('exportResult').innerHTML = html;
  })
  .catch(() => {
    document.getElementById('exportResult').innerHTML = '<div class="alert alert-danger">Export failed.</div>';
  });
}
