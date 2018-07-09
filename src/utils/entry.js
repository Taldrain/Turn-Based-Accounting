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

function displayedRecurrentsEntries(entries, date, type) {
  return entries.filter(entry => isDateBetween(entry.startDate, entry.endDate, date, type));
}

function createEntry(entry) {
  return sanitizeEntry(Object.assign({}, entry, {
    addedAt: new Date(),
    authorId: getCurrentUser().uid,
  }));
}

function editEntry(entry) {
  return sanitizeEntry(Object.assign({}, entry, { editedAt: new Date() }));
}

function typeDisplay(type) {
  if (type === 'day') {
    return 'Day';
  } else if (type === 'week') {
    return 'Week';
  } else if (type === 'month') {
    return 'Month';
  }

  return 'Year';
}

function convertAmount(entry, date, type) {
  const startDate = maxDate(getStartDate(date, type), entry.startDate);
  const endDate = minDate(getEndDate(date, type), entry.endDate);
  const diff = diffDates(startDate, endDate, entry.type);
  // eslint-disable-next-line no-param-reassign
  entry.computedAmount = entry.amount * diff;
  return entry;
}

export {
  createEntry,
  editEntry,
  displayedRecurrentsEntries,
  typeDisplay,
  convertAmount,
};
