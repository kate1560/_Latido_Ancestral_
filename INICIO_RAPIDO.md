# Guía de Inicio Rápido - Latido Ancestral

## 🚀 Iniciar el Proyecto

### 1. Instalar dependencias (solo la primera vez)
```bash
npm install
```

### 2. Ejecutar en modo desarrollo
```bash
npm run dev
```

Abre tu navegador en: **http://localhost:3000**

## 📁 Estructura del Proyecto

- **src/app/** - Páginas de la aplicación
  - `page.tsx` - Página de inicio
  - `esencia/` - Página "Nuestra Esencia"
  - `colecciones/` - Lista de colecciones y páginas dinámicas por categoría
  - `inspiracion/` - Página "Inspiración"
  - `contacto/` - Página de contacto con formulario
  - `productos/[id]/` - Detalles de cada producto

- **src/components/** - Componentes reutilizables
  - `Header.tsx` - Navegación principal
  - `Footer.tsx` - Pie de página
  - `ProductCard.tsx` - Tarjeta para mostrar productos

- **src/data/** - Datos de la aplicación
  - `products.ts` - Productos y categorías

- **src/types/** - Tipos TypeScript
  - `index.ts` - Interfaces y tipos

## 🎨 Personalización

### Agregar nuevos productos

Edita `src/data/products.ts`:

```typescript
{
  id: '6',
  name: 'Nombre del Producto',
  description: 'Descripción detallada',
  price: 100000,
  image: '/assets/imagen.jpg',
  category: 'categoria',
  featured: true, // Aparece en la página de inicio
}
```

### Agregar nuevas categorías

En el mismo archivo `src/data/products.ts`:

```typescript
{
  id: 'nueva-categoria',
  name: 'Nombre de la Categoría',
  description: 'Descripción de la categoría',
  image: '/assets/imagen.jpg',
}
```

### Colores del sitio

Los colores se definen en `src/app/globals.css`:

```css
@theme {
  --color-primary: #8B4513;    /* Marrón principal */
  --color-secondary: #D2691E;  /* Marrón chocolate */
  --color-accent: #F4A460;     /* Marrón claro */
  --color-dark: #2C1810;       /* Marrón oscuro */
}
```

## 🔨️ Comandos Útiles

```bash
# Desarrollo
npm run dev

# Compilar para producción
npm run build

# Ejecutar en producción
npm start

# Verificar código
npm run lint
```

## 🖼️ Imágenes

Todas las imágenes están en `public/assets/` organizadas en subcarpetas:

- `assets1/` - Hamacas
- `assets2/` - Sombreros vueltiaos variados  
- `assets3/` - Mochilas wayuu
- `assets5/` - Ropa tradicional
- `assets9/` - Pulseras
- `assets11/` - Imágenes generales

**Ver lista completa de imágenes disponibles en:** `IMAGENES.md`

### Usar imágenes en productos

En `src/data/products.ts`, usa la ruta desde `public/`:

```typescript
image: '/assets/assets11/mochila.webp'
```

## 📝 Notas Importantes

- Las imágenes deben estar en la carpeta `assets/`
- Los productos se filtran automáticamente por categoría
- El sitio es completamente responsive (móvil, tablet, desktop)
- SEO optimizado con metadatos en cada página

## 🐛 Solución de Problemas

### El servidor no inicia
```bash
# Limpia la caché y reinstala
Remove-Item -Recurse -Force node_modules, .next
npm install
npm run dev
```

### Errores de compilación
```bash
# Verifica que tengas Node.js 18 o superior
node --version

# Reinstala dependencias
npm install
```

## 📧 Soporte

Para preguntas o problemas:
- Email: katemartinez1507@gmail.com
- Autora: Kateryn Martinez
