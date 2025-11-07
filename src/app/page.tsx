import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import { products, categories } from "@/data/products";

export default function Home() {
  const featuredProducts = products.filter((p) => p.featured);

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-secondary text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 animate-fade-in">
            Latido Ancestral
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            Descubre la belleza de las artesanías colombianas hechas a mano.
            Cada pieza cuenta una historia ancestral.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/colecciones" className="btn-secondary inline-block">
              Ver Colecciones
            </Link>
            <Link
              href="/esencia"
              className="bg-white text-primary px-6 py-3 rounded-lg hover:bg-gray-100 transition-colors duration-300 font-semibold inline-block"
            >
              Conoce Nuestra Esencia
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-4xl font-bold text-center mb-12 text-dark">
          Productos Destacados
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12 text-dark">
            Nuestras Colecciones
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category) => (
              <Link
                key={category.id}
                href={`/colecciones/${category.id}`}
                className="group relative overflow-hidden rounded-xl shadow-lg h-64 block"
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent z-10" />
                <div className="absolute inset-0 bg-primary/20 group-hover:bg-primary/40 transition-colors duration-300 z-20" />
                <div className="absolute bottom-0 left-0 right-0 p-6 z-30">
                  <h3 className="text-2xl font-bold text-white mb-2">
                    {category.name}
                  </h3>
                  <p className="text-gray-200">{category.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6 text-dark">
            Tradición en Cada Hilo
          </h2>
          <p className="text-lg text-gray-700 mb-8">
            En Latido Ancestral, cada artesanía es creada con técnicas
            tradicionales transmitidas de generación en generación. Trabajamos
            directamente con artesanos colombianos para traerte piezas únicas que
            celebran nuestra cultura y tradición.
          </p>
          <Link href="/esencia" className="btn-primary">
            Conoce Más Sobre Nosotros
          </Link>
        </div>
      </section>
    </div>
  );
}
