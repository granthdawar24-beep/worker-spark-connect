# Login Page Guide

Where a registered worker signs back in.

## Which file do I edit?

| I want to change...           | Open this file                              |
| ----------------------------- | ------------------------------------------- |
| Any words on the page         | `/public/data/LoginPageContent.js`          |
| Form fields                   | `/public/pages/LoginPage.html`              |
| Card width, spacing, colours  | `/public/styles/LoginPage.css`              |
| Sign-in behaviour and errors  | `/public/scripts/LoginPage.js`              |
| Entrance animation speed      | `/public/animations/LoginPageAnimations.js` |

## How signing in works

A worker may register without an email address. In that case Sahaay creates a
stand-in login address from the mobile number, so the worker can simply type
their mobile number and password. The rule lives in `loginAddressFor` inside
`/public/scripts/sahaayBackend.js`.

Once signed in, the worker is sent to `/pages/DashboardPage.html`.
