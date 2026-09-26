const c=document.getElementById('c');const ctx=c.getContext('2d');
c.width=window.innerWidth;c.height=window.innerHeight;
window.addEventListener('resize',()=>{c.width=window.innerWidth;c.height=window.innerHeight;});
const particles=[];
function explode(x,y){
  const hue=Math.random()*360;
  for(let i=0;i<60;i++){
    const angle=Math.random()*Math.PI*2;
    const speed=Math.random()*6+1;
    particles.push({x,y,vx:Math.cos(angle)*speed,vy:Math.sin(angle)*speed,
      r:Math.random()*4+1,a:1,color:'hsl('+hue+','+(60+Math.random()*40)+'%,'+(50+Math.random()*30)+'%)'});
  }
}
document.addEventListener('click',e=>explode(e.clientX,e.clientY));
function draw(){
  ctx.clearRect(0,0,c.width,c.height);
  for(let i=particles.length-1;i>=0;i--){
    const p=particles[i];p.x+=p.vx;p.y+=p.vy;p.vy+=.1;p.a-=.015;
    if(p.a<=0){particles.splice(i,1);continue;}
    ctx.globalAlpha=p.a;ctx.beginPath();ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
    ctx.fillStyle=p.color;ctx.fill();
  }
  ctx.globalAlpha=1;requestAnimationFrame(draw);
}
draw();