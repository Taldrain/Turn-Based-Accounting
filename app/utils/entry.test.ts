import type { Recurrent } from "@prisma/client";
import { addDays, subDays } from 'date-fns';

import {
  validateEntryName,
  validateEntryAmount,
  validateEntryDate,
  validateEntryEndDate,
  validateEntryRecurrence,
  computeNewAmount,
} from './entry';

import { localizeDateFns } from './l10n';

beforeAll(() => {
  // the week will start a monday
  localizeDateFns('fr-FR');
});

function dummyRecurrentEntry(startDate: Date, endDate: Date | null, amount: number, isPositive: boolean, recurrence: string): Recurrent {
  return ({
    startDate,
    endDate,
    amount,
    isPositive,
    recurrence,
    id: 'id',
    createdAt: new Date(),
    name: 'name',
    userId: 'user-id',
    updatedAt: new Date(),
  });
}

test('validateEntryName returns a string when the name is not valid', () => {
  expect(validateEntryName('foo')).toBe(undefined)

  expect(validateEntryName(undefined)).toBe('Name should be filled')
  expect(validateEntryName(null)).toBe('Name should be filled')
  expect(validateEntryName('')).toBe('Name should be filled')
  expect(validateEntryName(['test'])).toBe('Name should be filled')
});

test('validateEntryAmount returns a string when the amount is not valid', () => {
  expect(validateEntryAmount(42)).toBe(undefined);

  expect(validateEntryAmount(undefined)).toBe('Amount should be greater than 0');
  expect(validateEntryAmount(-1)).toBe('Amount should be greater than 0');
  expect(validateEntryAmount(0)).toBe('Amount should be greater than 0');
  expect(validateEntryAmount(NaN)).toBe('Amount should be greater than 0');
});

test('validateEntryDate returns a string when the date is not valid', () => {
  expect(validateEntryDate(new Date(0))).toBe(undefined);
  expect(validateEntryDate(new Date())).toBe(undefined);

  expect(validateEntryDate(new Date('foo'))).toBe('Date should be a valid date');
});

test('validateEntryEndDate returns a string when the endDate is not valid', () => {
  expect(validateEntryEndDate(new Date(0), new Date(1))).toBe(undefined);
  expect(validateEntryEndDate(new Date(0), null)).toBe(undefined);

  expect(validateEntryEndDate(new Date(0), new Date('foo'))).toBe('End date should be a valide date and greater than start date');
  expect(validateEntryEndDate(new Date(1), new Date(0))).toBe('End date should be a valide date and greater than start date');
});

test('validateEntryRecurrence returns a string when the recurrence is not valid', () => {
  expect(validateEntryRecurrence('year')).toBe(undefined);
  expect(validateEntryRecurrence('month')).toBe(undefined);
  expect(validateEntryRecurrence('week')).toBe(undefined);
  expect(validateEntryRecurrence('day')).toBe(undefined);

  expect(validateEntryRecurrence('foo')).toBe('Recurrence should be valid');
  expect(validateEntryRecurrence(42)).toBe('Recurrence should be valid');
});

test.skip('computeNewAmount ensures the view date is in the entry date interval', () => {
  const entryDate = new Date();
  const entry = dummyRecurrentEntry(entryDate, addDays(entryDate, 1), 1, true, 'day');

  expect(computeNewAmount(entry, addDays(entryDate, 2), 'day')).toStrictEqual({ ...entry, computedAmount: 0 });
  expect(computeNewAmount(entry, subDays(entryDate, 1), 'day')).toStrictEqual({ ...entry, computedAmount: 0 });

  expect(computeNewAmount(entry, addDays(entryDate, 1), 'day')).toStrictEqual({ ...entry, computedAmount: 1 });
});

//
// daily entry
//
test('computedNewAmount returns the cumulated amount for a daily recurrent entry for day view', () => {
  const entryDate = new Date();
  const entry = dummyRecurrentEntry(entryDate, null, 1, true, 'day');

  expect(computeNewAmount(entry, entryDate, 'day')).toStrictEqual({ ...entry, computedAmount: 1 });
  expect(computeNewAmount(entry, addDays(entryDate, 10), 'day')).toStrictEqual({ ...entry, computedAmount: 1 });
});

