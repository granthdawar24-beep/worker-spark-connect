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
      "Aadhaar-based verification is the preferred route, done through an authorised verification service. If you do not use Aadhaar, choose another government document that carries your photograph. Documents without a photo are not accepted.",
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

  /* Only government documents that carry the holder's photograph are accepted,
     so that the face on the document can be matched to the worker. */
  identityDocuments: {
    aadhaar: ["Aadhaar (through authorised verification service)"],
    alternative: [
      "Voter ID (with photo)",
      "Driving licence (with photo)",
      "Passport (with photo)",
      "PAN card (with photo)",
    ],
  },

  /* WORK PREFERENCES
     These decide which jobs the worker is shown later on the jobs page.
     "interestTrades" uses the same list as "trades" above.
     Add or remove cities here if you open new places for work. */
  workPreferences: {
    interestsLabel: "Which jobs are you interested in?",
    interestsHint: "Tick every type of work you want. We will only recommend these jobs to you.",
    citiesLabel: "Where do you want to work?",
    citiesHint: "Tick every city you can travel to. You will only be shown jobs in these cities.",
    areasLabel: "Preferred areas or localities (optional)",
    areasHint: "For example: Kothrud, Baner. Leave empty if any area in your city is fine.",
    interestsRequired: "Please tick at least one type of work you are interested in.",
    citiesRequired: "Please tick at least one city where you want to work.",
    cities: ["Delhi", "Mumbai", "Pune", "Bengaluru", "Kolkata"],
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
