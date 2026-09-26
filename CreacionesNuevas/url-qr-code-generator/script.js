const genBtn=document.getElementById('qrGen');
const urlIn=document.getElementById('qrUrl');
const img=document.getElementById('qrImg');
const hint=document.getElementById('qrHint');
const dlBtn=document.getElementById('dlBtn');
genBtn.addEventListener('click',()=>{
  const url=urlIn.value.trim();if(!url)return;
  const api='https://api.qrserver.com/v1/create-qr-code/?size=180x180&data='+encodeURIComponent(url);
  img.src=api;img.hidden=false;hint.hidden=true;dlBtn.removeAttribute('hidden');
});
dlBtn.addEventListener('click',()=>{const a=document.createElement('a');a.href=img.src;a.download='qrcode.png';a.click();});