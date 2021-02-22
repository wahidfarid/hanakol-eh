# Hanakol eh

this is a simple project that aggregates information on deals and discounts of multiple food delivery services in Egypt and displays the information. Based on React/Next.js/Typescript. uses some serverless scripts to gather data and avoid CORS (scripts in `lambda functions` folder)

This is mainly a personal project for me to play around with some tools/technologies (Next.js in Typescript, TailwindCSS, serverless paradigms, etc...) while at the same time solving the age old question of what to buy because i'm too indecisive.

## How to use it?

### Website
1. `npm install`
2. `npm run dev`

### Scripts
1. archive the `lambda functions` folder into a zip
2. upload it to AWS Lambda
3. configure AWS api gateway to expose the scripts as a HTTP API