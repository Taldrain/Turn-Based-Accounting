import type { ActionFunctionArgs } from '@remix-run/node';
import { redirect } from '@remix-run/node';

import { deleteSession } from '~/utils/session.server';

export async function action({ request }: ActionFunctionArgs) {
  return deleteSession(request);
}

export function loader() {
  return redirect('/login');
}
