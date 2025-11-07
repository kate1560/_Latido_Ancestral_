# Tienda Virtual - Latido Ancestral

## Descripción

*Latido Ancestral* es una tienda virtual especializada en la venta de artesanías colombianas hechas a mano. Nuestro objetivo es promover la cultura y la tradición ancestral a través de productos como sombreros vueltiaos, sillas hamaca, mochilas, pulseras, ropa y más, elaborados con técnicas artesanales y materiales naturales.

El sitio ofrece una experiencia sencilla e intuitiva para que los usuarios puedan navegar entre las colecciones, conocer la esencia de cada producto y realizar compras.

## Tecnologías

- **Next.js 16** - Framework de React para producción
- **TypeScript** - Tipado estático para JavaScript
- **Tailwind CSS** - Framework de CSS utility-first
- **React 19** - Biblioteca de JavaScript para interfaces
- **ESLint** - Linter para mantener código limpio

## Estructura del Proyecto

```
src/
├── app/
│   ├── layout.tsx          (Layout principal)
│   ├── page.tsx            (Página de inicio)
│   ├── globals.css         (Estilos globales)
│   ├── esencia/            (Nuestra Esencia)
│   ├── colecciones/        (Colecciones)
│   │   └── [id]/          (Categoría dinámica)
│   ├── inspiracion/        (Inspiración)
│   ├── contacto/           (Contacto)
│   └── productos/
│       └── [id]/          (Detalle de producto)
├── components/
│   ├── Header.tsx          (Navegación)
│   ├── Footer.tsx          (Pie de página)
│   └── ProductCard.tsx     (Tarjeta de producto)
├── data/
│   └── products.ts         (Datos de productos)
└── types/
    └── index.ts            (Tipos TypeScript)
```

## Características principales

- Navegación clara y accesible con menú en el header  
- Diseño responsive adaptado para computadoras, tablets y móviles  
- Secciones organizadas para mostrar productos con imágenes, descripción, precio y enlaces de compra  
- Uso de animaciones suaves para mejorar la experiencia visual  
- Metadatos optimizados para SEO.

## Instalación y Uso

### Requisitos Previos
- Node.js 18+ instalado
- npm o yarn

### Instalación

1. Clonar el repositorio:
```bash
git clone https://github.com/kate1560/Tienda_Virtual.git
cd Tienda_Virtual
```

2. Instalar dependencias:
```bash
npm install
```

3. Ejecutar en modo desarrollo:
```bash
npm run dev
```

4. Abrir el navegador en [http://localhost:3000](http://localhost:3000)

### Scripts Disponibles

- `npm run dev` - Inicia el servidor de desarrollo
- `npm run build` - Construye la aplicación para producción
- `npm start` - Inicia el servidor de producción
- `npm run lint` - Ejecuta el linter para verificar el código

## Próximos pasos que deseo implementar

- Implementar funcionalidad real para el enlace de compra.  
- Agregar sistema de carrito y pago.
- Interactividad en la pagina con javascript. 

## Autores

*Kateryn Martinez, Adrian Villegas, Samuel Reyes, y otros npc*
