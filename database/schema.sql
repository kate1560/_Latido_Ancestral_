-- ============================================
-- SCHEMA DE BASE DE DATOS - LATIDO ANCESTRAL
-- PostgreSQL Database Schema
-- ============================================

-- Extensiones necesarias
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ============================================
-- TIPOS ENUMERADOS
-- ============================================

CREATE TYPE user_role AS ENUM ('customer', 'admin', 'vendor', 'moderator');
CREATE TYPE order_status AS ENUM ('pending', 'processing', 'shipped', 'delivered', 'cancelled', 'refunded');
CREATE TYPE payment_status AS ENUM ('pending', 'completed', 'failed', 'refunded');
CREATE TYPE payment_method_type AS ENUM ('card', 'paypal', 'transfer', 'cash_on_delivery', 'cryptocurrency');
CREATE TYPE notification_type AS ENUM ('order', 'shipping', 'promotion', 'review', 'system');
CREATE TYPE notification_status AS ENUM ('unread', 'read', 'archived');
CREATE TYPE inventory_movement_type AS ENUM ('purchase', 'sale', 'return', 'adjustment', 'damaged', 'lost');
CREATE TYPE coupon_type AS ENUM ('percentage', 'fixed_amount', 'free_shipping');
CREATE TYPE subscription_status AS ENUM ('active', 'inactive', 'pending');

-- ============================================
-- TABLA: roles
-- ============================================
CREATE TABLE roles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(50) UNIQUE NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================
-- TABLA: permisos
-- ============================================
CREATE TABLE permisos (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) UNIQUE NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================
-- TABLA: roles_permisos (Many-to-Many)
-- ============================================
CREATE TABLE roles_permisos (
    role_id UUID REFERENCES roles(id) ON DELETE CASCADE,
    permiso_id UUID REFERENCES permisos(id) ON DELETE CASCADE,
    PRIMARY KEY (role_id, permiso_id)
);

-- ============================================
-- TABLA: usuarios
-- ============================================
CREATE TABLE usuarios (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    phone VARCHAR(20),
    role user_role DEFAULT 'customer',
    is_active BOOLEAN DEFAULT true,
    email_verified BOOLEAN DEFAULT false,
    email_verified_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_login TIMESTAMP
);

-- ============================================
-- TABLA: usuarios_roles (Many-to-Many)
-- ============================================
CREATE TABLE usuarios_roles (
    usuario_id UUID REFERENCES usuarios(id) ON DELETE CASCADE,
    role_id UUID REFERENCES roles(id) ON DELETE CASCADE,
    assigned_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (usuario_id, role_id)
);

