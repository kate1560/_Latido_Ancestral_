import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import { products, categories } from "@/data/products";

export default function ColeccionesPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-5xl font-bold text-center mb-4 text-dark">
        Nuestras Colecciones
      </h1>
      <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
        Explora nuestras colecciones de artesanías colombianas auténticas,
        cada una con su propia historia y tradición.
      </p>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
        {categories.map((category) => (
          <Link
            key={category.id}
            href={`/colecciones/${category.id}`}
            className="group relative overflow-hidden rounded-xl shadow-lg h-72 block"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10" />
            <div className="absolute inset-0 bg-primary/30 group-hover:bg-primary/50 transition-colors duration-300 z-20" />
            <div className="absolute bottom-0 left-0 right-0 p-6 z-30">
              <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-accent transition-colors">
                {category.name}
              </h3>
              <p className="text-gray-200">{category.description}</p>
            </div>
          </Link>
        ))}
      </div>

      {/* All Products */}
      <section>
        <h2 className="text-4xl font-bold text-center mb-12 text-dark">
          Todos Nuestros Productos
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
}
