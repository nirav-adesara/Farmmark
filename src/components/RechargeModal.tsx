import React, { useState } from 'react';

interface RechargeModalProps {
  isOpen: boolean;
  initialAmount?: number;
  onSuccess: (amount: number, bonus: number) => void;
  onClose: () => void;
}

export const RechargeModal: React.FC<RechargeModalProps> = ({
  isOpen,
  initialAmount = 2000,
  onSuccess,
  onClose,
}) => {
  const [selectedAmount, setSelectedAmount] = useState<number>(initialAmount);
  const [customVal, setCustomVal] = useState<string>('');
  const [selectedUpi, setSelectedUpi] = useState<'gpay' | 'phonepe' | 'paytm'>('phonepe');
  const [isProcessing, setIsProcessing] = useState(false);

  if (!isOpen) return null;

  const currentAmount = customVal ? Number(customVal) : selectedAmount;
  let bonus = 0;
  if (currentAmount >= 4000) bonus = 500;
  else if (currentAmount >= 2000) bonus = 200;
  else if (currentAmount >= 1000) bonus = 75;

  const handlePay = () => {
    if (!currentAmount || currentAmount < 100) return;
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      onSuccess(currentAmount, bonus);
      onClose();
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#2b322d]/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in duration-200">
      <div className="w-full max-w-md bg-surface rounded-t-2xl sm:rounded-2xl p-space-lg flex flex-col gap-space-md shadow-2xl max-h-[90vh] overflow-y-auto no-scrollbar">
        <div className="flex items-center justify-between pb-1 border-b border-surface-container-high">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center">
              <span className="material-symbols-outlined text-[18px]">account_balance_wallet</span>
            </div>
            <div>
              <h3 className="font-headline-sm text-headline-sm text-on-surface">Top-Up Farm Wallet</h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant">Instant zero-fee recharge</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full flex items-center justify-center text-on-surface-variant hover:bg-surface-container"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Amount Selector Pills */}
        <div className="grid grid-cols-3 gap-2">
          {[1000, 2000, 4000].map((amt) => {
            const isSel = !customVal && selectedAmount === amt;
            return (
              <button
                key={amt}
                type="button"
                onClick={() => {
                  setCustomVal('');
                  setSelectedAmount(amt);
                }}
                className={`py-2.5 px-2 rounded-xl flex flex-col items-center border transition-all ${
                  isSel
                    ? 'border-primary bg-secondary-container/30 shadow-sm'
                    : 'border-surface-container-high bg-surface-container-lowest hover:bg-surface-container-low'
                }`}
              >
                <span className="font-headline-sm text-headline-sm text-on-surface font-bold">
                  ₹{amt.toLocaleString('en-IN')}
                </span>
                <span className="font-label-sm text-label-sm text-secondary font-semibold">
                  {amt === 2000 ? '+₹200 Extra' : amt === 4000 ? '+₹500 Extra' : '+₹75 Extra'}
                </span>
              </button>
            );
          })}
        </div>

        {/* Custom amount field */}
        <div className="relative">
          <span className="absolute left-3.5 top-1/2 -translate-y-1/2 font-headline-sm text-headline-sm text-on-surface-variant">
            ₹
          </span>
          <input
            type="number"
            placeholder="Or enter custom amount"
            value={customVal}
            onChange={(e) => setCustomVal(e.target.value)}
            className="w-full h-11 pl-8 pr-3 rounded-xl bg-surface-container-lowest border border-surface-container-high text-on-surface font-headline-sm focus:outline-none focus:border-primary"
          />
        </div>

        {bonus > 0 && (
          <div className="p-2.5 rounded-xl bg-tertiary-fixed/30 text-on-tertiary-fixed flex items-center justify-between text-body-sm font-body-sm">
            <span className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-tertiary text-[18px]">redeem</span>
              <span>Bonus Farmstead Cash:</span>
            </span>
            <span className="font-bold text-tertiary">+₹{bonus} FREE</span>
          </div>
        )}

        {/* Payment Methods */}
        <div className="flex flex-col gap-2 pt-1">
          <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">
            Choose Payment Method
          </span>
          <div className="grid grid-cols-3 gap-2">
            <button
              type="button"
              onClick={() => setSelectedUpi('phonepe')}
              className={`p-2.5 rounded-xl border flex flex-col items-center gap-1 transition-all ${
                selectedUpi === 'phonepe'
                  ? 'border-primary bg-secondary-container/20 ring-1 ring-primary'
                  : 'border-surface-container-high bg-surface-container-lowest'
              }`}
            >
              <span className="w-8 h-8 rounded-full bg-[#5f259f]/10 text-[#5f259f] font-bold text-xs flex items-center justify-center">
                पे
              </span>
              <span className="font-label-sm text-label-sm text-on-surface">PhonePe</span>
            </button>

            <button
              type="button"
              onClick={() => setSelectedUpi('gpay')}
              className={`p-2.5 rounded-xl border flex flex-col items-center gap-1 transition-all ${
                selectedUpi === 'gpay'
                  ? 'border-primary bg-secondary-container/20 ring-1 ring-primary'
                  : 'border-surface-container-high bg-surface-container-lowest'
              }`}
            >
              <span className="w-8 h-8 rounded-full bg-[#4285F4]/10 text-[#4285F4] font-bold text-xs flex items-center justify-center">
                G
              </span>
              <span className="font-label-sm text-label-sm text-on-surface">Google Pay</span>
            </button>

            <button
              type="button"
              onClick={() => setSelectedUpi('paytm')}
              className={`p-2.5 rounded-xl border flex flex-col items-center gap-1 transition-all ${
                selectedUpi === 'paytm'
                  ? 'border-primary bg-secondary-container/20 ring-1 ring-primary'
                  : 'border-surface-container-high bg-surface-container-lowest'
              }`}
            >
              <span className="w-8 h-8 rounded-full bg-[#002e6e]/10 text-[#002e6e] font-bold text-xs flex items-center justify-center">
                P
              </span>
              <span className="font-label-sm text-label-sm text-on-surface">Paytm UPI</span>
            </button>
          </div>
        </div>

        <div className="pt-2 flex flex-col gap-2">
          <button
            disabled={isProcessing}
            onClick={handlePay}
            className="w-full h-12 rounded-full bg-primary text-white font-title-md text-title-md font-semibold flex items-center justify-center gap-2 shadow-md active:scale-98 transition-transform disabled:opacity-50"
          >
            {isProcessing ? (
              <span>Securing UPI Payment...</span>
            ) : (
              <>
                <span>Pay ₹{currentAmount.toLocaleString('en-IN')}</span>
                <span className="material-symbols-outlined text-[18px]">lock</span>
              </>
            )}
          </button>
          <span className="text-center font-body-sm text-body-sm text-on-surface-variant flex items-center justify-center gap-1">
            <span className="material-symbols-outlined text-[14px]">shield</span>
            100% Escrow Bank Protection • Instant Refundable
          </span>
        </div>
      </div>
    </div>
  );
};
