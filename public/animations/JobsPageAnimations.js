/* ===========================================================
   FILE: /animations/JobsPageAnimations.js
   PAGE: /pages/JobsPage.html

   THIS FILE CONTROLS:
   - The staggered fade-in of the area tiles and job cards

   EDIT HERE TO:
   - Change the duration or the delay between cards
   =========================================================== */

const ANIMATION_SETTINGS = { enabled: true, riseMs: 460, staggerMs: 45 };

function revealCards() {
  if (!ANIMATION_SETTINGS.enabled) return;
  document.querySelectorAll(".reveal").forEach((card, index) => {
    if (card.dataset.revealed === "yes") return;
    card.dataset.revealed = "yes";
    card.style.opacity = "0";
    card.style.transform = "translateY(12px)";
    card.style.transition = `opacity ${ANIMATION_SETTINGS.riseMs}ms ease, transform ${ANIMATION_SETTINGS.riseMs}ms ease`;
    setTimeout(() => {
      card.style.opacity = "1";
      card.style.transform = "none";
    }, index * ANIMATION_SETTINGS.staggerMs);
  });
}

/* The page script fires this event each time the cards are rebuilt.
   If it already finished before this file loaded, reveal straight away. */
if (window.sahaayContentReady) revealCards();
document.addEventListener("sahaay:content-ready", revealCards);
