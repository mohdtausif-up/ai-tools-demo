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
    <div class="row text-center g-4 mt-2">
      <div class="col-md-6">
        <div class="sun-icon">🌅</div>
        <h3 class="h5">Sunrise</h3>
        <p class="h4">${fmt(times.sunrise)}</p>
        <small class="text-muted">Dawn: ${fmt(times.dawn)}</small>
      </div>
      <div class="col-md-6">
        <div class="sun-icon">🌇</div>
        <h3 class="h5">Sunset</h3>
        <p class="h4">${fmt(times.sunset)}</p>
        <small class="text-muted">Dusk: ${fmt(times.dusk)}</small>
      </div>
      <div class="col-12">
        <p class="text-muted">Solar Noon: ${fmt(times.solarNoon)}</p>
        <p class="text-muted">Daylight: ${Math.round((times.sunset - times.sunrise)/1000/60/60*10)/10} hours</p>
      </div>
    </div>
  `;
};
calc();
