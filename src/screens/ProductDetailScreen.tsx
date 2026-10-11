import React, { useState } from 'react';
import { ASSETS } from '../data/mockData';
import { Product } from '../types';

interface ProductDetailScreenProps {
  product: Product;
  onBack: () => void;
  onStartSubscription: (plan: {
    product: Product;
    frequency: string;
    quantity: number;
    slot: 'morning' | 'evening';
    firstDate: string;
    monthlyCost: number;
  }) => void;
  onOrderTrial: (product: Product) => void;
  onOpenPurityKitModal: () => void;
  onShowToast: (msg: string) => void;
}

export const ProductDetailScreen: React.FC<ProductDetailScreenProps> = ({
  product,
  onBack,
  onStartSubscription,
  onOrderTrial,
  onOpenPurityKitModal,
  onShowToast,
}) => {
  const [currentQty, setCurrentQty] = useState<number>(1.0);
  const [currentFrequency, setCurrentFrequency] = useState<'daily' | 'alternate' | '3days' | 'custom'>('daily');
  const [customDays, setCustomDays] = useState<string[]>(['M', 'W', 'F', 'S']);
  const [selectedSlot, setSelectedSlot] = useState<'morning' | 'evening'>('morning');
  const [isReportOpen, setIsReportOpen] = useState(false);

  const sampleDates = [
    'Tomorrow, Oct 24',
    'Saturday, Oct 25',
    'Sunday, Oct 26',
    'Monday, Oct 27',
  ];
  const [dateIndex, setDateIndex] = useState(0);

  const toggleDay = (day: string) => {
    if (customDays.includes(day)) {
      setCustomDays(customDays.filter((d) => d !== day));
    } else {
      setCustomDays([...customDays, day]);
    }
  };

  // Monthly calculation
  let daysPerMonth = 30;
  if (currentFrequency === 'alternate') daysPerMonth = 15;
  else if (currentFrequency === '3days') daysPerMonth = 10;
  else if (currentFrequency === 'custom') {
    daysPerMonth = Math.round((customDays.length / 7) * 30);
  }

  const monthlyLiters = Math.round(currentQty * daysPerMonth);
  const monthlyPrice = monthlyLiters * product.price;

  return (
    <div className="flex flex-col relative w-full pb-32">
      {/* Header */}
      <header className="fixed top-0 w-full z-40 bg-surface/90 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)]">
        <div className="h-16 px-space-sm flex items-center justify-between gap-space-sm max-w-md mx-auto">
          <div className="flex items-center gap-space-sm min-w-0 flex-1">
            <button
              aria-label="Go back"
              onClick={onBack}
              className="w-11 h-11 rounded-full flex items-center justify-center text-on-surface hover:bg-surface-container transition-colors shrink-0"
            >
              <span className="material-symbols-outlined text-[24px]">arrow_back</span>
            </button>
            <img
              alt="Farmstead Pure Logo"
              className="h-7 w-auto object-contain shrink-0"
              src={ASSETS.logo}
            />
            <h1 className="font-headline-sm text-headline-sm text-on-surface truncate">
              Product Detail
            </h1>
          </div>
          <div className="flex items-center gap-space-xs shrink-0">
            <img
              alt="Profile"
              className="w-8 h-8 rounded-full object-cover"
              src={ASSETS.avatar}
            />
          </div>
        </div>
      </header>

      {/* Main Content (spaced below 16) */}
      <div className="pt-16">
        {/* Top Product Visual Showcase */}
        <div className="relative w-full overflow-hidden bg-surface-container-low">
          <div className="relative w-full aspect-[4/3] flex items-center justify-center overflow-hidden">
            <img
              className="w-full h-full object-cover"
              alt={product.name}
              src={ASSETS.productDetailHero}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent"></div>

            {/* Cold-Chain Micro Badge */}
            <div className="absolute top-4 left-4 bg-surface-container-lowest/90 backdrop-blur-md px-space-md py-1.5 rounded-full flex items-center gap-1.5 shadow-sm">
              <span
                className="material-symbols-outlined text-[16px] text-primary"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                ac_unit
              </span>
              <span className="font-label-md text-label-md text-primary tracking-wide uppercase">
                Cold Chain 4°C Maintained
              </span>
            </div>

            {/* Trust Rating Pill */}
            <div className="absolute bottom-4 left-4 bg-surface-container-lowest/95 backdrop-blur-md px-space-md py-1.5 rounded-full flex items-center gap-2 shadow-sm">
              <div className="flex items-center text-tertiary-container">
                <span
                  className="material-symbols-outlined text-[15px]"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  star
                </span>
                <span className="font-label-lg text-label-lg font-bold ml-1 text-on-surface">4.8</span>
              </div>
              <span className="w-1 h-1 rounded-full bg-outline-variant"></span>
              <span className="font-body-sm text-body-sm text-on-surface-variant font-medium">
                18,420+ subscribers
              </span>
            </div>

            {/* Purity Seal Micro Ribbon */}
            <div className="absolute bottom-4 right-4 bg-secondary-container px-space-md py-1.5 rounded-full flex items-center gap-1.5 shadow-sm">
              <span
                className="material-symbols-outlined text-[16px] text-on-secondary-container"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                verified
              </span>
              <span className="font-label-md text-label-md text-on-secondary-container uppercase">
                100% Raw Desi A2
              </span>
            </div>
          </div>
        </div>

        <div className="px-margin flex flex-col gap-space-lg pt-space-md">
          {/* Title & Source Farm Info */}
          <div className="flex flex-col gap-1">
            <div className="flex items-center justify-between">
              <span className="font-label-sm text-label-sm uppercase tracking-wider text-primary font-bold">
                {product.breed || 'Gir & Sahiwal Heritage Breed'}
              </span>
              <span className="font-label-sm text-label-sm px-2 py-0.5 rounded-full bg-surface-container-high text-on-surface-variant">
                {product.milkedTime || 'Milked 4:30 AM Today'}
              </span>
            </div>
            <h2 className="font-headline-lg text-headline-lg text-on-surface leading-tight">
              Farm Fresh Pure Cow Milk (A2 Desi Cow)
            </h2>
            <p className="font-body-md text-body-md text-on-surface-variant">
              Untouched by machinery, unpasteurized, lab-certified pure within 2 hours of milking.
            </p>
          </div>

          {/* Pricing & VIP Savings Banner */}
          <div className="bg-surface-container-lowest p-space-md rounded-xl shadow-sm flex flex-col gap-space-sm">
            <div className="flex items-baseline justify-between">
              <div className="flex items-baseline gap-2">
                <span className="font-headline-lg text-headline-lg text-primary font-bold">
                  ₹{product.price}
                </span>
                <span className="font-body-md text-body-md text-on-surface-variant">/ Litre</span>
              </div>
              <div className="flex items-center gap-1.5 bg-primary-fixed/40 px-space-sm py-1 rounded-full">
                <span
                  className="material-symbols-outlined text-[14px] text-on-primary-fixed-variant"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  bolt
                </span>
                <span className="font-label-sm text-label-sm text-on-primary-fixed-variant">
                  VIP ₹72/L (Save ₹240/mo)
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2 bg-surface-container-low px-space-md py-2 rounded-lg">
              <span className="material-symbols-outlined text-[18px] text-primary">wb_twilight</span>
              <span className="font-label-lg text-label-lg text-on-surface">
                Guaranteed Doorstep Drop by 7:00 AM Daily
              </span>
            </div>
          </div>

          {/* Milk Quality & Real-Time Lab Report Card */}
          <div className="bg-surface-container-lowest rounded-xl p-space-md shadow-sm flex flex-col gap-space-md">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-full bg-secondary-container flex items-center justify-center text-on-secondary-container">
                  <span
                    className="material-symbols-outlined text-[20px]"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    biotech
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="font-title-md text-title-md text-on-surface">Batch #849 Purity Score</span>
                  <span className="font-body-sm text-body-sm text-on-surface-variant">
                    Tested 05:15 AM • Organoleptic Pass
                  </span>
                </div>
              </div>
              <span className="font-label-lg text-label-lg px-2.5 py-1 rounded-full bg-secondary-fixed text-on-secondary-fixed font-bold">
                100% PURE
              </span>
            </div>

            {/* Quick Metrics Grid */}
            <div className="grid grid-cols-2 gap-2 bg-surface-container-low p-space-sm rounded-lg">
              <div className="bg-surface-container-lowest p-2.5 rounded-lg flex flex-col gap-0.5">
                <span className="font-body-sm text-body-sm text-on-surface-variant">Butterfat Content</span>
                <div className="flex items-baseline gap-1">
                  <span className="font-title-md text-title-md text-primary font-bold">4.2%</span>
                  <span className="font-label-sm text-label-sm text-outline">Optimum Cream</span>
                </div>
              </div>
              <div className="bg-surface-container-lowest p-2.5 rounded-lg flex flex-col gap-0.5">
                <span className="font-body-sm text-body-sm text-on-surface-variant">Solid-Not-Fat (SNF)</span>
                <div className="flex items-baseline gap-1">
                  <span className="font-title-md text-title-md text-primary font-bold">8.9%</span>
                  <span className="font-label-sm text-label-sm text-outline">High Protein</span>
                </div>
              </div>
              <div className="bg-surface-container-lowest p-2.5 rounded-lg flex flex-col gap-0.5">
                <span className="font-body-sm text-body-sm text-on-surface-variant">Chemical Adulterants</span>
                <div className="flex items-center gap-1 text-primary">
                  <span className="material-symbols-outlined text-[14px]">check_circle</span>
                  <span className="font-label-lg text-label-lg">Nil Detected</span>
                </div>
              </div>
              <div className="bg-surface-container-lowest p-2.5 rounded-lg flex flex-col gap-0.5">
                <span className="font-body-sm text-body-sm text-on-surface-variant">Antibiotics &amp; Hormones</span>
                <div className="flex items-center gap-1 text-primary">
                  <span className="material-symbols-outlined text-[14px]">check_circle</span>
                  <span className="font-label-lg text-label-lg">Zero (0.0 ppm)</span>
                </div>
              </div>
            </div>

            {/* Expandable Certificate Drawer Trigger */}
            <div className="flex items-center justify-between pt-1">
              <button
                onClick={() => setIsReportOpen(!isReportOpen)}
                className="flex items-center gap-1 text-primary font-label-lg text-label-lg"
              >
                <span>View FSSAI &amp; Certified Lab Seal</span>
                <span
                  className={`material-symbols-outlined text-[18px] transition-transform duration-200 ${
                    isReportOpen ? 'rotate-180' : ''
                  }`}
                >
                  expand_more
                </span>
              </button>
              <button
                onClick={onOpenPurityKitModal}
                className="bg-tertiary-fixed text-on-tertiary-fixed font-label-sm text-label-sm px-3 py-1.5 rounded-full font-bold flex items-center gap-1 active:scale-95 transition-transform"
              >
                <span className="material-symbols-outlined text-[14px]">science</span>
                Free Test Kit
              </button>
            </div>

            {/* Collapsible Detailed Report */}
            {isReportOpen && (
              <div className="flex flex-col gap-2 pt-2 bg-surface-container-low/60 p-space-sm rounded-lg animate-in fade-in duration-200">
                <div className="flex items-center justify-between text-body-sm font-body-sm">
                  <span className="text-on-surface-variant">Methylene Blue Reduction (MBRT)</span>
                  <span className="text-on-surface font-semibold">&gt; 5.5 Hours (Grade 1)</span>
                </div>
                <div className="flex items-center justify-between text-body-sm font-body-sm">
                  <span className="text-on-surface-variant">Aflatoxin M1</span>
                  <span className="text-on-surface font-semibold">&lt; 0.05 µg/kg (Safe limit)</span>
                </div>
                <div className="flex items-center justify-between text-body-sm font-body-sm">
                  <span className="text-on-surface-variant">Packaging Disinfection</span>
                  <span className="text-on-surface font-semibold">UV Sterilized Glass Jars</span>
                </div>
              </div>
            )}
          </div>

          {/* Subscription Configuration Section */}
          <div className="bg-surface-container-lowest rounded-xl p-space-md shadow-sm flex flex-col gap-space-lg">
            <div className="flex items-center justify-between">
              <div className="flex flex-col">
                <span className="font-title-md text-title-md text-on-surface">Build Subscription Plan</span>
                <span className="font-body-sm text-body-sm text-on-surface-variant">
                  Pause, tweak or cancel anytime in 1 tap
                </span>
              </div>
              <span className="material-symbols-outlined text-primary text-[22px]">tune</span>
            </div>

            {/* Frequency Segmented Switch */}
            <div className="flex flex-col gap-2">
              <label className="font-label-sm text-label-sm text-on-surface-variant uppercase font-bold tracking-wider">
                Delivery Frequency
              </label>
              <div className="grid grid-cols-4 gap-1.5 p-1 bg-surface-container-low rounded-xl">
                {(['daily', 'alternate', '3days', 'custom'] as const).map((freq) => {
                  const labelMap = {
                    daily: 'Daily',
                    alternate: 'Alternate',
                    '3days': 'Every 3D',
                    custom: 'Custom',
                  };
                  const isSel = currentFrequency === freq;
                  return (
                    <button
                      key={freq}
                      type="button"
                      onClick={() => setCurrentFrequency(freq)}
                      className={`py-2 px-1 text-center rounded-lg font-label-md text-label-md transition-all ${
                        isSel
                          ? 'bg-primary text-on-primary shadow-sm font-semibold'
                          : 'text-on-surface font-medium hover:bg-surface-container'
                      }`}
                    >
                      {labelMap[freq]}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Custom Day Selection Sub-Panel */}
            {currentFrequency === 'custom' && (
              <div className="flex flex-col gap-1.5 p-space-sm bg-surface-container-low rounded-xl">
                <span className="font-label-sm text-label-sm text-on-surface-variant">
                  Select Preferred Delivery Mornings:
                </span>
                <div className="flex justify-between items-center gap-1 pt-1">
                  {['M', 'T', 'W', 'Th', 'F', 'Sa', 'Su'].map((day) => {
                    const isSelected = customDays.includes(day);
                    return (
                      <button
                        key={day}
                        type="button"
                        onClick={() => toggleDay(day)}
                        className={`w-9 h-9 rounded-full font-label-md text-label-md flex items-center justify-center transition-all ${
                          isSelected
                            ? 'bg-primary text-on-primary font-bold'
                            : 'bg-surface-container text-on-surface'
                        }`}
                      >
                        {day[0]}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Quantity Stepper & Pack Selector */}
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <label className="font-label-sm text-label-sm text-on-surface-variant uppercase font-bold tracking-wider">
                  Per Delivery Volume
                </label>
                <span className="font-body-sm text-body-sm text-primary font-medium">
                  {currentQty.toFixed(1)} Litre {currentQty >= 1.5 ? 'family pack' : 'glass bottle'}
                </span>
              </div>
              <div className="flex items-center justify-between gap-3">
                {/* Step Counter */}
                <div className="flex items-center bg-surface-container-low rounded-xl p-1 gap-3">
                  <button
                    aria-label="Decrease quantity"
                    type="button"
                    onClick={() => setCurrentQty((q) => Math.max(0.5, Number((q - 0.5).toFixed(1))))}
                    className="w-10 h-10 rounded-lg bg-surface-container-lowest flex items-center justify-center text-primary shadow-sm active:scale-90 transition-transform"
                  >
                    <span className="material-symbols-outlined text-[20px]">remove</span>
                  </button>
                  <div className="flex items-baseline min-w-[50px] justify-center">
                    <span className="font-headline-md text-headline-md font-bold text-on-surface">
                      {currentQty.toFixed(1)}
                    </span>
                    <span className="font-label-sm text-label-sm text-on-surface-variant ml-0.5">L</span>
                  </div>
                  <button
                    aria-label="Increase quantity"
                    type="button"
                    onClick={() => setCurrentQty((q) => Math.min(5.0, Number((q + 0.5).toFixed(1))))}
                    className="w-10 h-10 rounded-lg bg-surface-container-lowest flex items-center justify-center text-primary shadow-sm active:scale-90 transition-transform"
                  >
                    <span className="material-symbols-outlined text-[20px]">add</span>
                  </button>
                </div>

                {/* Quick presets */}
                <div className="flex items-center gap-1.5 flex-1 justify-end">
                  {[0.5, 1.0, 1.5, 2.0].map((preset) => {
                    const isMatched = currentQty === preset;
                    return (
                      <button
                        key={preset}
                        type="button"
                        onClick={() => setCurrentQty(preset)}
                        className={`px-2.5 py-2 rounded-lg font-label-md text-label-md transition-all ${
                          isMatched
                            ? 'bg-primary text-on-primary font-semibold'
                            : 'bg-surface-container-low text-on-surface hover:bg-surface-container'
                        }`}
                      >
                        {preset.toFixed(1)}L
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Preferred Slot Selector */}
            <div className="flex flex-col gap-2">
              <label className="font-label-sm text-label-sm text-on-surface-variant uppercase font-bold tracking-wider">
                Delivery Time Window
              </label>
              <div className="grid grid-cols-2 gap-2">
                <label
                  onClick={() => setSelectedSlot('morning')}
                  className={`relative flex flex-col p-3 rounded-xl cursor-pointer transition-all ${
                    selectedSlot === 'morning'
                      ? 'bg-secondary-container/40 ring-1 ring-primary'
                      : 'bg-surface-container-low'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="material-symbols-outlined text-primary text-[20px]">wb_twilight</span>
                    {selectedSlot === 'morning' && (
                      <span
                        className="material-symbols-outlined text-primary text-[18px]"
                        style={{ fontVariationSettings: "'FILL' 1" }}
                      >
                        check_circle
                      </span>
                    )}
                  </div>
                  <span className="font-label-lg text-label-lg text-on-surface font-semibold">
                    Morning Slot
                  </span>
                  <span className="font-body-sm text-body-sm text-on-surface-variant">
                    5:30 AM - 7:00 AM
                  </span>
                </label>

                <label
                  onClick={() => setSelectedSlot('evening')}
                  className={`relative flex flex-col p-3 rounded-xl cursor-pointer transition-all ${
                    selectedSlot === 'evening'
                      ? 'bg-secondary-container/40 ring-1 ring-primary'
                      : 'bg-surface-container-low'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="material-symbols-outlined text-on-surface-variant text-[20px]">
                      nights_stay
                    </span>
                    {selectedSlot === 'evening' && (
                      <span
                        className="material-symbols-outlined text-primary text-[18px]"
                        style={{ fontVariationSettings: "'FILL' 1" }}
                      >
                        check_circle
                      </span>
                    )}
                  </div>
                  <span className="font-label-lg text-label-lg text-on-surface font-semibold">
                    Evening Slot
                  </span>
                  <span className="font-body-sm text-body-sm text-on-surface-variant">
                    5:00 PM - 7:00 PM
                  </span>
                </label>
              </div>
            </div>

            {/* Start Date Picker Card */}
            <div className="flex items-center justify-between bg-surface-container-low p-space-md rounded-xl">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-surface-container-lowest flex items-center justify-center text-primary shadow-sm">
                  <span className="material-symbols-outlined text-[20px]">calendar_today</span>
                </div>
                <div className="flex flex-col">
                  <span className="font-label-sm text-label-sm text-on-surface-variant uppercase font-semibold">
                    First Drop Date
                  </span>
                  <span className="font-title-md text-title-md text-on-surface">
                    {sampleDates[dateIndex]}
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setDateIndex((prev) => (prev + 1) % sampleDates.length)}
                className="font-label-md text-label-md text-primary bg-surface-container-lowest px-3 py-1.5 rounded-full font-semibold shadow-sm active:scale-95 transition-transform"
              >
                Change
              </button>
            </div>
          </div>

          {/* Farm Fresh Routine Guarantee */}
          <div className="grid grid-cols-3 gap-2 py-space-sm text-center">
            <div className="bg-surface-container-lowest p-space-sm rounded-xl shadow-sm flex flex-col items-center gap-1">
              <span className="material-symbols-outlined text-primary text-[22px]">doorbell</span>
              <span className="font-label-sm text-label-sm text-on-surface font-bold">Silent Ring</span>
              <span className="font-body-sm text-body-sm text-on-surface-variant text-[11px]">
                No wakeups
              </span>
            </div>
            <div className="bg-surface-container-lowest p-space-sm rounded-xl shadow-sm flex flex-col items-center gap-1">
              <span className="material-symbols-outlined text-primary text-[22px]">pause_circle</span>
              <span className="font-label-sm text-label-sm text-on-surface font-bold">Vacation Hold</span>
              <span className="font-body-sm text-body-sm text-on-surface-variant text-[11px]">
                Instant pause
              </span>
            </div>
            <div className="bg-surface-container-lowest p-space-sm rounded-xl shadow-sm flex flex-col items-center gap-1">
              <span className="material-symbols-outlined text-primary text-[22px]">recycling</span>
              <span className="font-label-sm text-label-sm text-on-surface font-bold">Bottle Return</span>
              <span className="font-body-sm text-body-sm text-on-surface-variant text-[11px]">
                ₹5 off/jar
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Floating Action Bar */}
      <div className="fixed bottom-0 inset-x-0 z-40 bg-surface/95 backdrop-blur-xl pb-safe shadow-[0_-4px_24px_rgba(0,0,0,0.06)] border-t border-surface-container-high/50">
        <div className="max-w-md mx-auto px-margin py-3 flex flex-col gap-2">
          {/* Breakdown micro text */}
          <div className="flex items-center justify-between px-1">
            <div className="flex items-baseline gap-1.5">
              <span className="font-headline-sm text-headline-sm font-bold text-on-surface">
                ₹{monthlyPrice.toLocaleString('en-IN')}
              </span>
              <span className="font-body-sm text-body-sm text-on-surface-variant">
                / month (approx {monthlyLiters}L)
              </span>
            </div>
            <div className="flex items-center gap-1 text-primary font-label-sm text-label-sm font-bold">
              <span
                className="material-symbols-outlined text-[15px]"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                eco
              </span>
              <span>Zero Preservatives</span>
            </div>
          </div>

          {/* Action Button Group */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => {
                onOrderTrial(product);
                onShowToast(`Trial sample bottle (500ml @ ₹${product.trialPrice || 42}) booked for tomorrow.`);
              }}
              className="flex-1 h-12 rounded-full bg-surface-container-high text-on-surface font-label-lg text-label-lg flex items-center justify-center gap-1 active:scale-95 transition-transform"
            >
              <span>Single Trial</span>
              <span className="text-on-surface-variant font-normal">(@ ₹{product.trialPrice || 42})</span>
            </button>
            <button
              type="button"
              onClick={() => {
                onStartSubscription({
                  product,
                  frequency: currentFrequency,
                  quantity: currentQty,
                  slot: selectedSlot,
                  firstDate: sampleDates[dateIndex],
                  monthlyCost: monthlyPrice,
                });
                onShowToast(`Subscribed to Fresh Cow Milk (${currentQty}L) starting ${sampleDates[dateIndex]}!`);
              }}
              className="flex-[1.5] h-12 rounded-full bg-primary text-on-primary font-label-lg text-label-lg font-bold flex items-center justify-center gap-1.5 shadow-md active:scale-95 transition-transform"
            >
              <span>Start Subscription</span>
              <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
