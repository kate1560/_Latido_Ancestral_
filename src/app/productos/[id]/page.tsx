import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { products } from "@/data/products";

interface ProductPageProps {
  params: {
    id: string;
  };
}

export default function ProductPage({ params }: ProductPageProps) {
  const product = products.find((p) => p.id === params.id);

  if (!product) {
    notFound();
  }

  const formattedPrice = new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    minimumFractionDigits: 0,
  }).format(product.price);

  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 3);

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
        <span className="text-dark font-semibold">{product.name}</span>
      </nav>

      {/* Product Details */}
      <div className="grid md:grid-cols-2 gap-12 mb-16">
        <div className="relative h-96 md:h-[600px] bg-gray-200 rounded-xl overflow-hidden shadow-lg">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover"
            priority
          />
        </div>

        <div className="flex flex-col justify-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-dark">
            {product.name}
          </h1>

          <div className="text-4xl font-bold text-primary mb-6">
            {formattedPrice}
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
            <h2 className="text-2xl font-bold mb-4 text-dark">Descripción</h2>
            <p className="text-gray-700 text-lg leading-relaxed">
              {product.description}
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
            <h3 className="text-xl font-bold mb-3 text-dark">
              Características
            </h3>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start">
                <span className="text-primary mr-2">✓</span>
                100% hecho a mano
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-2">✓</span>
                Materiales naturales y sostenibles
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-2">✓</span>
                Producto único y auténtico
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-2">✓</span>
                Apoya a comunidades artesanales
              </li>
            </ul>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <button className="btn-primary flex-1">Agregar al Carrito</button>
            <Link href="/contacto" className="btn-secondary flex-1 text-center">
              Consultar
            </Link>
          </div>

          <div className="mt-6 p-4 bg-accent/20 rounded-lg">
            <p className="text-sm text-gray-700">
              <strong>Envío:</strong> Disponible a todo Colombia. El tiempo de
              entrega varía según la ubicación.
            </p>
          </div>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section>
          <h2 className="text-3xl font-bold mb-8 text-dark">
            Productos Relacionados
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {relatedProducts.map((relatedProduct) => (
              <Link
                key={relatedProduct.id}
                href={`/productos/${relatedProduct.id}`}
                className="card"
              >
                <div className="relative h-64 bg-gray-200">
                  <Image
                    src={relatedProduct.image}
                    alt={relatedProduct.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2 text-dark">
                    {relatedProduct.name}
                  </h3>
                  <p className="text-2xl font-bold text-primary">
                    {new Intl.NumberFormat("es-CO", {
                      style: "currency",
                      currency: "COP",
                      minimumFractionDigits: 0,
                    }).format(relatedProduct.price)}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
