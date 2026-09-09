/* ===========================================================
   FILE: /data/JobsPageContent.js
   USED BY: /pages/JobsPage.html through /scripts/JobsPage.js

   THIS FILE CONTAINS:
   - The heading and helper text of the jobs page
   - The list of areas (localities) and the jobs available in each

   EDIT THIS FILE IF YOU ONLY WANT TO CHANGE TEXT OR THE JOB LIST.
   Every job needs: title, trade, city, area, pay, level, when.
   =========================================================== */

export const jobsPageContent = {
  title: "Where work is available",
  intro:
    "Live job openings across areas. Jobs matching your verified trade and category are highlighted for you.",

  filterLabels: {
    city: "City",
    trade: "Type of work",
    all: "All",
  },

  signedOutNote:
    "You are browsing as a visitor. Sign in to see which of these jobs match your verified category.",
  noResults: "No jobs in this area right now. Try another city or another type of work.",

  areaSummaryTitle: "Jobs by area",

  jobs: [
    { title: "Ceiling fan and wiring repair", trade: "Electrician", city: "Delhi", area: "Sector 21, Rohini", pay: "₹850", level: "Verified Professional", when: "Today" },
    { title: "House meter board check", trade: "Electrician", city: "Delhi", area: "Green Park", pay: "₹700", level: "Experienced Worker", when: "Tomorrow" },
    { title: "Kitchen tap replacement", trade: "Plumber", city: "Delhi", area: "Green Park", pay: "₹450", level: "Experienced Worker", when: "Today" },
    { title: "Bathroom leak repair", trade: "Plumber", city: "Mumbai", area: "Andheri East", pay: "₹900", level: "Verified Professional", when: "This week" },
    { title: "Wardrobe door fitting", trade: "Carpenter", city: "Mumbai", area: "Dadar West", pay: "₹1,200", level: "Verified Professional", when: "This week" },
    { title: "Two-room wall painting", trade: "Painter", city: "Pune", area: "Kothrud", pay: "₹2,400", level: "Experienced Worker", when: "This week" },
    { title: "Assisted deep cleaning, supervised", trade: "Cleaner", city: "Pune", area: "Community hall, Baner", pay: "₹600", level: "Apprentice", when: "Today" },
    { title: "Weekly home cleaning", trade: "Cleaner", city: "Bengaluru", area: "Indiranagar", pay: "₹500", level: "Apprentice", when: "Every Saturday" },
    { title: "School run driver", trade: "Driver", city: "Bengaluru", area: "Jayanagar", pay: "₹9,000 monthly", level: "Experienced Worker", when: "From next month" },
    { title: "Garden upkeep, twice a month", trade: "Gardener", city: "Bengaluru", area: "Whitefield", pay: "₹1,500", level: "Experienced Worker", when: "This week" },
    { title: "Elder day care support", trade: "Caregiver", city: "Kolkata", area: "Salt Lake, Sector 2", pay: "₹1,100", level: "Verified Professional", when: "Today" },
    { title: "Washing machine not draining", trade: "Appliance technician", city: "Kolkata", area: "Behala", pay: "₹750", level: "Experienced Worker", when: "Tomorrow" },
  ],
};
