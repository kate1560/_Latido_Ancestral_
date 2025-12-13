'use client';

import { useEffect } from 'react';
import { useCartStore } from '@/store/cartStore';
import { useWishlistStore } from '@/store/wishlistStore';
import { useReviewStore } from '@/store/reviewStore';
import { useQuestionStore } from '@/store/questionStore';

// Solo hidratar los stores que lo necesitan (no settings)
export default function StoreHydration() {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      useCartStore.persist.rehydrate();
      useWishlistStore.persist.rehydrate();
      useReviewStore.persist.rehydrate();
      useQuestionStore.persist.rehydrate();
    }
  }, []);

  return null;
}
