-- Script para crear usuarios de prueba en PostgreSQL
-- Ejecutar con: psql -U postgres -d tienda_virtual -f database\insert-test-users.sql

-- NOTA: Los usuarios ya están creados en all.sql con emails @latidoancestral.com
-- Este script crea usuarios adicionales para pruebas con @latido.com

-- Password para todos: admin123, vendor123, user123 (sin encriptar por simplicidad en desarrollo)

-- Admin user
INSERT INTO usuarios (id, email, password_hash, first_name, last_name, role, is_active, status, email_verified, created_at)
VALUES (
  '11111111-1111-1111-1111-111111111111',
  'admin@latido.com',
  'admin123',
  'Admin',
  'User',
  'admin',
  true,
  'active',
  true,
  NOW()
) ON CONFLICT (id) DO NOTHING;

-- Vendor user
INSERT INTO usuarios (id, email, password_hash, first_name, last_name, role, is_active, status, email_verified, created_at)
VALUES (
  '22222222-2222-2222-2222-222222222222',
  'manager@latido.com',
  'manager123',
  'Store',
  'Manager',
  'store_manager',
  true,
  'active',
  true,
  NOW()
) ON CONFLICT (id) DO NOTHING;

-- Regular user (customer)
INSERT INTO usuarios (id, email, password_hash, first_name, last_name, role, is_active, status, email_verified, created_at)
VALUES (
  '33333333-3333-3333-3333-333333333333',
  'user@latido.com',
  'user123',
  'Regular',
  'User',
  'customer',
  true,
  'active',
  true,
  NOW()
) ON CONFLICT (id) DO NOTHING;

-- Provider user
INSERT INTO usuarios (id, email, password_hash, first_name, last_name, role, is_active, status, email_verified, created_at)
VALUES (
  '44444444-4444-4444-4444-444444444444',
  'provider@latido.com',
  'provider123',
  'Provider',
  'User',
  'provider',
  true,
  'active',
  true,
  NOW()
) ON CONFLICT (id) DO NOTHING;

-- Verificar inserción
SELECT id, email, first_name, last_name, role, status FROM usuarios WHERE email LIKE '%@latido.com';
