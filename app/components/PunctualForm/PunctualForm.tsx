import TextField from '~/components/TextField';
import IsPositiveField from '~/components/IsPositiveField';
import Button from '~/components/Button';

interface PunctualFormType {
  isAdd?: boolean,
  onCancel: () => void,
  name?: string,
  amount?: string,
  date: string,
  isPositive?: boolean,
}

function PunctualForm(props: PunctualFormType) {
  const {
    isAdd = false,
    onCancel,
    name,
    amount,
    date,
    isPositive,
  } = props;

  return (
    <form method="post" className="flex flex-col items-stretch gap-4">
      <TextField
        label="Name*"
        name="name"
        type="text"
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
      <TextField
        label="Date*"
        name="date"
        type="date"
        defaultValue={date}
        required
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

export default PunctualForm;
