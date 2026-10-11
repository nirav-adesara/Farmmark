import React from 'react';

export type NavTab = 'home' | 'subscriptions' | 'products' | 'wallet-vip';

interface BottomNavProps {
  activeTab: NavTab;
  onTabChange: (tab: NavTab) => void;
  activeSubscriptionsCount?: number;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  activeTab,
  onTabChange,
  activeSubscriptionsCount = 2,
}) => {
  return (
    <nav className="fixed bottom-0 inset-x-0 z-40 bg-surface/90 backdrop-blur-xl shadow-[0_-2px_12px_rgba(11,102,57,0.06)] border-t border-surface-container-high/60">
      <div className="flex justify-around items-center h-16 px-space-xs max-w-md mx-auto">
        {/* Home */}
        <button
          onClick={() => onTabChange('home')}
          className={`flex flex-col items-center justify-center min-w-[56px] min-h-[44px] gap-0.5 transition-colors ${
            activeTab === 'home'
              ? 'text-primary font-bold'
              : 'text-on-surface-variant hover:text-primary'
          }`}
        >
          <span
            className="material-symbols-outlined text-[22px]"
            style={activeTab === 'home' ? { fontVariationSettings: "'FILL' 1" } : undefined}
          >
            home
          </span>
          <span className="font-label-md text-label-md">Home</span>
        </button>

        {/* Subscriptions */}
        <button
          onClick={() => onTabChange('subscriptions')}
          className={`flex flex-col items-center justify-center min-w-[56px] min-h-[44px] gap-0.5 transition-colors relative ${
            activeTab === 'subscriptions'
              ? 'text-primary font-bold'
              : 'text-on-surface-variant hover:text-primary'
          }`}
        >
          <span
            className="material-symbols-outlined text-[22px]"
            style={activeTab === 'subscriptions' ? { fontVariationSettings: "'FILL' 1" } : undefined}
          >
            calendar_month
          </span>
          <span className="font-label-md text-label-md">Subscriptions</span>
          {activeSubscriptionsCount > 0 && (
            <span className="absolute top-1 right-2.5 w-4 h-4 rounded-full bg-primary text-white text-[9px] font-bold flex items-center justify-center">
              {activeSubscriptionsCount}
            </span>
          )}
        </button>

        {/* Products */}
        <button
          onClick={() => onTabChange('products')}
          className={`flex flex-col items-center justify-center min-w-[56px] min-h-[44px] gap-0.5 transition-colors ${
            activeTab === 'products'
              ? 'text-primary font-bold'
              : 'text-on-surface-variant hover:text-primary'
          }`}
        >
          <span
            className="material-symbols-outlined text-[22px]"
            style={activeTab === 'products' ? { fontVariationSettings: "'FILL' 1" } : undefined}
          >
            storefront
          </span>
          <span className="font-label-md text-label-md">Products</span>
        </button>

        {/* Wallet / VIP */}
        <button
          onClick={() => onTabChange('wallet-vip')}
          className={`flex flex-col items-center justify-center min-w-[56px] min-h-[44px] gap-0.5 transition-colors ${
            activeTab === 'wallet-vip'
              ? 'text-primary font-bold'
              : 'text-on-surface-variant hover:text-primary'
          }`}
        >
          <span
            className="material-symbols-outlined text-[22px]"
            style={activeTab === 'wallet-vip' ? { fontVariationSettings: "'FILL' 1" } : undefined}
          >
            account_balance_wallet
          </span>
          <span className="font-label-md text-label-md">Wallet / VIP</span>
        </button>
      </div>
    </nav>
  );
};
