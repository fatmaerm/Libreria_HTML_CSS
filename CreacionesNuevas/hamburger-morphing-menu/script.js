const ham=document.getElementById('ham');
const ov=document.getElementById('overlay');
ham.addEventListener('click',()=>{
  const open=ham.classList.toggle('open');
  ov.classList.toggle('open',open);
  ham.setAttribute('aria-expanded',open);
});