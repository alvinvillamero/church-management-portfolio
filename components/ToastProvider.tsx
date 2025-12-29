'use client';

import { useToastStore } from '@/lib/store/toast-store';
import ToastContainer from './Toast';

export default function ToastProvider() {
  const { toasts, removeToast } = useToastStore();

  return <ToastContainer toasts={toasts} onClose={removeToast} />;
}

