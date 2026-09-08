# Worker Dashboard Guide

The signed-in worker's own account page.

## What it shows

- Current verification stage and worker category
- Basic information saved by the worker
- Identity verification record (masked document number)
- Payout bank account (masked account number) and whether it is verified
- Skill verification record
- Annual membership status and expiry date
- Job opportunities, unlocked once the account is active
- A note explaining that money goes straight to the worker's bank account

## Which file do I edit?

| I want to change...             | Open this file                                  |
| ------------------------------- | ----------------------------------------------- |
| Any words, stage names, sample jobs | `/public/data/DashboardPageContent.js`      |
| Which cards appear, page structure  | `/public/pages/DashboardPage.html`          |
| Card layout, colours, spacing   | `/public/styles/DashboardPage.css`              |
| What the cards read from the record | `/public/scripts/DashboardPage.js`          |
| Fade-in speed                   | `/public/animations/DashboardPageAnimations.js` |

## Note

A visitor who is not signed in is sent to `/pages/LoginPage.html` automatically.
Job cards stay dimmed until the worker's membership is paid and their stage is
active, and only jobs matching the worker's category are shown as available.
