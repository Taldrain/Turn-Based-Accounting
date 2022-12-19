import { Fragment } from 'react';

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
    <Fragment>
      { date.toLocaleDateString(undefined, options) }
    </Fragment>
  );
}

export default DateDisplay;
