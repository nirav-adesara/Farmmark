import React, { useState } from 'react';
import { ASSETS } from '../data/mockData';
import { SubscriptionItem } from '../types';

interface SubscriptionsScreenProps {
  subscriptions: SubscriptionItem[];
  onUpdateSubscription: (id: string, updates: Partial<SubscriptionItem>) => void;
  onOpenVacationModal: () => void;
  onOpenRechargeModal: () => void;
  onOpenAddNewItem: () => void;
  onShowToast: (msg: string) => void;
  walletBalance: number;
}

export const SubscriptionsScreen: React.FC<SubscriptionsScreenProps> = ({
  subscriptions,
  onUpdateSubscription,
  onOpenVacationModal,
  onOpenRechargeModal,
  onOpenAddNewItem,
  onShowToast,
  walletBalance,
}) => {
  // Selected day in 7-day strip
  const [selectedDayIndex, setSelectedDayIndex] = useState(1); // 1 = Tomorrow (24)

  // Milk subscription interactive state
  const milkSub = subscriptions.find((s) => s.productId === 'cow-milk-a2') || subscriptions[0];
  const eggSub = subscriptions.find((s) => s.productId === 'brown-country-eggs') || subscriptions[1];

  // Delivery Matrix calendar interactive days
  const [pausedCalendarDays, setPausedCalendarDays] = useState<number[]>([12, 13]);

  // Preferences chips state
  const [prefs, setPrefs] = useState({
    ringBell: true,
    leaveInBag: false,
    callBeforeArrival: false,
  });

  const toggleCalendarDay = (dayNum: number) => {
    if (dayNum <= 24) return; // cannot alter past/tomorrow directly from quick matrix
    if (pausedCalendarDays.includes(dayNum)) {
      setPausedCalendarDays(pausedCalendarDays.filter((d) => d !== dayNum));
      onShowToast(`Delivery restored for Oct ${dayNum}`);
    } else {
      setPausedCalendarDays([...pausedCalendarDays, dayNum]);
      onShowToast(`Paused delivery for Oct ${dayNum}`);
    }
  };

  const daysStrip = [
    { label: 'Mon', date: 23, drops: ['milk', 'egg'] },
    { label: 'Tomorrow', date: 24, drops: ['milk'], isTomorrow: true },
    { label: 'Wed', date: 25, drops: ['milk'] },
    { label: 'Thu', date: 26, drops: ['milk'] },
    { label: 'Fri', date: 27, drops: ['milk', 'egg'] },
    { label: 'Sat', date: 28, drops: ['milk'] },
    { label: 'Sun', date: 29, drops: ['milk'] },
  ];

  const activeCount = subscriptions.filter((s) => !s.isPaused).length;

  return (
    <div className="flex flex-col w-full">
      <div className="px-margin pt-space-md pb-space-lg flex flex-col gap-space-lg">
        {/* Header Stats */}
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">
              Morning Delivery Routine
            </span>
            <div className="flex items-baseline gap-space-xs mt-0.5">
              <span className="font-headline-lg text-headline-lg text-on-surface">Active Subscriptions</span>
              <span className="font-headline-md text-headline-md text-primary font-bold">({activeCount})</span>
            </div>
          </div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-secondary-container text-on-secondary-container shadow-sm">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
            <span className="font-label-md text-label-md">All active for tomorrow</span>
          </div>
        </div>

        {/* Vacation Mode Banner */}
        <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-tertiary-fixed to-surface-container-low p-space-md shadow-sm">
          <div className="flex items-start gap-space-md">
            <div className="w-10 h-10 rounded-full bg-tertiary-container text-on-tertiary flex items-center justify-center shrink-0 shadow-sm">
              <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                beach_access
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1">
                <span className="font-title-md text-title-md text-on-tertiary-fixed">Going on holiday?</span>
                <span className="font-label-sm text-label-sm px-1.5 py-0.5 rounded bg-tertiary/10 text-tertiary font-bold">
                  Zero Waste
                </span>
              </div>
              <p className="font-body-sm text-body-sm text-on-tertiary-fixed-variant mt-0.5 line-clamp-2">
                Set a vacation pause in 1 tap — deliveries cease with zero billing and zero food spoilage.
              </p>
              <div className="mt-space-sm flex items-center gap-space-sm">
                <button
                  onClick={onOpenVacationModal}
                  className="px-space-md py-2 rounded-full bg-tertiary-container text-on-tertiary font-label-md text-label-md hover:bg-tertiary active:scale-95 transition-all flex items-center gap-1 shadow-sm"
                >
                  <span className="material-symbols-outlined text-[16px]">flight_takeoff</span>
                  Set Vacation Mode
                </button>
                <span className="font-label-sm text-label-sm text-on-tertiary-fixed-variant">
                  Instant resume anytime
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Upcoming 7-Day Drops Strip */}
        <div className="flex flex-col gap-space-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-primary text-[18px]">calendar_today</span>
              <span className="font-title-md text-title-md text-on-surface">Upcoming 7-Day Drops</span>
            </div>
            <span className="font-label-sm text-label-sm text-on-surface-variant font-medium">
              Sunrise Schedule (7 AM)
            </span>
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2 pt-1 no-scrollbar -mx-margin px-margin">
            {daysStrip.map((item, idx) => {
              const isSelected = selectedDayIndex === idx;
              return (
                <button
                  key={idx}
                  onClick={() => {
                    setSelectedDayIndex(idx);
                    onShowToast(`Viewing delivery manifest for ${item.label} ${item.date}`);
                  }}
                  className={`flex flex-col items-center justify-between min-w-[58px] py-2.5 px-1.5 rounded-xl transition-all focus:outline-none ${
                    isSelected
                      ? 'bg-primary text-on-primary shadow-md scale-105 ring-2 ring-primary-fixed'
                      : 'bg-surface-container-lowest shadow-sm text-on-surface-variant hover:bg-surface-container-high'
                  }`}
                >
                  <span
                    className={`font-label-sm text-label-sm ${
                      isSelected ? 'opacity-90 text-on-primary' : 'text-on-surface-variant'
                    }`}
                  >
                    {item.label}
                  </span>
                  <span
                    className={`font-headline-sm text-headline-sm font-bold ${
                      isSelected ? 'text-on-primary' : 'text-on-surface'
                    }`}
                  >
                    {item.date}
                  </span>
                  <div className="flex items-center gap-1 mt-1.5">
                    {item.drops.includes('milk') && (
                      <span
                        className={`material-symbols-outlined text-[14px] ${
                          isSelected ? 'text-primary-fixed' : 'text-primary'
                        }`}
                        title="Milk Delivered"
                      >
                        water_drop
                      </span>
                    )}
                    {item.drops.includes('egg') && (
                      <span
                        className={`material-symbols-outlined text-[14px] ${
                          isSelected ? 'text-tertiary-fixed' : 'text-tertiary'
                        }`}
                        title="Eggs Delivered"
                      >
                        egg
                      </span>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Standing Daily Subscriptions */}
        <div className="flex flex-col gap-space-md">
          <div className="flex items-center justify-between">
            <span className="font-title-md text-title-md text-on-surface">Standing Daily Subscriptions</span>
            <button
              onClick={onOpenAddNewItem}
              className="font-label-md text-label-md text-primary flex items-center gap-0.5 hover:underline"
            >
              <span className="material-symbols-outlined text-[16px]">add_circle</span> Add New Item
            </button>
          </div>

          {/* Subscription 1: Pure Cow Milk */}
          {milkSub && (
            <div className="bg-surface-container-lowest rounded-xl p-space-md shadow-sm flex flex-col gap-space-md transition-all">
              <div className="flex gap-space-md">
                <div className="relative w-20 h-20 rounded-lg overflow-hidden bg-surface-container shrink-0 shadow-inner">
                  <img
                    className="w-full h-full object-cover"
                    alt={milkSub.name}
                    src={ASSETS.subMilkGlass}
                  />
                  <span className="absolute bottom-1 left-1 px-1.5 py-0.5 rounded bg-surface/90 backdrop-blur text-primary font-label-sm text-label-sm">
                    {milkSub.badge}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-1">
                    <h3 className="font-headline-sm text-headline-sm text-on-surface truncate">
                      {milkSub.name}
                    </h3>
                    <button
                      aria-label="Edit Subscription"
                      onClick={() => onShowToast('Subscription settings for A2 Cow Milk')}
                      className="text-on-surface-variant hover:text-primary p-1"
                    >
                      <span className="material-symbols-outlined text-[18px]">more_vert</span>
                    </button>
                  </div>
                  <div className="flex items-center gap-1 text-on-surface-variant mt-0.5">
                    <span className="material-symbols-outlined text-primary text-[14px]">repeat</span>
                    <span className="font-body-sm text-body-sm">{milkSub.frequency}</span>
                  </div>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-secondary-container text-on-secondary-container font-label-sm text-label-sm">
                      <span className="material-symbols-outlined text-[12px]">schedule</span>
                      Next Drop: {milkSub.nextDrop}
                    </span>
                    <span className="font-label-sm text-label-sm text-on-surface-variant">
                      ₹{milkSub.pricePerUnit} / Litre
                    </span>
                  </div>
                </div>
              </div>

              {/* Tomorrow Controls */}
              <div className="bg-surface-container-low rounded-lg p-space-sm flex items-center justify-between gap-space-sm">
                <div className="flex items-center gap-2">
                  <span className="font-label-md text-label-md text-on-surface">Tomorrow's Liters:</span>
                  <div className="inline-flex items-center bg-surface-container-lowest rounded-full p-0.5 shadow-sm">
                    <button
                      onClick={() => {
                        const newQ = Math.max(1, milkSub.quantity - 1);
                        onUpdateSubscription(milkSub.id, { quantity: newQ });
                        onShowToast(`Tomorrow quantity set to ${newQ}L`);
                      }}
                      className="w-7 h-7 rounded-full flex items-center justify-center text-primary hover:bg-secondary-container active:scale-90 transition-all"
                    >
                      <span className="material-symbols-outlined text-[16px]">remove</span>
                    </button>
                    <span className="font-title-md text-title-md text-on-surface px-2 min-w-[20px] text-center">
                      {milkSub.quantity}
                    </span>
                    <button
                      onClick={() => {
                        const newQ = Math.min(8, milkSub.quantity + 1);
                        onUpdateSubscription(milkSub.id, { quantity: newQ });
                        onShowToast(`Tomorrow quantity set to ${newQ}L`);
                      }}
                      className="w-7 h-7 rounded-full flex items-center justify-center text-primary hover:bg-secondary-container active:scale-90 transition-all"
                    >
                      <span className="material-symbols-outlined text-[16px]">add</span>
                    </button>
                  </div>
                </div>
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => {
                      const nextSkipped = !milkSub.isTomorrowSkipped;
                      onUpdateSubscription(milkSub.id, { isTomorrowSkipped: nextSkipped });
                      onShowToast(
                        nextSkipped
                          ? 'Milk skipped for tomorrow (Oct 24)'
                          : 'Milk drop scheduled for tomorrow'
                      );
                    }}
                    className={`px-3 py-1.5 rounded-full font-label-md text-label-md active:scale-95 transition-all flex items-center gap-1 ${
                      milkSub.isTomorrowSkipped
                        ? 'bg-error-container text-on-error-container'
                        : 'bg-surface-container-highest text-on-surface-variant hover:bg-error-container hover:text-on-error-container'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[14px]">event_busy</span>
                    <span>{milkSub.isTomorrowSkipped ? 'Skipped for 24th' : 'Skip Tomorrow'}</span>
                  </button>
                  <button
                    onClick={() => onShowToast('Edit Cow Milk delivery routine')}
                    className="px-3 py-1.5 rounded-full bg-surface-container-lowest text-primary font-label-md text-label-md shadow-sm hover:bg-surface-container active:scale-95 transition-all"
                  >
                    Edit Plan
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Subscription 2: Country Eggs */}
          {eggSub && (
            <div className="bg-surface-container-lowest rounded-xl p-space-md shadow-sm flex flex-col gap-space-md transition-all">
              <div className="flex gap-space-md">
                <div className="relative w-20 h-20 rounded-lg overflow-hidden bg-surface-container shrink-0 shadow-inner">
                  <img
                    className="w-full h-full object-cover"
                    alt={eggSub.name}
                    src={ASSETS.subEggsCarton}
                  />
                  <span className="absolute bottom-1 left-1 px-1.5 py-0.5 rounded bg-surface/90 backdrop-blur text-tertiary-container font-label-sm text-label-sm">
                    {eggSub.badge}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-1">
                    <h3 className="font-headline-sm text-headline-sm text-on-surface truncate">
                      {eggSub.name}
                    </h3>
                    <button
                      aria-label="Edit Subscription"
                      onClick={() => onShowToast('Country Eggs subscription settings')}
                      className="text-on-surface-variant hover:text-primary p-1"
                    >
                      <span className="material-symbols-outlined text-[18px]">more_vert</span>
                    </button>
                  </div>
                  <div className="flex items-center gap-1 text-on-surface-variant mt-0.5">
                    <span className="material-symbols-outlined text-tertiary text-[14px]">event_repeat</span>
                    <span className="font-body-sm text-body-sm">{eggSub.frequency}</span>
                  </div>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-tertiary-fixed text-on-tertiary-fixed font-label-sm text-label-sm">
                      <span className="material-symbols-outlined text-[12px]">schedule</span>
                      Next Drop: {eggSub.nextDrop}
                    </span>
                    <span className="font-label-sm text-label-sm text-on-surface-variant">
                      ₹{eggSub.pricePerUnit} / Pack
                    </span>
                  </div>
                </div>
              </div>

              {/* Egg Active Toggle & Quantity */}
              <div className="bg-surface-container-low rounded-lg p-space-sm flex items-center justify-between gap-space-sm">
                <div className="flex items-center gap-2">
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={!eggSub.isPaused}
                      onChange={(e) => {
                        const isPaused = !e.target.checked;
                        onUpdateSubscription(eggSub.id, { isPaused });
                        onShowToast(
                          isPaused ? 'Country Eggs subscription paused' : 'Country Eggs resumed'
                        );
                      }}
                      className="sr-only peer"
                    />
                    <div className="w-10 h-6 bg-surface-container-highest peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                  </label>
                  <span
                    className={`font-label-md text-label-md ${
                      !eggSub.isPaused ? 'text-on-surface font-semibold' : 'text-on-surface-variant'
                    }`}
                  >
                    {!eggSub.isPaused ? 'Active' : 'Paused'}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-label-sm text-label-sm text-on-surface-variant">Quantity:</span>
                  <div className="inline-flex items-center bg-surface-container-lowest rounded-full p-0.5 shadow-sm">
                    <button
                      onClick={() => {
                        const newQ = Math.max(1, eggSub.quantity - 1);
                        onUpdateSubscription(eggSub.id, { quantity: newQ });
                        onShowToast(`Egg quantity updated to ${newQ} pack`);
                      }}
                      className="w-7 h-7 rounded-full flex items-center justify-center text-primary hover:bg-secondary-container active:scale-90 transition-all"
                    >
                      <span className="material-symbols-outlined text-[16px]">remove</span>
                    </button>
                    <span className="font-title-md text-title-md text-on-surface px-2 min-w-[20px] text-center">
                      {eggSub.quantity}
                    </span>
                    <button
                      onClick={() => {
                        const newQ = Math.min(6, eggSub.quantity + 1);
                        onUpdateSubscription(eggSub.id, { quantity: newQ });
                        onShowToast(`Egg quantity updated to ${newQ} packs`);
                      }}
                      className="w-7 h-7 rounded-full flex items-center justify-center text-primary hover:bg-secondary-container active:scale-90 transition-all"
                    >
                      <span className="material-symbols-outlined text-[16px]">add</span>
                    </button>
                  </div>
                  <button
                    onClick={() => onShowToast('Edit Egg delivery schedule (Tuesdays & Fridays)')}
                    className="px-3 py-1.5 rounded-full bg-surface-container-lowest text-primary font-label-md text-label-md shadow-sm hover:bg-surface-container active:scale-95 transition-all"
                  >
                    Edit Days
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* October Delivery Matrix */}
        <div className="bg-surface-container-lowest rounded-xl p-space-md shadow-sm flex flex-col gap-space-md">
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <span className="font-title-md text-title-md text-on-surface">October Delivery Matrix</span>
              <span className="font-body-sm text-body-sm text-on-surface-variant">
                Tap any future date to skip/pause
              </span>
            </div>
            <div className="flex items-center gap-1 bg-surface-container-low px-2.5 py-1 rounded-full">
              <span className="font-label-sm text-label-sm text-on-surface-variant font-medium">Est. 31 L</span>
              <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
              <span className="font-label-sm text-label-sm text-on-surface font-bold">₹2,418</span>
            </div>
          </div>

          {/* Days of week header */}
          <div className="flex items-center justify-between px-2 pt-1 font-label-sm text-label-sm text-on-surface-variant">
            <span className="w-7 text-center">M</span>
            <span className="w-7 text-center">T</span>
            <span className="w-7 text-center">W</span>
            <span className="w-7 text-center">T</span>
            <span className="w-7 text-center">F</span>
            <span className="w-7 text-center">S</span>
            <span className="w-7 text-center">S</span>
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-y-2 gap-x-1 text-center font-body-sm text-body-sm">
            {/* Previous month trailing days */}
            {[25, 26, 27, 28, 29, 30].map((d) => (
              <div key={`prev-${d}`} className="flex flex-col items-center py-1 opacity-40">
                <span className="text-on-surface-variant">{d}</span>
              </div>
            ))}

            {/* October days 1 to 29 */}
            {Array.from({ length: 29 }, (_, i) => i + 1).map((day) => {
              const isPaused = pausedCalendarDays.includes(day);
              const isTomorrow = day === 24;
              const isPast = day < 24;

              if (isPaused) {
                return (
                  <div
                    key={day}
                    onClick={() => toggleCalendarDay(day)}
                    className="flex flex-col items-center py-1 bg-tertiary-fixed/30 rounded-lg cursor-pointer hover:opacity-80 transition-opacity"
                  >
                    <span className="text-on-tertiary-fixed font-semibold">{day}</span>
                    <span className="w-2 h-0.5 rounded bg-tertiary mt-1" title="Paused"></span>
                  </div>
                );
              }

              if (isTomorrow) {
                return (
                  <div
                    key={day}
                    className="flex flex-col items-center py-1 bg-secondary-container rounded-lg shadow-sm"
                  >
                    <span className="text-on-secondary-container font-bold">{day}</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-primary mt-0.5"></span>
                  </div>
                );
              }

              return (
                <div
                  key={day}
                  onClick={() => toggleCalendarDay(day)}
                  className={`flex flex-col items-center py-1 rounded-lg transition-colors ${
                    !isPast ? 'cursor-pointer hover:bg-surface-container' : ''
                  }`}
                >
                  <span className="text-on-surface">{day}</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-primary mt-0.5"></span>
                </div>
              );
            })}
          </div>

          {/* Calendar Legend */}
          <div className="flex items-center justify-center gap-space-lg pt-1 text-on-surface-variant font-label-sm text-label-sm">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-primary"></span>
              <span>Delivered / Scheduled</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-1.5 rounded bg-tertiary-fixed-dim"></span>
              <span>Vacation Paused</span>
            </div>
          </div>
        </div>

        {/* Doorstep Delivery Preferences */}
        <div className="bg-surface-container-lowest rounded-xl p-space-md shadow-sm flex flex-col gap-space-md">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-primary text-[18px]">doorbell</span>
              <span className="font-title-md text-title-md text-on-surface">
                Doorstep Delivery Preferences
              </span>
            </div>
            <span className="font-label-sm text-label-sm text-primary font-semibold">Saved</span>
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => {
                setPrefs((p) => ({ ...p, ringBell: !p.ringBell }));
                onShowToast(
                  !prefs.ringBell
                    ? 'Ring Doorbell instruction saved'
                    : 'Silent drop without doorbell'
                );
              }}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-full font-label-md text-label-md transition-all shadow-sm ${
                prefs.ringBell
                  ? 'bg-primary text-on-primary'
                  : 'bg-surface-container text-on-surface hover:bg-surface-container-high'
              }`}
            >
              <span className="material-symbols-outlined text-[16px]">notifications_active</span>
              <span>Ring Doorbell</span>
            </button>

            <button
              onClick={() => {
                setPrefs((p) => ({ ...p, leaveInBag: !p.leaveInBag }));
                onShowToast(
                  !prefs.leaveInBag
                    ? 'Instruction: Leave in insulated bag'
                    : 'Insulated bag instruction removed'
                );
              }}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-full font-label-md text-label-md transition-all ${
                prefs.leaveInBag
                  ? 'bg-primary text-on-primary shadow-sm'
                  : 'bg-surface-container text-on-surface hover:bg-surface-container-high'
              }`}
            >
              <span className="material-symbols-outlined text-[16px]">shopping_bag</span>
              <span>Leave in doorstep insulated bag</span>
            </button>

            <button
              onClick={() => {
                setPrefs((p) => ({ ...p, callBeforeArrival: !p.callBeforeArrival }));
                onShowToast(
                  !prefs.callBeforeArrival
                    ? 'Delivery partner will call before arrival'
                    : 'Call before arrival turned off'
                );
              }}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-full font-label-md text-label-md transition-all ${
                prefs.callBeforeArrival
                  ? 'bg-primary text-on-primary shadow-sm'
                  : 'bg-surface-container text-on-surface hover:bg-surface-container-high'
              }`}
            >
              <span className="material-symbols-outlined text-[16px]">phone_in_talk</span>
              <span>Call before arrival</span>
            </button>
          </div>

          <div className="flex items-center gap-2 p-2.5 rounded-lg bg-surface-container-low text-on-surface-variant font-body-sm text-body-sm">
            <span className="material-symbols-outlined text-primary text-[18px]">verified_user</span>
            <span>Every morning delivery is chilled at 4°C right to your doorstep by 7:00 AM.</span>
          </div>
        </div>

        {/* Farm Wallet Quick Balance Bar */}
        <div className="rounded-xl bg-surface-container-low p-space-md flex items-center justify-between gap-space-md">
          <div className="flex items-center gap-space-sm">
            <div className="w-10 h-10 rounded-full bg-secondary-container flex items-center justify-center text-on-secondary-container shrink-0">
              <span className="material-symbols-outlined text-[20px]">account_balance_wallet</span>
            </div>
            <div className="flex flex-col">
              <span className="font-label-sm text-label-sm text-on-surface-variant">
                Farm Wallet Balance
              </span>
              <span className="font-title-md text-title-md text-on-surface font-bold">
                ₹{walletBalance.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
              </span>
            </div>
          </div>
          <button
            onClick={onOpenRechargeModal}
            className="px-space-md py-2 rounded-full bg-primary text-on-primary font-label-md text-label-md hover:bg-primary-container active:scale-95 transition-all shadow-sm"
          >
            Auto-Recharge
          </button>
        </div>
      </div>
    </div>
  );
};
