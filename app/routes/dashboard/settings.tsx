import type { ActionArgs, LoaderArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

import Button from '~/components/Button';
import Card from '~/components/Card';
import CurrencySelect from '~/components/CurrencySelect';
import EmailField from '~/components/EmailField';
import LocaleSelect from '~/components/LocaleSelect';

import { requireUserId } from '~/utils/session.server';
import { badRequest } from '~/utils/request.server';
import { getSettings, updateSettings, getUserById } from '~/utils/queries.server';
import { getUserCurrency, getUserLocale } from "~/utils/userSettings";

function validateCurrency(currency: unknown) {
  if (currency !== 'EUR' && currency !== 'USD') {
    return "Invalid currency";
  }
}

function validateLocale(locale: unknown) {
  if (locale !== 'fr-FR' && locale !== 'en-US') {
    return "Invalid locale";
  }
}

export const action = async ({ request }: ActionArgs) => {
  const formData = Object.fromEntries(await request.formData());
  const userId = await requireUserId(request);

  const currency = formData.currency;
  const locale = formData.locale;

  const fields = { currency, locale };
  const fieldErrors = {
    currency: validateCurrency(currency),
    locale: validateLocale(locale),
  };

  if (Object.values(fieldErrors).some(Boolean)) {
    return badRequest({
      fieldErrors,
      fields,
    });
  }

  await updateSettings(userId, currency, locale);
  return null;
}

export const loader = async ({ request }: LoaderArgs) => {
  const userId = await requireUserId(request);
  const settings = await getSettings(userId);
  const user = await getUserById(userId);

  return { settings, email: user?.email };
}

export default function Balance() {
  const { settings, email } = useLoaderData<typeof loader>();

  return (
    <div className="m-auto w-[36rem]">
      <Card>
        <h1 className="text-lg font-medium leading-6 text-gray-900 pb-4">
          Settings
        </h1>


        <form method="post" className="flex flex-col items-stretch gap-4">
          <EmailField label="Email" disabled defaultValue={email} />
          <LocaleSelect defaultValue={getUserLocale(settings)} />
          <CurrencySelect defaultValue={getUserCurrency(settings)} />
          <div className="flex flex-row justify-end pt-6">
            <Button type="reset">
              Cancel
            </Button>
            <Button type="submit" className="text-orange-500 hover:bg-orange-50">
              Save
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
