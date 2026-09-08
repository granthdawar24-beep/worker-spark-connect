/* ===========================================================
   FILE: /data/RegisterPageContent.js
   USED BY: /pages/RegisterPage.html through /scripts/RegisterPage.js

   THIS FILE CONTAINS:
   - Step names shown in the registration progress bar
   - Helper sentences shown on each registration step
   - Language list, trade list and document list

   EDIT THIS FILE IF YOU ONLY WANT TO CHANGE TEXT OR LIST OPTIONS.
   =========================================================== */

export const registerPageContent = {
  pageTitle: "Worker registration",
  pageIntro:
    "You are creating your own account. No union, cooperative or agent is needed, and nobody else can hold your earnings.",

  stepNames: [
    "Account",
    "Basic information",
    "Bank details",
    "Identity",
    "Bank verification",
    "Skills",
    "Activation",
  ],

  stepNotes: {
    account: "Your mobile number is your login. An email address is optional.",
    basic: "Tell us how to reach you and which language you prefer.",
    bank: "Payments for completed jobs go straight into this account. Nobody else receives your money.",
    identity:
      "Aadhaar-based verification is the preferred route, done through an authorised verification service. If you do not use Aadhaar, choose another accepted government document.",
    bankCheck:
      "We check that the bank account holder name matches the name on your identity document, so that your earnings cannot be redirected to someone else.",
    skills:
      "Choose the route that fits you. A certificate is one way to prove skill. Years of real work are another.",
    activation:
      "The ₹5,000 annual membership is charged now, after your verification is complete, and never before.",
  },

  languages: [
    "English",
    "हिन्दी (Hindi)",
    "বাংলা (Bengali)",
    "मराठी (Marathi)",
    "తెలుగు (Telugu)",
    "தமிழ் (Tamil)",
    "ગુજરાતી (Gujarati)",
    "ಕನ್ನಡ (Kannada)",
    "മലയാളം (Malayalam)",
    "ਪੰਜਾਬੀ (Punjabi)",
    "ଓଡ଼ିଆ (Odia)",
    "اردو (Urdu)",
  ],

  trades: [
    "Electrician",
    "Plumber",
    "Carpenter",
    "Painter",
    "Cleaner",
    "Driver",
    "Gardener",
    "Caregiver",
    "Domestic helper",
    "Appliance technician",
  ],

  identityDocuments: {
    aadhaar: ["Aadhaar (through authorised verification service)"],
    alternative: ["PAN card", "Voter ID", "Driving licence", "Passport", "MGNREGA job card"],
  },

  membership: {
    title: "Annual platform membership",
    amount: "₹5,000 per year",
    includes: [
      "Access to the job marketplace and direct bookings",
      "Verified worker badge shown to customers",
      "Direct payment to your own bank account after every job",
      "Grievance support and worker welfare programmes",
    ],
    fairnessPromise:
      "Fair-use promise: if you receive fewer than four paid jobs in your first membership year, your next year is free. You should never pay only for access.",
    payButton: "Pay ₹5,000 and activate my account",
  },
};
