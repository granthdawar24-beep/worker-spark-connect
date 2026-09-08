/* ===========================================================
   FILE: /data/DashboardPageContent.js
   USED BY: /pages/DashboardPage.html through /scripts/DashboardPage.js

   THIS FILE CONTAINS:
   - Headings and helper text for the worker dashboard
   - The names of each verification stage
   - The wording of the sample job opportunities

   EDIT THIS FILE IF YOU ONLY WANT TO CHANGE TEXT.
   =========================================================== */

export const dashboardPageContent = {
  title: "Your worker account",
  intro: "Everything below belongs to you: your identity, your verification record and your payout account.",

  stageNames: {
    registered: "Registered",
    bank_submitted: "Bank details saved",
    identity_verified: "Identity verified",
    bank_verified: "Bank account verified",
    skill_verified: "Skills verified",
    active: "Active on the marketplace",
  },

  cardTitles: {
    profile: "Basic information",
    identity: "Identity verification",
    bank: "Payout bank account",
    skill: "Skill verification",
    membership: "Annual membership",
  },

  jobsTitle: "Job opportunities matched to you",
  jobsLockedNote:
    "Finish your verification and activate your membership to start receiving job opportunities.",
  sampleJobs: [
    { title: "Ceiling fan and wiring repair", place: "Sector 21, household", pay: "₹850", level: "Verified Professional" },
    { title: "Kitchen tap replacement", place: "Green Park, household", pay: "₹450", level: "Experienced Worker" },
    { title: "Assisted deep cleaning, supervised", place: "Community hall", pay: "₹600", level: "Apprentice" },
  ],

  paymentNote:
    "Customers pay through Sahaay. After the job is marked complete, the money is transferred directly to your verified bank account. The cooperative never holds your earnings.",

  signOutButton: "Sign out",
};
