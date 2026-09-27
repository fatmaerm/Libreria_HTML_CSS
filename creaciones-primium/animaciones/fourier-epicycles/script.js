const TAU=Math.PI*2;
const P_HARM=320;
const SAMPLES=2048;
const GHOST_STEPS=440;
const TRAIL_CAP=1600;
const DRAW_T=12.6,HOLD_T=1.7,FADE_T=1.5;
const CYCLE_T=DRAW_T+HOLD_T+FADE_T;
const PITCH=0.82;
const WORD="FOURIER";

const canvas=document.getElementById("plot");
const ctx=canvas.getContext("2d");
const outHarm=document.getElementById("sHarm");
const outTerms=document.getElementById("sTerms");
const outSweep=document.getElementById("sSweep");
const outRad=document.getElementById("sRad");
const outLoop=document.getElementById("sLoop");
const calm=window.matchMedia("(prefers-reduced-motion: reduce)");

function ell(cx,cy,rx,ry,a0,a1,steps){
  const o=[];
  for(let i=0;i<=steps;i++){
    const a=(a0+(a1-a0)*i/steps)*Math.PI/180;
    o.push([cx+rx*Math.cos(a),cy+ry*Math.sin(a)]);
  }
  return o;
}
const GLYPH={
  F:[[[0,0],[0.62,0]],[[0,0.46],[0.5,0.46]],[[0,0],[0,1]]],
  O:[ell(0.36,0.5,0.36,0.5,-90,270,48)],
  U:[[[0,0],[0,0.66]],ell(0.31,0.66,0.31,0.34,180,0,26),[[0.62,0],[0.62,0.66]]],
  R:[[[0,0],[0,1]],ell(0,0.28,0.46,0.28,-90,90,28),[[0,0.56],[0.58,1]]],
  I:[[[0.12,0],[0.6,0]],[[0.36,0],[0.36,1]],[[0.12,1],[0.6,1]]],
  E:[[[0,0],[0,1]],[[0,0],[0.62,0]],[[0,0.5],[0.5,0.5]],[[0,1],[0.62,1]]]
};

function densify(pts,maxLen){
  const out=[];
  for(let i=0;i<pts.length-1;i++){
    const a=pts[i],b=pts[i+1];
    const dx=b[0]-a[0],dy=b[1]-a[1];
    const d=Math.sqrt(dx*dx+dy*dy);
    const n=Math.max(1,Math.ceil(d/maxLen));
    for(let k=0;k<n;k++){
      const f=k/n;
      out.push([a[0]+dx*f,a[1]+dy*f]);
    }
  }
  out.push(pts[pts.length-1]);
  return out;
}
function chaikin(pts,rounds){
  let p=pts;
  for(let r=0;r<rounds;r++){
    const n=p.length,o=[p[0]];
    for(let i=0;i<n-1;i++){
      const a=p[i],b=p[i+1];
      o.push([a[0]*0.75+b[0]*0.25,a[1]*0.75+b[1]*0.25]);
      o.push([a[0]*0.25+b[0]*0.75,a[1]*0.25+b[1]*0.75]);
    }
    o.push(p[n-1]);
    p=o;
  }
  return p;
}
function wordRaw(){
  const raw=[];
  for(let i=0;i<WORD.length;i++){
    const strokes=GLYPH[WORD[i]];
    const ox=i*PITCH;
    for(let s=0;s<strokes.length;s++){
      const seg=strokes[s];
      for(let k=0;k<seg.length;k++) raw.push([seg[k][0]+ox,seg[k][1]]);
    }
  }
  return raw;
}
function resample(pts,n){
  const m=pts.length,cum=new Float64Array(m);
  for(let i=1;i<m;i++){
    const dx=pts[i][0]-pts[i-1][0],dy=pts[i][1]-pts[i-1][1];
    cum[i]=cum[i-1]+Math.sqrt(dx*dx+dy*dy);
  }
  const total=cum[m-1]||1e-6;
  const out=new Float64Array(n*2);
  let j=0;
  for(let i=0;i<n;i++){
    const d=total*i/(n-1);
    while(j<m-2&&cum[j+1]<d) j++;
    const seg=(cum[j+1]-cum[j])||1e-9;
    const f=(d-cum[j])/seg;
    out[i*2]=pts[j][0]+(pts[j+1][0]-pts[j][0])*f;
    out[i*2+1]=pts[j][1]+(pts[j+1][1]-pts[j][1])*f;
  }
  return {pts:out,total:total};
}
function centerSamples(z,n){
  let minX=1e9,maxX=-1e9,minY=1e9,maxY=-1e9;
  for(let i=0;i<n;i++){
    const x=z[i*2],y=z[i*2+1];
    if(x<minX)minX=x;
    if(x>maxX)maxX=x;
    if(y<minY)minY=y;
    if(y>maxY)maxY=y;
  }
  const cx=(minX+maxX)/2,cy=(minY+maxY)/2;
  for(let i=0;i<n;i++){z[i*2]-=cx;z[i*2+1]-=cy;}
  return {w:maxX-minX,h:maxY-minY};
}
function spectrum(z,n,P){
  const tabR=new Float64Array(n),tabI=new Float64Array(n);
  for(let j=0;j<n;j++){
    const a=-TAU*j/n;
    tabR[j]=Math.cos(a);
    tabI[j]=Math.sin(a);
  }
  const out=[];
  for(let k=-P;k<=P;k++){
    let sr=0,si=0,idx=0,step=k;
    if(step<0) step+=n;
    for(let m=0;m<n;m++){
      const xr=z[m*2],xi=z[m*2+1];
      const c=tabR[idx],s=tabI[idx];
      sr+=xr*c-xi*s;
      si+=xr*s+xi*c;
      idx+=step;
      if(idx>=n) idx-=n;
    }
    sr/=n;
    si/=n;
    out.push({k:k,r:Math.sqrt(sr*sr+si*si),a0:Math.atan2(si,sr)});
  }
  return out;
}

