const c=document.getElementById('c');const ctx=c.getContext('2d');
c.width=300;c.height=200;
const particles=[];
document.getElementById('smokeBtn').addEventListener('click',e=>{
  const r=e.target.getBoundingClientRect();
  const x=r.left+r.width/2-c.getBoundingClientRect().left;
  const y=r.top-c.getBoundingClientRect().top;
  for(let i=0;i<20;i++){
    particles.push({x,y,vx:(Math.random()-.5)*2,vy:-Math.random()*3-1,
      r:Math.random()*12+4,a:1,color:`hsl(${Math.random()*30+10},80%,60%)`});
  }
});
function draw(){
  ctx.clearRect(0,0,300,200);
  for(let i=particles.length-1;i>=0;i--){
    const p=particles[i];
    p.x+=p.vx;p.y+=p.vy;p.r+=.3;p.a-=.02;
    if(p.a<=0){particles.splice(i,1);continue;}
    ctx.globalAlpha=p.a;ctx.beginPath();ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
    ctx.fillStyle=p.color;ctx.fill();
  }
  ctx.globalAlpha=1;requestAnimationFrame(draw);
}
draw();