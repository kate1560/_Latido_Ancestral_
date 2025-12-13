'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getCurrentUser } from '@/lib/auth-storage';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import { Heart, ShoppingCart, Trash2, Package } from 'lucide-react';

export default function WishlistPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const currentUser = getCurrentUser();
    if (!currentUser) {
      router.push('/login');
      return;
    }
    setUser(currentUser);
  }, [router]);

  if (!user) return null;

  const wishlistItems = [
    { id: 1, name: 'Vueltiao Hat', price: 45.99, category: 'Hats', inStock: true },
    { id: 2, name: 'Wayuu Bag', price: 89.99, category: 'Bags', inStock: true },
    { id: 3, name: 'Ceramic Vase', price: 34.99, category: 'Home Decor', inStock: false },
  ];

  return (
    <div className="min-h-screen">
      <DashboardHeader 
        title="My Wishlist" 
        breadcrumbs={[
          { label: 'Dashboard', href: '/dashboard' },
          { label: 'Wishlist' }
        ]} 
      />

      <div className="p-6">
        {wishlistItems.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {wishlistItems.map((item) => (
              <div key={item.id} className="bg-white dark:bg-dark-surface rounded-lg shadow-md overflow-hidden">
                <div className="aspect-square bg-gray-200 dark:bg-gray-700 relative">
                  <Package className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 text-gray-400" />
                  <button className="absolute top-3 right-3 p-2 bg-white dark:bg-dark-surface rounded-full shadow-md hover:bg-red-50">
                    <Heart className="w-5 h-5 text-red-500 fill-red-500" />
                  </button>
                </div>
                
                <div className="p-4">
                  <h3 className="font-semibold text-dark dark:text-dark-text mb-1">{item.name}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">{item.category}</p>
                  
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-lg font-bold text-primary">${item.price}</span>
                    <span className={`text-sm ${item.inStock ? 'text-green-600' : 'text-red-600'}`}>
                      {item.inStock ? 'In Stock' : 'Out of Stock'}
                    </span>
                  </div>

                  <div className="flex gap-2">
                    <button 
                      disabled={!item.inStock}
                      className="flex-1 flex items-center justify-center gap-1 px-3 py-2 bg-primary text-white rounded-md hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                    >
                      <ShoppingCart className="w-4 h-4" />
                      Add to Cart
                    </button>
                    <button className="flex items-center justify-center gap-1 px-3 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 text-sm">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <Heart className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-600 dark:text-gray-400 mb-2">
              Your wishlist is empty
            </h3>
            <p className="text-gray-500 dark:text-gray-500 mb-4">
              Start adding products you love!
            </p>
            <button className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90">
              Browse Products
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
