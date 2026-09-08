/* ===========================================================
   FILE: /scripts/HomePage.js
   PAGE: /pages/HomePage.html

   THIS FILE CONTROLS:
   - Placing the text from /data/HomePageContent.js into the page
   - Building the service chips, journey list, category cards
     and principle boxes

   EDIT HERE TO:
   - Change how the home page builds its lists

   Text belongs in /data/HomePageContent.js
   Animations belong in /animations/HomePageAnimations.js
   =========================================================== */

import { homePageContent } from "/data/HomePageContent.js";

function slot(name) {
  return document.querySelector(`[data-content="${name}"]`);
}

function setText(name, text) {
  const element = slot(name);
  if (element) element.textContent = text;
}

/* ---------- HERO ---------- */
setText("hero-badge", homePageContent.hero.badge);
setText("hero-title", homePageContent.hero.title);
setText("hero-subtitle", homePageContent.hero.subtitle);
setText("hero-description", homePageContent.hero.description);
setText("hero-primary", homePageContent.hero.primaryButton);
setText("hero-primary-repeat", homePageContent.hero.primaryButton);
setText("hero-secondary", homePageContent.hero.secondaryButton);

/* ---------- PROMISE STRIP ---------- */
slot("promises").innerHTML = homePageContent.promises
  .map((item) => `<div class="promise-item"><strong>${item.number}</strong><span>${item.label}</span></div>`)
  .join("");

/* ---------- SERVICES ---------- */
setText("services-title", homePageContent.services.title);
slot("services").innerHTML = homePageContent.services.items
  .map((name) => `<span class="service-chip">${name}</span>`)
  .join("");

/* ---------- WORKER JOURNEY ---------- */
setText("journey-title", homePageContent.journey.title);
setText("journey-intro", homePageContent.journey.intro);
slot("journey").innerHTML = homePageContent.journey.steps
  .map(
    (item) => `
      <li class="journey-item reveal">
        <span class="journey-number">${item.step}</span>
        <div>
          <h3>${item.title}</h3>
          <p>${item.text}</p>
        </div>
      </li>`
  )
  .join("");

/* ---------- CATEGORIES ---------- */
setText("categories-title", homePageContent.categories.title);
setText("categories-intro", homePageContent.categories.intro);
slot("categories").innerHTML = homePageContent.categories.items
  .map((item) => `<article class="category-card reveal"><h3>${item.name}</h3><p>${item.text}</p></article>`)
  .join("");

/* ---------- UNIONS ---------- */
setText("union-title", homePageContent.unionNote.title);
slot("union-points").innerHTML = homePageContent.unionNote.points
  .map((point) => `<li>${point}</li>`)
  .join("");

/* ---------- PRINCIPLES ---------- */
setText("principles-title", homePageContent.principles.title);
slot("principles").innerHTML = homePageContent.principles.items
  .map((item) => `<div class="principle-item reveal">${item}</div>`)
  .join("");

/* ---------- FOOTER ---------- */
setText("footer-line1", homePageContent.footer.line1);
setText("footer-line2", homePageContent.footer.line2);

/* Tell the animation file that the page content is ready.
   The flag covers the case where the animation file loads afterwards. */
window.sahaayContentReady = true;
document.dispatchEvent(new CustomEvent("sahaay:content-ready"));
