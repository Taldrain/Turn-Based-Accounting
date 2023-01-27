import { Link } from '@remix-run/react';
import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import type { Recurrent } from "@prisma/client";

import AmountDisplay from '~/components/AmountDisplay';

function typeDisplay(type: string): string {
  switch (type) {
    case 'year': return 'Yearly';
    case 'month': return 'Montly';
    case 'week': return 'Weekly';
    default: return 'Daily';
  }
}

function RecurrentList({ recurrents }: { recurrents: Recurrent[] }) {
  return (
    <div className="pt-8 flex flex-col -mx-4 -my-5 sm:-m-6">
      <div className="inline block min-w-full align-middle">
        <table className="w-full table-fixed divide-y divide-gray-300">
          <thead>
            <tr>
              <th scope="col" className="py-3.5 px-3 text-left text-sm font-semibold text-gray-900">
                Name
              </th>
              <th scope="col" className="py-3.5 px-3 text-left text-sm font-semibold text-gray-900">
                Type
              </th>
              <th scope="col" className="py-3.5 px-3 text-left text-sm font-semibold text-gray-900">
                Amount
              </th>
              <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                <span className="sr-only">Edit</span>
              </th>
              <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                <span className="sr-only">Delete</span>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-y-gray-200">
            { recurrents.map((recurrent) => (
              <tr key={recurrent.id}>
                <td className="whitespace-nowrap py-4 px-3 text-sm text-gray-500 truncate">
                  { recurrent.name }
                </td>
                <td className="whitespace-nowrap py-4 px-3 text-sm text-gray-500 text-right">
                  { typeDisplay(recurrent.recurrence) }
                </td>
                <td className="whitespace-nowrap py-4 px-3 text-sm text-gray-500 text-right">
                  <AmountDisplay amount={recurrent.amount} isPositive={recurrent.isPositive} />
                </td>
                <td className="relative py-4 pl-3 pr-4 text-right sm:pr-6">
                  <Link to={`?edit=punctual&id=${recurrent.id}`}>
                    <PencilIcon className="inline-block w-4 h-4" />
                  </Link>
                </td>
                <td className="relative py-4 pl-3 pr-4 text-right sm:pr-6">
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
