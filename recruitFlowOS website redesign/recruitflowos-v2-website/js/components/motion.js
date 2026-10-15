/* Motion is progressive enhancement: content remains readable if this file fails. */
export function initMotion() {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  document.documentElement.classList.toggle('reduce-motion', reduceMotion.matches);

  if (!reduceMotion.matches && 'IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -36px 0px' });
    document.querySelectorAll('.reveal:not(.is-visible)').forEach(el => revealObserver.observe(el));
  } else {
    document.querySelectorAll('.reveal').forEach(el => el.classList.add('is-visible'));
  }

  // On touch / narrow screens, avoid viewport-dependent writes while the browser URL bar moves.
  const mobileStable = window.matchMedia('(max-width: 900px), (pointer: coarse)').matches;
  initHeroScroll(reduceMotion.matches);
  initProcessScroll(reduceMotion.matches);
  initChapterBridges(reduceMotion.matches || mobileStable);
}

function initHeroScroll(reduced) {
  const hero = document.querySelector('[data-hero-scene]');
  if (!hero || reduced) return;
  const mobile = window.matchMedia('(max-width: 900px), (pointer: coarse)').matches;
  // Mobile uses stable document scroll offsets rather than the moving browser chrome.
  let queued = false;

  const update = () => {
    const rect = hero.getBoundingClientRect();
    const maxDistance = mobile ? Math.max(250, hero.offsetHeight - 600) : Math.max(1, rect.height - window.innerHeight);
    const distance = mobile ? window.scrollY - hero.offsetTop : -rect.top;
    const progress = Math.min(1, Math.max(0, distance / maxDistance));
    hero.style.setProperty('--hero-progress', progress.toFixed(3));
    // One scroll-driven turn stops at 180°: the final mark deliberately faces backwards.
    hero.style.setProperty('--logo-angle', `${(-19 + (199 * progress))}deg`);
    hero.style.setProperty('--logo-x', `${(-8 + 8 * progress)}px`);
    hero.style.setProperty('--logo-y', `${(6 - 20 * progress)}px`);
    hero.style.setProperty('--logo-scale', `${(1 - 0.37 * progress).toFixed(3)}`);
    hero.style.setProperty('--logo-alpha', `${(1 - .48 * progress).toFixed(3)}`);
    hero.style.setProperty('--hero-backdrop-y', `${(progress * 90).toFixed(2)}px`);
    hero.style.setProperty('--copy-y', `${(-18 * progress)}px`);
    hero.style.setProperty('--copy-opacity', `${(1 - 0.28 * progress).toFixed(3)}`);
    hero.style.setProperty('--float-left-y', `${(-18 * progress)}px`);
    hero.style.setProperty('--float-right-y', `${(20 * progress)}px`);
    queued = false;
  };

  const onScroll = () => {
    if (queued) return;
    queued = true;
    window.requestAnimationFrame(update);
  };
  update();
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll, { passive: true });
}

/* Illuminate only the timeline item currently being read; all text remains present. */
function initProcessScroll(reduced) {
  if (reduced || !('IntersectionObserver' in window)) return;
  const items = [...document.querySelectorAll('.process-step')];
  if (!items.length) return;
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => entry.target.classList.toggle('process-step--current', entry.isIntersecting));
  }, { rootMargin: '-25% 0px -25% 0px', threshold: .15 });
  items.forEach(item => observer.observe(item));
}

/* Small typographic bridges travel much more slowly than the page. */
function initChapterBridges(reduced) {
  if (reduced) return;
  const bridges = [...document.querySelectorAll('.chapter-bridge')];
  if (!bridges.length) return;
  let scheduled = false;
  const tick = () => {
    for (const bridge of bridges) {
      const rect = bridge.getBoundingClientRect();
      const progress = (rect.top + rect.height / 2 - innerHeight / 2) / innerHeight;
      bridge.style.setProperty('--bridge-offset', `${Math.max(-100, Math.min(100,progress*65)).toFixed(1)}px`);
    }
    scheduled = false;
  };
  const onScroll = () => {
    if (scheduled) return;
    scheduled = true;
    requestAnimationFrame(tick);
  };
  tick();
  window.addEventListener('scroll', onScroll, {passive:true});
  window.addEventListener('resize', onScroll, {passive:true});
}
