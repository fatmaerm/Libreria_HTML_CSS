(function(){
  var back=document.getElementById('swarm');
  var front=document.getElementById('swarm-front');
  if(!back||!front) return;
  var still=window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function sprite(size,stops){
    var c=document.createElement('canvas');
    c.width=size;
    c.height=size;
    var g=c.getContext('2d');
    var grd=g.createRadialGradient(size/2,size/2,0,size/2,size/2,size/2);
    for(var i=0;i<stops.length;i++) grd.addColorStop(stops[i][0],stops[i][1]);
    g.fillStyle=grd;
    g.fillRect(0,0,size,size);
    return c;
  }

  var core=sprite(64,[[0,'rgba(255,255,226,1)'],[0.05,'rgba(248,255,196,.94)'],[0.15,'rgba(218,248,126,.62)'],[0.32,'rgba(172,234,90,.26)'],[0.6,'rgba(124,208,62,.07)'],[1,'rgba(110,198,50,0)']]);
  var halo=sprite(96,[[0,'rgba(186,238,118,.32)'],[0.32,'rgba(150,220,90,.13)'],[0.66,'rgba(110,190,60,.03)'],[1,'rgba(100,180,50,0)']]);
  var disc=sprite(128,[[0,'rgba(198,246,140,.015)'],[0.42,'rgba(178,238,120,.045)'],[0.7,'rgba(208,250,160,.125)'],[0.85,'rgba(148,214,94,.045)'],[1,'rgba(120,190,70,0)']]);

  var layers=[{
    el:back,
    glowy:true,
    density:16500,
    min:40,
    max:104,
    sizeMin:11,
    sizeMax:26,
    alphaMin:.42,
    alphaMax:.9,
    speedMin:.5,
    speedMax:1.15,
    periodMin:2.6,
    periodMax:7.4,
    top:.1,
    bot:.94
  },{
    el:front,
    glowy:false,
    density:1,
    min:9,
    max:13,
    sizeMin:74,
    sizeMax:190,
    alphaMin:.2,
    alphaMax:.42,
    speedMin:.34,
    speedMax:.7,
    periodMin:3.4,
    periodMax:8.6,
    top:.16,
    bot:.92
  }];

  var fields=[];
  var W=1;
  var H=1;
  var clock=0;
  var last=0;
  var handle=0;
  var live=false;
  var px=-99999;
  var py=-99999;
  var hasPointer=false;
  var r1=Math.random;
  var clamp=function(v,a,b){return v<a?a:v>b?b:v;};

  function rnd(a,b){return a+(b-a)*r1();}

  function build(layer){
    var n=layer.min;
    if(layer.density>1){
      n=Math.round((W*H)/layer.density);
      n=clamp(n,layer.min,layer.max);
    }
    layer.list=new Array(n);
    for(var i=0;i<n;i++){
      var z=layer.glowy?Math.pow(r1(),.78):.8+r1()*.2;
      var flash=r1();
      layer.list[i]={
        x:r1()*W,
        y:H*(layer.top+r1()*(layer.bot-layer.top)),
        vx:rnd(-9,9),
        vy:rnd(-6,6),
        z:z,
        size:layer.sizeMin+ (layer.sizeMax-layer.sizeMin)*Math.pow(z,1.35) * rnd(.78,1.24),
        alpha:layer.alphaMin+(layer.alphaMax-layer.alphaMin)*z*rnd(.7,1.3),
        steady:layer.glowy?(rnd(0,1)<.66?rnd(.35,1):rnd(0,.18)):rnd(.3,.9),
        period:rnd(layer.periodMin,layer.periodMax),
        off:r1(),
        duty:rnd(.08,.2),
        phase:r1()*6.2832,
        turn:rnd(.16,.52),
        force:rnd(4,13),
        top:layer.top,
        bot:layer.bot,
        drift:rnd(layer.speedMin,layer.speedMax)
      };
    }
  }

  function pulse(f){
    var c=(clock/f.period+f.off)%1;
    if(c>f.duty) return 0;
    var u=c/f.duty;
    if(u<.11) return u/.11;
    var d=(u-.11)/.89;
    return d>=1?0:Math.pow(1-d,2.6);
  }

  function move(f,dt){
    var a=f.phase+clock*f.turn*f.drift;
    f.vx+=(Math.sin(a)*1.2+Math.sin(clock*.43+f.phase*2.7)*.6)*f.force*dt;
    f.vy+=(Math.cos(a*.77)*.85+Math.cos(clock*.29+f.phase*1.3)*.55)*f.force*.6*dt;
    if(hasPointer){
      var dx=px-f.x;
      var dy=py-f.y;
      var d2=dx*dx+dy*dy;
      if(d2<125000&&d2>4){
        var d=Math.sqrt(d2);
        var pull=(1-d/354)*(0.35+f.z*1.2)*f.force*.6;
        f.vx+=dx/d*pull*dt;
        f.vy+=dy/d*pull*dt;
      }
    }
    f.vx*=.981;
    f.vy*=.981;
    var sp=Math.sqrt(f.vx*f.vx+f.vy*f.vy);
    var top=H*f.top;
    var bot=H*f.bot;
    var m=f.z*20+16;
    if(f.x<m) f.vx+=(m-f.x)*9*dt;
    else if(f.x>W-m) f.vx-=(f.x-(W-m))*9*dt;
    if(f.y<top) f.vy+=(top-f.y)*9*dt;
    else if(f.y>bot) f.vy-=(f.y-bot)*9*dt;
    var cap=6+f.z*26;
    if(sp>cap){
      var k=cap/sp;
      f.vx*=k;
      f.vy*=k;
    }
    f.x+=f.vx*dt;
    f.y+=f.vy*dt;
  }

  function render(layer){
    var g=layer.g;
    var list=layer.list;
    g.clearRect(0,0,W,H);
    g.globalCompositeOperation='lighter';
    for(var i=0;i<list.length;i++){
      var f=list[i];
      var p=pulse(f);
      var lum=f.steady*.115+p*(1-f.steady*.42);
      if(lum<=.012) continue;
      var a=f.alpha*lum;
      if(a<=.004) continue;
      var s=f.size*(.8+.45*p);
      var hs=s*.5;
      if(!layer.glowy){
        g.globalAlpha=a;
        g.drawImage(disc,f.x-hs,f.y-hs,s,s);
        if(p>.26){
          var c=s*(.2+.14*p);
          g.globalAlpha=(p-.26)/.74*a*.55;
          g.drawImage(core,f.x-c*.5,f.y-c*.5,c,c);
        }
        continue;
      }
      var haloS=s*1.85;
      g.globalAlpha=a*.24;
      g.drawImage(halo,f.x-haloS*.5,f.y-haloS*.5,haloS,haloS);
      g.globalAlpha=a*.9;
      g.drawImage(core,f.x-hs,f.y-hs,s,s);
      var spark=s*.3;
      g.globalAlpha=Math.min(1,a*1.35);
      g.drawImage(core,f.x-spark*.5,f.y-spark*.5,spark,spark);
    }
    g.globalAlpha=1;
    g.globalCompositeOperation='source-over';
  }

  function measure(){
    var rect=layers[0].el.getBoundingClientRect();
    W=Math.max(1,Math.round(rect.width));
    H=Math.max(1,Math.round(rect.height));
    var dpr=Math.min(2,window.devicePixelRatio||1);
    for(var i=0;i<layers.length;i++){
      var L=layers[i];
      L.el.width=Math.round(W*dpr);
      L.el.height=Math.round(H*dpr);
      L.g=L.el.getContext('2d');
      L.g.setTransform(dpr,0,0,dpr,0,0);
    }
  }

  function fit(){
    if(!layers[0].list) return;
    var rect=layers[0].el.getBoundingClientRect();
    var nw=Math.max(1,Math.round(rect.width));
    var nh=Math.max(1,Math.round(rect.height));
    if(nw===W&&nh===H) return;
    var sx=nw/W;
    var sy=nh/H;
    W=nw;
    H=nh;
    for(var i=0;i<layers.length;i++){
      var L=layers[i];
      if(L.list){
        for(var k=0;k<L.list.length;k++){
          L.list[k].x*=sx;
          L.list[k].y*=sy;
        }
      }
    }
    measure();
    for(var j=0;j<layers.length;j++) render(layers[j]);
  }

  function buildAll(){
    for(var i=0;i<layers.length;i++) build(layers[i]);
  }

  function paint(){
    for(var i=0;i<layers.length;i++) render(layers[i]);
  }

  function frame(now){
    if(!last) last=now;
    var dt=(now-last)/1000;
    last=now;
    if(dt>.05) dt=.05;
    if(dt<0) dt=0;
    clock+=dt;
    for(var i=0;i<layers.length;i++){
      var L=layers[i];
      var list=L.list;
      for(var k=0;k<list.length;k++) move(list[k],dt);
      render(L);
    }
    handle=window.requestAnimationFrame(frame);
  }

  function play(){
    if(live||still) return;
    live=true;
    last=0;
    handle=window.requestAnimationFrame(frame);
  }

  function pause(){
    if(!live) return;
    live=false;
    window.cancelAnimationFrame(handle);
  }

  function boot(){
    measure();
    buildAll();
    paint();
    play();
  }

  window.addEventListener('pointermove',function(e){
    px=e.clientX;
    py=e.clientY;
    hasPointer=true;
  },{passive:true});

  window.addEventListener('pointerdown',function(e){
    px=e.clientX;
    py=e.clientY;
    hasPointer=true;
  },{passive:true});

  document.addEventListener('pointerleave',function(){hasPointer=false;});

  document.addEventListener('visibilitychange',function(){
    if(document.hidden) pause();
    else play();
  });

  window.addEventListener('resize',fit);
  if(window.ResizeObserver){
    new window.ResizeObserver(fit).observe(layers[0].el);
  }

  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',boot);
  else boot();
})();
