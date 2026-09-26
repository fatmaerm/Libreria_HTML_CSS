const fill=document.getElementById('fill');
const cur=document.getElementById('cur');
const playBtn=document.getElementById('play');
const album=document.getElementById('album');
let playing=false,pct=0,raf;
const duration=222;
playBtn.addEventListener('click',()=>{
  playing=!playing;playBtn.textContent=playing?'⏸':'▶';
  album.classList.toggle('spin',playing);
  if(playing) tick();else cancelAnimationFrame(raf);
});
function tick(){
  pct=Math.min(pct+.02,100);
  fill.style.width=pct+'%';
  const s=Math.round(pct/100*duration);
  cur.textContent=Math.floor(s/60)+':'+(s%60+'').padStart(2,'0');
  if(pct<100)raf=requestAnimationFrame(tick);
  else{playing=false;playBtn.textContent='▶';album.classList.remove('spin');}
}
document.getElementById('prev').addEventListener('click',()=>{pct=0;fill.style.width='0%';cur.textContent='0:00'});
document.getElementById('next').addEventListener('click',()=>{pct=100;fill.style.width='100%'});