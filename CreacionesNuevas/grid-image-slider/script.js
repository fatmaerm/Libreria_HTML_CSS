const slides=document.querySelectorAll('.gslide');
const dots=document.querySelectorAll('.gdot');
let cur=0;
function show(n){cur=(n+slides.length)%slides.length;
  document.getElementById('gtrack').style.transform='translateX(-'+cur*100+'%)';
  dots.forEach((d,i)=>d.classList.toggle('active',i===cur));}
document.getElementById('gprev').onclick=()=>show(cur-1);
document.getElementById('gnext').onclick=()=>show(cur+1);
dots.forEach(d=>d.addEventListener('click',()=>show(+d.dataset.i)));