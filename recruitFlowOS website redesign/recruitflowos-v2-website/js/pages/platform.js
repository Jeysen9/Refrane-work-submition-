import { processSteps, coreFeatures, testimonials } from '../data/platform.js';
import { icon } from '../components/icons.js';
import { sectionHeading, browserFrame, featureMark } from '../components/ui.js';
import { brand } from '../data/site.js';

function heroScene() {
  return `
    <div class="hero-scene" aria-label="RecruitFlow OS recruitment workflow preview">
      <div class="hero-light" aria-hidden="true"></div>
      <div class="hero-depth-grid" aria-hidden="true"></div>
      <img class="hero-emblem-watermark" src="${brand.logo}" alt="" aria-hidden="true">
      <div class="hero-logo-depth" aria-hidden="true">${Array.from({length: 9}, (_, i) => `<img src="${brand.logo}" alt="" class="hero-logo-depth__layer" style="--layer:${i}">`).join('')}</div>
      <div class="hero-ui hero-ui--candidate" data-float-left>
        <div class="candidate-card__top"><img src="./assets/images/candidate-avatar.jpg" alt="" width="38" height="42"><div><strong>Sarah Chen</strong><small>Staff Architect</small></div><span class="match-score">98%</span></div>
        <p class="candidate-card__quote">“Perfect alignment on distributed systems. Handled 3 complex frontend migrations at her last role.”</p>
        <div class="skill-list"><span>React</span><span>System Design</span><span class="skill-list__active">GraphQL</span></div>
      </div>
      <div class="hero-ui hero-ui--shortlist" data-float-right>
        <div class="shortlist-heading"><div><strong>Shortlisted</strong></div><span class="shortlist-count">03</span></div>
        <div class="shortlist-row"><span class="candidate-initial candidate-initial--blue">JW</span><span><strong>Justin Wu</strong><small>Product engineering</small></span><b>94%</b></div>
        <div class="shortlist-row"><span class="candidate-initial candidate-initial--violet">AM</span><span><strong>Amy Miller</strong><small>Screened · passed</small></span>${icon('check-circle', 'shortlist-check', { size: 17 })}</div>
        <div class="shortlist-foot"><span class="status-dot"></span> Criteria review complete</div>
      </div>
    </div>`;
}

function renderSteps() {
  return `<div class="process-timeline reveal">${processSteps.map((step, index) => `
    <article class="process-step ${index % 2 ? 'process-step--offset' : ''}">
      <div class="process-step__marker"><span>${step.number}</span><i aria-hidden="true"></i></div>
      <div class="process-step__content"><h3>${step.title}</h3><p>${step.description}</p></div>
    </article>`).join('')}</div>`;
}

function renderCoreFeatures() {
  return `<div class="feature-grid">${coreFeatures.map((feature, index) => `
    <article class="feature-card reveal" style="--reveal-delay:${index * 65}ms">
      <div class="feature-card__top">${featureMark(feature.icon, feature.accent)}</div>
      <h3>${feature.title}</h3><p>${feature.description}</p>
      <a class="feature-card__link" href="./features.html">Explore the platform ${icon('arrow-up-right', '', { size: 15 })}</a>
    </article>`).join('')}</div>`;
}

function renderTestimonials() {
  return `<div class="testimonial-grid">${testimonials.map((person, index) => `
    <figure class="testimonial-card reveal" style="--reveal-delay:${index * 80}ms">
      <span class="testimonial-card__quote-mark" aria-hidden="true">“</span><span class="testimonial-card__stars" role="img" aria-label="Five stars">★★★★★</span>
      <blockquote>${person.quote}</blockquote>
      <figcaption class="testimonial-person">
        <img src="${person.portrait}" alt="${person.alt}" loading="lazy" width="54" height="54">
        <span class="testimonial-person__identity"><strong>${person.name}</strong><small>${person.role}</small><small>${person.company}</small></span>
        <img class="testimonial-person__company" src="${person.logo}" alt="${person.company} logo" loading="lazy">
      </figcaption>
    </figure>`).join('')}</div>`;
}

