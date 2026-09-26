const modes=[{label:'Work',dur:25*60,color:'#6366f1'},{label:'Break',dur:5*60,color:'#10b981'}];
let modeIdx=0,session=1,remaining=modes[0].dur,running=false,timer;
const circ=326.7;
const timeEl=document.getElementById('pomoTime');const modeEl=document.getElementById('modeLabel');
const ring=document.getElementById('ringFill');const sessEl=document.getElementById('sess');
function fmt(s){return Math.floor(s/60)+':'+(s%60+'').padStart(2,'0');}
function update(){
  const m=modes[modeIdx];const pct=remaining/m.dur;
  timeEl.textContent=fmt(remaining);
  ring.style.strokeDashoffset=circ*(1-pct);ring.style.stroke=m.color;
  modeEl.textContent=m.label;sessEl.textContent=session;
}
document.getElementById('pStart').addEventListener('click',function(){
  if(running){clearInterval(timer);running=false;this.textContent='▶';}
  else{timer=setInterval(()=>{if(--remaining<=0)skip();update();},1000);running=true;this.textContent='⏸';}
});
document.getElementById('pReset').addEventListener('click',()=>{clearInterval(timer);running=false;
  remaining=modes[modeIdx].dur;document.getElementById('pStart').textContent='▶';update();});
document.getElementById('pSkip').addEventListener('click',skip);
function skip(){clearInterval(timer);running=false;document.getElementById('pStart').textContent='▶';
  modeIdx=(modeIdx+1)%2;if(modeIdx===0)session=Math.min(session+1,4);remaining=modes[modeIdx].dur;update();}
update();