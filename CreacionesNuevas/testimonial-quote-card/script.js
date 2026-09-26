const data=[
  {text:'This library saved me 3 weeks of work. The components are clean, accessible, and production-ready.',name:'Sara L.',role:'UI Engineer',color:'#6366f1',initial:'SL'},
  {text:'I copy-paste from here constantly. The CSS quality is exceptional — no bloat, no frameworks.',name:'Marco D.',role:'Frontend Dev',color:'#10b981',initial:'MD'},
  {text:'Finally a library that looks modern without 10MB of JS. Pure CSS genius.',name:'Yuki N.',role:'Design Engineer',color:'#f59e0b',initial:'YN'},
];
let idx=0;
const text=document.getElementById('quoteText');
const name=document.getElementById('authorName');
const role=document.getElementById('authorRole');
const av=document.getElementById('authorAvatar');
const dotsEl=document.getElementById('dots');
data.forEach((_,i)=>{const d=document.createElement('div');d.className='dot';d.addEventListener('click',()=>show(i));dotsEl.appendChild(d);});
function show(i){idx=i;const q=data[i];text.textContent=q.text;name.textContent=q.name;role.textContent=q.role;
  av.style.background=q.color;av.textContent=q.initial;
  document.querySelectorAll('.dot').forEach((d,j)=>d.classList.toggle('active',j===i));}
show(0);setInterval(()=>show((idx+1)%data.length),4000);