const thumbs=[...document.querySelectorAll('.thumb')];
const lb=document.getElementById('lb');const item=document.getElementById('lbItem');
const data=thumbs.map(t=>({bg:t.style.background,icon:t.querySelector('span').textContent}));
let cur=0;
function open(i){cur=i;lb.classList.add('open');render();}
function render(){item.style.background=data[cur].bg;item.textContent=data[cur].icon;}
thumbs.forEach((t,i)=>t.addEventListener('click',()=>open(i)));
document.getElementById('lbClose').onclick=()=>lb.classList.remove('open');
document.getElementById('lprev').onclick=()=>{cur=(cur-1+data.length)%data.length;render();};
document.getElementById('lnext').onclick=()=>{cur=(cur+1)%data.length;render();};
lb.addEventListener('click',e=>{if(e.target===lb)lb.classList.remove('open');});