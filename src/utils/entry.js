const DateUtils = require('./date.js');

function dummyEntry(date, amount) {
  return ({
    amount,
    date: date.getTime(),
  });
}

// find the first entries on the selected date
function findEntriesOnDate(entries, date) {
  return entries.find(i =>
    DateUtils.isSameDate(new Date(i.date), date, 'day')
  );
}

// for each entry in the punctual list add a previous and next day
function cleanForGraph(punctual, recurrentAmount) {
  let tmpPunctualList = [];
  const newPunctualList = [];

  // merge punctual entries when they're on the same day
  punctual.forEach((i) => {
    if (findEntriesOnDate(tmpPunctualList, new Date(i.date)) === undefined) {
      tmpPunctualList.push(
        Object.assign({}, i, { date: DateUtils.startDate(new Date(i.date), 'day') })
      );
    } else {
      tmpPunctualList = tmpPunctualList.map((e) => {
        if (DateUtils.isSameDate(new Date(i.date), new Date(e.date))) {
          return Object.assign({}, e, { amount: e.amount + i.amount });
        }
        return e;
      });
    }
  });

  tmpPunctualList.forEach((i) => {
    // current
    newPunctualList.push(i);

    // previous
    const previousDate = DateUtils.previousDate(new Date(i.date), 'day');
    if (findEntriesOnDate(tmpPunctualList.concat(newPunctualList), previousDate) === undefined) {
      newPunctualList.push(dummyEntry(previousDate, recurrentAmount));
    }

    // next
    const nextDate = DateUtils.nextDate(new Date(i.date), 'day');
    if (findEntriesOnDate(tmpPunctualList.concat(newPunctualList), nextDate) === undefined) {
      newPunctualList.push(dummyEntry(nextDate, recurrentAmount));
    }
  });

  return newPunctualList;
}

function sortByDate(entries) {
  return entries.sort((a, b) => (a.date - b.date));
}

function computeSumbyDay(entries, recurrentAmount) {
  return entries.map((entry) => {
    if (entry.amount === recurrentAmount) {
      return entry;
    }

    return Object.assign({}, entry, { amount: entry.amount + recurrentAmount });
  });
}

module.exports = {
  dummyEntry,
  cleanForGraph,
  sortByDate,
  computeSumbyDay,
};
