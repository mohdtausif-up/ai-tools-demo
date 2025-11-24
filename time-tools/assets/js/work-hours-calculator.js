const storage = JSON.parse(localStorage.getItem('workShifts')||'[]');
function save(){ localStorage.setItem('workShifts', JSON.stringify(storage)); }
function add(e){
  e.preventDefault();
  const date = document.getElementById('date').value;
  const start = document.getElementById('start').value;
  const end = document.getElementById('end').value;
  const breakMin = +document.getElementById('break').value;
  const rate = +document.getElementById('rate').value;
  
  const startTime = new Date(`${date}T${start}`);
  const endTime = new Date(`${date}T${end}`);
  let hours = (endTime - startTime) / 1000 / 60 / 60;
  if(hours < 0) hours += 24;
  hours -= breakMin / 60;
  
  storage.push({date, start, end, break: breakMin, rate, hours});
  save();
  e.target.reset();
  render();
}
function remove(i){ storage.splice(i,1); save(); render(); }
function render(){
  const totalHours = storage.reduce((sum, s)=>sum+s.hours, 0);
  const totalEarnings = storage.reduce((sum, s)=>sum+(s.hours*s.rate), 0);
  
  document.getElementById('total').textContent = totalHours.toFixed(2);
  document.getElementById('earnings').textContent = totalEarnings.toFixed(2);
  document.getElementById('shifts').innerHTML = storage.map((s,i)=>`
    <div class="shift-item p-3 mb-2 rounded">
      <div class="d-flex justify-content-between align-items-start">
        <div>
          <strong>${s.date}</strong><br>
          <small class="text-muted">${s.start} - ${s.end} (${s.break}m break)</small><br>
          <small>${s.hours.toFixed(2)}h @ $${s.rate}/hr = $${(s.hours*s.rate).toFixed(2)}</small>
        </div>
        <button class="btn btn-sm btn-outline-danger" onclick="remove(${i})"><i class="bi bi-trash"></i></button>
      </div>
    </div>
  `).join('') || '<p class="text-muted">No shifts yet</p>';
}
render();
