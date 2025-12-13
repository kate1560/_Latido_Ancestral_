'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getCurrentUser } from '@/lib/auth-storage';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import { ShoppingBag, Package, Truck, CheckCircle } from 'lucide-react';

export default function MyOrdersPage() {
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

  const orders = [
    { id: 'ORD-1234', date: '2024-01-15', total: 129.99, status: 'delivered', items: 3 },
    { id: 'ORD-1235', date: '2024-01-10', total: 45.99, status: 'shipped', items: 1 },
    { id: 'ORD-1236', date: '2024-01-05', total: 234.50, status: 'processing', items: 5 },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'delivered': return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'shipped': return <Truck className="w-5 h-5 text-blue-600" />;
      case 'processing': return <Package className="w-5 h-5 text-yellow-600" />;
      default: return <ShoppingBag className="w-5 h-5 text-gray-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered': return 'bg-green-100 text-green-800';
      case 'shipped': return 'bg-blue-100 text-blue-800';
      case 'processing': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen">
      <DashboardHeader 
        title="My Orders" 
        breadcrumbs={[
          { label: 'Dashboard', href: '/dashboard' },
          { label: 'My Orders' }
        ]} 
      />

      <div className="p-6">
        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order.id} className="bg-white dark:bg-dark-surface rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  {getStatusIcon(order.status)}
                  <div>
                    <h3 className="font-semibold text-dark dark:text-dark-text">{order.id}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{order.date}</p>
                  </div>
                </div>
                <span className={`px-3 py-1 text-xs font-semibold rounded-full ${getStatusColor(order.status)}`}>
                  {order.status}
                </span>
              </div>
              
              <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{order.items} items</p>
                  <p className="text-lg font-bold text-dark dark:text-dark-text">${order.total}</p>
                </div>
                <button className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90">
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
