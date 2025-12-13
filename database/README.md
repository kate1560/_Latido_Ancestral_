# 📊 Documentación de Base de Datos - Latido Ancestral

## 🗄️ Información General

**Motor:** PostgreSQL 14+  
**Extensiones requeridas:**
- `uuid-ossp` - Para generar UUIDs
- `pgcrypto` - Para encriptación de datos sensibles

## 📋 Estructura de Tablas

### 🔐 Autenticación y Usuarios

#### `usuarios`
Almacena la información personal de los usuarios del sistema.

**Campos principales:**
- `id` (UUID) - Identificador único
- `email` (VARCHAR) - Email único del usuario
- `password_hash` (VARCHAR) - Hash de la contraseña
- `first_name`, `last_name` - Nombre completo
- `role` (ENUM) - Rol principal (customer, admin, vendor, moderator)
- `is_active`, `email_verified` - Estados de verificación

**Relaciones:**
- Tiene múltiples `direcciones`
- Tiene múltiples `metodos_pago`
- Tiene múltiples `pedidos`
- Tiene múltiples `notificaciones`
- Tiene relación many-to-many con `roles` a través de `usuarios_roles`

---

#### `roles`
Define los roles disponibles en el sistema.

**Roles predefinidos:**
- `admin` - Administrador con acceso completo
- `vendor` - Vendedor con acceso a productos e inventario
- `moderator` - Moderador de contenido
- `customer` - Cliente estándar

---

#### `permisos`
Lista de permisos granulares del sistema.

**Permisos principales:**
- `manage_users` - Gestionar usuarios
- `manage_products` - Gestionar productos
- `manage_orders` - Gestionar pedidos
- `manage_inventory` - Gestionar inventario
- `moderate_reviews` - Moderar reseñas
- `view_reports` - Ver estadísticas

---

#### `tokens`
Gestión de tokens JWT y sesiones activas.

**Tipos de tokens:**
- `access` - Token de acceso
- `refresh` - Token de refresco
- `email_verification` - Verificación de email
- `password_reset` - Recuperación de contraseña

**Características:**
- Almacena IP y user agent para seguridad
- Permite revocar tokens
- Tiene fecha de expiración

---

### 🏠 Direcciones y Pagos

#### `direcciones`
Almacena las direcciones de envío de los usuarios.

**Campos:**
- Información completa de dirección (calle, ciudad, estado, código postal, país)
- `is_default` - Indica si es la dirección predeterminada
- Un usuario puede tener múltiples direcciones

---

#### `metodos_pago`
Métodos de pago guardados por usuario.

**Tipos soportados:**
- `card` - Tarjeta de crédito/débito
- `paypal` - PayPal
- `transfer` - Transferencia bancaria
- `cash_on_delivery` - Pago contra entrega
- `cryptocurrency` - Criptomonedas

**Seguridad:**
- Solo guarda últimos 4 dígitos de tarjetas
- Números de cuenta encriptados
- Marca de método predeterminado

---

### 🛍️ Productos y Catálogo

#### `productos`
Catálogo principal de productos.

**Campos clave:**
- `name`, `slug` - Nombre y URL amigable
- `description`, `short_description` - Descripciones
- `price`, `cost_price` - Precio de venta y costo
- `stock` - Inventario disponible
- `sku` - Código único de producto
- `rating_average`, `reviews_count` - Calificación y reseñas
- `views_count`, `sales_count` - Métricas de rendimiento
- `weight`, `dimensions` - Información logística

**Características:**
- Puede tener múltiples imágenes
- Puede tener múltiples variantes
- Sistema de etiquetas (tags)
- Categorización jerárquica

---

#### `categorias`
Sistema de categorías con soporte para subcategorías.

**Características:**
- Estructura jerárquica (parent-child)
- `parent_id` - Referencia a categoría padre
- `slug` - URL amigable
- `display_order` - Orden de visualización
- Puede tener imagen representativa

---

#### `etiquetas`
Tags para clasificación adicional de productos.

**Relación:**
- Many-to-many con productos a través de `productos_etiquetas`

---

#### `variantes`
Variaciones de un producto (talla, color, material, modelo).

**Campos:**
- `size`, `color`, `material`, `model` - Atributos de variación
- `stock` - Inventario específico de la variante
- `price_modifier` - Modificador de precio (puede ser +/-)
- `sku` - Código único de la variante

---

#### `imagenes_producto`
Galería de imágenes de productos.

