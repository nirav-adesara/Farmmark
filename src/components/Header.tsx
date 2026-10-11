import React from 'react';
import { ASSETS } from '../data/mockData';

interface HeaderProps {
  currentSection: string;
  address: string;
  onOpenLocation: () => void;
  onOpenNotifications: () => void;
  onOpenProfile: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentSection,
  address,
  onOpenLocation,
  onOpenNotifications,
  onOpenProfile,
}) => {
  return (
    <header className="fixed top-0 w-full z-40 bg-surface/90 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)]">
      <div className="h-20 px-margin flex items-center justify-between gap-space-sm max-w-md mx-auto">
        <div className="flex items-center gap-space-sm min-w-0 flex-1">
          <img
            alt="Farmstead Pure Logo"
            className="h-8 w-auto object-contain shrink-0"
            src={ASSETS.logo}
          />
          <div className="flex flex-col min-w-0 cursor-pointer" onClick={onOpenLocation}>
            <div className="flex items-center gap-space-xs">
              <span className="material-symbols-outlined text-primary text-[18px]">location_on</span>
              <span className="font-title-md text-title-md text-on-surface truncate max-w-[170px] sm:max-w-[200px]">
                {address}
              </span>
              <span className="material-symbols-outlined text-on-surface-variant text-[16px]">expand_more</span>
            </div>
            <div className="flex items-center gap-space-xs">
              <span className="inline-flex items-center gap-0.5 px-space-xs py-0.5 rounded-full bg-secondary-container text-on-secondary-container font-label-sm text-label-sm">
                <span className="material-symbols-outlined text-[12px]">wb_twilight</span>
                7:00 AM Doorstep Drop
              </span>
              <span className="font-body-sm text-body-sm text-on-surface-variant truncate">
                • {currentSection}
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-space-xs shrink-0">
          <button
            aria-label="Notifications"
            onClick={onOpenNotifications}
            className="w-10 h-10 rounded-full flex items-center justify-center text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-colors relative"
          >
            <span className="material-symbols-outlined text-[22px]">notifications</span>
            <span className="w-2 h-2 rounded-full bg-[#ba1a1a] absolute top-2 right-2 ring-2 ring-white"></span>
          </button>
          <button
            aria-label="User Profile"
            onClick={onOpenProfile}
            className="w-10 h-10 flex items-center justify-center rounded-full hover:ring-2 hover:ring-primary/20 transition-all"
          >
            <img
              alt="Profile"
              className="w-8 h-8 rounded-full object-cover ring-1 ring-primary/20"
              src={ASSETS.avatar}
            />
          </button>
        </div>
      </div>
    </header>
  );
};
