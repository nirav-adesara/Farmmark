import React, { useState } from 'react';

interface LocationModalProps {
  isOpen: boolean;
  currentAddress: string;
  onSelectAddress: (address: string) => void;
  onClose: () => void;
}

export const LocationModal: React.FC<LocationModalProps> = ({
  isOpen,
  currentAddress,
  onSelectAddress,
  onClose,
}) => {
  const [addresses, setAddresses] = useState([
    {
      id: 'addr-1',
      tag: 'Home',
      title: 'Flat 402, Green Glen Layout',
      subtitle: 'Bellandur, Outer Ring Rd, Bengaluru - 560103',
      default: true,
    },
    {
      id: 'addr-2',
      tag: 'Office',
      title: 'Tower 4, Embassy TechVillage',
      subtitle: 'Devarabisanahalli, Outer Ring Rd, Bengaluru - 560103',
      default: false,
    },
    {
      id: 'addr-3',
      tag: 'Parents',
      title: 'Villa 12, Palm Meadows',
      subtitle: 'Ramagondanahalli, Whitefield, Bengaluru - 560066',
      default: false,
    },
  ]);

  const [newTitle, setNewTitle] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-[#2b322d]/60 backdrop-blur-sm flex items-end justify-center p-0 animate-in fade-in duration-200">
      <div className="w-full max-w-md bg-surface rounded-t-2xl p-space-lg flex flex-col gap-space-md shadow-2xl max-h-[85vh] overflow-y-auto no-scrollbar">
        <div className="flex items-center justify-between pb-1 border-b border-surface-container-high">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-[24px]">location_on</span>
            <h3 className="font-headline-sm text-headline-sm text-on-surface">Delivery Address</h3>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full flex items-center justify-center text-on-surface-variant hover:bg-surface-container"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        <div className="flex items-center gap-2 p-2.5 rounded-lg bg-secondary-container/40 text-on-secondary-container text-body-sm font-body-sm">
          <span className="material-symbols-outlined text-[18px]">wb_twilight</span>
          <span>Guaranteed 7:00 AM delivery to all addresses within Bangalore delivery grid.</span>
        </div>

        <div className="flex flex-col gap-2">
          {addresses.map((item) => {
            const isSelected = item.title === currentAddress;
            return (
              <div
                key={item.id}
                onClick={() => {
                  onSelectAddress(item.title);
                  onClose();
                }}
                className={`p-space-sm rounded-xl cursor-pointer transition-all border flex items-start justify-between gap-3 ${
                  isSelected
                    ? 'bg-surface-container-lowest border-primary shadow-sm'
                    : 'bg-surface-container-lowest border-transparent hover:bg-surface-container-low'
                }`}
              >
                <div className="flex items-start gap-2.5 min-w-0">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                      isSelected ? 'bg-primary text-white' : 'bg-surface-container text-on-surface-variant'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[18px]">
                      {item.tag === 'Home' ? 'home' : item.tag === 'Office' ? 'apartment' : 'location_pin'}
                    </span>
                  </div>
                  <div className="flex flex-col min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-title-md text-title-md text-on-surface truncate">
                        {item.title}
                      </span>
                      <span className="font-label-sm text-label-sm px-1.5 py-0.5 rounded bg-surface-container-high text-on-surface-variant">
                        {item.tag}
                      </span>
                    </div>
                    <span className="font-body-sm text-body-sm text-on-surface-variant mt-0.5 line-clamp-1">
                      {item.subtitle}
                    </span>
                  </div>
                </div>
                {isSelected && (
                  <span className="material-symbols-outlined text-primary text-[20px] shrink-0" style={{ fontVariationSettings: "'FILL' 1" }}>
                    check_circle
                  </span>
                )}
              </div>
            );
          })}
        </div>

        {showAddForm ? (
          <div className="p-space-sm rounded-xl bg-surface-container-low flex flex-col gap-2">
            <span className="font-label-md text-label-md text-on-surface font-bold">Add New Doorstep Address</span>
            <input
              type="text"
              placeholder="House / Flat No, Apartment Name, Street"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              className="w-full h-11 px-3 rounded-lg bg-surface-container-lowest border border-outline-variant text-on-surface font-body-md focus:outline-none focus:border-primary"
            />
            <div className="flex gap-2 pt-1">
              <button
                type="button"
                onClick={() => {
                  if (newTitle.trim()) {
                    setAddresses((prev) => [
                      ...prev,
                      {
                        id: `addr-${Date.now()}`,
                        tag: 'Other',
                        title: newTitle.trim(),
                        subtitle: 'Bengaluru doorstep drop',
                        default: false,
                      },
                    ]);
                    onSelectAddress(newTitle.trim());
                    setShowAddForm(false);
                    onClose();
                  }
                }}
                className="flex-1 py-2 rounded-lg bg-primary text-white font-label-lg"
              >
                Save & Select
              </button>
              <button
                type="button"
                onClick={() => setShowAddForm(false)}
                className="px-4 py-2 rounded-lg bg-surface-container-high text-on-surface font-label-lg"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => setShowAddForm(true)}
            className="w-full py-2.5 rounded-xl border border-dashed border-primary text-primary font-label-lg flex items-center justify-center gap-1.5 hover:bg-secondary-container/20 transition-colors"
          >
            <span className="material-symbols-outlined text-[18px]">add</span>
            <span>Add New Doorstep Address</span>
          </button>
        )}
      </div>
    </div>
  );
};
