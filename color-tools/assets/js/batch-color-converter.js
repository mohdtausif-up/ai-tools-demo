// Batch Color Converter JS
function convertColors() {
  const colorsInput = document.getElementById('colorsInput').value.trim();
  const targetFormat = document.getElementById('targetFormat').value;
  if (!colorsInput) {
    document.getElementById('convertResult').innerHTML = '<div class="alert alert-warning">Please enter colors.</div>';
    return;
  }
  fetch('batch-color-converter.php', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: `action=convert&colors=${encodeURIComponent(colorsInput)}&format=${targetFormat}`
  })
  .then(res => res.text())
  .then(html => {
    document.getElementById('convertResult').innerHTML = html;
  })
  .catch(() => {
    document.getElementById('convertResult').innerHTML = '<div class="alert alert-danger">Conversion failed.</div>';
  });
}
