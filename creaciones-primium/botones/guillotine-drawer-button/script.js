(function(){
  var page=document.querySelector(".page");
  var pull=document.getElementById("pull");
  if(!page||!pull)return;
  var reduce=window.matchMedia&&window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var out=1,target=1,last=0,t0=performance.now(),hold=0;

  function smooth(a,b,x){
    var u=Math.min(1,Math.max(0,(x-a)/(b-a)));
    return u*u*u*(u*(u*6-15)+10);
  }
  function auto(t){
    var c=13.2;
    var u=t%c;
    if(u<3.4)return 1;
    if(u<5.6)return 1-smooth(3.4,5.6,u);
    if(u<7.8)return 0;
    if(u<9.1)return smooth(7.8,9.1,u);
    return 1;
  }

  if(reduce){
    page.style.setProperty("--out","1");
    page.style.setProperty("--lit","1");
    pull.addEventListener("click",function(){
      page.style.setProperty("--out","0");
      page.style.setProperty("--lit","0");
    });
    return;
  }

  pull.addEventListener("pointerdown",function(){
    pull.classList.add("is-press");
    pull.style.setProperty("--pull","1");
    target=1;
    hold=performance.now()+5200;
  });
  window.addEventListener("pointerup",function(){
    pull.classList.remove("is-press");
    pull.style.setProperty("--pull","0");
  });
  pull.addEventListener("pointerleave",function(){
    pull.classList.remove("is-press");
    pull.style.setProperty("--pull","0");
  });
  pull.addEventListener("keydown",function(e){
    if(e.key!=="Enter"&&e.key!==" ")return;
    pull.classList.add("is-press");
    target=1;
    hold=performance.now()+5200;
  });
  pull.addEventListener("keyup",function(){pull.classList.remove("is-press")});

  function frame(now){
    var t=(now-t0)/1000;
    var dt=last?Math.min(.06,(now-last)/1000):.016;
    last=now;
    var want=now<hold?target:auto(t);
    if(want>out){
      out+=(want-out)*Math.min(1,dt*3.1);
      if(want-out<.004)out=want;
    }else{
      out+=(want-out)*Math.min(1,dt*1.05);
      if(want-out<.004)out=want;
    }
    page.style.setProperty("--out",out.toFixed(4));
    page.style.setProperty("--lit",(out*.8+.14+.06*Math.sin(t*1.4)).toFixed(4));
    requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
})();
