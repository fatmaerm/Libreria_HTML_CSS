(function(){
  var page=document.querySelector(".page");
  var cap=document.querySelector(".cap");
  var host=document.querySelector(".fluid__spikes");
  var txt=document.querySelector(".gauge__txt");
  if(!page||!cap||!host)return;
  var reduce=window.matchMedia&&window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var N=26;
  var spikes=[];
  var seed=[];
  for(var i=0;i<N;i++){
    var b=document.createElement("b");
    b.style.left=((i+0.5)/N*100).toFixed(2)+"%";
    host.appendChild(b);
    spikes.push(b);
    seed.push(.62+((Math.sin(i*12.9898)*43758.5453)%1+1)%1*.62);
  }
  var pol=0,polT=0,press=0,last=0,txtT=0,t0=performance.now();

  function smooth(a,b,x){
    var u=Math.min(1,Math.max(0,(x-a)/(b-a)));
    return u*u*(3-2*u);
  }
  function gapAt(t){
    var c=10.4;
    var u=t%c;
    if(u<1.7)return 1-smooth(.75,1.7,u);
    if(u<5.9)return 0;
    if(u<6.7)return smooth(5.9,6.7,u);
    if(u<8.5)return 1;
    if(u<9.6)return 1-smooth(8.5,9.6,u);
    return 0;
  }
  function magAt(t){
    return .54+.46*(.5+.5*Math.sin(t*.68-1.2));
  }

  if(reduce){
    page.style.setProperty("--gap","1");
    page.style.setProperty("--mag",".86");
    for(var r=0;r<N;r++){
      var xs=(r+0.5)/N*2-1;
      spikes[r].style.transform="rotate("+(xs*5).toFixed(2)+"deg) scaleY("+(0.34+0.5*Math.exp(-(xs/0.6)*(xs/0.6))).toFixed(3)+")";
    }
    if(txt)txt.textContent="mag 0.86 T";
    cap.addEventListener("click",function(){
      polT=polT?0:1;
      page.style.setProperty("--pol",String(polT));
      if(txt)txt.textContent=polT?"mag s-pole":"mag n-pole";
    });
    return;
  }

  cap.addEventListener("pointerdown",function(){
    cap.classList.add("is-press");
    press=1;
    polT=polT?0:1;
  });
  cap.addEventListener("pointerup",function(){cap.classList.remove("is-press")});
  cap.addEventListener("pointerleave",function(){cap.classList.remove("is-press")});
  cap.addEventListener("keydown",function(e){
    if(e.key==="Enter"||e.key===" "){
      press=1;
      polT=polT?0:1;
      cap.classList.add("is-press");
      setTimeout(function(){cap.classList.remove("is-press")},320);
    }
  });

  function frame(now){
    var t=(now-t0)/1000;
    var dt=last?Math.min(.05,(now-last)/1000):.016;
    last=now;
    press+=(0-press)*Math.min(1,dt*7);
    pol+=(polT-pol)*Math.min(1,dt*5.5);
    var mag=Math.min(1.16,magAt(t)+press*.5);
    var gap=gapAt(t);
    var flip=1-pol*2;
    page.style.setProperty("--gap",gap.toFixed(4));
    page.style.setProperty("--mag",mag.toFixed(4));
    page.style.setProperty("--pol",pol.toFixed(4));
    for(var k=0;k<N;k++){
      var xs=(k+0.5)/N*2-1;
      var d=xs/.58;
      var f=Math.exp(-d*d);
      var wob=Math.sin(t*2.1+k*.83)*.09+Math.sin(t*3.4+k*1.7)*.045;
      var h=(f*1.12+.09)*seed[k]*(.34+mag*.82)+wob*f;
      if(h<0)h=0;
      var lean=(xs*7.4*mag+Math.sin(t*1.7+k*.61)*3.1)*flip*mag;
      spikes[k].style.transform="rotate("+lean.toFixed(2)+"deg) scaleY("+h.toFixed(4)+")";
    }
    if(txt&&t-txtT>.09){
      txtT=t;
      txt.textContent="mag "+(mag*.47).toFixed(2)+" T";
    }
    requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
})();