**Características:**
- Múltiples imágenes por producto
- `is_primary` - Imagen principal
- `display_order` - Orden de visualización
- `alt_text` - Texto alternativo para SEO

---

### 📦 Pedidos y Ventas

#### `pedidos`
Pedidos realizados por usuarios.

**Estados posibles:**
- `pending` - Pendiente
- `processing` - Procesando
- `shipped` - Enviado
- `delivered` - Entregado
- `cancelled` - Cancelado
- `refunded` - Reembolsado

**Estructura de precios:**
- `subtotal` - Suma de productos
- `tax` - Impuestos
- `shipping_cost` - Costo de envío
- `discount_amount` - Descuento aplicado
- `total` - Total final

**Relaciones:**
- Pertenece a un `usuario`
- Tiene un `cupon` (opcional)
- Tiene una `direccion` de envío
- Tiene un `metodo_pago`
- Tiene múltiples `detalle_pedido` (items)
- Tiene registros de `pagos` y `envios`

---

#### `detalle_pedido`
Items individuales de cada pedido.

**Características:**
- Guarda snapshot del nombre y precio del producto
- Referencia al producto y variante
- Cantidad y subtotal
- SKU para trazabilidad

---

#### `pagos`
Registro de transacciones de pago.

**Estados:**
- `pending` - Pendiente
- `completed` - Completado
- `failed` - Fallido
- `refunded` - Reembolsado

**Información registrada:**
- `transaction_id` - ID de transacción del gateway
- `payment_gateway` - Proveedor (Stripe, PayPal, etc.)
- `external_reference` - Referencia externa
- Fecha de pago completado

---

#### `envios`
Información de envío de pedidos.

**Datos:**
- `carrier_name` - Empresa de envío
- `tracking_code`, `tracking_url` - Código de rastreo
- `estimated_delivery_date` - Fecha estimada
- `shipped_at`, `delivered_at` - Fechas de envío y entrega

---

### 💰 Promociones

#### `cupones`
Sistema de cupones de descuento.

**Tipos:**
- `percentage` - Porcentaje de descuento
- `fixed_amount` - Monto fijo
- `free_shipping` - Envío gratis

**Configuración:**
- `code` - Código único del cupón
- `discount_value` - Valor del descuento
- `min_purchase_amount` - Compra mínima requerida
- `max_discount_amount` - Descuento máximo aplicable
- `usage_limit` - Límite de usos totales
- `usage_limit_per_user` - Límite por usuario
- `starts_at`, `expires_at` - Vigencia

---

#### `cupones_usuarios`
Registro de uso de cupones por usuario.

**Función:**
- Rastrear quién usó qué cupón
- Controlar límites de uso por usuario
- Vincular con pedidos específicos

---

### 📊 Inventario

#### `inventario`
Registro de todos los movimientos de stock.

**Tipos de movimiento:**
- `purchase` - Compra/entrada
- `sale` - Venta/salida
- `return` - Devolución
- `adjustment` - Ajuste manual
- `damaged` - Producto dañado
- `lost` - Producto perdido

**Trazabilidad:**
- `stock_before`, `stock_after` - Stock antes y después
- `reference_id` - Referencia al pedido/operación
- `created_by` - Usuario que realizó el movimiento
- `notes` - Notas adicionales

---

### ⭐ Interacción con Clientes

#### `reseñas`
Reseñas y calificaciones de productos.

**Características:**
- Rating de 1 a 5 estrellas
- Título y comentario
- `verified_purchase` - Compra verificada
- `helpful_count` - Contador de "útil"
- Sistema de moderación (`is_approved`)
- Puede tener multimedia asociada

**Restricción:**
- Un usuario solo puede hacer una reseña por producto por pedido

---

#### `multimedia_reseña`
Imágenes y videos subidos en reseñas.

**Tipos:**
- `image` - Imagen
- `video` - Video

---

#### `preguntas`
Sistema de preguntas y respuestas sobre productos.

**Flujo:**
- Usuario hace una pregunta
- Admin/Vendor responde
- Se registra quién respondió y cuándo
- Contador de "útil"
- Puede ser pública o privada

---

#### `wishlist`
Lista de deseos de usuarios.

**Estructura:**
- Relación simple entre usuario y producto
- Fecha de adición
- Restricción de unicidad

---

### 🔔 Notificaciones

#### `notificaciones`
Sistema de notificaciones para usuarios.

**Tipos:**
- `order` - Relacionada con pedidos
- `shipping` - Relacionada con envíos
- `promotion` - Promociones y ofertas
- `review` - Reseñas
- `system` - Sistema

