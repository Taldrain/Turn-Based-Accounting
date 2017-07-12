import { combineReducers } from 'redux';

const locale = require('./locale.js');
const punctual = require('./punctual.js');
const recurrent = require('./recurrent.js');
const dateType = require('./date-type.js');
const currency = require('./currency.js');

module.exports = combineReducers({
  locale,
  punctual,
  recurrent,
  dateType,
  currency,
});
