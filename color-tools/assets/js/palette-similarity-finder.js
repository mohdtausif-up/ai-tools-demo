// Palette Similarity Finder JS
function findSimilarPalettes() {
  const paletteInput = document.getElementById('paletteInput').value.trim();
  if (!paletteInput) {
    document.getElementById('similarityResult').innerHTML = '<div class="alert alert-warning">Please enter palette colors.</div>';
    return;
  }
  fetch('palette-similarity-finder.php', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: `action=find&palette=${encodeURIComponent(paletteInput)}`
  })
  .then(res => res.text())
  .then(html => {
    document.getElementById('similarityResult').innerHTML = html;
  })
  .catch(() => {
    document.getElementById('similarityResult').innerHTML = '<div class="alert alert-danger">Failed to find similar palettes.</div>';
  });
}
