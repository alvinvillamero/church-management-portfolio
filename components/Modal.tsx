'use client';

import { X } from 'lucide-react';
import { ReactNode } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showCloseButton?: boolean;
}

export default function Modal({
  isOpen,
  onClose,
  title,
  children,
  size = 'md',
  showCloseButton = true,
}: ModalProps) {
  if (!isOpen) return null;

  const sizeClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl',
  };

  return (
    <div 
      className="fixed bg-black bg-opacity-50 flex items-center justify-center z-[9999] p-3 sm:p-4 overflow-y-auto" 
      style={{ 
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: '100vw',
        height: '100vh',
        margin: 0,
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div className={`bg-white rounded-lg sm:rounded-xl shadow-xl w-full max-w-full ${sizeClasses[size]} my-auto max-h-[90vh] overflow-y-auto`}>
        {(title || showCloseButton) && (
          <div className="flex items-center justify-between p-4 sm:p-6 border-b border-neutral-200 sticky top-0 bg-white z-10 rounded-t-lg sm:rounded-t-xl">
            {title && (
              <h3 className="font-heading text-lg sm:text-xl text-neutral-900">{title}</h3>
            )}
            {showCloseButton && (
              <button
                onClick={onClose}
                className="text-neutral-400 hover:text-neutral-600 transition-colors p-1 hover:bg-neutral-100 rounded"
                aria-label="Close"
              >
                <X size={20} />
              </button>
            )}
          </div>
        )}
        <div className="p-4 sm:p-6">{children}</div>
      </div>
    </div>
  );
}

