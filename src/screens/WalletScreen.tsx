import React, { useState } from 'react';
import { ASSETS } from '../data/mockData';
import { LedgerTransaction } from '../types';

interface WalletScreenProps {
  balance: number;
  autoRecharge: boolean;
  onToggleAutoRecharge: (val: boolean) => void;
  transactions: LedgerTransaction[];
  onOpenRechargeModal: (amount?: number) => void;
  onOpenPurityKitModal: () => void;
  onShowToast: (msg: string) => void;
}

export const WalletScreen: React.FC<WalletScreenProps> = ({
  balance,
  autoRecharge,
  onToggleAutoRecharge,
  transactions,
  onOpenRechargeModal,
  onOpenPurityKitModal,
  onShowToast,
}) => {
  const [customAmount, setCustomAmount] = useState<string>('');
  const [showInvoiceDownloaded, setShowInvoiceDownloaded] = useState(false);

  const daysSufficient = Math.round(balance / 76);

  const handleCustomProceed = () => {
    const val = Number(customAmount);
    if (!val || val <= 0) {
      onShowToast('Please enter a valid amount');
      return;
    }
    onOpenRechargeModal(val);
  };

  const handleDownloadInvoice = () => {
    setShowInvoiceDownloaded(true);
    onShowToast('GST Tax Invoice PDF for Oct 2026 downloaded');
    setTimeout(() => setShowInvoiceDownloaded(false), 3000);
  };

  return (
    <div className="flex flex-col w-full pb-8">
      <div className="px-margin pt-space-md flex flex-col gap-space-lg">
        {/* Prepaid Milk Ledger Card */}
        <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-primary via-primary-container to-secondary text-on-primary p-space-lg shadow-lg">
          <div className="absolute -right-8 -top-8 w-36 h-36 rounded-full bg-surface-container-lowest/10 blur-2xl pointer-events-none"></div>
          <div className="absolute right-4 bottom-2 opacity-10 pointer-events-none">
            <span className="material-symbols-outlined text-[108px] text-on-primary">
              account_balance_wallet
            </span>
          </div>

          <div className="relative z-10 flex flex-col gap-space-md">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-space-xs">
                <span className="material-symbols-outlined text-primary-fixed text-[18px]">
                  verified_user
                </span>
                <span className="font-label-md text-label-md uppercase tracking-wider text-primary-fixed">
                  Prepaid Milk Ledger
                </span>
              </div>
              <span className="inline-flex items-center gap-1 px-space-sm py-0.5 rounded-full bg-primary-fixed/20 text-primary-fixed font-label-sm text-label-sm backdrop-blur-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-primary-fixed animate-pulse"></span>
                Active Run
              </span>
            </div>

            <div>
              <div className="flex items-baseline gap-space-xs">
                <span className="font-display-lg text-display-lg tracking-tight text-on-primary font-bold">
                  ₹{balance.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                </span>
              </div>
              <p className="font-body-sm text-body-sm text-on-primary-container flex items-center gap-1 mt-0.5">
                <span className="material-symbols-outlined text-[15px]">eco</span>
                Sufficient for ~{daysSufficient} days of morning deliveries
              </p>
            </div>

            {/* Auto-Recharge Switcher */}
            <div className="p-space-sm rounded-lg bg-surface-container-lowest/10 backdrop-blur-md flex items-center justify-between gap-space-sm">
              <div className="flex items-center gap-space-sm min-w-0">
                <div className="w-8 h-8 rounded-full bg-primary-fixed/20 flex items-center justify-center shrink-0 text-primary-fixed">
                  <span className="material-symbols-outlined text-[18px]">autorenew</span>
                </div>
                <div className="min-w-0">
                  <div className="font-title-md text-title-md text-on-primary truncate">
                    Auto-Recharge Active
                  </div>
                  <div className="font-body-sm text-body-sm text-on-primary-container truncate">
                    Triggers ₹1,000 via UPI when balance &lt; ₹300
                  </div>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer shrink-0">
                <input
                  type="checkbox"
                  checked={autoRecharge}
                  onChange={(e) => {
                    onToggleAutoRecharge(e.target.checked);
                    onShowToast(
                      e.target.checked ? 'Auto-Recharge activated' : 'Auto-Recharge paused'
                    );
                  }}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-surface-variant/40 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-secondary-container"></div>
              </label>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-space-sm pt-1">
              <button
                onClick={() => onOpenRechargeModal(2000)}
                className="flex-1 h-12 rounded-full bg-primary-fixed text-on-primary-fixed font-title-md text-title-md flex items-center justify-center gap-space-xs shadow-md active:scale-[0.98] transition-all font-semibold"
              >
                <span className="material-symbols-outlined text-[20px]">bolt</span>
                Instant Recharge
              </button>
              <button
                onClick={() => {
                  const el = document.getElementById('passbook-section');
                  el?.scrollIntoView({ behavior: 'smooth' });
                  onShowToast('Jumped to Passbook Ledger');
                }}
                className="h-12 px-space-md rounded-full bg-surface-container-lowest/15 text-on-primary font-title-md text-title-md flex items-center justify-center gap-1 active:scale-[0.98] transition-all"
              >
                <span className="material-symbols-outlined text-[18px]">receipt_long</span>
                Passbook
              </button>
            </div>
          </div>
        </div>

        {/* Farmstead VIP Gold Card */}
        <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-tertiary via-tertiary-container to-tertiary p-space-lg text-on-tertiary shadow-md">
          <div className="flex items-start justify-between gap-space-sm mb-space-sm">
            <div className="flex items-center gap-space-sm">
              <div className="w-10 h-10 rounded-full bg-tertiary-fixed text-on-tertiary-fixed flex items-center justify-center shadow-inner">
                <span
                  className="material-symbols-outlined text-[24px]"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  shield
                </span>
              </div>
              <div>
                <div className="flex items-center gap-space-xs">
                  <span className="font-headline-sm text-headline-sm font-bold text-tertiary-fixed">
                    Farmstead VIP Gold
                  </span>
                  <span
                    className="material-symbols-outlined text-tertiary-fixed text-[16px]"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    verified
                  </span>
                </div>
                <div className="font-body-sm text-body-sm text-on-tertiary-container">
                  Member #FP-9942 • Renews in 78 days
                </div>
              </div>
            </div>
            <span className="px-space-xs py-1 rounded-full bg-tertiary-fixed/20 text-tertiary-fixed font-label-sm text-label-sm uppercase font-bold">
              Active Pass
            </span>
          </div>

          <div className="grid grid-cols-2 gap-space-sm pt-space-xs">
            <div className="p-space-sm rounded-lg bg-surface-container-lowest/10 backdrop-blur-sm flex items-start gap-space-xs">
              <span className="material-symbols-outlined text-tertiary-fixed text-[18px] shrink-0">
                percent
              </span>
              <div className="min-w-0">
                <div className="font-label-lg text-label-lg text-on-tertiary font-semibold">Flat 5% Off</div>
                <div className="font-body-sm text-body-sm text-on-tertiary-container">
                  All fresh dairy items
                </div>
              </div>
            </div>
            <div className="p-space-sm rounded-lg bg-surface-container-lowest/10 backdrop-blur-sm flex items-start gap-space-xs">
              <span className="material-symbols-outlined text-tertiary-fixed text-[18px] shrink-0">
                electric_moped
              </span>
              <div className="min-w-0">
                <div className="font-label-lg text-label-lg text-on-tertiary font-semibold">Zero Delivery Fee</div>
                <div className="font-body-sm text-body-sm text-on-tertiary-container">
                  No minimum cart size
                </div>
              </div>
            </div>
            <div className="p-space-sm rounded-lg bg-surface-container-lowest/10 backdrop-blur-sm flex items-start gap-space-xs">
              <span className="material-symbols-outlined text-tertiary-fixed text-[18px] shrink-0">
                wb_twilight
              </span>
              <div className="min-w-0">
                <div className="font-label-lg text-label-lg text-on-tertiary font-semibold">Priority 6:30 AM</div>
                <div className="font-body-sm text-body-sm text-on-tertiary-container">
                  Sunrise guaranteed ring
                </div>
              </div>
            </div>
            <div className="p-space-sm rounded-lg bg-surface-container-lowest/10 backdrop-blur-sm flex items-start gap-space-xs">
              <span className="material-symbols-outlined text-tertiary-fixed text-[18px] shrink-0">
                biotech
              </span>
              <div className="min-w-0">
                <div className="font-label-lg text-label-lg text-on-tertiary font-semibold">Quarterly Lab Kit</div>
                <div className="font-body-sm text-body-sm text-on-tertiary-container">
                  DIY purity strip box
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Recharge Cash-Back Offers */}
        <div className="flex flex-col gap-space-sm">
          <div className="flex items-center justify-between">
            <h2 className="font-headline-sm text-headline-sm text-on-surface">Recharge Cash-Back Offers</h2>
            <span className="inline-flex items-center gap-1 font-label-md text-label-md text-secondary font-bold">
              <span className="material-symbols-outlined text-[14px]">local_fire_department</span>
              Guaranteed Bonus
            </span>
          </div>

          <div className="grid grid-cols-1 gap-space-sm">
            {/* Plan 1: 2,000 */}
            <div
              onClick={() => onOpenRechargeModal(2000)}
              className="relative p-space-md rounded-xl bg-surface-container-lowest shadow-sm flex items-center justify-between cursor-pointer transition-all hover:shadow-md border border-transparent hover:border-primary/20"
            >
              <div className="flex items-start gap-space-sm min-w-0">
                <div className="w-10 h-10 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center shrink-0 mt-0.5">
                  <span className="material-symbols-outlined text-[20px]">currency_rupee</span>
                </div>
                <div className="flex flex-col min-w-0">
                  <div className="flex items-center gap-space-xs">
                    <span className="font-headline-sm text-headline-sm text-on-surface font-bold">₹2,000</span>
                    <span className="px-space-xs py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed-variant font-label-sm text-label-sm font-bold">
                      Most Popular
                    </span>
                  </div>
                  <span className="font-label-lg text-label-lg text-secondary font-bold mt-0.5">
                    + ₹200 Extra Farmstead Cash
                  </span>
                  <span className="font-body-sm text-body-sm text-on-surface-variant">
                    Sufficient for 26 days of Pure A2 Cow Milk
                  </span>
                </div>
              </div>
              <button className="px-space-md h-9 rounded-full bg-primary text-on-primary font-label-lg text-label-lg shrink-0 font-semibold shadow-sm">
                Select
              </button>
            </div>

            {/* Plan 2: 4,000 */}
            <div
              onClick={() => onOpenRechargeModal(4000)}
              className="relative p-space-md rounded-xl bg-surface-container-lowest shadow-sm flex items-center justify-between cursor-pointer transition-all hover:shadow-md border border-transparent hover:border-tertiary/20"
            >
              <div className="flex items-start gap-space-sm min-w-0">
                <div className="w-10 h-10 rounded-full bg-tertiary-fixed text-on-tertiary-fixed flex items-center justify-center shrink-0 mt-0.5">
                  <span
                    className="material-symbols-outlined text-[20px]"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    workspace_premium
                  </span>
                </div>
                <div className="flex flex-col min-w-0">
                  <div className="flex items-center gap-space-xs">
                    <span className="font-headline-sm text-headline-sm text-on-surface font-bold">₹4,000</span>
                    <span className="px-space-xs py-0.5 rounded-full bg-tertiary-fixed text-on-tertiary-fixed font-label-sm text-label-sm font-bold">
                      Bumper Value
                    </span>
                  </div>
                  <span className="font-label-lg text-label-lg text-tertiary font-bold mt-0.5">
                    + ₹500 Extra + 1 Mo Free VIP Pass
                  </span>
                  <span className="font-body-sm text-body-sm text-on-surface-variant">
                    Best for households consuming Milk, Paneer &amp; Eggs
                  </span>
                </div>
              </div>
              <button className="px-space-md h-9 rounded-full bg-primary text-on-primary font-label-lg text-label-lg shrink-0 font-semibold shadow-sm">
                Select
              </button>
            </div>

            {/* Plan 3: 1,000 */}
            <div
              onClick={() => onOpenRechargeModal(1000)}
              className="relative p-space-md rounded-xl bg-surface-container-lowest shadow-sm flex items-center justify-between cursor-pointer transition-all hover:shadow-md border border-transparent"
            >
              <div className="flex items-start gap-space-sm min-w-0">
                <div className="w-10 h-10 rounded-full bg-surface-container-high text-on-surface-variant flex items-center justify-center shrink-0 mt-0.5">
                  <span className="material-symbols-outlined text-[20px]">savings</span>
                </div>
                <div className="flex flex-col min-w-0">
                  <div className="flex items-center gap-space-xs">
                    <span className="font-headline-sm text-headline-sm text-on-surface font-bold">₹1,000</span>
                  </div>
                  <span className="font-label-lg text-label-lg text-secondary font-bold mt-0.5">
                    + ₹75 Extra Farmstead Cash
                  </span>
                  <span className="font-body-sm text-body-sm text-on-surface-variant">
                    Quick weekly top-up balance
                  </span>
                </div>
              </div>
              <button className="px-space-md h-9 rounded-full bg-surface-container-high text-on-surface font-label-lg text-label-lg shrink-0 font-semibold">
                Select
              </button>
            </div>
          </div>

          {/* Custom amount card */}
          <div className="mt-space-xs p-space-md rounded-xl bg-surface-container-low flex flex-col gap-space-xs">
            <label className="font-label-lg text-label-lg text-on-surface font-semibold" htmlFor="customAmount">
              Or enter custom amount
            </label>
            <div className="flex items-center gap-space-sm">
              <div className="relative flex-1">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 font-headline-sm text-headline-sm text-on-surface-variant">
                  ₹
                </span>
                <input
                  className="w-full h-11 pl-8 pr-3 rounded-lg bg-surface-container-lowest text-on-surface font-headline-sm text-headline-sm focus:outline-none focus:ring-1 focus:ring-primary"
                  id="customAmount"
                  placeholder="e.g. 1,500"
                  type="number"
                  value={customAmount}
                  onChange={(e) => setCustomAmount(e.target.value)}
                />
              </div>
              <button
                onClick={handleCustomProceed}
                className="h-11 px-space-md rounded-lg bg-primary text-on-primary font-title-md text-title-md active:scale-95 transition-transform font-semibold shadow-sm"
              >
                Proceed
              </button>
            </div>
            <span className="font-body-sm text-body-sm text-on-surface-variant">
              Supported via UPI, Google Pay, PhonePe, Cards &amp; NetBanking
            </span>
          </div>
        </div>

        {/* Free DIY Milk Purity Test Kit Card */}
        <div className="rounded-xl bg-surface-container-lowest p-space-md shadow-sm flex flex-col gap-space-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-space-xs">
              <div className="w-7 h-7 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center">
                <span className="material-symbols-outlined text-[16px]">science</span>
              </div>
              <span className="font-title-md text-title-md text-on-surface font-bold">
                Free DIY Milk Purity Test Kit
              </span>
            </div>
            <span className="px-space-xs py-0.5 rounded-full bg-secondary-container text-on-secondary-container font-label-sm text-label-sm font-bold">
              Delivered
            </span>
          </div>

          <div className="flex gap-space-md items-center">
            <img
              className="w-20 h-20 rounded-lg object-cover shrink-0"
              alt="Milk Purity Testing Kit"
              src={ASSETS.walletPurityKit}
            />
            <div className="flex flex-col min-w-0">
              <p className="font-body-sm text-body-sm text-on-surface-variant">
                Batch #420 delivered with your milk on Tuesday. Test your daily milk at your kitchen table with 3 easy strips.
              </p>
              <div className="flex flex-wrap items-center gap-1 mt-space-xs">
                <span className="px-space-xs py-0.5 rounded bg-surface-container-high text-on-surface font-label-sm text-label-sm font-semibold">
                  ✓ Starch Zero
                </span>
                <span className="px-space-xs py-0.5 rounded bg-surface-container-high text-on-surface font-label-sm text-label-sm font-semibold">
                  ✓ Detergent Free
                </span>
                <span className="px-space-xs py-0.5 rounded bg-surface-container-high text-on-surface font-label-sm text-label-sm font-semibold">
                  ✓ Urea Neg
                </span>
              </div>
            </div>
          </div>

          <div className="pt-space-xs flex items-center justify-between border-t border-surface-container-high">
            <button
              onClick={onOpenPurityKitModal}
              className="font-label-lg text-label-lg text-primary flex items-center gap-1 font-semibold hover:underline"
            >
              <span className="material-symbols-outlined text-[16px]">play_circle</span>
              Watch 45-Sec Test Video
            </button>
            <button
              onClick={() => {
                onShowToast('Next quarter purity kit queued with your Nov 1st order.');
              }}
              className="font-label-lg text-label-lg text-on-surface-variant flex items-center gap-1 hover:text-primary"
            >
              Request Next Kit
              <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
            </button>
          </div>
        </div>

        {/* Passbook Ledger */}
        <div id="passbook-section" className="flex flex-col gap-space-sm">
          <div className="flex items-center justify-between">
            <h2 className="font-headline-sm text-headline-sm text-on-surface">Passbook Ledger</h2>
            <button
              onClick={handleDownloadInvoice}
              className="font-label-lg text-label-lg text-primary font-semibold hover:underline"
            >
              {showInvoiceDownloaded ? 'Downloaded ✓' : 'Download GST Invoice'}
            </button>
          </div>

          <div className="rounded-xl bg-surface-container-lowest p-space-sm shadow-sm flex flex-col gap-space-xs">
            {transactions.map((tx, idx) => (
              <React.Fragment key={tx.id}>
                {idx > 0 && <div className="h-[1px] bg-surface-container-high mx-2"></div>}
                <div className="p-space-sm rounded-lg hover:bg-surface-container-low transition-colors flex items-center justify-between gap-space-sm">
                  <div className="flex items-center gap-space-sm min-w-0">
                    <div
                      className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 ${
                        tx.type === 'topup'
                          ? 'bg-secondary-container text-on-secondary-container'
                          : 'bg-surface-container-high text-on-surface-variant'
                      }`}
                    >
                      <span className="material-symbols-outlined text-[18px]">
                        {tx.type === 'topup' ? 'arrow_downward' : 'local_shipping'}
                      </span>
                    </div>
                    <div className="min-w-0">
                      <div className="font-title-md text-title-md text-on-surface truncate">
                        {tx.title}
                      </div>
                      <div
                        className={`font-body-sm text-body-sm truncate ${
                          tx.type === 'topup' ? 'text-secondary font-medium' : 'text-on-surface-variant'
                        }`}
                      >
                        {tx.subtitle}
                      </div>
                      <div className="font-body-sm text-body-sm text-outline text-[11px]">
                        {tx.timestamp} • {tx.orderId}
                      </div>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <span
                      className={`font-title-md text-title-md ${
                        tx.type === 'topup' ? 'text-secondary font-bold' : 'text-on-surface font-semibold'
                      }`}
                    >
                      {tx.type === 'topup' ? `+ ₹${tx.amount.toLocaleString('en-IN', { minimumFractionDigits: 2 })}` : `- ₹${Math.abs(tx.amount).toFixed(2)}`}
                    </span>
                    <div className="font-body-sm text-body-sm text-outline text-[11px]">
                      Bal: ₹{tx.balanceAfter.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                    </div>
                  </div>
                </div>
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* 100% Escrow Bank Protection */}
        <div className="p-space-md rounded-xl bg-surface-container flex items-center gap-space-md">
          <div className="w-10 h-10 rounded-full bg-surface-container-lowest flex items-center justify-center text-primary shrink-0 shadow-sm">
            <span className="material-symbols-outlined text-[22px]">lock</span>
          </div>
          <div className="flex flex-col min-w-0">
            <span className="font-title-md text-title-md text-on-surface font-bold">
              100% Escrow Bank Protection
            </span>
            <span className="font-body-sm text-body-sm text-on-surface-variant">
              Refund wallet balance anytime back to original bank source with single tap. No questions asked.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
