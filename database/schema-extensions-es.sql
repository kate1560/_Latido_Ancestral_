-- ========================================
-- EXTENSIONES DE SCHEMA PARA MARKETPLACE MULTI-VENDOR
-- (Adaptado a tablas existentes en español)
-- ========================================

-- Agregar campos de roles y vendor a tabla usuarios
ALTER TABLE usuarios ADD COLUMN IF NOT EXISTS role VARCHAR(20) DEFAULT 'user' CHECK (role IN ('user', 'vendor', 'provider', 'admin'));
ALTER TABLE usuarios ADD COLUMN IF NOT EXISTS vendor_id UUID;
ALTER TABLE usuarios ADD COLUMN IF NOT EXISTS status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'suspended', 'pending'));

-- Crear tabla vendors (tiendas aliadas)
CREATE TABLE IF NOT EXISTS vendors (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  business_name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  description TEXT,
  logo VARCHAR(500),
  banner VARCHAR(500),
  owner_id UUID REFERENCES usuarios(id) ON DELETE SET NULL,
  status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'active', 'suspended', 'rejected')),
  commission_rate DECIMAL(5,2) DEFAULT 10.00 CHECK (commission_rate >= 0 AND commission_rate <= 100),
  contact_email VARCHAR(255) NOT NULL,
  contact_phone VARCHAR(50),
  address JSONB,
  business_documents JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  approved_at TIMESTAMPTZ,
  approved_by UUID REFERENCES usuarios(id)
);

-- Crear tabla vendor_applications (solicitudes de vendors)
CREATE TABLE IF NOT EXISTS vendor_applications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES usuarios(id) ON DELETE CASCADE,
  business_name VARCHAR(255) NOT NULL,
  business_description TEXT NOT NULL,
  contact_email VARCHAR(255) NOT NULL,
  contact_phone VARCHAR(50),
  business_address JSONB,
  documents JSONB,
  status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected', 'under_review')),
  submitted_at TIMESTAMPTZ DEFAULT NOW(),
  reviewed_at TIMESTAMPTZ,
  reviewed_by UUID REFERENCES usuarios(id),
  rejection_reason TEXT,
  notes TEXT
);

-- Agregar campos de vendor a tabla productos
ALTER TABLE productos ADD COLUMN IF NOT EXISTS vendor_id UUID REFERENCES vendors(id) ON DELETE CASCADE;
ALTER TABLE productos ADD COLUMN IF NOT EXISTS status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'out_of_stock', 'discontinued'));
ALTER TABLE productos ADD COLUMN IF NOT EXISTS created_by UUID REFERENCES usuarios(id);
ALTER TABLE productos ADD COLUMN IF NOT EXISTS featured_by_admin BOOLEAN DEFAULT FALSE;

-- Agregar campos de vendor y comisión a tabla pedidos
ALTER TABLE pedidos ADD COLUMN IF NOT EXISTS vendor_id UUID REFERENCES vendors(id);
ALTER TABLE pedidos ADD COLUMN IF NOT EXISTS commission_amount DECIMAL(10,2) DEFAULT 0;
ALTER TABLE pedidos ADD COLUMN IF NOT EXISTS admin_fee DECIMAL(10,2) DEFAULT 0;
ALTER TABLE pedidos ADD COLUMN IF NOT EXISTS vendor_payout_status VARCHAR(20) DEFAULT 'pending' CHECK (vendor_payout_status IN ('pending', 'processing', 'paid', 'hold'));
ALTER TABLE pedidos ADD COLUMN IF NOT EXISTS vendor_payout_date TIMESTAMPTZ;

-- Crear tabla vendor_payouts para tracking de pagos
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
  processed_by UUID REFERENCES usuarios(id),
  processed_at TIMESTAMPTZ
);

-- Crear tabla vendor_analytics para estadísticas
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

