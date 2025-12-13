-- ============================================
-- DATOS DE EJEMPLO - LATIDO ANCESTRAL
-- PostgreSQL Seed Data
-- ============================================

-- NOTA: Este archivo inserta datos de ejemplo para desarrollo y pruebas
-- NO ejecutar en producción

-- ============================================
-- USUARIOS DE PRUEBA
-- ============================================

-- Contraseña para todos: "password123" (hash bcrypt)
-- Usar bcrypt para generar hashes reales: https://bcrypt-generator.com/

INSERT INTO usuarios (email, password_hash, first_name, last_name, role, is_active, email_verified, email_verified_at) VALUES
('admin@latido.com', '$2b$10$zCRJ9U7Mq8CcALIKzhq4Pehjp6nMwLqvuAaBueiTgoCQm/TXo07vS', 'Admin', 'User', 'admin', true, true, CURRENT_TIMESTAMP),
('manager@latido.com', '$2b$10$icQIFNIljSQvrk4sduwOe.mVYRK1oVR34AIfd8TD9/IK8RrYlEpW2', 'Store', 'Manager', 'store_manager', true, true, CURRENT_TIMESTAMP),
('user@latido.com', '$2b$10$XCB4TuHeH5N7hGQMqWIV1ORvbGrO3uLqUVmbn5KhQ6vBxDZYhQQIq', 'Regular', 'User', 'customer', true, true, CURRENT_TIMESTAMP),
('cliente1@example.com', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'María', 'González', 'customer', true, true, CURRENT_TIMESTAMP),
('cliente2@example.com', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Juan', 'Pérez', 'customer', true, true, CURRENT_TIMESTAMP);

-- Asignar roles a usuarios
INSERT INTO usuarios_roles (usuario_id, role_id)
SELECT u.id, r.id FROM usuarios u, roles r 
WHERE u.email = 'admin@latido.com' AND r.name = 'admin';

INSERT INTO usuarios_roles (usuario_id, role_id)
SELECT u.id, r.id FROM usuarios u, roles r 
WHERE u.email = 'manager@latido.com' AND r.name = 'store_manager';

-- ============================================
-- DIRECCIONES
-- ============================================

INSERT INTO direcciones (usuario_id, full_name, street, city, state, postal_code, country, phone, is_default)
SELECT 
    u.id,
    'María González',
    'Carrera 7 # 71-21, Torre A Apto 301',
    'Bogotá',
    'Cundinamarca',
    '110231',
    'Colombia',
    '+57 300 1234567',
    true
FROM usuarios u WHERE u.email = 'cliente1@example.com';

INSERT INTO direcciones (usuario_id, full_name, street, city, state, postal_code, country, phone, is_default)
SELECT 
    u.id,
    'Juan Pérez',
    'Calle 10 # 5-20',
    'Medellín',
    'Antioquia',
    '050001',
    'Colombia',
    '+57 301 9876543',
    true
FROM usuarios u WHERE u.email = 'cliente2@example.com';

-- ============================================
-- MÉTODOS DE PAGO
-- ============================================

INSERT INTO metodos_pago (usuario_id, type, card_last_four, card_brand, expiry_date, is_default)
SELECT 
    u.id,
    'card',
    '4242',
    'Visa',
    '12/2026',
    true
FROM usuarios u WHERE u.email = 'cliente1@example.com';

INSERT INTO metodos_pago (usuario_id, type, paypal_email, is_default)
SELECT 
    u.id,
    'paypal',
    'juan.perez@example.com',
    true
FROM usuarios u WHERE u.email = 'cliente2@example.com';

-- ============================================
-- CATEGORÍAS
-- ============================================

-- Categorías principales
INSERT INTO categorias (name, slug, description, image, display_order) VALUES
('Sombreros', 'sombreros', 'Sombreros artesanales tradicionales colombianos', '/images/categories/sombreros.jpg', 1),
('Mochilas', 'mochilas', 'Mochilas tejidas a mano con diseños ancestrales', '/images/categories/mochilas.jpg', 2),
('Joyería', 'joyeria', 'Pulseras, collares y accesorios artesanales', '/images/categories/joyeria.jpg', 3),
('Textiles', 'textiles', 'Ropa y telas con técnicas ancestrales', '/images/categories/textiles.jpg', 4),
('Decoración', 'decoracion', 'Objetos decorativos para el hogar', '/images/categories/decoracion.jpg', 5),
('Instrumentos', 'instrumentos', 'Instrumentos musicales tradicionales', '/images/categories/instrumentos.jpg', 6);

-- Subcategorías
INSERT INTO categorias (name, slug, description, parent_id, display_order)
SELECT 'Sombreros Vueltiao', 'sombreros-vueltiao', 'Sombrero tradicional de la costa caribeña', id, 1
FROM categorias WHERE slug = 'sombreros';

INSERT INTO categorias (name, slug, description, parent_id, display_order)
SELECT 'Mochilas Wayuu', 'mochilas-wayuu', 'Mochilas tradicionales del pueblo Wayuu', id, 1
FROM categorias WHERE slug = 'mochilas';

INSERT INTO categorias (name, slug, description, parent_id, display_order)
SELECT 'Pulseras', 'pulseras', 'Pulseras artesanales', id, 1
FROM categorias WHERE slug = 'joyeria';

-- ============================================
-- ETIQUETAS
-- ============================================

INSERT INTO etiquetas (name, slug) VALUES
('Hecho a mano', 'hecho-a-mano'),
('Tejido', 'tejido'),
('Tradicional', 'tradicional'),
('Wayuu', 'wayuu'),
('Caribeño', 'caribeno'),
('Colorido', 'colorido'),
('Natural', 'natural'),
('Ecológico', 'ecologico'),
('Único', 'unico'),
('Regalo', 'regalo'),
('Novedad', 'novedad'),
('Mejor vendido', 'mejor-vendido');

-- ============================================
-- PRODUCTOS
-- ============================================

-- Sombreros Vueltiao
INSERT INTO productos (name, slug, description, short_description, price, cost_price, category_id, brand, material, featured, stock, sku, weight, dimensions, rating_average, reviews_count, views_count, sales_count)
SELECT 
    'Sombrero Vueltiao Tradicional 19 Vueltas',
    'sombrero-vueltiao-tradicional-19',
    'Sombrero Vueltiao auténtico elaborado con fibras de caña flecha por artesanos zenúes. Este sombrero de 19 vueltas representa la tradición y cultura de la región Caribe colombiana. Cada pieza es única y requiere varios días de trabajo manual.',
    'Sombrero tradicional colombiano elaborado en fibra de caña flecha',
    150000,
    90000,
    c.id,
    'Artesanías Zenú',
    'Caña flecha',
    true,
    25,
    'SV-19-001',
    0.3,
    '38x38x15 cm',
    4.8,
    12,
    450,
    35
FROM categorias c WHERE c.slug = 'sombreros-vueltiao';

INSERT INTO productos (name, slug, description, short_description, price, cost_price, category_id, brand, material, featured, stock, sku, weight, dimensions, rating_average, reviews_count)
SELECT 
    'Sombrero Vueltiao Premium 23 Vueltas',
    'sombrero-vueltiao-premium-23',
    'Sombrero Vueltiao de alta calidad con 23 vueltas. Mayor densidad de tejido significa mayor calidad y durabilidad. Ideal para ocasiones especiales.',
    'Sombrero premium de 23 vueltas, calidad superior',
    250000,
    150000,
    c.id,
    'Artesanías Zenú',
    'Caña flecha',
    true,
    15,
    'SV-23-001',
    0.35,
    '38x38x15 cm',
    5.0,
    8
FROM categorias c WHERE c.slug = 'sombreros-vueltiao';

-- Mochilas Wayuu
INSERT INTO productos (name, slug, description, short_description, price, cost_price, category_id, brand, material, featured, stock, sku, weight, dimensions, rating_average, reviews_count, views_count, sales_count)
SELECT 
    'Mochila Wayuu Tradicional Grande',
    'mochila-wayuu-tradicional-grande',
    'Mochila Wayuu auténtica tejida a mano por artesanas de La Guajira. Cada mochila tarda aproximadamente 20 días en ser elaborada. Los diseños geométricos representan símbolos ancestrales de la cultura Wayuu.',
    'Mochila Wayuu tejida a mano con diseños tradicionales',
    180000,
    110000,
    c.id,
    'Artesanías Wayuu',
    'Algodón',
    true,
    30,
    'MW-GRD-001',
    0.4,
    '30x35x10 cm',
    4.9,
    25,
    680,
    52
FROM categorias c WHERE c.slug = 'mochilas-wayuu';

INSERT INTO productos (name, slug, description, short_description, price, cost_price, category_id, brand, material, stock, sku, weight)
SELECT 
    'Mochila Wayuu Mediana Colores Vivos',
    'mochila-wayuu-mediana-colores',
    'Mochila Wayuu de tamaño mediano con colores vibrantes. Perfecta para uso diario. Tejida en algodón 100% por artesanas Wayuu.',
    'Mochila colorida de tamaño mediano, ideal para el día a día',
    130000,
    80000,
    c.id,
    'Artesanías Wayuu',
    'Algodón',
    35,
    'MW-MED-002',
    0.3
FROM categorias c WHERE c.slug = 'mochilas-wayuu';

-- Pulseras
INSERT INTO productos (name, slug, description, short_description, price, cost_price, category_id, material, stock, sku, weight, rating_average, reviews_count)
SELECT 
    'Pulsera Artesanal Hilo y Mostacilla',
    'pulsera-artesanal-hilo-mostacilla',
    'Pulsera tejida a mano con hilos de colores y mostacillas. Diseño único inspirado en patrones tradicionales indígenas colombianos.',
    'Pulsera colorida tejida a mano con mostacillas',
    25000,
    12000,
    c.id,
    'Hilo y mostacilla',
    100,
    'PLS-001',
    0.02,
    4.5,
    18
FROM categorias c WHERE c.slug = 'pulseras';

INSERT INTO productos (name, slug, description, short_description, price, cost_price, category_id, material, featured, stock, sku, weight)
SELECT 
    'Set 3 Pulseras Wayuu',
    'set-3-pulseras-wayuu',
    'Set de 3 pulseras Wayuu con diferentes diseños y colores. Perfectas para combinar o regalar.',
    'Set de 3 pulseras Wayuu tejidas a mano',
    45000,
    25000,
    c.id,
    'Algodón',
    false,
    60,
    'PLS-SET-003',
    0.05
FROM categorias c WHERE c.slug = 'pulseras';

-- Textiles
INSERT INTO productos (name, slug, description, short_description, price, cost_price, category_id, brand, material, stock, sku, weight)
SELECT 
    'Ruana Tradicional de Lana',
    'ruana-tradicional-lana',
    'Ruana tejida en telar tradicional con lana 100% natural. Perfecta para climas fríos. Diseño clásico colombiano.',
    'Ruana de lana tejida en telar tradicional',
    280000,
    180000,
    c.id,
    'Artesanías Boyacá',
    'Lana',
    20,
    'TXT-RUA-001',
    1.2
FROM categorias c WHERE c.slug = 'textiles';

-- Decoración
INSERT INTO productos (name, slug, description, short_description, price, cost_price, category_id, material, stock, sku)
SELECT 
    'Hamaca Colombiana Tejida',
    'hamaca-colombiana-tejida',
    'Hamaca tradicional colombiana tejida a mano. Perfecta para descansar y decorar espacios exteriores.',
    'Hamaca artesanal tejida a mano',
    320000,
    200000,
    c.id,
    'Algodón',
    15,
    'DEC-HAM-001'
FROM categorias c WHERE c.slug = 'decoracion';

-- ============================================
-- IMÁGENES DE PRODUCTOS
-- ============================================

-- Sombrero Vueltiao 19
INSERT INTO imagenes_producto (producto_id, url, alt_text, display_order, is_primary)
SELECT p.id, '/images/products/sombrero-vueltiao-19-1.jpg', 'Sombrero Vueltiao 19 vueltas vista frontal', 1, true
FROM productos p WHERE p.sku = 'SV-19-001';

INSERT INTO imagenes_producto (producto_id, url, alt_text, display_order)
SELECT p.id, '/images/products/sombrero-vueltiao-19-2.jpg', 'Sombrero Vueltiao 19 vueltas vista lateral', 2
FROM productos p WHERE p.sku = 'SV-19-001';

-- Mochila Wayuu
INSERT INTO imagenes_producto (producto_id, url, alt_text, display_order, is_primary)
SELECT p.id, '/images/products/mochila-wayuu-1.jpg', 'Mochila Wayuu tradicional grande', 1, true
FROM productos p WHERE p.sku = 'MW-GRD-001';

INSERT INTO imagenes_producto (producto_id, url, alt_text, display_order)
SELECT p.id, '/images/products/mochila-wayuu-2.jpg', 'Detalle del tejido Wayuu', 2
FROM productos p WHERE p.sku = 'MW-GRD-001';

-- ============================================
-- RELACIÓN PRODUCTOS-ETIQUETAS
-- ============================================

-- Sombrero Vueltiao
INSERT INTO productos_etiquetas (producto_id, etiqueta_id)
SELECT p.id, e.id FROM productos p, etiquetas e 
WHERE p.sku = 'SV-19-001' AND e.slug IN ('hecho-a-mano', 'tradicional', 'caribeno', 'mejor-vendido');

-- Mochila Wayuu
INSERT INTO productos_etiquetas (producto_id, etiqueta_id)
SELECT p.id, e.id FROM productos p, etiquetas e 
WHERE p.sku = 'MW-GRD-001' AND e.slug IN ('hecho-a-mano', 'tejido', 'wayuu', 'colorido', 'mejor-vendido');

-- Pulsera
INSERT INTO productos_etiquetas (producto_id, etiqueta_id)
SELECT p.id, e.id FROM productos p, etiquetas e 
WHERE p.sku = 'PLS-001' AND e.slug IN ('hecho-a-mano', 'colorido', 'regalo');

-- ============================================
-- VARIANTES DE PRODUCTOS
-- ============================================

-- Variantes de Sombrero Vueltiao (tallas)
INSERT INTO variantes (producto_id, size, stock, sku)
SELECT p.id, 'S (54-56 cm)', 8, 'SV-19-001-S'
FROM productos p WHERE p.sku = 'SV-19-001';

INSERT INTO variantes (producto_id, size, stock, sku)
SELECT p.id, 'M (57-58 cm)', 10, 'SV-19-001-M'
FROM productos p WHERE p.sku = 'SV-19-001';

INSERT INTO variantes (producto_id, size, stock, sku)
SELECT p.id, 'L (59-60 cm)', 7, 'SV-19-001-L'
FROM productos p WHERE p.sku = 'SV-19-001';

-- Variantes de Mochila Wayuu (colores)
INSERT INTO variantes (producto_id, color, stock, sku)
SELECT p.id, 'Rojo y Naranja', 10, 'MW-GRD-001-RN'
FROM productos p WHERE p.sku = 'MW-GRD-001';

INSERT INTO variantes (producto_id, color, stock, sku)
SELECT p.id, 'Azul y Verde', 12, 'MW-GRD-001-AV'
FROM productos p WHERE p.sku = 'MW-GRD-001';

INSERT INTO variantes (producto_id, color, stock, sku)
SELECT p.id, 'Multicolor', 8, 'MW-GRD-001-MC'
FROM productos p WHERE p.sku = 'MW-GRD-001';

-- ============================================
-- CUPONES
-- ============================================

INSERT INTO cupones (code, type, discount_value, min_purchase_amount, max_discount_amount, usage_limit, starts_at, expires_at, is_active)
VALUES
('BIENVENIDA10', 'percentage', 10, 50000, 30000, NULL, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP + INTERVAL '90 days', true),
('ENVIOGRATIS', 'free_shipping', 0, 100000, NULL, 100, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP + INTERVAL '30 days', true),
('VERANO50K', 'fixed_amount', 50000, 200000, NULL, 50, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP + INTERVAL '60 days', true),
('PRIMERACOMPRA', 'percentage', 15, 0, 50000, NULL, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP + INTERVAL '365 days', true);

-- ============================================
-- RESEÑAS
-- ============================================

INSERT INTO reseñas (producto_id, usuario_id, pedido_id, rating, title, comment, verified_purchase, helpful_count, is_approved, approved_at, approved_by)
SELECT 
    p.id,
    u.id,
    NULL,
    5,
    'Excelente calidad',
    'El sombrero es hermoso y de muy buena calidad. El tejido es perfecto y el acabado impecable. Lo recomiendo 100%.',
    true,
    15,
    true,
    CURRENT_TIMESTAMP,
    (SELECT id FROM usuarios WHERE email = 'moderador@latidoancestral.com')
FROM productos p, usuarios u 
WHERE p.sku = 'SV-19-001' AND u.email = 'cliente1@example.com';

INSERT INTO reseñas (producto_id, usuario_id, rating, title, comment, verified_purchase, helpful_count, is_approved, approved_at, approved_by)
SELECT 
    p.id,
    u.id,
    5,
    'Bellísima mochila',
    'La mochila llegó perfecta, los colores son más bonitos en persona. Se nota el trabajo artesanal. Muy contenta con la compra.',
    true,
    22,
    true,
    CURRENT_TIMESTAMP,
    (SELECT id FROM usuarios WHERE email = 'moderador@latidoancestral.com')
FROM productos p, usuarios u 
WHERE p.sku = 'MW-GRD-001' AND u.email = 'cliente2@example.com';

INSERT INTO reseñas (producto_id, usuario_id, rating, title, comment, verified_purchase, helpful_count, is_approved, approved_at, approved_by)
SELECT 
    p.id,
    u.id,
    4,
    'Muy bonita pero tardó en llegar',
    'La mochila es preciosa y bien hecha, pero el envío tardó más de lo esperado. De resto, todo perfecto.',
    true,
    8,
    true,
    CURRENT_TIMESTAMP,
    (SELECT id FROM usuarios WHERE email = 'moderador@latidoancestral.com')
FROM productos p, usuarios u 
WHERE p.sku = 'MW-GRD-001' AND u.email = 'cliente1@example.com';

-- ============================================
-- PREGUNTAS Y RESPUESTAS
-- ============================================

INSERT INTO preguntas (producto_id, usuario_id, question, answer, answered_by, answered_at, helpful_count, is_public)
SELECT 
    p.id,
    u.id,
    '¿El sombrero es resistente al agua?',
    'Sí, el Sombrero Vueltiao tiene cierta resistencia al agua gracias a las fibras naturales de caña flecha, pero no se recomienda exposición prolongada a la lluvia.',
    (SELECT id FROM usuarios WHERE email = 'admin@latidoancestral.com'),
    CURRENT_TIMESTAMP,
    5,
    true
FROM productos p, usuarios u 
WHERE p.sku = 'SV-19-001' AND u.email = 'cliente2@example.com';

INSERT INTO preguntas (producto_id, usuario_id, question, answer, answered_by, answered_at, helpful_count, is_public)
SELECT 
    p.id,
    u.id,
    '¿Cuánto mide la correa de la mochila?',
    'La correa ajustable mide aproximadamente 120 cm y puede adaptarse a diferentes alturas.',
    (SELECT id FROM usuarios WHERE email = 'vendedor@latidoancestral.com'),
    CURRENT_TIMESTAMP,
    3,
    true
FROM productos p, usuarios u 
WHERE p.sku = 'MW-GRD-001' AND u.email = 'cliente1@example.com';

-- ============================================
-- WISHLIST
-- ============================================

INSERT INTO wishlist (usuario_id, producto_id)
SELECT u.id, p.id FROM usuarios u, productos p 
WHERE u.email = 'cliente1@example.com' AND p.sku = 'SV-23-001';

INSERT INTO wishlist (usuario_id, producto_id)
SELECT u.id, p.id FROM usuarios u, productos p 
WHERE u.email = 'cliente2@example.com' AND p.sku = 'TXT-RUA-001';

-- ============================================
-- SUSCRIPCIONES
-- ============================================

INSERT INTO suscripciones (email, status, token)
VALUES
('newsletter1@example.com', 'active', md5(random()::text)),
('newsletter2@example.com', 'active', md5(random()::text)),
('newsletter3@example.com', 'active', md5(random()::text));

-- ============================================
-- NOTIFICACIONES
-- ============================================

INSERT INTO notificaciones (usuario_id, type, title, message, status)
SELECT 
    u.id,
    'promotion',
    '¡10% de descuento en tu primera compra!',
    'Usa el código BIENVENIDA10 en tu primera compra y obtén un 10% de descuento.',
    'unread'
FROM usuarios u WHERE u.email = 'cliente1@example.com';

INSERT INTO notificaciones (usuario_id, type, title, message, status)
SELECT 
    u.id,
    'system',
    'Bienvenido a Latido Ancestral',
    'Gracias por registrarte. Explora nuestro catálogo de productos artesanales colombianos.',
    'read'
FROM usuarios u WHERE u.email = 'cliente2@example.com';

-- ============================================
-- FIN DEL SEED
-- ============================================

-- Mensaje de confirmación
DO $$
BEGIN
    RAISE NOTICE '✅ Datos de prueba insertados correctamente';
    RAISE NOTICE '📧 Usuarios creados: admin@latidoancestral.com, vendedor@latidoancestral.com, cliente1@example.com, cliente2@example.com';
    RAISE NOTICE '🔑 Contraseña para todos: password123';
    RAISE NOTICE '🛍️ Productos: % productos insertados', (SELECT COUNT(*) FROM productos);
    RAISE NOTICE '📦 Categorías: % categorías creadas', (SELECT COUNT(*) FROM categorias);
    RAISE NOTICE '🎫 Cupones: % cupones activos', (SELECT COUNT(*) FROM cupones WHERE is_active = true);
END $$;
