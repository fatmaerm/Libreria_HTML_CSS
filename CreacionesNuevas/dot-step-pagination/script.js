const steps=document.querySelectorAll('.step');
const pf=document.getElementById('pf');
const prev=document.getElementById('prev');
const next=document.getElementById('next');
let cur=0;
function update(){
  steps.forEach((s,i)=>{
    s.classList.toggle('active',i===cur);
    s.classList.toggle('done',i<cur);
  });
  pf.style.width=(cur/(steps.length-1)*100)+'%';
  prev.disabled=cur===0;next.disabled=cur===steps.length-1;
}
prev.addEventListener('click',()=>{if(cur>0){cur--;update();}});
next.addEventListener('click',()=>{if(cur<steps.length-1){cur++;update();}});
update();