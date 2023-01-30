import type { LoaderArgs } from '@remix-run/node';
import { json, redirect } from '@remix-run/node';
import { Link, useLoaderData } from '@remix-run/react';

import { verifyLoginToken, TokenExpiredError } from '~/utils/jwt.server';
import { getUser, createUser } from '~/utils/queries.server';
import { createUserSession } from '~/utils/session.server';

export async function loader({ request }: LoaderArgs) {
  const url = new URL(request.url);
  const token = url.searchParams.get('token');

  if (token === null) {
    throw redirect('/login');
  }

  let tokenData;
  try {
    tokenData = verifyLoginToken(token);
  } catch (err) {
    if (err instanceof TokenExpiredError) {
      return json({
        tokenExpired: true,
        verifyError: false,
      });
    } else {
      return json({
        tokenExpired: false,
        verifyError: true,
      });
    }
  }

  const { email, redirectTo } = tokenData;
  let user = await getUser(email);
  if (user === null) {
    user = await createUser(email);
  }

  return createUserSession(user.id, redirectTo)
}

export default function Magic() {
  const loaderData = useLoaderData<typeof loader>();

  if (loaderData.verifyError || loaderData.tokenExpired) {
    return (
      <div>
        <p>
          { `${loaderData.verifyError ? 'Error with the token.' : 'The token has expired.'} Please try to log in again.` }
        </p>
        <Link to="/login" className="font-medium text-blue-600 hover:text-blue-800 hover:underline">
          Login
        </Link>
      </div>
    );
  }

  return (
    <div>
      Processing...
    </div>
  );
}
