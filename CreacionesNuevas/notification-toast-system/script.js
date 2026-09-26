const msgs={success:['Saved!','Your changes have been saved.'],error:['Error!','Something went wrong.'],warning:['Warning','Please review your input.'],info:['Info','New update available.']};
const icons={success:'✅',error:'❌',warning:'⚠️',info:'ℹ️'};
document.querySelectorAll('.trigger').forEach(btn=>btn.addEventListener('click',()=>toast(btn.dataset.type)));
function toast(type){
  const [title,sub]=msgs[type];const t=document.createElement('div');
  t.className='toast toast-'+type;
  t.innerHTML='<span class="toast-icon">'+icons[type]+'</span><div class="toast-body"><strong>'+title+'</strong><span>'+sub+'</span></div><button class="toast-close">✕</button>';
  document.getElementById('stack').prepend(t);
  t.querySelector('.toast-close').onclick=()=>remove(t);
  setTimeout(()=>remove(t),4000);
}
function remove(t){t.classList.add('removing');setTimeout(()=>t.remove(),300);}