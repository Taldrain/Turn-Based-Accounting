import type { Recurrent } from "@prisma/client";

import {
  getDaysInMonth,
  getDaysInYear,
  differenceInCalendarDays,
} from 'date-fns';

import {
  endOf,
  maxDate,
  minDate,
  startOf,
} from '~/utils/date';

function validateEntryName(name: unknown) {
  if (typeof name !== 'string' || name.length === 0) {
    return "Name should be filled";
  }
}

function validateEntryAmount(amount: unknown) {
  if (typeof amount !== 'number' || isNaN(amount) || amount <= 0) {
    return "Amount should be greater than 0";
  }
}

function validateEntryDate(date: Date) {
  if (date.toString() === 'Invalid Date') {
    return "Date should be a valid date";
  }
}

function validateEntryEndDate(startDate: Date, endDate: Date | null) {
  if (endDate !== null
    && (endDate.toString() === 'Invalid Date' || startDate.getTime() > endDate.getTime())) {
    return "End date should be a valide date and greater than start date";
  }
}

function validateEntryRecurrence(recurrence: unknown) {
  if (recurrence !== 'year'
    && recurrence !== 'month'
    && recurrence !== 'week'
    && recurrence !== 'day') {
    return 'Recurrence should be valid'
  }
}

// we assume the date is in the entry interval
function computeNewAmount(entry: Recurrent, date: Date, type: string) {
  // number of days part of the entry, with intersection of the view interval
  const startEntryDate = maxDate(startOf(date, type), entry.startDate);
  const endEntryDate = minDate(endOf(date, type), entry.endDate);
  const entryDays = Math.abs(differenceInCalendarDays(startEntryDate, endEntryDate)) + 1;

  let entryDaysRecurrency = 1;
  if (entry.recurrence === 'year') {
    // TODO: here we should also remove the days already passed if the start
    // date of the entry is the same year but does not start of the year
    entryDaysRecurrency = getDaysInYear(date);
  } else if (entry.recurrence === 'month') {
    // TODO: here we should also remove the days already passed if the start
    // date of the entry is the same month but does not start of the month
    // TODO: it is also not perfect when the `type` is `year`, we will use the
    // same number of month for each month
    entryDaysRecurrency = getDaysInMonth(date);
  } else if (entry.recurrence === 'week') {
    entryDaysRecurrency = 7;
  }

  const diff = entryDays / entryDaysRecurrency;

  return ({ ...entry, computedAmount: Math.abs(entry.amount * diff) });
}

export {
  validateEntryName,
  validateEntryAmount,
  validateEntryDate,
  validateEntryEndDate,
  validateEntryRecurrence,
  computeNewAmount,
};
