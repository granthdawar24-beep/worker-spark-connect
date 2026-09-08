/* ===========================================================
   FILE: /animations/RegisterPageAnimations.js
   PAGE: /pages/RegisterPage.html

   THIS FILE CONTROLS:
   - The slide-in of each registration step when it appears
   - Motion timing between steps

   EDIT HERE TO:
   - Change the duration, or switch step animation off

   The step order and the saving of data live in /scripts/RegisterPage.js
   =========================================================== */

const ANIMATION_SETTINGS = { enabled: true, slideMs: 380 };

function animateStep(stepElement) {
  if (!ANIMATION_SETTINGS.enabled || !stepElement) return;
  stepElement.style.opacity = "0";
  stepElement.style.transform = "translateX(14px)";
  stepElement.style.transition = `opacity ${ANIMATION_SETTINGS.slideMs}ms ease, transform ${ANIMATION_SETTINGS.slideMs}ms ease`;
  requestAnimationFrame(() => {
    stepElement.style.opacity = "1";
    stepElement.style.transform = "none";
  });
}

/* The page script fires this event every time a new step is shown. */
document.addEventListener("sahaay:step-shown", (event) => animateStep(event.detail.element));
