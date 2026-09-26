const knob=document.getElementById('knob');
const body=knob.querySelector('.knob-body');
const mark=knob.querySelector('.knob-mark');
const arcFill=document.getElementById('arcFill');
const lbl=document.getElementById('knobLbl');
let val=50,dragging=false,startY=0,startVal=50;
const max=188.5,half=max/2;
function update(v){
  val=Math.max(0,Math.min(100,v));
  const rot=val/100*270-135;
  body.style.transform='rotate('+rot+'deg)';
  const offset=half-(val/100*max*0.75);
  arcFill.style.strokeDashoffset=offset;
  lbl.textContent=Math.round(val);
}
knob.addEventListener('mousedown',e=>{dragging=true;startY=e.clientY;startVal=val;});
document.addEventListener('mousemove',e=>{if(!dragging)return;update(startVal-(e.clientY-startY)/2);});
document.addEventListener('mouseup',()=>dragging=false);
knob.addEventListener('wheel',e=>{e.preventDefault();update(val-(e.deltaY>0?1:-1)*2);},{passive:false});
update(50);