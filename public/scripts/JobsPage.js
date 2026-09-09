/* ===========================================================
   FILE: /scripts/JobsPage.js
   PAGE: /pages/JobsPage.html

   THIS FILE CONTROLS:
   - Building the "jobs by area" summary
   - Filling the city and work-type dropdowns
   - Filtering and drawing the job listing cards
   - Highlighting jobs that match the signed-in worker

   Text and the job list live in /data/JobsPageContent.js
   =========================================================== */

import { jobsPageContent } from "/data/JobsPageContent.js";
import { currentWorker, loadEverything } from "/scripts/sahaayBackend.js";

function setText(name, text) {
  const element = document.querySelector(`[data-content="${name}"]`);
  if (element) element.textContent = text;
}

setText("title", jobsPageContent.title);
setText("intro", jobsPageContent.intro);
setText("area-summary-title", jobsPageContent.areaSummaryTitle);
setText("city-label", jobsPageContent.filterLabels.city);
setText("trade-label", jobsPageContent.filterLabels.trade);

const cityFilter = document.querySelector('[data-role="city-filter"]');
const tradeFilter = document.querySelector('[data-role="trade-filter"]');
const listings = document.querySelector('[data-role="listings"]');
const noResults = document.querySelector('[data-role="no-results"]');
noResults.textContent = jobsPageContent.noResults;

let workerCategory = null;
let workerTrade = null;

/* ---------- DROPDOWNS ---------- */
function uniqueValues(key) {
  return [...new Set(jobsPageContent.jobs.map((job) => job[key]))].sort();
}

function fillFilter(element, values) {
  const all = jobsPageContent.filterLabels.all;
  element.innerHTML = [all, ...values].map((value) => `<option value="${value}">${value}</option>`).join("");
}

fillFilter(cityFilter, uniqueValues("city"));
fillFilter(tradeFilter, uniqueValues("trade"));

/* ---------- AREA SUMMARY ---------- */
function drawAreas() {
  const byCity = {};
  jobsPageContent.jobs.forEach((job) => {
    byCity[job.city] = byCity[job.city] || [];
    byCity[job.city].push(job.area);
  });

  document.querySelector('[data-role="areas"]').innerHTML = Object.entries(byCity)
    .map(([city, areas]) => {
      const places = [...new Set(areas)].join(" · ");
      const count = areas.length;
      return `
        <article class="area-tile reveal">
          <div class="area-city">${city}</div>
          <div class="area-count">${count} job${count === 1 ? "" : "s"} open</div>
          <div class="area-list">${places}</div>
        </article>`;
    })
    .join("");
}

/* ---------- LISTINGS ---------- */
function drawListings() {
  const all = jobsPageContent.filterLabels.all;
  const city = cityFilter.value;
  const trade = tradeFilter.value;

  const shown = jobsPageContent.jobs.filter(
    (job) => (city === all || job.city === city) && (trade === all || job.trade === trade),
  );

  noResults.hidden = shown.length > 0;

  listings.innerHTML = shown
    .map((job) => {
      const matches = workerCategory === job.level && (!workerTrade || workerTrade === job.trade);
      return `
        <article class="listing-card reveal ${matches ? "is-match" : ""}">
          <h3>${job.title}</h3>
          <p class="listing-place">${job.area}, ${job.city}</p>
          <p class="listing-meta">${job.trade} · for ${job.level} · ${job.when}</p>
          <div class="listing-pay">${job.pay}</div>
          ${matches ? '<span class="match-flag">Matches your verified profile</span>' : ""}
        </article>`;
    })
    .join("");

  window.sahaayContentReady = true;
  document.dispatchEvent(new CustomEvent("sahaay:content-ready"));
}

cityFilter.addEventListener("change", drawListings);
tradeFilter.addEventListener("change", drawListings);

/* ---------- WHO IS LOOKING ---------- */
async function start() {
  drawAreas();

  const worker = await currentWorker();
  const note = document.querySelector('[data-role="worker-note"]');

  if (!worker) {
    note.textContent = jobsPageContent.signedOutNote;
  } else {
    const records = await loadEverything(worker.id);
    workerCategory = records.profile?.category || null;
    workerTrade = records.skill?.trade || null;
    note.textContent = workerCategory
      ? `Signed in as ${records.profile?.full_name || "worker"} · ${workerCategory}${workerTrade ? ` · ${workerTrade}` : ""}`
      : "Signed in. Finish your verification to see jobs matched to your category.";
  }

  drawListings();
}

start();
