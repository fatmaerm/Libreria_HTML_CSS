const btn = document.getElementById('magBtn');
btn.addEventListener('mousemove', e => {
  const r = btn.getBoundingClientRect();
  const x = e.clientX - r.left - r.width/2;
  const y = e.clientY - r.top - r.height/2;
  btn.style.transform = `translate(${x*.3}px,${y*.3}px)`;
});
btn.addEventListener('mouseleave', () => {
  btn.style.transform = '';
});