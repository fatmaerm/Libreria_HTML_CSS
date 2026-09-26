const stars=document.querySelectorAll('.star');
const hint=document.getElementById('hint');
const msgs=['Terrible','Poor','OK','Good','Excellent'];
stars.forEach(s=>{
  s.addEventListener('click',()=>{
    const v=+s.dataset.v;
    stars.forEach((x,i)=>x.classList.toggle('active',i<v));
    hint.textContent=msgs[v-1]+'! ('+v+'/5)';
  });
});