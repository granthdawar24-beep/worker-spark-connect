/* ===========================================================
   FILE: /animations/DashboardPageAnimations.js
   PAGE: /pages/DashboardPage.html

   THIS FILE CONTROLS:
   - The staggered fade-in of the record cards and job cards

   EDIT HERE TO:
   - Change the duration or the delay between cards
   =========================================================== */

const ANIMATION_SETTINGS = { enabled: true, riseMs: 480, staggerMs: 55 };

function revealCards() {
  const cards = document.querySelectorAll(".reveal");
  cards.forEach((card, index) => {
    if (!ANIMATION_SETTINGS.enabled) return;
    card.style.opacity = "0";
    card.style.transform = "translateY(12px)";
    card.style.transition = `opacity ${ANIMATION_SETTINGS.riseMs}ms ease, transform ${ANIMATION_SETTINGS.riseMs}ms ease`;
    setTimeout(() => {
      card.style.opacity = "1";
      card.style.transform = "none";
    }, index * ANIMATION_SETTINGS.staggerMs);
  });
}

/* The page script fires this event once the cards have been built.
   If it already finished before this file loaded, reveal straight away. */
if (window.sahaayContentReady) {
  revealCards();
} else {
  document.addEventListener("sahaay:content-ready", revealCards);
}
