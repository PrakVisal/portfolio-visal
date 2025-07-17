import React from 'react';

interface LoadingSpinnerProps {
  size?: number;
  className?: string;
  fullscreen?: boolean;
}

// Modern, centered, animated 3-dot bouncing spinner
const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ size = 40, className = '', fullscreen = false }) => (
  <div
    className={
      fullscreen
        ? `fixed inset-0 z-50 flex items-center justify-center bg-white/60 ${className}`
        : `relative flex items-center justify-center w-full h-full min-h-[120px] ${className}`
    }
  >
    <div className="flex space-x-2">
      <span
        className="block rounded-full bg-gradient-to-br from-yellow-400 to-teal-500"
        style={{ width: size * 0.3, height: size * 0.3, animation: 'bounce 0.6s infinite alternate' }}
      />
      <span
        className="block rounded-full bg-gradient-to-br from-yellow-400 to-teal-500"
        style={{ width: size * 0.3, height: size * 0.3, animation: 'bounce 0.6s 0.2s infinite alternate' }}
      />
      <span
        className="block rounded-full bg-gradient-to-br from-yellow-400 to-teal-500"
        style={{ width: size * 0.3, height: size * 0.3, animation: 'bounce 0.6s 0.4s infinite alternate' }}
      />
    </div>
    <style jsx>{`
      @keyframes bounce {
        0% {
          transform: translateY(0);
          opacity: 0.7;
        }
        100% {
          transform: translateY(-40%);
          opacity: 1;
        }
      }
    `}</style>
  </div>
);

export default LoadingSpinner; 