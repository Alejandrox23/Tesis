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
// Reveal on scroll (ligero y pro)
(() => {
  const els = document.querySelectorAll('.reveal');
  if (!els.length) return;

  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add('is-visible');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.18 });

  els.forEach(el => io.observe(el));
})();
//
document.querySelectorAll('.c-btn').forEach(btn=>{
  btn.addEventListener('click', () => {
    btn.classList.add('pressed');
    setTimeout(()=> btn.classList.remove('pressed'), 160);
  });
});
//
// Animación suave al cargar
window.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".plan-card").forEach((card,i)=>{
    card.style.opacity = 0;
    card.style.transform = "translateY(20px)";
    setTimeout(()=>{
      card.style.transition = ".6s ease";
      card.style.opacity = 1;
      card.style.transform = "translateY(0)";
    }, i * 150);
  });
});
const partners = document.querySelectorAll(".partner-card");

const observer = new IntersectionObserver(entries=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      entry.target.style.opacity = 1;
      entry.target.style.transform = "translateY(0)";
    }
  });
});

partners.forEach(card=>{
  card.style.opacity = 0;
  card.style.transform = "translateY(20px)";
  card.style.transition = "all .6s ease";
  observer.observe(card);
});
(() => {
  const els = document.querySelectorAll('.reveal');
  if (!els.length) return;

  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      e.target.classList.add('is-visible');
      io.unobserve(e.target);
    });
  }, { threshold: 0.15 });

  els.forEach(el => io.observe(el));
})();
(() => {
  const form = document.getElementById('chatForm');
  const input = document.getElementById('chatText');
  const body  = document.getElementById('chatBody');

  if (!form || !input || !body) return;

  const addMsg = (who, text) => {
    const wrap = document.createElement('div');
    wrap.className = `msg ${who}`;

    if (who === 'bot') {
      const av = document.createElement('div');
      av.className = 'avatar';
      av.textContent = '🤖';
      wrap.appendChild(av);
    }

    const b = document.createElement('div');
    b.className = 'bubble';
    b.textContent = text;
    wrap.appendChild(b);

    body.appendChild(wrap);
    body.scrollTop = body.scrollHeight;
  };

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const txt = (input.value || '').trim();
    if (!txt) return;

    addMsg('user', txt);
    input.value = '';

    setTimeout(() => {
      addMsg('bot', 'Entendido. Dame un dato más (tipo de motor / voltaje / contexto) y te respondo con un ejemplo.');
    }, 450);
  });
})();
(() => {
  const form = document.getElementById('contactForm');
  const msg  = document.getElementById('contactMsg');
  if (!form || !msg) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    msg.textContent = "✅ Mensaje listo. Conecta este formulario a tu backend para enviarlo por correo/BD.";
    form.reset();
  });
})();