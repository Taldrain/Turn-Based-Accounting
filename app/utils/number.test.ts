import { formatBalance, getAmount } from './number';

test('formatBalance format number is specific locale', () => {
  expect(formatBalance('fr-FR', 'EUR', 42_000)).toBe("42\u202f000,00 €");
  expect(formatBalance('fr-FR', 'USD', 42_000)).toBe("42\u202f000,00 $US");
  expect(formatBalance('en-US', 'EUR', 42_000)).toBe("€42,000.00");
  expect(formatBalance('en-US', 'USD', 42_000)).toBe("$42,000.00");
});

test('getAmount returns positive number', () => {
  expect(getAmount(42, true)).toBe(42);
  expect(getAmount(0, true)).toBe(0);
});

test('getAmount returns negative number', () => {
  expect(getAmount(42, false)).toBe(-42);
  expect(getAmount(0, false)).toBe(-0);
});
