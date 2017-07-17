const Utils = require('../../src/utils/date.js');

describe('Utils Date', () => {
  describe('formateDate', () => {
    const inputs = [
      {
        title: 'day 2017/06/30',
        type: 'day',
        date: new Date(2017, 5, 30, 12, 0, 0, 0),
        startDate: new Date(2017, 5, 30, 0, 0, 0, 0),
        endDate: new Date(2017, 5, 30, 23, 59, 59, 999),
      }, {
        title: 'day 2017/08/01',
        type: 'day',
        date: new Date(2017, 7, 1, 12, 0, 0, 0),
        startDate: new Date(2017, 7, 1, 0, 0, 0, 0),
        endDate: new Date(2017, 7, 1, 23, 59, 59, 999),
      }, {
        title: 'day 2011/11/11',
        type: 'day',
        date: new Date(2011, 10, 11, 12, 0, 0, 0),
        startDate: new Date(2011, 10, 11, 0, 0, 0, 0),
        endDate: new Date(2011, 10, 11, 23, 59, 59, 999),
      }, {
        title: 'week 2017/07/16',
        type: 'week',
        date: new Date(2017, 6, 16, 12, 0, 0, 0),
        startDate: new Date(2017, 6, 10, 0, 0, 0, 0),
        endDate: new Date(2017, 6, 16, 23, 59, 59, 999),
      }, {
        title: 'week 2017/06/30',
        type: 'week',
        date: new Date(2017, 5, 30, 12, 0, 0, 0),
        startDate: new Date(2017, 5, 26, 0, 0, 0, 0),
        endDate: new Date(2017, 6, 2, 23, 59, 59, 999),
      }, {
        title: 'week 2017/08/01',
        type: 'week',
        date: new Date(2017, 7, 1, 12, 0, 0, 0),
        startDate: new Date(2017, 6, 31, 0, 0, 0, 0),
        endDate: new Date(2017, 7, 6, 23, 59, 59, 999),
      }, {
        title: 'week 2011/11/11',
        type: 'week',
        date: new Date(2011, 10, 11, 13, 0, 0, 0),
        startDate: new Date(2011, 10, 7, 0, 0, 0, 0),
        endDate: new Date(2011, 10, 13, 23, 59, 59, 999),
      }, {
        title: 'month 2017/06/30',
        type: 'month',
        date: new Date(2017, 5, 30, 12, 0, 0, 0),
        startDate: new Date(2017, 5, 1, 0, 0, 0, 0),
        endDate: new Date(2017, 5, 30, 23, 59, 59, 999),
      }, {
        title: 'month 2017/08/11',
        type: 'month',
        date: new Date(2017, 7, 1, 12, 0, 0, 0),
        startDate: new Date(2017, 7, 1, 0, 0, 0, 0),
        endDate: new Date(2017, 7, 31, 23, 59, 59, 999),
      }, {
        title: 'month 2011/11/11',
        type: 'month',
        date: new Date(2011, 10, 11, 13, 0, 0, 0),
        startDate: new Date(2011, 10, 1, 0, 0, 0, 0),
        endDate: new Date(2011, 10, 30, 23, 59, 59, 999),
      }, {
        title: 'year 2017/06/30',
        type: 'year',
        date: new Date(2017, 5, 30, 12, 0, 0, 0),
        startDate: new Date(2017, 0, 1, 0, 0, 0, 0),
        endDate: new Date(2017, 11, 31, 23, 59, 59, 999),
      }, {
        title: 'year 2017/08/11',
        type: 'year',
        date: new Date(2017, 7, 1, 12, 0, 0, 0),
        startDate: new Date(2017, 0, 1, 0, 0, 0, 0),
        endDate: new Date(2017, 11, 31, 23, 59, 59, 999),
      }, {
        title: 'year 2011/11/11',
        type: 'year',
        date: new Date(2011, 10, 11, 13, 0, 0, 0),
        startDate: new Date(2011, 0, 1, 0, 0, 0, 0),
        endDate: new Date(2011, 11, 31, 23, 59, 59, 999),
      }
    ];

    inputs.forEach((input) => {
      test(input.title, () => {
        expect(Utils.formatDate(input.date, input.type).startDate.getTime()).toEqual(input.startDate.getTime());
        expect(Utils.formatDate(input.date, input.type).endDate.getTime()).toEqual(input.endDate.getTime());
      });
    });
  });

  describe('previousDate', () => {
    const inputs = [
      {
        title: 'day 2017/06/30',
        type: 'day',
        date: new Date(2017, 5, 30, 12, 0, 0, 0),
        res: new Date(2017, 5, 29, 0, 0, 0, 0),
      }, {
        title: 'day 2017/08/01',
        type: 'day',
        date: new Date(2017, 7, 1, 12, 0, 0, 0),
        res: new Date(2017, 6, 31, 0, 0, 0, 0),
      }, {
        title: 'day 2011/11/11',
        type: 'day',
        date: new Date(2011, 10, 11, 12, 0, 0, 0),
        res: new Date(2011, 10, 10, 0, 0, 0, 0),
      }, {
        title: 'week 2017/06/30',
        type: 'week',
        date: new Date(2017, 5, 30, 12, 0, 0, 0),
        res: new Date(2017, 5, 19, 0, 0, 0, 0),
      }, {
        title: 'week 2017/08/01',
        type: 'week',
        date: new Date(2017, 7, 1, 12, 0, 0, 0),
        res: new Date(2017, 6, 24, 0, 0, 0, 0),
      }, {
        title: 'week 2011/11/11',
        type: 'week',
        date: new Date(2011, 10, 11, 13, 0, 0, 0),
        res: new Date(2011, 9, 31, 0, 0, 0, 0),
      }, {
        title: 'month 2017/06/30',
        type: 'month',
        date: new Date(2017, 5, 30, 12, 0, 0, 0),
        res: new Date(2017, 4, 1, 0, 0, 0, 0),
      }, {
        title: 'month 2017/08/11',
        type: 'month',
        date: new Date(2017, 7, 1, 12, 0, 0, 0),
        res: new Date(2017, 6, 1, 0, 0, 0, 0),
      }, {
        title: 'month 2011/11/11',
        type: 'month',
        date: new Date(2011, 10, 11, 13, 0, 0, 0),
        res: new Date(2011, 9, 1, 0, 0, 0, 0),
      }, {
        title: 'year 2017/06/30',
        type: 'year',
        date: new Date(2017, 5, 30, 12, 0, 0, 0),
        res: new Date(2016, 0, 1, 0, 0, 0, 0),
      }, {
        title: 'year 2017/08/11',
        type: 'year',
        date: new Date(2017, 7, 1, 12, 0, 0, 0),
        res: new Date(2016, 0, 1, 0, 0, 0, 0),
      }, {
        title: 'year 2011/11/11',
        type: 'year',
        date: new Date(2011, 10, 11, 13, 0, 0, 0),
        res: new Date(2010, 0, 1, 0, 0, 0, 0),
      }
    ];

    inputs.forEach((input) => {
      test(input.title, () => {
        expect(Utils.previousDate(input.date, input.type).getTime()).toEqual(input.res.getTime());
      });
    });
  });

  describe('nextDate', () => {
    const inputs = [
      {
        title: 'day 2017/06/30',
        type: 'day',
        date: new Date(2017, 5, 30, 12, 0, 0, 0),
        res: new Date(2017, 6, 1, 0, 0, 0, 0),
      }, {
        title: 'day 2017/08/01',
        type: 'day',
        date: new Date(2017, 7, 1, 12, 0, 0, 0),
        res: new Date(2017, 7, 2, 0, 0, 0, 0),
      }, {
        title: 'day 2011/11/11',
        type: 'day',
        date: new Date(2011, 10, 11, 12, 0, 0, 0),
        res: new Date(2011, 10, 12, 0, 0, 0, 0),
      }, {
        title: 'week 2017/06/30',
        type: 'week',
        date: new Date(2017, 5, 30, 12, 0, 0, 0),
        res: new Date(2017, 6, 3, 0, 0, 0, 0),
      }, {
        title: 'week 2017/08/01',
        type: 'week',
        date: new Date(2017, 7, 1, 12, 0, 0, 0),
        res: new Date(2017, 7, 7, 0, 0, 0, 0),
      }, {
        title: 'week 2011/11/11',
        type: 'week',
        date: new Date(2011, 10, 11, 13, 0, 0, 0),
        res: new Date(2011, 10, 14, 0, 0, 0, 0),
      }, {
        title: 'month 2017/06/30',
        type: 'month',
        date: new Date(2017, 5, 30, 12, 0, 0, 0),
        res: new Date(2017, 6, 1, 0, 0, 0, 0),
      }, {
        title: 'month 2017/08/11',
        type: 'month',
        date: new Date(2017, 7, 1, 12, 0, 0, 0),
        res: new Date(2017, 8, 1, 0, 0, 0, 0),
      }, {
        title: 'month 2011/11/11',
        type: 'month',
        date: new Date(2011, 10, 11, 13, 0, 0, 0),
        res: new Date(2011, 11, 1, 0, 0, 0, 0),
      }, {
        title: 'year 2017/06/30',
        type: 'year',
        date: new Date(2017, 5, 30, 12, 0, 0, 0),
        res: new Date(2018, 0, 1, 0, 0, 0, 0),
      }, {
        title: 'year 2017/08/11',
        type: 'year',
        date: new Date(2017, 7, 1, 12, 0, 0, 0),
        res: new Date(2018, 0, 1, 0, 0, 0, 0),
      }, {
        title: 'year 2011/11/11',
        type: 'year',
        date: new Date(2011, 10, 11, 13, 0, 0, 0),
        res: new Date(2012, 0, 1, 0, 0, 0, 0),
      }
    ];

    inputs.forEach((input) => {
      test(input.title, () => {
        expect(Utils.nextDate(input.date, input.type).getTime()).toEqual(input.res.getTime());
      });
    });

  });

  describe('isSameDate', () => {
    const inputs = [
      {
        title: 'day 2017/06/30',
        type: 'day',
        date1: new Date(2017, 5, 30, 12, 0, 0, 0),
        date2: new Date(2017, 5, 30, 20, 12, 0, 1),
        res: true,
      }, {
        title: 'day 2017/03/20',
        type: 'day',
        date1: new Date(2017, 2, 20, 12, 0, 0, 0),
        date2: new Date(),
        res: false,
      }, {
        title: 'year 2017',
        type: 'year',
        date1: new Date(2017, 2, 20, 12, 0, 0, 0),
        date2: new Date(2017, 6, 1, 0, 2, 0, 0),
        res: true,
      }, {
        title: 'year 2018',
        type: 'year',
        date1: new Date(2017, 2, 20, 12, 0, 0, 0),
        date2: new Date(2012, 6, 1, 0, 2, 0, 0),
        res: false,
      }
    ];

    inputs.forEach((input) => {
      test(input.title, () => {
        expect(Utils.isSameDate(input.date1, input.date2, input.type)).toBe(input.res);
      });
    });
  });

  describe('isToday', () => {
    const inputs = [
      {
        title: 'falsy',
        date: new Date(2018, 5, 23, 0, 2, 0, 0),
        res: false,
      }, {
        title: 'truthy',
        date: new Date(),
        res: true,
      }
    ];

    inputs.forEach((input) => {
      test(input.title, () => {
        expect(Utils.isToday(input.date)).toBe(input.res);
      });
    });
  });
});
