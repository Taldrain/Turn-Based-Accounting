import { useState } from 'react';
import { Link } from '@remix-run/react';
import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import type { Recurrent } from "@prisma/client";

import AmountDisplay from '~/components/AmountDisplay';
import TableHeadElement from '~/components/TableHeadElement';

import { getAmount } from '~/utils/number';

function typeDisplay(type: string): string {
  switch (type) {
    case 'year': return 'Year';
    case 'month': return 'Month';
    case 'week': return 'Week';
    default: return 'Day';
  }
}

type RecurrentEntry = Recurrent & { computedAmount: number };

type RecurrentListProps = {
  recurrents: RecurrentEntry[],
}

function getEntryValue(elt: RecurrentEntry, key: string): (number | string) {
  switch (key) {
    case 'name': return elt.name;
    case 'type': return typeDisplay(elt.recurrence);
    case 'amount': return getAmount(elt.computedAmount, elt.isPositive);
    default: return '';
  }
}

function descComparator(a: RecurrentEntry, b: RecurrentEntry, orderBy: string): number {
  if (getEntryValue(b, orderBy) < getEntryValue(a, orderBy)) {
    return -1;
  }

  if (getEntryValue(b, orderBy) > getEntryValue(a, orderBy)) {
    return 1;
  }

  return 0;
}

function getSorting(order: string, orderBy: string): (a: RecurrentEntry, b: RecurrentEntry) => number {
  return order === 'desc'
    ? (a, b) => descComparator(a, b, orderBy)
    : (a, b) => -descComparator(a, b, orderBy);
}

function RecurrentList({ recurrents }: RecurrentListProps) {
  const [order, setOrder] = useState('desc');
  const [orderBy, setOrderBy] = useState('amount');

  const handleClick = (newOrderBy: string) => {
    if (newOrderBy === orderBy) {
      setOrder(order === 'desc' ? 'asc' : 'desc');
    } else {
      setOrder('asc');
      setOrderBy(newOrderBy);
    }
  };

  return (
    <div className="pt-8 flex flex-col -mx-4 -my-5 sm:-m-6">
      <div className="inline block min-w-full align-middle">
        <table className="w-full table-fixed divide-y divide-gray-300">
          <thead>
            <tr>
              <TableHeadElement
                handleClick={() => handleClick('name')}
                label="Name"
                isSelected={orderBy === 'name'}
                isAsc={order === 'asc'}
              />
              <TableHeadElement
                handleClick={() => handleClick('type')}
                label="Type"
                isSelected={orderBy === 'type'}
                isAsc={order === 'asc'}
              />
              <TableHeadElement
                handleClick={() => handleClick('amount')}
                label="Amount"
                isSelected={orderBy === 'amount'}
                isAsc={order === 'asc'}
              />
              <th scope="col" className="relative w-16 py-3.5 px-4">
                <span className="sr-only">Edit</span>
              </th>
              <th scope="col" className="relative w-16 py-3.5 px-4">
                <span className="sr-only">Delete</span>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-y-gray-200">
            { recurrents.slice().sort(getSorting(order, orderBy)).map((recurrent) => (
              <tr key={recurrent.id} className="hover:bg-gray-50">
                <td className="whitespace-nowrap py-4 px-3 text-sm text-gray-500 truncate">
                  { recurrent.name }
                </td>
                <td className="whitespace-nowrap py-4 px-3 text-sm text-gray-500 text-left">
                  { typeDisplay(recurrent.recurrence) }
                </td>
                <td className="whitespace-nowrap py-4 px-3 text-sm text-gray-500 text-right">
                  <AmountDisplay amount={recurrent.computedAmount} isPositive={recurrent.isPositive} />
                </td>
                <td className="relative py-4 px-4 text-center">
                  <Link to={`?edit=recurrent&id=${recurrent.id}`}>
                    <PencilIcon className="inline-block w-4 h-4" />
                  </Link>
                </td>
                <td className="relative py-4 px-4 text-center">
                  <form method="post" action={`?delete=recurrent&id=${recurrent.id}`}>
                    <button type="submit">
                      <TrashIcon className="inline-block w-4 h-4" />
                    </button>
                  </form>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default RecurrentList;
