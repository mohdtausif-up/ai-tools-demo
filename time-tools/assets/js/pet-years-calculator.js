window.calc = ()=>{
  const age = +document.getElementById('age').value;
  const type = document.getElementById('type').value;
  if(!age) return;
  
  let humanYears;
  if(type==='dog'){
    if(age<=2) humanYears = age * 10.5;
    else humanYears = 21 + (age-2)*4;
  }else{
    if(age<=2) humanYears = age * 12.5;
    else humanYears = 25 + (age-2)*4;
  }
  
  const emoji = type==='dog'?'🐕':'🐈';
  document.getElementById('result').innerHTML = `
    <h2 class="display-3">${emoji}</h2>
    <p class="lead">${age} ${type} years</p>
    <h3 class="display-4">=</h3>
    <p class="display-5">${humanYears.toFixed(1)}</p>
    <p class="lead">human years</p>
  `;
};
