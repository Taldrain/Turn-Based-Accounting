# Turn-Based Accounting

> **This project is no longer maintained.** It hasn't been updated since 2024, though it was used weekly until early 2026. I've since switched to [beancount](https://github.com/beancount/beancount) for personal accounting.

Full rewrite using Remix, Prisma and Tailwind.

[tba.taldra.in](https://tba.taldra.in)


## About

Turn-Based Accounting allows you to track how much money do you earn/spend per
day, week, month or year.

From the ideas of the [Bennedetto project](https://github.com/arecker/bennedetto).


## Building


1. Install the dependencies

`npm install`


2. Build the database

`npx prisma generate`


3. Seed the database (optional)

`npx prisma db seed`
