import { Fragment } from 'react';
import { Link, Outlet } from "@remix-run/react";

export default function Dashboard() {
  return (
    <Fragment>
      <header className="flex justify-between">
        <div>
          <Link to="balance">TBA</Link>
        </div>
        <div>
          button
        </div>
      </header>
      <main className="">
        <Outlet />
      </main>
    </Fragment>
  );
}
