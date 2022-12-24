import {
  add,
  endOfDay,
  endOfMonth,
  endOfYear,
  format,
  startOfDay,
  startOfMonth,
  startOfYear,
  sub,
} from 'date-fns';

function formatDate(date: Date): string {
  return format(date, 'yyyy-MM-dd');
}

// TODO: support date input, based on type (year, month...)
function isInvalidDateParam(input: string): boolean {
  if (input === 'today') {
    return false;
  }

  const dateRe = /^\d{4}-\d{2}-\d{2}$/;
  const found = input.match(dateRe);
  if (found === null || found.length !== 1) {
    return true;
  }

  return (new Date(input)).toString() === 'Invalid Date';
}

// TODO: we should keep the same format even for different date types.
// Otherwise since we use string type to keep the date, we might have issue
// when we convert to date
function parseDateParam(input: string): string {
  if (input === 'today') {
    return formatDate(new Date());
  }

  if (isInvalidDateParam(input)) {
    return formatDate(new Date());
  }

  return formatDate(new Date(input));
}

function previousDate(date: string): string {
  return formatDate(sub(new Date(date), { days: 1 }));
}

function nextDate(date: string): string {
  return formatDate(add(new Date(date), { days: 1 }));
}

function startOf(date: Date, type: string): Date {
  switch (type) {
    case 'year': return startOfYear(date);
    case 'month': return startOfMonth(date);
    default: return startOfDay(date);
  }
}

function endOf(date: Date, type: string): Date {
  switch (type) {
    case 'year': return endOfYear(date);
    case 'month': return endOfMonth(date);
    default: return endOfDay(date);
  }
}

export {
  endOf,
  isInvalidDateParam,
  nextDate,
  parseDateParam,
  previousDate,
  startOf,
}