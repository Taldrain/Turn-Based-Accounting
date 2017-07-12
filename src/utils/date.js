function startDate(date, type) {
  let startDay = new Date(date);

  if (type === 'week') {
    const diff = date.getDate() - date.getDay();
    startDay.setDate(diff + 1);
  } else if (type === 'month') {
    startDay = new Date(date.getFullYear(), date.getMonth(), 1);
  } else if (type === 'year') {
    startDay = new Date(date.getFullYear(), 0, 1);
  }

  startDay.setHours(0, 0, 0, 0);

  return startDay;
}

function endDate(date, type) {
  let endDay = new Date(date);

  if (type === 'week') {
    const diff = date.getDate() - date.getDay();
    endDay.setDate(diff + 7);
  } else if (type === 'month') {
    endDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
  } else if (type === 'year') {
    endDay = new Date(date.getFullYear(), 11, 31);
  }

  endDay.setHours(23, 59, 59, 999);


  return endDay;
}


function formatDate(date, type) {
  return {
    startDate: startDate(date, type),
    endDate: endDate(date, type),
  };
}


function previousDate(date, type) {
  let newDate = new Date(date);
  if (type === 'day') {
    newDate.setDate(date.getDate() - 1);
  } else if (type === 'week') {
    newDate = new Date(date.getFullYear(), date.getMonth(), date.getDate() - 7);
  } else if (type === 'month') {
    newDate = new Date(date.getFullYear(), date.getMonth() - 1, 1);
  } else if (type === 'year') {
    newDate = new Date(date.getFullYear() - 1, 0, 1);
  }

  return startDate(newDate, type);
}

function nextDate(date, type) {
  let newDate = new Date(date);
  if (type === 'day') {
    newDate.setDate(date.getDate() + 1);
  } else if (type === 'week') {
    newDate = new Date(date.getFullYear(), date.getMonth(), date.getDate() + 7);
  } else if (type === 'month') {
    newDate = new Date(date.getFullYear(), date.getMonth() + 1, 1);
  } else if (type === 'year') {
    newDate = new Date(date.getFullYear() + 1, 0, 1);
  }

  return startDate(newDate, type);
}

// check if date1 and date2 are on the same day
function isSameDate(date1, date2, type) {
  return startDate(date1, type).getTime() === startDate(date2, type).getTime();
}

function isToday(date) {
  return isSameDate(date, new Date(), 'day');
}

module.exports = {
  startDate,
  endDate,
  formatDate,
  previousDate,
  nextDate,
  isSameDate,
  isToday,
};
