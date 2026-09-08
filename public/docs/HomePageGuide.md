# Home Page Guide

The public front page of Sahaay.

## Which file do I edit?

| I want to change...                | Open this file                             |
| ---------------------------------- | ------------------------------------------ |
| Any words on the page              | `/public/data/HomePageContent.js`          |
| Section order, adding a section    | `/public/pages/HomePage.html`              |
| Colours, spacing, layout           | `/public/styles/HomePage.css`              |
| Colours used on every page         | `/public/styles/global.css`                |
| How the lists are built            | `/public/scripts/HomePage.js`              |
| Fade-in speed, scroll effects      | `/public/animations/HomePageAnimations.js` |
| The photograph in the hero         | `/public/assets/images/homepage/`          |

## Common edits

**Change the headline**
Open `/public/data/HomePageContent.js`, find `hero.title` and `hero.subtitle`, type new words, save.

**Add a service**
Same file, find `services.items`, add a new line inside the list, for example `"Welder",`.

**Add a worker journey step**
Same file, find `journey.steps`, copy one block and change the `step`, `title` and `text`.

**Turn the animations off**
Open `/public/animations/HomePageAnimations.js` and set `enabled: false`.

## Structure of the page

1. Header with the Sahaay logo and navigation
2. Hero: headline, description, two buttons, photograph
3. Promise strip: three key numbers
4. Services offered
5. The ten-step worker journey
6. The three worker categories
7. The role of unions and cooperatives
8. Design principles
9. Closing call to action
10. Footer
