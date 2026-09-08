# Sahaay — Cooperative Gig Services Platform

A government-owned digital marketplace for household and community services.
Workers register on their own, verify who they are and what they can do, get
matched with work, and are paid **directly into their own bank account**.

> The worker owns their identity, account, work opportunities and earnings.
> A union or cooperative may support the worker, but never owns their account or money.

---

## 1. Project structure

Everything the website shows lives inside the `public` folder, in plainly named
folders. One responsibility per folder, one file per page.

```
public/
  pages/       the HTML files — the structure of each page
  styles/      the CSS files — colours, fonts, spacing, layout
  scripts/     the JavaScript files — buttons, forms, saving data
  animations/  the animation files — fades, slides, timing
  data/        the text content of each page
  assets/
    images/    all pictures, in a folder per page
  docs/        a plain-language guide for each page
FILE_MAP.md    every page and the exact files that control it
README.md      this file
```

Nothing is hidden or mixed together. If you want to change a word, you open a
file in `data/`. If you want to change a colour, you open a file in `styles/`.

## 2. The pages

| Page          | Address                     | What it does                                   |
| ------------- | --------------------------- | ---------------------------------------------- |
| Home          | `/pages/HomePage.html`      | Explains the platform and the worker journey   |
| Registration  | `/pages/RegisterPage.html`  | The seven-step registration and verification   |
| Sign in       | `/pages/LoginPage.html`     | Returning workers sign in                      |
| Worker account| `/pages/DashboardPage.html` | Verification records, membership, matched jobs |

Opening the website address on its own takes the visitor to the home page.

## 3. Beginner guide — how to edit

**I want to change some words.**
Open the matching file in `public/data/`. For the home page that is
`HomePageContent.js`. Change the text between the quotation marks and save.

**I want to change a colour.**
Open `public/styles/global.css` and look at the block at the top marked
`COLOURS AND SIZES`. Changing `--colour-brand` changes the brand colour
everywhere on the site.

**I want to change one page only.**
Each page has its own CSS file, for example `public/styles/RegisterPage.css`.
Changes there affect only that page.

**I want to add or remove a section.**
Open the page's HTML file in `public/pages/`. Each section is marked with a
comment such as `<!-- SERVICES -->`.

**I want to change an animation.**
Open the page's file in `public/animations/`. Every file starts with an
`ANIMATION_SETTINGS` block where you can change the speed or set
`enabled: false` to switch animations off.

**I want to change a picture.**
Replace the file in `public/assets/images/homepage/`, keeping the same file name.

## 4. The worker journey

1. Worker creates their own account
2. Basic information — name, mobile, optional email, WhatsApp, address, language
3. Bank details — account holder, account number, bank, branch, IFSC
4. Identity — Aadhaar route through an authorised verification service, or an
   alternative document such as PAN, Voter ID, driving licence or passport
5. Bank verification — the payout account must belong to the same verified person
6. Skill verification — Route A a certificate or ITI qualification, Route B
   evidence of real practical experience
7. Classification — Verified Professional, Experienced Worker or Apprentice
8. Activation — the ₹500 annual membership begins, only after verification
9. Job marketplace — customers book, matching jobs reach the worker
10. Direct payment — money goes straight to the worker's verified bank account

## 5. Safety rules already built in

- Full bank account numbers and full identity document numbers are never stored,
  only the last four digits.
- A payout account is refused unless the account holder name matches the name on
  the worker's identity document.
- Each worker can only ever read and change their own records.
- Passwords are checked against known leaked-password lists.
- The ₹500 fee is charged after verification, never before, and the fair-use
  promise gives a free second year to any worker who receives fewer than four
  paid jobs in their first year.

## 6. Where the data lives

Worker accounts and records are stored in the project's built-in backend.
All saving and reading happens in one file: `public/scripts/sahaayBackend.js`.
No other file talks to the database directly.
