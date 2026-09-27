(function(){
var scene=document.getElementById('scene');
var field=document.getElementById('field');
var ring=scene.querySelector('.sakura__ring');
var mq=window.matchMedia('(prefers-reduced-motion: reduce)');

var TAU=Math.PI*2;
var COLORS=[
 ['#ffd0e2','#ff8fb8'],
 ['#ffe6ee','#ffb3cd'],
 ['#fff7f9','#ffc2d8'],
 ['#ffdce8','#f78fb4'],
 ['#fff0f4','#ff9ec2'],
 ['#ffe8f0','#ffa8c6'],
 ['#ffc0d6','#e8709f'],
 ['#ffeef4','#ffa9c4']
];
var pets=[],raf=0,last=0,time=0,startTime=0,live=false;
var W=1,H=1,VR=180,scale=1;
var ptr={x:-1e4,y:-1e4,age:9,act:false};
var strength=0,ringOn=false;

function cl(v,a,b){return v<a?a:(v>b?b:v);}
function rn(a,b){return a+Math.random()*(b-a);}
function setP(el,k,v){el.style.setProperty(k,v);}

function build(){
  var n=cl(Math.round(W*H/34000)+10,16,44),i;
  field.textContent='';
  pets.length=0;
  scale=cl(W/1440,0.74,1.3);
  for(i=0;i<n;i++){
    var p={};
    p.x0=rn(-7,101);
    p.xd=rn(-17,17);
    p.d=rn(8.5,21);
    p.ph=rn(0,p.d);
    p.sa=rn(1.2,6.4);
    p.sw=rn(2,4.8);
    p.swp=Math.random();
    p.t=rn(4.6,11.5);
    p.w=rn(8,19)*scale;
    p.c=COLORS[(Math.random()*COLORS.length)|0];
    p.rate=Math.random();
    p.wob=rn(0,TAU);
    p.k=0;
    p.on=0;
    var el=document.createElement('div');
    el.className='petal';
    var f=document.createElement('div');
    f.className='fall';
    var s=document.createElement('div');
    s.className='sway';
    var b=document.createElement('div');
    b.className='spin';
    s.appendChild(b);
    f.appendChild(s);
    el.appendChild(f);
    field.appendChild(el);
    p.el=el;
    setP(el,'--x0',p.x0.toFixed(2)+'vw');
    setP(el,'--xd',p.xd.toFixed(2)+'vw');
    setP(el,'--d',p.d.toFixed(2)+'s');
    setP(el,'--dl',(-p.ph).toFixed(2)+'s');
    setP(el,'--sa',p.sa.toFixed(2)+'vw');
    setP(el,'--sw',p.sw.toFixed(2)+'s');
    setP(el,'--swd',(-p.sw*p.swp).toFixed(2)+'s');
    setP(el,'--w',p.w.toFixed(1)+'px');
    setP(el,'--t',p.t.toFixed(2)+'s');
    setP(el,'--c1',p.c[0]);
    setP(el,'--c2',p.c[1]);
    setP(el,'--y0',rn(3,97).toFixed(1)+'vh');
    setP(el,'--r0',rn(0,360).toFixed(1)+'deg');
    setP(el,'--ry0',rn(-68,68).toFixed(1)+'deg');
    pets.push(p);
  }
  startTime=performance.now();
}

function measure(){
  W=window.innerWidth;
  H=window.innerHeight;
  VR=cl(Math.min(W,H)*0.3,110,320);
  ring.style.setProperty('--d',(VR*0.92).toFixed(0)+'px');
  setP(ring,'--px',(W*0.5).toFixed(0)+'px');
  setP(ring,'--py',(H*0.5).toFixed(0)+'px');
}

function clearAll(){
  var i;
  for(i=0;i<pets.length;i++){
    if(pets[i].on){
      setP(pets[i].el,'--wx','0px');
      setP(pets[i].el,'--wy','0px');
      setP(pets[i].el,'--wr','0deg');
      pets[i].on=0;
    }
    pets[i].k=0;
  }
  if(ringOn){
    setP(ring,'--vs','0');
    ringOn=false;
  }
}

function loop(ts){
  if(!last)last=ts;
  var dt=(ts-last)/1000;
  last=ts;
  if(dt>0.05)dt=0.05;
  if(dt<=0)dt=1/60;
  time+=dt;
  ptr.age+=dt;
  var tgt=(ptr.act&&ptr.age<0.14)?1:0;
  strength+=(tgt-strength)*Math.min(1,dt*4.6);
  if(strength<0.0015)strength=0;
  if(!ptr.act&&strength<=0){
    raf=0;
    clearAll();
    return;
  }
  var px=ptr.x,py=ptr.y,i,p;
  for(i=0;i<pets.length;i++){
    p=pets[i];
    var pr=(time+p.ph)%p.d/p.d;
    var x=(p.x0+p.xd*pr)*0.01*W;
    var y=(-14+128*pr)*0.01*H;
    x+=Math.sin(TAU*(time/p.sw+p.swp))*(p.sa*0.01*W);
    var k=0;
    if(strength>0.002){
      var dx=x-px,dy=y-py;
      var d=Math.sqrt(dx*dx+dy*dy);
      if(d<VR){
        var f=1-d/VR;
        k=strength*f*f*(0.68+p.rate*0.64);
      }
    }
    p.k+=(k-p.k)*Math.min(1,dt*(3.4+p.rate*5.2));
    if(p.k<0.0015)p.k=0;
    if(p.k>0){
      var dx2=x-px,dy2=y-py;
      var d2=Math.sqrt(dx2*dx2+dy2*dy2)||1;
      var tx=-dy2/d2,ty=dx2/d2;
      var sp=(78+p.rate*26)*p.k;
      sp+=Math.sin(time*3.1+p.wob)*11*p.k;
      var pull=54*p.k;
      setP(p.el,'--wx',(tx*sp-dx2/d2*pull).toFixed(1)+'px');
      setP(p.el,'--wy',(ty*sp-dy2/d2*pull-32*p.k).toFixed(1)+'px');
      setP(p.el,'--wr',(p.k*(280+p.rate*340)).toFixed(1)+'deg');
      p.on=1;
    }else if(p.on){
      setP(p.el,'--wx','0px');
      setP(p.el,'--wy','0px');
      setP(p.el,'--wr','0deg');
      p.on=0;
    }
  }
  setP(ring,'--px',px.toFixed(0)+'px');
  setP(ring,'--py',py.toFixed(0)+'px');
  setP(ring,'--vs',(strength*0.92).toFixed(3));
  ringOn=true;
  raf=requestAnimationFrame(loop);
}

function kick(){
  if(mq.matches||raf)return;
  time=(performance.now()-startTime)/1000;
  last=0;
  raf=requestAnimationFrame(loop);
}

function halt(){
  if(!raf)return;
  cancelAnimationFrame(raf);
  raf=0;
  strength=0;
  clearAll();
}

function init(){
  measure();
  build();
  if(mq.matches){
    clearAll();
    return;
  }
  scene.addEventListener('pointermove',function(ev){
    ptr.x=ev.clientX;
    ptr.y=ev.clientY;
    ptr.age=0;
    ptr.act=true;
    kick();
  },{passive:true});
  scene.addEventListener('pointerdown',function(ev){
    ptr.x=ev.clientX;
    ptr.y=ev.clientY;
    ptr.age=0;
    ptr.act=true;
    strength=Math.max(strength,0.45);
    kick();
  },{passive:true});
  scene.addEventListener('pointerleave',function(){ptr.act=false;});
  window.addEventListener('blur',function(){ptr.act=false;});
  window.addEventListener('resize',function(){
    halt();
    measure();
    build();
  },{passive:true});
  document.addEventListener('visibilitychange',function(){
    if(document.hidden)halt();
  });
  if(mq.addEventListener)mq.addEventListener('change',function(){
    halt();
    if(mq.matches)clearAll();
  });
}

init();
})();