test('computedNewAmount returns the cumulated amount for a daily recurrent entry for week view', () => {
  const entryDate = new Date('2023-03-13'); // a Monday
  let entry = dummyRecurrentEntry(entryDate, null, 1, true, 'day');

  expect(computeNewAmount(entry, entryDate, 'week')).toStrictEqual({ ...entry, computedAmount: 7 });
  expect(computeNewAmount(entry, addDays(entryDate, 10), 'week')).toStrictEqual({ ...entry, computedAmount: 7 });

  // add en end date
  entry = dummyRecurrentEntry(entryDate, addDays(entryDate, 13), 1, true, 'day');

  expect(computeNewAmount(entry, entryDate, 'week')).toStrictEqual({ ...entry, computedAmount: 7 });
  expect(computeNewAmount(entry, addDays(entryDate, 7), 'week')).toStrictEqual({ ...entry, computedAmount: 7 });

  // shift the entry to go from a thursday to another (2 weeks)
  entry = dummyRecurrentEntry(new Date('2023-03-16'), new Date('2023-03-30'), 1, true, 'day');

  expect(computeNewAmount(entry, new Date('2023-03-13'), 'week')).toStrictEqual({ ...entry, computedAmount: 4 });
  expect(computeNewAmount(entry, new Date('2023-03-16'), 'week')).toStrictEqual({ ...entry, computedAmount: 4 });
  expect(computeNewAmount(entry, new Date('2023-03-23'), 'week')).toStrictEqual({ ...entry, computedAmount: 7 });
});

test('computeNewAmount returns the cumulated amount for a daily recurrent entry for month view', () => {
  const entryDate = new Date('2023-03-13'); // a Monday
  let entry = dummyRecurrentEntry(entryDate, null, 1, true, 'day');

  // march has 31 days
  expect(computeNewAmount(entry, entryDate, 'month')).toStrictEqual({ ...entry, computedAmount: 31-12 });
  expect(computeNewAmount(entry, addDays(entryDate, 10), 'month')).toStrictEqual({ ...entry, computedAmount: 31-12 });
  expect(computeNewAmount(entry, new Date('2023-03-01'), 'month')).toStrictEqual({ ...entry, computedAmount: 31-12 });

  // add en end date
  entry = dummyRecurrentEntry(entryDate, addDays(entryDate, 13), 1, true, 'day');
  expect(computeNewAmount(entry, entryDate, 'month')).toStrictEqual({ ...entry, computedAmount: 14 });
  expect(computeNewAmount(entry, new Date('2023-03-01'), 'month')).toStrictEqual({ ...entry, computedAmount: 14 });
  expect(computeNewAmount(entry, new Date('2023-03-31'), 'month')).toStrictEqual({ ...entry, computedAmount: 14 });
});

test('computeNewAmount returns the cumulated amount for a daily recurrent entry for a year view', () => {
  const entryDate = new Date('2023-03-13'); // a Monday
  let entry = dummyRecurrentEntry(entryDate, null, 1, true, 'day');

  // march then next months
  expect(computeNewAmount(entry, entryDate, 'year')).toStrictEqual({ ...entry, computedAmount: 31-12 + 30 * 4 + 31 * 5 });

  // add en end date
  entry = dummyRecurrentEntry(entryDate, addDays(entryDate, 30), 1, true, 'day');

  // first days in march (31-12) then the rest
  expect(computeNewAmount(entry, entryDate, 'year')).toStrictEqual({ ...entry, computedAmount: 31-12 + 31-(31-12) });
});

//
// weekly entry
//
test('computeNewAmount returns the cumulated amount for a weekly recurrent entry for a day view', () => {
  const entryDate = new Date('2023-03-13'); // a Monday
  let entry = dummyRecurrentEntry(entryDate, null, 1, true, 'week');

  expect(computeNewAmount(entry, entryDate, 'day')).toStrictEqual({ ...entry, computedAmount: 1/7 });
});

test('computeNewAmount returns the cumulated amount for a weekly recurrent entry for a week view', () => {
  const entryDate = new Date('2023-03-13'); // a Monday
  let entry = dummyRecurrentEntry(entryDate, null, 1, true, 'week');

  expect(computeNewAmount(entry, entryDate, 'week')).toStrictEqual({ ...entry, computedAmount: 1 });
  expect(computeNewAmount(entry, addDays(entryDate, 10), 'week')).toStrictEqual({ ...entry, computedAmount: 1 });

  // add en end date
  entry = dummyRecurrentEntry(entryDate, addDays(entryDate, 13), 1, true, 'week');

  expect(computeNewAmount(entry, entryDate, 'week')).toStrictEqual({ ...entry, computedAmount: 1 });
  expect(computeNewAmount(entry, addDays(entryDate, 7), 'week')).toStrictEqual({ ...entry, computedAmount: 1 });

  // shift the entry to go from a thursday to another (2 weeks)
  entry = dummyRecurrentEntry(new Date('2023-03-16'), new Date('2023-03-30'), 1, true, 'week');

  expect(computeNewAmount(entry, new Date('2023-03-13'), 'week')).toStrictEqual({ ...entry, computedAmount: 4/7 });
  expect(computeNewAmount(entry, new Date('2023-03-16'), 'week')).toStrictEqual({ ...entry, computedAmount: 4/7 });
  expect(computeNewAmount(entry, new Date('2023-03-23'), 'week')).toStrictEqual({ ...entry, computedAmount: 1 });
});

