import type { Recurrent } from '@prisma/client';

import Dialog, { Title } from '~/components/Dialog';
import RecurrentForm from '~/components/RecurrentForm';

import { formatDate } from '~/utils/date';

interface EditRecurrentType {
  onCloseDialog: () => void,
  recurrent: Recurrent,
}

function EditRecurrent({ onCloseDialog, recurrent }: EditRecurrentType) {
  return (
    <Dialog onCloseDialog={onCloseDialog}>
      <Title as="h3" className="text-lg font-medium leading-6 text-gray-900 pb-4">
        Edit recurrent entry
      </Title>

      <RecurrentForm
        onCancel={onCloseDialog}
        name={recurrent.name}
        amount={recurrent.amount.toString()}
        startDate={formatDate(new Date(recurrent.startDate))}
        endDate={recurrent.endDate && formatDate(new Date(recurrent.endDate))}
        isPositive={recurrent.isPositive}
        recurrence={recurrent.recurrence}
      />
    </Dialog>
  );
}

export default EditRecurrent;
