-- ========================================
-- SCHEMA EXTENSIONS FOR MULTI-VENDOR MARKETPLACE
-- ========================================

-- Add roles and vendor fields to users table
ALTER TABLE users ADD COLUMN IF NOT EXISTS role VARCHAR(20) DEFAULT 'user' CHECK (role IN ('user', 'vendor', 'provider', 'admin'));
ALTER TABLE users ADD COLUMN IF NOT EXISTS vendor_id UUID;
ALTER TABLE users ADD COLUMN IF NOT EXISTS status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'suspended', 'pending'));
ALTER TABLE users ADD COLUMN IF NOT EXISTS phone VARCHAR(50);

-- Create vendors table
CREATE TABLE IF NOT EXISTS vendors (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  business_name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  description TEXT,
  logo VARCHAR(500),
  banner VARCHAR(500),
  owner_id UUID REFERENCES users(id) ON DELETE SET NULL,
  status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'active', 'suspended', 'rejected')),
  commission_rate DECIMAL(5,2) DEFAULT 10.00 CHECK (commission_rate >= 0 AND commission_rate <= 100),
  contact_email VARCHAR(255) NOT NULL,
  contact_phone VARCHAR(50),
  address JSONB,
  business_documents JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  approved_at TIMESTAMPTZ,
  approved_by UUID REFERENCES users(id)
);

-- Create vendor_applications table
CREATE TABLE IF NOT EXISTS vendor_applications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  business_name VARCHAR(255) NOT NULL,
  business_description TEXT NOT NULL,
  contact_email VARCHAR(255) NOT NULL,
  contact_phone VARCHAR(50),
  business_address JSONB,
  documents JSONB,
  status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected', 'under_review')),
  submitted_at TIMESTAMPTZ DEFAULT NOW(),
  reviewed_at TIMESTAMPTZ,
  reviewed_by UUID REFERENCES users(id),
  rejection_reason TEXT,
  notes TEXT
);

-- Add vendor fields to products table
ALTER TABLE products ADD COLUMN IF NOT EXISTS vendor_id UUID REFERENCES vendors(id) ON DELETE CASCADE;
ALTER TABLE products ADD COLUMN IF NOT EXISTS status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'out_of_stock', 'discontinued'));
ALTER TABLE products ADD COLUMN IF NOT EXISTS created_by UUID REFERENCES users(id);
ALTER TABLE products ADD COLUMN IF NOT EXISTS stock_quantity INTEGER DEFAULT 0;
ALTER TABLE products ADD COLUMN IF NOT EXISTS sku VARCHAR(100);
ALTER TABLE products ADD COLUMN IF NOT EXISTS featured_by_admin BOOLEAN DEFAULT FALSE;

-- Add vendor and commission fields to orders table
ALTER TABLE orders ADD COLUMN IF NOT EXISTS vendor_id UUID REFERENCES vendors(id);
ALTER TABLE orders ADD COLUMN IF NOT EXISTS commission_amount DECIMAL(10,2) DEFAULT 0;
ALTER TABLE orders ADD COLUMN IF NOT EXISTS admin_fee DECIMAL(10,2) DEFAULT 0;
ALTER TABLE orders ADD COLUMN IF NOT EXISTS vendor_payout_status VARCHAR(20) DEFAULT 'pending' CHECK (vendor_payout_status IN ('pending', 'processing', 'paid', 'hold'));
ALTER TABLE orders ADD COLUMN IF NOT EXISTS vendor_payout_date TIMESTAMPTZ;

-- Create vendor_payouts table for tracking payments
CREATE TABLE IF NOT EXISTS vendor_payouts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  vendor_id UUID REFERENCES vendors(id) ON DELETE CASCADE,
  amount DECIMAL(10,2) NOT NULL,
  commission_amount DECIMAL(10,2) NOT NULL,
  orders_count INTEGER NOT NULL,
  period_start TIMESTAMPTZ NOT NULL,
  period_end TIMESTAMPTZ NOT NULL,
  status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'paid', 'failed')),
  payment_method VARCHAR(50),
  payment_reference VARCHAR(255),
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  processed_by UUID REFERENCES users(id),
  processed_at TIMESTAMPTZ
);

-- Create vendor_analytics table for statistics
CREATE TABLE IF NOT EXISTS vendor_analytics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  vendor_id UUID REFERENCES vendors(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  orders_count INTEGER DEFAULT 0,
  revenue DECIMAL(10,2) DEFAULT 0,
  commission_amount DECIMAL(10,2) DEFAULT 0,
  products_sold INTEGER DEFAULT 0,
  views INTEGER DEFAULT 0,
  unique_customers INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(vendor_id, date)
);

