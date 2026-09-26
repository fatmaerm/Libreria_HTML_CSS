let guests=2;const gc=document.getElementById('guestCount');
document.getElementById('rinc').onclick=()=>{if(guests<12){guests++;gc.textContent=guests;}};
document.getElementById('rdec').onclick=()=>{if(guests>1){guests--;gc.textContent=guests;}};
document.getElementById('resForm').addEventListener('submit',e=>{
  e.preventDefault();
  document.getElementById('resForm').querySelectorAll('button[type=submit]')[0].hidden=true;
  document.getElementById('resOk').removeAttribute('hidden');
});