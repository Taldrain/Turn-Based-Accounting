function formatBalance(locale: string, currency: string, value: number) {
  return Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
  }).format(value);
}

export {
  formatBalance,
};
