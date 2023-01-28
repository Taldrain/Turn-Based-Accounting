import {
  add,
  differenceInCalendarDays,
  differenceInCalendarMonths,
  differenceInCalendarWeeks,
  differenceInCalendarYears,
  endOfDay,
  endOfMonth,
  endOfWeek,
  endOfYear,
  format,
  startOfDay,
  startOfMonth,
  startOfWeek,
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

// transform a date type (eg: `day`) to a date-fns duration (eg: `days`)
function typeToDuration(type: string): string {
  switch (type) {
    case 'year': return 'years';
    case 'month': return 'months';
    case 'week': return 'weeks';
    default: return 'days';
  }
}

function previousDate(date: string, type: string): string {
  return formatDate(sub(new Date(date), { [typeToDuration(type)]: 1 }));
}

function nextDate(date: string, type: string): string {
  return formatDate(add(new Date(date), { [typeToDuration(type)]: 1 }));
}

function startOf(date: Date, type: string): Date {
  switch (type) {
    case 'year': return startOfYear(date);
    case 'month': return startOfMonth(date);
    case 'week': return startOfWeek(date);
    default: return startOfDay(date);
  }
}

function endOf(date: Date, type: string): Date {
  switch (type) {
    case 'year': return endOfYear(date);
    case 'month': return endOfMonth(date);
    case 'week': return endOfWeek(date);
    default: return endOfDay(date);
  }
}

function diffDate(startDate: Date, endDate: Date, type: string): number {
  switch (type) {
    case 'year': return differenceInCalendarYears(startDate, endDate);
    case 'month': return differenceInCalendarMonths(startDate, endDate);
    case 'week': return differenceInCalendarWeeks(startDate, endDate);
    default: return differenceInCalendarDays(startDate, endDate);
  }
}

function maxDate(date1: Date, date2?: Date): Date {
  if (date2 === undefined) {
    return date1;
  }

  return (date1.getTime() >= date2.getTime() ? date1 : date2);
}

function minDate(date1: Date, date2?: Date | null): Date {
  if (date2 === undefined || date2 === null) {
    return date1;
  }

  return (date1.getTime() < date2.getTime() ? date1 : date2);
}

export {
  diffDate,
  endOf,
  formatDate,
  isInvalidDateParam,
  maxDate,
  minDate,
  nextDate,
  parseDateParam,
  previousDate,
  startOf,
}
