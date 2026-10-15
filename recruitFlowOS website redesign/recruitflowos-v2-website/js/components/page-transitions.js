/* Page and content entrances are progressive enhancements.
   Modern Chromium handles same-origin document navigation with CSS view transitions;
   older browsers get a brief exit + entrance without changing the routing model. */
export function initPageTransitions(pageKey) {
  const content = document.getElementById('page-content');
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Existing semantic sections stay intact. Animate only the entry of content
  // the viewer is approaching; stagger neighbouring cards for visual breathing room.
  if (content && pageKey !== 'platform') {
    const entrySelectors = [
      '.page-hero h1', '.page-hero > p', '.page-hero > .hero-announcement',
      '.billing-toggle', '.plan-card', '.comparison-trigger-wrap',
      '.team-structure .section-heading', '.segment-tabs',
      '.pricing-faq__intro', '.faq-item', '.pricing-final-cta',
      '.feature-card', '.feature-detail', '.feature-intro',
      '.story-summary', '.case-story', '.why-teams__item', '.stories-demo',
      '.legal-article', '.legal-hero'
    ];
    const elements = [...new Set(entrySelectors.flatMap(selector => [...content.querySelectorAll(selector)]))];
    elements.forEach((el, index) => {
      if (el.classList.contains('reveal')) return;
      el.classList.add('reveal');
      if (el.matches('.page-hero h1')) el.style.setProperty('--reveal-delay', '70ms');
      else if (el.matches('.page-hero > p')) el.style.setProperty('--reveal-delay', '175ms');
      else if (el.matches('.billing-toggle')) el.style.setProperty('--reveal-delay', '265ms');
      else if (el.matches('.faq-item')) el.style.setProperty('--reveal-delay', `${Math.min(index % 4, 3) * 65}ms`);
    });
  }

  if (reduced || 'startViewTransition' in document) return;
  if (content) content.classList.add('page-entry-fallback');
  let leaving = false;
  document.addEventListener('click', event => {
    const link = event.target.closest?.('a[href]');
    if (leaving || !link || event.defaultPrevented || event.button !== 0 ||
        event.metaKey || event.ctrlKey || event.shiftKey || event.altKey ||
        link.hasAttribute('download') || link.target && link.target !== '_self') return;
    const destination = new URL(link.href, window.location.href);
    if (destination.origin !== window.location.origin ||
        destination.pathname === window.location.pathname ||
        !/\.html$/.test(destination.pathname)) return;
    event.preventDefault();
    leaving = true;
    document.body.classList.add('is-navigating-away');
    window.setTimeout(() => { window.location.assign(destination.href); }, 230);
  });
}
