import { plans, annualSaving, comparisonFeatures, teamSegments, faqs } from '../data/pricing.js';
import { icon } from '../components/icons.js';
import { sectionHeading } from '../components/ui.js';

// Whole-dollar display for both billing periods. The source monthly prices remain unchanged.
const money = value => `N$${Math.round(value).toLocaleString('en-NA', { maximumFractionDigits: 0 })}`;

function renderPlan(plan) {
  const features = plan.features.map((feature, index) => `<li class="plan-feature${index === 0 && (plan.key === 'professional' || plan.key === 'enterprise') ? ' plan-feature--emphasis' : ''}">${icon('check', '', { size: 17 })}<span>${feature}</span></li>`).join('');
  return `<article class="plan-card plan-card--${plan.key}${plan.mostPopular ? ' plan-card--popular' : ''}">
    ${plan.mostPopular ? `<div class="plan-popular-label">${icon('sparkles', '', { size: 14 })} Most popular</div>` : ''}
    <div class="plan-card__intro"><span class="plan-tier">${plan.name}</span><h3>${plan.description}</h3></div>
    <div class="plan-price" data-price-for="${plan.key}">
      ${plan.monthlyPrice === null ? `<strong>Custom</strong><span>/ contact team</span>` : `<strong>${money(plan.monthlyPrice)}</strong><span>/ month</span>`}
      <small class="plan-price__annual" data-annual-price hidden></small>
    </div>
    <ul class="plan-feature-list">${features}</ul>
    <a class="button ${plan.mostPopular ? 'button--primary' : 'button--outline'} plan-card__cta" href="./index.html#book-demo">${plan.cta} ${icon('arrow-right', 'button__icon', { size: 16 })}</a>
  </article>`;
}

function renderComparisonTable() {
  return `<div class="comparison-panel" id="comparison-panel" hidden>
    <div class="comparison-table-wrap"><table class="comparison-table"><thead><tr><th scope="col">Capabilities</th><th scope="col">Starter</th><th scope="col">Professional</th><th scope="col">Enterprise</th></tr></thead><tbody>${comparisonFeatures.map(row => `<tr><th scope="row">${row.label}</th>${row.values.map(value => `<td>${value}</td>`).join('')}</tr>`).join('')}</tbody></table></div>
  </div>`;
}

function renderTeamPanel(key) {
  const segment = teamSegments[key];
  const bullets = segment.points ? `<ul class="segment-points">${segment.points.map(point => `<li>${icon(point.icon, '', { size: 16 })}<span>${point.text}</span></li>`).join('')}</ul>` : '';
  return `<div class="segment-panel" id="segment-panel" role="tabpanel" aria-live="polite">
    <div><h3>${segment.title}</h3><p>${segment.description}</p>${bullets}</div>
    
  </div>`;
}

function renderFaqs() {
  return `<div class="faq-list">${faqs.map((faq, index) => `
    <article class="faq-item">
      <h3><button class="faq-question" type="button" aria-expanded="false" aria-controls="faq-answer-${index}" id="faq-question-${index}" data-faq-trigger="${index}"><span><small>0${index + 1}</small>${faq.question}</span><span class="faq-plus">+</span></button></h3>
      <div class="faq-answer" id="faq-answer-${index}" role="region" aria-labelledby="faq-question-${index}" hidden><p>${faq.answer}</p></div>
    </article>`).join('')}</div>`;
}

export function renderPricing(root) {
  root.innerHTML = `
    <section class="page-hero wrap page-hero--pricing" id="top">
      <h1>Pricing that scales<br><span class="page-hero__muted">with your hiring.</span></h1>
      <p>No user seat licensing traps, no hidden applicant platform surcharges. Choose a plan that aligns with your active pipelines.</p>
      <div class="billing-toggle" aria-label="Billing period">
        <span class="billing-label is-selected" data-billing-label="monthly">Bill Monthly</span>
        <button class="billing-switch" type="button" data-billing-toggle aria-pressed="false" aria-label="Switch to annual billing"><span></span></button>
        <span class="billing-label" data-billing-label="annual">Bill Annually <em>Save 20%</em></span>
      </div>
    </section>

    <section class="pricing-plans wrap" aria-label="Available pricing plans">
      <div class="plan-grid">${plans.map(renderPlan).join('')}</div>
      <p class="pricing-footnote" data-billing-note hidden>Monthly equivalents are rounded to whole N$; annual totals use the full 20% discount.</p>
      <div class="comparison-trigger-wrap"><button class="comparison-trigger" type="button" data-comparison-toggle aria-expanded="false" aria-controls="comparison-panel">Compare all plan features ${icon('arrow-down', '', { size: 17 })}</button></div>
      ${renderComparisonTable()}
    </section>

    <section class="team-structure section-space">
      <div class="wrap">
        ${sectionHeading({ eyebrow: 'Designed for alignment', title: 'Built for every team structure.', description: 'Hiring styles change with scale. Select a configuration built to support your current coordination speed.', align: 'left' })}
        <div class="segment-tabs" role="tablist" aria-label="Team structure">
          <button type="button" role="tab" aria-selected="false" data-segment="startups">Startups</button>
          <button type="button" role="tab" aria-selected="true" data-segment="scaleups">Scaleups</button>
          <button type="button" role="tab" aria-selected="false" data-segment="enterprises">Enterprises</button>
        </div>
        ${renderTeamPanel('scaleups')}
      </div>
    </section>

    <section class="pricing-faq section-space">
      <div class="wrap pricing-faq__layout">
        <div class="pricing-faq__intro">${sectionHeading({ eyebrow: 'Common questions', title: 'Clarity before commitment.', description: 'Everything you need to know about setting up and operating RecruitFlow OS.', align: 'left' })}</div>
        ${renderFaqs()}
      </div>
    </section>

    <section class="pricing-final-cta wrap">
      <div><span class="eyebrow">Your next chapter</span><h2>Ready to optimize your hiring flow?</h2><p>Choose the Starter or Professional tier today to scale candidate screening, panel interviewing, and score reviews seamlessly.</p></div>
      <div class="pricing-final-cta__actions"><a href="./index.html#book-demo" class="button button--primary">Start free trial today ${icon('arrow-right', '', { size: 16 })}</a><a href="./index.html#book-demo" class="button button--outline">Connect with recruiting advisors</a></div>
    </section>`;
}

