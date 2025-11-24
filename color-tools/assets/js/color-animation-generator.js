// Color Animation Generator JS
function generateAnimation() {
  const colorsInput = document.getElementById('colorsInput').value.trim();
  const animationType = document.getElementById('animationType').value;
  if (!colorsInput) {
    document.getElementById('animationResult').innerHTML = '<div class="alert alert-warning">Please enter colors.</div>';
    return;
  }
  fetch('color-animation-generator.php', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: `action=generate&colors=${encodeURIComponent(colorsInput)}&type=${animationType}`
  })
  .then(res => res.text())
  .then(html => {
    document.getElementById('animationResult').innerHTML = html;
  })
  .catch(() => {
    document.getElementById('animationResult').innerHTML = '<div class="alert alert-danger">Animation generation failed.</div>';
  });
}
