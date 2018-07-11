const moment = require('moment');

function getCurrentDate() {
  return moment().format('YYYY-MM-DD');
}

function forceISOWeek(type) {
  if (type === 'week') {
    return 'isoWeek';
  }

  return type;
}

function formatType(type) {
  switch (type) {
    case 'day':
      return 'days';
    case 'week':
      return 'weeks';
    case 'month':
      return 'months';
    case 'year':
      return 'years';
    default:
      return 'days';
  }
}

// startDate is of format ISO 8601
function getStartDate(date, type) {
  return moment(date).startOf(forceISOWeek(type)).format('YYYY-MM-DD');
}

// startDate is of format ISO 8601
function getEndDate(date, type) {
  return moment(date).endOf(forceISOWeek(type)).format('YYYY-MM-DD');
}

// date is of format (yyyy-mm-dd)
function previousDate(date, type) {
  return moment(date).subtract(1, formatType(type)).format('YYYY-MM-DD');
}

// date is of format (yyyy-mm-dd)
function nextDate(date, type) {
  return moment(date).add(1, formatType(type)).format('YYYY-MM-DD');
}

function isDateAfter(startDate, date, type) {
  if (startDate === undefined) {
    return true;
  }

  return moment(startDate).isSameOrAfter(getStartDate(date, type));
}

function isDateBefore(endDate, date, type) {
  if (endDate === undefined) {
    return true;
  }

  return moment(endDate).isSameOrBefore(getEndDate(date, type));
}

function isDateBetween(startDate, endDate, date, type) {
  return isDateAfter(endDate, date, type) && isDateBefore(startDate, date, type);
}

function diffDates(startDate, endDate, type) {
  return Math.abs(moment(startDate).diff(moment(nextDate(endDate, 'day')), formatType(type), true));
}

function maxDate(date1, date2 = undefined) {
  if (date2 === undefined) {
    return date1;
  }

  return moment.max([moment(date1), moment(date2)]).format('YYYY-MM-DD');
}

function minDate(date1, date2 = undefined) {
  if (date2 === undefined) {
    return date1;
  }

  return moment.min([moment(date1), moment(date2)]).format('YYYY-MM-DD');
}

export {
  getCurrentDate,

  getStartDate,
  getEndDate,

  previousDate,
  nextDate,

  isDateBetween,

  diffDates,

  minDate,
  maxDate,
};
