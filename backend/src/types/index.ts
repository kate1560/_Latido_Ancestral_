import { Request } from 'express';

// ============================================
// EXTENSIÓN DE REQUEST
// ============================================

export interface RequestWithUser extends Request {
  user?: User;
  body: any;
  params: Record<string, string>;
  query: Record<string, string | string[]>;
}

// ============================================
// PRODUCTOS
// ============================================

export interface ProductVariant {
  id: string;
  size?: string;
  color?: string;
  material?: string;
  model?: string;
  stock: number;
  priceModifier?: number;
}

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  stock: number;
  color?: string;
  featured?: boolean;
  brand?: string;
  material?: string;
  variants?: ProductVariant[];
  tags?: string[];
  rating?: number;
  reviewsCount?: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface CreateProductDTO {
  name: string;
  description: string;
  price: number;
  category: string;
  image?: string;
  stock?: number;
  color?: string;
  featured?: boolean;
}

export interface UpdateProductDTO extends Partial<CreateProductDTO> {}

// ============================================
// USUARIOS
// ============================================

export type UserRole = 'user' | 'admin' | 'vendor' | 'customer';

export interface User {
  id: number;
  email: string;
  password?: string;
  firstName?: string;
  lastName?: string;
  name?: string;
  phone?: string;
  address?: string;
  city?: string;
  country?: string;
  role: UserRole;
  avatar?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface CreateUserDTO {
  name: string;
  email: string;
  password: string;
}

export interface RegisterDTO {
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
}

export interface UpdateUserDTO {
  name?: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  address?: string;
  city?: string;
  country?: string;
  avatar?: string;
}

export interface LoginDTO {
  email: string;
  password: string;
}

export interface AuthResponse {
  success: boolean;
  token?: string;
  user?: Omit<User, 'password'>;
  message: string;
}

// ============================================
// FAVORITOS (WISHLIST)
// ============================================

export interface WishlistItem {
  productId: number;
  userId: string;
  addedAt: Date;
}

export interface AddToWishlistDTO {
  productId: number;
}

// ============================================
// PRODUCTOS RECOMENDADOS
// ============================================

export interface RecommendedProduct {
  id: number;
  name: string;
  category?: string;
  rating?: number;
  price?: number;
}

// ============================================
// ÓRDENES
// ============================================

export type OrderStatus = 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';

export type PaymentMethod = 'card' | 'paypal' | 'transfer' | 'cash_on_delivery';

export interface OrderItem {
  productId: number;
  quantity: number;
  price?: number;
  name?: string;
}

export interface Order {
  id: number;
  userId: number;
  items: OrderItem[];
  total: number;
  status: OrderStatus;
  shippingAddress?: string;
  paymentMethod?: PaymentMethod;
  trackingNumber?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateOrderDTO {
  userId: number;
  items: OrderItem[];
  total: number;
  shippingAddress?: string;
  paymentMethod?: PaymentMethod;
}

export interface UpdateOrderStatusDTO {
  status: OrderStatus;
  trackingNumber?: string;
}

// ============================================
// RESPUESTAS API
// ============================================

export interface ApiResponse<T = any> {
  success?: boolean;
  data?: T;
  message?: string;
  error?: string;
  count?: number;
  status?: string;
}

export interface PaginationParams {
  page?: number;
  limit?: number;
  skip?: number;
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  count: number;
  total: number;
  page: number;
  pages: number;
}



// ============================================
// CONFIG
// ============================================

export interface AppConfig {
  PORT: string | number;
  NODE_ENV: 'development' | 'production' | 'test';
  DATABASE_URL?: string;
  JWT_SECRET: string;
  JWT_EXPIRE: string;
  CORS_ORIGIN: string;
}
