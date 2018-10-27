import {
  // createEntry,
  // editEntry,
  // displayedRecurrentsEntries,
  // convertAmount,
  getAmount,
} from '../../src/utils/entry';


describe('utils/entry.js', () => {
  describe('getAmount', () => {
    function createEntry(amount, isPositive, amountKey = 'amount') {
      return ({
        [amountKey]: amount,
        isPositive,
      });
    }

    const inputs = [{
      entry: createEntry(12, true),
      res: 12,
    }, {
      entry: createEntry(12, false),
      res: -12,
    }, {
      entry: createEntry(12, true, 'unknown'),
      amountKey: 'unknown',
      res: 12,
    }, {
      entry: createEntry(12, false, 'unknown'),
      amountKey: 'unknown',
      res: -12,
    }];
    inputs.forEach(input =>
      test(`${input.entry} => ${input.res}`, () => expect(getAmount(input.entry, input.amountKey)).toEqual(input.res)));
  });
});
