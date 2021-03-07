# Hanakol eh

[Demo at https://hanakol-eh.vercel.app/](https://hanakol-eh.vercel.app/)

this is a simple project that aggregates information on deals and discounts of multiple food delivery services in Egypt and displays the information. Based on React/Next.js/Typescript. uses some serverless scripts to gather data and avoid CORS (scripts in `lambda functions` folder)

This is mainly a personal project for me to play around with some tools/technologies (Next.js in Typescript, TailwindCSS, serverless paradigms, etc...) while at the same time solving the age old question of what to eat because i'm too indecisive.

## Roadmap
- [ ] Design Refresh / Add animations
- [ ] Include data from [El Menus](https://www.elmenus.com/), [Akelni](https://www.akelni.com/en) and [MRSOOL](https://mrsool.co/contact) 
- [ ] Move from a CSS-based masonry to a JS-based one to handle dynamic card heights
- [ ] Handle restauraunts being closed or busy
- [x] Add controls to map component (Zoom, get current location)
- [x] Basic UI
- [x] Integration with serverless functions
- [x] Serverless functions to scrape data of [Talabat](https://www.talabat.com/egypt)
- [x] Initial App

## How to run it?

### Website
1. `npm install`
2. `npm run dev`

### Scripts
1. archive the `lambda functions` folder into a zip
2. upload it to AWS Lambda
3. configure AWS api gateway to expose the scripts as a HTTP API