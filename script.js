// NAVBAR SCROLL (optimized)
const navbar = document.getElementById('navbar');
let navTicking = false;

window.addEventListener('scroll', () => {
  if (!navTicking) {
    requestAnimationFrame(() => {
      navbar.classList.toggle('scrolled', window.scrollY > 50);
      navTicking = false;
    });
    navTicking = true;
  }
});

// MOBILE TOGGLE
const navToggle = document.getElementById('navToggle');
const navLinks = document.querySelector('.nav-links');
navToggle.addEventListener('click', () => {
  navToggle.classList.toggle('active');
  navLinks.classList.toggle('active');
});

// CLOSE MENU ON LINK CLICK
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    navToggle.classList.remove('active');
    navLinks.classList.remove('active');
  });
});

// SCROLL REVEAL
const revealElements = document.querySelectorAll(
  '.sobre-grid, .categoria-card, .gallery-item, .depoimentos-carousel, .contato-inner, .insta-banner, .section-header'
);

revealElements.forEach(el => el.classList.add('reveal'));

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

revealElements.forEach(el => revealObserver.observe(el));

// DEPOIMENTOS CAROUSEL
const depoimentos = document.querySelectorAll('.depoimento');
const dots = document.querySelectorAll('.dot');
let currentDepoimento = 0;
let depoimentoInterval;

function showDepoimento(index) {
  depoimentos.forEach(d => d.classList.remove('active'));
  dots.forEach(d => d.classList.remove('active'));
  depoimentos[index].classList.add('active');
  dots[index].classList.add('active');
  currentDepoimento = index;
}

function nextDepoimento() {
  const next = (currentDepoimento + 1) % depoimentos.length;
  showDepoimento(next);
}

dots.forEach(dot => {
  dot.addEventListener('click', () => {
    const index = parseInt(dot.dataset.index);
    showDepoimento(index);
    clearInterval(depoimentoInterval);
    depoimentoInterval = setInterval(nextDepoimento, 5000);
  });
});

depoimentoInterval = setInterval(nextDepoimento, 5000);

// SMOOTH SCROLL FOR NAV LINKS
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// PARALLAX ON HERO (optimized)
let ticking = false;
const heroContent = document.querySelector('.hero-content');

function updateParallax() {
  const scrolled = window.scrollY;
  if (scrolled < window.innerHeight) {
    heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
    heroContent.style.opacity = 1 - (scrolled / window.innerHeight);
  }
  ticking = false;
}

window.addEventListener('scroll', () => {
  if (!ticking) {
    requestAnimationFrame(updateParallax);
    ticking = true;
  }
});

// MAPAS MODAL
function abrirMapas() {
  document.getElementById('mapasModal').classList.add('ativo');
}

function fecharMapas() {
  document.getElementById('mapasModal').classList.remove('ativo');
}