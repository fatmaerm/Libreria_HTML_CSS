const words=document.querySelectorAll('.reveal-word');
const obs=new IntersectionObserver(entries=>{entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add('visible');})},{threshold:.5});
words.forEach(w=>obs.observe(w));