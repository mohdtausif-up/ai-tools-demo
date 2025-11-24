const hours = Array.from({length:24},(_, i)=>i);
const days = ['mon','tue','wed','thu','fri','sat','sun'];
const storage = JSON.parse(localStorage.getItem('weeklyPlanner')||'{}');

function save(){ localStorage.setItem('weeklyPlanner', JSON.stringify(storage)); }

const tbody = document.getElementById('schedule');
hours.forEach(h=>{
  const tr = document.createElement('tr');
  tr.innerHTML = `<td class="text-center"><strong>${h.toString().padStart(2,'0')}:00</strong></td>`;
  days.forEach(d=>{
    const key = `${d}-${h}`;
    const td = document.createElement('td');
    td.className = 'time-block';
    td.contentEditable = true;
    td.textContent = storage[key] || '';
    td.addEventListener('blur', ()=>{ storage[key] = td.textContent; save(); });
    tr.appendChild(td);
  });
  tbody.appendChild(tr);
});
