export interface Product {
  id: string;
  name: string;
  category: 'cow-milk' | 'buffalo-milk' | 'eggs' | 'ghee' | 'coconut' | 'breads' | 'oils' | 'curd';
  subtitle: string;
  badge: string;
  badgeType: 'amber' | 'green' | 'gray';
  size: string;
  price: number;
  originalPrice?: number;
  trialPrice?: number;
  unit: string;
  image: string;
  description: string;
  breed?: string;
  milkedTime?: string;
  purityScore?: string;
  fat?: string;
  snf?: string;
}

export interface SubscriptionItem {
  id: string;
  productId: string;
  name: string;
  badge: string;
  image: string;
  frequency: string;
  nextDrop: string;
  pricePerUnit: number;
  unit: string;
  quantity: number;
  isPaused: boolean;
  isTomorrowSkipped: boolean;
  scheduleDays?: string[];
  slot: 'morning' | 'evening';
}

export interface LedgerTransaction {
  id: string;
  title: string;
  subtitle: string;
  timestamp: string;
  orderId: string;
  amount: number; // negative for deduction, positive for topup
  balanceAfter: number;
  type: 'deduction' | 'topup';
}

export interface UserProfile {
  name: string;
  phone: string;
  address: string;
  area: string;
  isVip: boolean;
  vipDaysLeft: number;
  walletBalance: number;
  autoRecharge: boolean;
  autoRechargeThreshold: number;
  autoRechargeAmount: number;
  deliveryPreferences: {
    ringBell: boolean;
    leaveInBag: boolean;
    callBeforeArrival: boolean;
  };
}