-- Create notifications table
CREATE TABLE IF NOT EXISTS notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  type VARCHAR(50) NOT NULL,
  title VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  data JSONB,
  read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create audit_log table for tracking important actions
CREATE TABLE IF NOT EXISTS audit_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  action VARCHAR(100) NOT NULL,
  entity_type VARCHAR(50),
  entity_id UUID,
  old_values JSONB,
  new_values JSONB,
  ip_address VARCHAR(45),
  user_agent TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ========================================
-- INDEXES FOR PERFORMANCE
-- ========================================

CREATE INDEX IF NOT EXISTS idx_users_role ON users(role);
CREATE INDEX IF NOT EXISTS idx_users_vendor_id ON users(vendor_id);
CREATE INDEX IF NOT EXISTS idx_users_status ON users(status);
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);

CREATE INDEX IF NOT EXISTS idx_vendors_owner_id ON vendors(owner_id);
CREATE INDEX IF NOT EXISTS idx_vendors_status ON vendors(status);
CREATE INDEX IF NOT EXISTS idx_vendors_slug ON vendors(slug);

CREATE INDEX IF NOT EXISTS idx_vendor_applications_user_id ON vendor_applications(user_id);
CREATE INDEX IF NOT EXISTS idx_vendor_applications_status ON vendor_applications(status);

CREATE INDEX IF NOT EXISTS idx_products_vendor_id ON products(vendor_id);
CREATE INDEX IF NOT EXISTS idx_products_status ON products(status);
CREATE INDEX IF NOT EXISTS idx_products_created_by ON products(created_by);
CREATE INDEX IF NOT EXISTS idx_products_sku ON products(sku);

CREATE INDEX IF NOT EXISTS idx_orders_vendor_id ON orders(vendor_id);
CREATE INDEX IF NOT EXISTS idx_orders_vendor_payout_status ON orders(vendor_payout_status);

CREATE INDEX IF NOT EXISTS idx_vendor_payouts_vendor_id ON vendor_payouts(vendor_id);
CREATE INDEX IF NOT EXISTS idx_vendor_payouts_status ON vendor_payouts(status);

CREATE INDEX IF NOT EXISTS idx_vendor_analytics_vendor_id ON vendor_analytics(vendor_id);
CREATE INDEX IF NOT EXISTS idx_vendor_analytics_date ON vendor_analytics(date);

CREATE INDEX IF NOT EXISTS idx_notifications_user_id ON notifications(user_id);
CREATE INDEX IF NOT EXISTS idx_notifications_read ON notifications(read);

CREATE INDEX IF NOT EXISTS idx_audit_log_user_id ON audit_log(user_id);
CREATE INDEX IF NOT EXISTS idx_audit_log_entity ON audit_log(entity_type, entity_id);
CREATE INDEX IF NOT EXISTS idx_audit_log_created_at ON audit_log(created_at);

-- ========================================
-- TRIGGERS
-- ========================================

-- Auto-update vendor updated_at
CREATE OR REPLACE FUNCTION update_vendor_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER vendor_updated_at
  BEFORE UPDATE ON vendors
  FOR EACH ROW
  EXECUTE FUNCTION update_vendor_updated_at();

-- Auto-update vendor_payout updated_at
CREATE TRIGGER vendor_payout_updated_at
  BEFORE UPDATE ON vendor_payouts
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

-- ========================================
-- ADD FOREIGN KEY CONSTRAINT
-- ========================================

ALTER TABLE users ADD CONSTRAINT fk_users_vendor_id 
  FOREIGN KEY (vendor_id) REFERENCES vendors(id) ON DELETE SET NULL;

-- ========================================
-- COMMENTS
-- ========================================

COMMENT ON TABLE vendors IS 'Stores information about vendor/seller stores in the marketplace';
COMMENT ON TABLE vendor_applications IS 'Tracks applications from users wanting to become vendors';
COMMENT ON TABLE vendor_payouts IS 'Tracks payments made to vendors';
COMMENT ON TABLE vendor_analytics IS 'Daily analytics for vendor performance tracking';
COMMENT ON TABLE notifications IS 'User notifications for orders, approvals, etc.';
COMMENT ON TABLE audit_log IS 'Audit trail for important system actions';

COMMENT ON COLUMN users.role IS 'User role: user (customer), vendor, provider, or admin';
COMMENT ON COLUMN users.vendor_id IS 'Reference to vendor if user is a vendor owner/employee';
COMMENT ON COLUMN vendors.commission_rate IS 'Percentage commission taken by platform (0-100)';
COMMENT ON COLUMN vendors.status IS 'Vendor account status: pending, active, suspended, rejected';
COMMENT ON COLUMN orders.commission_amount IS 'Commission amount earned by platform from this order';
COMMENT ON COLUMN products.vendor_id IS 'Vendor who owns this product';
