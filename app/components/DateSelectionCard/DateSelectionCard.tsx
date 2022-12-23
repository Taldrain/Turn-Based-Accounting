import { Link } from "@remix-run/react";
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline'

import Card from '~/components/Card';
import DateTypeSelect from '~/components/DateTypeSelect';
import DateDisplay from '~/components/DateDisplay';

import { previousDate, nextDate } from '~/utils/date';

type DateSelectionCardProps = {
  date: string,
  type: string,
}

function DateSelectionCard({ date, type }: DateSelectionCardProps) {
  return (
    <Card>
      <div className="text-lg font-medium leading-6 text-gray-900 pb-4">
        Date selection
      </div>
      <div className="flex justify-between items-center">
        <DateTypeSelect type={type} />

        <div className="grow flex items-center justify-center">
          <Link to={`/dashboard/balance/day/${previousDate(date)}`}>
            <ChevronLeftIcon className="block h-8 w-8"/>
          </Link>
          <div className="shrink px-4">
            <DateDisplay date={new Date(date)} type={type} />
          </div>
          <Link to={`/dashboard/balance/day/${nextDate(date)}`}>
            <ChevronRightIcon className="block h-8 w-8"/>
          </Link>
        </div>

        <div className="text-gray-900">
          <Link to="/dashboard/balance/day/today">
            Today
          </Link>
        </div>
      </div>
    </Card>
  );
}

export default DateSelectionCard;
