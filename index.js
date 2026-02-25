// Año automático
document.getElementById("year").textContent = new Date().getFullYear();

// Cerrar menú al tocar un link (mobile)
const navCollapse = document.getElementById("mainNav");
const bsCollapse = navCollapse ? bootstrap.Collapse.getOrCreateInstance(navCollapse, { toggle: false }) : null;

document.querySelectorAll(".navbar .nav-link").forEach(link => {
  link.addEventListener("click", () => {
    const isMobile = window.matchMedia("(max-width: 991.98px)").matches;
    if (isMobile && bsCollapse) bsCollapse.hide();
  });
});

// (Opcional) marcar activo según scroll a secciones con #id
const links = Array.from(document.querySelectorAll(".navbar .nav-link"));
const sections = links
  .map(a => document.querySelector(a.getAttribute("href")))
  .filter(Boolean);

function setActiveByScroll(){
  const y = window.scrollY + 140;
  let currentId = sections[0]?.id;

  for (const sec of sections) {
    if (sec.offsetTop <= y) currentId = sec.id;
  }

  links.forEach(a => {
    a.classList.toggle("active", a.getAttribute("href") === `#${currentId}`);
  });
}

window.addEventListener("scroll", setActiveByScroll, { passive: true });
setActiveByScroll();