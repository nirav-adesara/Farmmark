import React, { useState, useEffect } from 'react';
import { ASSETS, PRODUCTS } from '../data/mockData';
import { Product } from '../types';

interface HomeScreenProps {
  onSelectProduct: (product: Product) => void;
  onNavigateToCatalog: (category?: string) => void;
  onOpenPurityKitModal: () => void;
  onShowToast: (msg: string) => void;
  isTomorrowPaused: boolean;
  onTogglePauseTomorrow: () => void;
  manifestItems: { name: string; subtitle: string; price: number; qty: number; image: string }[];
  onAddManifestItem: (item: { name: string; subtitle: string; price: number; qty: number; image: string }) => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  onSelectProduct,
  onNavigateToCatalog,
  onOpenPurityKitModal,
  onShowToast,
  isTomorrowPaused,
  onTogglePauseTomorrow,
  manifestItems,
  onAddManifestItem,
}) => {
  // Live Countdown micro-behavior
  const [secondsRemaining, setSecondsRemaining] = useState(3 * 3600 + 24 * 60 + 12);

  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsRemaining((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const hours = Math.floor(secondsRemaining / 3600);
  const minutes = Math.floor((secondsRemaining % 3600) / 60);

  const aisleRoundels = [
    { label: 'Cow Milk', icon: 'water_drop', bg: 'bg-secondary-container/20', cat: 'cow-milk' },
    { label: 'Buffalo Milk', icon: 'local_drink', bg: 'bg-surface-container', cat: 'buffalo-milk' },
    { label: 'Farm Eggs', icon: 'egg', bg: 'bg-tertiary-fixed/30', textCol: 'text-tertiary', cat: 'eggs' },
    { label: 'Desi Ghee', icon: 'nest_eco_leaf', bg: 'bg-tertiary-fixed-dim/20', textCol: 'text-tertiary-container', cat: 'ghee' },
    { label: 'Coconut', icon: 'eco', bg: 'bg-secondary-fixed/40', cat: 'coconut' },
    { label: 'Breads', icon: 'bakery_dining', bg: 'bg-surface-variant', cat: 'breads' },
    { label: 'Pure Oils', icon: 'science', bg: 'bg-tertiary-fixed/40', textCol: 'text-tertiary', cat: 'oils' },
  ];

  return (
    <div className="flex flex-col w-full pb-8">
      {/* Live Cutoff Countdown Ribbon */}
      <section className="px-margin pt-space-sm pb-space-xs">
        <div className="w-full bg-surface-container-lowest rounded-xl p-space-sm shadow-[0_4px_16px_rgba(0,76,40,0.06)] flex items-center justify-between gap-space-sm">
          <div className="flex items-center gap-space-sm min-w-0">
            <div className="w-10 h-10 rounded-full bg-secondary-container/40 flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-secondary text-[22px]">alarm_on</span>
            </div>
            <div className="flex flex-col min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="font-headline-sm text-headline-sm text-primary tracking-tight">
                  Order by 10:00 PM
                </span>
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-secondary"></span>
                </span>
              </div>
              <span className="font-body-sm text-body-sm text-on-surface-variant truncate">
                Guaranteed 7:00 AM doorstep drop
              </span>
            </div>
          </div>
          <div className="shrink-0 bg-primary text-on-primary px-space-sm py-1.5 rounded-full flex items-center gap-1 shadow-sm">
            <span className="material-symbols-outlined text-[14px]">timer</span>
            <span className="font-label-sm text-label-sm tracking-wide font-bold">
              {hours}h {minutes}m remaining
            </span>
          </div>
        </div>
      </section>

      {/* Tomorrow Morning's Delivery Preview Card */}
      <section className="px-margin pt-space-xs pb-space-sm">
        <div className="w-full bg-surface-container-lowest rounded-xl p-space-md shadow-[0_6px_20px_rgba(0,76,40,0.07)]">
          <div className="flex items-center justify-between pb-space-sm">
            <div className="flex items-center gap-2">
              <div
                className={`w-2.5 h-2.5 rounded-full ${
                  isTomorrowPaused ? 'bg-[#ba1a1a]' : 'bg-secondary'
                }`}
              ></div>
              <span className="font-headline-sm text-headline-sm text-on-surface font-bold">
                {isTomorrowPaused ? 'Delivery Paused for Tomorrow' : 'Arriving Tomorrow, 7:00 AM'}
              </span>
            </div>
            <button
              onClick={() => {
                onTogglePauseTomorrow();
                onShowToast(
                  isTomorrowPaused
                    ? 'Delivery scheduled for 7:00 AM'
                    : 'Tomorrow morning delivery paused'
                );
              }}
              className={`px-2.5 py-1 rounded-full font-label-md text-label-md transition-colors flex items-center gap-1 ${
                isTomorrowPaused
                  ? 'bg-error-container text-on-error-container hover:bg-error-container/80'
                  : 'bg-surface-container-high text-on-surface-variant hover:bg-surface-dim'
              }`}
            >
              <span className="material-symbols-outlined text-[14px]">
                {isTomorrowPaused ? 'play_circle' : 'pause_circle'}
              </span>
              <span>{isTomorrowPaused ? 'Resume' : 'Pause Day'}</span>
            </button>
          </div>

          {/* Manifest Items */}
          <div className="flex flex-col gap-space-xs py-space-xs">
            {manifestItems.map((item, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-space-xs rounded-lg bg-surface-container-low/60"
              >
                <div className="flex items-center gap-space-sm min-w-0">
                  <img
                    className="w-12 h-12 rounded-lg object-cover shrink-0"
                    alt={item.name}
                    src={item.image}
                  />
                  <div className="flex flex-col min-w-0">
                    <span className="font-title-md text-title-md text-on-surface truncate">
                      {item.name}
                    </span>
                    <span className="font-body-sm text-body-sm text-on-surface-variant">
                      {item.subtitle}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <span className="font-title-md text-title-md text-primary">₹{item.price}</span>
                  <div className="flex items-center bg-surface-container px-2 py-0.5 rounded-full text-primary font-label-md text-label-md">
                    {item.qty}x
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Quick Add To Tomorrow Chips */}
          <div className="pt-space-sm flex items-center justify-between gap-space-xs overflow-x-auto no-scrollbar">
            <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider shrink-0 mr-1">
              + Add:
            </span>
            <button
              onClick={() => {
                onAddManifestItem({
                  name: 'Probiotic Farm Curd',
                  subtitle: '400g Tub • Active Starter',
                  price: 48,
                  qty: 1,
                  image: 'https://images.unsplash.com/photo-1588710929895-654b0c950ef5?auto=format&fit=crop&w=600&q=80',
                });
                onShowToast("Added Curd (400g) to tomorrow's doorstep bag.");
              }}
              className="shrink-0 px-2.5 py-1 rounded-full bg-surface-container text-primary font-label-md text-label-md hover:bg-secondary-container transition-colors flex items-center gap-1 active:scale-95"
            >
              <span className="material-symbols-outlined text-[14px]">add</span> Curd (400g)
            </button>
            <button
              onClick={() => {
                onAddManifestItem({
                  name: 'Pollachi Tender Coconut',
                  subtitle: '1 Pc • Sweet Malai Water',
                  price: 65,
                  qty: 1,
                  image: 'https://images.unsplash.com/photo-1544378730-8b5104b18790?auto=format&fit=crop&w=600&q=80',
                });
                onShowToast("Added Tender Coconut to tomorrow's doorstep bag.");
              }}
              className="shrink-0 px-2.5 py-1 rounded-full bg-surface-container text-primary font-label-md text-label-md hover:bg-secondary-container transition-colors flex items-center gap-1 active:scale-95"
            >
              <span className="material-symbols-outlined text-[14px]">add</span> Coconut
            </button>
            <button
              onClick={() => {
                onAddManifestItem({
                  name: 'Artisan Sourdough',
                  subtitle: '400g Loaf • Fresh Baked',
                  price: 110,
                  qty: 1,
                  image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=600&q=80',
                });
                onShowToast("Added Artisan Sourdough to tomorrow's doorstep bag.");
              }}
              className="shrink-0 px-2.5 py-1 rounded-full bg-surface-container text-primary font-label-md text-label-md hover:bg-secondary-container transition-colors flex items-center gap-1 active:scale-95"
            >
              <span className="material-symbols-outlined text-[14px]">add</span> Sourdough
            </button>
          </div>
        </div>
      </section>

      {/* Quick Category Roundels */}
      <section className="pt-space-sm pb-space-md">
        <div className="px-margin flex items-center justify-between pb-space-xs">
          <span className="font-title-md text-title-md text-on-surface">Farm Fresh Aisles</span>
          <button
            onClick={() => onNavigateToCatalog()}
            className="font-label-md text-label-md text-secondary hover:underline"
          >
            View 48 Items
          </button>
        </div>
        <div className="flex items-center gap-3 overflow-x-auto px-margin no-scrollbar py-1">
          {aisleRoundels.map((aisle, idx) => (
            <div
              key={idx}
              onClick={() => onNavigateToCatalog(aisle.cat)}
              className="flex flex-col items-center gap-1.5 shrink-0 cursor-pointer group"
            >
              <div className="w-16 h-16 rounded-full bg-surface-container-lowest shadow-[0_3px_10px_rgba(0,76,40,0.06)] flex items-center justify-center p-1 group-active:scale-95 transition-transform">
                <div className={`w-full h-full rounded-full ${aisle.bg} flex items-center justify-center`}>
                  <span
                    className={`material-symbols-outlined ${
                      aisle.textCol || 'text-primary'
                    } text-[28px]`}
                  >
                    {aisle.icon}
                  </span>
                </div>
              </div>
              <span className="font-label-md text-label-md text-on-surface">{aisle.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* VIP Club & Milk Purity Kit Card */}
      <section className="px-margin pb-space-md">
        <div className="w-full relative overflow-hidden rounded-xl bg-gradient-to-br from-primary-container via-primary to-primary text-on-primary p-space-md shadow-[0_8px_24px_rgba(0,76,40,0.18)]">
          <div className="absolute -right-6 -bottom-6 w-36 h-36 bg-secondary-fixed/10 rounded-full blur-2xl pointer-events-none"></div>
          <div className="flex items-start justify-between relative z-10">
            <div className="flex items-center gap-1.5 bg-tertiary-fixed text-on-tertiary-fixed px-2.5 py-0.5 rounded-full font-label-sm text-label-sm shadow-sm">
              <span className="material-symbols-outlined text-[14px]">verified</span>
              <span>Zero Adulteration Guarantee</span>
            </div>
            <span className="font-label-md text-label-md text-on-primary-container">VIP Privilege</span>
          </div>
          <div className="flex items-center gap-space-md mt-space-sm relative z-10">
            <div className="flex flex-col flex-1">
              <h2 className="font-headline-md text-headline-md font-bold tracking-tight text-surface-container-lowest">
                Free Home Purity Kit
              </h2>
              <p className="font-body-sm text-body-sm text-on-primary-container mt-1">
                Get 5 reusable testing strips with your trial. Test starch, detergents &amp; urea right at home.
              </p>
              <div className="mt-space-sm flex items-center gap-2">
                <span className="inline-flex items-center gap-1 font-label-md text-label-md text-secondary-fixed">
                  <span className="material-symbols-outlined text-[16px]">check_circle</span> 26 Daily Lab Tests
                </span>
                <span className="text-outline-variant">•</span>
                <span className="font-label-md text-label-md text-secondary-fixed">4°C Cold Chain</span>
              </div>
            </div>
            <div className="w-20 h-20 rounded-xl bg-surface-container-lowest/15 backdrop-blur-md p-1 shrink-0 flex items-center justify-center">
              <img
                className="w-full h-full object-cover rounded-lg"
                alt="Purity Kit"
                src={ASSETS.purityKitBanner}
              />
            </div>
          </div>
          <div className="mt-space-md pt-space-xs flex items-center justify-between border-t border-primary-fixed/20 relative z-10">
            <span className="font-body-sm text-body-sm text-surface-bright">Complimentary on ₹99+ order</span>
            <button
              onClick={() => onOpenPurityKitModal()}
              className="px-space-md py-1.5 rounded-full bg-tertiary-fixed-dim text-on-tertiary-fixed font-title-md text-title-md shadow-sm active:scale-95 transition-transform flex items-center gap-1"
            >
              <span>Claim Kit</span>
              <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </button>
          </div>
        </div>
      </section>

      {/* Best Sellers & Trial Offers Grid (Fresh Farm Stems) */}
      <section className="px-margin pb-space-lg">
        <div className="flex items-center justify-between pb-space-sm">
          <div className="flex flex-col">
            <span className="font-headline-sm text-headline-sm text-on-surface">Fresh Farm Stems</span>
            <span className="font-body-sm text-body-sm text-on-surface-variant">Untampered cold-chain batches</span>
          </div>
          <button
            onClick={() => onNavigateToCatalog()}
            className="font-label-md text-label-md text-secondary hover:underline"
          >
            See Catalog
          </button>
        </div>

        <div className="grid grid-cols-2 gap-space-sm">
          {/* Item 1: Pure Desi Cow Milk */}
          {(() => {
            const prod = PRODUCTS[0];
            return (
              <div className="bg-surface-container-lowest rounded-xl p-space-sm shadow-[0_2px_8px_rgba(0,76,40,0.04)] flex flex-col justify-between">
                <div
                  className="relative cursor-pointer"
                  onClick={() => onSelectProduct(prod)}
                >
                  <img
                    className="w-full h-32 rounded-lg object-cover"
                    alt={prod.name}
                    src={prod.image}
                  />
                  <span className="absolute top-1.5 left-1.5 bg-tertiary-fixed text-on-tertiary-fixed font-label-sm text-label-sm px-2 py-0.5 rounded-full shadow-sm">
                    {prod.badge}
                  </span>
                  <span className="absolute bottom-1.5 right-1.5 bg-surface-container-lowest/90 backdrop-blur-sm text-primary font-label-sm text-label-sm px-1.5 py-0.5 rounded">
                    {prod.size}
                  </span>
                </div>
                <div className="pt-space-xs flex flex-col flex-1">
                  <span
                    onClick={() => onSelectProduct(prod)}
                    className="font-title-md text-title-md text-on-surface line-clamp-1 cursor-pointer hover:text-primary"
                  >
                    {prod.name}
                  </span>
                  <span className="font-body-sm text-body-sm text-on-surface-variant line-clamp-2 mt-0.5">
                    {prod.subtitle}
                  </span>
                  <div className="mt-space-sm flex items-baseline gap-1">
                    <span className="font-headline-sm text-headline-sm text-primary font-bold">
                      ₹{prod.trialPrice || 42}
                    </span>
                    <span className="font-body-sm text-body-sm text-outline line-through">
                      ₹{prod.price}
                    </span>
                    <span className="font-label-sm text-label-sm text-secondary font-semibold">
                      Trial
                    </span>
                  </div>
                  <button
                    onClick={() => onSelectProduct(prod)}
                    className="mt-space-xs w-full py-2 rounded-lg bg-primary text-on-primary font-label-lg text-label-lg active:scale-98 transition-transform shadow-sm flex items-center justify-center gap-1"
                  >
                    <span className="material-symbols-outlined text-[16px]">autorenew</span> Subscribe @ ₹{prod.price}
                  </button>
                </div>
              </div>
            );
          })()}

          {/* Item 2: Fresh Buffalo Milk */}
          {(() => {
            const prod = PRODUCTS[1];
            return (
              <div className="bg-surface-container-lowest rounded-xl p-space-sm shadow-[0_2px_8px_rgba(0,76,40,0.04)] flex flex-col justify-between">
                <div
                  className="relative cursor-pointer"
                  onClick={() => onSelectProduct(prod)}
                >
                  <img
                    className="w-full h-32 rounded-lg object-cover"
                    alt={prod.name}
                    src={prod.image}
                  />
                  <span className="absolute top-1.5 left-1.5 bg-secondary-container text-on-secondary-container font-label-sm text-label-sm px-2 py-0.5 rounded-full shadow-sm">
                    {prod.badge}
                  </span>
                  <span className="absolute bottom-1.5 right-1.5 bg-surface-container-lowest/90 backdrop-blur-sm text-primary font-label-sm text-label-sm px-1.5 py-0.5 rounded">
                    {prod.size}
                  </span>
                </div>
                <div className="pt-space-xs flex flex-col flex-1">
                  <span
                    onClick={() => onSelectProduct(prod)}
                    className="font-title-md text-title-md text-on-surface line-clamp-1 cursor-pointer hover:text-primary"
                  >
                    {prod.name}
                  </span>
                  <span className="font-body-sm text-body-sm text-on-surface-variant line-clamp-2 mt-0.5">
                    {prod.subtitle}
                  </span>
                  <div className="mt-space-sm flex items-baseline gap-1">
                    <span className="font-headline-sm text-headline-sm text-primary font-bold">
                      ₹{prod.price}
                    </span>
                    <span className="font-body-sm text-body-sm text-on-surface-variant">/ pouch</span>
                  </div>
                  <button
                    onClick={() => onSelectProduct(prod)}
                    className="mt-space-xs w-full py-2 rounded-lg bg-primary-container text-on-primary font-label-lg text-label-lg active:scale-98 transition-transform shadow-sm flex items-center justify-center gap-1"
                  >
                    <span className="material-symbols-outlined text-[16px]">add</span> Subscribe
                  </button>
                </div>
              </div>
            );
          })()}

          {/* Item 3: Farm Brown Country Eggs */}
          {(() => {
            const prod = PRODUCTS[2];
            return (
              <div className="bg-surface-container-lowest rounded-xl p-space-sm shadow-[0_2px_8px_rgba(0,76,40,0.04)] flex flex-col justify-between">
                <div
                  className="relative cursor-pointer"
                  onClick={() => onSelectProduct(prod)}
                >
                  <img
                    className="w-full h-32 rounded-lg object-cover"
                    alt={prod.name}
                    src={prod.image}
                  />
                  <span className="absolute top-1.5 left-1.5 bg-surface-container-high text-on-surface font-label-sm text-label-sm px-2 py-0.5 rounded-full shadow-sm">
                    {prod.badge}
                  </span>
                  <span className="absolute bottom-1.5 right-1.5 bg-surface-container-lowest/90 backdrop-blur-sm text-primary font-label-sm text-label-sm px-1.5 py-0.5 rounded">
                    {prod.size}
                  </span>
                </div>
                <div className="pt-space-xs flex flex-col flex-1">
                  <span
                    onClick={() => onSelectProduct(prod)}
                    className="font-title-md text-title-md text-on-surface line-clamp-1 cursor-pointer hover:text-primary"
                  >
                    {prod.name}
                  </span>
                  <span className="font-body-sm text-body-sm text-on-surface-variant line-clamp-2 mt-0.5">
                    {prod.subtitle}
                  </span>
                  <div className="mt-space-sm flex items-baseline gap-1">
                    <span className="font-headline-sm text-headline-sm text-primary font-bold">
                      ₹{prod.price}
                    </span>
                    <span className="font-body-sm text-body-sm text-outline line-through">
                      ₹{prod.originalPrice}
                    </span>
                  </div>
                  <button
                    onClick={() => {
                      onAddManifestItem({
                        name: prod.name,
                        subtitle: `${prod.size} • Free Range`,
                        price: prod.price,
                        qty: 1,
                        image: prod.image,
                      });
                      onShowToast("Added Brown Country Eggs to tomorrow's doorstep bag.");
                    }}
                    className="mt-space-xs w-full py-2 rounded-lg bg-surface-container-high text-primary font-label-lg text-label-lg active:scale-98 transition-transform flex items-center justify-center gap-1"
                  >
                    <span className="material-symbols-outlined text-[16px]">add_shopping_cart</span> Add Once
                  </button>
                </div>
              </div>
            );
          })()}

          {/* Item 4: A2 Cultured Desi Cow Ghee */}
          {(() => {
            const prod = PRODUCTS[3];
            return (
              <div className="bg-surface-container-lowest rounded-xl p-space-sm shadow-[0_2px_8px_rgba(0,76,40,0.04)] flex flex-col justify-between">
                <div
                  className="relative cursor-pointer"
                  onClick={() => onSelectProduct(prod)}
                >
                  <img
                    className="w-full h-32 rounded-lg object-cover"
                    alt={prod.name}
                    src={prod.image}
                  />
                  <span className="absolute top-1.5 left-1.5 bg-tertiary-fixed text-on-tertiary-fixed font-label-sm text-label-sm px-2 py-0.5 rounded-full shadow-sm">
                    {prod.badge}
                  </span>
                  <span className="absolute bottom-1.5 right-1.5 bg-surface-container-lowest/90 backdrop-blur-sm text-primary font-label-sm text-label-sm px-1.5 py-0.5 rounded">
                    {prod.size}
                  </span>
                </div>
                <div className="pt-space-xs flex flex-col flex-1">
                  <span
                    onClick={() => onSelectProduct(prod)}
                    className="font-title-md text-title-md text-on-surface line-clamp-1 cursor-pointer hover:text-primary"
                  >
                    {prod.name}
                  </span>
                  <span className="font-body-sm text-body-sm text-on-surface-variant line-clamp-2 mt-0.5">
                    {prod.subtitle}
                  </span>
                  <div className="mt-space-sm flex items-baseline gap-1">
                    <span className="font-headline-sm text-headline-sm text-primary font-bold">
                      ₹{prod.price}
                    </span>
                    <span className="font-body-sm text-body-sm text-outline line-through">
                      ₹{prod.originalPrice}
                    </span>
                  </div>
                  <button
                    onClick={() => {
                      onAddManifestItem({
                        name: prod.name,
                        subtitle: `${prod.size} • Bilona Churned`,
                        price: prod.price,
                        qty: 1,
                        image: prod.image,
                      });
                      onShowToast("Added A2 Cultured Ghee to tomorrow's doorstep bag.");
                    }}
                    className="mt-space-xs w-full py-2 rounded-lg bg-surface-container-high text-primary font-label-lg text-label-lg active:scale-98 transition-transform flex items-center justify-center gap-1"
                  >
                    <span className="material-symbols-outlined text-[16px]">add_shopping_cart</span> Add Once
                  </button>
                </div>
              </div>
            );
          })()}
        </div>
      </section>

      {/* Trust & Purity Pillars Carousel */}
      <section className="pb-space-md">
        <div className="px-margin pb-space-xs flex items-center justify-between">
          <span className="font-headline-sm text-headline-sm text-on-surface">The Farmstead Promise</span>
          <span className="font-label-sm text-label-sm text-secondary flex items-center gap-0.5">
            <span className="material-symbols-outlined text-[14px]">shield</span> Certified Safe
          </span>
        </div>
        <div className="flex items-center gap-space-sm overflow-x-auto px-margin no-scrollbar py-1">
          {/* Pillar 1 */}
          <div className="w-64 shrink-0 bg-surface-container-lowest rounded-xl p-space-sm shadow-[0_2px_8px_rgba(0,76,40,0.04)] flex flex-col gap-2">
            <div className="w-9 h-9 rounded-full bg-secondary-container/40 flex items-center justify-center">
              <span className="material-symbols-outlined text-secondary text-[20px]">science</span>
            </div>
            <span className="font-title-md text-title-md text-on-surface">Tested Daily at Farm Gate</span>
            <span className="font-body-sm text-body-sm text-on-surface-variant">
              Every tanker batch undergoes 26 purity checks before loading into dairy chills.
            </span>
          </div>

          {/* Pillar 2 */}
          <div className="w-64 shrink-0 bg-surface-container-lowest rounded-xl p-space-sm shadow-[0_2px_8px_rgba(0,76,40,0.04)] flex flex-col gap-2">
            <div className="w-9 h-9 rounded-full bg-primary-fixed/50 flex items-center justify-center">
              <span className="material-symbols-outlined text-primary text-[20px]">ac_unit</span>
            </div>
            <span className="font-title-md text-title-md text-on-surface">Chilled to 4°C in 1 Hour</span>
            <span className="font-body-sm text-body-sm text-on-surface-variant">
              Instant micro-chilling halts bacterial progression naturally without preservatives.
            </span>
          </div>

          {/* Pillar 3 */}
          <div className="w-64 shrink-0 bg-surface-container-lowest rounded-xl p-space-sm shadow-[0_2px_8px_rgba(0,76,40,0.04)] flex flex-col gap-2">
            <div className="w-9 h-9 rounded-full bg-tertiary-fixed/30 flex items-center justify-center">
              <span className="material-symbols-outlined text-tertiary text-[20px]">inventory_2</span>
            </div>
            <span className="font-title-md text-title-md text-on-surface">Insulated Early Crates</span>
            <span className="font-body-sm text-body-sm text-on-surface-variant">
              Delivered in thermal bags to keep milk fridge-cold even at 6:30 AM drop-off.
            </span>
          </div>
        </div>
      </section>
    </div>
  );
};
