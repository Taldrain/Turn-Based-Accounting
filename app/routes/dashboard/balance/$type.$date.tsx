import type { LoaderFunction } from "@remix-run/node";
import { redirect, json } from '@remix-run/node';
import { useLoaderData, useParams } from "@remix-run/react";
import invariant from "tiny-invariant";

import BalanceCard from '~/components/Balance';
import DateSelectionCard from '~/components/DateSelectionCard';
import RecurrentCard from '~/components/RecurrentCard';
import PunctualCard from '~/components/PunctualCard';

import { requireUserId } from '~/utils/session.server';
import { getPunctuals } from '~/utils/queries.server';
import {
  endOf,
  isInvalidDateParam,
  parseDateParam,
  startOf,
} from '~/utils/date';

export const loader: LoaderFunction = async ({ request, params }) => {
  const userId = await requireUserId(request);
  invariant(params.type, 'Expected params.type');
  invariant(params.date, 'Expected params.date');

  if (params.type !== 'day' && params.type !== 'month' && params.type !== 'year') {
    return redirect('/dashboard/balance/day/today');
  }

  if (isInvalidDateParam(params.date)) {
    return redirect('/dashboard/balance/day/today');
  }

  const date = new Date(parseDateParam(params.date));
  const punctuals = await getPunctuals(userId, startOf(date, params.type), endOf(date, params.type));


  return json({ punctuals });
}

export default function Balance() {
  const data = useLoaderData<typeof loader>();
  const params = useParams();
  invariant(params.date, 'Expected params.date');
  invariant(params.type, 'Expected params.type');

  const date = parseDateParam(params.date);

  return (
    <div className="flex flex-col gap-4 md:flex-row md:flex-wrap">
      <div className="grow md:basis-[calc(50%-0.5rem)] md:order-2">
        <DateSelectionCard date={date} type={params.type} />
      </div>
      <div className="grow md:basis-[calc(50%-0.5rem)] md:order-1">
        <BalanceCard />
      </div>
      <div className="grow md:basis-[calc(50%-0.5rem)] md:order-4">
        <PunctualCard punctuals={data.punctuals} />
      </div>
      <div className="grow md:basis-[calc(50%-0.5rem)] md:order-3">
        <RecurrentCard />
      </div>
    </div>
  );
}
