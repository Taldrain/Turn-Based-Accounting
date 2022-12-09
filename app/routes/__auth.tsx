import { Outlet } from '@remix-run/react';

export default function Auth() {
  return (
    <div className="flex h-screen">
      <div className="m-auto w-[28rem]">
        <div className="px-4 py-6 rounded-md bg-white shadow">
          <p>
            TBA
          </p>
          <Outlet />
        </div>
      </div>
    </div>
  );
}
