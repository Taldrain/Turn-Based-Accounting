const DateUtils = require('./date.js');

function dummyEntry(date, amount) {
  return ({
    amount,
    date,
  });
}

function findCloserEntry(entries, timestamp) {
  let previousDate = Number.MIN_VALUE;
  let res = 0;
  Object.keys(entries).forEach((i) => {
    if (i < timestamp && previousDate < i) {
      previousDate = i;
      res = entries[i];
    }
  });

  return res;
}


// // find the first entries on the selected date
function findEntriesOnDate(entries, date) {
  return entries.find(i =>
    DateUtils.isSameDate(new Date(i.date), date, 'day')
  );
}

// for each entry in the punctual list add a previous and next day
function listPunctualData(punctual) {
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
    newPunctualList.push(dummyEntry(i.date, i.amount));

    // previous
    const previousDate = DateUtils.previousDate(new Date(i.date), 'day');
    if (findEntriesOnDate(tmpPunctualList.concat(newPunctualList), previousDate) === undefined) {
      newPunctualList.push(dummyEntry(previousDate, 0));
    }

    // next
    const nextDate = DateUtils.nextDate(new Date(i.date), 'day');
    if (findEntriesOnDate(tmpPunctualList.concat(newPunctualList), nextDate) === undefined) {
      newPunctualList.push(dummyEntry(nextDate, 0));
    }
  });

  return newPunctualList;
}

function listRecurrentData(recurrent, punctual) {
  const tmpRecurrentList = {};
  const newRecurrentList = [];

  let baseRecurrentAmount = 0;

  // compute the amount from recurrent entries that don't have a start and
  // end date
  recurrent.forEach((i) => {
    if (!('startDate' in i) && !('endDate' in i)) {
      baseRecurrentAmount += i.amount;
    }
  });

  // add the born of the list
  if (baseRecurrentAmount !== 0) {
    tmpRecurrentList[punctual[0].date] = baseRecurrentAmount;
    tmpRecurrentList[punctual[punctual.length - 1].date] = baseRecurrentAmount;
  }

  // for each entry add two new entries to 'tmpRecurrentList' at startDate and
  // at endDate + 1
  recurrent.forEach((i) => {
    // compute new entry
    const entry = {
      startDate: undefined,
      endDate: undefined,
      amount: i.amount,
    };

    if ('startDate' in i) {
      entry.startDate = i.startDate;
    }

    if ('endDate' in i) {
      entry.endDate = DateUtils.nextDate(new Date(i.endDate), 'day').getTime();
    }

    if (entry.startDate === undefined && entry.endDate === undefined) {
      return;
    }

    // iterate on 'tmpRecurrentList' and update entry if necessary
    // (inside the new 'entry')
    Object.keys(tmpRecurrentList).forEach((j) => {
      if (entry.startDate === undefined || entry.endDate === undefined) {
        if (j > entry.startDate || j < entry.endDate) {
          tmpRecurrentList[j] += entry.amount;
        }
      } else if (j > entry.startDate && j < entry.endDate) {
        tmpRecurrentList[j] += entry.amount;
      }
    });

    // update 'tmpRecurrentList' if the born (start or end) already exists
    // or add a new element by retrieving the amount at the current day
    if (tmpRecurrentList[entry.startDate]) {
      tmpRecurrentList[entry.startDate] += entry.amount;
    } else {
      const previousAmount = findCloserEntry(tmpRecurrentList, entry.startDate);
      tmpRecurrentList[entry.startDate] = previousAmount + entry.amount;
    }

    if (tmpRecurrentList[entry.endDate]) {
      tmpRecurrentList[entry.endDate] -= entry.amount;
    } else {
      const previousAmount = findCloserEntry(tmpRecurrentList, entry.startDate);
      tmpRecurrentList[entry.endDate] = previousAmount;
    }
  });

  // transform 'tmpRecurrentList' (object) into 'newRecurrentList' (array)
  Object.keys(tmpRecurrentList).forEach(i =>
    newRecurrentList.push(dummyEntry(parseInt(i, 10), tmpRecurrentList[i]))
  );

  return newRecurrentList;
}

function sortByDate(entries) {
  return entries.sort((a, b) => (a.date - b.date));
}

// function computeSumbyDay(entries, recurrentAmount) {
//   return entries.map((entry) => {
//     if (entry.amount === recurrentAmount) {
//       return entry;
//     }

//     return Object.assign({}, entry, { amount: entry.amount + recurrentAmount });
//   });
// }

module.exports = {
  // dummyEntry,
  listPunctualData,
  listRecurrentData,
  sortByDate,
  // computeSumbyDay,
};