const raw=wordRaw();
const smoothed=chaikin(densify(raw,0.05),2);
const rs=resample(smoothed,SAMPLES);
const bbox=centerSamples(rs.pts,SAMPLES);
let terms=spectrum(rs.pts,SAMPLES,P_HARM);
terms=terms.filter(function(t){return t.r>0;});
let totalR=0,maxTerm=0;
for(let i=0;i<terms.length;i++){
  totalR+=terms[i].r;
  if(terms[i].r>maxTerm) maxTerm=terms[i].r;
}
const GHOST=(function(){
  const g=new Float32Array(GHOST_STEPS*2);
  const stride=SAMPLES/GHOST_STEPS;
  for(let i=0;i<GHOST_STEPS;i++){
    const j=Math.min(SAMPLES-1,Math.round(i*stride));
    g[i*2]=rs.pts[j*2];
    g[i*2+1]=rs.pts[j*2+1];
  }
  return g;
})();

const trX=new Float32Array(TRAIL_CAP);
const trY=new Float32Array(TRAIL_CAP);
let trHead=0,trCount=0;
function pushTrail(x,y){
  trX[trHead]=x;
  trY[trHead]=y;
  trHead=(trHead+1)%TRAIL_CAP;
  if(trCount<TRAIL_CAP) trCount++;
}
function clearTrail(){trHead=0;trCount=0;}

let dpr=1,cssW=0,cssH=0;
let A={x:0,y:0,r:0,lam:1},B={x:0,y:0,r:0,lam:1};

function resize(){
  const rect=canvas.getBoundingClientRect();
  dpr=Math.min(2,window.devicePixelRatio||1);
  const w=Math.max(1,Math.round(rect.width*dpr));
  const h=Math.max(1,Math.round(rect.height*dpr));
  if(canvas.width!==w||canvas.height!==h){
    canvas.width=w;
    canvas.height=h;
  }
  cssW=rect.width||1;
  cssH=rect.height||1;
  ctx.setTransform(dpr,0,0,dpr,0,0);
  const cut=cssW*0.45;
  const ax=cut*0.5,ay=cssH*0.5;
  const aw=Math.min(ax,cssH*0.5),ah=Math.min(cssH*0.5,cssW*0.22);
  let lamA=(ah*0.88)/totalR;
  const wordHalfW=bbox.w/2;
  const fitA=(aw*0.92)/wordHalfW;
  if(fitA<lamA) lamA=fitA;
  A.x=ax;A.y=ay;A.r=aw;A.lam=lamA;
  const bx=(cut+cssW)*0.5,by=cssH*0.5;
  const bw=(cssW-cut)*0.5,bh=cssH*0.5;
  B.x=bx;B.y=by;B.r=bw;
  B.lam=Math.min((bw*0.94)/wordHalfW,(bh*0.44)/(bbox.h/2));
}

