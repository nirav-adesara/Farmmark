import React, { useState, useEffect } from 'react';
import { ASSETS } from '../data/mockData';

interface AuthScreenProps {
  onSuccess: (phone: string) => void;
  onSkip: () => void;
  onBack: () => void;
  onShowToast: (msg: string) => void;
}

export const AuthScreen: React.FC<AuthScreenProps> = ({
  onSuccess,
  onSkip,
  onBack,
  onShowToast,
}) => {
  const [phone, setPhone] = useState('98765 43210');
  const [otp, setOtp] = useState(['8', '4', '2', '']);
  const [activeOtpIdx, setActiveOtpIdx] = useState(3);
  const [resendSeconds, setResendSeconds] = useState(24);

  useEffect(() => {
    if (resendSeconds > 0) {
      const t = setInterval(() => setResendSeconds((s) => s - 1), 1000);
      return () => clearInterval(t);
    }
  }, [resendSeconds]);

  const handleOtpInput = (digit: string, idx: number) => {
    const nextOtp = [...otp];
    nextOtp[idx] = digit;
    setOtp(nextOtp);
    if (digit && idx < 3) {
      setActiveOtpIdx(idx + 1);
    }
  };

  const handleVerify = () => {
    const fullOtp = otp.join('');
    if (fullOtp.length < 4) {
      // Auto complete for smooth demo if user just clicks
      setOtp(['8', '4', '2', '9']);
    }
    onShowToast('Verification successful! Welcome to Farmstead Direct.');
    onSuccess(phone);
  };

  return (
    <div className="flex flex-col relative w-full min-h-screen bg-surface">
      {/* Header */}
      <header className="fixed top-0 w-full z-40 bg-surface/90 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.03)]">
        <div className="h-14 px-space-sm flex items-center justify-between max-w-md mx-auto">
          <button
            aria-label="Go back"
            onClick={onBack}
            className="w-11 h-11 rounded-full flex items-center justify-center text-on-surface hover:bg-surface-container transition-colors shrink-0"
          >
            <span className="material-symbols-outlined text-[24px]">arrow_back</span>
          </button>
          <div className="flex items-center justify-center gap-space-xs">
            <img
              alt="Farmstead Pure Logo"
              className="h-6 w-auto object-contain"
              src={ASSETS.logo}
            />
            <span className="font-title-md text-title-md text-primary font-semibold tracking-tight">
              Farmstead
            </span>
          </div>
          <button
            aria-label="Skip"
            onClick={onSkip}
            className="min-w-[44px] h-11 px-space-sm rounded-full flex items-center justify-center text-on-surface-variant hover:text-primary hover:bg-surface-container font-label-lg text-label-lg transition-colors shrink-0"
          >
            Skip
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex flex-col relative w-full pt-14 pb-safe bg-surface min-h-screen">
        <div className="flex flex-col w-full max-w-md mx-auto">
          {/* Brand Hero Banner Card */}
          <div className="relative w-full px-margin pt-space-md pb-space-lg overflow-hidden bg-gradient-to-b from-surface-container-low to-surface">
            {/* Ambient farm aura */}
            <div className="absolute -top-12 -right-12 w-48 h-48 rounded-full bg-secondary-fixed/25 blur-3xl pointer-events-none"></div>
            <div className="absolute top-20 -left-10 w-36 h-36 rounded-full bg-tertiary-fixed/30 blur-2xl pointer-events-none"></div>

            <div className="relative z-10 flex flex-col items-center text-center">
              {/* Fresh Bottle & Farm Vista Visual */}
              <div className="relative w-full h-36 rounded-2xl overflow-hidden shadow-sm mb-space-md">
                <img
                  className="w-full h-full object-cover"
                  alt="Bottles of milk"
                  src={ASSETS.authHeroBanner}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/20 to-transparent"></div>
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-on-primary">
                  <div className="flex items-center gap-1.5">
                    <span
                      className="material-symbols-outlined text-[18px]"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      verified
                    </span>
                    <span className="font-label-md text-label-md tracking-wider uppercase font-semibold">
                      Lab-Tested Daily
                    </span>
                  </div>
                  <span className="bg-surface-container-lowest/20 backdrop-blur-md px-2.5 py-0.5 rounded-full font-label-sm text-label-sm text-on-primary">
                    Before 7:00 AM
                  </span>
                </div>
              </div>

              {/* Tagline & Assurance */}
              <h1 className="font-headline-md text-headline-md text-on-surface font-semibold tracking-tight">
                Farmstead Direct
              </h1>
              <p className="font-body-sm text-body-sm text-on-surface-variant max-w-[280px] mt-1">
                Pure, unadulterated Cow &amp; Buffalo Milk straight from farm to doorstep by 7:00 AM.
              </p>

              {/* Welcome Offer Badge */}
              <div className="mt-space-md w-full bg-tertiary-container/10 px-3.5 py-2.5 rounded-xl flex items-center gap-2.5 shadow-sm text-left">
                <div className="w-8 h-8 rounded-full bg-tertiary-container/20 flex items-center justify-center shrink-0 text-tertiary">
                  <span
                    className="material-symbols-outlined text-[20px]"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    redeem
                  </span>
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-label-md text-label-md text-tertiary font-bold leading-tight">
                    NEW SUBSCRIBER REWARD
                  </p>
                  <p className="font-body-sm text-body-sm text-on-surface truncate">
                    ₹150 Cashback + Free DIY Milk Testing Kit
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Sign In / Authentication Container */}
          <div className="px-margin -mt-space-sm pb-space-xl flex flex-col gap-space-lg">
            {/* Phone / OTP Modular Card */}
            <div className="bg-surface-container-lowest rounded-2xl p-space-lg shadow-sm flex flex-col gap-space-md">
              {/* Header */}
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="font-headline-sm text-headline-sm text-on-surface">
                    Welcome to Fresh Mornings
                  </h2>
                  <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">
                    Log in or sign up with your mobile number
                  </p>
                </div>
                <div className="w-9 h-9 rounded-full bg-secondary-container/40 flex items-center justify-center text-primary shrink-0">
                  <span
                    className="material-symbols-outlined text-[20px]"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    eco
                  </span>
                </div>
              </div>

              {/* Mobile Input Field Segment */}
              <div className="flex flex-col gap-1.5">
                <label className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">
                  Mobile Number
                </label>
                <div className="flex items-center bg-surface-container-low rounded-xl px-3 py-2.5 transition-all focus-within:bg-surface-container-lowest focus-within:shadow-md border border-transparent focus-within:border-primary/30">
                  {/* Country Dial Code Pill */}
                  <button className="flex items-center gap-1.5 pr-2.5 mr-2.5 text-on-surface shrink-0" type="button">
                    <span className="text-[18px] leading-none">🇮🇳</span>
                    <span className="font-title-md text-title-md font-semibold">+91</span>
                    <span className="material-symbols-outlined text-[16px] text-on-surface-variant">expand_more</span>
                  </button>
                  {/* Number Input */}
                  <input
                    className="w-full bg-transparent font-title-md text-title-md text-on-surface placeholder:text-outline-variant focus:outline-none"
                    maxLength={10}
                    placeholder="Enter 10-digit number"
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                  {/* Checked State */}
                  <span
                    className="material-symbols-outlined text-primary text-[20px] shrink-0"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    check_circle
                  </span>
                </div>

                <div className="flex items-center justify-between px-1">
                  <div className="flex items-center gap-1 text-primary">
                    <span className="material-symbols-outlined text-[14px]">auto_awesome</span>
                    <span className="font-label-sm text-label-sm">Auto-reading SMS verification</span>
                  </div>
                  <button
                    onClick={() => {
                      setPhone('');
                      onShowToast('Please type your 10-digit mobile number');
                    }}
                    className="font-label-sm text-label-sm text-on-surface-variant hover:text-primary transition-colors"
                    type="button"
                  >
                    Change
                  </button>
                </div>
              </div>

              {/* OTP Entry Block */}
              <div className="flex flex-col gap-2 pt-1">
                <div className="flex items-center justify-between">
                  <label className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">
                    One Time Password (OTP)
                  </label>
                  <span className="font-label-sm text-label-sm text-primary font-semibold">
                    Sent to +91 {phone}
                  </span>
                </div>

                {/* 4 Digit Input Cells */}
                <div className="grid grid-cols-4 gap-3 py-1">
                  {otp.map((digit, idx) => {
                    const isActive = idx === activeOtpIdx;
                    return (
                      <div
                        key={idx}
                        onClick={() => setActiveOtpIdx(idx)}
                        className={`h-13 py-3 rounded-xl flex items-center justify-center font-headline-md text-headline-md cursor-pointer transition-all ${
                          digit
                            ? 'bg-surface-container-low text-on-surface font-semibold shadow-inner'
                            : isActive
                            ? 'bg-surface-container-lowest shadow-md text-primary font-bold border border-primary'
                            : 'bg-surface-container-low text-on-surface'
                        }`}
                      >
                        {digit ? (
                          digit
                        ) : isActive ? (
                          <span className="inline-block w-0.5 h-6 bg-primary animate-pulse"></span>
                        ) : (
                          ''
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Hidden real input for accessibility / typing */}
                <input
                  type="text"
                  maxLength={4}
                  className="opacity-0 h-0 w-0 absolute"
                  autoFocus
                  onChange={(e) => {
                    const val = e.target.value.slice(0, 4);
                    const arr = val.split('');
                    while (arr.length < 4) arr.push('');
                    setOtp(arr);
                    setActiveOtpIdx(Math.min(3, val.length));
                  }}
                />

                {/* Timer & Resend Utilities */}
                <div className="flex items-center justify-between mt-1 px-1">
                  <div className="flex items-center gap-1.5 text-on-surface-variant">
                    <span className="material-symbols-outlined text-[16px]">timer</span>
                    <span className="font-body-sm text-body-sm">
                      Resend in <strong className="text-on-surface font-semibold">0:{resendSeconds < 10 ? `0${resendSeconds}` : resendSeconds}s</strong>
                    </span>
                  </div>
                  <button
                    onClick={() => onShowToast('OTP sent to your WhatsApp number!')}
                    className="flex items-center gap-1 text-primary hover:text-primary-container transition-colors"
                    type="button"
                  >
                    <span className="material-symbols-outlined text-[16px]">chat</span>
                    <span className="font-label-lg text-label-lg font-semibold">Get on WhatsApp</span>
                  </button>
                </div>
              </div>

              {/* Primary Action CTA */}
              <button
                onClick={handleVerify}
                className="w-full h-12 bg-primary hover:bg-primary-container text-on-primary rounded-full font-label-lg text-label-lg flex items-center justify-center gap-2 shadow-md hover:shadow-lg active:scale-[0.99] transition-all mt-1 font-semibold"
                type="button"
              >
                <span>Verify &amp; Continue</span>
                <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
              </button>
            </div>

            {/* Alternative Sign-In Methods */}
            <div className="flex flex-col gap-space-md">
              <div className="flex items-center gap-3">
                <div className="flex-1 h-px bg-surface-container-highest"></div>
                <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-widest">
                  Or instant access with
                </span>
                <div className="flex-1 h-px bg-surface-container-highest"></div>
              </div>

              <div className="grid grid-cols-1 gap-2.5">
                {/* 1-Tap WhatsApp Auth */}
                <button
                  onClick={() => {
                    onShowToast('WhatsApp instant verification completed.');
                    onSuccess(phone);
                  }}
                  className="w-full h-12 rounded-full bg-[#25D366]/10 hover:bg-[#25D366]/15 text-[#128C7E] flex items-center justify-center gap-2.5 px-4 font-label-lg text-label-lg transition-colors active:scale-[0.99]"
                  type="button"
                >
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M12.031 2c-5.516 0-9.999 4.48-10 9.995-.001 1.763.46 3.486 1.336 5.006L2 22l5.148-1.349c1.464.798 3.111 1.218 4.88 1.219h.005c5.515 0 9.998-4.48 9.999-9.996C22.033 6.48 17.55 2 12.031 2zm0 18.293c-1.503 0-2.977-.404-4.264-1.168l-.306-.182-3.167.83.845-3.088-.2-.317a8.272 8.272 0 01-1.267-4.373c.001-4.57 3.719-8.288 8.291-8.288 2.215 0 4.297.863 5.862 2.43 1.566 1.568 2.428 3.651 2.427 5.866-.002 4.571-3.72 8.289-8.486 8.29z"></path>
                  </svg>
                  <span className="font-semibold">Instant Login via WhatsApp</span>
                </button>

                {/* Google Auth Option */}
                <button
                  onClick={() => {
                    onShowToast('Google Account verified.');
                    onSuccess(phone);
                  }}
                  className="w-full h-12 rounded-full bg-surface-container-lowest shadow-sm hover:shadow-md text-on-surface flex items-center justify-center gap-3 px-4 font-label-lg text-label-lg transition-all active:scale-[0.99]"
                  type="button"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"></path>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"></path>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05"></path>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335"></path>
                  </svg>
                  <span className="font-medium">Continue with Google</span>
                </button>
              </div>
            </div>

            {/* Farmstead Quality Promise & Guarantee Grid */}
            <div className="bg-surface-container-low/70 rounded-2xl p-space-md flex flex-col gap-3">
              <div className="flex items-center gap-1.5 px-1">
                <span className="material-symbols-outlined text-primary text-[18px]">workspace_premium</span>
                <span className="font-label-md text-label-md text-primary uppercase font-bold tracking-wider">
                  The Farmstead Pure Guarantee
                </span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {/* Pillar 1 */}
                <div className="bg-surface-container-lowest p-2.5 rounded-xl shadow-xs flex flex-col items-center text-center gap-1.5">
                  <div className="w-8 h-8 rounded-full bg-secondary-container/30 flex items-center justify-center text-primary">
                    <span
                      className="material-symbols-outlined text-[18px]"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      biotech
                    </span>
                  </div>
                  <span className="font-label-md text-label-md font-semibold text-on-surface leading-tight">
                    Free DIY Testing Kit
                  </span>
                  <span className="font-label-sm text-label-sm text-on-surface-variant leading-none">
                    Test purity at home
                  </span>
                </div>

                {/* Pillar 2 */}
                <div className="bg-surface-container-lowest p-2.5 rounded-xl shadow-xs flex flex-col items-center text-center gap-1.5">
                  <div className="w-8 h-8 rounded-full bg-tertiary-fixed/40 flex items-center justify-center text-tertiary">
                    <span
                      className="material-symbols-outlined text-[18px]"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      alarm_on
                    </span>
                  </div>
                  <span className="font-label-md text-label-md font-semibold text-on-surface leading-tight">
                    Drop by 7:00 AM
                  </span>
                  <span className="font-label-sm text-label-sm text-on-surface-variant leading-none">
                    Silent morning delivery
                  </span>
                </div>

                {/* Pillar 3 */}
                <div className="bg-surface-container-lowest p-2.5 rounded-xl shadow-xs flex flex-col items-center text-center gap-1.5">
                  <div className="w-8 h-8 rounded-full bg-secondary-container/30 flex items-center justify-center text-primary">
                    <span
                      className="material-symbols-outlined text-[18px]"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      ac_unit
                    </span>
                  </div>
                  <span className="font-label-md text-label-md font-semibold text-on-surface leading-tight">
                    4°C Cold Chain
                  </span>
                  <span className="font-label-sm text-label-sm text-on-surface-variant leading-none">
                    0 Preservatives added
                  </span>
                </div>
              </div>
            </div>

            {/* Legal & Terms Footer */}
            <div className="text-center px-4 pt-1">
              <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                By continuing, you agree to Farmstead Direct's{' '}
                <span className="text-primary underline font-medium hover:text-primary-container cursor-pointer">
                  Terms of Service
                </span>{' '}
                and{' '}
                <span className="text-primary underline font-medium hover:text-primary-container cursor-pointer">
                  Privacy Policy
                </span>.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
