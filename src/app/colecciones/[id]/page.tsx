import { notFound } from "next/navigation";
import ProductCard from "@/components/ProductCard";
import { products, categories } from "@/data/products";
import Link from "next/link";

interface CategoryPageProps {
  params: {
    id: string;
  };
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const category = categories.find((c) => c.id === params.id);

  if (!category) {
    notFound();
  }

  const categoryProducts = products.filter((p) => p.category === params.id);

  return (
    <div className="container mx-auto px-4 py-16">
      {/* Breadcrumb */}
      <nav className="mb-8 text-gray-600">
        <Link href="/" className="hover:text-primary">
          Inicio
        </Link>
        {" / "}
        <Link href="/colecciones" className="hover:text-primary">
          Colecciones
        </Link>
        {" / "}
        <span className="text-dark font-semibold">{category.name}</span>
      </nav>

      {/* Category Header */}
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold mb-4 text-dark">{category.name}</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          {category.description}
        </p>
      </div>

      {/* Products Grid */}
      {categoryProducts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categoryProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <p className="text-xl text-gray-600 mb-6">
            Actualmente no hay productos en esta categoría.
          </p>
          <Link href="/colecciones" className="btn-primary">
            Ver Todas las Colecciones
          </Link>
        </div>
      )}

      {/* Back to Collections */}
      <div className="text-center mt-12">
        <Link
          href="/colecciones"
          className="inline-flex items-center text-primary hover:text-secondary transition-colors"
        >
          <svg
            className="w-5 h-5 mr-2"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M15 19l-7-7 7-7" />
          </svg>
          Volver a Colecciones
        </Link>
      </div>
    </div>
  );
}
