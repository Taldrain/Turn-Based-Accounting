import type { Punctual } from '@prisma/client';

import Dialog, { Title } from '~/components/Dialog';
import PunctualForm from '~/components/PunctualForm';

import { formatDate } from '~/utils/date';

interface EditPunctualType {
  onCloseDialog: () => void,
  punctual: Punctual,
}

function EditPunctual({ onCloseDialog, punctual }: EditPunctualType) {
  return (
    <Dialog onCloseDialog={onCloseDialog}>
      <Title as="h3" className="text-lg font-medium leading-6 text-gray-900 pb-4">
        Edit punctual entry
      </Title>

      <PunctualForm
        onCancel={onCloseDialog}
        name={punctual.name}
        amount={punctual.amount}
        date={formatDate(new Date(punctual.date))}
        isPositive={punctual.isPositive}
      />
    </Dialog>
  );
}

export default EditPunctual;
