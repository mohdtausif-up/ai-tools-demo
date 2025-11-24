let remaining = 25 * 60; let interval; let isWork = true; let count = 0; let running = false;
function render(){ const m = Math.floor(remaining/60); const s = remaining%60; document.getElementById('timer').textContent = `${m.toString().padStart(2,'0')}:${s.toString().padStart(2,'0')}`; }
function start(){ 
  if(running) return; 
  running=true; 
  interval=setInterval(()=>{ 
    remaining--; 
    render(); 
    if(remaining<=0){ 
      clearInterval(interval); 
      running=false; 
      if(isWork){ 
        count++; 
        document.getElementById('count').textContent=count; 
        remaining=(count%4===0?+document.getElementById('longBreak').value:+document.getElementById('breakMin').value)*60; 
        isWork=false; 
        document.getElementById('status').textContent='Break time!'; 
      }else{ 
        remaining=+document.getElementById('workMin').value*60; 
        isWork=true; 
        document.getElementById('status').textContent='Work time!'; 
      } 
      if('Notification' in window && Notification.permission === 'granted'){
        new Notification('Pomodoro',{body:isWork?'Work session!':'Break time!'});
      }
    }
  },1000); 
}
function pause(){ clearInterval(interval); running=false; }
function reset(){ pause(); remaining=+document.getElementById('workMin').value*60; isWork=true; document.getElementById('status').textContent='Ready to start'; render(); }
render();
