// ===========================================
// DAILYWIN LANDING PAGE - MAIN JS
// ===========================================

// SVG Icons for Theme Toggle
const icons = {
    moon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>`,
    sun: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>`
};

// ---------- Theme Toggle ----------
const updateLogos = (theme) => {
    const logoLight = 'assets/logo-light.png';
    const logoDark = 'assets/logo-dark.png';
    // Select all logos (header and footer)
    const logos = document.querySelectorAll('.nav__logo img, .footer__logo img, .phone-mockup__logo');

    logos.forEach(logo => {
        if (logo) {
            logo.src = theme === 'dark' ? logoDark : logoLight;
        }
    });
};

const initTheme = () => {
    const themeToggle = document.querySelector('.theme-toggle');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    // Check saved preference or system preference
    const savedTheme = localStorage.getItem('dailywin-theme');
    const initialTheme = savedTheme || (prefersDark ? 'dark' : 'light');

    document.documentElement.setAttribute('data-theme', initialTheme);
    updateThemeIcon(initialTheme);
    updateLogos(initialTheme);

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('dailywin-theme', newTheme);
            updateThemeIcon(newTheme);
            updateLogos(newTheme);

            // Add subtle pulse to logos
            anime({
                targets: '.nav__logo img',
                scale: [0.9, 1],
                duration: 400,
                easing: 'easeOutElastic(1, .8)'
            });
        });
    }
};

const updateThemeIcon = (theme) => {
    const themeToggle = document.querySelector('.theme-toggle');
    if (themeToggle) {
        themeToggle.innerHTML = theme === 'dark' ? icons.sun : icons.moon;
    }
};

// ---------- Mobile Navigation ----------
const initMobileNav = () => {
    const toggle = document.querySelector('.nav__mobile-toggle');
    const links = document.querySelector('.nav__links');

    if (toggle && links) {
        toggle.addEventListener('click', () => {
            links.classList.toggle('active');
            toggle.classList.toggle('active');
        });

        // Close on link click
        links.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                links.classList.remove('active');
                toggle.classList.remove('active');
            });
        });
    }
};

// ---------- Scroll Animations ----------
const initScrollAnimations = () => {
    const animateElements = document.querySelectorAll('.animate-on-scroll');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    animateElements.forEach(el => observer.observe(el));
};

// ---------- Anime.js Animations ----------
const initAnimeAnimations = () => {
    // Check if anime.js is loaded
    if (typeof anime === 'undefined') return;

    // Hero title animation
    const heroTitle = document.querySelector('.hero__title');
    if (heroTitle) {
        anime({
            targets: '.hero__title',
            opacity: [0, 1],
            translateY: [30, 0],
            duration: 800,
            easing: 'easeOutExpo',
            delay: 300
        });
    }

    // Hero description animation
    anime({
        targets: '.hero__description',
        opacity: [0, 1],
        translateY: [30, 0],
        duration: 800,
        easing: 'easeOutExpo',
        delay: 500
    });

    // Hero CTA animation
    anime({
        targets: '.hero__cta',
        opacity: [0, 1],
        translateY: [30, 0],
        duration: 800,
        easing: 'easeOutExpo',
        delay: 700
    });

    // Phone mockup animation
    anime({
        targets: '.phone-mockup',
        opacity: [0, 1],
        scale: [0.9, 1],
        duration: 1000,
        easing: 'easeOutExpo',
        delay: 400
    });

    // Floating elements animation
    anime({
        targets: '.floating-element',
        translateY: [-20, 20],
        duration: 3000,
        direction: 'alternate',
        loop: true,
        easing: 'easeInOutSine',
        delay: anime.stagger(500)
    });

    // Feature cards stagger animation on scroll
    const featureCards = document.querySelectorAll('.feature-card');
    if (featureCards.length > 0) {
        const featureObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    anime({
                        targets: '.feature-card',
                        opacity: [0, 1],
                        translateY: [50, 0],
                        duration: 800,
                        easing: 'easeOutExpo',
                        delay: anime.stagger(100)
                    });
                    featureObserver.disconnect();
                }
            });
        }, { threshold: 0.1 });

        featureObserver.observe(featureCards[0]);
    }

    // Stats counter animation
    const stats = document.querySelectorAll('.stat__number');
    if (stats.length > 0) {
        const statsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    stats.forEach(stat => {
                        const target = parseInt(stat.getAttribute('data-count')) || 0;
                        anime({
                            targets: stat,
                            innerHTML: [0, target],
                            round: 1,
                            duration: 2000,
                            easing: 'easeOutExpo'
                        });
                    });
                    statsObserver.disconnect();
                }
            });
        }, { threshold: 0.5 });

        statsObserver.observe(stats[0]);
    }
};

// ---------- Smooth Scroll for Anchor Links ----------
const initSmoothScroll = () => {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
};

// ---------- Active Nav Link ----------
const initActiveNavLink = () => {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav__links a');

    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage || (currentPage === '' && href === 'index.html')) {
            link.classList.add('active');
        }
    });
};

// ---------- Initialize All ----------
document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initMobileNav();
    initScrollAnimations();
    initSmoothScroll();
    initActiveNavLink();

    // Init anime.js animations after a short delay
    setTimeout(initAnimeAnimations, 100);
});

// ---------- Window Load for Final Animations ----------
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});
