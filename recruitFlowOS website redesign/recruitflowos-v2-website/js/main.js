import { renderHeader } from './components/header.js';
import { renderFooter } from './components/footer.js';
import { initMotion } from './components/motion.js';
import { initPageTransitions } from './components/page-transitions.js';
import { initAtmosphere } from './components/atmosphere.js';
import { initBooking } from './components/booking.js';
import { initCinematicIntro } from './components/intro.js';
import { renderPlatform } from './pages/platform.js';
import { renderFeatures } from './pages/features.js';
import { renderPricing, initPricingInteractions } from './pages/pricing.js';
import { renderCaseStudies } from './pages/case-studies.js';
import { renderLegal } from './pages/legal.js';

const pageKey = document.body.dataset.page || 'platform';
const headerSlot = document.getElementById('site-header');
const footerSlot = document.getElementById('site-footer');
const pageRoot = document.getElementById('page-content');

const pageRenderers = {
  platform: renderPlatform,
  features: renderFeatures,
  pricing: renderPricing,
  'case-studies': renderCaseStudies
};

if (headerSlot) headerSlot.innerHTML = renderHeader(['privacy', 'terms', 'refunds'].includes(pageKey) ? '' : pageKey);
if (pageRoot) {
  if (pageRenderers[pageKey]) pageRenderers[pageKey](pageRoot);
  else renderLegal(pageRoot, pageKey);
}
if (footerSlot) footerSlot.innerHTML = renderFooter();

function initMobileNavigation() {
  const toggle = document.querySelector('[data-menu-toggle]');
  const panel = document.getElementById('mobile-nav');
  if (!toggle || !panel) return;

  const closeMenu = () => {
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Open navigation menu');
    panel.hidden = true;
    document.body.classList.remove('mobile-menu-open');
  };

  toggle.addEventListener('click', () => {
    const opening = toggle.getAttribute('aria-expanded') !== 'true';
    toggle.setAttribute('aria-expanded', String(opening));
    toggle.setAttribute('aria-label', opening ? 'Close navigation menu' : 'Open navigation menu');
    panel.hidden = !opening;
    document.body.classList.toggle('mobile-menu-open', opening);
  });

  panel.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
  // Closing on outside taps avoids leaving a tall navigation overlay on mobile.
  document.addEventListener('pointerdown', event => {
    if (toggle.getAttribute('aria-expanded') === 'true' && !panel.contains(event.target) && !toggle.contains(event.target)) closeMenu();
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') closeMenu();
  });
  window.addEventListener('resize', () => {
    if (window.innerWidth > 900) closeMenu();
  }, { passive: true });
}

function initFeatureNavigation() {
  const tabs = [...document.querySelectorAll('[data-feature-tab]')];
  const sections = tabs.map(tab => document.getElementById(tab.dataset.featureTab)).filter(Boolean);
  if (!tabs.length || !sections.length) return;

  tabs.forEach(tab => tab.addEventListener('click', event => {
    const target = document.getElementById(tab.dataset.featureTab);
    if (!target) return;
    event.preventDefault();
    target.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'start' });
  }));

  if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const observer = new IntersectionObserver(entries => {
      const visible = entries.filter(entry => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (!visible) return;
      tabs.forEach(tab => {
        const active = tab.dataset.featureTab === visible.target.id;
        tab.classList.toggle('is-active', active);
        if (active) tab.setAttribute('aria-current', 'location');
        else tab.removeAttribute('aria-current');
      });
    }, { rootMargin: '-22% 0px -58% 0px', threshold: [0.08, 0.18, 0.35, 0.5] });
    sections.forEach(section => observer.observe(section));
  }
}

function initHashNavigation() {
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    if (link.matches('[data-feature-tab]')) return;
    link.addEventListener('click', event => {
      const id = link.getAttribute('href').slice(1);
      const target = document.getElementById(id);
      if (!target) return;
      event.preventDefault();
      history.replaceState(null, '', `#${id}`);
      target.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'start' });
    });
  });
}

initPageTransitions(pageKey);
initAtmosphere();
initMobileNavigation();
initFeatureNavigation();
initHashNavigation();
if (pageKey === 'pricing') initPricingInteractions();
initMotion();
initBooking();
initCinematicIntro();

/* If a browser lands on a hash before JS paints, align it after page content is ready. */
if (window.location.hash) {
  requestAnimationFrame(() => {
    const target = document.getElementById(decodeURIComponent(window.location.hash.slice(1)));
    if (target) target.scrollIntoView({ block: 'start' });
  });
}
