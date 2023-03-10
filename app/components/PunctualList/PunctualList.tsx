import { useState } from 'react';
import type { Punctual } from '@prisma/client';

import { Link } from '@remix-run/react';
import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline';

import AmountDisplay from '~/components/AmountDisplay';
import TableHeadElement from '~/components/TableHeadElement';

import { getAmount } from '~/utils/number';

interface PunctualListType {
  punctuals: Punctual[],
}

function getEntryValue(elt: Punctual, key: string): (number | string) {
  switch (key) {
    case 'name': return elt.name;
    case 'amount': return getAmount(elt.amount, elt.isPositive);
    default: return '';
  }
}

function descComparator(a: Punctual, b: Punctual, orderBy: string): number {
  if (getEntryValue(b, orderBy) < getEntryValue(a, orderBy)) {
    return -1;
  }

  if (getEntryValue(b, orderBy) > getEntryValue(a, orderBy)) {
    return 1;
  }

  return 0;
}

function getSorting(order: string, orderBy: string): (a: Punctual, b: Punctual) => number {
  return order === 'desc'
    ? (a, b) => descComparator(a, b, orderBy)
    : (a, b) => -descComparator(a, b, orderBy);
}

function PunctualList({ punctuals }: PunctualListType) {
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
            { punctuals.slice().sort(getSorting(order, orderBy)).map((punctual) => (
              <tr key={punctual.id} className="hover:bg-gray-50">
                <td className="whitespace-nowrap py-4 px-3 text-sm text-gray-500 truncate">
                  { punctual.name }
                </td>
                <td className="whitespace-nowrap py-4 px-3 text-sm text-gray-500 text-right">
                  <AmountDisplay amount={punctual.amount} isPositive={punctual.isPositive} />
                </td>
                <td className="relative py-4 px-4 text-center">
                  <Link to={`?edit=punctual&id=${punctual.id}`}>
                    <PencilIcon className="inline-block w-4 h-4" />
                  </Link>
                </td>
                <td className="relative py-4 px-4 text-center">
                  <form method="post" action={`?delete=punctual&id=${punctual.id}`}>
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

export default PunctualList;
