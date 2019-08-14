import { getCurrentUser } from '../firebase/auth';
import {
  getStartDate,
  getEndDate,
  isDateBetween,
  diffDates,
  minDate,
  maxDate,
} from './date';

// remove undefined values from object
function sanitizeEntry(entry) {
  // eslint-disable-next-line no-param-reassign
  Object.keys(entry).forEach(key => entry[key] === undefined && delete entry[key]);
  return entry;
}

function getDisplayedRecurrentsEntries(entries, date, type) {
  return entries.filter(entry => isDateBetween(entry.startDate, entry.endDate, date, type));
}

function createEntry(entry) {
  return sanitizeEntry({ ...entry, addedAt: new Date(), authorId: getCurrentUser().uid });
}

function editEntry(entry) {
  return sanitizeEntry({ ...entry, editedAt: new Date() });
}

function convertAmount(entry, date, type) {
  const startDate = maxDate(getStartDate(date, type), entry.startDate);
  const endDate = minDate(getEndDate(date, type), entry.endDate);
  const diff = diffDates(startDate, endDate, entry.type);

  return ({ ...entry, computedAmount: entry.amount * diff });
}

function getAmount(entry, key = 'amount') {
  return (entry.isPositive ? entry[key] : -(entry[key]));
}

export {
  createEntry,
  editEntry,
  getDisplayedRecurrentsEntries,
  convertAmount,
  getAmount,
};
