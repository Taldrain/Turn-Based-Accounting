import { combineReducers } from 'redux';

import locale from './locale';
import punctual from './punctual';
import recurrent from './recurrent';
import dateType from './date-type';
import currency from './currency';

export default combineReducers({
  locale,
  punctual,
  recurrent,
  dateType,
  currency,
});
