import type { Settings } from "@prisma/client";
import { useLoaderData } from "@remix-run/react";

import { formatBalance, getAmount } from '~/utils/number';
import { getUserLocale, getUserCurrency } from '~/utils/userSettings';

interface AmountDisplayType {
  amount: number,
  isPositive: boolean,
}

function AmountDisplay({ amount, isPositive }: AmountDisplayType) {
  const { userSettings } = useLoaderData() as { userSettings: Settings };

  const color = isPositive ? 'text-green-500' : 'text-red-500';

  return (
    <span className={color}>
      { formatBalance(
        getUserLocale(userSettings),
        getUserCurrency(userSettings),
        getAmount(amount, isPositive),
      )}
    </span>
  );
}

export default AmountDisplay;
