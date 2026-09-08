/* ===========================================================
   FILE: /animations/LoginPageAnimations.js
   PAGE: /pages/LoginPage.html

   THIS FILE CONTROLS:
   - The soft rise of the sign-in card when the page opens

   EDIT HERE TO:
   - Change the duration, or switch the animation off
   =========================================================== */

const ANIMATION_SETTINGS = { enabled: true, riseMs: 520 };

const card = document.querySelector(".login-card");

if (card && ANIMATION_SETTINGS.enabled) {
  card.style.opacity = "0";
  card.style.transform = "translateY(14px)";
  card.style.transition = `opacity ${ANIMATION_SETTINGS.riseMs}ms ease, transform ${ANIMATION_SETTINGS.riseMs}ms ease`;
  requestAnimationFrame(() => {
    card.style.opacity = "1";
    card.style.transform = "none";
  });
}