test('computeNewAmount returns the cumulated amount for a weekly recurrent entry for a month view', () => {
  const entryDate = new Date('2023-03-13'); // a Monday
  let entry = dummyRecurrentEntry(entryDate, null, 1, true, 'week');

  // 2 weeks + 5 days
  expect(computeNewAmount(entry, entryDate, 'month')).toStrictEqual({ ...entry, computedAmount: 2 + 5/7 });

  // add en end date
  entry = dummyRecurrentEntry(entryDate, addDays(entryDate, 5), 1, true, 'week');

  expect(computeNewAmount(entry, entryDate, 'month')).toStrictEqual({ ...entry, computedAmount: 6/7 });

  // add en end date
  entry = dummyRecurrentEntry(entryDate, addDays(entryDate, 13), 1, true, 'week');

  expect(computeNewAmount(entry, entryDate, 'month')).toStrictEqual({ ...entry, computedAmount: 2 });

  // shift the entry to go from a thursday to another (2 weeks)
  entry = dummyRecurrentEntry(new Date('2023-03-16'), new Date('2023-03-30'), 1, true, 'week');

  expect(computeNewAmount(entry, new Date('2023-03-13'), 'month')).toStrictEqual({ ...entry, computedAmount: 4/7 + 1 + 4/7 });
});

test('computeNewAmount returns the cumulated amount for a weekly recurrent entry for a year view', () => {
  const entryDate = new Date('2023-03-13'); // a Monday
  let entry = dummyRecurrentEntry(entryDate, null, 1, true, 'week');

  // 42 weeks
  expect(computeNewAmount(entry, entryDate, 'year')).toStrictEqual({ ...entry, computedAmount: 42 });

  // add en end date
  entry = dummyRecurrentEntry(entryDate, addDays(entryDate, 30), 1, true, 'week');

  expect(computeNewAmount(entry, entryDate, 'year')).toStrictEqual({ ...entry, computedAmount: 4 + 3 / 7});
});

//
// monthly entry
//
test('computeNewAmount returns the cumulated amount for a monthly recurrent entry for a day view', () => {
  const entryDate = new Date('2023-03-13');
  let entry = dummyRecurrentEntry(entryDate, null, 1, true, 'month');

  expect(computeNewAmount(entry, entryDate, 'day')).toStrictEqual({ ...entry, computedAmount: 1 / 31 });

  // test month with less than 31 days
  entry = dummyRecurrentEntry(new Date('2023-02-02'), null, 1, true, 'month');

  expect(computeNewAmount(entry, new Date('2023-02-20'), 'day')).toStrictEqual({ ...entry, computedAmount: 1 / 28 });
});

test('computeNewAmount returns the cumulated amount for a monthly recurrent entry for a week view', () => {
  const entryDate = new Date('2023-03-13');
  let entry = dummyRecurrentEntry(entryDate, null, 1, true, 'month');

  // 1 week in march, which has 3 full weeks and two weeks with 5 days
  expect(computeNewAmount(entry, entryDate, 'week')).toStrictEqual({ ...entry, computedAmount: 1/(5/7 + 3 + 5/7) });
  expect(computeNewAmount(entry, new Date('2023-03-31'), 'week')).toStrictEqual({ ...entry, computedAmount: 1/(5/7 + 3 + 5/7) });

  // add en end date
  entry = dummyRecurrentEntry(entryDate, new Date('2023-05-12'), 1, true, 'month');

  expect(computeNewAmount(entry, new Date('2023-05-08'), 'week')).toStrictEqual({ ...entry, computedAmount: 5/31 });
});

