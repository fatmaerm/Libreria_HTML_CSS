const sl=document.getElementById('opSlider');
const cl=document.getElementById('clayer');
const val=document.getElementById('opVal');
sl.addEventListener('input',()=>{
  cl.style.opacity=sl.value/100;val.textContent=sl.value+'%';
});