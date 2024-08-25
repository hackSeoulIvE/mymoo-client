import Modal from '@src/components/design-system/modal/Modal/Modal';
import { AnimatePresence } from 'framer-motion';
import { useState } from 'react';

const useModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);
  return {
    Modal: ({ children }: { children: React.ReactNode }) => (
      <AnimatePresence mode="wait">
        {isOpen ? <Modal onClose={close}>{children}</Modal> : null}
      </AnimatePresence>
    ),
    open,
    close,
  };
};
export default useModal;
