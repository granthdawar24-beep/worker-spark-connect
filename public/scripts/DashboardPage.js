/* ===========================================================
   FILE: /scripts/DashboardPage.js
   PAGE: /pages/DashboardPage.html

   THIS FILE CONTROLS:
   - Checking that the visitor is signed in
   - Reading the worker's saved records from the backend
   - Building the record cards and the job cards
   - The sign-out button

   EDIT HERE TO:
   - Change what the dashboard shows

   Text lives in /data/DashboardPageContent.js
   =========================================================== */

import { dashboardPageContent } from "/data/DashboardPageContent.js";
import { requireWorker, loadEverything, signOutWorker } from "/scripts/sahaayBackend.js";

function setText(name, text) {
  const element = document.querySelector(`[data-content="${name}"]`);
  if (element) element.textContent = text;
}

setText("title", dashboardPageContent.title);
setText("intro", dashboardPageContent.intro);
setText("jobs-title", dashboardPageContent.jobsTitle);
setText("payment-note", dashboardPageContent.paymentNote);

const signOutButton = document.querySelector('[data-role="sign-out"]');
signOutButton.textContent = dashboardPageContent.signOutButton;
signOutButton.addEventListener("click", async () => {
  await signOutWorker();
  window.location.href = "/pages/HomePage.html";
});

function mark(isDone) {
  return isDone
    ? '<strong class="tick-good">Verified</strong>'
    : '<strong class="tick-waiting">Pending</strong>';
}

function line(label, value) {
  return `<div class="record-line"><span>${label}</span><strong>${value || "—"}</strong></div>`;
}

async function build() {
  const worker = await requireWorker();
  if (!worker) return;

  const records = await loadEverything(worker.id);
  const titles = dashboardPageContent.cardTitles;

  document.querySelector('[data-role="stage"]').textContent =
    dashboardPageContent.stageNames[records.profile?.stage] || "Registration not finished";
  document.querySelector('[data-role="category"]').textContent =
    records.profile?.category || "Category not decided yet";

  const cards = [];

  cards.push(`
    <article class="record-card reveal">
      <h3>${titles.profile}</h3>
      ${records.profile
        ? line("Name", records.profile.full_name) +
          line("Mobile", records.profile.mobile) +
          line("WhatsApp", records.profile.whatsapp) +
          line("Language", records.profile.preferred_language)
        : '<p class="record-empty">Not saved yet.</p>'}
    </article>`);

  cards.push(`
    <article class="record-card reveal">
      <h3>${titles.identity}</h3>
      ${records.kyc
        ? line("Route", records.kyc.route === "aadhaar" ? "Aadhaar-based" : "Alternative document") +
          line("Document", records.kyc.document_type) +
          line("Number", `•••• ${records.kyc.document_last4}`) +
          `<div class="record-line"><span>Status</span>${mark(records.kyc.verified)}</div>`
        : '<p class="record-empty">Not verified yet.</p>'}
    </article>`);

  cards.push(`
    <article class="record-card reveal">
      <h3>${titles.bank}</h3>
      ${records.bank
        ? line("Account holder", records.bank.account_holder_name) +
          line("Bank", records.bank.bank_name) +
          line("Account", `•••• ${records.bank.account_last4}`) +
          `<div class="record-line"><span>Status</span>${mark(records.bank.verified)}</div>`
        : '<p class="record-empty">Not saved yet.</p>'}
    </article>`);

  cards.push(`
    <article class="record-card reveal">
      <h3>${titles.skill}</h3>
      ${records.skill
        ? line("Trade", records.skill.trade) +
          line("Route", records.skill.route === "qualification" ? "Certificate" : "Practical experience") +
          line("Certificate", records.skill.certificate_name) +
          line("Years of work", records.skill.years_experience)
        : '<p class="record-empty">Not submitted yet.</p>'}
    </article>`);

  cards.push(`
    <article class="record-card reveal">
      <h3>${titles.membership}</h3>
      ${records.membership
        ? line("Amount", `₹${records.membership.amount_inr}`) +
          line("Valid until", records.membership.valid_until) +
          `<div class="record-line"><span>Status</span>${mark(records.membership.status === "paid")}</div>`
        : '<p class="record-empty">Not active yet. Finish registration to activate.</p>'}
    </article>`);

  document.querySelector('[data-role="records"]').innerHTML = cards.join("");

  /* ---------- JOB OPPORTUNITIES ---------- */
  const isActive = records.membership?.status === "paid" && records.profile?.stage === "active";
  const category = records.profile?.category;

  document.querySelector('[data-role="jobs-note"]').textContent = isActive
    ? "These jobs match your verified category. Customers pay through Sahaay."
    : dashboardPageContent.jobsLockedNote;

  document.querySelector('[data-role="jobs"]').innerHTML = dashboardPageContent.sampleJobs
    .map((job) => {
      const suitable = isActive && job.level === category;
      return `
        <article class="job-card reveal ${suitable ? "" : "is-locked"}">
          <h3>${job.title}</h3>
          <p>${job.place} · for ${job.level}</p>
          <div class="job-pay">${job.pay}</div>
        </article>`;
    })
    .join("");

  window.sahaayContentReady = true;
  document.dispatchEvent(new CustomEvent("sahaay:content-ready"));
}

build();
