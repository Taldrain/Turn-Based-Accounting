import { Fragment } from 'react';
import type { LoaderFunction } from "@remix-run/node";
import { Outlet } from "@remix-run/react";

import AppBar from '~/components/AppBar';

import { requireUserId } from "~/utils/session.server";

export const loader: LoaderFunction = async ({ request }) => {
  return requireUserId(request);
}

export default function Dashboard() {
  return (
    <Fragment>
      <AppBar />
      <main className="mx-auto max-w-7xl px-1 sm:px-6 lg:px-8 mt-8">
        <Outlet />
      </main>
    </Fragment>
  );
}
