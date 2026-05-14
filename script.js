// Theme toggle
const html      = document.documentElement;
const toggleBtn = document.getElementById('theme-toggle');

function getTheme() {
  return html.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
}

function applyTheme(theme) {
  if (theme === 'light') {
    html.setAttribute('data-theme', 'light');
  } else {
    html.removeAttribute('data-theme');
  }
  toggleBtn?.setAttribute('aria-pressed', theme === 'light' ? 'true' : 'false');
}

applyTheme(getTheme());

toggleBtn?.addEventListener('click', () => {
  const next = getTheme() === 'dark' ? 'light' : 'dark';
  applyTheme(next);
  localStorage.setItem('theme', next);
});

// Scroll-reveal animation
const observer = new IntersectionObserver(
  (entries) => entries.forEach(e => e.isIntersecting && e.target.classList.add('visible')),
  { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
);

document.querySelectorAll('.project-card, .skill-group, .about-grid, .contact-intro')
  .forEach(el => { el.classList.add('fade-in'); observer.observe(el); });

// Highlight active nav link on scroll
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

const navObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        navLinks.forEach(a => a.style.color = '');
        const active = document.querySelector(`.nav-links a[href="#${e.target.id}"]`);
        if (active) active.style.color = 'var(--accent)';
      }
    });
  },
  { threshold: 0.4 }
);

sections.forEach(s => navObserver.observe(s));

// Mobile nav toggle (minimal — just logs intent; expand if adding mobile menu)
document.querySelector('.nav-toggle')?.addEventListener('click', () => {
  const links = document.querySelector('.nav-links');
  links.style.display = links.style.display === 'flex' ? 'none' : 'flex';
  links.style.flexDirection = 'column';
  links.style.position = 'absolute';
  links.style.top = 'var(--nav-h)';
  links.style.right = '0';
  links.style.background = 'var(--bg)';
  links.style.padding = '1.5rem 2rem';
  links.style.borderBottom = '1px solid var(--border)';
  links.style.width = '100%';
});
