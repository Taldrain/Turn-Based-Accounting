import { Outlet } from '@remix-run/react';

export default function Auth() {
  return (
    <div className="flex h-screen">
      <div className="m-auto w-[28rem]">
        <div className="px-4 py-6 rounded-md bg-white shadow">
          <h1 className="text-lg font-medium leading-6 text-gray-900">
            Login
          </h1>
          <Outlet />
        </div>
      </div>
    </div>
  );
}
