const TYPES = [
  { key: 'day', label: 'Day' },
  { key: 'week', label: 'Week' },
  { key: 'month', label: 'Month' },
  { key: 'year', label: 'Year' },
];

function typeDisplay(type) {
  const typeFound = TYPES.find(i => type === i.key);
  if (typeFound === undefined) {
    return TYPES[TYPES.length - 1].label;
  }

  return typeFound.label;
}

function getGreaterTypes(type) {
  const types = TYPES.map(i => i.key);
  switch (type) {
    case 'day':
      return types;
    case 'week':
      return types.slice(1);
    case 'month':
      return types.slice(2);
    case 'year':
      return types.slice(3);
    default:
      return types;
  }
}

export {
  TYPES,
  typeDisplay,
  getGreaterTypes,
};