-- Crear tabla audit_log para tracking de acciones importantes
CREATE TABLE IF NOT EXISTS audit_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES usuarios(id),
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
-- ÍNDICES PARA PERFORMANCE
-- ========================================

CREATE INDEX IF NOT EXISTS idx_usuarios_role ON usuarios(role);
CREATE INDEX IF NOT EXISTS idx_usuarios_vendor_id ON usuarios(vendor_id);
CREATE INDEX IF NOT EXISTS idx_usuarios_status ON usuarios(status);

CREATE INDEX IF NOT EXISTS idx_vendors_owner_id ON vendors(owner_id);
CREATE INDEX IF NOT EXISTS idx_vendors_status ON vendors(status);
CREATE INDEX IF NOT EXISTS idx_vendors_slug ON vendors(slug);

CREATE INDEX IF NOT EXISTS idx_vendor_applications_user_id ON vendor_applications(user_id);
CREATE INDEX IF NOT EXISTS idx_vendor_applications_status ON vendor_applications(status);

CREATE INDEX IF NOT EXISTS idx_productos_vendor_id ON productos(vendor_id);
CREATE INDEX IF NOT EXISTS idx_productos_status ON productos(status);
CREATE INDEX IF NOT EXISTS idx_productos_created_by ON productos(created_by);

CREATE INDEX IF NOT EXISTS idx_pedidos_vendor_id ON pedidos(vendor_id);
CREATE INDEX IF NOT EXISTS idx_pedidos_vendor_payout_status ON pedidos(vendor_payout_status);

CREATE INDEX IF NOT EXISTS idx_vendor_payouts_vendor_id ON vendor_payouts(vendor_id);
CREATE INDEX IF NOT EXISTS idx_vendor_payouts_status ON vendor_payouts(status);

CREATE INDEX IF NOT EXISTS idx_vendor_analytics_vendor_id ON vendor_analytics(vendor_id);
CREATE INDEX IF NOT EXISTS idx_vendor_analytics_date ON vendor_analytics(date);

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
CREATE OR REPLACE FUNCTION update_vendor_payout_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER vendor_payout_updated_at
  BEFORE UPDATE ON vendor_payouts
  FOR EACH ROW
  EXECUTE FUNCTION update_vendor_payout_updated_at();

-- ========================================
-- ADD FOREIGN KEY CONSTRAINT
-- ========================================

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.table_constraints 
    WHERE constraint_name = 'fk_usuarios_vendor_id'
  ) THEN
    ALTER TABLE usuarios ADD CONSTRAINT fk_usuarios_vendor_id 
      FOREIGN KEY (vendor_id) REFERENCES vendors(id) ON DELETE SET NULL;
  END IF;
END $$;

-- ========================================
-- COMMENTS
-- ========================================

COMMENT ON TABLE vendors IS 'Información de tiendas vendor/seller en el marketplace';
COMMENT ON TABLE vendor_applications IS 'Solicitudes de usuarios queriendo ser vendors';
COMMENT ON TABLE vendor_payouts IS 'Pagos realizados a vendors';
COMMENT ON TABLE vendor_analytics IS 'Analíticas diarias de performance de vendors';
COMMENT ON TABLE audit_log IS 'Registro de auditoría de acciones importantes';

COMMENT ON COLUMN usuarios.role IS 'Rol del usuario: user (cliente), vendor, provider, o admin';
COMMENT ON COLUMN usuarios.vendor_id IS 'Referencia a vendor si el usuario es owner/empleado de vendor';
COMMENT ON COLUMN vendors.commission_rate IS 'Porcentaje de comisión de la plataforma (0-100)';
COMMENT ON COLUMN vendors.status IS 'Estado de la cuenta vendor: pending, active, suspended, rejected';
COMMENT ON COLUMN pedidos.commission_amount IS 'Monto de comisión ganado por la plataforma de esta orden';
COMMENT ON COLUMN productos.vendor_id IS 'Vendor dueño de este producto';