export function renderPlatform(root) {
  root.innerHTML = `
    <section class="platform-hero" id="top" data-hero-scene>
      <div class="platform-hero__grid" aria-hidden="true"></div>
      <div class="hero-pin">
        <div class="hero-stage wrap">
          <div class="hero-copy" data-hero-copy>
            <span class="hero-announcement"><span class="announcement-spark">${icon('sparkles', '', { size: 14 })}</span> Announcing RecruitFlow OS 2.0</span>
            <h1><span class="hero-title-line">Hire Faster. Screen Smarter.</span><span class="hero-title-line"><em>Never Miss</em> the Right Person.</span></h1>
            <p class="hero-description">RecruitFlow OS automates your entire screening process — <span>from application to shortlist</span> — so you can focus on <em>people, not paperwork.</em></p>
          </div>
          ${heroScene()}
          <a class="button button--primary button--hero hero-primary-cta" href="#book-demo">Get Early Access ${icon('arrow-right', 'button__icon', { size: 18 })}</a>
          <div class="hero-bottom-meta"><button class="hero-replay" type="button" data-replay-intro aria-label="Replay RecruitFlow OS Version 2.0 introduction">${icon('play', '', {size:12})} Replay the reveal</button><div class="hero-scroll-note" aria-hidden="true"><span></span> Scroll to explore</div></div>
        </div>
      </div>
    </section>


    <section class="problem-section section-space wrap">
      <div class="problem-content">
        <h2 class="display-title reveal">Your hiring process is costing you your best candidates.</h2>
        <div class="problem-copy reveal"><p>Manual screening is slow. Inconsistent. Exhausting. By the time you’ve reviewed 200 CVs, the person you needed has already accepted another offer.</p><p class="problem-punchline">There’s a better way.</p></div>
      </div>
    </section>

    <section class="demo-section section-space" id="product-demo">
      <div class="wrap">
        <div class="demo-section__intro">${sectionHeading({ eyebrow: 'See it in action', title: 'Watch RecruitFlow work.', description: 'Explore the RecruitFlow experience in a guided three-minute product walkthrough.', align: 'center' })}</div>
        <div class="demo-browser reveal">
          <div class="demo-browser__top"><span class="browser-frame__lights" aria-hidden="true"><i></i><i></i><i></i></span><span>RecruitFlow — Product Demo</span></div>
          <div class="demo-preview demo-preview--video">
            <video class="product-demo-video" controls playsinline preload="metadata" poster="./assets/images/recruitflow-video-poster.jpg" aria-label="RecruitFlow OS product demonstration, three minutes and eleven seconds">
              <source src="./assets/media/recruitflow-product-demo.mp4" type="video/mp4">
              Your browser does not support embedded video. <a href="./assets/media/recruitflow-product-demo.mp4">Open the product demo video</a>.
            </video>
          </div>
        </div>
        <div class="demo-note"><span>${icon('play', '', { size: 17 })}</span><p>3:11 product walkthrough</p><a href="./assets/media/recruitflow-product-demo.mp4" target="_blank" rel="noopener noreferrer">Open video ${icon('external', '', { size: 15 })}</a></div>
      </div>
    </section>

    <section class="process-section section-space wrap" id="how-it-works">
      ${sectionHeading({ eyebrow: 'How it works', title: 'From job post to shortlist in minutes.', description: '', align: 'left' })}
      ${renderSteps()}
    </section>

    <section class="core-feature-section section-space" id="platform-features">
      <div class="wrap">
        ${sectionHeading({ eyebrow: 'The platform', title: 'Everything your hiring process needs. Nothing it doesn’t.', description: '', align: 'left' })}
        ${renderCoreFeatures()}
        <div class="section-inline-link"><a class="text-link" href="./features.html">Explore all platform features ${icon('arrow-right', '', { size: 16 })}</a></div>
      </div>
    </section>

    <section class="testimonials-section section-space wrap" id="customer-stories">
      <div class="testimonials-intro">${sectionHeading({ eyebrow: 'What our clients say', title: 'Real organisations. Real results.', description: '', align: 'left' })}<a class="text-link" href="./case-studies.html">Read the case studies ${icon('arrow-right', '', { size: 16 })}</a></div>
      ${renderTestimonials()}
    </section>

    <section class="booking-section section-space" id="book-demo">
      <div class="wrap booking-section__head">
        <div><h2>Your next great hire is already in your pipeline.</h2><p>Pick a time below. We’ll walk you through the platform in 20 minutes and set up your first role on the call.</p></div>
        <div class="booking-section__aside"><span class="booking-check">${icon('calendar', '', { size: 21 })}</span><strong>20-minute demo</strong></div>
      </div>
      <div class="wrap booking-panel reveal">
        <div class="booking-panel__label"><span class="status-dot"></span> Choose a time that works for you</div>
        <div class="booking-calendar" id="booking-calendar">
          <div class="booking-calendar__loading" data-calendar-loading>
            <span class="booking-calendar__spinner" aria-hidden="true"></span>
            <p>Loading available appointments…</p>
          </div>
          <div id="calendly-embed" class="booking-calendly" aria-label="RecruitFlow demo appointment scheduling calendar"></div>
        </div>
        <div class="booking-fallback"><span>Calendar not showing?</span><a class="text-link" href="${brand.demoUrl}" target="_blank" rel="noopener noreferrer">Alternative booking link ${icon('external', '', { size: 15 })}</a></div>
      </div>
    </section>`;
}
