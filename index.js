// Año automático
document.getElementById("year").textContent = new Date().getFullYear();

// Reveal
const items = document.querySelectorAll(".reveal");
const io = new IntersectionObserver((entries) => {
  entries.forEach((e) => {
    if (e.isIntersecting) e.target.classList.add("is-visible");
  });
}, { threshold: 0.15 });

items.forEach(el => io.observe(el));

// Submenú móvil/tablet: toggle
document.querySelectorAll(".submenu-trigger").forEach((trigger) => {
  trigger.addEventListener("click", (e) => {
    if (window.innerWidth < 992) {
      e.preventDefault();
      const submenu = trigger.nextElementSibling;

      // Cierra otros abiertos
      document.querySelectorAll(".submenu-menu.show").forEach((open) => {
        if (open !== submenu) open.classList.remove("show");
      });

      submenu.classList.toggle("show");
    }
  });
});

// Limpieza al pasar a desktop
window.addEventListener("resize", () => {
  if (window.innerWidth >= 992) {
    document.querySelectorAll(".submenu-menu.show").forEach((el) => el.classList.remove("show"));
  }
});