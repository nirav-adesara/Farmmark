/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { NavTab, BottomNav } from './components/BottomNav';
import { Header } from './components/Header';
import { LocationModal } from './components/LocationModal';
import { PurityKitModal } from './components/PurityKitModal';
import { RechargeModal } from './components/RechargeModal';
import { Toast } from './components/Toast';
import { VacationModal } from './components/VacationModal';
import {
  INITIAL_SUBSCRIPTIONS,
  INITIAL_TRANSACTIONS,
  INITIAL_USER,
  PRODUCTS,
  ASSETS,
} from './data/mockData';
import { AuthScreen } from './screens/AuthScreen';
import { HomeScreen } from './screens/HomeScreen';
import { ProductDetailScreen } from './screens/ProductDetailScreen';
import { ProductsCatalogScreen } from './screens/ProductsCatalogScreen';
import { SubscriptionsScreen } from './screens/SubscriptionsScreen';
import { WalletScreen } from './screens/WalletScreen';
import { Product, SubscriptionItem, LedgerTransaction, UserProfile } from './types';

export default function App() {
  // Navigation State
  const [activeTab, setActiveTab] = useState<NavTab>('home');
  const [activeScreen, setActiveScreen] = useState<'main' | 'product-detail' | 'auth'>('main');
  const [selectedProduct, setSelectedProduct] = useState<Product>(PRODUCTS[0]);
  const [catalogInitialCategory, setCatalogInitialCategory] = useState<string>('all');

  // User State
  const [user, setUser] = useState<UserProfile>(INITIAL_USER);
  const [subscriptions, setSubscriptions] = useState<SubscriptionItem[]>(INITIAL_SUBSCRIPTIONS);
  const [transactions, setTransactions] = useState<LedgerTransaction[]>(INITIAL_TRANSACTIONS);

  // Tomorrow delivery manifest items
  const [manifestItems, setManifestItems] = useState([
    {
      name: 'Farm Fresh Cow Milk',
      subtitle: '1 Litre Pouch • 4°C Insulated',
      price: 76,
      qty: 1,
      image: ASSETS.milkPouchManifest,
    },
    {
      name: 'Country Brown Eggs',
      subtitle: 'Pack of 6 • Free Range',
      price: 84,
      qty: 1,
      image: ASSETS.eggsManifest,
    },
  ]);

  const [isTomorrowPaused, setIsTomorrowPaused] = useState(false);

  // Modals state
  const [isLocationOpen, setIsLocationOpen] = useState(false);
  const [isVacationOpen, setIsVacationOpen] = useState(false);
  const [isPurityKitOpen, setIsPurityKitOpen] = useState(false);
  const [isRechargeOpen, setIsRechargeOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [rechargeInitialAmount, setRechargeInitialAmount] = useState(2000);

  // Toast state
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((curr) => (curr === msg ? null : curr));
    }, 2800);
  };

  // Handlers
  const handleSelectProduct = (prod: Product) => {
    setSelectedProduct(prod);
    setActiveScreen('product-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateToCatalog = (category?: string) => {
    if (category) setCatalogInitialCategory(category);
    setActiveTab('products');
    setActiveScreen('main');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAddManifestItem = (item: {
    name: string;
    subtitle: string;
    price: number;
    qty: number;
    image: string;
  }) => {
    setManifestItems((prev) => {
      const existingIdx = prev.findIndex((p) => p.name === item.name);
      if (existingIdx >= 0) {
        const copy = [...prev];
        copy[existingIdx].qty += 1;
        return copy;
      }
      return [...prev, item];
    });
  };

  const handleUpdateSubscription = (id: string, updates: Partial<SubscriptionItem>) => {
    setSubscriptions((prev) =>
      prev.map((sub) => (sub.id === id ? { ...sub, ...updates } : sub))
    );
  };

  const handleRechargeSuccess = (amount: number, bonus: number) => {
    const totalCredit = amount + bonus;
    const newBal = user.walletBalance + totalCredit;
    setUser((prev) => ({
      ...prev,
      walletBalance: newBal,
    }));

    const newTx: LedgerTransaction = {
      id: `tx-${Date.now()}`,
      title: 'Wallet Top-up via PhonePe UPI',
      subtitle: bonus > 0 ? `Includes +₹${bonus} Extra Farmstead Cash Promo` : 'Instant UPI Transfer',
      timestamp: 'Just now',
      orderId: `UPI Ref #${Math.floor(100000000 + Math.random() * 900000000)}`,
      amount: totalCredit,
      balanceAfter: newBal,
      type: 'topup',
    };

    setTransactions([newTx, ...transactions]);
    showToast(`Wallet credited with ₹${totalCredit.toLocaleString('en-IN')}! Balance: ₹${newBal.toLocaleString('en-IN')}`);
  };

  const handleStartSubscription = (plan: {
    product: Product;
    frequency: string;
    quantity: number;
    slot: 'morning' | 'evening';
    firstDate: string;
    monthlyCost: number;
  }) => {
    const newSub: SubscriptionItem = {
      id: `sub-${Date.now()}`,
      productId: plan.product.id,
      name: `${plan.product.name} (Fresh Daily)`,
      badge: plan.product.badge,
      image: plan.product.image,
      frequency:
        plan.frequency === 'daily'
          ? 'Every Day (Morning 7:00 AM)'
          : plan.frequency === 'alternate'
          ? 'Alternate Days (Morning 7:00 AM)'
          : 'Custom Scheduled Days',
      nextDrop: plan.firstDate,
      pricePerUnit: plan.product.price,
      unit: plan.product.size,
      quantity: plan.quantity,
      isPaused: false,
      isTomorrowSkipped: false,
      slot: plan.slot,
    };

    setSubscriptions([newSub, ...subscriptions]);
    setActiveTab('subscriptions');
    setActiveScreen('main');
  };

  const handleVacationConfirm = (fromDate: string, toDate: string) => {
    setIsVacationOpen(false);
    showToast(`Vacation pause activated from ${fromDate} to ${toDate}. Zero deliveries & zero deductions.`);
  };

  const handlePurityKitOrder = () => {
    setIsPurityKitOpen(false);
    showToast('Free Home Purity Kit added to your morning drop box!');
  };

  // Section title for Header
  const getSectionTitle = () => {
    if (activeScreen === 'product-detail') return 'Product Detail';
    if (activeTab === 'home') return 'Home';
    if (activeTab === 'subscriptions') return 'Subscriptions';
    if (activeTab === 'products') return 'Products';
    if (activeTab === 'wallet-vip') return 'Wallet / Vip';
    return 'Home';
  };

  // If user navigated to standalone Auth screen
  if (activeScreen === 'auth') {
    return (
      <div className="min-h-screen bg-surface flex justify-center">
        <div className="w-full max-w-md bg-surface shadow-2xl relative min-h-screen flex flex-col">
          <AuthScreen
            onSuccess={(ph) => {
              setUser((prev) => ({ ...prev, phone: ph }));
              setActiveScreen('main');
            }}
            onSkip={() => setActiveScreen('main')}
            onBack={() => setActiveScreen('main')}
            onShowToast={showToast}
          />
          <Toast message={toastMessage} onClose={() => setToastMessage(null)} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-surface flex justify-center">
      <div className="w-full max-w-md bg-surface shadow-2xl relative min-h-screen flex flex-col">
        {/* Top Header (shown on main tabs) */}
        {activeScreen === 'main' && (
          <Header
            currentSection={getSectionTitle()}
            address={user.address}
            onOpenLocation={() => setIsLocationOpen(true)}
            onOpenNotifications={() => setIsNotificationsOpen(true)}
            onOpenProfile={() => setActiveScreen('auth')}
          />
        )}

        {/* Main View Area */}
        <main
          className={`flex-1 flex flex-col ${
            activeScreen === 'main' ? 'pt-20 pb-20' : ''
          }`}
        >
          {activeScreen === 'product-detail' ? (
            <ProductDetailScreen
              product={selectedProduct}
              onBack={() => setActiveScreen('main')}
              onStartSubscription={handleStartSubscription}
              onOrderTrial={(prod) => {
                handleAddManifestItem({
                  name: `${prod.name} (Trial)`,
                  subtitle: '500ml Bottle • Morning Sample',
                  price: prod.trialPrice || 42,
                  qty: 1,
                  image: prod.image,
                });
              }}
              onOpenPurityKitModal={() => setIsPurityKitOpen(true)}
              onShowToast={showToast}
            />
          ) : activeTab === 'home' ? (
            <HomeScreen
              onSelectProduct={handleSelectProduct}
              onNavigateToCatalog={handleNavigateToCatalog}
              onOpenPurityKitModal={() => setIsPurityKitOpen(true)}
              onShowToast={showToast}
              isTomorrowPaused={isTomorrowPaused}
              onTogglePauseTomorrow={() => setIsTomorrowPaused(!isTomorrowPaused)}
              manifestItems={manifestItems}
              onAddManifestItem={handleAddManifestItem}
            />
          ) : activeTab === 'subscriptions' ? (
            <SubscriptionsScreen
              subscriptions={subscriptions}
              onUpdateSubscription={handleUpdateSubscription}
              onOpenVacationModal={() => setIsVacationOpen(true)}
              onOpenRechargeModal={() => {
                setRechargeInitialAmount(2000);
                setIsRechargeOpen(true);
              }}
              onOpenAddNewItem={() => {
                setActiveTab('products');
              }}
              onShowToast={showToast}
              walletBalance={user.walletBalance}
            />
          ) : activeTab === 'products' ? (
            <ProductsCatalogScreen
              initialCategory={catalogInitialCategory}
              onSelectProduct={handleSelectProduct}
              onAddOnce={(prod) => {
                handleAddManifestItem({
                  name: prod.name,
                  subtitle: `${prod.size} • Fresh Drop`,
                  price: prod.price,
                  qty: 1,
                  image: prod.image,
                });
              }}
              onSubscribe={handleSelectProduct}
              onShowToast={showToast}
            />
          ) : (
            <WalletScreen
              balance={user.walletBalance}
              autoRecharge={user.autoRecharge}
              onToggleAutoRecharge={(val) => setUser((u) => ({ ...u, autoRecharge: val }))}
              transactions={transactions}
              onOpenRechargeModal={(amt) => {
                if (amt) setRechargeInitialAmount(amt);
                setIsRechargeOpen(true);
              }}
              onOpenPurityKitModal={() => setIsPurityKitOpen(true)}
              onShowToast={showToast}
            />
          )}
        </main>

        {/* Bottom Navigation */}
        {activeScreen === 'main' && (
          <BottomNav
            activeTab={activeTab}
            onTabChange={(tab) => {
              setActiveTab(tab);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            activeSubscriptionsCount={subscriptions.filter((s) => !s.isPaused).length}
          />
        )}

        {/* Modals & Dialogs */}
        <LocationModal
          isOpen={isLocationOpen}
          currentAddress={user.address}
          onSelectAddress={(addr) => {
            setUser((prev) => ({ ...prev, address: addr }));
            showToast(`Delivery location set to: ${addr}`);
          }}
          onClose={() => setIsLocationOpen(false)}
        />

        <VacationModal
          isOpen={isVacationOpen}
          onConfirm={handleVacationConfirm}
          onClose={() => setIsVacationOpen(false)}
        />

        <PurityKitModal
          isOpen={isPurityKitOpen}
          onOrderKit={handlePurityKitOrder}
          onClose={() => setIsPurityKitOpen(false)}
        />

        <RechargeModal
          isOpen={isRechargeOpen}
          initialAmount={rechargeInitialAmount}
          onSuccess={handleRechargeSuccess}
          onClose={() => setIsRechargeOpen(false)}
        />

        {/* Notifications Slide-Over Drawer */}
        {isNotificationsOpen && (
          <div className="fixed inset-0 z-50 bg-[#2b322d]/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in duration-200">
            <div className="w-full max-w-md bg-surface rounded-t-2xl sm:rounded-2xl p-space-lg flex flex-col gap-space-md shadow-2xl max-h-[85vh] overflow-y-auto no-scrollbar">
              <div className="flex items-center justify-between pb-1 border-b border-surface-container-high">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary text-[22px]">notifications</span>
                  <h3 className="font-headline-sm text-headline-sm text-on-surface">Farmstead Updates</h3>
                </div>
                <button
                  onClick={() => setIsNotificationsOpen(false)}
                  className="w-9 h-9 rounded-full flex items-center justify-center text-on-surface-variant hover:bg-surface-container"
                >
                  <span className="material-symbols-outlined text-[20px]">close</span>
                </button>
              </div>

              <div className="flex flex-col gap-2">
                <div className="p-3 rounded-xl bg-surface-container-lowest border border-surface-container-high flex gap-3">
                  <div className="w-9 h-9 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-[18px]">verified</span>
                  </div>
                  <div className="flex flex-col min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="font-label-lg text-label-lg font-bold text-on-surface">Batch #849 Certified Pure</span>
                      <span className="font-body-sm text-body-sm text-outline">5:30 AM</span>
                    </div>
                    <span className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">
                      Gir Cow milk tanker arrived at micro-chilling hub. Fat 4.2%, SNF 8.9%, zero adulterants detected.
                    </span>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-surface-container-lowest border border-surface-container-high flex gap-3">
                  <div className="w-9 h-9 rounded-full bg-primary-fixed text-on-primary-fixed flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-[18px]">wb_twilight</span>
                  </div>
                  <div className="flex flex-col min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="font-label-lg text-label-lg font-bold text-on-surface">Tomorrow's Drop Scheduled</span>
                      <span className="font-body-sm text-body-sm text-outline">Yesterday</span>
                    </div>
                    <span className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">
                      Your insulated doorstep bag will arrive before 7:00 AM with 1L Cow Milk & 6 Farm Eggs.
                    </span>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-surface-container-lowest border border-surface-container-high flex gap-3">
                  <div className="w-9 h-9 rounded-full bg-tertiary-fixed text-on-tertiary-fixed flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-[18px]">account_balance_wallet</span>
                  </div>
                  <div className="flex flex-col min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="font-label-lg text-label-lg font-bold text-on-surface">Prepaid Balance Healthy</span>
                      <span className="font-body-sm text-body-sm text-outline">2 days ago</span>
                    </div>
                    <span className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">
                      Farm wallet holds ₹1,450.00 — sufficient for ~19 days of morning drops.
                    </span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => {
                  setIsNotificationsOpen(false);
                  showToast('All notifications marked as read');
                }}
                className="w-full py-2.5 rounded-xl bg-surface-container-high text-on-surface font-label-md font-semibold"
              >
                Mark All as Read
              </button>
            </div>
          </div>
        )}

        {/* Global Toast */}
        <Toast message={toastMessage} onClose={() => setToastMessage(null)} />
      </div>
    </div>
  );
}