const CIRCLE_COLS=[
  "rgba(94,224,255,ALPHA)","rgba(126,196,255,ALPHA)","rgba(150,158,255,ALPHA)",
  "rgba(178,146,250,ALPHA)","rgba(255,207,112,ALPHA)"
];
const VEC_COLS=[
  "rgba(94,224,255,ALPHA)","rgba(122,190,255,ALPHA)","rgba(146,150,255,ALPHA)",
  "rgba(176,140,250,ALPHA)","rgba(255,207,112,ALPHA)"
];
const LV=5;

function chain(u,lam,ox,oy){
  const pts=new Float64Array(terms.length*2);
  let x=0,y=0;
  for(let i=0;i<terms.length;i++){
    const t=terms[i];
    const a=t.a0+TAU*t.k*u;
    x+=t.r*lam*Math.cos(a);
    y+=t.r*lam*Math.sin(a);
    pts[i*2]=ox+x;
    pts[i*2+1]=oy+y;
  }
  return pts;
}
function chainNorm(u){
  let x=0,y=0;
  for(let i=0;i<terms.length;i++){
    const t=terms[i];
    const a=t.a0+TAU*t.k*u;
    x+=t.r*Math.cos(a);
    y+=t.r*Math.sin(a);
  }
  return [x,y];
}

function drawBed(panel,clock,bloom){
  const cx=panel.x,cy=panel.y;
  const maxR=totalR*panel.lam;
  ctx.lineWidth=1;
  ctx.setLineDash([2,7]);
  for(let i=0;i<3;i++){
    const rr=maxR*(1-i*0.31);
    ctx.lineDashOffset=clock*(i%2?-26:16);
    ctx.strokeStyle="rgba(122,164,224,"+(0.16-i*0.035)+")";
    ctx.beginPath();
    ctx.arc(cx,cy,rr,0,TAU);
    ctx.stroke();
  }
  ctx.setLineDash([]);
  const spin=clock*0.16;
  const teeth=panel===A?66:54;
  ctx.strokeStyle="rgba(140,182,240,.20)";
  ctx.beginPath();
  for(let i=0;i<teeth;i++){
    const a=spin+TAU*i/teeth;
    const ca=Math.cos(a),sa=Math.sin(a);
    const r0=maxR*1.03,r1=maxR*(i%3===0?1.12:1.07);
    ctx.moveTo(cx+ca*r0,cy+sa*r0);
    ctx.lineTo(cx+ca*r1,cy+sa*r1);
  }
  ctx.stroke();
  ctx.strokeStyle="rgba(94,224,255,"+(0.10+0.10*bloom)+")";
  ctx.lineWidth=1.2;
  ctx.beginPath();
  ctx.arc(cx,cy,maxR,0,TAU);
  ctx.stroke();
  ctx.lineWidth=1;
  const tick=16;
  ctx.strokeStyle="rgba(150,186,238,.14)";
  ctx.beginPath();
  for(let i=0;i<tick;i++){
    const a=-Math.PI/2+TAU*i/tick;
    const ca=Math.cos(a),sa=Math.sin(a);
    const r1=maxR*1.2;
    ctx.moveTo(cx+ca*maxR*1.16,cy+sa*maxR*1.16);
    ctx.lineTo(cx+ca*r1,cy+sa*r1);
  }
  ctx.stroke();
}

function drawGhost(panel,alpha,clock,dashPhase){
  ctx.setLineDash([5,6]);
  ctx.lineDashOffset=-clock*18+dashPhase;
  ctx.lineWidth=1.1;
  ctx.strokeStyle="rgba(122,196,240,"+alpha.toFixed(3)+")";
  ctx.beginPath();
  for(let i=0;i<GHOST_STEPS;i++){
    const x=panel.x+GHOST[i*2]*panel.lam;
    const y=panel.y+GHOST[i*2+1]*panel.lam;
    if(i===0) ctx.moveTo(x,y); else ctx.lineTo(x,y);
  }
  ctx.stroke();
  ctx.setLineDash([]);
}

