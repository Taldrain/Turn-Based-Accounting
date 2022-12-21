import { PlusIcon } from '@heroicons/react/24/outline';

import PunctualList from '~/components/PunctualList';

function PunctualCard({ punctuals }) {
  return (
    <div className="sm:rounded bg-white shadow px-4 py-5 sm:p-6">
      <div className="flex justify-between">
        <div className="text-lg font-medium leading-6 text-gray-900 pb-4">
          Punctual
        </div>
        <div>
          <button>
            <PlusIcon className="block h-8 w-8"/>
          </button>
        </div>
      </div>
      <div>
        <PunctualList punctuals={punctuals} />
      </div>
    </div>
  );
}

export default PunctualCard;
