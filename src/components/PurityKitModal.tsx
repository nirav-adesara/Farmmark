import React, { useState } from 'react';
import { ASSETS } from '../data/mockData';

interface PurityKitModalProps {
  isOpen: boolean;
  onOrderKit: () => void;
  onClose: () => void;
}

export const PurityKitModal: React.FC<PurityKitModalProps> = ({
  isOpen,
  onOrderKit,
  onClose,
}) => {
  const [activeTab, setActiveTab] = useState<'video' | 'strips'>('strips');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-[#2b322d]/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in duration-200">
      <div className="w-full max-w-md bg-surface rounded-t-2xl sm:rounded-2xl p-space-lg flex flex-col gap-space-md shadow-2xl max-h-[90vh] overflow-y-auto no-scrollbar">
        <div className="flex items-center justify-between pb-1 border-b border-surface-container-high">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center">
              <span className="material-symbols-outlined text-[18px]">science</span>
            </div>
            <div>
              <h3 className="font-headline-sm text-headline-sm text-on-surface">Home Milk Purity Kit</h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant">Zero Adulteration Guarantee</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full flex items-center justify-center text-on-surface-variant hover:bg-surface-container"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="grid grid-cols-2 p-1 bg-surface-container-low rounded-xl">
          <button
            onClick={() => setActiveTab('strips')}
            className={`py-2 rounded-lg font-label-md text-label-md transition-all ${
              activeTab === 'strips'
                ? 'bg-primary text-white font-bold shadow-sm'
                : 'text-on-surface-variant font-medium'
            }`}
          >
            3 Rapid Tests
          </button>
          <button
            onClick={() => setActiveTab('video')}
            className={`py-2 rounded-lg font-label-md text-label-md transition-all ${
              activeTab === 'video'
                ? 'bg-primary text-white font-bold shadow-sm'
                : 'text-on-surface-variant font-medium'
            }`}
          >
            45-Sec Video Demo
          </button>
        </div>

        {activeTab === 'strips' ? (
          <div className="flex flex-col gap-3">
            <div className="rounded-xl overflow-hidden bg-surface-container-lowest border border-surface-container-high p-3 flex gap-3 items-center">
              <img
                src={ASSETS.walletPurityKit}
                alt="Kit"
                className="w-20 h-20 rounded-lg object-cover shrink-0"
              />
              <div className="flex flex-col min-w-0">
                <span className="font-title-md text-title-md text-on-surface">Farmstead Lab Strips (5x)</span>
                <span className="font-body-sm text-body-sm text-on-surface-variant">
                  Hospital-grade reagent paper that detects synthetic adulterants within 30 seconds.
                </span>
              </div>
            </div>

            <div className="space-y-2">
              <div className="p-3 rounded-xl bg-surface-container-lowest border border-surface-container-high flex items-start gap-2.5">
                <span className="w-6 h-6 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center font-bold text-xs shrink-0">1</span>
                <div>
                  <h4 className="font-label-lg text-label-lg text-on-surface font-bold">Starch & Flour Indicator</h4>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">Add 2 drops of Iodine strip reagent. Turns deep blue/purple if adulterated with cheap starches.</p>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-surface-container-lowest border border-surface-container-high flex items-start gap-2.5">
                <span className="w-6 h-6 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center font-bold text-xs shrink-0">2</span>
                <div>
                  <h4 className="font-label-lg text-label-lg text-on-surface font-bold">Detergent & Soap Sensor</h4>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">Bromocresol purple strip tests pH and alkaline salts. Farmstead milk tests negative (light yellow hue).</p>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-surface-container-lowest border border-surface-container-high flex items-start gap-2.5">
                <span className="w-6 h-6 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center font-bold text-xs shrink-0">3</span>
                <div>
                  <h4 className="font-label-lg text-label-lg text-on-surface font-bold">Urea & Chemical Nitrogen</h4>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">DMAB reagent pad detects added non-protein nitrogen used artificially to mimic SNF.</p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            <div className="relative aspect-video rounded-xl overflow-hidden bg-black flex items-center justify-center">
              <img
                src={ASSETS.authHeroBanner}
                alt="Video poster"
                className="w-full h-full object-cover opacity-70"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
              <div className="absolute flex flex-col items-center gap-2">
                <div className="w-14 h-14 rounded-full bg-primary/90 text-white flex items-center justify-center shadow-lg transform hover:scale-105 transition-transform cursor-pointer">
                  <span className="material-symbols-outlined text-[32px]">play_arrow</span>
                </div>
                <span className="text-white text-xs font-semibold px-2 py-1 rounded bg-black/50 backdrop-blur-sm">
                  Testing Farmstead milk in 3 easy steps
                </span>
              </div>
            </div>
            <p className="font-body-sm text-body-sm text-on-surface-variant text-center">
              Learn how our subscribers test their morning milk delivery right on their kitchen breakfast table.
            </p>
          </div>
        )}

        <div className="pt-2 flex gap-2">
          <button
            onClick={() => {
              onOrderKit();
              onClose();
            }}
            className="flex-1 py-3 rounded-full bg-primary text-white font-title-md text-title-md font-semibold flex items-center justify-center gap-1.5 shadow-md active:scale-98 transition-transform"
          >
            <span className="material-symbols-outlined text-[18px]">redeem</span>
            <span>Order Free Testing Kit</span>
          </button>
        </div>
      </div>
    </div>
  );
};
