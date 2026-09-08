/* ===========================================================
   FILE: /scripts/LoginPage.js
   PAGE: /pages/LoginPage.html

   THIS FILE CONTROLS:
   - Filling in the page text
   - What happens when the sign-in form is submitted
   - Sending a signed-in worker to their dashboard

   EDIT HERE TO:
   - Change sign-in behaviour or error messages
   =========================================================== */

import { loginPageContent } from "/data/LoginPageContent.js";
import { signInWorker, currentWorker } from "/scripts/sahaayBackend.js";

function setText(name, text) {
  const element = document.querySelector(`[data-content="${name}"]`);
  if (element) element.textContent = text;
}

setText("title", loginPageContent.title);
setText("intro", loginPageContent.intro);
setText("identifier-label", loginPageContent.identifierLabel);
setText("password-label", loginPageContent.passwordLabel);
setText("submit", loginPageContent.submitButton);
setText("register-prompt", loginPageContent.registerPrompt);
setText("register-link", loginPageContent.registerLink);

const errorBox = document.querySelector('[data-role="error"]');
const form = document.querySelector('[data-role="login-form"]');

function showError(text) {
  errorBox.textContent = text;
  errorBox.classList.remove("message-hidden");
}

/* If the worker is already signed in, go straight to the dashboard. */
currentWorker().then((worker) => {
  if (worker) window.location.href = "/pages/DashboardPage.html";
});

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  errorBox.classList.add("message-hidden");

  const button = form.querySelector("button");
  button.disabled = true;

  const identifier = form.identifier.value.trim();
  const password = form.password.value;

  try {
    await signInWorker(identifier, password);
    window.location.href = "/pages/DashboardPage.html";
  } catch (problem) {
    showError("We could not sign you in. Please check your mobile number or email and your password.");
    console.error(problem);
    button.disabled = false;
  }
});
