'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getCurrentUser } from '@/lib/auth-storage';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import { Package, Plus, Edit, Trash2, Search, Filter, X } from 'lucide-react';
import { toast } from 'react-hot-toast';

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  stock: number;
  status: 'active' | 'inactive';
  image: string;
  managerId?: string;
}

// Mock data
const mockProducts: Product[] = [
  { id: 1, name: 'Vueltiao Hat', category: 'Hats', price: 45.99, stock: 32, status: 'active', image: '/assets/assets1/hat1.jpg', managerId: '2' },
  { id: 2, name: 'Wayuu Bag', category: 'Bags', price: 89.99, stock: 18, status: 'active', image: '/assets/assets2/bag1.jpg', managerId: '2' },
  { id: 3, name: 'Hammock Chair', category: 'Home Decor', price: 129.99, stock: 12, status: 'active', image: '/assets/assets3/hammock1.jpg' },
  { id: 4, name: 'Ceramic Vase', category: 'Home Decor', price: 34.99, stock: 25, status: 'active', image: '/assets/assets4/vase1.jpg' },
  { id: 5, name: 'Woven Bracelet', category: 'Jewelry', price: 15.99, stock: 50, status: 'active', image: '/assets/assets5/bracelet1.jpg', managerId: '2' },
];

export default function ProductsPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  useEffect(() => {
    const currentUser = getCurrentUser();
    if (!currentUser) {
      router.push('/login');
      return;
    }
    setUser(currentUser);

    // Filter products based on role
    if (currentUser.role === 'store_manager') {
      // Store manager only sees their own products
      // Convert both to string for comparison
      const managerProducts = mockProducts.filter(p => p.managerId === String(currentUser.id));
      setProducts(managerProducts);
      setFilteredProducts(managerProducts);
    } else {
      // Admin sees all products
      setProducts(mockProducts);
      setFilteredProducts(mockProducts);
    }
  }, [router]);

  useEffect(() => {
    let filtered = products;

    if (searchTerm) {
      filtered = filtered.filter(p => 
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(p => p.category === selectedCategory);
    }

    setFilteredProducts(filtered);
  }, [searchTerm, selectedCategory, products]);

  const handleDelete = (id: number) => {
    try {
      console.log('=== DELETE FUNCTION CALLED ===');
      console.log('Product ID:', id);
      console.log('Current user:', user);
      
      if (!user) {
        alert('User not authenticated');
        toast.error('User not authenticated');
        return;
      }

      if (user.role !== 'admin' && user.role !== 'store_manager') {
        alert('You do not have permission to delete products');
        toast.error('You do not have permission to delete products');
        return;
      }

      // Store manager can only delete their own products
      if (user.role === 'store_manager') {
        const product = products.find(p => p.id === id);
        console.log('Found product:', product);
        console.log('Comparing:', product?.managerId, 'with', String(user.id));
        if (product && product.managerId !== String(user.id)) {
          alert('You can only delete your own products');
          toast.error('You can only delete your own products');
          return;
        }
      }

      if (window.confirm('Are you sure you want to delete this product?')) {
        console.log('User confirmed deletion');
        const updatedProducts = products.filter(p => p.id !== id);
        console.log('Updated products:', updatedProducts);
        setProducts(updatedProducts);
        setFilteredProducts(updatedProducts);
        alert('Product deleted successfully!');
        toast.success('Product deleted successfully');
      } else {
        console.log('User cancelled deletion');
      }
    } catch (error) {
      console.error('Error in handleDelete:', error);
      alert('Error deleting product: ' + error);
    }
  };

  const handleEdit = (product: Product) => {
    try {
      console.log('=== EDIT FUNCTION CALLED ===');
      console.log('Product:', product);
      console.log('Current user:', user);
      
      if (!user) {
        alert('User not authenticated');
        toast.error('User not authenticated');
        return;
      }

      // Admin can edit any product
      if (user.role === 'admin') {
        alert('Opening edit modal for: ' + product.name);
        toast.success('Opening edit modal for: ' + product.name);
        setEditingProduct(product);
        setIsModalOpen(true);
        return;
      }
      
      // Store manager can only edit their own products
      if (user.role === 'store_manager') {
        console.log('Comparing:', product.managerId, 'with', String(user.id));
        if (product.managerId !== String(user.id)) {
          alert('You can only edit your own products');
          toast.error('You can only edit your own products');
          return;
        }
        alert('Opening edit modal for: ' + product.name);
        toast.success('Opening edit modal for: ' + product.name);
        setEditingProduct(product);
        setIsModalOpen(true);
        return;
      }
      
      // Other roles cannot edit
      alert('You do not have permission to edit products');
      toast.error('You do not have permission to edit products');
    } catch (error) {
      console.error('Error in handleEdit:', error);
      alert('Error editing product: ' + error);
    }
  };

  const categories = ['all', ...Array.from(new Set(products.map(p => p.category)))];

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  const canCreate = user.role === 'admin' || user.role === 'store_manager';
  const canDelete = user.role === 'admin';

  return (
    <div className="min-h-screen">
      <DashboardHeader 
        title="Products" 
        breadcrumbs={[
          { label: 'Dashboard', href: '/dashboard' },
          { label: 'Products' }
        ]} 
      />

      <div className="p-6">
        {/* Header Actions */}
        <div className="mb-6 flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
          <div className="flex-1 max-w-md">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary dark:bg-dark-surface dark:text-dark-text"
              />
            </div>
          </div>

          <div className="flex gap-3">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary dark:bg-dark-surface dark:text-dark-text"
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>
                  {cat === 'all' ? 'All Categories' : cat}
                </option>
              ))}
            </select>

            {canCreate && (
              <button
                onClick={() => {
                  setEditingProduct(null);
                  setIsModalOpen(true);
                }}
                className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
              >
                <Plus className="w-5 h-5" />
                Add Product
              </button>
            )}
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <div key={product.id} className="bg-white dark:bg-dark-surface rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <div className="aspect-square bg-gray-200 dark:bg-gray-700 relative">
                <Package className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 text-gray-400" />
              </div>
              
              <div className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-semibold text-dark dark:text-dark-text">{product.name}</h3>
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    product.status === 'active' 
                      ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' 
                      : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
                  }`}>
                    {product.status}
                  </span>
                </div>
                
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{product.category}</p>
                
                <div className="flex items-center justify-between mb-3">
                  <span className="text-lg font-bold text-primary">${product.price}</span>
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    Stock: {product.stock}
                  </span>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      console.log('Edit button clicked');
                      handleEdit(product);
                    }}
                    className="flex-1 flex items-center justify-center gap-1 px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm"
                  >
                    <Edit className="w-4 h-4" />
                    Edit
                  </button>
                  
                  {(user.role === 'admin' || (user.role === 'store_manager' && product.managerId === String(user.id))) && (
                    <button
                      onClick={() => {
                        console.log('Delete button clicked');
                        handleDelete(product.id);
                      }}
                      className="flex items-center justify-center gap-1 px-3 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors text-sm"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-600 dark:text-gray-400 mb-2">
              No products found
            </h3>
            <p className="text-gray-500 dark:text-gray-500">
              {searchTerm || selectedCategory !== 'all' 
                ? 'Try adjusting your filters' 
                : 'Start by adding your first product'}
            </p>
          </div>
        )}
      </div>

      {/* Product Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-dark-surface rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-dark dark:text-dark-text">
                  {editingProduct ? 'Edit Product' : 'Add New Product'}
                </h2>
                <button
                  onClick={() => {
                    setIsModalOpen(false);
                    setEditingProduct(null);
                  }}
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <form onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.currentTarget);
                const productData = {
                  id: editingProduct?.id || Date.now(),
                  name: formData.get('name') as string,
                  category: formData.get('category') as string,
                  price: parseFloat(formData.get('price') as string),
                  stock: parseInt(formData.get('stock') as string),
                  status: formData.get('status') as 'active' | 'inactive',
                  image: '/assets/assets1/hat1.jpg',
                  managerId: user?.role === 'store_manager' ? String(user.id) : editingProduct?.managerId
                };

                if (editingProduct) {
                  // Update existing product
                  const updatedProducts = products.map(p => 
                    p.id === editingProduct.id ? { ...p, ...productData } : p
                  );
                  setProducts(updatedProducts);
                  setFilteredProducts(updatedProducts);
                  toast.success('Product updated successfully');
                } else {
                  // Add new product
                  const newProducts = [...products, productData as Product];
                  setProducts(newProducts);
                  setFilteredProducts(newProducts);
                  toast.success('Product added successfully');
                }

                setIsModalOpen(false);
                setEditingProduct(null);
              }}>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Product Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      defaultValue={editingProduct?.name}
                      required
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-primary focus:border-primary dark:bg-dark-surface dark:text-dark-text"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Category
                    </label>
                    <select
                      name="category"
                      defaultValue={editingProduct?.category}
                      required
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-primary focus:border-primary dark:bg-dark-surface dark:text-dark-text"
                    >
                      <option value="Hats">Hats</option>
                      <option value="Bags">Bags</option>
                      <option value="Home Decor">Home Decor</option>
                      <option value="Jewelry">Jewelry</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Price ($)
                      </label>
                      <input
                        type="number"
                        name="price"
                        step="0.01"
                        defaultValue={editingProduct?.price}
                        required
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-primary focus:border-primary dark:bg-dark-surface dark:text-dark-text"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Stock
                      </label>
                      <input
                        type="number"
                        name="stock"
                        defaultValue={editingProduct?.stock}
                        required
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-primary focus:border-primary dark:bg-dark-surface dark:text-dark-text"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Status
                    </label>
                    <select
                      name="status"
                      defaultValue={editingProduct?.status || 'active'}
                      required
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-primary focus:border-primary dark:bg-dark-surface dark:text-dark-text"
                    >
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                    </select>
                  </div>
                </div>

                <div className="flex gap-3 mt-6">
                  <button
                    type="button"
                    onClick={() => {
                      setIsModalOpen(false);
                      setEditingProduct(null);
                    }}
                    className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors"
                  >
                    {editingProduct ? 'Update Product' : 'Add Product'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
