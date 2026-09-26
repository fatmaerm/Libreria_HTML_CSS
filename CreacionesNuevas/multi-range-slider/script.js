const rmin=document.getElementById('rmin'),rmax=document.getElementById('rmax');
const lmin=document.getElementById('lmin'),lmax=document.getElementById('lmax');
const ft=document.getElementById('fillTrack');
function update(){
  let min=+rmin.value,max=+rmax.value;
  if(min>max){[min,max]=[max,min];}
  const pmin=min/1000*100,pmax=max/1000*100;
  ft.style.left=pmin+'%';ft.style.width=(pmax-pmin)+'%';
  lmin.textContent='$'+min;lmax.textContent='$'+max;
}
rmin.addEventListener('input',update);rmax.addEventListener('input',update);update();