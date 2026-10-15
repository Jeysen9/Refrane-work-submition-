import { icon } from './icons.js';

export function sectionHeading({ eyebrow, title, description = '', align = 'left', accent = '' }) {
  const heading = accent ? title.replace(accent, `<span class="text-accent">${accent}</span>`) : title;
  const displayLabel = eyebrow && !['See it in action', 'How it works', 'The platform', 'What our clients say', 'Also included'].includes(eyebrow);
  return `<div class="section-heading section-heading--${align} reveal">
    ${displayLabel ? `<span class="eyebrow">${eyebrow}</span>` : ''}
    <h2>${heading}</h2>
    ${description ? `<p>${description}</p>` : ''}
  </div>`;
}

export function browserFrame({ url, image, alt, className = '', label = '' }) {
  return `<div class="browser-frame ${className}">
    <div class="browser-frame__bar">
      <span class="browser-frame__lights" aria-hidden="true"><i></i><i></i><i></i></span>
      <span class="browser-frame__url">${url}</span>
      ${label ? `<span class="browser-frame__label">${label}</span>` : ''}
    </div>
    <img src="${image}" alt="${alt}" loading="lazy" decoding="async">
  </div>`;
}

export function statChip({ value, label, tone = 'blue', prefix = '' }) {
  return `<div class="stat-chip stat-chip--${tone}">${prefix ? `<span class="stat-chip__prefix">${prefix}</span>` : ''}<strong>${value}</strong><span>${label}</span></div>`;
}

export function featureMark(name, accent = 'blue') {
  return `<span class="feature-mark feature-mark--${accent}">${icon(name, '', { size: 21 })}</span>`;
}

export function demoCta({ title = 'Ready to see it working on your roles?', copy = 'Book a 20-minute demo and we’ll walk you through the platform using your own job requirements.', className = '' } = {}) {
  return `<section class="closing-cta wrap ${className}">
    <div class="closing-cta__glow" aria-hidden="true"></div>
    <div class="closing-cta__copy"><h2>${title}</h2><p>${copy}</p></div>
    <a class="button button--primary" href="./index.html#book-demo">Book a demo ${icon('arrow-right', 'button__icon', { size: 17 })}</a>
  </section>`;
}
