document.getElementById('nlForm').addEventListener('submit',e=>{
  e.preventDefault();
  const input=document.getElementById('nlEmail');
  if(!input.validity.valid)return input.focus();
  document.getElementById('nlForm').hidden=true;
  document.getElementById('nlSuccess').removeAttribute('hidden');
});