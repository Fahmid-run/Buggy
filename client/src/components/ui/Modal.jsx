import { useEffect } from 'react';
import { HiXMark } from 'react-icons/hi2';

export default function Modal({ open, onClose, title, children, footer, size = 'md' }) {
  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose?.();
    if (open) document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  if (!open) return null;

  const sizes = { sm: 'max-w-sm', md: 'max-w-lg', lg: 'max-w-2xl', xl: 'max-w-4xl' };

  return (
    <div className="modal modal-open">
      <div className={`modal-box bg-base-100 border border-base-300 rounded-2xl shadow-xl animate-scale-in ${sizes[size]}`}>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">{title}</h3>
          <button onClick={onClose} className="btn btn-square btn-ghost btn-sm">
            <HiXMark className="h-5 w-5" />
          </button>
        </div>
        <div>{children}</div>
        {footer && <div className="modal-action mt-6">{footer}</div>}
      </div>
      <div className="modal-backdrop bg-black/50" onClick={onClose} />
    </div>
  );
}
