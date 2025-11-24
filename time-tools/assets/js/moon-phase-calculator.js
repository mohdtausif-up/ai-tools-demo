document.getElementById('date').valueAsDate = new Date();
const phases = [
  {name:'New Moon', emoji:'🌑', start:0, end:0.03},
  {name:'Waxing Crescent', emoji:'🌒', start:0.03, end:0.22},
  {name:'First Quarter', emoji:'🌓', start:0.22, end:0.28},
  {name:'Waxing Gibbous', emoji:'🌔', start:0.28, end:0.47},
  {name:'Full Moon', emoji:'🌕', start:0.47, end:0.53},
  {name:'Waning Gibbous', emoji:'🌖', start:0.53, end:0.72},
  {name:'Last Quarter', emoji:'🌗', start:0.72, end:0.78},
  {name:'Waning Crescent', emoji:'🌘', start:0.78, end:1.0}
];
function getMoonPhase(date){
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  
  let c, e, jd, b;
  if(month < 3){
    year--;
    month += 12;
  }
  ++month;
  c = 365.25 * year;
  e = 30.6 * month;
  jd = c + e + day - 694039.09;
  jd /= 29.5305882;
  b = parseInt(jd);
  jd -= b;
  b = Math.round(jd * 8);
  if(b >= 8) b = 0;
  
  return jd;
}
window.calc = ()=>{
  const date = new Date(document.getElementById('date').value);
  const phase = getMoonPhase(date);
  const phaseInfo = phases.find(p => phase >= p.start && phase < p.end) || phases[0];
  const illumination = phase < 0.5 ? phase * 2 : (1 - phase) * 2;
  
  document.getElementById('result').innerHTML = `
    <div class="moon">${phaseInfo.emoji}</div>
    <h2 class="h3 mt-3">${phaseInfo.name}</h2>
    <p class="text-muted">Illumination: ${(illumination * 100).toFixed(1)}%</p>
    <p class="small text-muted">Phase: ${(phase * 100).toFixed(1)}%</p>
  `;
};
calc();
