import {
  getStartDate,
  getEndDate,

  previousDate,
  nextDate,

  isDateBetween,

  diffDates,

  minDate,
  maxDate,
} from '../../src/utils/date';

describe('utils/date.js', () => {
  describe('getStartDate() && getEndDate()', () => {
    const inputs = [{
      type: 'day',
      date: new Date(2017, 5, 30),
      startDate: '2017-06-30',
      endDate: '2017-06-30',
    }, {
      type: 'day',
      date: new Date(2017, 7, 1),
      startDate: '2017-08-01',
      endDate: '2017-08-01',
    }, {
      type: 'day',
      date: new Date(2017, 10, 11),
      startDate: '2017-11-11',
      endDate: '2017-11-11',
    }, {
      type: 'week',
      date: new Date(2017, 6, 16),
      startDate: '2017-07-10',
      endDate: '2017-07-16',
    }, {
      type: 'week',
      date: new Date(2017, 5, 30),
      startDate: '2017-06-26',
      endDate: '2017-07-02',
    }, {
      type: 'week',
      date: new Date(2017, 7, 1),
      startDate: '2017-07-31',
      endDate: '2017-08-06',
    }, {
      type: 'week',
      date: new Date(2011, 10, 11),
      startDate: '2011-11-07',
      endDate: '2011-11-13',
    }, {
      type: 'month',
      date: new Date(2017, 5, 30),
      startDate: '2017-06-01',
      endDate: '2017-06-30',
    }, {
      type: 'month',
      date: new Date(2017, 7, 1),
      startDate: '2017-08-01',
      endDate: '2017-08-31',
    }, {
      type: 'month',
      date: new Date(2011, 10, 11),
      startDate: '2011-11-01',
      endDate: '2011-11-30',
    }, {
      type: 'year',
      date: new Date(2017, 5, 30),
      startDate: '2017-01-01',
      endDate: '2017-12-31',
    }, {
      type: 'year',
      date: new Date(2017, 0, 1),
      startDate: '2017-01-01',
      endDate: '2017-12-31',
    }];

    inputs.forEach((input) => {
      test(`${input.type} ${input.startDate}`, () => expect(getStartDate(input.date, input.type)).toEqual(input.startDate));
      test(`${input.type} ${input.endDate}`, () => expect(getEndDate(input.date, input.type)).toEqual(input.endDate));
    });
  });

  describe('previousDate() && nextDate()', () => {
    const inputs = [{
      type: 'day',
      date: '2017-06-30',
      previousDate: '2017-06-29',
      nextDate: '2017-07-01',
    }, {
      type: 'day',
      date: '2017-08-01',
      previousDate: '2017-07-31',
      nextDate: '2017-08-02',
    }, {
      type: 'day',
      date: '2011-11-11',
      previousDate: '2011-11-10',
      nextDate: '2011-11-12',
    }, {
      type: 'week',
      date:'2017-06-30',
      previousDate: '2017-06-23',
      nextDate: '2017-07-07',
    }, {
      type: 'week',
      date: '2017-08-01',
      previousDate: '2017-07-25',
      nextDate: '2017-08-08',
    }, {
      type: 'week',
      date: '2011-11-11',
      previousDate: '2011-11-04',
      nextDate: '2011-11-18',
    }, {
      type: 'month',
      date: '2017-06-30',
      previousDate: '2017-05-30',
      nextDate: '2017-07-30',
    }, {
      type: 'month',
      date: '2017-08-01',
      previousDate: '2017-07-01',
      nextDate: '2017-09-01',
    }, {
      type: 'month',
      date: '2011-11-11',
      previousDate: '2011-10-11',
      nextDate: '2011-12-11',
    }, {
      type: 'year',
      date: '2017-06-30',
      previousDate: '2016-06-30',
      nextDate: '2018-06-30',
    }, {
      type: 'year',
      date: '2017-08-01',
      previousDate: '2016-08-01',
      nextDate: '2018-08-01',
    }, {
      type: 'year',
      date: '2011-11-11',
      previousDate: '2010-11-11',
      nextDate: '2012-11-11',
    }];

    inputs.forEach((input) => {
      test(`${input.type} ${input.date}`, () => expect(previousDate(input.date, input.type)).toEqual(input.previousDate));
      test(`${input.type} ${input.date}`, () => expect(nextDate(input.date, input.type)).toEqual(input.nextDate));
    });
  });

  describe('isDateBetween()', () => {
    const inputs = [{
      type: 'day',
      date: '2018-08-08',
      res: true,
    }, {
      type: 'day',
      date: '2018-08-08',
      startDate: '2018-08-08',
      res: true,
    }, {
      type: 'day',
      date: '2018-08-08',
      startDate: '2018-08-08',
      endDate: '2018-08-08',
      res: true,
    }, {
      type: 'day',
      date: '2018-08-08',
      startDate: '2018-08-07',
      endDate: '2018-08-08',
      res: true,
    }, {
      type: 'day',
      date: '2018-08-08',
      startDate: '2018-08-07',
      endDate: '2018-08-07',
      res: false,
    }, {
      type: 'day',
      date: '2018-08-08',
      startDate: '2018-08-07',
      endDate: '2018-08-09',
      res: true,
    }, {
      type: 'month',
      date: '2018-08-08',
      startDate: '2018-08-07',
      endDate: '2018-08-09',
      res: true,
    }, {
      type: 'month',
      date: '2018-08-08',
      startDate: '2018-07-07',
      endDate: '2018-08-09',
      res: true,
    }, {
      type: 'month',
      date: '2018-08-08',
      startDate: '2018-07-07',
      endDate: '2018-09-09',
      res: true,
    }, {
      type: 'month',
      date: '2018-08-08',
      startDate: '2018-07-07',
      endDate: '2018-07-30',
      res: false,
    }];

    inputs.forEach((input) => {
      test(`${input.startDate} - ${input.endDate} is in ${input.date}(${input.date})`, () => expect(isDateBetween(input.startDate, input.endDate, input.date, input.type)).toEqual(input.res));
    });

  });

  describe('diffDates()', () => {
    const inputs = [{
      startDate: '2018-08-09',
      endDate: '2018-08-09',
      type: 'day',
      res: 1,
    }, {
      startDate: '2018-08-08',
      endDate: '2018-08-09',
      type: 'day',
      res: 2,
    }, {
      startDate: '2018-08-09',
      endDate: '2018-08-20',
      type: 'day',
      res: 12,
    }, {
      startDate: '2018-08-09',
      endDate: '2018-08-15',
      type: 'week',
      res: 1,
    }, {
      startDate: '2018-08-09',
      endDate: '2018-08-22',
      type: 'week',
      res: 2,
    }, {
      startDate: '2018-08-05',
      endDate: '2018-08-11',
      type: 'week',
      res: 1,
    }, {
      startDate: '2018-08-09',
      endDate: '2018-08-11',
      type: 'week',
      res: 3/7,
    }, {
      startDate: '2018-08-01',
      endDate: '2018-08-31',
      type: 'month',
      res: 1,
    }, {
      startDate: '2018-08-01',
      endDate: '2018-08-13',
      type: 'month',
      res: 13/31,
    }, {
      startDate: '2018-08-01',
      endDate: '2018-08-13',
      type: 'month',
      res: 13/31,
    }, {
      startDate: '2018-01-01',
      endDate: '2018-12-31',
      type: 'year',
      res: 1,
    }, {
      startDate: '2018-01-01',
      endDate: '2018-06-30',
      type: 'year',
      res: 0.5,
    }, {
      startDate: '2020-01-01',
      endDate: '2020-12-31',
      type: 'year',
      res: 1,
    }];

    inputs.forEach(input =>
      test(`${input.startDate} and ${input.endDate} - ${input.type}`, () => expect(diffDates(input.startDate, input.endDate, input.type)).toEqual(input.res))
    );
  });

  describe('minDate() && maxDate()', () => {
    const inputs = [{
      date1: '2017-08-08',
      date2: '2017-08-08',
      max: '2017-08-08',
      min: '2017-08-08',
    }, {
      date1: '2017-08-08',
      max: '2017-08-08',
      min: '2017-08-08',
    }, {
      date1: '2017-08-08',
      date2: '2017-08-07',
      max: '2017-08-08',
      min: '2017-08-07',
    }, {
      date1: '2017-08-08',
      date2: '2017-07-08',
      max: '2017-08-08',
      min: '2017-07-08',
    }];

    inputs.forEach((input) => {
      test(`min(${input.date1}, ${input.date2})`, () => expect(minDate(input.date1, input.date2)).toEqual(input.min));
      test(`max(${input.date1}, ${input.date2})`, () => expect(maxDate(input.date1, input.date2)).toEqual(input.max));
    });
  });
});
