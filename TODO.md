TsODO
====


### Components

- [ ] Global view
  - [ ] graph for each month
  - [ ] most +/- (pie chart)
- [x] display components
  - [x] text
  - [x] price


### DB

- [x] Common
  - [x] amount
  - [ ] +/-
    - [ ] find better name than 'isPositive' && 'gain'
  - [ ] comment
  - [x] timestamp (computed)
- [ ] Recurring
  - [ ] start
  - [ ] (end)
  - [x] per day (computed)
  - [x] each (month, day, ...)
  - [ ] every: 1, 2, 3...


### Tools

- [ ] i18n
- [ ] l10n
- [ ] log
- [ ] readme
- [x] deploy
- [ ] CI
- [ ] utests
- [ ] check linter + es6 modules


### Firebase

- [x] rules
- [x] subscribe to lists (add & delete)


### Features

- [x] listen on changes in frontend
- [ ] proper historic (hide date in url)
- [x] settings
- [ ] global view (d3)
- [ ] android app
- [ ] tag
- [ ] typescript
- [ ] form (add, edit) validation

## Fix & Bugs

- [ ] rename amount (balance ?)
- [ ] deal with components/amount, components/display/amount, utils/amount
- [ ] allow custom user currency
- [x] translate
- [ ] date should it return date || timestamp ?
- [ ] recurrent amount will be removed when recurrent has a start and end date
- [ ] better (smarter) clean of entries for d3
