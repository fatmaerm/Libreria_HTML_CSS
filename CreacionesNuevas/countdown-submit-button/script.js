const btn=document.getElementById('cdBtn');
const arc=document.getElementById('arc');
const lbl=document.getElementById('cdLabel');
const total=125.6;let timer,elapsed=0,raf;
const dur=2000;
btn.addEventListener('mousedown',start);
btn.addEventListener('touchstart',start,{passive:true});
document.addEventListener('mouseup',cancel);
document.addEventListener('touchend',cancel);
function start(){
  elapsed=0;const t0=performance.now();
  raf=requestAnimationFrame(function tick(now){
    elapsed=now-t0;
    const pct=Math.min(elapsed/dur,1);
    arc.style.strokeDashoffset=total*(1-pct);
    const remaining=Math.ceil((dur-elapsed)/1000);
    lbl.textContent=pct<1?'Hold… '+remaining+'s':'✓ Submitted!';
    if(pct<1)raf=requestAnimationFrame(tick);
    else btn.classList.add('done');
  });
}
function cancel(){
  cancelAnimationFrame(raf);
  if(!btn.classList.contains('done')){
    arc.style.strokeDashoffset=total;lbl.textContent='Hold to Submit';
  }
}