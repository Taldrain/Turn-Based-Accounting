module.exports = {
  amount: ((value, locale) => {
    let res = value;
    if (window.Intl && window.Intl.NumberFormat) {
      res = window.Intl.NumberFormat(locale, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }).format(value);
    }

    return res;
  }),

  date: ((timestamp, locale = undefined, options = undefined) =>
    new Date(timestamp).toLocaleDateString(locale, options)
  ),
};
