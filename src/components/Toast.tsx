import React from 'react';
import toast, { Toaster } from 'react-hot-toast';

export const showToast = {
  success: (message: string) => toast.success(message, {
    duration: 4000,
    style: {
      background: 'rgba(34, 197, 94, 0.9)',
      color: 'white',
      backdropFilter: 'blur(10px)',
      border: '1px solid rgba(34, 197, 94, 0.3)',
      borderRadius: '12px',
    },
  }),
  error: (message: string) => toast.error(message, {
    duration: 4000,
    style: {
      background: 'rgba(239, 68, 68, 0.9)',
      color: 'white',
      backdropFilter: 'blur(10px)',
      border: '1px solid rgba(239, 68, 68, 0.3)',
      borderRadius: '12px',
    },
  }),
  loading: (message: string) => toast.loading(message, {
    style: {
      background: 'rgba(59, 130, 246, 0.9)',
      color: 'white',
      backdropFilter: 'blur(10px)',
      border: '1px solid rgba(59, 130, 246, 0.3)',
      borderRadius: '12px',
    },
  }),
  custom: (message: string, icon: string) => toast(message, {
    icon: icon,
    duration: 4000,
    style: {
      background: 'rgba(15, 23, 42, 0.9)',
      color: 'white',
      backdropFilter: 'blur(10px)',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      borderRadius: '12px',
    },
  }),
};

export const ToastContainer: React.FC = () => {
  return (
    <Toaster
      position="top-right"
      toastOptions={{
        className: 'toast-custom',
        style: {
          fontSize: '14px',
          fontWeight: '500',
        },
      }}
    />
  );
};