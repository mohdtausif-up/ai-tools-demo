const signs = [
  {name:'Capricorn', emoji:'♑', start:[12,22], end:[1,19]},
  {name:'Aquarius', emoji:'♒', start:[1,20], end:[2,18]},
  {name:'Pisces', emoji:'♓', start:[2,19], end:[3,20]},
  {name:'Aries', emoji:'♈', start:[3,21], end:[4,19]},
  {name:'Taurus', emoji:'♉', start:[4,20], end:[5,20]},
  {name:'Gemini', emoji:'♊', start:[5,21], end:[6,20]},
  {name:'Cancer', emoji:'♋', start:[6,21], end:[7,22]},
  {name:'Leo', emoji:'♌', start:[7,23], end:[8,22]},
  {name:'Virgo', emoji:'♍', start:[8,23], end:[9,22]},
  {name:'Libra', emoji:'♎', start:[9,23], end:[10,22]},
  {name:'Scorpio', emoji:'♏', start:[10,23], end:[11,21]},
  {name:'Sagittarius', emoji:'♐', start:[11,22], end:[12,21]}
];
window.calc = ()=>{
  const val = document.getElementById('birth').value;
  if(!val) return;
  const date = new Date(val);
  const month = date.getMonth() + 1;
  const day = date.getDate();
  
  const sign = signs.find(s=>{
    if(s.start[0]===s.end[0]) return month===s.start[0] && day>=s.start[1] && day<=s.end[1];
    return (month===s.start[0] && day>=s.start[1]) || (month===s.end[0] && day<=s.end[1]);
  });
  
  document.getElementById('result').innerHTML = `
    <div class="zodiac">${sign.emoji}</div>
    <h2 class="h3">${sign.name}</h2>
    <p class="text-muted">${sign.start[0]}/${sign.start[1]} - ${sign.end[0]}/${sign.end[1]}</p>
  `;
};
