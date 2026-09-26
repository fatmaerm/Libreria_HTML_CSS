function countUp(el){
  const target=+el.dataset.target;const dur=2000;const start=performance.now();
  requestAnimationFrame(function tick(now){
    const pct=Math.min((now-start)/dur,1);
    const ease=1-Math.pow(1-pct,3);
    el.textContent=Math.floor(ease*target).toLocaleString();
    if(pct<1)requestAnimationFrame(tick);
  });
}
const obs=new IntersectionObserver(entries=>{
  entries.forEach(e=>{if(e.isIntersecting){countUp(e.target);obs.unobserve(e.target);}});
},{threshold:.5});
document.querySelectorAll('.count').forEach(el=>obs.observe(el));