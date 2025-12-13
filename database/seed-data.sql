-- ========================================
-- SEED DATA - USUARIOS Y VENDORS DE EJEMPLO
-- ========================================

-- Primero, limpiamos datos de prueba si existen
DELETE FROM vendor_applications WHERE user_id IN (
  SELECT id FROM usuarios WHERE email IN ('admin@latido.com', 'manager@latido.com', 'user@latido.com')
);
DELETE FROM vendor_payouts WHERE vendor_id IN (SELECT id FROM vendors WHERE contact_email IN ('manager@latido.com'));
DELETE FROM vendor_analytics WHERE vendor_id IN (SELECT id FROM vendors WHERE contact_email IN ('manager@latido.com'));
DELETE FROM audit_log WHERE user_id IN (SELECT id FROM usuarios WHERE email IN ('admin@latido.com', 'manager@latido.com', 'user@latido.com'));
DELETE FROM productos WHERE vendor_id IN (SELECT id FROM vendors WHERE contact_email IN ('manager@latido.com'));
DELETE FROM pedidos WHERE user_id IN (SELECT id FROM usuarios WHERE email IN ('admin@latido.com', 'manager@latido.com', 'user@latido.com'));
DELETE FROM vendors WHERE contact_email IN ('manager@latido.com');
DELETE FROM usuarios WHERE email IN ('admin@latido.com', 'manager@latido.com', 'user@latido.com');

-- ========================================
-- USUARIOS
-- ========================================

-- Usuario Admin
INSERT INTO usuarios (id, nombre, email, password, role, status, created_at)
VALUES (
  '11111111-1111-1111-1111-111111111111',
  'Admin User',
  'admin@latido.com',
  -- Password: admin123 (en producción debe ser hasheado con bcrypt)
  '$2a$10$YQ7VlZVGvXqJKdDQ1XKxJeX9qKqN5QnF.nF9qJ5pKdLqNF9qJ5pKd',
  'admin',
  'active',
  NOW()
);

-- Usuario Vendor
INSERT INTO usuarios (id, nombre, email, password, role, status, created_at)
VALUES (
  '22222222-2222-2222-2222-222222222222',
  'Store Manager',
  'manager@latido.com',
  -- Password: manager123
  '$2a$10$YQ7VlZVGvXqJKdDQ1XKxJeX9qKqN5QnF.nF9qJ5pKdLqNF9qJ5pKd',
  'store_manager',
  'active',
  NOW()
);

-- Usuario Cliente Regular
INSERT INTO usuarios (id, nombre, email, password, role, status, created_at)
VALUES (
  '33333333-3333-3333-3333-333333333333',
  'Regular User',
  'user@latido.com',
  -- Password: user123
  '$2a$10$YQ7VlZVGvXqJKdDQ1XKxJeX9qKqN5QnF.nF9qJ5pKdLqNF9qJ5pKd',
  'user',
  'active',
  NOW()
);

-- ========================================
-- VENDORS (TIENDAS ALIADAS)
-- ========================================

-- Vendor principal - Artesanías Ancestrales
INSERT INTO vendors (id, business_name, slug, description, owner_id, status, commission_rate, contact_email, contact_phone, address, created_at, approved_at, approved_by)
VALUES (
  'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
  'Artesanías Ancestrales',
  'artesanias-ancestrales',
  'Tienda especializada en artesanías colombianas tradicionales. Trabajamos directamente con comunidades indígenas y artesanos locales.',
  '22222222-2222-2222-2222-222222222222',
  'active',
  10.00,
  'manager@latido.com',
  '+57 300 123 4567',
  '{"street": "Carrera 10 #20-30", "city": "Bogotá", "state": "Cundinamarca", "country": "Colombia", "zip": "110111"}',
  NOW() - INTERVAL '30 days',
  NOW() - INTERVAL '25 days',
  '11111111-1111-1111-1111-111111111111'
);

-- Vendor secundario - Wayuu Creations
INSERT INTO vendors (id, business_name, slug, description, owner_id, status, commission_rate, contact_email, contact_phone, address, created_at, approved_at, approved_by)
VALUES (
  'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb',
  'Wayuu Creations',
  'wayuu-creations',
  'Mochilas y artesanías Wayuu auténticas hechas por comunidades de La Guajira.',
  NULL,
  'active',
  12.00,
  'wayuu@example.com',
  '+57 301 234 5678',
  '{"street": "Calle 15 #8-12", "city": "Riohacha", "state": "La Guajira", "country": "Colombia", "zip": "440001"}',
  NOW() - INTERVAL '60 days',
  NOW() - INTERVAL '55 days',
  '11111111-1111-1111-1111-111111111111'
);

-- Vendor pendiente de aprobación
INSERT INTO vendors (id, business_name, slug, description, owner_id, status, commission_rate, contact_email, contact_phone, address, created_at)
VALUES (
  'cccccccc-cccc-cccc-cccc-cccccccccccc',
  'Tejidos del Pacífico',
  'tejidos-pacifico',
  'Artesanías del Pacífico colombiano con técnicas tradicionales.',
  NULL,
  'pending',
  10.00,
  'pacifico@example.com',
  '+57 302 345 6789',
  '{"street": "Avenida 5 #3-45", "city": "Buenaventura", "state": "Valle del Cauca", "country": "Colombia", "zip": "760001"}',
  NOW() - INTERVAL '5 days'
);

-- Actualizar vendor_id en usuarios
UPDATE usuarios SET vendor_id = 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa'
WHERE id = '22222222-2222-2222-2222-222222222222';

