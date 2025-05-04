import React, { createContext, useContext, useState, useCallback } from 'react';
import {
  AiOutlineCheckCircle,
  AiOutlineInfoCircle,
  AiOutlineExclamationCircle,
  AiOutlineCloseCircle,
} from 'react-icons/ai';

const ToastContext = createContext();

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const addToast = useCallback(
    ({ type = 'info', message, duration = 3000 }) => {
      const id = Date.now() + Math.random();
      setToasts((prev) => [...prev, { id, type, message }]);
      setTimeout(() => removeToast(id), duration);
    },
    [removeToast]
  );

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}

      {/* Toast container */}
      <div className="fixed top-25 right-5 z-50 flex flex-col space-y-2">
        {toasts.map(({ id, type, message }) => (
          <div
            key={id}
            className={
              `flex items-center p-3 max-w-xs w-full rounded shadow-lg space-x-2 text-sm ` +
              (type === 'success'
                ? 'bg-white border border-green-200 text-green-800'
                : type === 'error'
                ? 'bg-white border border-red-200 text-red-800'
                : 'bg-white border border-blue-200 text-blue-800')
            }
          >
            {type === 'success' && <AiOutlineCheckCircle size={20} />}
            {type === 'info' && <AiOutlineInfoCircle size={20} />}
            {type === 'error' && <AiOutlineExclamationCircle size={20} />}
            <span className="flex-1">{message}</span>
            <AiOutlineCloseCircle
              size={18}
              className="cursor-pointer"
              onClick={() => removeToast(id)}
            />
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be used within ToastProvider');
  return ctx;
};
