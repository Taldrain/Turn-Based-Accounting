import type { Punctual, Recurrent } from '@prisma/client';

import AmountDisplay from '~/components/AmountDisplay';
import Card from '~/components/Card';

import { getAmount } from '~/utils/number';

type BalanceCardProps = {
  punctuals: Punctual[],
  recurrents: (Recurrent & { computedAmount: number })[],
}

function BalanceCard({ punctuals, recurrents }: BalanceCardProps) {

  const sumPunctual = punctuals
    .reduce((acc, cur) => acc + getAmount(cur.amount, cur.isPositive), 0);

  const sumRecurrent = recurrents
    .reduce((acc, cur) => acc + getAmount(cur.computedAmount, cur.isPositive), 0);

  const sumEntries = sumPunctual + sumRecurrent;

  return (
    <Card>
      <div className="text-lg font-medium leading-6 text-gray-900 pb-4">
        Balance
      </div>
      <div className="flex justify-center items-center gap-4">
        <div>
          <AmountDisplay amount={Math.abs(sumEntries)} isPositive={sumEntries >= 0} />
        </div>
        <div className="flex flex-col text-xs font-light gap-4 text-gray-600">
          <div>
            <div>
              Recurrents
            </div>
            <AmountDisplay amount={Math.abs(sumRecurrent)} isPositive={sumRecurrent >= 0} />
          </div>
          <div>
            <div>
              Punctuals
            </div>
            <AmountDisplay amount={Math.abs(sumPunctual)} isPositive={sumPunctual >= 0} />
          </div>
        </div>
      </div>
    </Card>
  );
}

export default BalanceCard;
