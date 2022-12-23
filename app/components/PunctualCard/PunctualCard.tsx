import type { Punctual } from '@prisma/client';
import { PlusIcon } from '@heroicons/react/24/outline';

import Card from '~/components/Card';
import PunctualList from '~/components/PunctualList';

function PunctualCard({ punctuals }: { punctuals: Punctual[] }) {
  return (
    <Card>
      <div className="flex justify-between items-center pb-4">
        <div className="text-lg font-medium leading-6 text-gray-900">
          Punctual
        </div>
        <button>
          <PlusIcon className="block h-8 w-8"/>
        </button>
      </div>
      <PunctualList punctuals={punctuals} />
    </Card>
  );
}

export default PunctualCard;
