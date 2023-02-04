import { useParams } from "@remix-run/react";
import invariant from "tiny-invariant";

import Dialog, { Title } from '~/components/Dialog';
import PunctualForm from '~/components/PunctualForm';

import { parseDateParam } from '~/utils/date';

interface AddPunctualType {
  onCloseDialog: () => void,
}

function AddPunctual({ onCloseDialog }: AddPunctualType) {
  const params = useParams();
  invariant(params.date, 'Expected params.date');
  const urlDate = parseDateParam(params.date);

  return (
    <Dialog onCloseDialog={onCloseDialog}>
      <Title as="h3" className="text-lg font-medium leading-6 text-gray-900 pb-4">
        Add punctual entry
      </Title>

      <PunctualForm
        onCancel={onCloseDialog}
        date={urlDate}
        isAdd
      />
    </Dialog>
  );
}

export default AddPunctual;
