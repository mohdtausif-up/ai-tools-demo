document.getElementById('timeInput').addEventListener('change', function() {
  const [h, m] = this.value.split(':').map(Number);
  const h12 = h % 12 || 12;
  const period = h < 12 ? 'AM' : 'PM';
  document.getElementById('result12').textContent = `${h12}:${String(m).padStart(2,'0')} ${period}`;
  document.getElementById('result24').textContent = `${String(h).padStart(2,'0')}:${String(m).padStart(2,'0')}`;
});
document.getElementById('timeInput').value = '12:00';
document.getElementById('timeInput').dispatchEvent(new Event('change'));
