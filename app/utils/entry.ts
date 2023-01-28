import type { Recurrent } from "@prisma/client";

import { getWeeksInMonth, getDaysInMonth, getDaysInYear } from 'date-fns';

import {
  diffDate,
  endOf,
  maxDate,
  minDate,
  nextDate,
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
  if (date.toString() === 'Invalid Date' || date.getFullYear() < 1970) {
    return "Date should be a valid date (>1970)";
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


function computeNewAmount(entry: Recurrent, date: Date, type: string) {
  const startDate = maxDate(startOf(date, type), entry.startDate);
  const endDate = minDate(endOf(date, type), entry.endDate);

  let diff = diffDate(startDate, new Date(nextDate(endDate.toString(), 'day')), entry.recurrence);
  // date-fns does not support fraction result for date difference
  if (entry.recurrence === 'week' && type === 'day') {
    diff = 1 / 7;
  } else if (entry.recurrence === 'month' && type === 'day') {
    diff = 1 / getDaysInMonth(date)
  } else if (entry.recurrence === 'month' && type === 'week') {
    diff = 1 / getWeeksInMonth(date);
  } else if (entry.recurrence === 'year' && type === 'day') {
    diff = 1 / getDaysInYear(date)
  } else if (entry.recurrence === 'year' && type === 'week') {
    diff = 1 / 52.143
  } else if (entry.recurrence === 'year' && type === 'month') {
    diff = 1 / 12;
  }

  console.log('----------------');
  console.log({ startDate });
  console.log({ endDate });
  console.log({ type });
  console.log({ diff });

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
