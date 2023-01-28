import { useLoaderData } from "@remix-run/react";

import { formatBalance } from '~/utils/number';
import { getUserLocale, getUserCurrency } from '~/utils/userSettings';

interface AmountDisplayType {
  amount: number,
  isPositive: boolean,
}

function AmountDisplay({ amount, isPositive }: AmountDisplayType) {
  const { userSettings } = useLoaderData();

  const color = isPositive ? 'text-green-500' : 'text-red-500';

  return (
    <span className={color}>
      { formatBalance(
        getUserLocale(userSettings),
        getUserCurrency(userSettings),
        (isPositive ? 1 : -1) * amount,
      )}
    </span>
  );
}

export default AmountDisplay;
