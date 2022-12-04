import { Fragment } from 'react';
import { redirect } from "@remix-run/node";

import LoginBackground from '~/components/LoginBackground';
import LoginForm from '~/components/LoginForm';

import { getUserId } from "~/utils/session.server";

export const loader: LoaderFunction = async ({ request }) => {
  const userId = await getUserId(request);
  if (userId !== null) {
    throw redirect('/dashboard/');
  }

  return {};
}

export default function Login() {
  return (
    <Fragment>
      <div className="flex h-screen">
        <div className="m-auto">
          <div className="px-4 py-6 rounded-md bg-white shadow">
            <LoginForm />
          </div>
        </div>
      </div>
      <LoginBackground />
    </Fragment>
  );
}
