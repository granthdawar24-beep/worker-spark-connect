/* ===========================================================
   FILE: /scripts/sahaayBackend.js
   USED BY: every page script in /scripts

   THIS FILE CONTROLS:
   - The connection to the Sahaay backend (accounts + database)
   - Sign up, sign in, sign out
   - Saving and reading worker records

   EDIT HERE TO:
   - Change how data is saved or read
   - Add a new database table helper

   Do not put page layout or styling in this file.
   =========================================================== */

import { createClient } from "https://esm.sh/@supabase/supabase-js@2.58.0";

/* Public project settings. These are safe to appear in the browser. */
const BACKEND_URL = "https://pwskfwsurlqsxipbgixx.supabase.co";
const BACKEND_PUBLIC_KEY = "sb_publishable_iHVlCkRxO7ZdXpXLCEqRQA_ly4DZB4-";

export const backend = createClient(BACKEND_URL, BACKEND_PUBLIC_KEY);

/* Workers may register without an email address.
   In that case we build a stand-in login address from the mobile number,
   so that the worker can still sign in with mobile number + password. */
export function loginAddressFor(mobile, email) {
  const cleanEmail = (email || "").trim();
  if (cleanEmail) return cleanEmail;
  const digits = (mobile || "").replace(/\D/g, "");
  return `worker${digits}@mobile.sahaay.in`;
}

export function lastFourOf(value) {
  const digits = (value || "").replace(/\s/g, "");
  return digits.slice(-4);
}

/* ---------- ACCOUNT ---------- */
export async function createWorkerAccount(details) {
  const { data, error } = await backend.auth.signUp({
    email: loginAddressFor(details.mobile, details.email),
    password: details.password,
  });
  if (error) throw error;
  return data.user;
}

export async function signInWorker(mobileOrEmail, password) {
  const { data, error } = await backend.auth.signInWithPassword({
    email: loginAddressFor(mobileOrEmail, mobileOrEmail.includes("@") ? mobileOrEmail : ""),
    password,
  });
  if (error) throw error;
  return data.user;
}

export async function signOutWorker() {
  await backend.auth.signOut();
}

export async function currentWorker() {
  const { data } = await backend.auth.getUser();
  return data.user || null;
}

/* Sends the visitor to the login page if they are not signed in. */
export async function requireWorker() {
  const worker = await currentWorker();
  if (!worker) {
    window.location.href = "/pages/LoginPage.html";
    return null;
  }
  return worker;
}

/* ---------- WORKER RECORDS ---------- */
export async function saveBasicInformation(workerId, form) {
  const { error } = await backend.from("worker_profiles").upsert({
    id: workerId,
    full_name: form.fullName,
    mobile: form.mobile,
    email: form.email || null,
    whatsapp: form.whatsapp || null,
    address: form.address || null,
    preferred_language: form.language,
    stage: "registered",
    updated_at: new Date().toISOString(),
  });
  if (error) throw error;
}

export async function saveBankDetails(workerId, form) {
  await backend.from("bank_details").delete().eq("worker_id", workerId);
  const { error } = await backend.from("bank_details").insert({
    worker_id: workerId,
    account_holder_name: form.holderName,
    account_last4: lastFourOf(form.accountNumber),
    bank_name: form.bankName,
    branch: form.branch || null,
    ifsc: form.ifsc.toUpperCase(),
  });
  if (error) throw error;
  await setStage(workerId, "bank_submitted");
}

export async function saveIdentityRecord(workerId, form) {
  await backend.from("kyc_records").delete().eq("worker_id", workerId);
  const { error } = await backend.from("kyc_records").insert({
    worker_id: workerId,
    route: form.route,
    document_type: form.documentType,
    document_last4: lastFourOf(form.documentNumber),
    name_on_document: form.nameOnDocument,
    verified: true,
    verified_at: new Date().toISOString(),
  });
  if (error) throw error;
  await setStage(workerId, "identity_verified");
}

/* The identity name and the bank account holder name must belong to the
   same person before any payment can be sent to that account. */
export async function verifyBankAgainstIdentity(workerId) {
  const [{ data: bank }, { data: kyc }] = await Promise.all([
    backend.from("bank_details").select("*").eq("worker_id", workerId).maybeSingle(),
    backend.from("kyc_records").select("*").eq("worker_id", workerId).maybeSingle(),
  ]);
  if (!bank || !kyc) throw new Error("Bank details and identity details are both required.");

  const simplify = (text) => (text || "").toLowerCase().replace(/[^a-z]/g, "");
  const namesMatch = simplify(bank.account_holder_name) === simplify(kyc.name_on_document);
  if (!namesMatch) {
    throw new Error(
      "The bank account holder name does not match the name on your identity document. Payments can only be sent to an account in your own name."
    );
  }

  await backend
    .from("bank_details")
    .update({ verified: true, verified_at: new Date().toISOString() })
    .eq("worker_id", workerId);
  await setStage(workerId, "bank_verified");
  return true;
}

export async function saveSkillClaim(workerId, form) {
  await backend.from("skill_claims").delete().eq("worker_id", workerId);
  const { error } = await backend.from("skill_claims").insert({
    worker_id: workerId,
    trade: form.trade,
    route: form.route,
    certificate_name: form.certificateName || null,
    issuing_body: form.issuingBody || null,
    years_experience: form.yearsExperience ? Number(form.yearsExperience) : null,
    evidence_notes: form.evidenceNotes || null,
    status: "approved",
  });
  if (error) throw error;

  const category = decideCategory(form);
  await backend
    .from("worker_profiles")
    .update({ category, stage: "skill_verified", updated_at: new Date().toISOString() })
    .eq("id", workerId);
  return category;
}

/* Worker classification rule:
   - Formal certificate  -> Verified Professional
   - 3 or more years of practical work -> Experienced Worker
   - Anything less -> Apprentice */
export function decideCategory(form) {
  const years = Number(form.yearsExperience || 0);
  if (form.route === "qualification" && form.certificateName) {
    return years >= 1 ? "Verified Professional" : "Apprentice";
  }
  if (years >= 3) return "Experienced Worker";
  return "Apprentice";
}

export async function activateMembership(workerId) {
  await backend.from("memberships").delete().eq("worker_id", workerId);
  const nextYear = new Date();
  nextYear.setFullYear(nextYear.getFullYear() + 1);
  const { error } = await backend.from("memberships").insert({
    worker_id: workerId,
    amount_inr: 5000,
    status: "paid",
    paid_at: new Date().toISOString(),
    valid_until: nextYear.toISOString().slice(0, 10),
  });
  if (error) throw error;
  await setStage(workerId, "active");
}

export async function setStage(workerId, stage) {
  await backend
    .from("worker_profiles")
    .update({ stage, updated_at: new Date().toISOString() })
    .eq("id", workerId);
}

export async function loadEverything(workerId) {
  const [profile, bank, kyc, skill, membership] = await Promise.all([
    backend.from("worker_profiles").select("*").eq("id", workerId).maybeSingle(),
    backend.from("bank_details").select("*").eq("worker_id", workerId).maybeSingle(),
    backend.from("kyc_records").select("*").eq("worker_id", workerId).maybeSingle(),
    backend.from("skill_claims").select("*").eq("worker_id", workerId).maybeSingle(),
    backend.from("memberships").select("*").eq("worker_id", workerId).maybeSingle(),
  ]);
  return {
    profile: profile.data,
    bank: bank.data,
    kyc: kyc.data,
    skill: skill.data,
    membership: membership.data,
  };
}
