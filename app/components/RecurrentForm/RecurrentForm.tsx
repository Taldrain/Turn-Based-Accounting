import { Form, useTransition } from "@remix-run/react";

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
  endDate?: string | null,
  isPositive?: boolean,
  recurrence?: string,
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
    recurrence = 'day',
  } = props;
  const transition = useTransition();

  return (
    <Form method="post" className="flex flex-col items-stretch gap-4">
      <TextField
        label="Name*"
        name="name"
        required
        defaultValue={name}
        disabled={transition.state === 'submitting'}
      />
      <div className="flex flex-row items-center gap-4">
        <IsPositiveField
          defaultChecked={isPositive ? 'gain' : 'loss'}
          disabled={transition.state === 'submitting'}
        />
        <TextField
          label="Amount*"
          name="amount"
          type="number"
          step="0.01"
          required
          defaultValue={amount}
          disabled={transition.state === 'submitting'}
        />
      </div>
      <RecurrenceSelect defaultValue={recurrence} />
      <TextField
        label="Start date*"
        name="startDate"
        type="date"
        required
        defaultValue={startDate}
        disabled={transition.state === 'submitting'}
      />
      <TextField
        label="End date"
        name="endDate"
        type="date"
        defaultValue={endDate}
        disabled={transition.state === 'submitting'}
      />
      <div className="flex flex-row justify-end pt-6">
        <Button onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" className="text-orange-500 hover:bg-orange-50">
          { isAdd ? "Add" : "Edit" }
        </Button>
      </div>
    </Form>
  );
}

export default RecurrentForm;
