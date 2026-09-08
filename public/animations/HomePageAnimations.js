/* ===========================================================
   FILE: /animations/HomePageAnimations.js
   PAGE: /pages/HomePage.html

   THIS FILE CONTROLS:
   - The gentle fade-and-rise entrance of the hero
   - The reveal of cards as the visitor scrolls down
   - Motion timing

   EDIT HERE TO:
   - Change durations and delays
   - Turn animations off (see ANIMATION_SETTINGS below)

   No layout, colours or page logic belong in this file.
   =========================================================== */

const ANIMATION_SETTINGS = {
  enabled: true,
  heroRiseMs: 700,
  cardRiseMs: 550,
  staggerMs: 60,
};

const styleSheet = document.createElement("style");
styleSheet.textContent = `
  .reveal, .hero-text > *, .hero-picture {
    opacity: 0;
    transform: translateY(16px);
    transition: opacity var(--rise-time, 600ms) ease, transform var(--rise-time, 600ms) ease;
  }
  .is-visible { opacity: 1 !important; transform: none !important; }
  @media (prefers-reduced-motion: reduce) {
    .reveal, .hero-text > *, .hero-picture { opacity: 1; transform: none; transition: none; }
  }
`;
document.head.appendChild(styleSheet);

function animateHero() {
  const heroPieces = [...document.querySelectorAll(".hero-text > *"), document.querySelector(".hero-picture")];
  heroPieces.filter(Boolean).forEach((piece, index) => {
    piece.style.setProperty("--rise-time", `${ANIMATION_SETTINGS.heroRiseMs}ms`);
    setTimeout(() => piece.classList.add("is-visible"), index * ANIMATION_SETTINGS.staggerMs);
  });
}

function animateOnScroll() {
  const watcher = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, index) => {
        if (!entry.isIntersecting) return;
        entry.target.style.setProperty("--rise-time", `${ANIMATION_SETTINGS.cardRiseMs}ms`);
        setTimeout(() => entry.target.classList.add("is-visible"), index * ANIMATION_SETTINGS.staggerMs);
        watcher.unobserve(entry.target);
      });
    },
    { threshold: 0.15 }
  );
  document.querySelectorAll(".reveal").forEach((element) => watcher.observe(element));
}

function startAnimations() {
  if (!ANIMATION_SETTINGS.enabled) {
    document.querySelectorAll(".reveal, .hero-text > *, .hero-picture").forEach((el) => el.classList.add("is-visible"));
    return;
  }
  animateHero();
  animateOnScroll();
}

/* The page script builds the lists first, then fires this event. */
document.addEventListener("sahaay:content-ready", startAnimations);
