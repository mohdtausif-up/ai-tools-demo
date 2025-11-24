document.getElementById('date').valueAsDate = new Date();
window.getLocation = ()=>{
  if('geolocation' in navigator){
    navigator.geolocation.getCurrentPosition(pos=>{
      document.getElementById('lat').value = pos.coords.latitude.toFixed(4);
      document.getElementById('lng').value = pos.coords.longitude.toFixed(4);
      calc();
    });
  }
};
window.calc = ()=>{
  const lat = +document.getElementById('lat').value;
  const lng = +document.getElementById('lng').value;
  const date = new Date(document.getElementById('date').value);
  const times = SunCalc.getTimes(date, lat, lng);
  const fmt = t => t.toLocaleTimeString('en-US', {hour:'2-digit', minute:'2-digit'});
  
  document.getElementById('result').innerHTML = `
    <div class="golden-box text-center mb-3">
      <h2 class="h4 mb-3">🌅 Morning Golden Hour</h2>
      <p class="h5">${fmt(times.dawn)} - ${fmt(times.goldenHourEnd)}</p>
      <small>Best light for photography after sunrise</small>
    </div>
    <div class="golden-box text-center">
      <h2 class="h4 mb-3">🌇 Evening Golden Hour</h2>
      <p class="h5">${fmt(times.goldenHour)} - ${fmt(times.dusk)}</p>
      <small>Best light for photography before sunset</small>
    </div>
    <div class="mt-3 text-center">
      <p class="text-muted">Blue Hour: ${fmt(times.nauticalDawn)} - ${fmt(times.dawn)} (morning) & ${fmt(times.dusk)} - ${fmt(times.nauticalDusk)} (evening)</p>
    </div>
  `;
};
calc();
