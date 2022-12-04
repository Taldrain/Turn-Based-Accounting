Turn-Based Accounting
=====================

Full rewrite using Remix, Tailwind, SQlite and more.


From the ideas of the [Bennedetto project](https://github.com/arecker/bennedetto)

### About

Turn-Based Accounting allows you to track how much money do you earn/spend per day/week...

You can check the product [here](https://turn-based-accounting.firebaseapp.com/).

# Requirements

The project uses firebase (for now) for database, hosting, authentication...

You'll need a [Firebase project](https://console.firebase.google.com/) to use it


### Building


1. Install the dependencies

`npm install`


2. Login with firebase

`./node_modules/.bin/firebase login`


3. Deploy

`npm run deploy`


### Local development

`npm run devraw` or `npm run dev` to use the dashboard

It's recommended to update the file `config/config.json` with your own firebase configuration to be able to check to data server-side.