function drawTrace(panel,alpha,scale,hot){
  if(trCount<3) return;
  const start=(trHead-trCount+TRAIL_CAP)%TRAIL_CAP;
  const lam=panel.lam;
  ctx.lineJoin="round";
  ctx.lineCap="round";
  ctx.beginPath();
  for(let i=0;i<trCount;i++){
    const k=(start+i)%TRAIL_CAP;
    const x=panel.x+trX[k]*lam;
    const y=panel.y+trY[k]*lam;
    if(i===0) ctx.moveTo(x,y); else ctx.lineTo(x,y);
  }
  ctx.strokeStyle="rgba(58,142,255,"+(0.13*alpha).toFixed(3)+")";
  ctx.lineWidth=7*scale;
  ctx.stroke();
  ctx.strokeStyle="rgba(146,238,255,"+(0.62*alpha).toFixed(3)+")";
  ctx.lineWidth=1.5*scale;
  ctx.stroke();
  if(hot>0){
    const n=Math.min(trCount,Math.round(110*scale)+40);
    ctx.beginPath();
    for(let i=trCount-n;i<trCount;i++){
      const k=(start+i)%TRAIL_CAP;
      const x=panel.x+trX[k]*lam;
      const y=panel.y+trY[k]*lam;
      if(i===trCount-n) ctx.moveTo(x,y); else ctx.lineTo(x,y);
    }
    ctx.shadowBlur=16*scale;
    ctx.shadowColor="rgba(120,232,255,.95)";
    ctx.strokeStyle="rgba(255,255,255,"+(0.92*alpha*hot).toFixed(3)+")";
    ctx.lineWidth=2.1*scale;
    ctx.stroke();
    ctx.shadowBlur=0;
  }
}

function drawMachine(panel,u,clock){
  const lam=panel.lam,px=panel.x,py=panel.y;
  const inv=1/(maxTerm||1);
  for(let L=0;L<LV;L++){
    const lo=Math.pow((L+0.35)/LV,1.55),hi=Math.pow((L+1.55)/LV,1.55);
    ctx.beginPath();
    let any=false;
    for(let i=0;i<terms.length;i++){
      const t=terms[i];
      const n=t.r*inv;
      if(n<lo||n>=hi) continue;
      const a=t.a0+TAU*t.k*u;
      const r=t.r*lam;
      const cxx=px+r*Math.cos(a),cyy=py+r*Math.sin(a);
      ctx.moveTo(cxx+r,cyy);
      ctx.arc(cxx,cyy,r,0,TAU);
      any=true;
    }
    if(any){
      ctx.strokeStyle=CIRCLE_COLS[L].replace("ALPHA",(0.09+0.30*((L+1)/LV)).toFixed(3));
      ctx.lineWidth=1;
      ctx.stroke();
    }
  }
  for(let L=0;L<LV;L++){
    const lo=Math.pow((L+0.35)/LV,1.55),hi=Math.pow((L+1.55)/LV,1.55);
    ctx.beginPath();
    let x=px,y=py,any=false;
    for(let i=0;i<terms.length;i++){
      const t=terms[i];
      const n=t.r*inv;
      if(n<lo||n>=hi) continue;
      const a=t.a0+TAU*t.k*u;
      const nx=x+t.r*lam*Math.cos(a);
      const ny=y+t.r*lam*Math.sin(a);
      ctx.moveTo(x,y);
      ctx.lineTo(nx,ny);
      x=nx;y=ny;any=true;
    }
    if(any){
      ctx.strokeStyle=VEC_COLS[L].replace("ALPHA",(0.16+0.66*((L+1)/LV)).toFixed(3));
      ctx.lineWidth=L>2?1.2:1;
      ctx.stroke();
    }
  }
  const tip=chainNorm(u);
  const tx=px+tip[0]*lam,ty=py+tip[1]*lam;
  ctx.strokeStyle="rgba(150,186,238,.30)";
  ctx.lineWidth=1;
  ctx.beginPath();
  ctx.moveTo(px-9,py);ctx.lineTo(px+9,py);
  ctx.moveTo(px,py-9);ctx.lineTo(px,py+9);
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(px,py,5.5,0,TAU);
  ctx.fillStyle="rgba(8,14,26,.95)";
  ctx.fill();
  ctx.strokeStyle="rgba(94,224,255,.75)";
  ctx.lineWidth=1.3;
  ctx.stroke();
  const g=ctx.createRadialGradient(tx,ty,0,tx,ty,26);
  g.addColorStop(0,"rgba(255,255,255,.95)");
  g.addColorStop(0.28,"rgba(150,240,255,.55)");
  g.addColorStop(1,"rgba(94,224,255,0)");
  ctx.fillStyle=g;
  ctx.beginPath();
  ctx.arc(tx,ty,26,0,TAU);
  ctx.fill();
  ctx.fillStyle="#ffffff";
  ctx.beginPath();
  ctx.arc(tx,ty,2.2,0,TAU);
  ctx.fill();
}

