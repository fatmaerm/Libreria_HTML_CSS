const slides=document.querySelectorAll('.slide');
const dots=document.querySelectorAll('.cdot');
let cur=0,timer;
function show(n){slides[cur].style.opacity=0;slides[cur].setAttribute('aria-hidden','true');dots[cur].classList.remove('active');
  cur=(n+slides.length)%slides.length;
  slides[cur].style.opacity=1;slides[cur].removeAttribute('aria-hidden');dots[cur].classList.add('active');}
function auto(){timer=setInterval(()=>show(cur+1),3500);}
auto();
document.getElementById('prev').onclick=()=>{clearInterval(timer);show(cur-1);auto()};
document.getElementById('next').onclick=()=>{clearInterval(timer);show(cur+1);auto()};
dots.forEach(d=>d.addEventListener('click',()=>{clearInterval(timer);show(+d.dataset.i);auto()}));