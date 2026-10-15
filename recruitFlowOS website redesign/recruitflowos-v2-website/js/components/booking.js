import { brand } from '../data/site.js';

/** Official Calendly inline widget (same-page, mobile and desktop). */
export function initBooking() {
  const frame = document.getElementById('calendly-embed');
  if (!frame) return;
  const shell = document.getElementById('booking-calendar');
  const loading = shell?.querySelector('[data-calendar-loading]');
  let started = false;
  const showFailedState = () => {
    if (loading) loading.innerHTML = '<p>The calendar could not connect. You can still use the alternative booking link below.</p>';
    shell?.classList.add('booking-calendar--offline');
  };
  const showWidget = () => {
    if (loading) loading.hidden = true;
    shell?.classList.add('booking-calendar--ready');
  };
  const fallbackIframe = () => {
    // Still keep the calendar inside this card when widget.js is unavailable.
    frame.innerHTML = '';
    const iframe = document.createElement('iframe');
    iframe.title = 'RecruitFlow discovery call booking calendar';
    iframe.className = 'booking-fallback-iframe';
    iframe.src = brand.demoUrl;
    iframe.loading = 'lazy';
    iframe.referrerPolicy = 'strict-origin-when-cross-origin';
    iframe.addEventListener('load', showWidget, { once: true });
    frame.append(iframe);
  };
  const load = () => {
    if (started) return;
    started = true;
    const script = document.createElement('script');
    script.src = 'https://assets.calendly.com/assets/external/widget.js';
    script.async = true;
    script.onload = () => {
      try {
        if (!window.Calendly?.initInlineWidget) throw Error('Calendly widget unavailable');
        window.Calendly.initInlineWidget({ url: brand.demoUrl, parentElement: frame, resize: true });
        const observer = new MutationObserver(() => {
          if (frame.querySelector('iframe')) { showWidget(); observer.disconnect(); }
        });
        observer.observe(frame, { childList: true, subtree: true });
        if (frame.querySelector('iframe')) { showWidget(); observer.disconnect(); }
      } catch (error) {
        fallbackIframe();
      }
    };
    script.onerror = () => { showFailedState(); fallbackIframe(); };
    document.head.append(script);
  };
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      if (entries.some(entry => entry.isIntersecting)) { observer.disconnect(); load(); }
    }, { rootMargin: '1100px 0px', threshold: 0 });
    observer.observe(frame);
  } else load();
}
