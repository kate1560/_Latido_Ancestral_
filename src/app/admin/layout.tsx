'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FaHome, FaStore, FaBox, FaShoppingCart, FaUsers, FaCog } from 'react-icons/fa';

interface NavLinkProps {
  href: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  currentPath: string;
}

function NavLink({ href, icon, children, currentPath }: NavLinkProps) {
  const isActive = currentPath === href || currentPath.startsWith(href + '/');
  
  return (
    <Link
      href={href}
      className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
        isActive
          ? 'bg-[#8B4513] text-white'
          : 'text-gray-700 hover:bg-gray-100'
      }`}
    >
      {icon}
      <span>{children}</span>
    </Link>
  );
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-white shadow-lg min-h-screen fixed left-0 top-[120px] bottom-0">
          <div className="p-6">
            <h2 className="text-xl font-bold text-[#8B4513] mb-6">Admin Panel</h2>
            <nav className="space-y-2">
              <NavLink href="/admin" icon={<FaHome size={20} />} currentPath={pathname}>
                Dashboard
              </NavLink>
              <NavLink href="/admin/vendors" icon={<FaStore size={20} />} currentPath={pathname}>
                Vendors
              </NavLink>
              <NavLink href="/admin/products" icon={<FaBox size={20} />} currentPath={pathname}>
                Products
              </NavLink>
              <NavLink href="/admin/orders" icon={<FaShoppingCart size={20} />} currentPath={pathname}>
                Orders
              </NavLink>
              <NavLink href="/admin/users" icon={<FaUsers size={20} />} currentPath={pathname}>
                Users
              </NavLink>
              <NavLink href="/admin/settings" icon={<FaCog size={20} />} currentPath={pathname}>
                Settings
              </NavLink>
            </nav>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 ml-64 p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
