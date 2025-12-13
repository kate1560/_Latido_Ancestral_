import { create } from 'zustand';

export interface Coupon {
  code: string;
  type: 'percentage' | 'fixed';
  value: number;
  minPurchase?: number;
  maxDiscount?: number;
  expiresAt?: Date;
  usageLimit?: number;
  usedCount: number;
}

interface CouponStore {
  appliedCoupon: Coupon | null;
  availableCoupons: Coupon[];
  applyCoupon: (code: string) => boolean;
  removeCoupon: () => void;
  validateCoupon: (code: string, cartTotal: number) => { valid: boolean; message?: string };
  calculateDiscount: (cartTotal: number) => number;
}

// Sample coupons
const mockCoupons: Coupon[] = [
  { code: 'WELCOME10', type: 'percentage', value: 10, minPurchase: 50000, usedCount: 0 },
  { code: 'SUMMER20', type: 'percentage', value: 20, minPurchase: 100000, maxDiscount: 50000, usedCount: 0 },
  { code: 'FREESHIP', type: 'fixed', value: 15000, minPurchase: 80000, usedCount: 0 },
  { code: 'FIRST15', type: 'percentage', value: 15, minPurchase: 30000, usageLimit: 1, usedCount: 0 },
  { code: 'ANCESTRAL25', type: 'percentage', value: 25, minPurchase: 200000, usedCount: 0 },
];

export const useCouponStore = create<CouponStore>((set, get) => ({
  appliedCoupon: null,
  availableCoupons: mockCoupons,
  
  applyCoupon: (code) => {
    const coupon = get().availableCoupons.find((c) => c.code === code.toUpperCase());
    if (coupon) {
      set({ appliedCoupon: coupon });
      return true;
    }
    return false;
  },
  
  removeCoupon: () => {
    set({ appliedCoupon: null });
  },
  
  validateCoupon: (code, cartTotal) => {
    const coupon = get().availableCoupons.find((c) => c.code === code.toUpperCase());
    
    if (!coupon) {
      return { valid: false, message: 'Invalid coupon code' };
    }
    
    if (coupon.minPurchase && cartTotal < coupon.minPurchase) {
      return { 
        valid: false, 
        message: `Minimum purchase of $${coupon.minPurchase.toLocaleString('es-CO')} required` 
      };
    }
    
    if (coupon.expiresAt && new Date() > coupon.expiresAt) {
      return { valid: false, message: 'Coupon expired' };
    }
    
    if (coupon.usageLimit && coupon.usedCount >= coupon.usageLimit) {
      return { valid: false, message: 'Coupon already used' };
    }
    
    return { valid: true };
  },
  
  calculateDiscount: (cartTotal) => {
    const { appliedCoupon } = get();
    if (!appliedCoupon) return 0;
    
    let discount = 0;
    if (appliedCoupon.type === 'percentage') {
      discount = cartTotal * (appliedCoupon.value / 100);
      if (appliedCoupon.maxDiscount) {
        discount = Math.min(discount, appliedCoupon.maxDiscount);
      }
    } else {
      discount = appliedCoupon.value;
    }
    
    return discount;
  },
}));
