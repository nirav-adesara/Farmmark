import React, { useState } from 'react';

interface VacationModalProps {
  isOpen: boolean;
  onConfirm: (startDate: string, endDate: string) => void;
  onClose: () => void;
}

export const VacationModal: React.FC<VacationModalProps> = ({
  isOpen,
  onConfirm,
  onClose,
}) => {
  const [fromDate, setFromDate] = useState('Tomorrow, Oct 24');
  const [toDate, setToDate] = useState('Monday, Oct 30');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-[#2b322d]/50 backdrop-blur-sm flex items-end justify-center p-0 animate-in fade-in duration-200">
      <div className="w-full max-w-md bg-surface rounded-t-2xl p-space-lg flex flex-col gap-space-md shadow-2xl animate-in slide-in-from-bottom duration-200 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-tertiary-container text-on-tertiary flex items-center justify-center">
              <span className="material-symbols-outlined text-[18px]">beach_access</span>
            </div>
            <h3 className="font-headline-sm text-headline-sm text-on-surface">Vacation Pause Mode</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-on-surface-variant hover:bg-surface-container"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        <p className="font-body-md text-body-md text-on-surface-variant">
          Going out of town? Pick your absence dates. All morning deliveries will be automatically suspended and zero wallet balance will be deducted.
        </p>

        <div className="grid grid-cols-2 gap-space-sm">
          <div className="flex flex-col gap-1 p-space-sm rounded-lg bg-surface-container">
            <span className="font-label-sm text-label-sm text-on-surface-variant">Pause From:</span>
            <input
              type="text"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
              className="font-title-md text-title-md text-on-surface font-semibold bg-transparent focus:outline-none"
            />
          </div>
          <div className="flex flex-col gap-1 p-space-sm rounded-lg bg-surface-container">
            <span className="font-label-sm text-label-sm text-on-surface-variant">Resume On:</span>
            <input
              type="text"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
              className="font-title-md text-title-md text-on-surface font-semibold bg-transparent focus:outline-none"
            />
          </div>
        </div>

        <div className="bg-tertiary-fixed/40 p-3 rounded-xl flex items-center gap-2.5 text-on-tertiary-fixed">
          <span className="material-symbols-outlined text-tertiary text-[20px]">shield</span>
          <span className="font-body-sm text-body-sm leading-tight">
            <strong>Zero Waste Guarantee:</strong> Unused milk remains unbottled at the farm. Automatic daily resumes kick in 6:30 AM on resume day.
          </span>
        </div>

        <div className="flex gap-space-sm mt-space-sm">
          <button
            onClick={() => onConfirm(fromDate, toDate)}
            className="flex-1 py-3 rounded-full bg-tertiary-container text-on-tertiary font-title-md text-title-md font-semibold active:scale-98 transition-all shadow-md"
          >
            Confirm Vacation Pause
          </button>
          <button
            onClick={onClose}
            className="px-5 py-3 rounded-full bg-surface-container-high text-on-surface font-title-md text-title-md"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};
