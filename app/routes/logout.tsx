import type { ActionArgs } from '@remix-run/node';
import { redirect } from '@remix-run/node';

import { deleteSession } from '~/utils/session.server';

export async function action({ request }: ActionArgs) {
  return deleteSession(request);
}

export function loader() {
  return redirect('/login');
}
