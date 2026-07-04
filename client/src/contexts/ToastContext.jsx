import { createContext, useCallback, useContext, useState } from 'react';
import { HiCheckCircle, HiXCircle, HiInformationCircle, HiExclamationTriangle } from 'react-icons/hi2';

const ToastContext = createContext();

const icons = {
  success: <HiCheckCircle className="h-5 w-5 text-success" />,
  error: <HiXCircle className="h-5 w-5 text-error" />,
  info: <HiInformationCircle className="h-5 w-5 text-info" />,
  warning: <HiExclamationTriangle className="h-5 w-5 text-warning" />,
};

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const remove = useCallback((id) => {
    setToasts((t) => t.filter((x) => x.id !== id));
  }, []);

  const toast = useCallback((message, type = 'info', duration = 3500) => {
    const id = Date.now() + Math.random();
    setToasts((t) => [...t, { id, message, type }]);
    setTimeout(() => remove(id), duration);
  }, [remove]);

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      <div className="toast toast-end z-[100] gap-2">
        {toasts.map((t) => (
          <div
            key={t.id}
            className="alert shadow-lg bg-base-200 border border-base-300 animate-fade-in min-w-[260px] max-w-sm"
          >
            {icons[t.type]}
            <span className="text-sm text-base-content">{t.message}</span>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export const useToast = () => useContext(ToastContext);
