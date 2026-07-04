import { HiExclamationTriangle } from 'react-icons/hi2';
import Button from './Button';
import Modal from './Modal';

export default function ConfirmModal({ open, onClose, onConfirm, title = 'Are you sure?', message, confirmText = 'Confirm', loading = false }) {
  return (
    <Modal
      open={open}
      onClose={onClose}
      title={title}
      size="sm"
      footer={
        <>
          <Button variant="ghost" onClick={onClose}>Cancel</Button>
          <Button variant="error" onClick={onConfirm} loading={loading}>{confirmText}</Button>
        </>
      }
    >
      <div className="flex items-start gap-3">
        <div className="bg-error/10 text-error rounded-full w-10 h-10 grid place-items-center shrink-0">
          <HiExclamationTriangle className="h-5 w-5" />
        </div>
        <p className="text-sm text-base-content/70 pt-2">{message}</p>
      </div>
    </Modal>
  );
}
