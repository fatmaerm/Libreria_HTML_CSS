(function(){
var cv=document.getElementById('fx');
var g=cv.getContext('2d');
var fl=document.getElementById('flash');
var mq=window.matchMedia('(prefers-reduced-motion: reduce)');

var TAU=Math.PI*2;
var W=1,H=1,DPR=1,MIN=1,topY=0,baseY=0,rMin=1,rMax=1,ANG=1,lean=0,sway=0,skirt=1;
var parts=[],haze=[],shapes=[],spr=null,legs=null;
var time=0,last=0,raf=0,running=false,ready=false;
var boltPts=null,seq=null,boltAge=0,boltOn=false,boltA=0,boltWait=1.1,flash=0,lastFlash=-1;
var ptr={x:-1e4,y:-1e4,act:false};

function cl(v,a,b){return v<a?a:(v>b?b:v);}
function rn(a,b){return a+Math.random()*(b-a);}

function R(t){return rMin+(rMax-rMin)*Math.pow(t,0.8);}
function CY(t){return topY+(baseY-topY)*Math.pow(t,0.93);}
function CX(t){
  var x=W*0.5+lean*(t-0.5);
  if(ptr.act)x+=cl((ptr.x-W*0.5)*0.06,-rMax*0.16,rMax*0.16)*t;
  return x+Math.sin(time*0.38+t*2.6)*sway*t*t;
}

function mkSprite(){
  var c=document.createElement('canvas');
  c.width=64;c.height=64;
  var x=c.getContext('2d');
  var rg=x.createRadialGradient(32,32,0,32,32,32);
  rg.addColorStop(0,'rgba(232,220,192,1)');
  rg.addColorStop(0.3,'rgba(202,188,156,.6)');
  rg.addColorStop(0.66,'rgba(160,148,120,.18)');
  rg.addColorStop(1,'rgba(140,130,106,0)');
  x.fillStyle=rg;
  x.fillRect(0,0,64,64);
  return c;
}

function mkShape(n){
  var a=[],i;
  for(i=0;i<n;i++){
    var th=i/n*TAU;
    var r=rn(0.56,1);
    a.push([Math.cos(th)*r,Math.sin(th)*r]);
  }
  return a;
}

function respawn(p,spread){
  p.t=spread?rn(-0.04,1.04):rn(0.9,1.05);
  p.rf=0.1+0.9*Math.pow(Math.random(),0.72);
  p.a=Math.random()*TAU;
}

function build(){
  var n=cl(Math.round(W*H/9200)+70,90,250),i,p;
  for(i=0;i<n;i++){
    p={};
    p.dust=Math.random()<0.74;
    p.spd=rn(0.72,1.34);
    p.vt=rn(0.05,0.125);
    p.rot=rn(0,TAU);
    p.rotv=rn(-3.4,3.4);
    p.sh=(Math.random()*shapes.length)|0;
    p.tone=Math.random();
    p.sz=rn(0.6,1.5);
    p.x=0;p.y=0;p.z=0;p.r=0;
    respawn(p,true);
    parts.push(p);
  }
  haze.length=0;
  for(i=0;i<16;i++){
    haze.push({x:rn(0,W),y:rn(0,H),s:rn(0.1,0.42),a:rn(0.02,0.075),v:rn(6,26),front:i>11,ph:rn(0,TAU)});
  }
}

function resize(){
  W=window.innerWidth;H=window.innerHeight;
  DPR=Math.min(2,window.devicePixelRatio||1);
  if(W*H>1500000)DPR=Math.min(DPR,1.35);
  cv.width=Math.max(1,Math.round(W*DPR));
  cv.height=Math.max(1,Math.round(H*DPR));
  cv.style.width=W+'px';
  cv.style.height=H+'px';
  g.setTransform(DPR,0,0,DPR,0,0);
  MIN=Math.min(W,H);
  topY=-0.1*H;
  baseY=0.84*H;
  rMax=cl(MIN*0.46,W*0.3,Math.max(70,MIN*0.52));
  rMin=Math.max(5,rMax*0.085);
  ANG=rMax*2.5;
  lean=rMax*0.92;
  sway=rMax*0.3;
  skirt=rMax*1.5;
  if(!ready){
    ready=true;
    shapes.push(mkShape(5),mkShape(6),mkShape(7),mkShape(4),mkShape(6),mkShape(5));
    spr=mkSprite();
  }
  build();
  legs=new Float32Array(40);
  var i;
  for(i=0;i<legs.length;i++)legs[i]=rn(0,1);
}

function makeBolt(){
  var pts=[],n=15,i,t;
  for(i=0;i<=n;i++){
    t=i/n;
    pts.push({x:CX(t*0.95)+rn(-1,1)*rMax*0.26*(1-t*0.45),y:topY+(baseY-topY)*Math.pow(t,0.95)});
  }
  for(var pass=0;pass<2;pass++){
    var out=[pts[0]],i;
    for(i=1;i<pts.length;i++){
      var a=pts[i-1],b=pts[i];
      out.push({x:(a.x+b.x)*0.5+rn(-1,1)*rMax*0.075,y:(a.y+b.y)*0.5+rn(-1,1)*rMax*0.05});
      out.push(b);
    }
    pts=out;
  }
  var br=[],k;
  for(k=0;k<3;k++){
    var idx=(Math.random()*(pts.length-6))|0;
    var st=pts[idx],seg=[st],cx=st.x,cy=st.y,m;
    for(m=0;m<4;m++){
      cx+=rn(-1,1)*rMax*0.34;
      cy+=rn(-1,1)*rMax*0.2;
      seg.push({x:cx,y:cy});
    }
    br.push(seg);
  }
  return {main:pts,br:br,seed:rn(0,TAU)};
}

function fireBolt(){
  boltPts=makeBolt();
  seq=[];
  var t=0,i,n=3+((Math.random()*3)|0);
  for(i=0;i<n;i++){
    var d=rn(0.045,0.115);
    seq.push({a:t,b:t+d,v:rn(0.4,1)});
    t+=d+rn(0.02,0.1);
  }
  boltAge=0;
  boltOn=true;
  boltA=0;
  boltWait=rn(3.4,8.6);
}

function step(dt){
  time+=dt;
  var i,p,t,r;
  for(i=0;i<parts.length;i++){
    p=parts[i];
    p.t-=p.vt*dt*(1+p.rf*0.45);
    if(p.t<-0.09)respawn(p,false);
    r=R(p.t)*(0.1+0.9*p.rf);
    p.r=r;
    p.a+=(ANG/(r+rMin*0.3))*p.spd*dt;
    p.rot+=p.rotv*dt;
    p.z=Math.sin(p.a);
    p.x=CX(p.t)+Math.cos(p.a)*r;
    p.y=CY(p.t)+p.z*r*0.24;
  }
  for(i=0;i<haze.length;i++){
    var z=haze[i];
    z.x+=z.v*dt;
    z.y+=Math.sin(time*0.4+z.ph)*4*dt;
    if(z.x>W+MIN*0.4)z.x=-MIN*0.4;
    if(z.x<-MIN*0.4)z.x=W+MIN*0.4;
  }
  boltWait-=dt;
  if(boltWait<=0&&!mq.matches)fireBolt();
  if(boltOn){
    boltAge+=dt;
    var a=0;
    for(i=0;i<seq.length;i++){
      var s=seq[i];
      if(boltAge>=s.a&&boltAge<s.b&&s.v>a)a=s.v;
    }
    boltA=a;
    if(boltAge>seq[seq.length-1].b+0.14){
      boltOn=false;
      boltA=0;
      boltPts=null;
    }
  }else{
    boltA=0;
  }
  flash*=Math.exp(-dt*6.2);
  if(boltA>0)flash=Math.max(flash,boltA*0.66);
}

function drawFunnel(){
  var i,t,r,x,y,ph=time*1.05;
  g.beginPath();
  for(i=0;i<=30;i++){
    t=i/30;
    x=CX(t)-R(t);
    y=CY(t);
    if(i)g.lineTo(x,y);else g.moveTo(x,y);
  }
  for(i=30;i>=0;i--){
    t=i/30;
    g.lineTo(CX(t)+R(t),CY(t));
  }
  g.closePath();
  var lg=g.createLinearGradient(0,topY,0,baseY);
  lg.addColorStop(0,'rgba(20,24,36,0.5)');
  lg.addColorStop(0.42,'rgba(28,32,44,0.44)');
  lg.addColorStop(0.78,'rgba(46,44,40,0.4)');
  lg.addColorStop(1,'rgba(86,74,50,0.34)');
  g.fillStyle=lg;
  g.fill();

  for(i=0;i<34;i++){
    t=i/33;
    r=R(t);
    x=CX(t);
    y=CY(t);
    var rr=r*0.22;
    g.lineWidth=Math.max(0.5,r*0.05);
    for(var k=0;k<3;k++){
      var a0=ph+t*7.5+k*TAU/3+legs[(i+k)%legs.length]*0.9;
      g.globalAlpha=0.055+0.055*(1-t);
      g.strokeStyle=k===0?'rgba(148,160,184,1)':'rgba(108,116,140,1)';
      g.beginPath();
      g.ellipse(x,y,r,rr,0,a0,a0+0.92);
      g.stroke();
    }
  }

  g.globalCompositeOperation='lighter';
  g.lineCap='round';
  for(i=0;i<6;i++){
    var turn=2.4+i*0.42;
    g.beginPath();
    for(var j=0;j<=26;j++){
      var tt=j/26;
      var rr2=R(tt)*0.92;
      var aa=ph*0.55*legSign(i)+tt*TAU*turn+legs[i]*TAU;
      var px=CX(tt)+Math.cos(aa)*rr2;
      var py=CY(tt)+Math.sin(aa)*rr2*0.24;
      if(j)g.lineTo(px,py);else g.moveTo(px,py);
    }
    g.strokeStyle='rgba(178,168,140,'+(0.05+0.05*Math.sin(i*1.7)).toFixed(3)+')';
    g.lineWidth=Math.max(0.6,rMax*0.012);
    g.stroke();
  }
  g.globalCompositeOperation='source-over';

  g.globalAlpha=1;
  g.beginPath();
  g.moveTo(CX(0)-rMin,topY);
  g.lineTo(CX(1)-rMin*2.1,baseY);
  g.lineTo(CX(1)+rMin*2.1,baseY);
  g.lineTo(CX(0)+rMin,topY);
  g.closePath();
  var cg=g.createLinearGradient(0,topY,0,baseY);
  cg.addColorStop(0,'rgba(14,17,26,0.62)');
  cg.addColorStop(0.6,'rgba(18,21,30,0.5)');
  cg.addColorStop(1,'rgba(30,30,32,0.4)');
  g.fillStyle=cg;
  g.fill();
}

function legSign(i){return i&1?1:-1;}

function drawSkirt(){
  var x=CX(1),y=baseY,r=skirt;
  var grd=g.createRadialGradient(x,y,0,x,y,r);
  grd.addColorStop(0,'rgba(150,128,88,0.4)');
  grd.addColorStop(0.42,'rgba(104,90,62,0.22)');
  grd.addColorStop(1,'rgba(70,62,44,0)');
  g.fillStyle=grd;
  g.beginPath();
  g.ellipse(x,y,r,r*0.3,0,0,TAU);
  g.fill();
  g.globalCompositeOperation='lighter';
  for(var i=0;i<3;i++){
    var t=time*1.6+i*2.1;
    g.strokeStyle='rgba(178,158,116,'+(0.05+0.04*Math.sin(t)).toFixed(3)+')';
    g.lineWidth=Math.max(0.6,rMax*0.02);
    g.beginPath();
    g.ellipse(x,y,r*(0.72+i*0.16),r*(0.72+i*0.16)*0.3,0,t%TAU,(t%TAU)+2.1);
    g.stroke();
  }
  g.globalCompositeOperation='source-over';
}

function drawBolt(){
  if(!boltOn||boltA<=0.01||!boltPts)return;
  var i,j;
  var main=boltPts.main,br=boltPts.br;
  g.globalCompositeOperation='lighter';
  g.lineJoin='round';
  g.lineCap='round';
  var passes=[[16,0.045],[8,0.1],[3.4,0.3],[1.4,0.9]];
  for(i=0;i<passes.length;i++){
    g.lineWidth=passes[i][0];
    g.strokeStyle='rgba('+(i<2?'150,186,244':'226,238,255')+','+(passes[i][1]*boltA).toFixed(3)+')';
    g.beginPath();
    for(j=0;j<main.length;j++){
      if(j)g.lineTo(main[j].x,main[j].y);else g.moveTo(main[j].x,main[j].y);
    }
    g.stroke();
    for(var b=0;b<br.length;b++){
      g.beginPath();
      for(j=0;j<br[b].length;j++){
        if(j)g.lineTo(br[b][j].x,br[b][j].y);else g.moveTo(br[b][j].x,br[b][j].y);
      }
      g.stroke();
    }
  }
  var gr=g.createRadialGradient(CX(0.5),CY(0.5),0,CX(0.5),CY(0.5),rMax*1.6);
  gr.addColorStop(0,'rgba(150,182,238,'+(0.2*boltA).toFixed(3)+')');
  gr.addColorStop(0.5,'rgba(110,140,200,'+(0.07*boltA).toFixed(3)+')');
  gr.addColorStop(1,'rgba(90,120,180,0)');
  g.fillStyle=gr;
  g.beginPath();
  g.arc(CX(0.5),CY(0.5),rMax*1.6,0,TAU);
  g.fill();
  g.globalCompositeOperation='source-over';
}

function render(){
  g.setTransform(DPR,0,0,DPR,0,0);
  g.clearRect(0,0,W,H);
  var i,z;
  for(i=0;i<haze.length;i++){
    if(haze[i].front)continue;
    z=haze[i];
    g.globalAlpha=z.a;
    var s=z.s*MIN;
    g.drawImage(spr,z.x-s*0.5,z.y-s*0.5,s,s);
  }
  g.globalAlpha=1;
  drawFunnel();
  parts.sort(function(a,b){return a.z-b.z;});
  for(i=0;i<parts.length;i++){
    var p=parts[i];
    if(p.dust){
      var s=p.sz*Math.min(rMax*0.24,9)*(0.42+p.rf*0.9);
      var dep=0.4+0.6*Math.abs(p.z);
      g.globalCompositeOperation='lighter';
      g.globalAlpha=cl(0.1+0.2*p.tone*dep,0,0.42)*(0.5+p.rf*0.6);
      g.drawImage(spr,p.x-s*0.5,p.y-s*0.5,s,s);
      g.globalCompositeOperation='source-over';
    }else{
      var sc=p.sz*Math.min(rMax*0.085,4.2)*(0.4+p.rf*0.85);
      var sh=shapes[p.sh];
      var lit=0.35+0.65*cl(p.z*0.5+0.5,0,1);
      g.save();
      g.translate(p.x,p.y);
      g.rotate(p.rot);
      g.beginPath();
      for(var k=0;k<sh.length;k++){
        if(k)g.lineTo(sh[k][0]*sc,sh[k][1]*sc*0.82);else g.moveTo(sh[k][0]*sc,sh[k][1]*sc*0.82);
      }
      g.closePath();
      g.globalAlpha=0.42+0.5*lit;
      g.fillStyle='rgb('+(28+p.tone*26|0)+','+(30+p.tone*24|0)+','+(38+p.tone*22|0)+')';
      g.fill();
      g.globalAlpha=0.3+0.55*lit;
      g.strokeStyle=p.z>0?'rgba(196,214,244,0.9)':'rgba(120,134,166,0.7)';
      g.lineWidth=Math.max(0.5,sc*0.1);
      g.stroke();
      g.restore();
    }
  }
  g.globalAlpha=1;
  drawSkirt();
  for(i=0;i<haze.length;i++){
    if(!haze[i].front)continue;
    z=haze[i];
    g.globalAlpha=z.a*0.85;
    var s2=z.s*MIN*1.4;
    g.drawImage(spr,z.x-s2*0.5,z.y-s2*0.5,s2,s2);
  }
  g.globalAlpha=1;
  drawBolt();
  if(flash>0.004){
    var fg=g.createLinearGradient(0,0,0,H);
    fg.addColorStop(0,'rgba(150,178,226,'+(flash*0.1).toFixed(3)+')');
    fg.addColorStop(0.5,'rgba(120,146,196,'+(flash*0.05).toFixed(3)+')');
    fg.addColorStop(1,'rgba(90,112,158,0)');
    g.fillStyle=fg;
    g.fillRect(0,0,W,H);
  }
  var v=Math.round(flash*1000)/1000;
  if(v!==lastFlash){
    lastFlash=v;
    fl.style.opacity=v;
  }
}

function frame(ts){
  if(!last)last=ts;
  var dt=(ts-last)/1000;
  last=ts;
  if(dt>0.06)dt=0.06;
  if(dt<=0)dt=1/60;
  step(dt);
  render();
  raf=requestAnimationFrame(frame);
}

function start(){
  if(running||mq.matches)return;
  running=true;
  last=0;
  raf=requestAnimationFrame(frame);
}

function stop(){
  running=false;
  if(raf)cancelAnimationFrame(raf);
  raf=0;
}

function staticFrame(){
  var i;
  for(i=0;i<90;i++)step(1/60);
  boltOn=false;
  boltA=0;
  boltPts=null;
  flash=0.16;
  render();
  lastFlash=-1;
  var v=Math.round(flash*1000)/1000;
  if(v!==lastFlash){
    lastFlash=v;
    fl.style.opacity=v;
  }
}

window.addEventListener('resize',function(){
  resize();
  if(mq.matches)staticFrame();
},{passive:true});

window.addEventListener('pointermove',function(ev){
  ptr.x=ev.clientX;ptr.y=ev.clientY;ptr.act=true;
},{passive:true});

window.addEventListener('pointerleave',function(){ptr.act=false;});
window.addEventListener('blur',function(){ptr.act=false;});

document.addEventListener('visibilitychange',function(){
  if(document.hidden)stop();else start();
});

function onMQ(){
  if(mq.matches){
    stop();
    boltWait=9;
    staticFrame();
  }else{
    boltWait=1.2;
    flash=0;
    start();
  }
}

if(mq.addEventListener)mq.addEventListener('change',onMQ);
else if(mq.addListener)mq.addListener(onMQ);

resize();
if(mq.matches)staticFrame();
else start();
})();
