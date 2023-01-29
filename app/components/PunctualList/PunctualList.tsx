import type { Punctual } from '@prisma/client';

import { Link } from '@remix-run/react';
import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline';

import AmountDisplay from '~/components/AmountDisplay';

interface PunctualListType {
  punctuals: Punctual[],
}

function PunctualList({ punctuals }: PunctualListType) {
  return (
    <div className="pt-8 flex flex-col -mx-4 -my-5 sm:-m-6">
      <div className="inline block min-w-full align-middle">
        <table className="w-full table-fixed divide-y divide-gray-300">
          <thead>
            <tr>
              <th scope="col" className="py-3.5 px-3 text-left text-sm font-semibold text-gray-900">
                Name
              </th>
              <th scope="col" className="py-3.5 px-3 text-right text-sm font-semibold text-gray-900">
                Amount
              </th>
              <th scope="col" className="relative w-16 py-3.5 px-4">
                <span className="sr-only">Edit</span>
              </th>
              <th scope="col" className="relative w-16 py-3.5 px-4">
                <span className="sr-only">Delete</span>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-y-gray-200">
            { punctuals.map((punctual) => (
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
