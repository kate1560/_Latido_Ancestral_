import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CartItem, Product, ProductVariant } from '@/types';

interface CartStore {
  items: CartItem[];
  discountCode?: string;
  discountAmount: number;
  addItem: (product: Product, quantity: number, variant?: ProductVariant) => void;
  removeItem: (productId: string, variantId?: string) => void;
  updateQuantity: (productId: string, quantity: number, variantId?: string) => void;
  clearCart: () => void;
  applyDiscount: (code: string) => boolean;
  removeDiscount: () => void;
  getSubtotal: () => number;
  getTotal: () => number;
  getItemCount: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      discountCode: undefined,
      discountAmount: 0,

      addItem: (product, quantity, variant) => {
        set((state) => {
          const existingItemIndex = state.items.findIndex(
            (item) =>
              item.product.id === product.id &&
              item.variant?.id === variant?.id
          );

          if (existingItemIndex > -1) {
            const newItems = [...state.items];
            newItems[existingItemIndex].quantity += quantity;
            return { items: newItems };
          }

          return { items: [...state.items, { product, quantity, variant }] };
        });
      },

      removeItem: (productId, variantId) => {
        set((state) => ({
          items: state.items.filter(
            (item) =>
              !(item.product.id === productId && item.variant?.id === variantId)
          ),
        }));
      },

      updateQuantity: (productId, quantity, variantId) => {
        set((state) => ({
          items: state.items.map((item) =>
            item.product.id === productId && item.variant?.id === variantId
              ? { ...item, quantity }
              : item
          ),
        }));
      },

      clearCart: () => set({ items: [], discountCode: undefined, discountAmount: 0 }),

      applyDiscount: (code: string) => {
        // Simulación de validación de códigos
        const discountCodes: Record<string, number> = {
          'SAVE10': 10,
          'SAVE20': 20,
          'WELCOME': 15,
          'ANCESTRAL10': 10,
        };

        const discount = discountCodes[code.toUpperCase()];
        if (discount) {
          set({ discountCode: code.toUpperCase(), discountAmount: discount });
          return true;
        }
        return false;
      },

      removeDiscount: () => set({ discountCode: undefined, discountAmount: 0 }),

      getSubtotal: () => {
        const items = get().items;
        return items.reduce((total, item) => {
          const variantPrice = item.variant?.priceModifier || 0;
          return total + (item.product.price + variantPrice) * item.quantity;
        }, 0);
      },

      getTotal: () => {
        const subtotal = get().getSubtotal();
        const discountAmount = get().discountAmount;
        return subtotal - (subtotal * discountAmount / 100);
      },

      getItemCount: () => {
        const items = get().items;
        return items.reduce((count, item) => count + item.quantity, 0);
      },
    }),
    {
      name: 'cart-storage',
      skipHydration: true,
    }
  )
);
