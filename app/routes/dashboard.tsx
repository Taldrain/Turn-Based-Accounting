import { Fragment } from 'react';
import type { LoaderArgs } from "@remix-run/node";
import { Outlet, useLoaderData } from "@remix-run/react";

import AppBar from '~/components/AppBar';

import { requireUserId } from '~/utils/session.server';
import { getSettings } from '~/utils/queries.server';
import { getUserLocale } from '~/utils/userSettings';
import { localizeDateFns } from '~/utils/l10n';

export const loader = async ({ request }: LoaderArgs) => {
  const userId = await requireUserId(request);
  const settings = await getSettings(userId);

  return ({
    locale: getUserLocale(settings),
  });
}

export default function Dashboard() {
  const { locale } = useLoaderData<typeof loader>();

  localizeDateFns(locale);

  return (
    <Fragment>
      <AppBar />
      <main className="mx-auto max-w-7xl px-1 mb-10 sm:px-6 lg:px-8 mt-8">
        <Outlet />
      </main>
    </Fragment>
  );
}
