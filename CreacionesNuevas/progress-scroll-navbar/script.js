const bar=document.getElementById('sb');
window.addEventListener('scroll',()=>{
  const doc=document.documentElement;
  const pct=doc.scrollTop/(doc.scrollHeight-doc.clientHeight)*100;
  bar.style.width=pct+'%';
});