-- ============================================
-- TABLA: direcciones
-- ============================================
CREATE TABLE direcciones (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    usuario_id UUID REFERENCES usuarios(id) ON DELETE CASCADE,
    full_name VARCHAR(200) NOT NULL,
    street VARCHAR(255) NOT NULL,
    city VARCHAR(100) NOT NULL,
    state VARCHAR(100) NOT NULL,
    postal_code VARCHAR(20) NOT NULL,
    country VARCHAR(100) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    is_default BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================
-- TABLA: metodos_pago
-- ============================================
CREATE TABLE metodos_pago (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    usuario_id UUID REFERENCES usuarios(id) ON DELETE CASCADE,
    type payment_method_type NOT NULL,
    card_last_four VARCHAR(4),
    card_brand VARCHAR(50),
    expiry_date VARCHAR(7), -- MM/YYYY
    paypal_email VARCHAR(255),
    bank_name VARCHAR(100),
    account_number_encrypted TEXT, -- Encriptado
    is_default BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================
-- TABLA: categorias
-- ============================================
CREATE TABLE categorias (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) UNIQUE NOT NULL,
    slug VARCHAR(100) UNIQUE NOT NULL,
    description TEXT,
    image VARCHAR(500),
    parent_id UUID REFERENCES categorias(id) ON DELETE SET NULL,
    display_order INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================
-- TABLA: etiquetas
-- ============================================
CREATE TABLE etiquetas (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(50) UNIQUE NOT NULL,
    slug VARCHAR(50) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================
-- TABLA: productos
-- ============================================
CREATE TABLE productos (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    description TEXT NOT NULL,
    short_description VARCHAR(500),
    price DECIMAL(10, 2) NOT NULL CHECK (price >= 0),
    cost_price DECIMAL(10, 2) CHECK (cost_price >= 0), -- Precio de costo
    category_id UUID REFERENCES categorias(id) ON DELETE SET NULL,
    brand VARCHAR(100),
    material VARCHAR(100),
    featured BOOLEAN DEFAULT false,
    is_active BOOLEAN DEFAULT true,
    stock INTEGER DEFAULT 0 CHECK (stock >= 0),
    sku VARCHAR(100) UNIQUE,
    weight DECIMAL(8, 2), -- En kilogramos
    dimensions VARCHAR(100), -- Formato: "LxAxH cm"
    rating_average DECIMAL(3, 2) DEFAULT 0 CHECK (rating_average >= 0 AND rating_average <= 5),
    reviews_count INTEGER DEFAULT 0,
    views_count INTEGER DEFAULT 0,
    sales_count INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================
-- TABLA: productos_etiquetas (Many-to-Many)
-- ============================================
CREATE TABLE productos_etiquetas (
    producto_id UUID REFERENCES productos(id) ON DELETE CASCADE,
    etiqueta_id UUID REFERENCES etiquetas(id) ON DELETE CASCADE,
    PRIMARY KEY (producto_id, etiqueta_id)
);

-- ============================================
-- TABLA: imagenes_producto
-- ============================================
CREATE TABLE imagenes_producto (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    producto_id UUID REFERENCES productos(id) ON DELETE CASCADE,
    url VARCHAR(500) NOT NULL,
    alt_text VARCHAR(255),
    display_order INTEGER DEFAULT 0,
    is_primary BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================
-- TABLA: variantes
-- ============================================
CREATE TABLE variantes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    producto_id UUID REFERENCES productos(id) ON DELETE CASCADE,
    size VARCHAR(50),
    color VARCHAR(50),
    material VARCHAR(100),
    model VARCHAR(100),
    stock INTEGER DEFAULT 0 CHECK (stock >= 0),
    price_modifier DECIMAL(10, 2) DEFAULT 0, -- Modificador sobre el precio base
    sku VARCHAR(100) UNIQUE,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================
-- TABLA: inventario
-- ============================================
CREATE TABLE inventario (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    producto_id UUID REFERENCES productos(id) ON DELETE CASCADE,
    variante_id UUID REFERENCES variantes(id) ON DELETE SET NULL,
    movement_type inventory_movement_type NOT NULL,
    quantity INTEGER NOT NULL,
    stock_before INTEGER NOT NULL,
    stock_after INTEGER NOT NULL,
    reference_id UUID, -- Puede referenciar pedido, devolución, etc.
    notes TEXT,
    created_by UUID REFERENCES usuarios(id) ON DELETE SET NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================
-- TABLA: cupones
-- ============================================
CREATE TABLE cupones (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    code VARCHAR(50) UNIQUE NOT NULL,
    type coupon_type NOT NULL,
    discount_value DECIMAL(10, 2) NOT NULL CHECK (discount_value >= 0),
    min_purchase_amount DECIMAL(10, 2) DEFAULT 0,
    max_discount_amount DECIMAL(10, 2),
    usage_limit INTEGER, -- NULL = ilimitado
    usage_count INTEGER DEFAULT 0,
    usage_limit_per_user INTEGER DEFAULT 1,
    starts_at TIMESTAMP NOT NULL,
    expires_at TIMESTAMP NOT NULL,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================
-- TABLA: pedidos
-- ============================================
CREATE TABLE pedidos (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    usuario_id UUID REFERENCES usuarios(id) ON DELETE SET NULL,
    order_number VARCHAR(50) UNIQUE NOT NULL,
    status order_status DEFAULT 'pending',
    subtotal DECIMAL(10, 2) NOT NULL CHECK (subtotal >= 0),
    tax DECIMAL(10, 2) DEFAULT 0 CHECK (tax >= 0),
    shipping_cost DECIMAL(10, 2) DEFAULT 0 CHECK (shipping_cost >= 0),
    discount_amount DECIMAL(10, 2) DEFAULT 0 CHECK (discount_amount >= 0),
    total DECIMAL(10, 2) NOT NULL CHECK (total >= 0),
    cupon_id UUID REFERENCES cupones(id) ON DELETE SET NULL,
    direccion_id UUID REFERENCES direcciones(id) ON DELETE SET NULL,
    metodo_pago_id UUID REFERENCES metodos_pago(id) ON DELETE SET NULL,
    notes TEXT,
    invoice_url VARCHAR(500),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================
-- TABLA: detalle_pedido
-- ============================================
CREATE TABLE detalle_pedido (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    pedido_id UUID REFERENCES pedidos(id) ON DELETE CASCADE,
    producto_id UUID REFERENCES productos(id) ON DELETE SET NULL,
    variante_id UUID REFERENCES variantes(id) ON DELETE SET NULL,
    product_name VARCHAR(255) NOT NULL, -- Snapshot del nombre
    product_sku VARCHAR(100),
    quantity INTEGER NOT NULL CHECK (quantity > 0),
    unit_price DECIMAL(10, 2) NOT NULL CHECK (unit_price >= 0),
    subtotal DECIMAL(10, 2) NOT NULL CHECK (subtotal >= 0),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================
-- TABLA: pagos
-- ============================================
CREATE TABLE pagos (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    pedido_id UUID REFERENCES pedidos(id) ON DELETE CASCADE,
    amount DECIMAL(10, 2) NOT NULL CHECK (amount >= 0),
    status payment_status DEFAULT 'pending',
    payment_method payment_method_type NOT NULL,
    transaction_id VARCHAR(255),
    external_reference VARCHAR(255), -- Referencia del proveedor de pago
    payment_gateway VARCHAR(100), -- PayPal, Stripe, etc.
    currency VARCHAR(3) DEFAULT 'COP',
    paid_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================
-- TABLA: envios
-- ============================================
CREATE TABLE envios (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    pedido_id UUID REFERENCES pedidos(id) ON DELETE CASCADE,
    direccion_id UUID REFERENCES direcciones(id) ON DELETE SET NULL,
    carrier_name VARCHAR(100), -- Nombre del servicio de envío
    tracking_code VARCHAR(255),
    tracking_url VARCHAR(500),
    estimated_delivery_date DATE,
    shipped_at TIMESTAMP,
    delivered_at TIMESTAMP,
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================
-- TABLA: reseñas
-- ============================================
CREATE TABLE reseñas (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    producto_id UUID REFERENCES productos(id) ON DELETE CASCADE,
    usuario_id UUID REFERENCES usuarios(id) ON DELETE CASCADE,
    pedido_id UUID REFERENCES pedidos(id) ON DELETE SET NULL,
    rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
    title VARCHAR(200) NOT NULL,
    comment TEXT NOT NULL,
    verified_purchase BOOLEAN DEFAULT false,
    helpful_count INTEGER DEFAULT 0,
    is_approved BOOLEAN DEFAULT false, -- Moderación
    approved_at TIMESTAMP,
    approved_by UUID REFERENCES usuarios(id) ON DELETE SET NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE (producto_id, usuario_id, pedido_id) -- Un usuario puede hacer una reseña por pedido
);

-- ============================================
-- TABLA: multimedia_reseña
-- ============================================
CREATE TABLE multimedia_reseña (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    reseña_id UUID REFERENCES reseñas(id) ON DELETE CASCADE,
    type VARCHAR(10) NOT NULL CHECK (type IN ('image', 'video')),
    url VARCHAR(500) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================
-- TABLA: preguntas
-- ============================================
CREATE TABLE preguntas (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    producto_id UUID REFERENCES productos(id) ON DELETE CASCADE,
    usuario_id UUID REFERENCES usuarios(id) ON DELETE CASCADE,
    question TEXT NOT NULL,
    answer TEXT,
    answered_by UUID REFERENCES usuarios(id) ON DELETE SET NULL,
    answered_at TIMESTAMP,
    helpful_count INTEGER DEFAULT 0,
    is_public BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================
-- TABLA: wishlist
-- ============================================
CREATE TABLE wishlist (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    usuario_id UUID REFERENCES usuarios(id) ON DELETE CASCADE,
    producto_id UUID REFERENCES productos(id) ON DELETE CASCADE,
    added_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE (usuario_id, producto_id)
);

-- ============================================
-- TABLA: notificaciones
-- ============================================
CREATE TABLE notificaciones (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    usuario_id UUID REFERENCES usuarios(id) ON DELETE CASCADE,
    type notification_type NOT NULL,
    title VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    status notification_status DEFAULT 'unread',
    link VARCHAR(500),
    read_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================
-- TABLA: suscripciones
-- ============================================
CREATE TABLE suscripciones (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    status subscription_status DEFAULT 'active',
    token VARCHAR(255) UNIQUE NOT NULL, -- Para desuscribirse
    subscribed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    unsubscribed_at TIMESTAMP
);

-- ============================================
-- TABLA: ventas (resumen estadístico)
-- ============================================
CREATE TABLE ventas (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    date DATE NOT NULL,
    period VARCHAR(20) NOT NULL, -- 'daily', 'monthly', 'yearly'
    total_orders INTEGER DEFAULT 0,
    total_revenue DECIMAL(12, 2) DEFAULT 0,
    total_products_sold INTEGER DEFAULT 0,
    average_order_value DECIMAL(10, 2) DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE (date, period)
);

-- ============================================
-- TABLA: tokens (JWT y sesiones)
-- ============================================
CREATE TABLE tokens (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    usuario_id UUID REFERENCES usuarios(id) ON DELETE CASCADE,
    token VARCHAR(500) UNIQUE NOT NULL,
    type VARCHAR(50) NOT NULL, -- 'access', 'refresh', 'email_verification', 'password_reset'
    expires_at TIMESTAMP NOT NULL,
    revoked BOOLEAN DEFAULT false,
    revoked_at TIMESTAMP,
    ip_address INET,
    user_agent TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================
-- TABLA: logs (auditoría)
-- ============================================
CREATE TABLE logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    usuario_id UUID REFERENCES usuarios(id) ON DELETE SET NULL,
    action VARCHAR(100) NOT NULL,
    entity_type VARCHAR(50), -- 'producto', 'pedido', 'usuario', etc.
    entity_id UUID,
    old_values JSONB,
    new_values JSONB,
    ip_address INET,
    user_agent TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================
-- TABLA: backups (registro de copias)
-- ============================================
CREATE TABLE backups (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    filename VARCHAR(255) NOT NULL,
    file_path VARCHAR(500) NOT NULL,
    file_size BIGINT, -- En bytes
    backup_type VARCHAR(50), -- 'full', 'incremental', 'differential'
    status VARCHAR(50) DEFAULT 'completed', -- 'completed', 'failed', 'in_progress'
    created_by UUID REFERENCES usuarios(id) ON DELETE SET NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    restored_at TIMESTAMP
);

-- ============================================
-- TABLA: configuracion (settings del sistema)
-- ============================================
CREATE TABLE configuracion (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    key VARCHAR(100) UNIQUE NOT NULL,
    value TEXT NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================
-- TABLA: cupones_usuarios (uso de cupones)
-- ============================================
CREATE TABLE cupones_usuarios (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    cupon_id UUID REFERENCES cupones(id) ON DELETE CASCADE,
    usuario_id UUID REFERENCES usuarios(id) ON DELETE CASCADE,
    pedido_id UUID REFERENCES pedidos(id) ON DELETE SET NULL,
    used_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================
-- ÍNDICES PARA OPTIMIZACIÓN
-- ============================================

-- Usuarios
CREATE INDEX idx_usuarios_email ON usuarios(email);
CREATE INDEX idx_usuarios_role ON usuarios(role);
CREATE INDEX idx_usuarios_created_at ON usuarios(created_at);

-- Productos
CREATE INDEX idx_productos_slug ON productos(slug);
CREATE INDEX idx_productos_category ON productos(category_id);
CREATE INDEX idx_productos_featured ON productos(featured) WHERE featured = true;
CREATE INDEX idx_productos_active ON productos(is_active) WHERE is_active = true;
CREATE INDEX idx_productos_rating ON productos(rating_average DESC);
CREATE INDEX idx_productos_price ON productos(price);

-- Pedidos
CREATE INDEX idx_pedidos_usuario ON pedidos(usuario_id);
CREATE INDEX idx_pedidos_status ON pedidos(status);
CREATE INDEX idx_pedidos_created_at ON pedidos(created_at DESC);
CREATE INDEX idx_pedidos_number ON pedidos(order_number);

-- Pagos
CREATE INDEX idx_pagos_pedido ON pagos(pedido_id);
CREATE INDEX idx_pagos_status ON pagos(status);
CREATE INDEX idx_pagos_transaction ON pagos(transaction_id);

-- Reseñas
CREATE INDEX idx_reseñas_producto ON reseñas(producto_id);
CREATE INDEX idx_reseñas_usuario ON reseñas(usuario_id);
CREATE INDEX idx_reseñas_approved ON reseñas(is_approved) WHERE is_approved = true;

-- Tokens
CREATE INDEX idx_tokens_usuario ON tokens(usuario_id);
CREATE INDEX idx_tokens_type ON tokens(type);
CREATE INDEX idx_tokens_expires ON tokens(expires_at);

-- Logs
CREATE INDEX idx_logs_usuario ON logs(usuario_id);
CREATE INDEX idx_logs_entity ON logs(entity_type, entity_id);
CREATE INDEX idx_logs_created_at ON logs(created_at DESC);

-- Notificaciones
CREATE INDEX idx_notificaciones_usuario ON notificaciones(usuario_id);
CREATE INDEX idx_notificaciones_status ON notificaciones(status);

-- Inventario
CREATE INDEX idx_inventario_producto ON inventario(producto_id);
CREATE INDEX idx_inventario_created_at ON inventario(created_at DESC);

-- ============================================
-- FUNCIONES Y TRIGGERS
-- ============================================

-- Función para actualizar updated_at automáticamente
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Aplicar trigger a todas las tablas con updated_at
CREATE TRIGGER update_usuarios_updated_at BEFORE UPDATE ON usuarios
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_productos_updated_at BEFORE UPDATE ON productos
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_categorias_updated_at BEFORE UPDATE ON categorias
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_pedidos_updated_at BEFORE UPDATE ON pedidos
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_direcciones_updated_at BEFORE UPDATE ON direcciones
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_metodos_pago_updated_at BEFORE UPDATE ON metodos_pago
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_variantes_updated_at BEFORE UPDATE ON variantes
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_cupones_updated_at BEFORE UPDATE ON cupones
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_pagos_updated_at BEFORE UPDATE ON pagos
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_envios_updated_at BEFORE UPDATE ON envios
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_reseñas_updated_at BEFORE UPDATE ON reseñas
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_preguntas_updated_at BEFORE UPDATE ON preguntas
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Función para actualizar el rating promedio de productos
CREATE OR REPLACE FUNCTION update_product_rating()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE productos
    SET rating_average = (
        SELECT COALESCE(AVG(rating), 0)
        FROM reseñas
        WHERE producto_id = NEW.producto_id AND is_approved = true
    ),
    reviews_count = (
        SELECT COUNT(*)
        FROM reseñas
        WHERE producto_id = NEW.producto_id AND is_approved = true
    )
    WHERE id = NEW.producto_id;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_product_rating_on_review AFTER INSERT OR UPDATE ON reseñas
    FOR EACH ROW EXECUTE FUNCTION update_product_rating();

-- Función para generar número de pedido único
CREATE OR REPLACE FUNCTION generate_order_number()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.order_number IS NULL THEN
        NEW.order_number := 'ORD-' || TO_CHAR(CURRENT_TIMESTAMP, 'YYYYMMDD') || '-' || LPAD(nextval('order_number_seq')::TEXT, 6, '0');
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE SEQUENCE order_number_seq;

CREATE TRIGGER generate_order_number_trigger BEFORE INSERT ON pedidos
    FOR EACH ROW EXECUTE FUNCTION generate_order_number();

-- Función para registrar movimientos de inventario al crear pedido
CREATE OR REPLACE FUNCTION register_inventory_movement()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO inventario (producto_id, variante_id, movement_type, quantity, stock_before, stock_after, reference_id)
    SELECT 
        NEW.producto_id,
        NEW.variante_id,
        'sale',
        -NEW.quantity,
        COALESCE((SELECT stock FROM variantes WHERE id = NEW.variante_id), (SELECT stock FROM productos WHERE id = NEW.producto_id)),
        COALESCE((SELECT stock FROM variantes WHERE id = NEW.variante_id), (SELECT stock FROM productos WHERE id = NEW.producto_id)) - NEW.quantity,
        NEW.pedido_id
    FROM detalle_pedido
    WHERE id = NEW.id;
    
    -- Actualizar stock
    IF NEW.variante_id IS NOT NULL THEN
        UPDATE variantes SET stock = stock - NEW.quantity WHERE id = NEW.variante_id;
    ELSE
        UPDATE productos SET stock = stock - NEW.quantity WHERE id = NEW.producto_id;
    END IF;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER register_inventory_on_order AFTER INSERT ON detalle_pedido
    FOR EACH ROW EXECUTE FUNCTION register_inventory_movement();

-- ============================================
-- DATOS INICIALES
-- ============================================

-- Insertar roles básicos
INSERT INTO roles (name, description) VALUES
('admin', 'Administrador con acceso completo'),
('vendor', 'Vendedor con acceso a gestión de productos'),
('moderator', 'Moderador de contenido y reseñas'),
('customer', 'Cliente estándar');

-- Insertar permisos básicos
INSERT INTO permisos (name, description) VALUES
('manage_users', 'Gestionar usuarios'),
('manage_products', 'Gestionar productos'),
('manage_orders', 'Gestionar pedidos'),
('manage_inventory', 'Gestionar inventario'),
('moderate_reviews', 'Moderar reseñas y preguntas'),
('view_reports', 'Ver reportes y estadísticas'),
('manage_coupons', 'Gestionar cupones'),
('manage_settings', 'Gestionar configuración del sistema');

-- Asignar permisos a roles
-- Admin tiene todos los permisos
INSERT INTO roles_permisos (role_id, permiso_id)
SELECT r.id, p.id FROM roles r CROSS JOIN permisos p WHERE r.name = 'admin';

-- Vendor tiene permisos limitados
INSERT INTO roles_permisos (role_id, permiso_id)
SELECT r.id, p.id FROM roles r, permisos p 
WHERE r.name = 'vendor' 
AND p.name IN ('manage_products', 'manage_inventory', 'view_reports');

-- Moderator
INSERT INTO roles_permisos (role_id, permiso_id)
SELECT r.id, p.id FROM roles r, permisos p 
WHERE r.name = 'moderator' 
AND p.name IN ('moderate_reviews');

-- Configuración inicial del sistema
INSERT INTO configuracion (key, value, description) VALUES
('site_name', 'Latido Ancestral', 'Nombre del sitio web'),
('site_email', 'info@latidoancestral.com', 'Email de contacto principal'),
('currency', 'COP', 'Moneda predeterminada'),
('tax_rate', '19', 'Tasa de impuesto en porcentaje (IVA)'),
('free_shipping_threshold', '100000', 'Monto mínimo para envío gratis'),
('max_upload_size', '10485760', 'Tamaño máximo de archivo en bytes (10MB)'),
('items_per_page', '20', 'Productos por página'),
('maintenance_mode', 'false', 'Modo de mantenimiento');

-- ============================================
-- COMENTARIOS EN TABLAS
-- ============================================

COMMENT ON TABLE usuarios IS 'Almacena información de usuarios del sistema';
COMMENT ON TABLE productos IS 'Catálogo de productos disponibles';
COMMENT ON TABLE pedidos IS 'Pedidos realizados por los usuarios';
COMMENT ON TABLE reseñas IS 'Reseñas y calificaciones de productos';
COMMENT ON TABLE inventario IS 'Movimientos de inventario (entradas/salidas)';
COMMENT ON TABLE logs IS 'Registro de auditoría de acciones del sistema';
COMMENT ON TABLE tokens IS 'Tokens de autenticación y verificación';
COMMENT ON TABLE backups IS 'Registro de copias de seguridad del sistema';

-- ============================================
-- FIN DEL SCHEMA
-- ============================================
