# 🧪 Guía de Pruebas - Backend

Esta guía te ayudará a probar todos los endpoints del backend usando `curl` o una herramienta como Postman/Insomnia.

## 🚀 Verificación Rápida

### 1. ¿Está corriendo el servidor?

```bash
# Verificar que el servidor está activo
curl http://localhost:4000/health

# Respuesta esperada:
# {"status":"OK","message":"Backend funcionando correctamente"}
```

## 📝 Endpoints para Probar

### 🛍️ Productos

#### GET - Obtener todos los productos
```bash
curl http://localhost:4000/api/products
```

**Respuesta esperada**:
```json
{
  "success": true,
  "count": 1,
  "data": [
    {
      "id": 1,
      "name": "Producto 1",
      "description": "Descripción del producto 1",
      "price": 29.99,
      "category": "artesanias",
      "image": "/assets/product1.jpg",
      "stock": 10
    }
  ]
}
```

#### GET - Obtener producto por ID
```bash
curl http://localhost:4000/api/products/1
```

#### POST - Crear nuevo producto
```bash
curl -X POST http://localhost:4000/api/products \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Nuevo Producto",
    "description": "Descripción del nuevo producto",
    "price": 99.99,
    "category": "textiles",
    "image": "/assets/new-product.jpg",
    "stock": 5
  }'
```

### ❤️ Favoritos (Wishlist)

#### GET - Obtener lista de favoritos
```bash
curl http://localhost:4000/api/wishlist/user123
```

#### POST - Agregar a favoritos
```bash
curl -X POST http://localhost:4000/api/wishlist/user123/add \
  -H "Content-Type: application/json" \
  -d '{"productId": 1}'
```

#### DELETE - Eliminar de favoritos
```bash
curl -X DELETE http://localhost:4000/api/wishlist/user123/1
```

#### GET - Verificar si está en favoritos
```bash
curl http://localhost:4000/api/wishlist/user123/1/check
```

### 🎁 Productos Recomendados

#### GET - Recomendados generales
```bash
curl http://localhost:4000/api/recommended
```

#### GET - Recomendados con límite
```bash
curl "http://localhost:4000/api/recommended?limit=5"
```

#### GET - Recomendados para un producto
```bash
curl "http://localhost:4000/api/recommended/product/1?limit=5"
```

#### GET - Recomendados para un usuario
```bash
curl "http://localhost:4000/api/recommended/user/user123?limit=10"
```

### 👤 Usuarios

#### GET - Obtener todos los usuarios
```bash
curl http://localhost:4000/api/users
```

#### GET - Obtener usuario por ID
```bash
curl http://localhost:4000/api/users/1
```

#### POST - Crear usuario (via registro)
```bash
curl -X POST http://localhost:4000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Juan Pérez",
    "email": "juan@example.com",
    "password": "password123"
  }'
```

#### PUT - Actualizar usuario
```bash
curl -X PUT http://localhost:4000/api/users/1 \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Juan Pérez Updated",
    "phone": "+573001234567",
    "city": "Bogotá"
  }'
```

### 🔐 Autenticación

#### POST - Registrarse
```bash
curl -X POST http://localhost:4000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Nuevo Usuario",
    "email": "usuario@example.com",
    "password": "password123"
  }'
```

#### POST - Login
```bash
curl -X POST http://localhost:4000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "hashedpassword"
  }'
```

### 📦 Órdenes

#### GET - Órdenes del usuario
```bash
curl http://localhost:4000/api/orders/user/user123
```

#### POST - Crear orden
```bash
curl -X POST http://localhost:4000/api/orders \
  -H "Content-Type: application/json" \
  -d '{
    "userId": 1,
    "items": [{"productId": 1, "quantity": 2}],
    "total": 199.98,
    "shippingAddress": "Calle 123, Bogotá",
    "paymentMethod": "card"
  }'
```

#### PUT - Actualizar estado de orden
```bash
curl -X PUT http://localhost:4000/api/orders/1/status \
  -H "Content-Type: application/json" \
  -d '{"status": "shipped"}'
```

## 🧰 Herramientas Recomendadas

### Postman
- Descarga: https://www.postman.com/downloads/
- Import collection desde `backend/postman_collection.json` (cuando esté creada)

### Insomnia
- Descarga: https://insomnia.rest/download
- Más ligera que Postman

### curl (línea de comandos)
- Ya viene instalado en macOS y Linux
- Para Windows: usa Terminal o PowerShell

### Thunder Client (VS Code)
- Extensión para VS Code
- ID en marketplace: `rangav.vscode-thunder-client`

## ✅ Checklist de Verificación

- [ ] Servidor backend corre en puerto 4000
- [ ] Endpoint `/health` responde correctamente
- [ ] Puedo obtener productos en `/api/products`
- [ ] Puedo agregar productos a favoritos
- [ ] Puedo obtener productos recomendados
- [ ] Puedo crear usuarios (registro)
- [ ] Puedo crear órdenes

## 🐛 Troubleshooting

### "Connection refused"
- Asegúrate de que el backend está corriendo: `npm run dev` en la carpeta `backend/`

### "CORS error"
- Verifica que `CORS_ORIGIN` en `.env` del backend es `http://localhost:3000`

### "Cannot POST /api/..."
- Verifica que el endpoint está registrado en `backend/src/routes/`

### "Cannot GET /api/..."
- Algunos endpoints pueden requirir método POST o PUT

## 📚 Siguientes Pasos

1. Crea una colección de Postman con todos estos endpoints
2. Prueba cada endpoint y documenta las respuestas
3. Conecta el frontend con el backend
4. Implementa la base de datos real

---

**Nota**: Actualmente el backend usa almacenamiento en memoria. Los datos se pierden al reiniciar el servidor.
