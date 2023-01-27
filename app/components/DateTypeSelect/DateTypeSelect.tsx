import { Fragment } from 'react';
import { Link } from "@remix-run/react";
import { Menu, Transition } from '@headlessui/react'

type DateTypeProps = {
  // date: string,
  type: string,
}

const OPTIONS = [
  { label: 'Day', to: '/dashboard/balance/day/today' },
  { label: 'Month', to: '/dashboard/balance/month/today' },
  { label: 'Year', to: '/dashboard/balance/year/today' },
];

function DateTypeSelect({ type }: DateTypeProps) {
  return (
    <Menu as="div" className="relative ml-3">
      <div>
        <Menu.Button className="inline-flex items-center rounded border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 uppercase">
          {type}
        </Menu.Button>
      </div>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-200"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 mt-2 w-24 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div>
            { OPTIONS.map(({ to, label }) => (
              <Menu.Item key={to}>
                {({ close }) => (
                  <Link
                    to={to}
                    className="group flex w-full items-center px-2 py-2 hover:bg-gray-100"
                    onClick={close}
                  >
                    { label }
                  </Link>

                )}
              </Menu.Item>
            ))}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}

export default DateTypeSelect;
