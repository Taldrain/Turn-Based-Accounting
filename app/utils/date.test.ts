import {
  formatDate,
  isInvalidDateParam,
  parseDateParam,
  previousDate,
  nextDate,
  startOf,
  endOf,
  minDate,
  maxDate,
} from './date';

import { localizeDateFns } from './l10n';

beforeAll(async () => {
  // the week will start a monday
  await localizeDateFns('fr-FR');
});

test('formatDate returns a date in the yyyy-MM-dd format', () => {
  expect(formatDate(new Date('2023-03-13'))).toBe('2023-03-13');
  expect(formatDate(new Date(1678980838000))).toBe('2023-03-16');
});

test('isInvalidDateParam returns false if the date format is valid', () => {
  expect(isInvalidDateParam('2023-03-16')).toBe(false);
  expect(isInvalidDateParam('today')).toBe(false);

  expect(isInvalidDateParam('2023-14-03')).toBe(true);
  expect(isInvalidDateParam('foo')).toBe(true);
  expect(isInvalidDateParam('abcd-ef-gh')).toBe(true);
});

test('parseDateParam returns a date in yyyy-MM-dd depending on the input', () => {
  const today = formatDate(new Date());

  expect(parseDateParam('today')).toBe(today);
  expect(parseDateParam('foo')).toBe(today);
  expect(parseDateParam('')).toBe(today);
  expect(parseDateParam('2023-03-16')).toBe('2023-03-16');
});

test('previousDate returns the previous date depending on the type', () => {
  // Thursday - 2023-03-16

  // day
  expect(previousDate('2023-03-16', 'day')).toBe('2023-03-15');
  expect(previousDate('2023-03-01', 'day')).toBe('2023-02-28');
  expect(previousDate('2023-01-01', 'day')).toBe('2022-12-31');

  // week
  expect(previousDate('2023-03-16', 'week')).toBe('2023-03-09');
  expect(previousDate('2023-03-01', 'week')).toBe('2023-02-22');
  expect(previousDate('2023-01-01', 'week')).toBe('2022-12-25');

  // month
  expect(previousDate('2023-03-16', 'month')).toBe('2023-02-16');
  expect(previousDate('2023-03-31', 'month')).toBe('2023-02-28');
  expect(previousDate('2023-03-01', 'month')).toBe('2023-02-01');

  // year
  expect(previousDate('2023-03-16', 'year')).toBe('2022-03-16');
  expect(previousDate('2024-02-29', 'year')).toBe('2023-02-28');
});

test('nextDate returns the next date date depending on the type', () => {
  // Thursday - 2023-03-16

  // day
  expect(nextDate('2023-03-16', 'day')).toBe('2023-03-17');
  expect(nextDate('2023-02-28', 'day')).toBe('2023-03-01');
  expect(nextDate('2022-12-31', 'day')).toBe('2023-01-01');

  // week
  expect(nextDate('2023-03-09', 'week')).toBe('2023-03-16');
  expect(nextDate('2023-02-22', 'week')).toBe('2023-03-01');
  expect(nextDate('2022-12-25', 'week')).toBe('2023-01-01');

  // month
  expect(nextDate('2023-02-16', 'month')).toBe('2023-03-16');
  expect(nextDate('2023-01-31', 'month')).toBe('2023-02-28');
  expect(nextDate('2023-02-28', 'month')).toBe('2023-03-28');
  expect(nextDate('2023-02-01', 'month')).toBe('2023-03-01');

  // year
  expect(nextDate('2022-03-16', 'year')).toBe('2023-03-16');
  expect(nextDate('2023-02-28', 'year')).toBe('2024-02-28');
});

test('startOf returns the start of the date depending on the type', () => {
  // we use formatDate around the input to prevent issue with the timezone

  // day
  expect(formatDate(startOf(new Date('2023-03-16'), 'day'))).toBe('2023-03-16');

  // week
  expect(formatDate(startOf(new Date('2023-03-16'), 'week'))).toBe('2023-03-13');
  expect(formatDate(startOf(new Date('2024-03-02'), 'week'))).toBe('2024-02-26');
  expect(formatDate(startOf(new Date('2022-01-01'), 'week'))).toBe('2021-12-27');

  // month
  expect(formatDate(startOf(new Date('2023-03-16'), 'month'))).toBe('2023-03-01');
  expect(formatDate(startOf(new Date('2024-02-29'), 'month'))).toBe('2024-02-01');

  // year
  expect(formatDate(startOf(new Date('2023-03-16'), 'year'))).toBe('2023-01-01');
  expect(formatDate(startOf(new Date('2024-02-29'), 'year'))).toBe('2024-01-01');
});

test('endOf returns the end of the date depending on the type', () => {
  // we use formatDate around the input to prevent issue with the timezone

  // day
  expect(formatDate(endOf(new Date('2023-03-16'), 'day'))).toBe('2023-03-16');

  // week
  expect(formatDate(endOf(new Date('2023-03-16'), 'week'))).toBe('2023-03-19');
  expect(formatDate(endOf(new Date('2024-02-27'), 'week'))).toBe('2024-03-03');
  expect(formatDate(endOf(new Date('2022-12-31'), 'week'))).toBe('2023-01-01');

  // month
  expect(formatDate(endOf(new Date('2023-03-16'), 'month'))).toBe('2023-03-31');
  expect(formatDate(endOf(new Date('2024-02-16'), 'month'))).toBe('2024-02-29');

  // year
  expect(formatDate(endOf(new Date('2023-03-16'), 'year'))).toBe('2023-12-31');
});

test('minDate returns the smallest date between two dates', () => {
  expect(minDate(new Date('2023-03-13'), undefined)).toStrictEqual(new Date('2023-03-13'));
  expect(minDate(new Date('2023-03-13'), null)).toStrictEqual(new Date('2023-03-13'));

  expect(minDate(new Date('2023-03-13'), new Date('2023-03-14'))).toStrictEqual(new Date('2023-03-13'));

  expect(minDate(new Date('2023-03-13'), new Date('2023-03-12'))).toStrictEqual(new Date('2023-03-12'));
});

test('maxDate returns the biggest date between two dates', () => {
  expect(maxDate(new Date('2023-03-13'), undefined)).toStrictEqual(new Date('2023-03-13'));

  expect(maxDate(new Date('2023-03-13'), new Date('2023-03-12'))).toStrictEqual(new Date('2023-03-13'));

  expect(maxDate(new Date('2023-03-13'), new Date('2023-03-14'))).toStrictEqual(new Date('2023-03-14'));
});
