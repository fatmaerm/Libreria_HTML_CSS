const el=document.getElementById('stxt');
const chars='ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&';
const orig=el.dataset.text;
let raf,iter=0;
el.addEventListener('mouseenter',()=>{
  cancelAnimationFrame(raf);iter=0;
  raf=requestAnimationFrame(function tick(){
    el.textContent=orig.split('').map((c,i)=>i<iter?c:chars[Math.floor(Math.random()*chars.length)]).join('');
    if(iter<orig.length){iter+=.3;raf=requestAnimationFrame(tick);}
    else el.textContent=orig;
  });
});