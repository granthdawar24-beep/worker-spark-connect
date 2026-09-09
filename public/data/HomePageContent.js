/* ===========================================================
   FILE: /data/HomePageContent.js
   USED BY: /pages/HomePage.html through /scripts/HomePage.js

   THIS FILE CONTAINS:
   - The headline and paragraphs of the home page
   - Button labels
   - The list of services, the worker journey steps,
     the worker categories and the platform principles

   EDIT THIS FILE IF YOU ONLY WANT TO CHANGE TEXT.
   No styling and no page logic belongs here.
   =========================================================== */

export const homePageContent = {
  hero: {
    badge: "Government-owned services marketplace",
    title: "Sahaay",
    subtitle:
      "A cooperative gig services platform where the worker owns their account, their work and their earnings.",
    description:
      "Sahaay connects verified electricians, plumbers, carpenters, painters, cleaners, drivers, gardeners, caregivers, domestic helpers and technicians with households and institutions. Fair wages, direct payments, transparent verification.",
    primaryButton: "Register as a worker",
    secondaryButton: "I already have an account",
  },

  promises: [
    { number: "100%", label: "Earnings paid straight to the worker's own bank account" },
    { number: "₹5,000", label: "Annual membership, charged only after verification is complete" },
    { number: "12+", label: "Regional languages planned for worker onboarding" },
  ],

  services: {
    title: "Services offered on Sahaay",
    items: [
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
  },

  journey: {
    title: "The worker journey",
    intro:
      "Register independently, prove who you are, prove what you can do, get matched with work, and get paid directly.",
    steps: [
      { step: "1", title: "Register", text: "The worker creates their own account. No union or agent is required." },
      { step: "2", title: "Basic information", text: "Name, mobile, optional email, WhatsApp, address and preferred language." },
      { step: "3", title: "Bank details", text: "Account holder name, bank, branch and IFSC for direct payment." },
      { step: "4", title: "Identity check", text: "Aadhaar-based verification, or another government photo document such as Voter ID, driving licence or passport." },
      { step: "5", title: "Bank verification", text: "The payout account must belong to the same verified person." },
      { step: "6", title: "Skill verification", text: "A formal certificate, or evidence of real practical experience." },
      { step: "7", title: "Classification", text: "Verified Professional, Experienced Worker or Apprentice." },
      { step: "8", title: "Activation", text: "The ₹5,000 annual membership starts and the worker becomes eligible for jobs." },
      { step: "9", title: "Job marketplace", text: "A customer books a service and suitable jobs reach the worker." },
      { step: "10", title: "Direct payment", text: "Money is transferred straight to the worker's verified bank account." },
    ],
  },

  categories: {
    title: "Three ways to be recognised",
    intro: "No formal degree does not mean no skill. Practical experience counts here.",
    items: [
      {
        name: "Verified Professional",
        text: "Holds a recognised trade qualification, ITI certificate or government skill certificate, with relevant work behind it.",
      },
      {
        name: "Experienced Worker",
        text: "No formal qualification, but years of verified practical work. Approval is based on evidence and skill assessment.",
      },
      {
        name: "Apprentice",
        text: "Trained or training, with limited practical experience. Receives supervised entry-level work and grows into full worker status.",
      },
    ],
  },

  unionNote: {
    title: "Unions and cooperatives support. They do not own.",
    points: [
      "They may help with digital registration and explain the platform",
      "They may run training, awareness and grievance support",
      "They never hold the worker's account",
      "They never receive the worker's earnings",
      "They are never a compulsory gate for registration",
    ],
  },

  principles: {
    title: "Design principles",
    items: [
      "Worker ownership of account and earnings",
      "Direct payment to a verified bank account",
      "Low-friction registration, minimum paperwork",
      "Flexible skill verification: certificate or experience",
      "No mandatory union dependency",
      "Transparent reasons for approval or rejection",
      "Regional-language accessibility",
      "ITI training feeding directly into employment",
      "An apprenticeship pathway for new workers",
      "Auditable bookings, payments and payouts",
      "Worker welfare, insurance and benefits over time",
      "Consumer trust through verified skills and ratings",
    ],
  },

  footer: {
    line1: "Sahaay — cooperative gig services platform.",
    line2: "The worker owns their identity, account, work opportunities and earnings.",
  },
};
