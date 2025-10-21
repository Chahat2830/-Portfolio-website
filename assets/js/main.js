// main.js — initialize UI features (Typed.js, AOS, header toggle, scroll-top, swiper)
document.addEventListener('DOMContentLoaded', function () {
  // AOS
  if (window.AOS) AOS.init({ duration: 700, once: true, easing: 'ease-out-cubic' });

  // Typed.js (hero)
  try {
    const typedEl = document.querySelector('.typed');
    if (typedEl && window.Typed) {
      const items = typedEl.getAttribute('data-typed-items') || '';
      const parsed = items.split(',').map(s => s.trim());
      new Typed(typedEl, { strings: parsed, typeSpeed: 60, backSpeed: 35, backDelay: 2000, loop: true });
    }
  } catch (e) { console.warn('Typed.js init failed', e); }

  // Mobile header toggle: show/hide navmenu
  const navmenu = document.getElementById('navmenu');
  const toggles = document.querySelectorAll('#navToggle, #navToggle2, #navToggle3');
  toggles.forEach(t => t && t.addEventListener('click', () => {
    if (!navmenu) return;
    // toggle with class for smoother CSS control
    if (navmenu.style.display === 'block') navmenu.style.display = '';
    else navmenu.style.display = 'block';
  }));

  // Smooth scrolling for internal anchors
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (!href || href === '#') return;
      if (href.startsWith('#')) {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // Scroll to top button
  const scrollTop = document.getElementById('scroll-top');
  window.addEventListener('scroll', () => {
    if (!scrollTop) return;
    if (window.scrollY > 300) scrollTop.style.display = 'flex';
    else scrollTop.style.display = 'none';
  });
  if (scrollTop) {
    scrollTop.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // Init Swiper if present (simple automatic init)
  try {
    if (window.Swiper) {
      document.querySelectorAll('.init-swiper').forEach((container) => {
        const configEl = container.querySelector('.swiper-config');
        let cfg = {};
        if (configEl) {
          try { cfg = JSON.parse(configEl.textContent.trim()); } catch (e) { cfg = {}; }
        }
        // default fallback
        const swiper = new Swiper(container, Object.assign({
          loop: true,
          pagination: { el: container.querySelector('.swiper-pagination'), clickable: true },
          autoplay: { delay: 4000 }
        }, cfg));
      });
    }
  } catch (e) { console.warn('Swiper init error', e); }

  // tiny hover: increase bar gloss on pointer
  document.querySelectorAll('.gradient-bar').forEach(bar => {
    bar.addEventListener('mouseenter', () => { bar.style.boxShadow = "0 18px 50px rgba(0,0,0,0.45), 0 10px 40px rgba(123,110,255,0.18)"; });
    bar.addEventListener('mouseleave', () => { bar.style.boxShadow = ""; });
  });

});
