'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { FaBox, FaShoppingCart, FaChartLine, FaDollarSign, FaArrowUp } from 'react-icons/fa';
import { useUserStore } from '@/store/userStore';

interface StoreStat {
  productsCount: number;
  salesCount: number;
  totalRevenue: number;
  averageOrderValue: number;
}

interface StatCardProps {
  icon: React.ReactNode;
  title: string;
  value: number | string;
  link: string;
  color: string;
  change?: string;
}

function StatCard({ icon, title, value, link, color, change }: StatCardProps) {
  return (
    <Link href={link}>
      <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow border-2 border-transparent hover:border-[#D2691E] cursor-pointer h-full">
        <div className="flex items-center justify-between mb-4">
          <div style={{ color }} className="text-4xl">{icon}</div>
          <span className="text-3xl font-bold" style={{ color }}>{value}</span>
        </div>
        <h3 className="text-lg font-semibold text-gray-700">{title}</h3>
        {change && (
          <div className="flex items-center gap-1 mt-2 text-green-600 text-sm">
            <FaArrowUp size={12} />
            <span>{change}</span>
          </div>
        )}
      </div>
    </Link>
  );
}

export default function StoreManagerDashboard() {
  const { user } = useUserStore();
  const [stats, setStats] = useState<StoreStat>({
    productsCount: 0,
    salesCount: 0,
    totalRevenue: 0,
    averageOrderValue: 0,
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Fetch store manager stats from API
    const fetchStats = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('/api/store-manager/stats');
        if (response.ok) {
          const data = await response.json();
          setStats(data);
        }
      } catch (err) {
        console.error('Failed to fetch stats:', err);
        // Usar datos de prueba
        setStats({
          productsCount: 24,
          salesCount: 156,
          totalRevenue: 45200,
          averageOrderValue: 290,
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold mb-2 text-[#8B4513]">Welcome back, {user?.firstName}! 👋</h1>
        <p className="text-gray-600">Here's your store performance overview.</p>
      </div>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          icon={<FaBox />}
          title="My Products"
          value={stats.productsCount}
          link="/store-manager/products"
          color="#f59e0b"
          change={`${stats.productsCount} listed`}
        />
        <StatCard
          icon={<FaShoppingCart />}
          title="Sales"
          value={stats.salesCount}
          link="/store-manager/sales"
          color="#ec4899"
          change="This month"
        />
        <StatCard
          icon={<FaDollarSign />}
          title="Total Revenue"
          value={`$${stats.totalRevenue.toLocaleString()}`}
          link="/store-manager/sales"
          color="#10b981"
          change="This month"
        />
        <StatCard
          icon={<FaChartLine />}
          title="Avg Order Value"
          value={`$${stats.averageOrderValue}`}
          link="/store-manager/sales"
          color="#3b82f6"
          change="Per order"
        />
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-2xl font-bold mb-6 text-[#8B4513]">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link 
            href="/store-manager/products/new"
            className="p-6 bg-gradient-to-br from-amber-50 to-amber-100 hover:from-amber-100 hover:to-amber-200 rounded-lg border-2 border-amber-300 transition-all"
          >
            <h3 className="font-bold text-lg mb-2 text-amber-900">Add New Product</h3>
            <p className="text-sm text-amber-700">Create and list a new product</p>
          </Link>
          <Link 
            href="/store-manager/sales"
            className="p-6 bg-gradient-to-br from-pink-50 to-pink-100 hover:from-pink-100 hover:to-pink-200 rounded-lg border-2 border-pink-300 transition-all"
          >
            <h3 className="font-bold text-lg mb-2 text-pink-900">View Sales</h3>
            <p className="text-sm text-pink-700">Check your sales and orders</p>
          </Link>
        </div>
      </div>

      {/* Recent Products */}
      <div className="bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-2xl font-bold mb-6 text-[#8B4513]">Low Stock Products</h2>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-4 bg-yellow-50 rounded-lg border-l-4 border-yellow-400">
            <div>
              <p className="font-semibold text-gray-800">Colombian Wayuu Bag</p>
              <p className="text-sm text-gray-500">Only 3 units left</p>
            </div>
            <Link href="/store-manager/products" className="text-sm bg-yellow-200 hover:bg-yellow-300 text-yellow-900 px-3 py-1 rounded-full font-medium">
              Restock
            </Link>
          </div>
          <div className="flex items-center justify-between p-4 bg-yellow-50 rounded-lg border-l-4 border-yellow-400">
            <div>
              <p className="font-semibold text-gray-800">Handmade Hammock</p>
              <p className="text-sm text-gray-500">Only 5 units left</p>
            </div>
            <Link href="/store-manager/products" className="text-sm bg-yellow-200 hover:bg-yellow-300 text-yellow-900 px-3 py-1 rounded-full font-medium">
              Restock
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
