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
//
// Scroll suave (por si tu navegador no respeta scroll-behavior)
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener("click", (e) => {
    const id = a.getAttribute("href");
    const target = document.querySelector(id);
    if (!target) return;

    e.preventDefault();
    const y = target.getBoundingClientRect().top + window.scrollY - 90; // offset navbar
    window.scrollTo({ top: y, behavior: "smooth" });
  });
});

// Reveal on scroll
const revealItems = document.querySelectorAll(".reveal");
const io = new IntersectionObserver((entries) => {
  entries.forEach((e) => {
    if (e.isIntersecting) {
      e.target.classList.add("reveal-on");
      io.unobserve(e.target);
    }
  });
}, { threshold: 0.12 });

revealItems.forEach(el => io.observe(el));
//dsdsds//
// Animación de entrada (simple)
const heroBox = document.querySelector(".hero-box");
if (heroBox) {
  heroBox.style.opacity = "0";
  heroBox.style.transform = "translateY(14px)";
  heroBox.style.transition = "opacity .6s ease, transform .6s ease";

  requestAnimationFrame(() => {
    heroBox.style.opacity = "1";
    heroBox.style.transform = "translateY(0)";
  });
}

// Parallax MUY suave (no rompe multipantalla)
const hero = document.querySelector(".hero-bg");
function parallaxHero(){
  if (!hero) return;
  const y = window.scrollY;
  hero.style.backgroundPositionY = `${50 + y * 0.03}%`;
}
window.addEventListener("scroll", parallaxHero, { passive: true });
parallaxHero();
// Reveal on scroll para las cards
const aboutCards = document.querySelectorAll(".about-card");

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0)";
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

aboutCards.forEach(card => {
  card.style.opacity = "0";
  card.style.transform = "translateY(18px)";
  card.style.transition = "opacity .6s ease, transform .6s ease";
  observer.observe(card);
});
// Reveal simple para cards de cursos
const courseCards = document.querySelectorAll(".course-card");

const courseObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0)";
      courseObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

courseCards.forEach(card => {
  card.style.opacity = "0";
  card.style.transform = "translateY(18px)";
  card.style.transition = "opacity .6s ease, transform .6s ease";
  courseObserver.observe(card);
});
const planCards = document.querySelectorAll(".plan-box");

const obs = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add("plan-in");
      obs.unobserve(e.target);
    }
  });
}, { threshold: 0.15 });

planCards.forEach(card => {
  card.classList.add("plan-init");
  obs.observe(card);
});