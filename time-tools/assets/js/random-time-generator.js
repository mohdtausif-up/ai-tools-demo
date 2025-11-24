const today = new Date();
const nextMonth = new Date(today);
nextMonth.setMonth(today.getMonth() + 1);
document.getElementById('fromDate').valueAsDate = today;
document.getElementById('toDate').valueAsDate = nextMonth;

function randomInt(min, max){ return Math.floor(Math.random() * (max - min + 1)) + min; }

window.generate = ()=>{
  const type = document.getElementById('type').value;
  let result;
  
  if(type === 'time'){
    const h = randomInt(0, 23);
    const m = randomInt(0, 59);
    const s = randomInt(0, 59);
    result = `${h.toString().padStart(2,'0')}:${m.toString().padStart(2,'0')}:${s.toString().padStart(2,'0')}`;
  }
  else if(type === 'date'){
    const from = new Date(document.getElementById('fromDate').value);
    const to = new Date(document.getElementById('toDate').value);
    const random = new Date(from.getTime() + Math.random() * (to.getTime() - from.getTime()));
    result = random.toLocaleDateString('en-US', {year:'numeric', month:'long', day:'numeric'});
  }
  else if(type === 'datetime'){
    const from = new Date(document.getElementById('fromDate').value);
    const to = new Date(document.getElementById('toDate').value);
    const random = new Date(from.getTime() + Math.random() * (to.getTime() - from.getTime()));
    result = random.toLocaleString('en-US', {year:'numeric', month:'long', day:'numeric', hour:'2-digit', minute:'2-digit', second:'2-digit'});
  }
  else if(type === 'duration'){
    const hours = randomInt(0, 48);
    const minutes = randomInt(0, 59);
    const seconds = randomInt(0, 59);
    result = `${hours}h ${minutes}m ${seconds}s`;
  }
  
  document.getElementById('result').innerHTML = `<h2 class="display-5 mt-4">${result}</h2>`;
};
