const links=document.querySelectorAll('.spy-link');
const sections=[...links].map(l=>document.getElementById(l.dataset.target));
const obs=new IntersectionObserver(entries=>{
  entries.forEach(e=>{if(e.isIntersecting){
    links.forEach(l=>l.classList.toggle('active',l.dataset.target===e.target.id));
  }});
},{rootMargin:'-30% 0px -65% 0px'});
sections.forEach(s=>obs.observe(s));