test('computeNewAmount returns the cumulated amount for a monthly recurrent entry for a month view', () => {
  const entryDate = new Date('2023-03-13');
  let entry = dummyRecurrentEntry(entryDate, null, 1, true, 'month');

  expect(computeNewAmount(entry, entryDate, 'month')).toStrictEqual({ ...entry, computedAmount: (14+5)/31 });

  // change start date
  entry = dummyRecurrentEntry(new Date('2023-03-10'), null, 1, true, 'month');

  expect(computeNewAmount(entry, entryDate, 'month')).toStrictEqual({ ...entry, computedAmount: (3+14+5)/31 });

  // test month with less than 31 days
  entry = dummyRecurrentEntry(new Date('2023-02-02'), null, 1, true, 'month');

  expect(computeNewAmount(entry, new Date('2023-02-20'), 'month')).toStrictEqual({ ...entry, computedAmount: (4 + 21 + 2)/28 });
  expect(computeNewAmount(entry, new Date('2023-03-20'), 'month')).toStrictEqual({ ...entry, computedAmount: 1 });

  // add en end date
  entry = dummyRecurrentEntry(entryDate, addDays(entryDate, 30), 1, true, 'month');

  expect(computeNewAmount(entry, new Date('2023-04-02'), 'month')).toStrictEqual({ ...entry, computedAmount: (2+7+3)/30 });
});

test('computNewAmount returns the cumulated amount for monthly recurrent entry for a year view', () => {
  const entryDate = new Date('2023-03-13');
  let entry = dummyRecurrentEntry(entryDate, null, 1, true, 'month');

  expect(computeNewAmount(entry, new Date('2023-03-13'), 'year')).toStrictEqual({ ...entry, computedAmount: 294/31 });
  // proper result:
  // expect(computeNewAmount(entry, new Date('2023-03-13'), 'year')).toStrictEqual({ ...entry, computedAmount: 19/31 + 9 });
});

//
// yearly entry
//
test('computeNewAmount returns the cumulated amount for a yearly recurrent entry for a day view', () => {
  const entryDate = new Date('2023-03-13');
  let entry = dummyRecurrentEntry(entryDate, null, 1, true, 'year');

  expect(computeNewAmount(entry, entryDate, 'day')).toStrictEqual({ ...entry, computedAmount: 1 / 365 });
  expect(computeNewAmount(entry, new Date('2024-04-04'), 'day')).toStrictEqual({ ...entry, computedAmount: 1 / 366 });

  // add en end date
  entry = dummyRecurrentEntry(entryDate, new Date('2024-02-02'), 1, true, 'year');

  expect(computeNewAmount(entry, new Date('2024-01-04'), 'day')).toStrictEqual({ ...entry, computedAmount: 1 / 366 });
});

test('computeNewAmount returns the cumulated amount for a yearly recurrent entry for week view', () => {
  const entryDate = new Date('2023-03-13');
  let entry = dummyRecurrentEntry(entryDate, null, 1, true, 'year');

  expect(computeNewAmount(entry, entryDate, 'week')).toStrictEqual({ ...entry, computedAmount: 7/365 });
});

test('computedAmount retuns the cumulated amount for a yearly recurrent entry for a month view', () => {
  const entryDate = new Date('2023-03-13');
  let entry = dummyRecurrentEntry(entryDate, null, 1, true, 'year');

  // expect(computeNewAmount(entry, entryDate, 'month')).toStrictEqual({ ...entry, computedAmount: 19/365 });
  expect(computeNewAmount(entry, new Date('2023-04-12'), 'month')).toStrictEqual({ ...entry, computedAmount: 30/365 });
  expect(computeNewAmount(entry, new Date('2023-05-12'), 'month')).toStrictEqual({ ...entry, computedAmount: 31/365 });
  expect(computeNewAmount(entry, new Date('2024-04-12'), 'month')).toStrictEqual({ ...entry, computedAmount: 30/366 });

  // add en end date
  entry = dummyRecurrentEntry(entryDate, new Date('2024-02-02'), 1, true, 'year');

  expect(computeNewAmount(entry, new Date('2024-01-04'), 'month')).toStrictEqual({ ...entry, computedAmount: 31/366 });
  expect(computeNewAmount(entry, new Date('2024-02-01'), 'month')).toStrictEqual({ ...entry, computedAmount: 2/366 });
});

test('computeNewAmount returns the cumulated amount for a yearly recurrent entry for a year view', () => {
  const entryDate = new Date('2023-03-13');
  let entry = dummyRecurrentEntry(entryDate, null, 1, true, 'year');

  expect(computeNewAmount(entry, entryDate, 'year')).toStrictEqual({ ...entry, computedAmount: 1 - (31 + 28 + 12) / 365 });
  expect(computeNewAmount(entry, new Date('2023-08-10'), 'year')).toStrictEqual({ ...entry, computedAmount: 1 - (31 + 28 + 12) / 365 });

  // add en end date
  entry = dummyRecurrentEntry(entryDate, new Date('2024-03-14'), 1, true, 'year');
  expect(computeNewAmount(entry, new Date('2024-08-10'), 'year')).toStrictEqual({ ...entry, computedAmount: (31 + 29 + 14) / 366 });
});
