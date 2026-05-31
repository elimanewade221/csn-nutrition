/* ═══════════════════════════════════════
   CSN NUTRITION — MAIN JAVASCRIPT
═══════════════════════════════════════ */

/* ─── SCROLL ANIMATIONS ─── */
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const delay = parseInt(entry.target.dataset.delay || 0);
      setTimeout(() => entry.target.classList.add('visible'), delay);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

function initAnimations() {
  document.querySelectorAll('[data-animate]').forEach(el => observer.observe(el));
}

/* ─── STICKY HEADER ─── */
function initStickyHeader() {
  const header = document.getElementById('header');
  if (!header) return;
  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 40);
  }, { passive: true });
}

/* ─── SEARCH ─── */
function initSearch() {
  const toggle = document.getElementById('searchToggle');
  const bar    = document.getElementById('searchBar');
  const close  = document.getElementById('searchClose');
  const input  = document.getElementById('searchInput');
  if (!toggle || !bar) return;

  toggle.addEventListener('click', () => {
    bar.classList.toggle('open');
    if (bar.classList.contains('open')) {
      input?.focus();
      // Fermer le menu mobile si ouvert
      document.getElementById('nav')?.classList.remove('open');
      document.getElementById('hamburger')?.classList.remove('active');
    }
  });
  close?.addEventListener('click', () => bar.classList.remove('open'));

  // Fermer avec Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') bar.classList.remove('open');
  });
}

/* ─── MENU HAMBURGER ─── */
function initHamburger() {
  const hamburger = document.getElementById('hamburger');
  const nav       = document.getElementById('nav');
  if (!hamburger || !nav) return;

  hamburger.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('open');
    hamburger.classList.toggle('active', isOpen);
    // Bloquer le scroll body quand le menu est ouvert
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  // Fermer quand on clique un lien (sauf les liens # vides)
  nav.querySelectorAll('a[href]:not([href="#"])').forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove('open');
      hamburger.classList.remove('active');
      document.body.style.overflow = '';
    });
  });

  // Fermer en cliquant en dehors
  document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !nav.contains(e.target)) {
      nav.classList.remove('open');
      hamburger.classList.remove('active');
      document.body.style.overflow = '';
    }
  });
}

/* ─── SMOOTH SCROLL (ancres sur la même page) ─── */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      const id = a.getAttribute('href');
      if (id === '#') return;
      const target = document.querySelector(id);
      if (target) {
        e.preventDefault();
        const headerH = document.getElementById('header')?.offsetHeight || 0;
        const top = target.getBoundingClientRect().top + window.scrollY - headerH - 12;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });
}

/* ─── INIT ─── */
document.addEventListener('DOMContentLoaded', () => {
  initAnimations();
  initStickyHeader();
  initSearch();
  initHamburger();
  initSmoothScroll();
});
