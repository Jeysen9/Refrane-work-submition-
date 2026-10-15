import { caseStudies, whyTeamsChoose } from '../data/case-studies.js';
import { icon } from '../components/icons.js';
import { sectionHeading } from '../components/ui.js';
import { brand } from '../data/site.js';

function story(story, index) {
  const metrics = story.metrics.map((metric, metricIndex) => `<div class="story-metric"><strong>${metric.value}</strong><span>${metric.label}</span></div>`).join('');
  return `<article class="case-story reveal ${index % 2 ? 'case-story--reverse' : ''}">
    <div class="case-story__rail"><span>${story.number}</span><i aria-hidden="true"></i><span class="case-story__rail-sector">${story.sector}</span></div>
    <div class="case-story__body">
      <header class="case-story__header">
        <div class="case-story__company"><span class="eyebrow">${story.sector}</span><div class="case-story__company-lockup"><div class="case-story__identity-images"><img class="case-story__logo" src="${story.logo}" alt="${story.company} logo" loading="lazy"><img class="case-story__header-portrait" src="${story.portrait}" alt="${story.alt}" loading="lazy"></div><h2>${story.company}</h2></div></div>
        <div class="case-story__visual"><span class="case-story__stars" role="img" aria-label="Five stars">★★★★★</span></div>
      </header>
      <div class="case-story__narrative">
        <div><span class="story-label">The challenge</span><p>${story.challenge}</p></div>
        <div><span class="story-label">The outcome</span><p>${story.outcome}</p></div>
      </div>
      <div class="case-story__metrics">${metrics}</div>
      <figure class="case-story__quote">
        <blockquote>“${story.quote.replace(/^“|”$/g, '')}”</blockquote>
        <figcaption><img src="${story.portrait}" alt="${story.alt}" loading="lazy"><span><strong>${story.person}</strong><small>${story.role} · ${story.company}</small></span></figcaption>
      </figure>
    </div>
  </article>`;
}

export function renderCaseStudies(root) {
  root.innerHTML = `
    <section class="page-hero wrap page-hero--stories" id="top">
      <span class="hero-announcement"><span class="announcement-spark">${icon('sparkles', '', { size: 14 })}</span> Customer stories</span>
      <h1>Real teams.<br><span class="page-hero__muted">Real results.</span></h1>
      <p>See how organisations across accounting, transport, and logistics transformed their hiring with RecruitFlow.</p>
      
    </section>

    <section class="story-summary wrap reveal" aria-label="Summary outcomes">
      <div class="story-summary__label"><span class="eyebrow">At a glance</span></div>
      <div class="story-summary__metrics"><div><strong>Days <span>→</span> Hours</strong><span>Screening timeline</span></div><div><strong>100%</strong><span>Candidate response rate</span></div><div><strong>2 Lists</strong><span>Per role — AI + requirements</span></div></div>
    </section>

    <section class="case-stories wrap section-space" aria-label="RecruitFlow OS customer case studies">
      ${caseStudies.map(story).join('')}
      
    </section>

    <section class="why-teams section-space">
      <div class="wrap">
        ${sectionHeading({ eyebrow: 'Why teams choose RecruitFlow', title: 'Built for the way real hiring works.', description: 'Purpose-built for organisations with real volume — not just enterprise.', align: 'left' })}
        <div class="why-teams__list">${whyTeamsChoose.map((reason, index) => `<div class="why-teams__item reveal" style="--reveal-delay:${index * 95}ms"><span class="why-teams__check">${icon('check', '', { size: 21 })}</span><p>${reason}</p></div>`).join('')}</div>
      </div>
    </section>

    <section class="stories-demo section-space wrap" id="book-demo">
      <div class="stories-demo__copy"><span class="eyebrow">A closer look</span><h2>See RecruitFlow working on your roles.</h2><p>Pick a time below. We’ll walk you through the platform in 20 minutes and set up your first role on the call.</p><a class="button button--primary" href="./index.html#book-demo">Book a demo ${icon('arrow-right', '', { size: 17 })}</a></div>
      <div class="stories-demo__side"><span class="stories-demo__number">20<span>min</span></span><p>A focused walkthrough with room for your team’s questions.</p><a href="${brand.demoUrl}" target="_blank" rel="noopener noreferrer" class="text-link">Open booking page ${icon('external', '', { size: 15 })}</a></div>
    </section>`;
}
