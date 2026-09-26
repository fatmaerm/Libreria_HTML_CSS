const input=document.getElementById('tagInput');
const tags=document.getElementById('tags');
function addTag(val){
  val=val.trim();
  if(!val||[...tags.querySelectorAll('.chip')].some(c=>c.dataset.v===val))return;
  const chip=document.createElement('span');chip.className='chip';chip.dataset.v=val;
  chip.innerHTML=val+' <button>×</button>';
  chip.querySelector('button').addEventListener('click',()=>chip.remove());
  tags.appendChild(chip);
}
input.addEventListener('keydown',e=>{
  if(e.key==='Enter'||e.key===','){e.preventDefault();addTag(input.value);input.value='';}
  else if(e.key==='Backspace'&&!input.value){const last=tags.querySelector('.chip:last-child');if(last)last.remove();}
});