function convertFromTo(amount, from, to) {
  if (from === to) {
    return amount;
  }

  switch (from) {
    case 'day': {
      if (to === 'year') {
        return amount / 0.00273973;
      } else if (to === 'month') {
        return amount / 0.0328767;
      }

      // week
      return amount / 0.142857;
    }
    case 'week': {
      if (to === 'year') {
        return amount / 0.0191781;
      } else if (to === 'month') {
        return amount / 0.230137;
      }
      // day
      return amount / 7;
    }
    case 'month': {
      if (to === 'year') {
        return amount / 0.0833334;
      } else if (to === 'week') {
        return amount / 4.34524;
      }
      // day
      return amount / 30.4167;
    }
    case 'year': {
      if (to === 'month') {
        return amount / 12;
      } else if (to === 'week') {
        return amount / 52.1429;
      }
      // day
      return amount / 365;
    }
    default:
      return amount;
  }
}

module.exports = {
  convertFromTo,

  computeWithEntries: ((entries, type) => {
    const a = Object.values(entries).reduce(
      (acc, entry) => acc + (convertFromTo(entry.amount, entry.type, type)),
      0
    );

    return a;
  }),

  convertForm: ((entry) => {
    if (entry === undefined) {
      return entry;
    }

    const res = Object.assign({}, entry);
    if (res.amount < 0) {
      res.amount = -res.amount;
      res.balance = 'negatif';
    } else {
      res.balance = 'positif';
    }

    res.amount = `${res.amount}`;

    return res;
  }),
};
