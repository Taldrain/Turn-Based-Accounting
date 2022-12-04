import BalanceCard from '~/components/Balance';
import DateSelectionCard from '~/components/DateSelectionCard';
import RecurrentCard from '~/components/RecurrentCard';
import PunctualCard from '~/components/PunctualCard';

export default function Balance() {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:flex-wrap">
      <div className="grow md:basis-[calc(50%-0.5rem)] md:order-2">
        <DateSelectionCard />
      </div>
      <div className="grow md:basis-[calc(50%-0.5rem)] md:order-1">
        <BalanceCard />
      </div>
      <div className="grow md:basis-[calc(50%-0.5rem)] md:order-4">
        <PunctualCard />
      </div>
      <div className="grow md:basis-[calc(50%-0.5rem)] md:order-3">
        <RecurrentCard />
      </div>
    </div>
  );
}
