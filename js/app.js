/* ── THEME TOGGLE ── */
const html = document.documentElement;
const btn = document.getElementById('themeToggle');
const logo = document.getElementById('siteLogo');
const footerLogo = document.getElementById('footerLogo');

// Restore saved preference
const saved = localStorage.getItem('te-theme') || 'dark';
html.setAttribute('data-theme', saved);
updateLogo();
updateFooterLogo;

btn.addEventListener('click', () => {
    const next = html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    html.setAttribute('data-theme', next);
    localStorage.setItem('te-theme', next);
    updateLogo();
    updateFooterLogo();
    updateNav();
});

/* ── NAV SCROLL ── */
const nav = document.getElementById('main-nav');

function updateNav() {
    const light = html.getAttribute('data-theme') === 'light';
    const scrolled = window.scrollY > 50;
    if (light) {
        nav.style.background = scrolled ? 'rgba(240,244,255,0.98)' : 'rgba(240,244,255,0.88)';
    } else {
        nav.style.background = scrolled ? 'rgba(2,8,23,0.97)' : 'rgba(2,8,23,0.85)';
    }
}

// Logo nav
function updateLogo() {
    const theme = html.getAttribute('data-theme');
    logo.src = theme === 'light'
        ? logo.dataset.lightSrc
        : logo.dataset.darkSrc;
}

// Logo footer
function updateFooterLogo() {
    if (!footerLogo) return;

    const theme = html.getAttribute('data-theme');

    footerLogo.src = theme === 'light'
        ? footerLogo.dataset.lightSrc
        : footerLogo.dataset.darkSrc;
}

window.addEventListener('scroll', updateNav);
updateNav();

/* ── SCROLL REVEAL ── */
const reveals = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
            setTimeout(() => entry.target.classList.add('visible'), i * 60);
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });
reveals.forEach(el => observer.observe(el));