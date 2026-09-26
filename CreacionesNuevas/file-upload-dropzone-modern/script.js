const dz=document.getElementById('dz');
const fi=document.getElementById('fileInput');
const fl=document.getElementById('fileList');
['dragenter','dragover'].forEach(ev=>dz.addEventListener(ev,e=>{e.preventDefault();dz.classList.add('over')}));
['dragleave','drop'].forEach(ev=>dz.addEventListener(ev,e=>{e.preventDefault();dz.classList.remove('over')}));
dz.addEventListener('drop',e=>addFiles(e.dataTransfer.files));
fi.addEventListener('change',()=>addFiles(fi.files));
dz.addEventListener('click',e=>{if(!e.target.closest('label'))fi.click();});
function addFiles(files){
  [...files].forEach(f=>{
    const li=document.createElement('li');
    const icon=f.type.includes('image')?'🖼️':f.type.includes('pdf')?'📄':'📎';
    const size=(f.size/1024).toFixed(1)+'KB';
    li.innerHTML='<span>'+icon+' '+f.name+'</span><span style="color:#475569">'+size+'</span><button title="Remove">✕</button>';
    li.querySelector('button').onclick=()=>li.remove();
    fl.appendChild(li);
  });
}