document.getElementById('cform').addEventListener('submit',e=>{
  e.preventDefault();
  const btn=document.getElementById('csend');
  btn.disabled=true;btn.querySelector('#cslbl').textContent='Sending…';
  setTimeout(()=>{
    btn.hidden=true;document.getElementById('csuccess').removeAttribute('hidden');
  },1500);
});