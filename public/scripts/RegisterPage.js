/* ===========================================================
   FILE: /scripts/RegisterPage.js
   PAGE: /pages/RegisterPage.html

   THIS FILE CONTROLS:
   - Moving the worker through the seven registration steps
   - Filling the dropdown lists (languages, documents, trades)
   - Sending each step's answers to the backend to be saved
   - Deciding which step to resume on when a worker returns

   EDIT HERE TO:
   - Change the order of steps
   - Change what happens after a step is saved

   Text and list options live in /data/RegisterPageContent.js
   Database work lives in /scripts/sahaayBackend.js
   =========================================================== */

import { registerPageContent } from "/data/RegisterPageContent.js";
import {
  createWorkerAccount,
  currentWorker,
  saveBasicInformation,
  saveBankDetails,
  saveIdentityRecord,
  verifyBankAgainstIdentity,
  saveSkillClaim,
  activateMembership,
  loadEverything,
} from "/scripts/sahaayBackend.js";

/* ---------- PAGE TEXT ---------- */
function setText(name, text) {
  const element = document.querySelector(`[data-content="${name}"]`);
  if (element) element.textContent = text;
}

setText("page-title", registerPageContent.pageTitle);
setText("page-intro", registerPageContent.pageIntro);
setText("membership-title", registerPageContent.membership.title);
setText("membership-amount", registerPageContent.membership.amount);
setText("membership-fairness", registerPageContent.membership.fairnessPromise);
setText("membership-button", registerPageContent.membership.payButton);

Object.entries(registerPageContent.stepNotes).forEach(([key, note]) => {
  const element = document.querySelector(`[data-note="${key}"]`);
  if (element) element.textContent = note;
});

document.querySelector('[data-role="membership-includes"]').innerHTML =
  registerPageContent.membership.includes.map((item) => `<li>${item}</li>`).join("");

/* ---------- DROPDOWN LISTS ---------- */
function fillSelect(element, options) {
  element.innerHTML = options.map((option) => `<option value="${option}">${option}</option>`).join("");
}

fillSelect(document.querySelector('[data-role="language-list"]'), registerPageContent.languages);
fillSelect(document.querySelector('[data-role="trade-list"]'), registerPageContent.trades);

const identityRouteSelect = document.getElementById("identity-route");
const documentSelect = document.querySelector('[data-role="document-list"]');

function refreshDocumentList() {
  const route = identityRouteSelect.value;
  fillSelect(documentSelect, registerPageContent.identityDocuments[route]);
}
identityRouteSelect.addEventListener("change", refreshDocumentList);
refreshDocumentList();

/* Route A shows the certificate boxes, Route B hides them. */
const skillRouteSelect = document.getElementById("skill-route");
const qualificationFields = document.querySelector('[data-role="qualification-fields"]');

function refreshSkillFields() {
  qualificationFields.hidden = skillRouteSelect.value !== "qualification";
}
skillRouteSelect.addEventListener("change", refreshSkillFields);
refreshSkillFields();

/* WhatsApp same-as-mobile checkbox. */
const sameWhatsapp = document.getElementById("basic-same-whatsapp");
const basicMobile = document.getElementById("basic-mobile");
const basicWhatsapp = document.getElementById("basic-whatsapp");

function copyMobileToWhatsapp() {
  if (sameWhatsapp.checked) {
    basicWhatsapp.value = basicMobile.value;
    basicWhatsapp.readOnly = true;
  } else {
    basicWhatsapp.readOnly = false;
  }
}
sameWhatsapp.addEventListener("change", copyMobileToWhatsapp);
basicMobile.addEventListener("input", copyMobileToWhatsapp);

/* ---------- STEP HANDLING ---------- */
const steps = [...document.querySelectorAll(".step")];
const progressList = document.querySelector('[data-role="progress-list"]');
const errorBox = document.querySelector('[data-role="error"]');
const noticeBox = document.querySelector('[data-role="notice"]');
let currentStep = 0;

function drawProgress() {
  progressList.innerHTML = registerPageContent.stepNames
    .map((name, index) => {
      const state = index < currentStep ? "is-done" : index === currentStep ? "is-current" : "";
      const badge = index < currentStep ? "✓" : index + 1;
      return `<li class="progress-step ${state}"><span class="progress-badge">${badge}</span>${name}</li>`;
    })
    .join("");
}

