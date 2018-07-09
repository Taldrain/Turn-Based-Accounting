import {
  // createEntry,
  // editEntry,
  // displayedRecurrentsEntries,
  typeDisplay,
  // convertAmount,
} from '../../src/utils/entry';

describe('utils/entry.js', () => {
  describe('typeDisplay', () => {
    const inputs = [{
      type: 'day'
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
      test(`${input.type} => ${input.res}`, () => expect(typeDisplay(input.type)).toEqual(input.res))
    );
  });
});
