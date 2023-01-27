import { Link } from "@remix-run/react";
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline'

import Card from '~/components/Card';
import DateTypeSelect from '~/components/DateTypeSelect';
import DateDisplay from '~/components/DateDisplay';

import { previousDate, nextDate, formatDate } from '~/utils/date';

type DateSelectionCardProps = {
  date: string,
  type: string,
}

function DateSelectionCard({ date, type }: DateSelectionCardProps) {
  const isToday = (formatDate(new Date()) === date);

  return (
    <Card>
      <div className="text-lg font-medium leading-6 text-gray-900 pb-4">
        Date selection
      </div>
      <div className="flex justify-between items-center">
        <DateTypeSelect type={type} />

        <div className="grow flex items-center justify-center">
          <Link to={`/dashboard/balance/${type}/${previousDate(date, type)}`} className="rounded-full p-1 hover:bg-orange-100">
            <ChevronLeftIcon className="block h-8 w-8"/>
          </Link>
          <div className="shrink px-4">
            <DateDisplay date={new Date(date)} type={type} />
          </div>
          <Link to={`/dashboard/balance/${type}/${nextDate(date, type)}`} className="rounded-full p-1 hover:bg-orange-100">
            <ChevronRightIcon className="block h-8 w-8"/>
          </Link>
        </div>

        <Link
          to="/dashboard/balance/day/today"
          className={`inline-flex items-center rounded border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 uppercase ${isToday && 'opacity-50'}`}
        >
          Today
        </Link>
      </div>
    </Card>
  );
}

export default DateSelectionCard;
