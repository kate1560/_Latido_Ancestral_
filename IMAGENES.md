# Guía de Imágenes - Latido Ancestral

## 📂 Ubicación de las Imágenes

Todas las imágenes están en la carpeta `public/assets/` organizadas en subcarpetas:

```
public/assets/
├── assets1/  - Hamacas (11 imágenes)
├── assets2/  - Sombreros vueltiaos variados (10 imágenes)
├── assets3/  - Mochilas wayuu (10 imágenes)
├── assets4/  - Mochilas con flecos (10 imágenes)
├── assets5/  - Ropa tradicional (10 imágenes)
├── assets6/  - Carteras y bolsos (10 imágenes)
├── assets7/  - Mochilas personalizadas (10 imágenes)
├── assets8/  - Mochilas pequeñas y monederos (10 imágenes)
├── assets9/  - Pulseras (10 imágenes)
├── assets10/ - Sombreros con diseños (10 imágenes)
└── assets11/ - Imágenes generales y artesanos (27 imágenes)
```

## 🎨 Imágenes Actuales del Sitio

### Categorías (Página Principal y Colecciones)

- **Sombreros:** `/assets/assets11/sombrero-vueltiao.webp`
- **Mochilas:** `/assets/assets11/mochila.webp`
- **Hamacas:** `/assets/assets11/silla-hamaca.webp`
- **Pulseras:** `/assets/assets11/pulseras.webp`
- **Ropa:** `/assets/assets11/ropa.webp`

### Productos Destacados

1. **Sombrero Vueltiao Clásico** - `/assets/assets11/sombrero-vueltiao.webp`
2. **Mochila Wayuu Grande** - `/assets/assets11/mochila.webp`
3. **Silla Hamaca Tradicional** - `/assets/assets11/silla-hamaca.webp`
4. **Pulsera Artesanal** - `/assets/assets11/pulseras.webp`
5. **Ruana Tradicional** - `/assets/assets11/ropa.webp`
6. **Sombrero Vueltiao Quinciano** - `/assets/assets2/quinciano-multicolor.webp`
7. **Mochila Wayuu Kankumana** - `/assets/assets3/kankumana.webp`
8. **Hamaca Matrimonial** - `/assets/assets1/hamaca-matrimonial.webp`
9. **Pulsera Mostacilla** - `/assets/assets9/mostacilla.webp`
10. **Blusa Tradicional Mujer** - `/assets/assets5/blusa-mujer.webp`

## ➕ Cómo Agregar Más Productos

### 1. Elegir una imagen

Revisa las carpetas en `public/assets/` para encontrar la imagen que deseas usar.

### 2. Agregar el producto

Edita `src/data/products.ts` y agrega un nuevo objeto al array `products`:

```typescript
{
  id: '11',
  name: 'Nombre del Producto',
  description: 'Descripción detallada del producto artesanal.',
  price: 100000,
  image: '/assets/assets1/nombre-imagen.webp',
  category: 'categoria', // sombreros, mochilas, hamacas, pulseras, ropa
  featured: false, // true si quieres que aparezca en la página principal
}
```

## 📋 Imágenes Disponibles por Categoría

### Hamacas (assets1/)
- hamaca-bordada-mano.webp
- hamaca-bordada.webp
- hamaca-macrame-personal.webp
- hamaca-matrimonial.webp
- hamaca-nombre.webp
- hamaca-personal.webp
- hamaca-personalizada.webp
- hamaca-premium.webp
- hamaca-tienda-1.webp
- hamaca-tonos-tierra-crema.webp
- macrame-matrimonial.webp

### Sombreros Vueltiaos (assets2/)
- azulejo.webp
- bajo-sinu.webp
- caña-flecha.webp
- colador.webp
- exclusivo.webp
- galaxia.webp
- maiz-piedra.webp
- peinecillo-sabanero.webp
- quinciano-multicolor.webp
- vueltiao-negro-malla-ventilacion.webp

### Mochilas Wayuu (assets3/)
- acros.webp
- contemporanea.webp
- corazones.webp
- exclusivo.webp
- hilo-sedar.webp
- hilo-sedoso.webp
- kankumana.webp
- mostacilla.webp
- perlas.webp
- versatil.webp

### Mochilas con Flecos (assets4/)
- combinacion-azul.webp
- combinada-tonos-varios.webp
- combinado.webp
- flecos-cafe.webp
- flecos-cafes.webp
- flecos-colores.webp
- juego.webp
- tono-crema.webp
- tono-negro.webp
- tonos-azules.webp

### Ropa Tradicional (assets5/)
- blusa-mujer.webp
- camisa-hombre.webp
- camiseta-hombre.webp
- chaleco-hombre.webp
- chaleco-mujer.webp
- conjunto-hombre.webp
- conjunto-mujer.webp
- juego-top-gorro-mujer.webp
- sueter-hombre.webp
- top-mujer.webp

### Carteras y Bolsos (assets6/)
- bamboo.webp
- bola-mano.webp
- bolso-iraca.webp
- cartera-crochet.webp
- cartera-mimbre.webp
- cartera-palma.webp
- cartera-perlas.webp
- cofre-bohemico.webp
- cofre.webp
- cordon-seda.webp

### Mochilas Personalizadas (assets7/)
- arcoiris.webp
- aurora.webp
- corazon.webp
- crespo.webp
- diseño.webp
- mariposa.webp
- media-luna.webp
- natural.webp
- personalizado.webp
- tradicional.webp

### Mochilas Pequeñas (assets8/)
- caña-flecha.webp
- crochet.webp
- falda.webp
- mano-trenzada.webp
- mini-tejida.webp
- monedero.webp
- mostacilla-flecos.webp
- mostacilla.webp
- tejida.webp
- tranza-corredera.webp

### Pulseras (assets9/)
- accesorio.webp
- hilo.webp
- macrame.webp
- mostacilla-nombre.webp
- mostacilla-personalizada.webp
- mostacilla.webp
- nombre.webp
- patron.webp
- personalizada.webp
- tejida.webp

### Sombreros con Diseños (assets10/)
- colores.webp
- diseño.webp
- estrella.webp
- mostacilla-fleco.webp
- mostacilla-flor.webp
- mostacilla-hoja.webp
- multicolor.webp
- palma.webp
- rombo.webp
- sombrero.webp

## 💡 Consejos

1. Todas las imágenes están en formato `.webp` (optimizado para web)
2. Para usar una imagen, solo necesitas la ruta relativa desde `public/`: `/assets/carpeta/imagen.webp`
3. Las imágenes se sirven directamente desde la carpeta `public/`
4. Si agregas nuevas imágenes, colócalas en la carpeta apropiada dentro de `public/assets/`

## 🔄 Agregar Nuevas Imágenes

1. Coloca la nueva imagen en `public/assets/` (en la subcarpeta apropiada)
2. Usa la ruta en tu código: `/assets/nombre-carpeta/nombre-imagen.webp`
3. La imagen estará disponible automáticamente

## 📸 Recomendaciones

- Mantén las imágenes en formato `.webp` para mejor rendimiento
- Usa nombres descriptivos para las imágenes
- Organiza las imágenes por categoría en subcarpetas
- El tamaño recomendado es entre 500-1000px de ancho
