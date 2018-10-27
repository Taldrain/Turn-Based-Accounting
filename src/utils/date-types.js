const TYPES = [
  'day',
  'week',
  'month',
  'year',
];

function typeDisplay(type) {
  switch (type) {
    case 'day':
      return 'Day';
    case 'week':
      return 'Week';
    case 'month':
      return 'Month';
    default:
      return 'Year';
  }
}

function getGreaterTypes(type) {
  switch (type) {
    case 'day':
      return TYPES;
    case 'week':
      return TYPES.slice(1);
    case 'month':
      return TYPES.slice(2);
    case 'year':
      return TYPES.slice(3);
    default:
      return TYPES;
  }
}

export {
  TYPES,
  typeDisplay,
  getGreaterTypes,
};
