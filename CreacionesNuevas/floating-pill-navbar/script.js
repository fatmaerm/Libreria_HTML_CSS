const items=document.querySelectorAll('.nav-item');
const ind=document.getElementById('ind');
const lbl=document.getElementById('pageLabel');
items.forEach((item,i)=>{
  item.addEventListener('click',e=>{e.preventDefault();
    items.forEach(x=>x.classList.remove('active'));
    item.classList.add('active');
    ind.style.transform='translateX('+i*56+'px)';
    lbl.textContent=item.dataset.label;
  });
});