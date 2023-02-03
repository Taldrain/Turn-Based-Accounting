import type { LoaderArgs, ActionArgs } from '@remix-run/node';
import { json, redirect } from "@remix-run/node";
import { Form, useTransition, useActionData, useSearchParams } from "@remix-run/react";

import EmailField from '~/components/EmailField'

import { getUserId } from '~/utils/session.server';
import { badRequest } from '~/utils/request.server';
import { sendMail } from '~/utils/mail.server';
import { getUser } from '~/utils/queries.server';
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

// most of the login process is inspired from the kentcdodds.com website
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
    console.log(`url: http://localhost:3000/magic?${searchParams}`);
  } else {
    const magicLink = `https://tba.taldra.in/magic?${searchParams}`;
    let userExists = (await getUser(email)) !== null;

    const text = `
Here's your sign-in link for tba.taldra.in:

${magicLink}

${
userExists
? `Welcome back ${email}!`
: `Clicking the link above will create a *new* account on tba.taldra.in with the email ${email}. Welcome!`
}

-- 
Turn-based Accounting
    `.trim();

    const res = await sendMail(JSON.stringify({
      from: {
        email: 'hello@tba.taldra.in',
        name: 'Turn-Based Accounting team',
      },
      to: [{ email }],
      subject: 'Magic sign-in link for TBA',
      text,
      category: "magic link"
    }));

    await res.text();
  }

  return json({
    mailSent: true,
    fieldErrors: null,
    fields,
  });
}

export default function Login() {
  const actionData = useActionData<typeof action>();
  const transition = useTransition();
  const [searchParams] = useSearchParams();

  if (actionData?.mailSent === true) {
    return (
      <p>Email sent to {actionData?.fields?.email}</p>
    )
  }

  return (
    <Form method="post" action="/login" className="space-y-6">
      <input
        type="hidden"
        name="redirectTo"
        value={searchParams.get("redirectTo") ?? undefined}
      />
      <EmailField
        defaultValue={actionData?.fields?.email}
        aria-invalid={Boolean(actionData?.fieldErrors?.email)}
        aria-errormessage={actionData?.fieldErrors?.email ? "email-error" : undefined}
        disabled={transition.state === 'submitting'}
      />
      { actionData?.fieldErrors?.email && (
        <p role="alert" id="email-error">
          { actionData.fieldErrors.email }
        </p>
      )}
      <button
        type="submit"
        className="flex w-full justify-center rounded-md border border-transparent bg-orange-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
      >
        { transition.state === "submitting"
          ? 'Sending link...'
          : 'Send a magic link'
        }
      </button>
    </Form>
  );
}