function drawScale(panel,clock){
  const bx=panel.x+panel.r*0.42,by=panel.y-panel.r*0.86;
  const len=Math.max(40,panel.r*0.5);
  ctx.strokeStyle="rgba(150,186,238,.32)";
  ctx.lineWidth=1;
  ctx.beginPath();
  ctx.moveTo(bx,by);ctx.lineTo(bx+len,by);
  ctx.moveTo(bx,by-4);ctx.lineTo(bx,by+4);
  ctx.moveTo(bx+len,by-4);ctx.lineTo(bx+len,by+4);
  ctx.stroke();
  const seg=6;
  ctx.strokeStyle="rgba(150,186,238,.20)";
  ctx.beginPath();
  for(let i=1;i<seg;i++){
    const x=bx+len*i/seg;
    ctx.moveTo(x,by-3);ctx.lineTo(x,by+3);
  }
  ctx.stroke();
  ctx.fillStyle="rgba(94,224,255,"+(0.5+0.35*Math.sin(clock*1.7)).toFixed(3)+")";
  ctx.beginPath();
  ctx.arc(bx,by,2.2,0,TAU);
  ctx.fill();
}

function render(u,clock,frac,trailAlpha,bloom,hot){  ctx.clearRect(0,0,cssW,cssH);
  drawBed(A,clock,bloom);
  drawBed(B,clock*0.62,bloom);
  drawGhost(A,0.05+0.05*bloom,clock,0);
  drawGhost(B,0.055+0.28*bloom,clock,0);
  drawMachine(A,frac,clock);
  drawTrace(A,trailAlpha*0.42,0.7,0);
  drawTrace(B,trailAlpha,1,hot);
  drawScale(A,clock);
  drawScale(B,clock*0.8);
}

const clamp01=function(v){return v<0?0:v>1?1:v;};
const smooth=function(v){return v*v*(3-2*v);};

let t0=0,frame=0,raf=0,sampleIdx=0;
const SAMPLES_PER_SEC=86;
const PRIME_STEPS=760;

function primeTrail(){
  clearTrail();
  for(let i=0;i<=PRIME_STEPS;i++){
    const q=chainNorm(i/PRIME_STEPS);
    pushTrail(q[0],q[1]);
  }
}
function still(){
  primeTrail();
  render(0.2,1.4,1,0.78,0,0);
}
function loop(now){
  if(!t0) t0=now;
  const sec=(now-t0)/1000;
  const u=sec%CYCLE_T;
  let frac,trailAlpha,bloom,hot;
  if(u<DRAW_T){
    frac=u/DRAW_T;
    trailAlpha=1;
    bloom=0;
    hot=1;
    outSweep.textContent=Math.round(frac*100)+"%";
    while(sampleIdx/SAMPLES_PER_SEC<u){
      const q=chainNorm(Math.min(1,sampleIdx/SAMPLES_PER_SEC/DRAW_T));
      pushTrail(q[0],q[1]);
      sampleIdx++;
    }
  }else if(u<DRAW_T+HOLD_T){
    frac=1;
    trailAlpha=1;
    bloom=smooth((u-DRAW_T)/(HOLD_T*0.7));
    hot=1;
    outSweep.textContent="100%";
  }else{
    const p=(u-DRAW_T-HOLD_T)/FADE_T;
    frac=1;
    trailAlpha=1-smooth(p);
    bloom=1-smooth(Math.min(1,p*1.6));
    hot=0;
    outSweep.textContent="100%";
    if(p>=0.2){clearTrail();sampleIdx=0;}
  }
  render(frac,sec,frac,trailAlpha,bloom,hot);
  if(frame%6===0){
    outHarm.textContent=String(P_HARM*2+1);
    outTerms.textContent=String(terms.length);
    outRad.textContent=totalR.toFixed(3)+" u";
    outLoop.textContent=u.toFixed(1)+" / "+CYCLE_T.toFixed(1)+" s";
  }
  frame++;
  raf=requestAnimationFrame(loop);
}

function start(){
  resize();
  if(calm.matches){
    still();
    return;
  }
  t0=0;
  frame=0;
  sampleIdx=0;
  raf=requestAnimationFrame(loop);
}
let rt=0;
window.addEventListener("resize",function(){
  clearTimeout(rt);
  rt=setTimeout(function(){
    resize();
    if(calm.matches) still();
  },140);
});
start();
