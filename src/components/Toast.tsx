import React from 'react';

interface ToastProps {
  message: string | null;
  onClose: () => void;
}

export const Toast: React.FC<ToastProps> = ({ message }) => {
  if (!message) return null;

  return (
    <div className="fixed bottom-20 left-1/2 -translate-x-1/2 bg-[#2b322d] text-[#ebf3eb] px-4 py-2.5 rounded-full shadow-xl font-label-md text-label-md flex items-center gap-2 z-50 animate-in fade-in slide-in-from-bottom-2 duration-200">
      <span className="material-symbols-outlined text-[#96f7af] text-[18px]">check_circle</span>
      <span>{message}</span>
    </div>
  );
};
