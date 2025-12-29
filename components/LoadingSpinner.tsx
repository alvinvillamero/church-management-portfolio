'use client';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  fullScreen?: boolean;
  message?: string;
}

export default function LoadingSpinner({ size = 'md', fullScreen = false, message }: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
  };

  const spinner = (
    <div className="flex flex-col items-center justify-center space-y-4">
      <div
        className={`${sizeClasses[size]} border-4 border-primary-200 border-t-primary-700 rounded-full animate-spin`}
      ></div>
      {message && (
        <p className="text-sm text-neutral-600 font-medium">{message}</p>
      )}
    </div>
  );

  if (fullScreen) {
    return (
      <div 
        className="fixed bg-black bg-opacity-30 flex items-center justify-center z-[9999]" 
        style={{ 
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          width: '100vw',
          height: '100vh',
          margin: 0,
          padding: 0
        }}
      >
        <div className="bg-white rounded-lg p-8 shadow-lg">
          {spinner}
        </div>
      </div>
    );
  }

  return spinner;
}

