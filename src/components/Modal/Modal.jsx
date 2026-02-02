import { useEffect } from 'react';
import { X } from 'lucide-react';
import styles from './Modal.module.scss';

export default function Modal({ isOpen, onClose, title, children }) {
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div 
      className={styles.overlay} 
      onClick={onClose}
      role="presentation"
    >
      <div 
        className={styles.modal} 
        onClick={e => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        <header className={styles.header}>
          <h2 id="modal-title">{title}</h2>
          <button 
            className={styles.closeBtn} 
            onClick={onClose}
            aria-label="Close modal"
          >
            <X size={20} />
          </button>
        </header>
        <div className={styles.content}>
          {children}
        </div>
      </div>
    </div>
  );
}
