function formatNumber(i, locale, style) {
  if (Intl === undefined) {
    return i;
  }

  return Intl.NumberFormat(locale, style).format(i);
}

function formatBalance(i, locale, currency) {
  return formatNumber(i, locale, {
    style: 'currency',
    currency,
    maxSignificantDigits: 2,
  });
}

export {
  // eslint-disable-next-line import/prefer-default-export
  formatBalance,
};