**Estados:**
- `unread` - No leída
- `read` - Leída
- `archived` - Archivada

---

#### `suscripciones`
Suscripciones a newsletter.

**Características:**
- Email único
- Token para desuscribirse
- Estado (active, inactive, pending)
- Fecha de suscripción/desuscripción

---

### 📈 Métricas y Backoffice

#### `ventas`
Resúmenes estadísticos de ventas.

**Períodos:**
- `daily` - Diario
- `monthly` - Mensual
- `yearly` - Anual

**Métricas:**
- Total de pedidos
- Ingresos totales
- Productos vendidos
- Valor promedio de pedido

---

#### `logs`
Registro de auditoría del sistema.

**Información registrada:**
- Usuario que realizó la acción
- Tipo de entidad afectada
- ID de la entidad
- Valores anteriores y nuevos (JSONB)
- IP y user agent
- Timestamp

---

#### `backups`
Registro de copias de seguridad.

**Tipos:**
- `full` - Completo
- `incremental` - Incremental
- `differential` - Diferencial

**Información:**
- Nombre y ruta del archivo
- Tamaño en bytes
- Estado (completed, failed, in_progress)
- Usuario que lo creó
- Fecha de restauración (si aplica)

---

#### `configuracion`
Configuración global del sistema.

**Parámetros almacenados:**
- Nombre del sitio
- Email de contacto
- Moneda predeterminada
- Tasa de impuestos
- Umbral de envío gratis
- Modo de mantenimiento
- etc.

---

## 🔗 Diagrama de Relaciones (Principales)

```
usuarios
  |-- direcciones (1:N)
  |-- metodos_pago (1:N)
  |-- pedidos (1:N)
  |-- reseñas (1:N)
  |-- preguntas (1:N)
  |-- wishlist (1:N)
  |-- notificaciones (1:N)
  |-- usuarios_roles (M:N) -- roles

productos
  |-- imagenes_producto (1:N)
  |-- variantes (1:N)
  |-- productos_etiquetas (M:N) -- etiquetas
  |-- categorias (N:1)
  |-- reseñas (1:N)
  |-- preguntas (1:N)
  |-- inventario (1:N)

pedidos
  |-- detalle_pedido (1:N)
  |-- pagos (1:N)
  |-- envios (1:1)
  |-- cupones (N:1)
  |-- direcciones (N:1)
  |-- metodos_pago (N:1)

categorias
  |-- categorias (1:N) [jerárquica]

reseñas
  |-- multimedia_reseña (1:N)
```

---

## 🚀 Instalación

### 1. Crear la base de datos

```bash
# Conectarse a PostgreSQL
psql -U postgres

# Crear base de datos
CREATE DATABASE latido_ancestral;

# Conectarse a la base de datos
\c latido_ancestral
```

### 2. Ejecutar el schema

```bash
# Desde la terminal
psql -U postgres -d latido_ancestral -f database/schema.sql
```

O desde psql:
```sql
\i database/schema.sql
```

---

## 🔧 Funcionalidades Automáticas

### Triggers Implementados

1. **`update_updated_at_column()`**
   - Actualiza automáticamente el campo `updated_at` en cada UPDATE
   - Aplicado a: usuarios, productos, categorías, pedidos, direcciones, métodos de pago, variantes, cupones, pagos, envíos, reseñas, preguntas

2. **`update_product_rating()`**
   - Actualiza automáticamente el rating promedio y contador de reseñas
   - Se ejecuta al insertar o actualizar una reseña aprobada

3. **`generate_order_number()`**
   - Genera números de pedido únicos automáticamente
   - Formato: `ORD-YYYYMMDD-XXXXXX`

4. **`register_inventory_movement()`**
   - Registra movimientos de inventario al crear detalle de pedido
   - Actualiza el stock automáticamente

---

## 📊 Índices de Optimización

Se han creado índices en:
- Emails de usuarios
- Slugs de productos
- Estados de pedidos
- Fechas de creación (con ordenamiento DESC)
- Campos de búsqueda frecuente

**Índices parciales:**
- Productos destacados (`featured = true`)
- Productos activos (`is_active = true`)
- Reseñas aprobadas (`is_approved = true`)

---

## 🔒 Seguridad

### Datos Sensibles
- Contraseñas almacenadas con hash (bcrypt recomendado)
- Números de cuenta bancaria encriptados con `pgcrypto`
- Solo últimos 4 dígitos de tarjetas almacenados