-- ========================================
-- DIRECCIONES
-- ========================================

INSERT INTO direcciones (usuario_id, tipo, nombre_completo, direccion, ciudad, estado, codigo_postal, pais, telefono, es_predeterminada)
VALUES 
  ('33333333-3333-3333-3333-333333333333', 'envio', 'Regular User', 'Calle 100 #15-20', 'Bogotá', 'Cundinamarca', '110111', 'Colombia', '+57 310 123 4567', true),
  ('33333333-3333-3333-3333-333333333333', 'facturacion', 'Regular User', 'Calle 100 #15-20', 'Bogotá', 'Cundinamarca', '110111', 'Colombia', '+57 310 123 4567', false);

-- ========================================
-- PRODUCTOS DE EJEMPLO
-- ========================================

-- Asignar algunos productos existentes al vendor
UPDATE productos 
SET vendor_id = 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
    created_by = '22222222-2222-2222-2222-222222222222',
    status = 'active',
    stock_quantity = 50
WHERE categoria_id IN (SELECT id FROM categorias LIMIT 5);

UPDATE productos 
SET vendor_id = 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb',
    status = 'active',
    stock_quantity = 30
WHERE categoria_id IN (SELECT id FROM categorias OFFSET 5 LIMIT 3);

-- ========================================
-- VENDOR APPLICATIONS
-- ========================================

-- Aplicación pendiente
INSERT INTO vendor_applications (user_id, business_name, business_description, contact_email, contact_phone, business_address, status, submitted_at)
VALUES (
  '33333333-3333-3333-3333-333333333333',
  'Mi Nueva Tienda',
  'Quiero vender artesanías hechas a mano de mi región. Tengo 5 años de experiencia como artesano.',
  'user@latido.com',
  '+57 320 456 7890',
  '{"street": "Carrera 20 #30-40", "city": "Medellín", "state": "Antioquia", "country": "Colombia", "zip": "050001"}',
  'pending',
  NOW() - INTERVAL '3 days'
);

-- ========================================
-- VENDOR ANALYTICS (Datos de ejemplo)
-- ========================================

-- Analytics para último mes (30 días)
DO $$
DECLARE
  i INTEGER;
  current_date DATE;
  orders_count INTEGER;
  revenue DECIMAL(10,2);
BEGIN
  FOR i IN 0..29 LOOP
    current_date := CURRENT_DATE - i;
    orders_count := floor(random() * 10 + 1)::INTEGER;
    revenue := (random() * 500000 + 100000)::DECIMAL(10,2);
    
    INSERT INTO vendor_analytics (vendor_id, date, orders_count, revenue, commission_amount, products_sold, views, unique_customers)
    VALUES (
      'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
      current_date,
      orders_count,
      revenue,
      revenue * 0.10,
      orders_count * floor(random() * 3 + 1)::INTEGER,
      floor(random() * 100 + 50)::INTEGER,
      floor(random() * 50 + 10)::INTEGER
    )
    ON CONFLICT (vendor_id, date) DO NOTHING;
  END LOOP;
END $$;

-- ========================================
-- NOTIFICACIONES
-- ========================================

INSERT INTO notificaciones (usuario_id, tipo, titulo, mensaje, data, read)
VALUES 
  ('11111111-1111-1111-1111-111111111111', 'vendor_application', 'Nueva solicitud de vendor', 'Un usuario ha solicitado convertirse en vendor', '{"application_id": "uuid"}', false),
  ('22222222-2222-2222-2222-222222222222', 'vendor_approved', 'Cuenta aprobada', 'Tu cuenta de vendor ha sido aprobada. Ya puedes empezar a vender.', '{"vendor_id": "aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa"}', true),
  ('33333333-3333-3333-3333-333333333333', 'order_update', 'Pedido enviado', 'Tu pedido #12345 ha sido enviado', '{"order_id": "12345"}', false);

-- ========================================
-- AUDIT LOG
-- ========================================

INSERT INTO audit_log (user_id, action, entity_type, entity_id, new_values)
VALUES 
  ('11111111-1111-1111-1111-111111111111', 'vendor_approved', 'vendor', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', '{"status": "active", "approved_at": "2024-01-15T10:00:00Z"}'),
  ('22222222-2222-2222-2222-222222222222', 'product_created', 'product', NULL, '{"name": "Sombrero Vueltiao", "price": 150000}');

-- ========================================
-- RESUMEN
-- ========================================

-- Ver resumen de datos insertados
SELECT 
  'Usuarios' as tabla, COUNT(*) as registros 
FROM usuarios 
WHERE email IN ('admin@latido.com', 'manager@latido.com', 'user@latido.com')
UNION ALL
SELECT 'Vendors', COUNT(*) FROM vendors
UNION ALL
SELECT 'Aplicaciones Vendor', COUNT(*) FROM vendor_applications
UNION ALL
SELECT 'Productos con Vendor', COUNT(*) FROM productos WHERE vendor_id IS NOT NULL
UNION ALL
SELECT 'Analytics', COUNT(*) FROM vendor_analytics
UNION ALL
SELECT 'Notificaciones', COUNT(*) FROM notificaciones;

-- Mostrar credenciales
SELECT 
  '=== CREDENCIALES DE PRUEBA ===' as info
UNION ALL
SELECT 'Admin: admin@latido.com / admin123'
UNION ALL
SELECT 'Store Manager: manager@latido.com / manager123'
UNION ALL
SELECT 'User: user@latido.com / user123';
