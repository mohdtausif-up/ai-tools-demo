// Color Trends Visualizer JS
function fetchTrends() {
  fetch('color-trends-visualizer.php', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: 'action=trends'
  })
  .then(res => res.text())
  .then(html => {
    document.getElementById('trendsResult').innerHTML = html;
  })
  .catch(() => {
    document.getElementById('trendsResult').innerHTML = '<div class="alert alert-danger">Failed to fetch trends.</div>';
  });
}
window.addEventListener('DOMContentLoaded', fetchTrends);
