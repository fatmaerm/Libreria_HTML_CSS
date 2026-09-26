const swatches=document.querySelectorAll('.swatch');
const preview=document.getElementById('preview');
swatches.forEach(s=>s.addEventListener('click',()=>{
  swatches.forEach(x=>x.classList.remove('active'));s.classList.add('active');
  const c=s.dataset.color;
  preview.textContent='Selected: '+c;preview.style.borderColor=c;
}));