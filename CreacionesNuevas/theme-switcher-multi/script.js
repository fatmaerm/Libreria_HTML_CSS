document.querySelectorAll('.theme-btn').forEach(btn=>{
  btn.addEventListener('click',()=>{
    document.documentElement.setAttribute('data-theme',btn.dataset.theme);
    document.querySelectorAll('.theme-btn').forEach(b=>b.classList.toggle('active',b===btn));
  });
});