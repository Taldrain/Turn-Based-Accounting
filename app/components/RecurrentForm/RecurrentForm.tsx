import TextField from '~/components/TextField';
import IsPositiveField from '~/components/IsPositiveField';
import RecurrenceSelect from '~/components/RecurrenceSelect';
import Button from '~/components/Button';

interface RecurrentFormType {
  isAdd?: boolean,
  onCancel: () => void,
  name?: string,
  amount?: string,
  startDate: string,
  endDate: string,
  isPositive?: boolean,
  recurrence: string,
}

function RecurrentForm(props: RecurrentFormType) {
  const {
    isAdd = false,
    onCancel,
    name,
    amount,
    startDate,
    endDate,
    isPositive,
    recurrence,
  } = props;

  return (
    <form method="post" className="flex flex-col items-stretch gap-4">
      <TextField
        label="Name*"
        name="name"
        required
        defaultValue={name}
      />
      <div className="flex flex-row items-center gap-4">
        <IsPositiveField defaultChecked={isPositive ? 'gain' : 'loss'} />
        <TextField
          label="Amount*"
          name="amount"
          type="number"
          step="0.01"
          required
          defaultValue={amount}
        />
      </div>
      <RecurrenceSelect />
      <TextField
        label="Start date*"
        name="startDate"
        type="date"
        defaultValue={startDate}
        required
      />
      <TextField
        label="End date"
        name="endDate"
        type="date"
        defaultValue={endDate}
      />
      <div className="flex flex-row justify-between pt-6">
        <Button onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" className="text-orange-500 hover:bg-orange-50">
          { isAdd ? "Add" : "Edit" }
        </Button>
      </div>
    </form>
  );
}

export default RecurrentForm;
