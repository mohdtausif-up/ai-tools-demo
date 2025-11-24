function convert() {
  const val = Number(document.getElementById('value').value) || 0;
  const from = document.getElementById('from').value;
  let seconds = 0;
  if (from === 'seconds') seconds = val;
  else if (from === 'minutes') seconds = val * 60;
  else if (from === 'hours') seconds = val * 3600;
  else if (from === 'days') seconds = val * 86400;
  document.getElementById('seconds').textContent = seconds;
  document.getElementById('minutes').textContent = (seconds / 60).toFixed(2);
  document.getElementById('hours').textContent = (seconds / 3600).toFixed(4);
  document.getElementById('days').textContent = (seconds / 86400).toFixed(6);
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = Math.floor(seconds % 60);
  document.getElementById('formatted').textContent = `${String(h).padStart(2,'0')}:${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`;
}
convert();
