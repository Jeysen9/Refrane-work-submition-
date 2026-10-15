/* RecruitFlow OS 2.3: cinematic reveal -> shared-logo flight -> staged landing-page arrival.
   A timed CSS sequence, not a second video. Skipping and reduced motion remain accessible. */
import { brand } from '../data/site.js';

const STORAGE_KEY = 'recruitflowos-v2-intro-seen';
const REDUCE = '(prefers-reduced-motion: reduce)';
const INTRO_DURATION = 4350;
const FLIGHT_DURATION = 1050;

export function initCinematicIntro() {
  if (document.body.dataset.page !== 'platform') return;
  const replay = document.querySelector('[data-replay-intro]');
  const play = ({ replaying = false } = {}) => {
    if (matchMedia(REDUCE).matches || (!replaying && (location.hash || alreadySeen()))) return;
    if (document.querySelector('.cinematic-intro')) return;

    // On replay, reset the animation as well as returning to the real top of the page.
    document.body.classList.remove('intro-complete', 'intro-handoff');
    document.body.classList.add('intro-playing');
    const overlay = document.createElement('div');
    overlay.className = 'cinematic-intro';
    overlay.setAttribute('role', 'dialog');
    overlay.setAttribute('aria-modal', 'true');
    overlay.setAttribute('aria-label', 'Introducing RecruitFlow OS 2.0');
    overlay.innerHTML = `
      <div class="cinematic-intro__grain" aria-hidden="true"></div>
      <div class="cinematic-intro__glow" aria-hidden="true"></div>
      <div class="cinematic-intro__content">
        <span class="cinematic-intro__kicker">INTRODUCING</span>
        <div class="cinematic-intro__emblem" aria-hidden="true">
          ${Array.from({length: 9}, (_, i) => `<img class="cinematic-intro__logo-layer" src="${brand.logo}" alt="" style="--layer:${i}">`).join('')}
        </div>
        <div class="cinematic-intro__wordmark">RECRUIT<span>FLOW</span> <sup>OS</sup></div>
        <div class="cinematic-intro__rule" aria-hidden="true"><i></i></div>
        <div class="cinematic-intro__version"><span>VERSION</span><strong>2.0</strong></div>
      </div>
      <div class="cinematic-intro__bottom"><span class="cinematic-intro__progress" aria-hidden="true"><i></i></span><button type="button" class="cinematic-intro__skip">Skip intro <span aria-hidden="true">↗</span></button></div>
    `;
    document.body.append(overlay);
    document.body.classList.add('cinematic-lock');
    const previousFocus = document.activeElement;
    const background = ['site-header', 'page-content', 'site-footer'].map(id => document.getElementById(id)).filter(Boolean);
    background.forEach(el => { el.inert = true; });
    const skip = overlay.querySelector('.cinematic-intro__skip');
    skip.focus({preventScroll: true});
    let finished = false;
    let exitTimer;

    const completeLanding = flight => {
      // The hero mark takes over on precisely the next paint; content follows in stages.
      document.body.classList.remove('intro-playing', 'intro-handoff', 'cinematic-lock');
      document.body.classList.add('intro-complete');
      background.forEach(el => { el.inert = false; });
      overlay.remove();
      flight?.remove();
      if (previousFocus && previousFocus.isConnected && previousFocus !== document.body) {
        previousFocus.focus({preventScroll:true});
      }
    };

    const finish = ({ immediate = false } = {}) => {
      if (finished) return;
      finished = true;
      clearTimeout(exitTimer);
      markSeen();
      document.body.classList.remove('intro-playing');
      document.body.classList.add('intro-handoff');
      overlay.classList.add('cinematic-intro--leaving');

      // A separate sculpted mark flies from the intro to the actual 3D hero position,
      // so the logo does not cut/dissolve into a visually unrelated second logo.
      const source = overlay.querySelector('.cinematic-intro__emblem');
      const target = document.querySelector('.hero-logo-depth');
      if (!source || !target || immediate) {
        completeLanding();
        return;
      }
      const from = source.getBoundingClientRect();
      const to = target.getBoundingClientRect();
      if (!from.width || !to.width) {
        completeLanding();
        return;
      }
      const flight = document.createElement('div');
      flight.className = 'cinematic-logo-flight';
      flight.setAttribute('aria-hidden', 'true');
      flight.innerHTML = source.innerHTML;
      Object.assign(flight.style, {
        left: `${from.left}px`, top: `${from.top}px`,
        width: `${from.width}px`, height: `${from.height}px`
      });
      document.body.append(flight);
      source.classList.add('cinematic-intro__emblem--handed-off');
      requestAnimationFrame(() => requestAnimationFrame(() => {
        flight.style.left = `${to.left}px`;
        flight.style.top = `${to.top}px`;
        flight.style.width = `${to.width}px`;
        flight.style.height = `${to.height}px`;
        flight.classList.add('cinematic-logo-flight--arriving');
      }));
      setTimeout(() => completeLanding(flight), FLIGHT_DURATION);
    };

    skip.addEventListener('click', () => finish());
    overlay.addEventListener('keydown', e => {
      if (e.key === 'Escape') finish();
    });
    exitTimer = setTimeout(finish, INTRO_DURATION);
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) finish({ immediate:true });
    }, {once:true});
  };

  replay?.addEventListener('click', () => {
    window.scrollTo({top:0, behavior:'auto'});
    play({replaying:true});
  });
  play();
}

function alreadySeen() {
  try { return sessionStorage.getItem(STORAGE_KEY) === 'yes'; } catch { return false; }
}
function markSeen() {
  try { sessionStorage.setItem(STORAGE_KEY, 'yes'); } catch { /* Storage is optional. */ }
}
