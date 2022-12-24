import Dialog from '~/components/Dialog';
import TextField from '~/components/TextField';

interface AddPunctualType {
  onCloseDialog: () => void,
}

function AddPunctual({ onCloseDialog }: AddPunctualType) {
  return (
    <Dialog onCloseDialog={onCloseDialog}>
      <form method="post" className="flex flex-col items-stretch">
        <TextField label="name" />
        <TextField label="random" />
      </form>
    </Dialog>
  );
}

export default AddPunctual;
