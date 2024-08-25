import ModalPortal from '@src/portals/ModalPortal';
import { motion } from 'framer-motion';

import styles from './Modal.module.css';
type ModalProps = {
  children?: React.ReactNode;
  onClose: () => void;
};

const Modal = ({ children, onClose }: ModalProps) => {
  return (
    <ModalPortal>
      <motion.div
        className={styles.Backdrop}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          {children}
        </motion.div>
      </motion.div>
    </ModalPortal>
  );
};

export default Modal;
