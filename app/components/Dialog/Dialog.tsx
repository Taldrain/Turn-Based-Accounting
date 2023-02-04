import type { ReactNode } from 'react';
import { useState } from 'react';
import { Dialog } from '@headlessui/react';

interface TBADialogType {
  onCloseDialog: () => void,
  children: ReactNode,
}

function TBADialog({ onCloseDialog, children }: TBADialogType) {
  const [open, setIsOpen] = useState(true);

  const handleCloseDialog = () => {
    setIsOpen(false);
    onCloseDialog();
  };

  return (
    <Dialog as="div" className="relative z-10" open={open} onClose={handleCloseDialog}>
      <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
      <div className="fixed inset-0 z-10 overflow-y-auto">
        <div className="flex h-full text-center items-stretch md:items-center md:justify-center md:p-4">
          <Dialog.Panel className="relative transform overflow-hidden bg-white text-left shadow-xl grow md:grow-0 px-4 pt-5 pb-4">
            { children }
          </Dialog.Panel>
        </div>
      </div>
    </Dialog>
  );
}

export default TBADialog;
export const Title = Dialog.Title;
