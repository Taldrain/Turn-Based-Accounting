import type { Punctual } from '@prisma/client';

import AmountDisplay from '~/components/AmountDisplay';

function PunctualList({ punctuals }: { punctuals: Punctual[] }) {
  const headers = [
    'Name',
    'Amount',
  ];

  return (
    <div className="pt-8 flex flex-col -mx-4 -my-5 sm:-m-6">
      <div className="inline block min-w-full align-middle">
        <table className="min-w-full divide-y divide-gray-300">
          <thead>
            <tr>
              { headers.map(i => (
                <th key={i} scope="col" className="py-3.5 px-3 text-left text-sm font-semibold text-gray-900">
                  { i }
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-y-gray-200">
            { punctuals.map((punctual) => (
              <tr key={punctual.id}>
                <td className="whitespace-nowrap py-4 px-3 text-sm text-gray-500">
                  { punctual.name }
                </td>
                <td className="whitespace-nowrap py-4 px-3 text-sm text-gray-500">
                  <AmountDisplay amount={punctual.amount} isPositive={punctual.isPositive} />
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
