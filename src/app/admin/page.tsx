'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { FaStore, FaBox, FaShoppingCart, FaUsers } from 'react-icons/fa';

interface Stats {
  vendors: number;
  products: number;
  orders: number;
  users: number;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats>({
    vendors: 0,
    products: 0,
    orders: 0,
    users: 0,
  });

  useEffect(() => {
    // Fetch stats from API
    fetch('/api/admin/stats')
      .then(res => res.json())
      .then(data => setStats(data))
      .catch(err => console.error('Failed to fetch stats:', err));
  }, []);

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8 text-[#8B4513]">Admin Dashboard</h1>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <StatCard
          icon={<FaStore size={32} />}
          title="Vendors"
          value={stats.vendors}
          link="/admin/vendors"
          color="#8B4513"
        />
        <StatCard
          icon={<FaBox size={32} />}
          title="Products"
          value={stats.products}
          link="/admin/products"
          color="#D2691E"
        />
        <StatCard
          icon={<FaShoppingCart size={32} />}
          title="Orders"
          value={stats.orders}
          link="/admin/orders"
          color="#F4A460"
        />
        <StatCard
          icon={<FaUsers size={32} />}
          title="Users"
          value={stats.users}
          link="/admin/users"
          color="#8B4513"
        />
      </div>

      {/* Quick Actions */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
        <h2 className="text-2xl font-bold mb-6 text-[#8B4513]">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link 
            href="/admin/vendors/applications"
            className="p-6 bg-[#FFF8DC] hover:bg-[#FFE4B5] rounded-lg border-2 border-[#D2691E] transition-colors"
          >
            <h3 className="font-bold text-lg mb-2">Vendor Applications</h3>
            <p className="text-sm text-gray-600">Review pending applications</p>
          </Link>
          <Link 
            href="/admin/products/new"
            className="p-6 bg-[#FFF8DC] hover:bg-[#FFE4B5] rounded-lg border-2 border-[#D2691E] transition-colors"
          >
            <h3 className="font-bold text-lg mb-2">Add Product</h3>
            <p className="text-sm text-gray-600">Create new product listing</p>
          </Link>
          <Link 
            href="/admin/orders"
            className="p-6 bg-[#FFF8DC] hover:bg-[#FFE4B5] rounded-lg border-2 border-[#D2691E] transition-colors"
          >
            <h3 className="font-bold text-lg mb-2">Manage Orders</h3>
            <p className="text-sm text-gray-600">View and process orders</p>
          </Link>
        </div>
      </div>
    </div>
  );
}

interface StatCardProps {
  icon: React.ReactNode;
  title: string;
  value: number;
  link: string;
  color: string;
}

function StatCard({ icon, title, value, link, color }: StatCardProps) {
  return (
    <Link href={link}>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow border-2 border-transparent hover:border-[#D2691E]">
        <div className="flex items-center justify-between mb-4">
          <div style={{ color }}>{icon}</div>
          <span className="text-3xl font-bold" style={{ color }}>{value}</span>
        </div>
        <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">{title}</h3>
      </div>
    </Link>
  );
}
