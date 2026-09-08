# Registration Page Guide

The seven-step worker registration and verification journey.

## The steps

| Step | Name              | What happens                                                          |
| ---- | ----------------- | --------------------------------------------------------------------- |
| 1    | Account           | The worker creates their own account with mobile number and password  |
| 2    | Basic information | Name, mobile, WhatsApp, address, preferred language                   |
| 3    | Bank details      | Account holder, account number, bank, branch, IFSC                    |
| 4    | Identity          | Aadhaar route, or an alternative government document                  |
| 5    | Bank verification | The identity name and the bank account holder name must match         |
| 6    | Skills            | Route A certificate, or Route B practical experience                  |
| 7    | Activation        | ₹500 annual membership is charged, then the account becomes active    |

## Which file do I edit?

| I want to change...                     | Open this file                                 |
| --------------------------------------- | ---------------------------------------------- |
| Wording, step names, helper sentences   | `/public/data/RegisterPageContent.js`          |
| Language list, trade list, document list| `/public/data/RegisterPageContent.js`          |
| Membership price wording and benefits   | `/public/data/RegisterPageContent.js`          |
| Adding or removing a form field         | `/public/pages/RegisterPage.html`              |
| Layout, colours, spacing                | `/public/styles/RegisterPage.css`              |
| Step order, saving rules, worker category rule | `/public/scripts/RegisterPage.js`       |
| How data is stored                      | `/public/scripts/sahaayBackend.js`             |
| Step animation speed                    | `/public/animations/RegisterPageAnimations.js` |

## Important rules built into this page

- Only the **last four digits** of the bank account number and of the identity
  document number are stored. Full numbers are never kept.
- The **bank account holder name must match the identity name**, otherwise the
  payout account is refused. This protects workers from having earnings redirected.
- **No formal degree does not mean no skill.** Three or more years of verified
  practical work makes a worker an Experienced Worker, with no certificate needed.
- The **₹500 fee is charged only at step 7**, after verification is finished.
- If a worker leaves and comes back, the page resumes at their next unfinished step.

## Changing the worker category rule

Open `/public/scripts/sahaayBackend.js` and find `decideCategory`. That one small
function decides Verified Professional, Experienced Worker or Apprentice.
