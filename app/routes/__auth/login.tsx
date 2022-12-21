import type { LoaderArgs, ActionArgs } from '@remix-run/node';
import { json, redirect } from "@remix-run/node";
import { Form, useActionData, useSearchParams } from "@remix-run/react";

import EmailField from '~/components/EmailField'

import { getUserId } from "~/utils/session.server";
import { badRequest } from '~/utils/request.server';
import { signLoginToken } from '~/utils/jwt.server';

const EMAIL_REGEXP = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

function validateEmail(email: unknown) {
  if (typeof email !== 'string' || email.match(EMAIL_REGEXP) === null) {
    return 'Email should be valid';
  }
}

export async function loader({ request }: LoaderArgs) {
  const userId = await getUserId(request);
  if (userId !== null) {
    throw redirect('/dashboard/');
  }

  return {};
}

export async function action({ request }: ActionArgs) {
  const form = await request.formData();
  const email = form.get('email');
  const redirectTo = `${form.get('redirectTo')}` || '/dashboard/';

  if (typeof email !== 'string') {
    return badRequest({
      fieldErrors: null,
      fields: null,
      mailSent: false,
    });
  }

  const fields = { email };
  const fieldErrors = {
    email: validateEmail(email),
  };

  if (Object.values(fieldErrors).some(Boolean)) {
    return badRequest({
      fieldErrors,
      fields,
      mailSent: false,
    })
  }

  const token = signLoginToken(email, redirectTo);
  const searchParams = new URLSearchParams([['token', token]]);

  if (process.env.NODE_ENV !== 'production') {
    // TODO only show this console on local dev
    console.log(`url: http://localhost:3000/magic?${searchParams}`);
  }

  // TODO: send email

  return json({
    mailSent: true,
    fieldErrors: null,
    fields,
  });
}

export default function Login() {
  const actionData = useActionData<typeof action>();
  const [searchParams] = useSearchParams();

  if (actionData?.mailSent === true) {
    return (
      <p>Email sent to {actionData?.fields?.email}</p>
    )
  }

  return (
    <Form reloadDocument method="post" action="/login" className="space-y-6">
      <input
        type="hidden"
        name="redirectTo"
        value={searchParams.get("redirectTo") ?? undefined}
        />
      <EmailField
        defaultValue={actionData?.fields?.email}
        aria-invalid={Boolean(actionData?.fieldErrors?.email)}
        aria-errormessage={actionData?.fieldErrors?.email ? "email-error" : undefined}
        />
      { actionData?.fieldErrors?.email && (
        <p role="alert" id="email-error">
          { actionData.fieldErrors.email }
        </p>
      )}
      <button
        type="submit"
        className="flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      >
        Send a magic link
      </button>
    </Form>
  );
}
