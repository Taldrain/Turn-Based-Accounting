import { Fragment } from 'react';
import type { LoaderArgs, ActionArgs } from "@remix-run/node";
import type { Punctual, Recurrent } from '@prisma/client';
import { redirect } from '@remix-run/node';
import { useLoaderData, useParams, useSearchParams } from "@remix-run/react";
import { typedjson } from 'remix-typedjson';
import invariant from "tiny-invariant";

import BalanceCard from '~/components/BalanceCard';
import DateSelectionCard from '~/components/DateSelectionCard';
import RecurrentCard from '~/components/RecurrentCard';
import PunctualCard from '~/components/PunctualCard';
import AddPunctual from '~/components/AddPunctual';
import EditPunctual from '~/components/EditPunctual';
import AddRecurrent from '~/components/AddRecurrent';
import EditRecurrent from '~/components/EditRecurrent';

import { requireUserId } from '~/utils/session.server';
import { badRequest } from '~/utils/request.server';
import {
  getPunctuals,
  createPunctual,
  updatePunctual,
  deletePunctual,
  getRecurrents,
  createRecurrent,
  updateRecurrent,
  deleteRecurrent,
  getSettings,
} from '~/utils/queries.server';
import {
  endOf,
  isInvalidDateParam,
  parseDateParam,
  startOf,
} from '~/utils/date';
import {
  validateEntryName,
  validateEntryAmount,
  validateEntryDate,
  validateEntryEndDate,
  validateEntryRecurrence,
  computeNewAmount,
} from '~/utils/entry';

export const action = async ({ request }: ActionArgs) => {
  const formData = Object.fromEntries(await request.formData());
  const userId = await requireUserId(request);
  const url = new URL(request.url);
  const newEntry = url.searchParams.get('new');
  const editEntry = url.searchParams.get('edit');
  const deleteEntry = url.searchParams.get('delete');
  const id = url.searchParams.get('id');

  // delete a punctual entry
  if (deleteEntry === 'punctual' && id !== null) {
    await deletePunctual(id);
    return redirect('');
  }

  // delete a recurrent entry
  if (deleteEntry === 'recurrent' && id !== null) {
    await deleteRecurrent(id);
    return redirect('');
  }

  // share fields between a punctual and recurrent entry
  const name = String(formData.name).trim();
  const amount = Number(formData.amount);
  const isPositive = formData.isPositive === 'gain';

  // create or update a punctual entry
  if (newEntry === 'punctual' || editEntry === 'punctual') {
    const date = new Date(formData.date.toString());
    const fields = { name, amount, isPositive, date };
    const fieldErrors = {
      name: validateEntryName(name),
      amount: validateEntryAmount(amount),
      date: validateEntryDate(date),
    };

    if (Object.values(fieldErrors).some(Boolean)) {
      return badRequest({
        fieldErrors,
        fields,
      });
    }

    if (newEntry !== null) {
      await createPunctual(userId, name, amount, isPositive, date);
    } else {
      if (id === null) {
        return badRequest({
          fieldErrors: null,
          fields: null,
        });
      }
      await updatePunctual(userId, id, name, amount, isPositive, date);
    }

    return redirect('');
  }

  // create or update a punctual entry
  if (newEntry === 'recurrent' || editEntry === 'recurrent') {
    const recurrence = String(formData.recurrence);
    const startDate = new Date(formData.startDate.toString());
    let endDate: Date | null = new Date(formData.endDate.toString());
    if (endDate.toString() === 'Invalid Date') {
      endDate = null;
    }

    const fields = { name, amount, isPositive, recurrence, startDate, endDate };
    const fieldErrors = {
      name: validateEntryName(name),
      amount: validateEntryAmount(amount),
      recurrence: validateEntryRecurrence(recurrence),
      startDate: validateEntryDate(startDate),
      endDate: validateEntryEndDate(startDate, endDate),
    };

    if (Object.values(fieldErrors).some(Boolean)) {
      return badRequest({
        fieldErrors,
        fields,
      });
    }

    if (newEntry !== null) {
      await createRecurrent(userId, name, amount, isPositive, recurrence, startDate, endDate);
    } else {
      if (id === null) {
        return badRequest({
          fieldErrors: null,
          fields: null,
        });
      }
      await updateRecurrent(userId, id, name, amount, isPositive, recurrence, startDate, endDate);
    }

    return redirect('');
  }

  return null;
};

export const loader = async ({ request, params }: LoaderArgs) => {
  const userId = await requireUserId(request);
  invariant(params.type, 'Expected params.type');
  invariant(params.date, 'Expected params.date');

  if (params.type !== 'day' && params.type !== 'week' && params.type !== 'month' && params.type !== 'year') {
    return redirect('/dashboard/balance/day/today');
  }

  if (isInvalidDateParam(params.date)) {
    return redirect('/dashboard/balance/day/today');
  }

  const date = new Date(parseDateParam(params.date));
  const punctuals = await getPunctuals(userId, startOf(date, params.type), endOf(date, params.type));
  const recurrents = await getRecurrents(userId, startOf(date, params.type), endOf(date, params.type))
  const userSettings = await getSettings(userId);


  return typedjson({
    punctuals,
    recurrents: recurrents.map(entry => computeNewAmount(entry, date, params.type)),
    userSettings,
  });
};

export default function Balance() {
  const { punctuals, recurrents } = useLoaderData<typeof loader>();
  const [searchParams, setSearchParams] = useSearchParams();
  const params = useParams();
  invariant(params.date, 'Expected params.date');
  invariant(params.type, 'Expected params.type');

  const date = parseDateParam(params.date);

  const handleCloseDialog = () => {
    // delete all URLSearchParams that are linked to the dialog forms
    searchParams.delete('new');
    searchParams.delete('edit');
    searchParams.delete('id');
    setSearchParams(searchParams);
  };

  return (
    <Fragment>
      <div className="flex flex-col gap-4 md:flex-row md:flex-wrap">
        <div className="grow md:basis-[calc(50%-0.5rem)] md:order-2">
          <DateSelectionCard date={date} type={params.type} />
        </div>
        <div className="grow md:basis-[calc(50%-0.5rem)] md:order-1">
          <BalanceCard punctuals={punctuals} recurrents={recurrents} />
        </div>
        <div className="grow md:basis-[calc(50%-0.5rem)] md:order-4">
          <PunctualCard punctuals={punctuals} />
        </div>
        <div className="grow md:basis-[calc(50%-0.5rem)] md:order-3">
          <RecurrentCard recurrents={recurrents} />
        </div>
      </div>
      { (searchParams.get('new') === 'punctual') && <AddPunctual onCloseDialog={handleCloseDialog} />}
      { (searchParams.get('edit') === 'punctual') && (
        <EditPunctual
          onCloseDialog={handleCloseDialog}
          punctual={punctuals.find((i: Punctual) => i.id === searchParams.get('id'))}
        />
      )}
      { (searchParams.get('new') === 'recurrent') && <AddRecurrent onCloseDialog={handleCloseDialog} />}
      { (searchParams.get('edit') === 'recurrent') && (
        <EditRecurrent
          onCloseDialog={handleCloseDialog}
          recurrent={recurrents.find((i: Recurrent) => i.id === searchParams.get('id'))}
        />
      )}
    </Fragment>
  );
}
