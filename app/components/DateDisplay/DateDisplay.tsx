import type { Settings } from "@prisma/client";
import { useLoaderData } from "@remix-run/react";

import { getUserLocale } from '~/utils/userSettings';

type DateDisplayProps = {
  date: Date,
  type: string,
}

function DateDisplay({ date, type }: DateDisplayProps) {
  const { userSettings } = useLoaderData() as { userSettings: Settings };
  // `day` and `week` date type share the same display
  let options: any = { dateStyle: 'full' };
  if (type === 'year') {
    options = { year: 'numeric' };
  } else if (type === 'month') {
    options = { year: 'numeric', month: 'long' };
  }

  return (
    <div className="text-orange-500 font-medium">
      { date.toLocaleDateString(getUserLocale(userSettings), options) }
    </div>
  );
}

export default DateDisplay;
