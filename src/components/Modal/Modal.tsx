import type { ReactNode } from 'react';
import css from './Modal.module.css';

interface ModalProps {
  onClose: () => void;
  children: ReactNode;
}

export default function Modal({ onClose, children }: ModalProps) {
  return (
    <div
      className={css.backdrop}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div className={css.modal} onClick={e => e.stopPropagation()}>
        <button className={css.closeBtn} onClick={onClose}>
          ✕
        </button>
        {children}
      </div>
    </div>
  );
}
