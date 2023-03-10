function formatBalance(locale: string, currency: string, value: number) {
  return Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
  }).format(value);
}

function getAmount(amount: number, isPositive: boolean): number {
  return (isPositive ? 1 : -1) * amount;
}

export {
  formatBalance,
  getAmount,
};
