document.querySelectorAll('.count').forEach(el=>{
  const target=+el.dataset.target;const dur=1500;const start=performance.now();
  requestAnimationFrame(function tick(now){
    const pct=Math.min((now-start)/dur,1);
    el.textContent=Math.floor(pct*target).toLocaleString();
    if(pct<1)requestAnimationFrame(tick);
  });
});