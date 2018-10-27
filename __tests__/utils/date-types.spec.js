import {
  typeDisplay,
  getGreaterTypes,
} from '../../src/utils/date-types';

describe('utils/date-types.js', () => {
  describe('typeDisplay', () => {
    const inputs = [{
      type: 'day',
      res: 'Day',
    }, {
      type: 'week',
      res: 'Week',
    }, {
      type: 'month',
      res: 'Month',
    }, {
      type: 'year',
      res: 'Year',
    }, {
      type: 'random',
      res: 'Year',
    }];

    inputs.forEach(input =>
      test(`${input.type} => ${input.res}`, () => expect(typeDisplay(input.type)).toEqual(input.res)));
  });

  describe('getGreaterTypes', () => {
    const inputs = [{
      type: 'day',
      res: ['day', 'week', 'month', 'year'],
    }, {
      type: 'week',
      res: ['week', 'month', 'year',],
    }, {
      type: 'month',
      res: ['month', 'year'],
    }, {
      type: 'year',
      res: ['year'],
    }, {
      type: 'random',
      res: ['day', 'week', 'month', 'year'],
    }];

    inputs.forEach(input =>
      test(`${input.type} => ${input.res}`, () => expect(getGreaterTypes(input.type)).toEqual(input.res)));
  });
});
