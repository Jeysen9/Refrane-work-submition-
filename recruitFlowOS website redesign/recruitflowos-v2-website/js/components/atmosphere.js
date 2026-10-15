import { brand } from '../data/site.js';

/** Soft 3D RecruitFlow mark and ambient light. Injected into editorial sections only. */
export function initAtmosphere() {
  const root = document.getElementById('page-content');
  if (!root) return;
  const sections = root.querySelectorAll([
    '.problem-section', '.demo-section', '.process-section', '.core-feature-section',
    '.testimonials-section', '.booking-section', '.page-hero', '.feature-details-wrap',
    '.additional-features', '.closing-cta', '.pricing-plans', '.team-structure',
    '.pricing-faq', '.pricing-final-cta', '.case-stories', '.why-teams', '.stories-demo', '.legal-page'
  ].join(','));
  sections.forEach((section, index) => {
    if (section.querySelector(':scope > .ambient-identity')) return;
    section.classList.add('ambient-section');
    section.style.setProperty('--ambient-offset', index % 2 ? '-25%' : '25%');
    section.style.setProperty('--ambient-offset-small', index % 2 ? '-19%' : '19%');
    section.style.setProperty('--ambient-angle', index % 2 ? '19deg' : '-19deg');
    section.style.setProperty('--ambient-angle-enter', index % 2 ? '23deg' : '-23deg');
    const background = document.createElement('div');
    background.className = 'ambient-identity';
    background.setAttribute('aria-hidden', 'true');
    background.innerHTML = `<div class="ambient-identity__glow"></div><div class="ambient-identity__sculpture">${[0,1,2,3,4].map(layer => `<img src="${brand.logo}" alt="" draggable="false" style="--depth-layer:${layer}">`).join('')}</div>`;
    section.prepend(background);
  });

  if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        entry.target.classList.toggle('ambient-in-view', entry.isIntersecting);
      });
    }, { rootMargin: '22% 0px 22% 0px', threshold: 0 });
    sections.forEach(section => observer.observe(section));
  } else {
    sections.forEach(section => section.classList.add('ambient-in-view'));
  }
}
