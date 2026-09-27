(function(){
var cv=document.getElementById('water');
var ctx=cv.getContext('2d',{alpha:false});
var soft=document.createElement('canvas');
var sctx=soft.getContext('2d');
var cvc=document.createElement('canvas');
var cctx=cvc.getContext('2d');
var mq=window.matchMedia('(prefers-reduced-motion: reduce)');

var TAU=Math.PI*2;
var W=1,H=1,DPR=1,SS=0.6,cw=2,ch=2,MIN=1,MARGIN=1,TOP=1,BOT=1;
var koi=[],rings=[],motes=[],bubbles=[],cNodes=[];
var veil=null,bg=null;
var time=0,last=0,raf=0,running=false,seeded=false;
var ptr={x:-1e4,y:-1e4,r:0,act:false};
var ptrAge=99;

var PAL=[
 {a:'#ffe9c4',b:'#f5a13c',c:'#a8490f',fin:'rgba(250,196,128,.8)',eye:'#1b1408',spot:null},
 {a:'#ffd9a6',b:'#ef6a1c',c:'#8b2905',fin:'rgba(248,152,82,.76)',eye:'#1b1008',spot:null},
 {a:'#fffaf1',b:'#f1e0c5',c:'#c0955f',fin:'rgba(255,246,232,.84)',eye:'#241a10',spot:['#e8621a','#ef7a26']},
 {a:'#fff4d8',b:'#ffcf72',c:'#a66912',fin:'rgba(255,224,154,.82)',eye:'#1d1408',spot:null},
 {a:'#ffd2a0',b:'#e8801f',c:'#7b2b04',fin:'rgba(242,152,72,.74)',eye:'#1a1008',spot:['#ffd9a0']},
 {a:'#fdfdfb',b:'#e9e2d3',c:'#a8967c',fin:'rgba(255,255,250,.86)',eye:'#221a12',spot:['#d9541a','#f4e6d2']}
];

function cl(v,a,b){return v<a?a:(v>b?b:v);}
function lp(a,b,t){return a+(b-a)*t;}
function wr(a){a=(a+Math.PI)%TAU;if(a<0)a+=TAU;return a-Math.PI;}
function rn(a,b){return a+Math.random()*(b-a);}

function profile(u){
  var a=(u-0.24)/0.30,b=(u-0.90)/0.14;
  return 0.85*Math.exp(-a*a)+0.30*Math.exp(-b*b)+0.05;
}

function makeKoi(n){
  var i,k;
  for(i=0;i<n;i++){
    k={};
    k.pal=PAL[(Math.random()*PAL.length)|0];
    k.len=rn(0.135,0.225)*MIN+44;
    k.hw=k.len*0.086;
    k.x=rn(0,W);
    k.y=rn(TOP,BOT);
    k.ang=rn(0,TAU);
    k.speed=k.len*rn(0.42,0.76);
    k.phase=rn(0,TAU);
    k.freq=rn(3.4,5.6);
    k.amp=rn(0.42,0.9);
    k.base=Math.random();
    k.depth=k.base;
    k.wt=rn(0,3);
    k.tx=k.x;k.ty=k.y;
    k.ringT=rn(0,1.2);
    k.alpha=0.9;
    k.sc=1;
    k.segs=17;
    k.spine=[];
    k.wf=new Float32Array(k.segs);
    k.nx=new Float32Array(k.segs);
    k.ny=new Float32Array(k.segs);
    for(var j=0;j<k.segs;j++){
      k.spine.push({x:k.x,y:k.y});
      k.wf[j]=profile(j/(k.segs-1));
    }
    for(j=0;j<k.segs-1;j++){
      var seg=k.len/(k.segs-1);
      k.spine[j+1].x=k.spine[j].x+Math.cos(k.ang)*seg;
      k.spine[j+1].y=k.spine[j].y+Math.sin(k.ang)*seg;
    }
    koi.push(k);
  }
}

function buildField(){
  motes.length=0;bubbles.length=0;cNodes.length=0;
  var mn=cl(Math.round(W*H/26000)+16,18,72),i;
  for(i=0;i<mn;i++){
    motes.push({x:rn(0,W),y:rn(0,H),r:rn(0.6,2.2),a:rn(0.06,0.3),v:rn(4,17),ph:rn(0,TAU)});
  }
  for(i=0;i<9;i++){
    bubbles.push({x:rn(0,W),y:rn(0,H),r:rn(1.1,3.1),v:rn(11,30),w:rn(0,TAU)});
  }
  for(i=0;i<11;i++){
    cNodes.push({x:Math.random(),y:Math.random(),vx:rn(-0.03,0.03),vy:rn(-0.016,0.03),r:rn(0.10,0.24),ph:rn(0,TAU),sp:rn(0.5,1.7)});
  }
}

function resize(){
  W=window.innerWidth;H=window.innerHeight;
  DPR=Math.min(2,window.devicePixelRatio||1);
  if(W*H>1500000)DPR=Math.min(DPR,1.35);
  SS=0.6;
  cv.width=Math.max(1,Math.round(W*DPR));
  cv.height=Math.max(1,Math.round(H*DPR));
  cv.style.width=W+'px';
  cv.style.height=H+'px';
  ctx.setTransform(DPR,0,0,DPR,0,0);
  soft.width=Math.max(1,Math.round(W*DPR*SS));
  soft.height=Math.max(1,Math.round(H*DPR*SS));
  sctx.setTransform(DPR*SS,0,0,DPR*SS,0,0);
  cw=Math.max(4,Math.round(W/4));
  ch=Math.max(4,Math.round(H/4));
  cvc.width=cw;cvc.height=ch;
  cctx.setTransform(1,0,0,1,0,0);
  MIN=Math.min(W,H);
  MARGIN=MIN*0.055;
  TOP=MARGIN*1.15;
  BOT=H-MARGIN*0.7;
  bg=ctx.createLinearGradient(0,0,0,H);
  bg.addColorStop(0,'#0d3f48');
  bg.addColorStop(0.22,'#0a3038');
  bg.addColorStop(0.58,'#062028');
  bg.addColorStop(1,'#020c10');
  veil=ctx.createLinearGradient(0,0,0,H);
  veil.addColorStop(0,'rgba(16,66,72,0.05)');
  veil.addColorStop(0.34,'rgba(10,52,58,0.18)');
  veil.addColorStop(0.72,'rgba(4,24,29,0.44)');
  veil.addColorStop(1,'rgba(2,12,16,0.72)');
  buildField();
  if(!seeded){
    seeded=true;
    makeKoi(cl(Math.round(W*H/175000)+3,4,8));
    if(mq.matches){
      time=11.4;
      for(var i=0;i<150;i++){step(1/60);}
    }
  }
}

function ring(x,y,s){
  if(rings.length>72)rings.shift();
  rings.push({x:x,y:y,r:rn(2,8),mr:rn(52,132)*s,mt:rn(1.5,2.7),age:0,a:0.52*s,w:rn(0.9,2.1),t:rn(0,TAU),tw:rn(2.2,3.4)});
}

function step(dt){
  time+=dt;
  var i,k,p;
  for(i=0;i<koi.length;i++){
    k=koi[i];
    k.wt-=dt;
    k.base=cl(k.base+rn(-1,1)*0.075*dt,0,1);
    k.depth=lp(k.depth,k.base+Math.sin(time*0.31+i)*0.035,0.55*dt);
    if(k.wt<=0){
      k.wt=rn(2.2,5.6);
      k.tx=cl(k.x+rn(-0.34,0.34)*W,MARGIN*1.2,W-MARGIN*1.2);
      k.ty=cl(lp(TOP,BOT,k.depth)+rn(-0.14,0.14)*H,TOP,BOT);
    }
    var des=Math.atan2(k.ty-k.y,k.tx-k.x);
    var e=MARGIN*2.1;
    if(k.x<e)des=lp(des,0,0.55);
    if(k.x>W-e)des=lp(des,Math.PI,0.55);
    if(k.y<TOP+e*0.42)des=lp(des,Math.PI/2,0.55);
    if(k.y>BOT-e*0.42)des=lp(des,-Math.PI/2,0.55);
    if(ptr.act){
      var dx=k.x-ptr.x,dy=(k.y-ptr.y)*0.65,dd=dx*dx+dy*dy;
      var rr=MIN*0.20;
      if(dd<rr*rr){
        var f=1-Math.sqrt(dd)/rr;
        des+=wr(Math.atan2(dy,dx)-des)*f*0.85;
      }
    }
    k.ang+=cl(wr(des-k.ang),-2.3*dt,2.3*dt);
    k.ang+=Math.sin(k.phase*0.6)*0.2*dt;
    k.x+=Math.cos(k.ang)*k.speed*dt;
    k.y+=Math.sin(k.ang)*k.speed*dt;
    k.phase+=k.freq*dt*(0.8+k.depth*0.5);
    var seg=k.len/(k.segs-1);
    p=k.spine;
    p[0].x=k.x;p[0].y=k.y;
    var ax=Math.cos(k.ang),ay=Math.sin(k.ang);
    for(var j=1;j<k.segs;j++){
      var q=p[j],o=p[j-1];
      var ddx=q.x-o.x,ddy=q.y-o.y;
      var dl=Math.sqrt(ddx*ddx+ddy*ddy)||1;
      var nx=ddx/dl,ny=ddy/dl;
      var sw=Math.sin(k.phase-j*0.46)*k.amp*(j/(k.segs-1))*1.5;
      var ca=Math.cos(sw*1.25),sa=Math.sin(sw*1.25);
      var fx=nx*ca-ny*sa,fy=nx*sa+ny*ca;
      q.x=o.x+fx*seg;
      q.y=o.y+fy*seg;
    }
    k.alpha=lp(0.97,0.16,Math.pow(k.depth,0.85));
    k.sc=1-k.depth*0.13;
    k.ringT-=dt;
    if(k.ringT<=0&&k.depth<0.66){
      k.ringT=rn(0.55,1.5);
      ring(p[0].x,p[0].y,lp(0.35,1,k.depth<0.3?1:0.62));
    }
  }
  for(i=rings.length-1;i>=0;i--){
    var r=rings[i];
    r.age+=dt;
    if(r.age>r.mt)rings.splice(i,1);
  }
  for(i=0;i<motes.length;i++){
    var m=motes[i];
    m.y-=m.v*dt;
    m.x+=Math.sin(time*0.5+m.ph)*5*dt;
    if(m.y<-6){m.y=H+6;m.x=rn(0,W);}
  }
  for(i=0;i<bubbles.length;i++){
    var b=bubbles[i];
    b.y-=b.v*dt;
    b.x+=Math.sin(time*1.4+b.w)*7*dt;
    if(b.y<-8){b.y=H+8;b.x=rn(0,W);}
  }
  if(ptr.act)ptrAge+=dt;
}

function caustics(){
  cctx.clearRect(0,0,cw,ch);
  cctx.globalCompositeOperation='lighter';
  cctx.lineCap='round';
  cctx.lineWidth=Math.max(1.6,cw*0.009);
  for(var i=0;i<cNodes.length;i++){
    var n=cNodes[i];
    n.x+=n.vx;n.y+=n.vy;
    if(n.x<-0.12)n.x=1.12;if(n.x>1.12)n.x=-0.12;
    if(n.y<-0.12)n.y=1.12;if(n.y>1.12)n.y=-0.12;
    var x=n.x*cw,y=n.y*ch,r=n.r*cw,ph=n.ph+time*n.sp;
    cctx.strokeStyle='rgba(158,240,230,0.55)';
    cctx.beginPath();
    cctx.moveTo(x-r,y+Math.sin(ph)*r*0.34);
    cctx.lineTo(x+Math.cos(ph*0.6)*r*0.12,y+Math.cos(ph)*r*0.5-r*0.34);
    cctx.lineTo(x+r,y+Math.cos(ph*1.35)*r*0.34);
    cctx.stroke();
    cctx.strokeStyle='rgba(96,198,196,0.32)';
    cctx.beginPath();
    cctx.moveTo(x,y-r*0.62);
    cctx.quadraticCurveTo(x+Math.sin(ph*0.8)*r*0.55,y,x+Math.cos(ph*0.9)*r*0.72,y+r*0.56);
    cctx.stroke();
  }
  cctx.globalCompositeOperation='destination-in';
  var g=cctx.createLinearGradient(0,0,0,ch);
  g.addColorStop(0,'rgba(0,0,0,1)');
  g.addColorStop(0.5,'rgba(0,0,0,0.5)');
  g.addColorStop(1,'rgba(0,0,0,0.08)');
  cctx.fillStyle=g;
  cctx.fillRect(0,0,cw,ch);
  cctx.globalCompositeOperation='source-over';
}

function drawKoi(g,k){
  var p=k.spine,n=k.segs,i,pal=k.pal;
  for(i=0;i<n;i++){
    var i0=i>0?i-1:0,i1=i<n-1?i+1:n-1;
    var dx=p[i1].x-p[i0].x,dy=p[i1].y-p[i0].y;
    var d=Math.sqrt(dx*dx+dy*dy)||1;
    k.nx[i]=-dy/d;k.ny[i]=dx/d;
  }
  var cx=0,cy=0;
  for(i=0;i<n;i++){cx+=p[i].x;cy+=p[i].y;}
  cx/=n;cy/=n;
  g.save();
  g.translate(cx,cy);
  g.scale(k.sc,k.sc);
  g.translate(-cx,-cy);
  g.globalAlpha=k.alpha;

  g.beginPath();
  for(i=0;i<n;i++){
    var w=k.hw*k.wf[i];
    var vx=p[i].x+k.nx[i]*w,vy=p[i].y+k.ny[i]*w;
    if(i)g.lineTo(vx,vy);else g.moveTo(vx,vy);
  }
  for(i=n-1;i>=0;i--){
    var w2=k.hw*k.wf[i];
    g.lineTo(p[i].x-k.nx[i]*w2,p[i].y-k.ny[i]*w2);
  }
  g.closePath();
  var lg=g.createLinearGradient(p[0].x,p[0].y,p[n-1].x,p[n-1].y);
  lg.addColorStop(0,pal.a);
  lg.addColorStop(0.32,pal.b);
  lg.addColorStop(1,pal.c);
  g.fillStyle=lg;
  g.fill();
  g.lineWidth=1.2;
  g.strokeStyle='rgba(255,242,218,0.16)';
  g.stroke();

  if(pal.spot){
    for(var s=0;s<pal.spot.length;s++){
      var si=Math.round((0.3+s*0.34)*(n-1));
      var ja=si>0?si-1:0,jb=si<n-1?si+1:n-1;
      g.save();
      g.translate(p[si].x,p[si].y);
      g.rotate(Math.atan2(p[jb].y-p[ja].y,p[jb].x-p[ja].x));
      g.globalAlpha=k.alpha*0.92;
      g.fillStyle=pal.spot[s];
      g.beginPath();
      g.ellipse(0,0,k.hw*0.7,k.hw*0.54,0,0,TAU);
      g.fill();
      g.restore();
    }
  }

  var up=k.ny[2]>0?-1:1;
  g.globalAlpha=k.alpha*0.62;
  g.fillStyle=pal.fin;
  g.beginPath();
  g.moveTo(p[2].x+k.nx[2]*up*k.hw*0.6,p[2].y+k.ny[2]*up*k.hw*0.6);
  g.quadraticCurveTo(p[3].x+k.nx[3]*up*k.hw*1.85,p[3].y+k.ny[3]*up*k.hw*1.85,p[5].x+k.nx[5]*up*k.hw*0.4,p[5].y+k.ny[5]*up*k.hw*0.4);
  g.closePath();
  g.fill();

  var fl=Math.sin(k.phase-1.3)*0.55;
  g.save();
  g.translate(p[3].x,p[3].y);
  g.rotate(Math.atan2(p[5].y-p[1].y,p[5].x-p[1].x));
  g.globalAlpha=k.alpha*0.5;
  g.beginPath();
  g.moveTo(0,0);
  g.quadraticCurveTo(-k.len*0.02,k.hw*(1.7+fl*0.4),-k.len*0.085,k.hw*(1.4+fl*0.7));
  g.closePath();
  g.fill();
  g.restore();

  var tip=p[n-1],bas=p[n-3];
  var ta=Math.atan2(tip.y-bas.y,tip.x-bas.x);
  var sp=0.5+0.5*Math.sin(k.phase-(n-1)*0.46);
  var tl=k.len*0.155*(0.8+0.2*sp);
  g.save();
  g.translate(tip.x,tip.y);
  g.rotate(ta);
  g.globalAlpha=k.alpha*0.66;
  g.beginPath();
  g.moveTo(0,0);
  g.quadraticCurveTo(tl*0.55,-k.hw*(0.45+0.85*sp),tl,-k.hw*(0.3+1.45*sp));
  g.quadraticCurveTo(tl*0.6,0,tl,k.hw*(0.3+1.45*sp));
  g.quadraticCurveTo(tl*0.55,k.hw*(0.45+0.85*sp),0,0);
  g.closePath();
  g.fill();
  g.restore();

  var ei=1,ex=k.hw*0.6;
  g.globalAlpha=k.alpha*0.9;
  g.fillStyle=pal.eye;
  g.beginPath();
  g.arc(p[ei].x+k.nx[ei]*ex,p[ei].y+k.ny[ei]*ex,k.hw*0.135,0,TAU);
  g.fill();
  g.beginPath();
  g.arc(p[ei].x-k.nx[ei]*ex,p[ei].y-k.ny[ei]*ex,k.hw*0.135,0,TAU);
  g.fill();
  g.globalAlpha=k.alpha*0.55;
  g.fillStyle='rgba(255,250,235,0.9)';
  g.beginPath();
  g.arc(p[ei].x+k.nx[ei]*ex-k.hw*0.05,p[ei].y+k.ny[ei]*ex-k.hw*0.05,k.hw*0.05,0,TAU);
  g.fill();

  g.globalAlpha=k.alpha*0.4;
  g.strokeStyle=pal.c;
  g.lineWidth=Math.max(0.6,k.hw*0.05);
  g.beginPath();
  g.moveTo(p[0].x+k.nx[0]*k.hw*0.3,p[0].y+k.ny[0]*k.hw*0.3);
  g.lineTo(p[0].x+Math.cos(k.ang)*k.len*0.09+k.nx[0]*k.hw*0.7,p[0].y+Math.sin(k.ang)*k.len*0.09+k.ny[0]*k.hw*0.7);
  g.moveTo(p[0].x-k.nx[0]*k.hw*0.3,p[0].y-k.ny[0]*k.hw*0.3);
  g.lineTo(p[0].x+Math.cos(k.ang)*k.len*0.09-k.nx[0]*k.hw*0.7,p[0].y+Math.sin(k.ang)*k.len*0.09-k.ny[0]*k.hw*0.7);
  g.stroke();

  g.restore();
  g.globalAlpha=1;
}

function render(){
  ctx.setTransform(DPR,0,0,DPR,0,0);
  ctx.fillStyle=bg;
  ctx.fillRect(0,0,W,H);

  sctx.save();
  sctx.setTransform(1,0,0,1,0,0);
  sctx.clearRect(0,0,soft.width,soft.height);
  sctx.restore();

  sctx.globalCompositeOperation='lighter';
  for(var i=0;i<motes.length;i++){
    var m=motes[i];
    sctx.fillStyle='rgba(186,232,226,'+m.a.toFixed(3)+')';
    sctx.beginPath();
    sctx.arc(m.x,m.y,m.r,0,TAU);
    sctx.fill();
  }
  for(i=0;i<bubbles.length;i++){
    var b=bubbles[i];
    var bt=0.5+0.5*Math.sin(time*2.2+b.w);
    sctx.strokeStyle='rgba(200,242,238,'+(0.1+0.14*bt).toFixed(3)+')';
    sctx.lineWidth=1;
    sctx.beginPath();
    sctx.arc(b.x,b.y,b.r,0,TAU);
    sctx.stroke();
  }
  sctx.globalCompositeOperation='source-over';

  var order=koi.slice().sort(function(a,b){return b.depth-a.depth;});
  for(i=0;i<order.length;i++)drawKoi(sctx,order[i]);

  ctx.globalAlpha=0.94;
  ctx.drawImage(soft,0,0,W,H);
  ctx.globalAlpha=1;

  ctx.fillStyle=veil;
  ctx.fillRect(0,0,W,H);

  caustics();
  ctx.globalCompositeOperation='screen';
  ctx.globalAlpha=0.34;
  ctx.drawImage(cvc,0,0,W,H);
  ctx.globalAlpha=1;
  ctx.globalCompositeOperation='source-over';

  for(i=0;i<rings.length;i++){
    var r=rings[i];
    var q=r.age/r.mt;
    var rad=r.r+q*r.mr;
    var a=r.a*(1-q)*(1-q);
    if(a<0.004)continue;
    var tilt=0.24+0.05*Math.sin(time*0.3+r.t);
    var ox=Math.sin(q*4.2+r.t)*rad*0.035;
    ctx.strokeStyle='rgba(174,232,224,'+a.toFixed(3)+')';
    ctx.lineWidth=r.w*(1-q*0.55);
    ctx.beginPath();
    ctx.ellipse(r.x+ox,r.y,rad,rad*tilt,0,0,TAU);
    ctx.stroke();
    ctx.strokeStyle='rgba(232,252,248,'+(a*0.45).toFixed(3)+')';
    ctx.lineWidth=r.w*0.5*(1-q*0.6);
    ctx.beginPath();
    ctx.ellipse(r.x+ox,r.y,rad*0.84,rad*tilt*0.84,0,0,TAU);
    ctx.stroke();
  }

  ctx.globalCompositeOperation='screen';
  for(i=0;i<4;i++){
    var sy=H*(0.06+i*0.035);
    var ph=time*(0.09+i*0.031)+i*1.7;
    var sx=((ph*0.5)%1.4-0.2)*W;
    var sg=ctx.createLinearGradient(sx-0.4*W,0,sx+0.4*W,0);
    sg.addColorStop(0,'rgba(150,220,214,0)');
    sg.addColorStop(0.5,'rgba(180,238,232,'+(0.05+0.03*Math.sin(ph*3)).toFixed(3)+')');
    sg.addColorStop(1,'rgba(150,220,214,0)');
    ctx.fillStyle=sg;
    ctx.fillRect(sx-0.4*W,sy,0.8*W,1.4);
  }
  if(ptr.act&&ptr.r>0.02){
    var pg=ctx.createRadialGradient(ptr.x,ptr.y,0,ptr.x,ptr.y,MIN*0.22);
    pg.addColorStop(0,'rgba(214,250,244,'+(0.11*ptr.r).toFixed(3)+')');
    pg.addColorStop(1,'rgba(214,250,244,0)');
    ctx.fillStyle=pg;
    ctx.fillRect(ptr.x-MIN*0.22,ptr.y-MIN*0.22,MIN*0.44,MIN*0.44);
  }
  ctx.globalCompositeOperation='source-over';
}

function frame(ts){
  if(!last)last=ts;
  var dt=(ts-last)/1000;
  last=ts;
  if(dt>0.06)dt=0.06;
  if(dt<=0)dt=1/60;
  if(ptr.act&&ptrAge>0.075){
    ptr.r=Math.max(0,ptr.r-dt*3.2);
    if(ptr.r<=0)ptr.act=false;
  }else if(ptr.act){
    ptr.r=Math.min(1,ptr.r+dt*5);
  }
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

window.addEventListener('resize',function(){
  resize();
  if(mq.matches)render();
},{passive:true});

window.addEventListener('pointermove',function(ev){
  ptr.x=ev.clientX;ptr.y=ev.clientY;ptr.act=true;ptrAge=0;
  ptr.r=Math.min(1,ptr.r+0.28);
  if(ev.pointerType==='touch'||ev.pointerType==='pen')ptr.r=1;
},{passive:true});

window.addEventListener('pointerdown',function(ev){
  ptr.x=ev.clientX;ptr.y=ev.clientY;ptr.act=true;ptrAge=0;ptr.r=1;
  ring(ptr.x,ptr.y,1.25);
  ring(ptr.x,ptr.y+2,0.85);
},{passive:true});

window.addEventListener('pointerleave',function(){ptr.act=false;ptr.r=0;});
window.addEventListener('blur',function(){ptr.act=false;ptr.r=0;});

document.addEventListener('visibilitychange',function(){
  if(document.hidden)stop();else start();
});

function onMQ(){
  if(mq.matches){
    stop();
    for(var i=0;i<150;i++)step(1/60);
    ptr.act=false;ptr.r=0;
    render();
  }else{
    start();
  }
}

if(mq.addEventListener)mq.addEventListener('change',onMQ);
else if(mq.addListener)mq.addListener(onMQ);

resize();
render();
if(mq.matches){for(var b=0;b<150;b++)step(1/60);render();}
else start();
})();
