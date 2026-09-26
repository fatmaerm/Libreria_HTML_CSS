const btn=document.getElementById('lfBtn');
const lbl=document.getElementById('lfLabel');
btn.addEventListener('click',()=>{
  if(btn.classList.contains('loading'))return;
  btn.classList.add('loading');lbl.textContent='Uploading…';
  setTimeout(()=>{lbl.textContent='✓ Done!';},2000);
  setTimeout(()=>{btn.classList.remove('loading');lbl.textContent='Upload';},4000);
});