function showStep(index) {
  currentStep = index;
  steps.forEach((step, stepIndex) => {
    step.hidden = stepIndex !== index;
  });
  drawProgress();
  errorBox.classList.add("message-hidden");
  document.dispatchEvent(new CustomEvent("sahaay:step-shown", { detail: { element: steps[index] } }));
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function showError(text) {
  errorBox.textContent = text;
  errorBox.classList.remove("message-hidden");
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function showNotice(text) {
  noticeBox.textContent = text;
  noticeBox.classList.remove("message-hidden");
}

function readForm(form) {
  return Object.fromEntries(new FormData(form).entries());
}

async function handleStep(form, action) {
  const button = form.querySelector("button[type='submit']");
  button.disabled = true;
  errorBox.classList.add("message-hidden");
  try {
    await action();
  } catch (problem) {
    showError(problem.message || "Something went wrong. Please try again.");
    console.error(problem);
  } finally {
    button.disabled = false;
  }
}

/* ---------- STEP 1: ACCOUNT ---------- */
steps[0].addEventListener("submit", (event) => {
  event.preventDefault();
  const values = readForm(steps[0]);
  handleStep(steps[0], async () => {
    await createWorkerAccount(values);
    document.getElementById("basic-mobile").value = values.mobile;
    showStep(1);
  });
});

/* ---------- STEP 2: BASIC INFORMATION ---------- */
steps[1].addEventListener("submit", (event) => {
  event.preventDefault();
  const values = readForm(steps[1]);
  handleStep(steps[1], async () => {
    const worker = await currentWorker();
    await saveBasicInformation(worker.id, {
      fullName: values.fullName,
      mobile: values.mobile,
      email: worker.email && !worker.email.endsWith("@mobile.sahaay.in") ? worker.email : "",
      whatsapp: values.sameWhatsapp ? values.mobile : values.whatsapp,
      address: values.address,
      language: values.language,
    });
    document.getElementById("bank-holder").value = values.fullName;
    document.getElementById("identity-name").value = values.fullName;
    showStep(2);
  });
});

/* ---------- STEP 3: BANK DETAILS ---------- */
steps[2].addEventListener("submit", (event) => {
  event.preventDefault();
  const values = readForm(steps[2]);
  handleStep(steps[2], async () => {
    const worker = await currentWorker();
    await saveBankDetails(worker.id, values);
    showStep(3);
  });
});

/* ---------- STEP 4: IDENTITY ---------- */
steps[3].addEventListener("submit", (event) => {
  event.preventDefault();
  const values = readForm(steps[3]);
  handleStep(steps[3], async () => {
    const worker = await currentWorker();
    await saveIdentityRecord(worker.id, values);
    await fillMatchBox(worker.id);
    showStep(4);
  });
});

async function fillMatchBox(workerId) {
  const records = await loadEverything(workerId);
  document.querySelector('[data-role="match-identity"]').textContent = records.kyc?.name_on_document || "—";
  document.querySelector('[data-role="match-bank"]').textContent = records.bank?.account_holder_name || "—";
}

/* ---------- STEP 5: BANK VERIFICATION ---------- */
steps[4].addEventListener("submit", (event) => {
  event.preventDefault();
  handleStep(steps[4], async () => {
    const worker = await currentWorker();
    await verifyBankAgainstIdentity(worker.id);
    showStep(5);
  });
});

/* ---------- STEP 6: SKILLS ---------- */
steps[5].addEventListener("submit", (event) => {
  event.preventDefault();
  const values = readForm(steps[5]);
  handleStep(steps[5], async () => {
    const worker = await currentWorker();
    const category = await saveSkillClaim(worker.id, values);
    showClassification(category);
    showStep(6);
  });
});

function showClassification(category) {
  const explanations = {
    "Verified Professional": "Your certificate and work record place you in the professional category.",
    "Experienced Worker": "You have no formal certificate, but your years of practical work are recognised here.",
    Apprentice: "You start as an apprentice and receive supervised entry-level work while you build experience.",
  };
  document.querySelector('[data-role="classification"]').innerHTML = `
    <h4>Your category: ${category}</h4>
    <p>${explanations[category]}</p>`;
}

/* ---------- STEP 7: ACTIVATION ---------- */
steps[6].addEventListener("submit", (event) => {
  event.preventDefault();
  handleStep(steps[6], async () => {
    const worker = await currentWorker();
    await activateMembership(worker.id);
    showStep(7);
  });
});

/* ---------- RESUME WHERE THE WORKER LEFT OFF ---------- */
async function resume() {
  const worker = await currentWorker();
  if (!worker) {
    showStep(0);
    return;
  }
  const records = await loadEverything(worker.id);
  if (records.membership?.status === "paid") {
    window.location.href = "/pages/DashboardPage.html";
    return;
  }
  showNotice("Welcome back. We have taken you to the next unfinished step.");
  if (records.skill) {
    showClassification(records.profile?.category || "Apprentice");
    showStep(6);
  } else if (records.bank?.verified) {
    showStep(5);
  } else if (records.kyc) {
    await fillMatchBox(worker.id);
    showStep(4);
  } else if (records.bank) {
    showStep(3);
  } else if (records.profile) {
    document.getElementById("bank-holder").value = records.profile.full_name;
    document.getElementById("identity-name").value = records.profile.full_name;
    showStep(2);
  } else {
    document.getElementById("basic-mobile").value = records.profile?.mobile || "";
    showStep(1);
  }
}

resume();
