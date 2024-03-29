import { Fragment } from 'react';
import { Link } from "@remix-run/react";
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Bars3Icon, XMarkIcon, UserCircleIcon } from '@heroicons/react/24/outline'

function Settings({ onClick }: { onClick?: () => void }) {
  return (
    <Link
      to="/dashboard/settings"
      onClick={onClick}
      className="flex w-full"
    >
      Settings
    </Link>
  );
}

function Logout() {
  return (
    <form action="/logout" method="post">
      <button type="submit" className="w-full text-left">
        Logout
      </button>
    </form>
  );
}

function AppBar() {
  return (
    <Disclosure as="nav" className="bg-white shadow">
      {({ open }) => (
        <Fragment>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 justify-between">

              { /* title */ }
              <div className="flex">
                <div className="flex flex-shrink-0 items-center">
                  <Link to="/dashboard/">TBA</Link>
                </div>
              </div>

              { /* dropdown menu */ }
              <div className="hidden sm:ml-6 sm:flex sm:items-center">
                <Menu as="div" className="relative ml-3">
                  <div>
                    <Menu.Button className="flex rounded-full bg-white text-sm">
                      <span className="sr-only">Open user menu</span>
                      <UserCircleIcon className="block h-8 w-8"/>
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
                    <Menu.Items className="absolute right-0 z-10 mt-2 w-36 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <Menu.Item>
                        {({ close }) => (
                          <div className="px-4 py-2 hover:bg-gray-100">
                            <Settings onClick={close} />
                          </div>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        <div className="px-4 py-2 hover:bg-gray-100">
                          <Logout />
                        </div>
                      </Menu.Item>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>

              { /* mobile icon */ }
              <div className="-mr-2 flex items-center sm:hidden">
                <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500">
                  <span className="sr-only">Open main menu</span>
                  { open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
            </div>
          </div>

          { /* mobile dropdown menu */ }
          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 pt-2 pb-3">
              <div className="px-4 py-2">
                <Settings />
              </div>
            </div>
            <div className="space-y-1 pt-2 pb-3">
              <div className="px-4 py-2">
                <Logout />
              </div>
            </div>
          </Disclosure.Panel>
        </Fragment>
      )}
    </Disclosure>
  );
}

export default AppBar;
