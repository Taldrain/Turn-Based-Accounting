import { formatBalance } from '~/utils/number';

interface AmountDisplayType {
  amount: number,
  isPositive: boolean,
}

function AmountDisplay({ amount, isPositive }: AmountDisplayType) {
  const color = isPositive ? 'text-green-500' : 'text-red-500';
  return (
    <span className={color}>
      { formatBalance('fr-FR', 'EUR', (isPositive ? 1 : -1) * amount) }
    </span>
  );
}

export default AmountDisplay;
