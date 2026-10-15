import { screening, analytics, additionalFeatures } from '../data/features.js';
import { icon } from '../components/icons.js';
import { sectionHeading, browserFrame, statChip, featureMark, demoCta } from '../components/ui.js';

function renderFeatureBlock(data, id, flipped = false) {
  const points = data.points.map(point => `<li>${icon('check-circle', '', { size: 17 })}<span>${point}</span></li>`).join('');
  const stats = data.stats.map(stat => statChip(stat)).join('');
  return `<section class="feature-detail ${flipped ? 'feature-detail--flipped' : ''} reveal" id="${id}">
    <div class="feature-detail__copy">
      <div class="feature-detail__eyebrow">${featureMark(flipped ? 'chart' : 'target', flipped ? 'violet' : 'blue')}<span class="eyebrow">${data.eyebrow}</span></div>
      <h2>${data.title}</h2>
      <p class="feature-detail__description">${data.description}</p>
      <ul class="feature-points">${points}</ul>
    </div>
    <div class="feature-detail__visual">
      <div class="feature-detail__halo" aria-hidden="true"></div>
      ${browserFrame({ url: data.url, image: data.image, alt: data.imageAlt, className: 'feature-screenshot' })}
      <div class="feature-stats">${stats}</div>
      
    </div>
  </section>`;
}

export function renderFeatures(root) {
  root.innerHTML = `
    <section class="page-hero wrap page-hero--features" id="top">
      <h1>Everything you need.<br><span class="page-hero__muted">Nothing you don’t.</span></h1>
      <p>RecruitFlow OS, a product of Refrane, combines automated candidate screening, collaborative scorecard templates, and pipeline analytics in one unified workspace.</p>
    </section>

    <nav class="feature-subnav" aria-label="Feature sections">
      <div class="wrap feature-subnav__inner">
        <a href="#feature-section-matching" class="feature-tab is-active" data-feature-tab="feature-section-matching">${icon('users', '', { size: 17 })} Candidate Screening</a>
        <a href="#feature-section-analytics" class="feature-tab" data-feature-tab="feature-section-analytics">${icon('chart', '', { size: 17 })} Talent Analytics</a>
      </div>
    </nav>

    <div class="wrap feature-details-wrap">
      ${renderFeatureBlock(screening, 'feature-section-matching', false)}
      ${renderFeatureBlock(analytics, 'feature-section-analytics', true)}
    </div>

    <section class="additional-features section-space" id="additional-features">
      <div class="wrap">
        ${sectionHeading({ eyebrow: 'Also included', title: 'The details that keep the process moving.', description: 'Candidate-facing tools, outbound communications, and job distribution — all built in from day one.', align: 'left' })}
        <div class="additional-feature-grid">${additionalFeatures.map((feature, index) => `
          <article class="additional-feature reveal" style="--reveal-delay:${index * 65}ms">
            ${featureMark(feature.icon, feature.accent)}<div><h3>${feature.title}</h3><p>${feature.description}</p></div>
          </article>`).join('')}</div>
      </div>
    </section>

    ${demoCta({ title: 'Ready to see it working on your roles?', copy: 'Book a 20-minute demo and we’ll walk you through the platform using your own job requirements.', className: 'features-closing' })}`;
}
