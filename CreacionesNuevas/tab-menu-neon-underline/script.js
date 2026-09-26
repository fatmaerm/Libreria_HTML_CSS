const tabs=document.querySelectorAll('.tab');
const ul=document.getElementById('ul');
const tc=document.getElementById('tc');
function move(tab){
  ul.style.left=tab.offsetLeft+'px';ul.style.width=tab.offsetWidth+'px';
}
tabs.forEach(t=>{
  t.addEventListener('click',()=>{
    tabs.forEach(x=>x.classList.remove('active'));t.classList.add('active');
    move(t);tc.textContent='Content: '+t.dataset.tab.charAt(0).toUpperCase()+t.dataset.tab.slice(1);
  });
});
move(document.querySelector('.tab.active'));