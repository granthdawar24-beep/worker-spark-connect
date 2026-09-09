# Jobs Page Guide

The page that shows where work is available.

## What it shows

- A summary tile for each city with how many jobs are open and in which areas
- Filters for city and type of work
- A card for every job: title, area and city, trade, required worker category,
  when it is needed and the pay
- If the worker is signed in and verified, matching jobs are marked
  "Matches your verified profile"

## Which file do I edit?

| I want to change...                    | Open this file                             |
| -------------------------------------- | ------------------------------------------ |
| The job list, cities, areas, pay, words | `/public/data/JobsPageContent.js`          |
| Page structure and sections            | `/public/pages/JobsPage.html`              |
| Colours, spacing, card layout          | `/public/styles/JobsPage.css`              |
| Filtering and matching rules           | `/public/scripts/JobsPage.js`              |
| Fade-in speed                          | `/public/animations/JobsPageAnimations.js` |

## Adding a job

Open `/public/data/JobsPageContent.js` and copy one line in the `jobs` list.
Every job needs: `title`, `trade`, `city`, `area`, `pay`, `level`, `when`.
The city and work-type dropdowns build themselves from that list.