export function initPricingInteractions() {
  const billingToggle = document.querySelector('[data-billing-toggle]');
  if (billingToggle) {
    const priceEls = [...document.querySelectorAll('[data-price-for]')];
    const notes = document.querySelector('[data-billing-note]');
    const updateBilling = annual => {
      billingToggle.setAttribute('aria-pressed', String(annual));
      billingToggle.setAttribute('aria-label', annual ? 'Switch to monthly billing' : 'Switch to annual billing');
      document.querySelectorAll('[data-billing-label]').forEach(label => label.classList.toggle('is-selected', label.dataset.billingLabel === (annual ? 'annual' : 'monthly')));
      notes.hidden = !annual;
      priceEls.forEach(el => {
        const plan = plans.find(item => item.key === el.dataset.priceFor);
        const strong = el.querySelector('strong');
        const cadence = el.querySelector('span');
        const annualText = el.querySelector('[data-annual-price]');
        if (!plan || plan.monthlyPrice === null) return;
        const displayPrice = annual ? Math.round(plan.monthlyPrice * (1 - annualSaving)) : plan.monthlyPrice;
        strong.textContent = money(displayPrice);
        cadence.textContent = annual ? '/ month, billed annually*' : '/ month';
        annualText.hidden = !annual;
        annualText.textContent = annual ? `${money(plan.monthlyPrice * (1 - annualSaving) * 12)} / year` : ''; 
        el.classList.toggle('plan-price--estimated', annual);
      });
    };
    billingToggle.addEventListener('click', () => updateBilling(billingToggle.getAttribute('aria-pressed') !== 'true'));
  }

  const compareButton = document.querySelector('[data-comparison-toggle]');
  const comparePanel = document.getElementById('comparison-panel');
  if (compareButton && comparePanel) {
    compareButton.addEventListener('click', () => {
      const expanded = compareButton.getAttribute('aria-expanded') !== 'true';
      compareButton.setAttribute('aria-expanded', String(expanded));
      if (expanded) {
        comparePanel.hidden = false;
        comparePanel.classList.remove('comparison-panel--enter');
        void comparePanel.offsetWidth;
        comparePanel.classList.add('comparison-panel--enter');
      } else {
        comparePanel.hidden = true;
        comparePanel.classList.remove('comparison-panel--enter');
      }
      compareButton.innerHTML = `Compare all plan features ${icon(expanded ? 'arrow-down' : 'arrow-right', '', { size: 17 })}`;
    });
  }

  let segmentTransitionToken = 0;
  document.querySelectorAll('[data-segment]').forEach(tab => {
    tab.addEventListener('click', async () => {
      document.querySelectorAll('[data-segment]').forEach(item => {
        const selected = item === tab;
        item.setAttribute('aria-selected', String(selected));
        item.classList.toggle('is-active', selected);
      });
      // First ease the old card out, then stage in the incoming text and metrics.
      // The token ensures rapidly clicking tabs cannot show stale content.
      const token = ++segmentTransitionToken;
      const oldPanel = document.getElementById('segment-panel');
      if (!oldPanel) return;
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (!reduced && oldPanel.animate) {
        try {
          await oldPanel.animate([
            { opacity: 1, transform: 'translateY(0)' },
            { opacity: 0, transform: 'translateY(-10px)' }
          ], { duration: 180, easing: 'ease-in', fill: 'forwards' }).finished;
        } catch (_) { /* A later tab click can cancel an in-flight animation. */ }
      }
      if (token !== segmentTransitionToken) return;
      oldPanel.outerHTML = renderTeamPanel(tab.dataset.segment);
      const newPanel = document.getElementById('segment-panel');
      if (!reduced) newPanel.classList.add('segment-panel--entered');
    });
  });

  document.querySelectorAll('[data-faq-trigger]').forEach(trigger => {
    trigger.addEventListener('click', () => {
      const answer = document.getElementById(`faq-answer-${trigger.dataset.faqTrigger}`);
      const expanded = trigger.getAttribute('aria-expanded') !== 'true';
      trigger.setAttribute('aria-expanded', String(expanded));
      answer.hidden = !expanded;
      trigger.closest('.faq-item').classList.toggle('is-open', expanded);
      trigger.querySelector('.faq-plus').textContent = expanded ? '−' : '+';
    });
  });
}