### Auditoría
- Tabla `logs` para registro de todas las acciones importantes
- Tabla `tokens` para gestión de sesiones
- Registro de IP y user agent en acciones sensibles

### Permisos
- Sistema granular de roles y permisos
- Control de acceso basado en roles (RBAC)
- Usuarios pueden tener múltiples roles

---

## 📝 Consultas Útiles

### Ver productos más vendidos
```sql
SELECT 
  p.name, 
  p.sales_count, 
  p.rating_average
FROM productos p
WHERE p.is_active = true
ORDER BY p.sales_count DESC
LIMIT 10;
```

### Reporte de ventas del mes
```sql
SELECT 
  DATE(created_at) as fecha,
  COUNT(*) as total_pedidos,
  SUM(total) as ingresos
FROM pedidos
WHERE created_at >= DATE_TRUNC('month', CURRENT_DATE)
GROUP BY DATE(created_at)
ORDER BY fecha;
```

### Usuarios con más pedidos
```sql
SELECT 
  u.email,
  u.first_name,
  u.last_name,
  COUNT(p.id) as total_pedidos,
  SUM(p.total) as total_gastado
FROM usuarios u
LEFT JOIN pedidos p ON u.id = p.usuario_id
GROUP BY u.id
ORDER BY total_pedidos DESC
LIMIT 10;
```

### Productos con bajo stock
```sql
SELECT 
  p.name,
  p.stock,
  p.sales_count
FROM productos p
WHERE p.stock < 10 AND p.is_active = true
ORDER BY p.stock ASC;
```

### Reseñas pendientes de moderación
```sql
SELECT 
  r.id,
  r.title,
  u.email as usuario,
  p.name as producto,
  r.rating,
  r.created_at
FROM reseñas r
JOIN usuarios u ON r.usuario_id = u.id
JOIN productos p ON r.producto_id = p.id
WHERE r.is_approved = false
ORDER BY r.created_at DESC;
```

---

## 🔄 Mantenimiento

### Backup recomendado
```bash
# Backup completo
pg_dump -U postgres -d latido_ancestral -F c -f backup_$(date +%Y%m%d).dump

# Restaurar
pg_restore -U postgres -d latido_ancestral -c backup_YYYYMMDD.dump
```

### Limpiar tokens expirados
```sql
DELETE FROM tokens 
WHERE expires_at < CURRENT_TIMESTAMP 
AND revoked = false;
```

### Actualizar estadísticas de ventas
```sql
-- Insertar resumen diario
INSERT INTO ventas (date, period, total_orders, total_revenue, total_products_sold, average_order_value)
SELECT 
  CURRENT_DATE,
  'daily',
  COUNT(*),
  SUM(total),
  (SELECT SUM(quantity) FROM detalle_pedido dp WHERE dp.pedido_id IN (SELECT id FROM pedidos WHERE DATE(created_at) = CURRENT_DATE)),
  AVG(total)
FROM pedidos
WHERE DATE(created_at) = CURRENT_DATE
ON CONFLICT (date, period) DO UPDATE
SET 
  total_orders = EXCLUDED.total_orders,
  total_revenue = EXCLUDED.total_revenue,
  total_products_sold = EXCLUDED.total_products_sold,
  average_order_value = EXCLUDED.average_order_value;
```

---

## 🧪 Datos de Prueba

Para insertar datos de prueba, puedes crear un archivo `seed.sql` con:

```sql
-- Usuario de prueba
INSERT INTO usuarios (email, password_hash, first_name, last_name, role)
VALUES ('admin@latidoancestral.com', '$2b$10$...', 'Admin', 'Test', 'admin');

-- Categoría de prueba
INSERT INTO categorias (name, slug, description)
VALUES ('Sombreros', 'sombreros', 'Sombreros artesanales colombianos');

-- Producto de prueba
INSERT INTO productos (name, slug, description, price, category_id, stock, sku)
VALUES (
  'Sombrero Vueltiao', 
  'sombrero-vueltiao', 
  'Sombrero tradicional colombiano', 
  150000, 
  (SELECT id FROM categorias WHERE slug = 'sombreros' LIMIT 1),
  50,
  'SV-001'
);
```

---

## 📞 Soporte

Para más información sobre la estructura de la base de datos o consultas específicas, consulta la documentación de PostgreSQL o contacta al equipo de desarrollo.

**Versión del Schema:** 1.0.0  
**Última actualización:** 2025-11-09
