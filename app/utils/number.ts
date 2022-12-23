function formatBalance(locale: string, currency: string, value: number) {
  return Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    maximumSignificantDigits: 2,
  }).format(value);
}

export {
  formatBalance,
};
