function validateEntryName(name: unknown) {
  if (typeof name !== 'string' || name.length === 0) {
    return "Name should be filled";
  }
}

function validateEntryAmount(amount: unknown) {
  if (typeof amount !== 'number' || isNaN(amount) || amount <= 0) {
    return "Amount should be greater than 0";
  }
}

function validateEntryDate(date: Date) {
  if (date.toString() === 'Invalid Date' || date.getFullYear() < 1970) {
    return "Date should be a valid date (>1970)";
  }

}

export {
  validateEntryName,
  validateEntryAmount,
  validateEntryDate,
};
