import { Fragment } from 'react';
import { Link } from "@remix-run/react";
import { Menu, Transition } from '@headlessui/react'

type DateTypeProps = {
  // date: string,
  type: string,
}

function DateTypeSelect({ type }: DateTypeProps) {

  return (
    <Menu as="div" className="relative ml-3">
      <div>
        <Menu.Button className="inline-flex w-full justify-center px-4 py-2 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
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
        <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="px-1 py-1 ">
            <Menu.Item>
              {({ close }) => (
                <Link
                  to="/dashboard/balance/day/today"
                  className="group flex w-full items-center rounded-md px-2 py-2"
                  onClick={close}
                >
                  Day
                </Link>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ close }) => (
                <Link
                  to="/dashboard/balance/month/today"
                  className="group flex w-full items-center rounded-md px-2 py-2"
                  onClick={close}
                >
                  Month
                </Link>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ close }) => (
                <Link
                  to="/dashboard/balance/year/today"
                  className="group flex w-full items-center rounded-md px-2 py-2"
                  onClick={close}
                >
                  Year
                </Link>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}

export default DateTypeSelect;
