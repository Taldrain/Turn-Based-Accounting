import type { Recurrent } from '@prisma/client';
import { Link } from '@remix-run/react';
import { PlusIcon } from '@heroicons/react/24/outline';

import Card from '~/components/Card';
import RecurrentList from '~/components/RecurrentList';

function RecurrentCard({ recurrents }: { recurrents: Recurrent[] }) {
  return (
    <Card>
      <div className="flex justify-between items-center pb-4">
        <div className="text-lg font-medium leading-6 text-gray-900">
          Recurrent
        </div>
        <Link to="?new=recurrent" className="rounded-full p-1 hover:bg-orange-100">
          <PlusIcon className="block h-8 w-8" />
        </Link>
      </div>
      <RecurrentList recurrents={recurrents} />
    </Card>
  );
}

export default RecurrentCard;
