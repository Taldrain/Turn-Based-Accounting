import { useParams } from "@remix-run/react";
import invariant from "tiny-invariant";

import Dialog, { Title } from '~/components/Dialog';
import RecurrentForm from '~/components/RecurrentForm';

import { parseDateParam } from '~/utils/date';

interface AddRecurrentType {
  onCloseDialog: () => void,
}

function AddRecurrent({ onCloseDialog }: AddRecurrentType) {
  const params = useParams();
  invariant(params.date, 'Expected params.date');
  const urlDate = parseDateParam(params.date);

  return (
    <Dialog onCloseDialog={onCloseDialog}>
      <Title as="h3" className="text-lg font-medium leading-6 text-gray-900 pb-4">
        Add recurrent entry
      </Title>

      <RecurrentForm
        onCancel={onCloseDialog}
        date={urlDate}
        isAdd
      />
    </Dialog>
  );
}

export default AddRecurrent;
