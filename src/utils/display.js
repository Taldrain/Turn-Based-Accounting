function amount(value, locale) {
  let res = value;
  if (window.Intl && window.Intl.NumberFormat) {
    res = window.Intl.NumberFormat(locale, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  }

  return res;
}

function date(timestamp, locale = undefined, options = undefined) {
  return new Date(timestamp).toLocaleDateString(locale, options);
}

export {
  amount,
  date,
};
