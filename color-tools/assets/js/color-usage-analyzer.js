// Color Usage Analyzer JS
function analyzeUsage() {
  const fileInput = document.getElementById('fileInput');
  if (!fileInput.files.length) {
    document.getElementById('usageResult').innerHTML = '<div class="alert alert-warning">Please select a file.</div>';
    return;
  }
  const formData = new FormData();
  formData.append('action', 'analyze');
  formData.append('file', fileInput.files[0]);
  fetch('color-usage-analyzer.php', {
    method: 'POST',
    body: formData
  })
  .then(res => res.text())
  .then(html => {
    document.getElementById('usageResult').innerHTML = html;
  })
  .catch(() => {
    document.getElementById('usageResult').innerHTML = '<div class="alert alert-danger">Analysis failed.</div>';
  });
}
