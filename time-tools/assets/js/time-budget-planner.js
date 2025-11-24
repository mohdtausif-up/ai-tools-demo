const storage = JSON.parse(localStorage.getItem('timeBudget')||'[]');
function save(){ localStorage.setItem('timeBudget', JSON.stringify(storage)); }
function add(e){ e.preventDefault(); storage.push({task:document.getElementById('task').value, hours:+document.getElementById('hours').value}); save(); e.target.reset(); render(); }
function remove(i){ storage.splice(i,1); save(); render(); }
function render(){
  const total = +document.getElementById('totalHours').value;
  const used = storage.reduce((sum,t)=>sum+t.hours, 0);
  document.getElementById('used').textContent = used;
  document.getElementById('total').textContent = total;
  const pct = (used/total)*100;
  document.getElementById('tasks').innerHTML = storage.map((t,i)=>{
    const taskPct = (t.hours/total)*100;
    return `<div class="task-item p-3 mb-2 rounded"><div class="d-flex justify-content-between align-items-start"><div><strong>${t.task}</strong><br><small class="text-muted">${t.hours}h (${taskPct.toFixed(1)}%)</small></div><button class="btn btn-sm btn-outline-danger" onclick="remove(${i})"><i class="bi bi-x"></i></button></div><div class="progress mt-2" style="height:10px"><div class="progress-bar" style="width:${taskPct}%"></div></div></div>`;
  }).join('') + `<div class="mt-3"><strong>Total Budget:</strong> ${pct.toFixed(1)}% used</div>`;
}
render();
