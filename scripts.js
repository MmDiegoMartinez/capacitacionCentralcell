/* ============================================
   Innovación Móvil — scripts.js
   ============================================ */

// ---- FAQ Accordion ----
document.querySelectorAll('.faq-q').forEach(btn => {
  btn.addEventListener('click', () => {
    const item = btn.closest('.faq-item');
    const isOpen = item.classList.contains('open');
    // Close all
    document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
    // Toggle current
    if (!isOpen) item.classList.add('open');
  });
});

// ---- Intersection Observer for entrance animations ----
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      // Stagger cards
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, entry.target.dataset.delay || 0);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

// Add stagger delays to grid children
function addStaggerDelay(selector, baseDelay = 80) {
  document.querySelectorAll(selector).forEach((el, i) => {
    el.dataset.delay = i * baseDelay;
  });
}

addStaggerDelay('.corte-card', 80);
addStaggerDelay('.product-card', 100);
addStaggerDelay('.tip-item', 70);
addStaggerDelay('.faq-item', 60);

// Observe all animated elements
document.querySelectorAll(
  '.hero-content, .hero-visual, .corte-card, .product-card, .tip-item, .faq-item'
).forEach(el => observer.observe(el));

// ---- Active nav link on scroll ----
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

const navObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => {
        link.style.color = '';
        if (link.getAttribute('href') === '#' + entry.target.id) {
          link.style.color = 'var(--cyan)';
        }
      });
    }
  });
}, { threshold: 0.4 });

sections.forEach(s => navObserver.observe(s));

// ---- Navbar shrink on scroll ----
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    navbar.style.padding = '0.6rem 4%';
  } else {
    navbar.style.padding = '1rem 4%';
  }
});

// ---- Smooth CTA scroll ----
document.querySelector('.nav-cta').addEventListener('click', () => {
  document.querySelector('#productos').scrollIntoView({ behavior: 'smooth' });
});
