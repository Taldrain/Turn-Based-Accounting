import { useParams } from "@remix-run/react";
import invariant from "tiny-invariant";

import Dialog, { Title } from '~/components/Dialog';
import TextField from '~/components/TextField';
import IsPositiveField from '~/components/IsPositiveField';

import { formatDate, parseDateParam } from '~/utils/date';

interface AddPunctualType {
  onCloseDialog: () => void,
  fields: {
    name: string,
    amount: string,
  },
  urlDate: Date,
}

function AddPunctual({ onCloseDialog, fields }: AddPunctualType) {
  const params = useParams();
  invariant(params.date, 'Expected params.date');
  const urlDate = parseDateParam(params.date);

  return (
    <Dialog onCloseDialog={onCloseDialog}>
      <Title as="h3" className="text-lg font-medium leading-6 text-gray-900 pb-4">
        Add punctual entry
      </Title>

      <form method="post" className="flex flex-col items-stretch gap-4">
        <TextField
          label="Name*"
          name="name"
          defaultValue={fields?.name}
          required
        />
        <div className="flex flex-row items-center gap-4">
          <IsPositiveField />
          <TextField
            label="Amount*"
            name="amount"
            type="number"
            defaultValue={fields?.amount}
            required
          />
        </div>
        <TextField
          label="Date*"
          name="date"
          type="date"
          defaultValue={urlDate}
          required
        />
        <div className="flex flex-row justify-between pt-6">
          <button onClick={onCloseDialog}>
            Cancel
          </button>
          <button type="submit">
            Add
          </button>
        </div>
      </form>
    </Dialog>
  );
}

export default AddPunctual;
