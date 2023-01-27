type DateDisplayProps = {
  date: Date,
  type: string,
}

function DateDisplay({ date, type }: DateDisplayProps) {
  let options: any = { dateStyle: 'full' };
  if (type === 'year') {
    options = { year: 'numeric' };
  } else if (type === 'month') {
    options = { year: 'numeric', month: 'long' };
  }

  return (
    <div className="text-orange-500 font-medium">
      { date.toLocaleDateString(undefined, options) }
    </div>
  );
}

export default DateDisplay;
